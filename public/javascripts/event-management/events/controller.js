(function(){
	angular.module("event-management")
		.controller("EventsController", ["$scope", "EventsService", function($scope, EventsService){
			$scope.events = EventsService.events;

			$scope.searchFilter = function(obj){
				var re = new RegExp($scope.search, 'i');
				return !$scope.search || re.test(obj.title) || re.test(obj.description) || re.test(obj.date);
			}
		}]);
})();