(function () {
    'use strict';

    angular.module('winemakingApp').controller('NewBatchCtrl', ['$scope', '$state', 'winemakingAPI', NewBatchCtrl]);

    function NewBatchCtrl($scope, $state, winemakingAPI) {

        var vm = this;
        var today = new Date();
        vm.firstFermentationStartDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(),0,0,0,0);

        vm.firstFermentationDaysDefault = 21;
        vm.secondFermentationDaysDefault = 49;

        vm.submitBatch = function () {
            winemakingAPI.addNewBatch(vm.juiceType, vm.juiceBrand, vm.vendor, vm.generalNotes, vm.firstFermentationStartDate, vm.firstRackingDate(), vm.bottlingDate())
                .then(function (data) {
                    winemakingAPI.getBatches(true).then(function () {
                        $state.go("app.batches");
                    });
                });
        };

        vm.firstRackingDate = function() {
            return moment(new Date(vm.firstFermentationStartDate)).add(vm.firstFermentationDaysDefault,'days').format();
        };

        vm.bottlingDate = function () {
            return moment(new Date(vm.firstRackingDate())).add(vm.secondFermentationDaysDefault, 'days').format();
        };

    }
}());
