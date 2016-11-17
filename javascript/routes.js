angular.module('MyPortfolio').config(function($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/blog'
		})
		
		.when('/blog', {
			templateUrl: "/views/blog.html",
			controller: "SlideController",
			resolve: {
				mainslides: function(SlideServ) {
					return SlideServ.getMain('/res/json/slides_main.json');
				}
			}
		})
		
		.when('/vacations', {
			templateUrl: "/views/vacations.html",
			controller: "SlideController",
			resolve: {
				mainslides: function(SlideServ) {
					return SlideServ.getMain('/res/json/slides_vacation.json');
				}
			}
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
			templateUrl: "/views/templates/review_album.html",
			controller: "ReviewController",
			resolve: {
				rdata: function($route, BlogServ) {
					var dQ = { key: $route.current.params.name };
					var dP = {  };
					return BlogServ.get('http://' + location.host + ':3000/reviews2', dQ, dP);
				}
			}
		})
		
		.otherwise( {redirectTo: '/' } );
});