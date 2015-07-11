(function () {
    'use strict';

    angular.module('winemakingApp').controller('CellarCtrl', ['$state', '$scope', 'winemakingAPI', 'winestage', CellarCtrl]);

    function CellarCtrl($state, $scope, winemakingAPI, winestage) {
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
            $state.go('app.cellar-batch', {id: batchId});
        };

        vm.cellaredAging = function (batch) {
            return winestage.cellaredAging(batch);
        };

        vm.cellaredReady = function (batch) {
            return winestage.cellaredReady(batch);
        };



    }
}());
