(function(){

	/*
		The event-management module handle all the operation on events :
		- Get from the server
		- Display
		- Search / filter
		- Add / Modify events

		The events folder contain the logic for the event list and the event subfolder contain all the logic for each item of the list
	*/

	angular.module("event-management", ["ngResource", "ui.bootstrap"]);
})();
(function(){
	angular.module("event-management")
		.controller("EventsController", ["$scope", "EventsService", function($scope, EventsService){
			$scope.events = EventsService.events;
		}]);
})();
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
(function(){
	angular.module("event-management")
		.service("EventsService", ["$resource", function($resource){
			var Events = $resource("/events/:id", null, {
						update: {
							method: "PUT"
						}
					}
				),
				serv = this;

			serv.events = Events.query();

			serv.add = function(event, success, error){
				success = success || function(){};
				error = error || function(){};

				var newEvent = new Events(event);
				newEvent.$save({}, function(data){
					serv.events.push(new Events(data));
					success();
				}, function(){
					error();
				});
			}
		}]);
})();
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

(function(){
	angular.module("event-management")
		.directive("event", [function(){
			return {
				restrict: "E",
				templateUrl: "/javascripts/event-management/events/event/directive.html",
				scope:{
					event: "="
				}
			}
		}]);
})();