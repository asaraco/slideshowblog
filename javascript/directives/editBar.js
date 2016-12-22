angular.module('MyPortfolio').directive("editBar", ['BlogServ', function(BlogServ) {
	return {
		restrict: "E",
		templateUrl: "/views/templates/edit-bar.html",
		link: function(scope, element) {
			var win = $(window);
			var artstat = $('article');
			/*
			// Fade in edit menu after scrolling
			win.scroll(function() {
				win.on('touchend', function() {
					$('#editBar').fadeIn();
				});
			});
			*/
			
			$('#editMain').on('click', function(e) {
				e.preventDefault();
				$('#editModeForm input').removeAttr('disabled');
				//replace static article with editable textarea
				$('.articleEdit').css('height', $('article').height()).show();
				$('article').hide();
				//switch edit button with save/upload button
				$(this).fadeOut();
				$('#editUpdate').fadeIn();
			});
			
			$('#editUpdate').on('click', function(e) {
				e.preventDefault();
				//send Post request
				var postUrl = 'http://' + location.host + ':3000/reviews';
				var postData = JSON.stringify({ "username": scope.blogpost.username, "key": scope.blogpost.key, "artist": $('#ioArt').val(), "album": $('#ioAlb').val(), "year": parseInt($('#ioYear').val()), "label": $('#ioLab').val(), "text": $('#ioTxt').val() });
				var upPromise = BlogServ.update(postUrl, postData);
				/***** TODO: verify what would happen if the update is NOT successful *****/
				if (upPromise) {
					//revert to View mode
					$('#editModeForm input').attr('disabled', '');
					$('.articleEdit').hide();
					$('article').show();
					$(this).fadeOut();
					$('#editMain').fadeIn();
				} else {
					alert("Update unsuccessful.");
				}
				
			});
			
			// Sidebar popup menu visibility/animation
			/*
			var menuOpen = false;

			$('#hamburger-menu').on('touchend', function() {
				if (!menuOpen) {
					$('#sidebar').fadeIn();
					$('#sidebar ul li:nth-child(1)').animate({"right": "80%"}, "medium");
					$('#sidebar ul li:nth-child(2)').animate({"right": "61%"}, "medium");
					$('#sidebar ul li:nth-child(3)').animate({"right": "42%"}, "medium");
					$('#sidebar ul li:nth-child(4)').animate({"right": "24%"}, "medium");
					menuOpen = true;
				} else {
					$('#sidebar ul li:nth-child(1)').animate({"right": "0.5in"}, "medium");
					$('#sidebar ul li:nth-child(2)').animate({"right": "0.5in"}, "medium");
					$('#sidebar ul li:nth-child(3)').animate({"right": "0.5in"}, "medium");
					$('#sidebar ul li:nth-child(4)').animate({"right": "0.5in"}, "medium");
					$('#sidebar').fadeOut();
					menuOpen = false;
				}
			});
			
			// Close sidebar menu if you tap anywhere outside it
			$(':not(#sidebar):not(#hamburger-menu)').on('touchstart', function() {
				if (menuOpen) {
					$('#sidebar ul li:nth-child(1)').animate({"right": "0.5in"}, "medium");
					$('#sidebar ul li:nth-child(2)').animate({"right": "0.5in"}, "medium");
					$('#sidebar ul li:nth-child(3)').animate({"right": "0.5in"}, "medium");
					$('#sidebar ul li:nth-child(4)').animate({"right": "0.5in"}, "medium");
					$('#sidebar').fadeOut();
					menuOpen = false;
				}
			});
			
			// Sidebar popup menu visibility/animation
			var menuOpen = false;
			$('#hamburger-menu').on('click touchend', function() {
				if (menuOpen) {
					$('#sidebar').slideUp("fast", function() { menuOpen = false; });
				} else {
					console.log($('.heading').css("top"));
					console.log($('.heading').css("height"));
					console.log($('.heading').height());
					var currTop = $('.heading').css("top") + $('.heading').css("height");
					console.log(currTop);
					$('#sidebar').css("top", "8em");
					$('#sidebar').slideDown("fast", function() { menuOpen = true; });
				}
			});
			// Close sidebar menu if you click anywhere outside it
			$(':not(#sidebar)').on('click touchstart', function() {
				if (menuOpen) {
					$('#sidebar').slideUp("fast", function() { menuOpen = false; });
				}
			});*/
		}
	};
}]);