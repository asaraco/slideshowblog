(function() {
	var app = angular.module('slideshowblog', ['basic-directives']);
	
	app.controller('SlideController', [ '$scope', '$http', function($scope, $http) {
		var slidelib = this;
		
		slidelib.slides = [];
		
		$http.get('../res/json/slides.json').success(function(data) {
			slidelib.slides = data;
		});
	}]);
	/*
	app.directive("slideInit", function() {
		return {
			restrict: "A",
			link: function() {

			}
		};
	}); */
})();