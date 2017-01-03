angular.module('MyPortfolio').controller('BlogListController', [ '$scope', '$sce', 'rdata', function($scope, $sce, rdata) {
	//$('#pageTitle').text("Aaron's Blog");
	
	//receive slide data from "BlogServ" factory, by way of route resolve
	$scope.blogposts = rdata.data;
	//$scope.blogpost.text = $sce.trustAsHtml($scope.blogpost.text);
	
	/* Generate shortened versions */
	for (ind in $scope.blogposts) {
		var post = $scope.blogposts[ind]; 
		var currText = post.text.replace("</P>", "</p>");	//to make sure the indexOf() works case-insensitively
		var firstP = currText.indexOf("</p>") + 4;			//add 4 so that it includes the </p>
		//If firstP is 3, that means indexOf returned -1, AKA no </p> was found. So just do the whole thing.
		if (firstP == 3) {
			firstP = post.length;
		}
		post.summary = currText.substr(0, firstP);
		console.log(post.summary);
	}
}]);