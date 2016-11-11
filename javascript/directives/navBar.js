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
			$(".navdiv a, .slide a").on("touchend", function(event) {
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
			$('#aHamburger').on('click', function() {
				$('#loginBox').slideToggle();
				$('#loginForm').on('submit', function(e) {
					e.preventDefault();
					var rPromise = BlogServ.getUser('http://localhost:3000/login', { "username": $('#username').val(), "password": $('#password').val() });
					rPromise.done(function(result) {
						scope.username = result;
						console.log(scope.username);
						if (scope.username) {
							$('#loginForm').hide();
							$('#logoutForm').fadeIn();
							$('blog-crud').slideDown();
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
				});
			});
			
			/*
			// Fade in hamburger menu after scrolling
			//win.scroll(function() {
				win.on('touchend', function() {
					$('#hamburger-menu').fadeIn();
				});
			//});
			
			// Sidebar popup menu visibility/animation
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