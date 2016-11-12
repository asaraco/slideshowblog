angular.module('MyPortfolio').directive("blogCrud", function() {
	return {
		restrict: "E",
		templateUrl: "/views/templates/blog-crud.html",
		link: function(scope) {
			//Submitting the form (either add or update)
			$('#crudForm').on('submit', function(e) {
				e.preventDefault();
				$.ajax('http://asaraco.net:3000/reviews', {
					type: 'POST',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify({ "key": $('#taKey').val(), "artist": $('#taArt').val(), "album": $('#taAlb').val(), "year": parseInt($('#taYear').val()), "label": $('#taLab').val(), "author": $('#taAuth').val(), "text": $('#taTxt').val() }),
					success: function(response) {
						console.log("Response!");
						console.log(this.data);
						console.log(response);
					}
				});
			});
			
			//Loading the values based on the key field
			$('#taLoad').on('click', function(e) {
				e.preventDefault();
				$.ajax('http://asaraco.net:3000/reviews2', {
					type: 'GET',
					dataType: 'json',
					data: { "key": $('#taKey').val(), "username": scope.username },
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
			});
			
			//Preview
			$('#crudPreview').on('click', function(e) {
				$(this).attr("href", "#/reviews/" + $('#taKey').val());
			})
			
			//Close
			$('#crudClose').on('click', function(e) {
				$('blog-crud').slideUp();
				$('#crudForm').trigger("reset");
			});
		}
	}
});