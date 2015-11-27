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