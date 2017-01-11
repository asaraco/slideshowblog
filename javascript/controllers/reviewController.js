angular.module('MyPortfolio').controller('ReviewController', [ '$scope', '$sce', 'rdata', function($scope, $sce, rdata) {
	//$('#pageTitle').text("Slideshow Blog");
	
	//receive slide data from "BlogServ" factory, by way of route resolve
	$scope.blogpost = rdata.data[0];
	$scope.blogpost.text = $sce.trustAsHtml($scope.blogpost.text);
	
	//If user is already logged in, display edit bar
	console.log("$scope.username: "+$scope.username);
	if ($scope.username) {
		$('#editBar').show();
	}
}]);