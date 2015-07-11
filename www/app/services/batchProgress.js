(function () {
    'use strict';

    angular.module('winemakingApp').factory('batchProgress', [batchProgress]);

    function batchProgress() {

        function daysThruFirst(batch) {
            return Math.max(0, daysDiff(moment.min([batch.firstRackingDate, moment()]), batch.firstFermentationStartDate));
        }

        function daysThruSecond(batch) {
            return Math.max(0, daysDiff(moment.min([batch.bottlingDate, moment()]), batch.firstRackingDate));
        }

        function daysThruTotal(batch) {
            return Math.max(0, daysDiff(moment.min([batch.bottlingDate, moment()]), batch.firstFermentationStartDate));
        }

        function firstFermDays(batch) {
            // TODO: validation of dates temporal sequnce
            return daysDiff(batch.firstRackingDate, batch.firstFermentationStartDate);
        }

        function secondFermDays(batch) {
            return daysDiff(batch.bottlingDate, batch.firstRackingDate);
        }

        function totalDays(batch) {
            return daysDiff(batch.bottlingDate, batch.firstFermentationStartDate);
        }

        function daysDiff(date2, date1) {
            var a = moment(date2);
            var b = moment(date1);

            //using moment because subracting date with javascript resulted in errors having to do with daylist savings time
            return a.diff(b, 'days');
            //return (new Date(date2.getFullYear(), date2.getMonth(), date2.getDate()) - new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())/(1000*60*60*24);
        }


        return {
            daysThruFirst: daysThruFirst,
            daysThruSecond: daysThruSecond,
            daysThruTotal: daysThruTotal,
            firstFermDays: firstFermDays,
            secondFermDays: secondFermDays,
            totalDays: totalDays
        };
    }
}());
