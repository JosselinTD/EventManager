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

				//Change the event in FormData
				var fd = new FormData();
				for (var key in event) {
					if(event.hasOwnProperty(key)){
		            	fd.append(key, event[key]);
		            }
		        }

		        if(event._id){ //We need to check if the event already exist in DB
		        	Events.update({}, fd, function(data){
		        		var updatedEvent = new Events(data);
		        		serv.events.some(function(item){
		        			if(item._id == updatedEvent._id){
		        				angular.extend(item, updatedEvent); //To avoid loosing references, we merge the existing object and its DB update
		        				return true;
		        			}
		        			return false;
		        		})
						success();
					}, function(errorObject){
						error(errorObject.data);
					});
		        } else {
		        	Events.save({}, fd, function(data){
						serv.events.push(new Events(data));
						success();
					}, function(errorObject){
						error(errorObject.data);
					});
		        }
			}
		}]);
})();