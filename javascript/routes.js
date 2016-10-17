angular.module('MyPortfolio').config(function($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/blog'
		})
		
		.when('/blog', {
			templateUrl: "/views/blog.html",
			controller: "SlideController"
		})
		
		.when('/vacations', {
			templateUrl: "/views/vacations.html",
			controller: "SlideControllerVacations"
		})
		
		.when('/resume', {
			templateUrl: "/views/resume.html"
		})
		
		.when('/musicapp', {
			templateUrl: "/views/musicdb.html",
			controller: "LibraryController"
		})
		
		.when('/musicapp2', {
			templateUrl: "/views/musicgallery.html",
			controller: "LibraryController"
		})
		
		.when('/reviews/:name', {
			templateUrl: function(params) { return "/views/reviews/"+params.name+".html" }
		})
		
		.otherwise( {redirectTo: '/' } );
});