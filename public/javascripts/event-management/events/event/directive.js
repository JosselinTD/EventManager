(function(){
	angular.module("event-management")
		.directive("event", [function(){
			return {
				restrict: "E",
				templateUrl: "/javascripts/event-management/events/event/directive.html",
				controller: "EventController",
				controllerAs: "ctrl",
				scope:{
					event: "="
				}
			}
		}]);
})();