angular.module('MyPortfolio').directive("navBar", function() {
	return {
		restrict: "E",
		templateUrl: "/views/templates/nav-bar.html",
		link: function(scope, element) {
			/* Initialize variables for scroll scripts */
			var nav = $('.navdiv');
			var head = $('.heading');
			var topheadheight = head.height() - nav.height();
			var headoff = head.offset().top;	//when we scroll past the offset, that's when something has to be done
			var win = $(window);
			var isHeadShort = false;
			var prevScrollTop;
			
			if (window.matchMedia('(max-width: 1023px)').matches) {	// Mobile theme
			
				/***** MOBILE THEME *****/
				
				// Fade in hamburger menu after scrolling
				//win.scroll(function() {
					win.on('touchend', function() {
						$('#hamburger-menu').fadeIn();
					});
				//});
				
				// Sidebar popup menu visibility/animation
				var menuOpen = false;
				/*
				$('#hamburger-menu').on('touchend', function() {
					console.log('touch');
					$('#hamburger-menu').css("background", "rgba(255, 0, 0, 1)");
				}); */
				
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
				/*
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
				});*/
				
				
			}  else {
				
				/***** PC THEME *****/
				
				// Make navdiv links black on hover
				/*$(".navdiv").on('mouseenter', function() {
					$('.navlist a, .navdiv img').css('opacity', '1');
				})
				.on('mouseleave', function() {
					$('.navlist a, .navdiv img').css('opacity', '0.5');
				});*/
				
				// Make navigation links work for touch
				$(".navdiv a").on("touchend", function(event) {
					window.location.href = $(this).attr("href");
				});
				
				// Static navigation bar that resizes to get rid of the header when scrolled down
				var i = 0;
				win.scroll(function() {
					var scrollTop = win.scrollTop();
				
					if (scrollTop > head.height()) {
						if ((scrollTop > prevScrollTop) && (i <= topheadheight)) {
							i+=5;
							$('.heading').css("top", "-" + i + "px");
						} else if ((scrollTop < prevScrollTop) && (i > 0)) {
							i-=10;
							$('.heading').css("top", "-" + i + "px");
							isHeadShort = false;
						} else if ((i > topheadheight) && (!isHeadShort)) {
							isHeadShort = true;
						} else {
							//i = 0;
						}
					}
					
					prevScrollTop = scrollTop;
					//console.log("i = " + i);
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
				});
				
			}
		}
	};
});