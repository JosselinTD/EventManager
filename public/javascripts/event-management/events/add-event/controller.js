(function(){
	angular.module("event-management")
		.controller("AddEventController", ["$scope", "EventsService", "EventModalService", function($scope, EventsService, EventModalService){
			var ctrl = this;

			$scope.addEvent = function(){
				EventModalService.open({
					title:"",
					description:"",
					date:"",
					logo:""
				}, "Add");
			};

			
		}]);
})();