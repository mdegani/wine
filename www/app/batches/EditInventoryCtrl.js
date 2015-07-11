(function () {
    'use strict';

    angular.module('winemakingApp').controller('EditInventoryCtrl', ['$scope', '$state', '$stateParams', 'winemakingAPI', EditInventoryCtrl]);

    function EditInventoryCtrl($scope, $state, $stateParams, winemakingAPI) {

        var vm = this;

        winemakingAPI.getBatch($stateParams.id).then(function (data) {
            data.ageToDate = new Date(data.ageToDate);
            vm.batch = data;
        });

        vm.bottleInventory;


        vm.updateBatch = function (returnToDetailState) {
            winemakingAPI.putBatch(vm.batch.id, vm.batch)
                .then(function (data) {
                    winemakingAPI.getBatches(true).then(function () {
                        if (!returnToDetailState) {
                            //just go back to the list
                            $state.go('app.cellar');
                        }
                        if (returnToDetailState) {
                            //need to get the individual updated item and cache it
                            winemakingAPI.getBatch(vm.batch.id, true)
                                .then(function (data) {
                                    $state.go(returnToDetailState, {id: vm.batch.id});
                                });
                        }
                    });
                });
        };
    }
}());
