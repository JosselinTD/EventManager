(function(){
	angular.module("event-management")
		.directive("addEvent", [function(){
			return {
				restict: "E",
				templateUrl: "/javascripts/event-management/events/add-event/directive.html",
				controller:"AddEventController",
				controllerAs:"ctrl"
			}
		}]);
})();