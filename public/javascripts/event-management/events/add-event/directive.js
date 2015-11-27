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