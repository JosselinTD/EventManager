(function(){
	angular.module("event-management")
		.controller("EventModalController", ["$scope", "$uibModalInstance", "EventsService", "initialEvent", "action", function($scope, $uibModalInstance, EventsService, initialEvent, action){
			$scope.error = "";

			$scope.add = function(){
				$scope.error = "";
				EventsService.save($scope.event, function(){
					$uibModalInstance.close('valid');
				}, function(error){
					$scope.error = error.message;
				});
			};
			$scope.clearEvent = function(){
				$scope.event = angular.copy(initialEvent);
			}
			$scope.cancel = function(){
				$uibModalInstance.dismiss('cancel');
			}
			$scope.event = angular.copy(initialEvent); //This prevent the modification of the current event until the BDD insertion
			$scope.action = action; //Add or edit
		}]);
})();