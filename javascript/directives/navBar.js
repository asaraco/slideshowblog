angular.module('MyPortfolio').directive("navBar", ['BlogServ', function(BlogServ) {
	return {
		restrict: "E",
		templateUrl: "/views/templates/nav-bar.html",
		link: function(scope, element) {
			/* Initialize variables for scroll scripts */
			var navH = $('.navdiv').height();
			var head = $('.heading');
			var headH = head.height();
			var topheadheight = headH - navH;
			var win = $(window);
			var isHeadShort = false;
				
			// Make navigation links work for touch; also scroll back up
			$(".navdiv a:not('#aDropdown'), .slide a").on("touchend", function(event) {
				window.location.href = $(this).attr("href");
				win.scrollTop(0);
			})
			.on("click", function(event) {
				win.scrollTop(0);
			});
			
			// Set headFiller div to same size as heading
			$('#headFiller').css("height", headH);
			win.resize(function() {
				$('#headFiller').css("height", head.height());
			});
			
			// Fixed navigation bar that resizes to get rid of the header when scrolled down
			var scrollTop, prevScroll = 0;
			win.scroll(function() {
				scrollTop = win.scrollTop();
				
				//On scroll, if scrolling down and past header height, shorten header
				if ( (scrollTop > headH) && !isHeadShort && (scrollTop > prevScroll) ) {
					isHeadShort = true;
					head.animate({"top": "-=" + topheadheight}, "medium" );
				//If header is already short and scrollbar goes back up, expand it again.
				//Use 2 * the header height so we don't catch the top of the page with its pants down.
				} else if ( (scrollTop < (2*headH)) && isHeadShort && (scrollTop < prevScroll) ) {
					isHeadShort = false;
					head.animate({"top": "+=" + topheadheight}, "fast" );
				}
				
				prevScroll = scrollTop;
			});
			
			// Hamburger & Login button
			$('#aDropdown').on('click', function(ev) {
				ev.preventDefault();
				$('#loginBox').slideToggle();
				$('#loginForm').on('submit', function(e) {
					e.preventDefault();
					var rPromise = BlogServ.getUser('http://' + location.host + ':3000/login', { "username": $('#username').val(), "password": $('#password').val() });
					rPromise.done(function(result) {
						scope.username = result;
						console.log(scope.username);
						if (scope.username) {
							$('#loginForm').hide();
							$('#logoutForm').fadeIn();
							/* Display edit bar */
							$('#editBar').fadeIn();
						} else {
							$('#loginAlert').text("Username/password combination not found");
						}
					})
				});
				$('#logoutForm').on('submit', function(e) {
					e.preventDefault();
					scope.username = null;
					$('#logoutForm').hide();
					$('#loginForm').fadeIn();
					$('#editBar').fadeOut();
				});
			});
			
			// Blog DB button
			$('#showCrud').on('click', function(ev) {
				ev.preventDefault();
				$('blog-crud').fadeIn();
				//Initializing the key selection dropdown
				var dQ = { "username": scope.username };
				//var dP = { "key": true };
				var dP = { };
				var dataobj = { dQuery: dQ, dProjection: dP };
				console.log(dataobj);
				var allKeys;
				$.ajax('http://' + location.host + ':3000/reviews2', {
					type: 'GET',
					dataType: 'json',
					data: { dQuery: dQ, dProjection: dP },
					success: function(data) {
						if (data[0]) {
							//If data exists, bind to a scope object, and $apply so the dropdown is updated
							scope.reviewsByUser = data;
							//scope.reviewSelected = scope.reviewsByUser[0];
							scope.$apply();
						} else {
							$('#blogAlert').removeClass('ok').addClass('error').fadeIn().css("visibility", "visible");
							$('#blogAlert span').text("No blog entries found.");
						}
					}
				});
			});
		}
	};
}]);