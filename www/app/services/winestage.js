(function () {
    'use strict';

    angular.module('winemakingApp').factory('winestage', ['$q', winestage]);
    //bower install angular-cache
    function winestage($q){
        //at first thought the state pattern would work: all stages inherit from base class "batch"
        //but went for a simple API, necessitating the follow funciton which determine a batch's stage
        //based on dates and other properties.
        //Tried to build in a very high level of tollerance for partial data so as to not force the
        //user to enter more than the absolute minimum.

        //synchronous code:
        function notStarted(batch) {
            return (new Date(batch.firstFermentationStartDate) > new Date() || !batch.firstFermentationStartDate)
                &&  (new Date(batch.bottlingDate) > new Date() || !batch.bottlingDate)
                && !batch.bottleInventory;
        }

        function fermenting(batch) {
            return (new Date(batch.firstFermentationStartDate) <= new Date() && batch.firstFermentationStartDate)
                &&  (new Date(batch.bottlingDate) > new Date() || !batch.bottlingDate)
                && !batch.bottleInventory;
        }

        function fermentingPrimary(batch) {
            return (new Date(batch.firstFermentationStartDate)
                <= new Date() && batch.firstFermentationStartDate)
                &&  (new Date(batch.firstRackingDate) > new Date())
                && !batch.bottleInventory;
        }

        function fermentingSecondary(batch) {
            return (new Date(batch.firstRackingDate) <= new Date() && batch.firstRackingDate)
                &&  (new Date(batch.bottlingDate) > new Date() || !batch.bottlingDate)
                && !batch.bottleInventory;
        }

        function bottled(batch) {
            return new Date(batch.bottlingDate) < new Date() && batch.bottlingDate
                && !batch.bottleInventory;
        }

        function cellaredAging(batch) {
            //If inventory is anything other than null, it's cellared (use 0 for users that don't wish to track inventory numbers)
            //return true;
            return (new Date(batch.ageToDate) > new Date() || !batch.ageToDate) && batch.bottleInventory  ;
        }

        function cellaredReady(batch) {
            //return true;
            return new Date(batch.ageToDate) <= new Date() && batch.bottleInventory;
        }

        function currentState(batch) {
            if (notStarted(batch)) {
                return 0;
            }

            if (fermenting(batch)) {
                //fermenting
                // TODO: implement first and second fermentation
                if (true) {
                    return 3; //First Fermentation
                }

                if (false) {
                    return 4; //Second Fermentation
                } else {
                    return 2; //Fermenting(first or second)
                }
            }
            if (bottled(batch)) {
                return 5;
            }
            if (cellaredAging(batch)) {
                return 6;
            }
            if (cellaredReady(batch)) {
                return 7;
            } else {
                return -1; // did not fit any stage criteria
            }
        }

        return {
            notStarted : notStarted,
            fermenting : fermenting,
            fermentingPrimary : fermentingPrimary,
            fermentingSecondary : fermentingSecondary,
            bottled : bottled,
            cellaredAging : cellaredAging,
            cellaredReady : cellaredReady,
            currentState : currentState
        };
    }

}());
