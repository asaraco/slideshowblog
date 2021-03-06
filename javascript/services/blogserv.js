angular.module("MyPortfolio").factory("BlogServ", ["$http", function BlogServFactory($http) {
	return {
		//Query for a blog entry by key
		get: function(url, qry, prj) {
			var dataobj = { dQuery: qry, dProjection: prj };
			return $http({
				method: 'GET',
				url: url + '?' + $.param(dataobj)
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
		},
		//Update specified blog entry
		update: function(pUrl, pData) {
			return $.ajax(pUrl, {
				type: 'POST',
				contentType: 'application/json',
				dataType: 'json',
				data: pData,
				success: function(response) {
					//console.log(response);
				}
			});
		}
	}
}]);