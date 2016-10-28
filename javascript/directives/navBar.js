angular.module('MyPortfolio').directive("navBar", function() {
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
				
			// Make navigation links work for touch
			$(".navdiv a").on("touchend", function(event) {
				window.location.href = $(this).attr("href");
			});
			
			// Set headFiller div to same size as heading
			$('#headFiller').css("height", headH);
			win.resize(function() {
				$('#headFiller').css("height", head.height());
			});
			
			// Fixed navigation bar that resizes to get rid of the header when scrolled down
			var i = 0;
			win.scroll(function() {
				var scrollTop = win.scrollTop();
				
				//On scroll, if window scrollbar position is past header height, shorten header
				if ( (scrollTop > headH) && !isHeadShort ) {
					isHeadShort = true;
					head.animate({"top": "-=" + topheadheight}, "medium" );
				//If header is already short and scrollbar position goes back up by the header,
				//expand it again.
				} else if ( (scrollTop < headH) && isHeadShort ) {
					isHeadShort = false;
					head.animate({"top": "+=" + topheadheight}, "fast" );
				}
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
});