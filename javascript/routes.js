angular.module('MyPortfolio').config(function($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/home'
		})
		
		.when('/home', {
			templateUrl: "/views/home.html",
			controller: "SlideController",
			resolve: {
				mainslides: function(SlideServ) {
					return SlideServ.getMain('/res/json/slides_main.json');
				}
			}
		})
		
		.when('/blog', {
			templateUrl: "/views/blog.html",
			controller: "BlogListController",
			resolve: {
				rdata: function($route, BlogServ) {
					var dQ = { approved: 'true' };
					var dP = { };	//TODO: projection to retrieve only the data needed
					return BlogServ.get('http://' + location.host + ':3000/reviews2', dQ, dP);
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
					var dQ = { _id: $route.current.params.name };
					var dP = {  };
					return BlogServ.get('http://' + location.host + ':3000/reviews2', dQ, dP);
				}
			}
		})
		
		.otherwise( {redirectTo: '/' } );
});