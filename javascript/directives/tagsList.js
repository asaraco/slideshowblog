angular.module('MyPortfolio').directive("tagsList", ['BlogServ', function(BlogServ) {
	return {
		restrict: "A",
		link: function(scope, element) {
			console.log("Test");
			element.on('click', function(e) {
				var dQ = { approved: 'true', 'tags.t': element.text() };
				console.log("dQ:");
				console.log(dQ);
				var dP = { };
				var taggedBlogs = BlogServ.get('http://' + location.host + ':3000/reviews2', dQ, dP);
				console.log("taggedBlogs:");
				console.log(taggedBlogs);
			});
		}
	};
}]);