angular.module('MyPortfolio').directive("blogCrud", ['BlogServ', function(BlogServ) {
	return {
		restrict: "E",
		templateUrl: "/views/templates/blog-crud.html",
		link: function(scope) {			
			//Submitting the form (either add or update)
			$('#crudForm').on('submit', function(e) {
				e.preventDefault();
				//Parse tags
				var tagArray = $('#taTagsGeneral').val().split(',');
				var tagArrayG = $('#taTagsGenre').val().split(',');
				var tagArrayA = $('#taTagsArtist').val().split(',');
				console.log(tagArray);
				console.log(tagArrayG);
				console.log(tagArrayA);
				var allTags = {t: tagArray, tGen: tagArrayG, tArt: tagArrayA};
				console.log(allTags);
				var testData = JSON.stringify({ "username": scope.username, "key": $('#selKey').val(), "artist": $('#inpArt').val(), "album": $('#inpAlb').val(), "year": parseInt($('#inpYear').val()), "label": $('#inpLab').val(), "author": $('#inpAuth').val(), "text": $('#taTxt').val(), "tags": allTags });
				console.log(testData);
				$.ajax('http://' + location.host + ':3000/reviews', {
					type: 'POST',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify({ "username": scope.username, "key": $('#selKey').val(), "artist": $('#inpArt').val(), "album": $('#inpAlb').val(), "year": parseInt($('#inpYear').val()), "label": $('#inpLab').val(), "author": $('#inpAuth').val(), "text": $('#taTxt').val(), "tags": allTags  }),
					success: function(response) {
						console.log("Response!");
						console.log(this.data);
						console.log(response);
					}
				});
			});
			
			//Loading the values based on the key field
			$('#btnLoad').on('click', function(e) {
				e.preventDefault();
				$('#inpArt').val(scope.reviewSelected.artist);
				$('#inpAlb').val(scope.reviewSelected.album);
				$('#inpYear').val(scope.reviewSelected.year);
				$('#inpLab').val(scope.reviewSelected.label);
				$('#inpArt').val(scope.reviewSelected.artist);
				$('#inpAuth').val(scope.reviewSelected.author);
				$('#taTxt').val(scope.reviewSelected.text);
				
				$('#taTagsGeneral').val(scope.reviewSelected.tags.t);
				$('#taTagsGenre').val(scope.reviewSelected.tags.tGen);
				$('#taTagsArtist').val(scope.reviewSelected.tags.tArt);
				/*** DELETE THIS CODE LATER... BUT FOR NOW LEAVE IT, YOU PUT A LOT OF WORK INTO IT **
				var dQ = { "key": $('#taKey').val(), "username": scope.username };
				var dP = {};
				$.ajax('http://' + location.host + ':3000/reviews2', {
					type: 'GET',
					dataType: 'json',
					data: { dQuery: dQ, dProjection: dP },
					//data: { "key": $('#taKey').val(), "username": scope.username },
					success: function(data) {
						//The returned data is an array because in theory, a query can return multiple results.
						//But for our purposes we're not doing that, so it should always be index 0.
						console.log("Success!");
						if (data[0]) {
							$('#blogAlert').removeClass('error').css("visibility", "hidden");;
							$('#blogAlert span').text("");
							$('#taArt').val(data[0].artist);
							$('#taAlb').val(data[0].album);
							$('#taYear').val(data[0].year);
							$('#taLab').val(data[0].label);
							$('#taArt').val(data[0].artist);
							$('#taAuth').val(data[0].author);
							$('#taTxt').val(data[0].text);
						} else {
							$('#blogAlert').removeClass('ok').addClass('error').fadeIn().css("visibility", "visible");
							$('#blogAlert span').text("No blog entries found.");
						}
					}
				});
				*/
			});
			
			//Preview
			$('#crudPreview').on('click', function(e) {
				$(this).attr("href", "#/reviews/" + $('#taKey').val());
			})
			
			//Close
			$('#crudClose').on('click', function(e) {
				$('blog-crud').slideUp();
				$('#crudForm').trigger("reset");
				//Remove appended keys from drop-down datalist
				$('#taKeys').empty();
			});
		}
	}
}]);