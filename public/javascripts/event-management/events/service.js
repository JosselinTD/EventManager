(function(){
	angular.module("event-management")
		.service("EventsService", ["$resource", function($resource){
			var Events = $resource("/events/:id", null, {
				update: {
					method: "PUT"
				}
			}),
				serv = this;

			this.events = Events.query();
		}]);
})();