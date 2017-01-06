angular.module('MyPortfolio').directive("tagsList", ['BlogServ', function(BlogServ) {
	return {
		restrict: "A",
		link: function(scope, element) {
			element.on('click', function(e) {
				scope.tagApply(element.text());
				/*
				var dQ = { approved: 'true', 'tags.t': element.text() };
				var dP = { };
				var taggedBlogs = BlogServ.get('http://' + location.host + ':3000/reviews2', dQ, dP);
				console.log("taggedBlogs:");
				console.log(taggedBlogs);
				*/
			});
		}
	};
}]);