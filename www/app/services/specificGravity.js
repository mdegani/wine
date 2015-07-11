(function () {
    'use strict';

    angular.module('winemakingApp').factory('specificGravity', [specificGravity]);

    function specificGravity() {

        function latestPrimaryReading(batch) {
            if (batch.spGrReadings.length === 0) {
                return 'n/a';
            }
            var primaryReadings = _.filter(batch.spGrReadings, function (e) {
                return new Date(e.readingDate) <= batch.firstRackingDate;
            });
            if (primaryReadings.length === 0) {
                return 'n/a';
            }
            var sortedPrimaryReadings = _.sortBy(primaryReadings, function (e) {
                return new Date(e.readingDate);
            });

            return _.last(sortedPrimaryReadings).readingValue;
        }

        function latestSecondaryReading(batch) {
            if (batch.spGrReadings.length === 0) {
                return 'n/a';
            }
            var secondaryReadings = _.filter(batch.spGrReadings, function (e) {
                return new Date(e.readingDate) > batch.firstRackingDate && new Date(e.readingDate) <= batch.bottlingDate;
            });
            if (secondaryReadings.length === 0) {
                return 'n/a';
            }
            var sortedSecondaryReadings = _.sortBy(secondaryReadings, function (e) {
                return new Date(e.readingDate);
            });
            return _.last(sortedSecondaryReadings).readingValue;
        }

        function firstReading(batch) {
            if (batch.spGrReadings.length === 0) {
                return 'n/a';
            }
            var sortedReadings = _.sortBy(batch.spGrReadings, function (e) {
                return new Date(e.readingDate);
            });
            return _.first(sortedReadings).readingValue;
        }

        function latestPrimaryReadingDate(batch) {
            if (batch.spGrReadings.length === 0) {
                return '-';
            }
            var primaryReadings = _.filter(batch.spGrReadings, function (e) {
                return new Date(e.readingDate) <= batch.firstRackingDate;
            });
            if (primaryReadings.length === 0) {
                return '-';
            }
            var sortedPrimaryReadings = _.sortBy(primaryReadings, function (e) {
                return new Date(e.readingDate);
            });
            return _.last(sortedPrimaryReadings).readingDate;
        }

        function latestSecondaryReadingDate(batch) {
            if (batch.spGrReadings.length === 0) {
                return '-';
            }
            var secondaryReadings = _.filter(batch.spGrReadings, function (e) {
                return new Date(e.readingDate) > batch.firstRackingDate && new Date(e.readingDate) <= batch.bottlingDate;
            });
            if (secondaryReadings.length === 0) {
                return '-';
            }
            var sortedSecondaryReadings = _.sortBy(secondaryReadings, function (e) {
                return new Date(e.readingDate);
            });
            return _.last(sortedSecondaryReadings).readingDate;
        }

        function firstReadingDate(batch) {
            if (batch.spGrReadings.length === 0) {
                return '-';
            }
            var sortedReadings = _.sortBy(batch.spGrReadings, function (e) {
                return new Date(e.readingDate);
            });
            return _.first(sortedReadings).readingDate;
        }

        return {
            firstReading: firstReading,
            latestPrimaryReading: latestPrimaryReading,
            latestSecondaryReading: latestSecondaryReading,
            firstReadingDate: firstReadingDate,
            latestPrimaryReadingDate: latestPrimaryReadingDate,
            latestSecondaryReadingDate: latestSecondaryReadingDate
        };
    }
}());
