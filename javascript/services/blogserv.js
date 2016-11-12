angular.module("MyPortfolio").factory("BlogServ", ["$http", function BlogServFactory($http) {
	return {
		//Query for a blog entry by key
		get: function(url, qry) {
			return $http({
				method: 'GET',
				url: url,
				params: qry
			}).success(function(data) {
				console.log("BlogServ Success");
			});
		},
		//Query for a username/password, return username if successful
		getUser: function(url, qry) {
			var promise = $.Deferred();
			$http({
				method: 'GET',
				url: url,
				params: qry
			}).success(function(data) {
				promise.resolve(data[0].username);
			});
			return promise;
		}
	}
}]);