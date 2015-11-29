(function(){
	angular.module("event-management")
		.controller("EventsController", ["$scope", "EventsService", function($scope, EventsService){
			$scope.events = EventsService.events;
			$scope.pastEvents = false;

			$scope.searchFilter = function(obj){
				var re = new RegExp($scope.search, 'i');
				if(!$scope.pastEvents && obj.past){
					return false;
				}
				return !$scope.search || re.test(obj.title) || re.test(obj.description) || re.test(obj.date);
			}
		}]);
})();