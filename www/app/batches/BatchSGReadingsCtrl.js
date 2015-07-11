(function () {
    'use strict';

    angular.module('winemakingApp').controller('BatchSGReadingsCtrl', ['$scope', '$state', '$stateParams', '$ionicModal', 'winemakingAPI', 'specificGravity',  BatchSGReadingsCtrl]);

    function BatchSGReadingsCtrl($scope, $state, $stateParams, $ionicModal, winemakingAPI, specificGravity) {
        var vm = this;

        winemakingAPI.getBatch($stateParams.id).then(function (data) {
            data.firstFermentationStartDate = new Date(data.firstFermentationStartDate);
            data.bottlingDate = new Date(data.bottlingDate);
            data.firstRackingDate = new Date(data.firstRackingDate);
            vm.batch = data;

            vm.latestPrimaryReading = function () {
                return specificGravity.latestPrimaryReading(data);
            };

            vm.latestSecondaryReading = function () {
                return specificGravity.latestSecondaryReading(data);
            };
        });

        vm.remove = function (spGrReading) {
            winemakingAPI.deleteSpGrReading(spGrReading.id)
            .then(function () {
                vm.batch.spGrReadings.splice(vm.batch.spGrReadings.indexOf(spGrReading), 1);
            });
        }

        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
        });

        $scope.newReadingValue = 1;

        $scope.openModal = function () {

            $scope.modal.show();
        };
        $scope.closeModal = function (newSG) {
            var today = new Date();
            var newSGObject = {batchId: vm.batch.id, readingValue: newSG, readingDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(),0,0,0,0)};

            winemakingAPI.addNewSpGrReadings(newSGObject)
                .then(function (data) {
                    //unshift works ok for now, but will need to sort ng-repeat of readings as well
                    vm.batch.spGrReadings.unshift(data);
                        winemakingAPI.getBatch(vm.batch.id, true)
                            .then(function (data) {
                                $scope.modal.hide();
                            });
                });
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });
    }
}());
