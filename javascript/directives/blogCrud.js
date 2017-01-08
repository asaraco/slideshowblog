angular.module('MyPortfolio').directive("blogCrud", ['BlogServ', function(BlogServ) {
	return {
		restrict: "E",
		templateUrl: "/views/templates/blog-crud.html",
		link: function(scope) {
			//Flag blog as not new -- if "New" button is clicked, it gets flagged
			var isNew = false;
			
			//Submitting the form (either add or update)
			$('#crudForm').on('submit', function(e) {
				e.preventDefault();
				
				/* Parse tags, including removing whitespace
				 * CLEAN THIS UP A LITTLE LATER */
				var tagArray = $('#taTagsGeneral').val().split(',');
				for (t in tagArray) {
					t = t.trim();
				}
				var tagArrayG = $('#taTagsGenre').val().split(',');
				for (t in tagArrayG) {
					t = t.trim();
				}
				var tagArrayA = $('#taTagsArtist').val().split(',');
				for (t in tagArrayA) {
					t = t.trim();
				}
				var allTags = {t: tagArray, tGen: tagArrayG, tArt: tagArrayA};
				
				/* send POST request */
				var postUrl = 'http://' + location.host + ':3000/reviews';
				//figure out whether to grab "key" from dropdown or "new key" field
				var postKey = isNew ? $('#newKey').val() : $('#selKey').val();
				//var postID = isNew ? $('#inpID').val() : $('#selKey').val();
				if (isNew) {
					console.log("It's New");
					var postData = JSON.stringify({ "username": scope.username, "_id": $('#inpID').val(), "key": postKey, "artist": $('#inpArt').val(), "album": $('#inpAlb').val(), "year": parseInt($('#inpYear').val()), "label": $('#inpLab').val(), "author": $('#inpAuth').val(), "text": $('#taTxt').val(), "image": $('#inpImg').val(), "approved": $('#selAppr').val(), "tags": allTags  });
				} else {
					console.log("It's Old")
					var postData = JSON.stringify({ "username": scope.username, "key": postKey, "artist": $('#inpArt').val(), "album": $('#inpAlb').val(), "year": parseInt($('#inpYear').val()), "label": $('#inpLab').val(), "author": $('#inpAuth').val(), "text": $('#taTxt').val(), "image": $('#inpImg').val(), "approved": $('#selAppr').val(), "tags": allTags  });
				}
				BlogServ.update(postUrl, postData);
			});
			
			//Loading the values based on the key field
			scope.loadBlog = function() {
				isNew = false;
				/* Initialize height of text area */
				var newHeight = $('#cfSection1').height() - $('#labTxt').height();
				$('#taTxt').css('height', newHeight);
				
				var rs = scope.reviewSelected;
				$('#inpID').val(rs._id);
				$('#inpArt').val(rs.artist);
				$('#inpAlb').val(rs.album);
				$('#inpImg').val(rs.image);
				$('#inpYear').val(rs.year);
				$('#inpLab').val(rs.label);
				$('#inpArt').val(rs.artist);
				$('#inpAuth').val(rs.author);
				$('#selAppr').val(rs.approved);
				$('#taTxt').val(rs.text);
				
				if (rs.tags) {
					console.log(rs.tags);
					$('#taTagsGeneral').val(rs.tags.t);
					$('#taTagsGenre').val(rs.tags.tGen);
					$('#taTagsArtist').val(rs.tags.tArt);
				}
				
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
			}
			
			/* New blog button */
			$('#newBlog').on('click', function(e) {
				isNew = true;
				$('#crudForm').trigger("reset");
				$('#newKey').removeAttr('disabled');
			});
			
			//Preview
			$('#crudPreview').on('click', function(e) {
				$(this).attr("href", "#/reviews/" + $('#selKey').val());
			});
			
			//Close
			$('#crudClose').on('click', function(e) {
				$('blog-crud').fadeOut();
				$('#crudForm').trigger("reset");
			});
		}
	}
}]);