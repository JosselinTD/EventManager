(function(){
	/*
	* This modal is a part of the Angular-bootstrap libs. See the documentation at https://angular-ui.github.io/bootstrap/#/modal
	*/
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