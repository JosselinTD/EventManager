(function(){
	angular.module("event-management")
		.service("EventsService", ["$resource", function($resource){
			var Events = $resource("/events/:id", null, {
						update: {
							method: "PUT"
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

			serv.add = function(event, success, error){
				success = success || function(){};
				error = error || function(){};

				var fd = new FormData();
				for (var key in event) {
		            fd.append(key, event[key]);
		        }

				Events.save({}, fd, function(data){
					serv.events.push(new Events(data));
					success();
				}, function(){
					error();
				});
			}
		}]);
})();