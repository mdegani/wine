(function () {
    'use strict';

    angular.module('winemakingApp').controller('EditBatchCtrl', ['$state', '$stateParams', 'winemakingAPI', EditBatchCtrl]);

    function EditBatchCtrl($state, $stateParams, winemakingAPI) {

        var vm = this;

        winemakingAPI.getBatch($stateParams.id).then(function (data) {
            data.firstFermentationStartDate = new Date(data.firstFermentationStartDate);
            data.bottlingDate = new Date(data.bottlingDate);
            data.firstRackingDate = new Date(data.firstRackingDate);

            vm.batch = data;
        });

        vm.fermentationDays = function (date1, date2) {
            //validation returns unidenfined if FirstFermentationStartDate > BottlingDate
            if (date1 && date2) {
                return Math.round(date1.valueOf()/(1000 * 60 * 60 * 24) - date2.valueOf()/(1000 * 60 * 60 * 24), 0);
            } else {
                //to-do: valdation
                return 0;
            }
        };

        vm.updateBatch = function (returnToDetailState) {
            winemakingAPI.putBatch(vm.batch.id, vm.batch)
                .then(function (data) {
                    winemakingAPI.getBatches(true).then(function () {
                        if (!returnToDetailState) {
                            //just go back to the list
                            $state.go('app.batches');
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
