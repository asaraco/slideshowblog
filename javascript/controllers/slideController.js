angular.module('MyPortfolio').controller('SlideController', [ '$scope', '$interval', 'mainslides', function($scope, $interval, mainslides) {
	$('#pageTitle').text("Slideshow Blog");
	
	//receive slide data from "SlideServ" factory, by way of route resolve
	$scope.slides = mainslides.data;
}]);