(function () {
    'use strict';

    angular.module('winemakingApp').factory('winedates', ['$q', 'winemakingAPI', winedates]);
    function winedates($q, winemakingAPI) {

        //in next 3 weeks:
        var weeksOut = 2;

        //won't filter dates earlier than today (new Date();),
        //instead, will implement a dismiss flag for each date
        //which will be reset under certain conditions.  date
        //that have passed can be dismissed by the user.

        var upcomingAll = function () {
            var listUpcoming = [];
            var listUpcomingSorted;

            return winemakingAPI.getBatches()
            .then(function (data){
                var upcomingFirstRacking = _.filter(data, function (e) {
                    return new Date(e.firstRackingDate) < moment().add(weeksOut, 'weeks');
                });

                for (var i = 0; i < upcomingFirstRacking.length; i++) {
                    listUpcoming.push({dateType: 'First Racking', date: upcomingFirstRacking[i].firstRackingDate, batch: upcomingFirstRacking[i]});
                }

                var upcomingBottling = _.filter(data, function (e) {
                    return new Date(e.bottlingDate) < moment().add(weeksOut, 'weeks');
                });

                for (var i = 0; i < upcomingBottling.length; i++) {
                    listUpcoming.push({dateType: 'Bottling', date: upcomingBottling[i].bottlingDate, batch: upcomingBottling[i]});
                }

                var upcomingFirstFerm = _.filter(data, function (e) {
                    return new Date(e.firstFermentationStartDate) < moment().add(weeksOut, 'weeks');
                });

                for (var i = 0; i < upcomingFirstFerm.length; i++) {
                    listUpcoming.push({dateType: 'Fermentation Start', date: upcomingFirstFerm[i].firstFermentationStartDate, batch: upcomingFirstFerm[i]});
                }

                var listUpcomingSorted = _.sortBy(listUpcoming,function(e){
                    return new Date(e.date);
                });
                return listUpcomingSorted;
            });
        }

        return {
            upcomingAll: upcomingAll
        };
    }

}());
