(function(){
	angular.module("event-management")
		.controller("AddEventController", ["$scope", "EventsService", function($scope, EventsService){
			var ctrl = this;

			$scope.clearEvent = function(){
				$scope.newEvent = {
					title:"",
					description:"",
					date:"",
					logo:""
				}
			}

			$scope.add = function(){
				EventsService.add($scope.newEvent, function(){
					$scope.clearEvent();
					ctrl.showAddEvent = false;
				}, function(){
					//TODO Add error management
				});
			}

			$scope.clearEvent();
		}]);
})();