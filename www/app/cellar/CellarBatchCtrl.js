(function () {
    'use strict';

    angular.module('winemakingApp').controller('CellarBatchCtrl', ['$scope', '$state', '$stateParams', 'winemakingAPI', 'batchProgress', 'specificGravity', 'winestage', CellarBatchCtrl]);

    function CellarBatchCtrl($scope, $state, $stateParams, winemakingAPI, batchProgress, specificGravity, winestage) {
        var vm = this;

        vm.editBottleInventory = function (batch) {
            $state.go("app.batches-inv", {id: batch.id});
        };

        vm.sgreadings = function (batch) {
            $state.go("app.batches-sgreadings", {id: batch.id});
        };

        vm.updateBatch = function () {
            winemakingAPI.putBatch(vm.batch.id, vm.batch)
                .then(function (data) {
                    winemakingAPI.getBatches(true).then(function () {
                        $state.go('app.cellar');
                    });
                });
        };


        winemakingAPI.getBatch($stateParams.id).then(function (data) {
            data.firstFermentationStartDate = new Date(data.firstFermentationStartDate);
            data.bottlingDate = new Date(data.bottlingDate);
            data.firstRackingDate = new Date(data.firstRackingDate);

            vm.batch = data;

        });
    }
}());
