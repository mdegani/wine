(function () {
    'use strict';

    angular.module('winemakingApp').factory('winemakingAPI', ['$http', '$q', '$ionicLoading', 'CacheFactory', 'ApiUrl', 'UserToken', winemakingAPI]);
    //bower install angular-cache
    function winemakingAPI($http, $q, $ionicLoading, CacheFactory, ApiUrl, UserToken) {
        //should be passed in as required
        //var currentBatchId;
        self.batchesCache = CacheFactory.get("batchesCache");
        self.batchCache = CacheFactory.get("batchCache");
        //// OFFLINE data, puts expired items back in the cache if HTTP fails
        // self.BatchesCache.setOptions({
        //   onExpire:function (key, value) {
        //     getBatches()
        //     .then(function () {
        //     }, function () {
        //       self.BatchesCache.put(key, value);
        //     });
        //   }
        // });

        $http.defaults.headers.common.Authorization = UserToken;

        function getBatches(forceRefresh) {
            if (typeof forceRefresh === "undefined") {
                forceRefresh = false;
            }

            var deferred = $q.defer(),
                cacheKey = "batches",
                batchesData = null;

            if (!forceRefresh) {
                batchesData = self.batchesCache.get(cacheKey);
            }

            if (batchesData) {
                //no HTTP call, found data in cache
                deferred.resolve(batchesData);
            } else {
                $ionicLoading.show({template: 'Loading...'});
                $http.get(ApiUrl + "Batches/")
                    .success(
                        function (data) {
                            self.batchesCache.put(cacheKey, data);
                            $ionicLoading.hide();
                            deferred.resolve(data);
                        }
                    )
                    .error(
                        function () {
                            //ui logic in service
                            $ionicLoading.hide();
                            deferred.reject();
                        }
                    );
            }
            return deferred.promise;
        }

        function getBatch(currentBatchId, forceRefresh) {

            if (typeof forceRefresh === "undefined") {
                forceRefresh = false;
            }

            var deferred = $q.defer(),
                cacheKey = "batch-" + currentBatchId,
                batchCache = null;

            if (!forceRefresh) {
                //get batch from cache
                batchCache = self.batchCache.get(cacheKey);
            }

            if (batchCache) {
                deferred.resolve(batchCache);
            } else {
                $ionicLoading.show({template: 'Loading...'});
                $http.get(ApiUrl + "Batches/" + currentBatchId)
                    .success(
                        function (data) {
                            self.batchCache.put(cacheKey, data);
                            $ionicLoading.hide();
                            deferred.resolve(data);
                        }
                    )
                    .error(
                        function () {
                            //couple service to UI
                            $ionicLoading.hide();
                            deferred.reject();
                        }
                    );
            }
            return deferred.promise;
        }

        function deleteBatch(currentBatchId) {
            var deferred = $q.defer();
            //to-do: confirm with user before actually deleting the record
            $http.delete(ApiUrl + "Batches/" + currentBatchId)
                .success(function () {
                    // //not sure why I did any of this, upon successful delete, refresh the cache.
                    // var cachedBatches;
                    // cachedBatches = self.batchesCache.get('batches');
                    // function itemInCache() {
                    //     var i;
                    //     if (typeof cachedBatches !== "undefined") {
                    //         for (i = 0; i < cachedBatches.length; i += 1) {
                    //             if (cachedBatches[i].id === currentBatchId) {
                    //                 return i;
                    //             }
                    //         }
                    //     }
                    //     cachedBatches.splice(cachedBatches.indexOf(itemInCache), 1);
                    //     self.batchesCache.put('batches', cachedBatches);
                    //     //freshen the data
                    getBatches(true);
                    //}
                    deferred.resolve();
                })
                .error(function () {
                    deferred.reject();
                });
            return deferred.promise;
        }


        function deleteSpGrReading(spGrReadingId) {
            var deferred = $q.defer();
            $http.delete(ApiUrl + "spGrReadings/" + spGrReadingId)
            //to-do: confirm with user before actually deleting the record
                .success(function () {
                    getBatches(true);
                    deferred.resolve();
                })
                .error(function () {
                    deferred.reject();
                });
            return deferred.promise;
        }


        // function setCurrentBatchId(batchId) {
        //   currentBatchId = batchId;
        // }

        function addNewBatch(juiceTypeParam, juiceBrandParam, vendorParam, generalNotesParam, firstFermentationStartDate, firstRackingDate, bottlingDate) {
            var newBatch = {
                juiceType: juiceTypeParam,
                juiceBrand: juiceBrandParam,
                vendor: vendorParam,
                generalNotes: generalNotesParam,
                firstFermentationStartDate: firstFermentationStartDate,
                firstRackingDate: firstRackingDate,
                bottlingDate: bottlingDate
            };

            var deferred = $q.defer();

            $http.post(ApiUrl + "Batches/", newBatch)
                .success(
                    function (data) {
                        deferred.resolve(data);
                    }
                )
                .error(function () {
                    deferred.reject();
                });
            return deferred.promise;
        }


        function addNewSpGrReadings(spGrReading) {

            var deferred = $q.defer();

            $http.post(ApiUrl + "SpGrReadings/", spGrReading)
                .success(
                    function (data) {
                        deferred.resolve(data);
                    }
                )
                .error(function () {
                    deferred.reject();
                });
            return deferred.promise;
        }


        function putBatch(batchId, batch) {
            var deferred = $q.defer();
            $http.put(ApiUrl + "Batches/" + batchId, batch)
                .success(
                    function (data) {
                        deferred.resolve(data);
                    }
                )
                .error(function () {
                    deferred.reject();
                });
            return deferred.promise;
        }

        return {
            getBatches: getBatches,
            getBatch: getBatch,
            //setCurrentBatchId: setCurrentBatchId,
            addNewBatch: addNewBatch,
            deleteBatch: deleteBatch,
            putBatch: putBatch,
            addNewSpGrReadings: addNewSpGrReadings,
            deleteSpGrReading: deleteSpGrReading
        };
    }
}());
