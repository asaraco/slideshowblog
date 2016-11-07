angular.module('MyPortfolio').controller('SlideControllerVacations', [ '$scope', '$http', '$interval', function($scope, $http, $interval) {
	$('#pageTitle').text("Vacations");
	
	$scope.slides = [];
	
	$http.get('/res/json/slides_vacation.json').success(function(data) {
		$scope.slides = data;
		var i = 0;
		for (key in data) {
			$http.get(data[i].simage).success(function(d) {
				i++;
			});
		}
	});
	
}]);