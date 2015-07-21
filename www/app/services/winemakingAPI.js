(function () {
    'use strict';

    angular.module('winemakingApp').factory('winemakingAPI', ['$http', '$q', '$ionicLoading', 'CacheFactory',
    'ApiUrl', 'UserToken', winemakingAPI]);
    //bower install angular-cache
    function winemakingAPI($http, $q, $ionicLoading, CacheFactory, ApiUrl, UserToken) {

        //prod maxAge: 1000 * 60 * 4    (4 hours)
        CacheFactory('batchesCache', {storageMode: 'localStorage', maxAge: 30000, deleteOnExpire: 'aggressive'});
        CacheFactory('batchCache', {storageMode: 'localStorage', maxAge: 30000, deleteOnExpire: 'aggressive'});

        var batchesCache = CacheFactory.get('batchesCache');
        var batchCache = CacheFactory.get('batchCache');


        $http.defaults.headers.common.Authorization = UserToken;

        function getBatches(forceRefresh) {
            if (typeof forceRefresh === 'undefined') {
                forceRefresh = false;
            }
            //will use success() instea of then() on the $http.get()
            //this promise can return without using http if required
            //data is in the cache:
            var deferred = $q.defer(),
                cacheKey = 'batches',
                batchesData = null;

            if (!forceRefresh) {
                batchesData = batchesCache.get(cacheKey);
            }

            if (batchesData) {
                //no HTTP call, found data in cache
                deferred.resolve(batchesData);
            } else {
                $ionicLoading.show({template: 'Loading...'});
                $http.get(ApiUrl + 'Batches/')
                    .success(
                        function (data) {
                            batchesCache.put(cacheKey, data);
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

            if (typeof forceRefresh === 'undefined') {
                forceRefresh = false;
            }

            var deferred = $q.defer(),
                cacheKey = 'batch-' + currentBatchId,
                batchData = null;

            if (!forceRefresh) {
                //get batch from cache
                batchData = batchCache.get(cacheKey);
            }

            if (batchData) {
                deferred.resolve(batchData);
            } else {
                $ionicLoading.show({template: 'Loading...'});
                $http.get(ApiUrl + 'Batches/' + currentBatchId)
                    .success(
                        function (data) {
                            batchCache.put(cacheKey, data);
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
            $http.delete(ApiUrl + 'Batches/' + currentBatchId)
                .success(function () {
                    getBatches(true);
                    deferred.resolve();
                })
                .error(function () {
                    deferred.reject();
                });
            return deferred.promise;
        }


        function deleteSpGrReading(spGrReadingId) {
            var deferred = $q.defer();
            $http.delete(ApiUrl + 'spGrReadings/' + spGrReadingId)
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

        function addNewBatch(juiceTypeParam, juiceBrandParam, vendorParam,
            generalNotesParam, firstFermentationStartDate, firstRackingDate, bottlingDate) {
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

            $http.post(ApiUrl + 'Batches/', newBatch)
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

            $http.post(ApiUrl + 'SpGrReadings/', spGrReading)
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
            $http.put(ApiUrl + 'Batches/' + batchId, batch)
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
