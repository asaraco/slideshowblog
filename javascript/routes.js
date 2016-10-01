angular.module('MyPortfolio').config(function($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/blog'
		})
		
		.when('/blog', {
			templateUrl: "/views/blog.html",
			controller: "SlideController"
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
		
		.otherwise( {redirectTo: '/' } );
});