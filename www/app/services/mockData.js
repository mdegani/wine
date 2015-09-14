angular.module('winemakingApp')

.constant('mockData', {

	batches: [
		{
			"id": 1,
			"juiceType": 'Merlot',
			"juiceBrand": 'Good Juice Co.',
			"vendor": 'wine co.',
			"firstFermentationStartDate": '2015-01-',
			"firstRackingDate": '2015-02-02',
			"bottlingDate": '2015-03-03',
			"bottleInventory":null,
			"spGrReadings":[]
		},
		{
			"id": 2,
			"juiceType": 'Chardonnay',
			"juiceBrand": 'Good Juice Co.',
			"vendor": 'wine co.',
			"firstFermentationStartDate": '2015-08-01',
			"firstRackingDate": '2015-09-01',
			"bottlingDate": '2015-10-15',
			"bottleInventory":null,
			"spGrReadings":[]
		},
		{
			"id": 3,
			"juiceType": 'Amarone',
			"juiceBrand": 'Sweet Wine!',
			"vendor": 'wine co.',
			"firstFermentationStartDate": '2014-09-01',
			"firstRackingDate": '2015-10-02',
			"bottlingDate": null,
			"bottleInventory":null,
			"spGrReadings":[]
		}
	]
});
