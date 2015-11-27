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