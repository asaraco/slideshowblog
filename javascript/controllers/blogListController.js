angular.module('MyPortfolio').controller('BlogListController', [ '$scope', '$sce', 'rdata', 'BlogServ', function($scope, $sce, rdata, BlogServ) {
	//$('#pageTitle').text("Aaron's Blog");
	
	//receive slide data from "BlogServ" factory, by way of route resolve
	$scope.blogposts = rdata.data;
	//$scope.blogpost.text = $sce.trustAsHtml($scope.blogpost.text);
	
	/* Generate shortened versions */
	var generateSummaries = function(blogs) {
		for (ind in blogs) {
			var post = blogs[ind]; 
			var currText = post.text.replace("</P>", "</p>");	//to make sure the indexOf() works case-insensitively
			var firstP = currText.indexOf("</p>") + 4;			//add 4 so that it includes the </p>
			//If firstP is 3, that means indexOf returned -1, AKA no </p> was found. So just do the whole thing.
			if (firstP == 3) {
				firstP = post.length;
			}
			post.summary = currText.substr(0, firstP);
		}
	}
	
	/* Function called when you click on a tag */
	$scope.tagApply = function(type, tag) {
		//Pass in tag type -- figure out a better way to do this later
		console.log(type);
		//Trim whitespace from tag
		tag = tag.trim();
		var dQ = { };
		if (type == 't') {
			dQ = { approved: 'true', 'tags.t': tag };
		} else if (type == 'tGen') {
			dQ = { approved: 'true', 'tags.tGen': tag };
		} else if (type == 'tArt') {
			dQ = { approved: 'true', 'tags.tArt': tag };
		}
		
		var dP = { };
		BlogServ.get('http://' + location.host + ':3000/reviews2', dQ, dP).then(function(data) {
			var taggedBlogs = data.data;
			generateSummaries(taggedBlogs);
			$scope.blogposts = taggedBlogs;
		});
	}
	
	generateSummaries($scope.blogposts);
}]);