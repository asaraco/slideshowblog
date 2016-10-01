angular.module('MyPortfolio').controller('AlbumController', [ '$http', function($http) {
	this.album = {
		"artist": "TEST ARTIST",
		"albumtitle": "TEST TITLE",
		"released": 2017,
		"genre": "ANY",
		"tracks": [
			"TRACK 1",
			"TRACK 2"
		],
		"coverimage": "/res/img/coverimages/kmax-pgwts.jpg",
		"rating": 1,
		"comments": "NOTHIN"
	};
	
	this.addAlbum = function(library) {
		library.albums.push(this.album);
		$http.post('/res/json/musiclib.json', library.albums).success(function() {
			console.log("Success!")
			});
		this.album = {};
	};
}]);
