(function() {
	var app = angular.module('basic-directives', []);
	
	app.directive("navBar", function() {
		return {
			restrict: "E",
			templateUrl: "../views/templates/nav-bar.html"
		};
	});
	
	app.directive("navSide", function() {
		return {
			restrict: "E",
			templateUrl: "../views/templates/nav-side.html"
		};
	});
	
	app.directive("allFooter", function() {
		return {
			restrict: "E",
			templateUrl: "../views/templates/all-footer.html"
		}
	});
})();
