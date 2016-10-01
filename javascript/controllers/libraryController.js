angular.module('MyPortfolio').controller('LibraryController', [ '$scope', '$http', function($scope, $http) {
	$('#pageTitle').text("Music Library");
	
	$scope.albums = [];
	
	$scope.currentAlbum = null;
	$scope.prevAlbum = null;
	$scope.hidePrev = true;
	
	$http.get('/res/json/musiclib.json').success(function(data) {
		$scope.albums = data;
	});
		
	$scope.setCurrent = function(albumIn) {
		setTimeout(function() {
			$scope.$apply(function() {
				$scope.prevAlbum = $scope.currentAlbum;
				$scope.hidePrev = false;
				$scope.currentAlbum = albumIn;
			});
		}, 1);
		setTimeout(function() {
			$scope.$apply(function() {
				$scope.hidePrev = true;
			});
		}, 1);
	}
}]);