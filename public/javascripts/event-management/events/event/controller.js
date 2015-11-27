(function(){
	angular.module("event-management")
		.controller("EventController", ["$scope", "EventsService", "EventModalService", function($scope, EventsService, EventModalService){
			$scope.edit = function(){
				EventModalService.open($scope.event, "Edit");
			}
		}]);
})();