$(document).ready(function(){
	
	// Make navigation links work for touch
	$("a").on("touchend", function(event) {
		window.location.href = $(this).attr("href");
	});
	
	// When scrolling down, display hamburger menu floating widget
	var nav = $('.navdiv');
	var head = $('.heading');
	var topheadheight = head.height() - nav.height();
	var headoff = head.offset().top;	//when we scroll past the offset, that's when something has to be done
	var win = $(window);
	win.scroll(function() {
		var scrollTop = win.scrollTop();
		if (scrollTop > headoff) {
			$('#hamburger-menu').fadeIn();
			
		}
	});
	
	// Sidebar popup menu visibility/animation
	var menuOpen = false;
	console.log("false 11:20");
	/*
	$('#hamburger-menu').on('touchend', function() {
		console.log('touch');
		$('#hamburger-menu').css("background", "rgba(255, 0, 0, 1)");
	}); */
	
	$('#hamburger-menu').on('touchend', function() {
		if (menuOpen) {
			$('#sidebar').slideUp("fast", function() { menuOpen = false; });
		} else {
			$('#sidebar').animate({"left": "1em"}, "medium" );
			$('#sidebar').animate({"width": "90%"}, "medium");
			console.log("Hamburger helper");
		}
	});
	$(':not(#sidebar)').on('touchstart', function() {
		if (menuOpen) {
			$('#sidebar').slideUp("fast", function() { menuOpen = false; });
		}
	});
	
});