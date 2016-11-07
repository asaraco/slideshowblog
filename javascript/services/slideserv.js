angular.module("MyPortfolio").factory("SlideServ", ["$http", function SlideServFactory($http) {
	return {
		getMain: function(url) {
			return $http.get(url).success(function(data) {
				//on success, also ensure that each image is downloaded
				var i = 0;
				for (key in data) {
					$http.get(data[i].simage).success(function(d) {
						i++;
					});
				}
			});
		},
		getImg: function(inData) {
			var i = 0;
			for (key in inData) {
				$http.get(inData[i].simage).success(function(d) {
					i++;
				});
			}
		}
	}
}]);