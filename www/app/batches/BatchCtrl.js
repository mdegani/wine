(function () {
    'use strict';

    angular.module('winemakingApp').controller('BatchCtrl', ['$scope', '$state', '$stateParams', 'winemakingAPI', 'batchProgress', 'specificGravity', 'winestage', BatchCtrl]);

    function BatchCtrl($scope, $state, $stateParams, winemakingAPI, batchProgress, specificGravity, winestage) {
        var vm = this;

        vm.edit2 = function (batch) {
            $state.go("app.batches-edit2", {id: batch.id});
        };

        vm.editBottleInventory = function (batch) {
            $state.go("app.batches-inv", {id: batch.id});
        };

        vm.editDateplan = function (batch) {
            $state.go("app.batches-editDateplan", {id: batch.id});
        };


        vm.sgreadings = function (batch) {
            $state.go("app.batches-sgreadings", {id: batch.id});
        };

        winemakingAPI.getBatch($stateParams.id).then(function (data) {
            data.firstFermentationStartDate = new Date(data.firstFermentationStartDate);
            data.bottlingDate = new Date(data.bottlingDate);
            data.firstRackingDate = new Date(data.firstRackingDate);

            vm.batch = data;

            vm.firstReading =  specificGravity.firstReading(data);
            vm.latestPrimaryReading =  specificGravity.latestPrimaryReading(data);
            vm.latestSecondaryReading = specificGravity.latestSecondaryReading(data);
            vm.firstReadingDate = specificGravity.firstReadingDate(data);
            vm.latestPrimaryReadingDate = specificGravity.latestPrimaryReadingDate(data);
            vm.latestSecondaryReadingDate = specificGravity.latestSecondaryReadingDate(data);
            vm.daysThruFirst = batchProgress.daysThruFirst(data);
            vm.daysThruSecond = batchProgress.daysThruSecond(data);
            vm.daysThruTotal = batchProgress.daysThruTotal(data);
            vm.firstFermDays = batchProgress.firstFermDays(data);
            vm.secondFermDays = batchProgress.secondFermDays(data);
            vm.totalDays = batchProgress.totalDays(data);
            vm.fermentingPrimary = winestage.fermentingPrimary(data);
            vm.fermentingSecondary = winestage.fermentingSecondary(data);


        });
    }
}());
