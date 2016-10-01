angular.module('MyPortfolio').directive('libraryDirective', function() {
	return {
		restrict: "A",
		controller: function($scope) {
			this.closeAlbum = function() {
				$scope.currentAlbum = null;
			}
		},
		controllerAs: "libDirCtrl"
	};
});