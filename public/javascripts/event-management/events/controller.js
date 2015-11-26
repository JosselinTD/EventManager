(function(){
	angular.module("event-management")
		.controller("EventsController", ["$scope", "EventsService", function($scope, EventsService){
			$scope.events = EventsService.events;
		}]);
})();