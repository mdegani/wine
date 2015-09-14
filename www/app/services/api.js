angular.module('winemakingApp')

.service('api', function(hackstack, mockData){
	var mockBatches = hackstack.mock(mockData.batches);
	//$window.mockBatches = mockBatches;

//only mocking at this point

	var endpoints = {
     batches: function() {
			 return mockBatches;
     }
   };


	this.getAll = function getAll(endpoint) {
		return endpoints[endpoint]().getAll();
	};

	this.get = function get(endpoint, id) {
		return endpoints[endpoint]().get(id);
	};


});
