angular.module('MyPortfolio').controller('SlideController', [ '$scope', '$http', '$interval', function($scope, $http, $interval) {
	$('#pageTitle').text("Slideshow Blog");
	
	$scope.slides = [];
	
	$http.get('/res/json/slides.json').success(function(data) {
		$scope.slides = data;
	});
}]);