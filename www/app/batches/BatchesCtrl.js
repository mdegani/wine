(function () {
    'use strict';

    angular.module('winemakingApp').controller('BatchesCtrl', ['$scope', '$state', 'winemakingAPI', 'winestage', BatchesCtrl]);

    function BatchesCtrl($scope, $state, winemakingAPI, winestage) {

        var vm = this;

        vm.edit = function (batch) {
            $state.go("app.batches-edit", {id: batch.id});
        };

        vm.remove = function (batch) {
            //couple's controller to service, $stateParams.Id instead
            //winemakingAPI.setCurrentBatchId(batch.Id);
            //to-do: change the casing to camelcase in API
            winemakingAPI.deleteBatch(batch.id).then(function () {
                vm.batches.splice(vm.batches.indexOf(batch), 1);
            });
        };

        vm.loadList = function (forceRefresh) {
            winemakingAPI.getBatches(forceRefresh)
                .then(function (data) {
                    vm.batches = data;
                })
                .finally(function () {
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

        vm.loadList(false);
        vm.selectBatch = function (batchId) {
            //calling setCurrentBatchId here couples this controller to the rendering of details view
            //winemakingAPI.setCurrentBatchId(batchId);
            $state.go('app.batches-detail', {id: batchId});
        };

        //FILTERS
        //If bottleInventory is anything but null, it is considered "cellared" and won't show up here

        vm.notStarted = function (batch) {
            return winestage.notStarted(batch);
        };

        vm.fermenting = function (batch) {
            return winestage.fermenting(batch);
        };

        vm.bottled = function (batch) {
            return winestage.bottled(batch);
        };

    }
}());
