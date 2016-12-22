angular.module('MyPortfolio').controller('BlogListController', [ '$scope', '$sce', 'rdata', function($scope, $sce, rdata) {
	//$('#pageTitle').text("Aaron's Blog");
	
	//receive slide data from "BlogServ" factory, by way of route resolve
	$scope.blogposts = rdata.data;
	//$scope.blogpost.text = $sce.trustAsHtml($scope.blogpost.text);
}]);