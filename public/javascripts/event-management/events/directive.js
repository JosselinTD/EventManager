(function(){
	angular.module("event-management")
		.directive("events", [function(){
			return {
				restrict: "E",
				templateUrl: "/javascripts/event-management/events/directive.html",
				controller: "EventsController",
				controllerAs: "ctrl"
			}
		}]);
})();