(function () {
    'use strict';

    angular.module('winemakingApp').controller('HomeCtrl', ['$state', 'winedates', HomeCtrl]);

    function HomeCtrl($state, winedates) {

        var vm = this;

//vm.upcomingAll = winedates.upcomingAll();

        winedates.upcomingAll().then(function(data){
            vm.upcomingAll = data;
        });

        vm.filterFunction = function (prop) {
            return function (item){
                return new Date(item[prop]) > new Date();
            };
        };

    }
}());
