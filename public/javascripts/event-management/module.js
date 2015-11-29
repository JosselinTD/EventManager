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

			$scope.searchFilter = function(obj){
				var re = new RegExp($scope.search, 'i');
				return !$scope.search || re.test(obj.title) || re.test(obj.description) || re.test(obj.date);
			}
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
							method: "PUT",
							transformRequest: angular.identity,
							headers: {'Content-Type': undefined}
						},
						save: { //For file upload, see https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
							method: "POST",
							transformRequest: angular.identity,
							headers: {'Content-Type': undefined}
						}
					}
				),
				serv = this;

			serv.events = Events.query();

			serv.save = function(event, success, error){
				success = success || function(){};
				error = error || function(){};

				var fd = new FormData();
				for (var key in event) {
					if(event.hasOwnProperty(key)){
		            	fd.append(key, event[key]);
		            }
		        }

		        if(event._id){
		        	Events.update({}, fd, function(data){
		        		var updatedEvent = new Events(data);
		        		serv.events.some(function(item){
		        			if(item._id == updatedEvent._id){
		        				angular.extend(item, updatedEvent);
		        				return true;
		        			}
		        			return false;
		        		})
						success();
					}, function(){
						error();
					});
		        } else {
		        	Events.save({}, fd, function(data){
						serv.events.push(new Events(data));
						success();
					}, function(){
						error();
					});
		        }
				
			}
		}]);
})();
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
(function(){
	angular.module("event-management")
		.directive("addEvent", [function(){
			return {
				restict: "E",
				templateUrl: "/javascripts/event-management/events/add-event/directive.html",
				controller:"AddEventController",
				controllerAs:"ctrl"
			}
		}])
		.directive("fileModel", ["$parse", function($parse){ //For file upload, see https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs
			return {
				restrict: "A",
				link: function(scope, element, attrs){
					var model = $parse(attrs.fileModel),
						modelSetter = model.assign;

					element.bind("change", function(){
						scope.$apply(function(){
							modelSetter(scope, element[0].files[0]);
						});
					});
				}
			}
		}]);
})();
(function(){
	angular.module("event-management")
		.controller("EventController", ["$scope", "EventsService", "EventModalService", function($scope, EventsService, EventModalService){
			$scope.edit = function(){
				EventModalService.open($scope.event, "Edit");
			}
		}]);
})();
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
(function(){
	angular.module("event-management")
		.controller("EventModalController", ["$scope", "$uibModalInstance", "EventsService", "initialEvent", "action", function($scope, $uibModalInstance, EventsService, initialEvent, action){
			$scope.add = function(){
				EventsService.save($scope.event, function(){
					$uibModalInstance.close('valid');
				}, function(){
					//TODO Add error management
				});
			};
			$scope.clearEvent = function(){
				$scope.event = angular.copy(initialEvent);
			}
			$scope.cancel = function(){
				$uibModalInstance.dismiss('cancel');
			}
			$scope.event = angular.copy(initialEvent);
			$scope.action = action;
		}]);
})();
(function(){
	angular.module("event-management")
		.service("EventModalService", ["$uibModal", function($uibModal){
			var serv = this;

			this.open = function(event, action){
				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: "/javascripts/event-management/events/modal-event/directive.html",
					controller: "EventModalController",
					size: "lg",
					resolve: {
						initialEvent: function(){
							return event;
						},
						action: function(){
							return action;
						}
					}
				});
			}
		}]);
})();