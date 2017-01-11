angular.module('MyPortfolio').directive("blogCrud", ['BlogServ', function(BlogServ) {
	return {
		restrict: "E",
		templateUrl: "/views/templates/blog-crud.html",
		link: function(scope) {
			//Flag blog as not new -- if "New" button is clicked, it gets flagged
			var isNew = false;
			
			/* Function used for POSTing a blog entry to the Node Mongo interface */
			var postBlog = function(postKey) {
				/* Parse tags, including removing whitespace
				 * CLEAN THIS UP A LITTLE LATER */
				var tagArray = $('#taTagsGeneral').val().split(',');
				for (t in tagArray) {
					tagArray[t] = tagArray[t].trim();
				}
				var tagArrayG = $('#taTagsGenre').val().split(',');
				for (t in tagArrayG) {
					tagArrayG[t] = tagArrayG[t].trim();
				}
				var tagArrayA = $('#taTagsArtist').val().split(',');
				for (t in tagArrayA) {;
					tagArrayA[t] = tagArrayA[t].trim();
				}
				var allTags = {t: tagArray, tGen: tagArrayG, tArt: tagArrayA};
				
				/* send POST request */
				var postUrl = 'http://' + location.host + ':3000/reviews';
				//figure out whether to grab "key" from dropdown or "new key" field
				//var postID = isNew ? $('#inpID').val() : $('#selKey').val();
				if (isNew) {
					console.log("It's New");
					var postData = JSON.stringify({ "username": scope.username, "_id": postKey, "artist": $('#inpArt').val(), "album": $('#inpAlb').val(), "year": parseInt($('#inpYear').val()), "label": $('#inpLab').val(), "author": $('#inpAuth').val(), "text": $('#taTxt').val(), "image": $('#inpImg').val(), "approved": $('#selAppr').val(), "blogtype": $('#selType').val(), "tags": allTags  });
				} else {
					console.log("It's Old")
					var postData = JSON.stringify({ "username": scope.username, "_id": postKey, "artist": $('#inpArt').val(), "album": $('#inpAlb').val(), "year": parseInt($('#inpYear').val()), "label": $('#inpLab').val(), "author": $('#inpAuth').val(), "text": $('#taTxt').val(), "image": $('#inpImg').val(), "approved": $('#selAppr').val(), "blogtype": $('#selType').val(), "tags": allTags  });
				}
				console.log("POSTDATA");
				console.log(postData);
				BlogServ.update(postUrl, postData);
			}
			
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
				$('#selType').val(rs.blogtype);
				$('#taTxt').val(rs.text);
				
				if (rs.tags) {
					console.log(rs.tags);
					$('#taTagsGeneral').val(rs.tags.t);
					$('#taTagsGenre').val(rs.tags.tGen);
					$('#taTagsArtist').val(rs.tags.tArt);
				}
			}
			
			/* New blog button */
			$('#newBlog').on('click', function(e) {
				e.preventDefault();
				isNew = true;
				$('#crudForm').trigger("reset");
				$('#newKey').removeAttr('disabled');
			});
			
			/* Save As button */
			$('#saveAs').on('click', function(e) {
				e.preventDefault();
				var newKey = prompt("Enter the new key that you want to save the blog as:");
				if (newKey) {
					isNew = true;
					console.log("IsNew: "+isNew);
					postBlog(newKey);
				}
			});
			
			/* Preview button */
			$('#crudPreview').on('click', function(e) {
				$(this).attr("href", "#/reviews/" + $('#selKey').val());
			});
			
			/* Close button */
			$('#crudClose').on('click', function(e) {
				$('blog-crud').fadeOut();
				$('#crudForm').trigger("reset");
			});
			
			/* Submit button */
			$('#crudForm').on('submit', function(e) {
				e.preventDefault();
				isNew = false;	//this should already be false, but just in case
				postBlog($('#selID').val());
			});
		}
	}
}]);