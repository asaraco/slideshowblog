$(document).ready(function(){
	
	// Subtly fade elements in on screen load
	$(".heading, .maindiv").contents().css( 'opacity', '0' );
	$(".heading, .maindiv").contents().animate({ 'opacity': '1'}, 200);
	$(".navdiv a").on({
		click: function(e) {
			e.preventDefault();
			href = $(this).attr('href');
			$(".heading, .maindiv").contents().animate({ 'opacity': '0'}, 200, function() {
				window.location = href; });
			}
			
	});
	
	// Make navigation links work for touch
	$("a").on("touchend", function(event) {
		window.location.href = $(this).attr("href");
	});
	
	// Match sidebar div height to main div IF sidebar is shorter
	/*
	if ($(".navdiv").height() < $(".maindiv").height()) {
		$(".navdiv").css('height', $(".maindiv").height());
		$(".otherdiv").css('height', $(".maindiv").height());
	} */
	
	// Next/Prev button hover opacity
	var navVisible = false;
	$("#slideViewPort")
		.on('mouseenter', function() {
			$('.btnPN img').css('opacity', '0.25');
			$('.subcap').fadeIn();
		})
		.on('mouseleave', function() {
			$('.btnPN img').css('opacity', '0');
			$('.subcap').fadeOut();
		});
	$(".btnPN img")
		.on('mouseenter', function() {
			$(this).css('opacity', '0.75');
		})
		.on('mouseleave', function() {
			$(this).css('opacity', '0.25');
		})
		.on('mousedown', function() {
			$(this).css('opacity', '1');
		})
		.on('mouseup', function() {
			$(this).css('opacity', '0.5');
		});
		
	// Pause/Play button hover opacity
	$(".btnPP img")
		.on('mouseenter', function() {
			$(this).css('opacity', '0.5');
		})
		.on('mouseleave', function() {
			$(this).css('opacity', '0');
		})
		.on('mousedown', function() {
			$(this).css('transform', 'scale(1.5,1.5)');
		})
		.on('mouseup', function() {
			$(this).css('transform', 'scale(1,1)');
		});
		
		
	// * INITIALIZE SLIDESHOW *
	var slideInterval;
	var isPaused = false;
	var slideWidth = $('#slideViewPort').width();
	//Make slideshow 2/3 height of width
	$('#slideViewPort').css("height", slideWidth*0.4 + "px");
	// Recapture slide width when viewport is resized, and adjust inactive slide positions
	$(window).resize(function() {
		var oldSlideWidth = slideWidth;
		slideWidth = $('#slideViewPort').width();
		$('.hiddenL').css("left", "-" + slideWidth + "px");
		$('.hiddenR').css("left", slideWidth + "px");
		//Make slideshow half height of width
		$('#slideViewPort').css("height", slideWidth*0.4 + "px");
	});
	
	
	// ***** Main Next/Previous slide functions *****
	
	function nextSlide() {
		//set/remove "slide is hidden on right/left" classes (for the window resize function)
		$(".slideCurr").removeClass("hiddenR").addClass("hiddenL");
		$(".slideCurr").next().removeClass("hiddenL hiddenR");
		//slide current out of view
		$(".slideCurr").animate({"left": "-=" + slideWidth + "px"}, "medium" );
		//simultaneously, target the next one, set it slideWidth to the right, fade it in, and then slide it into view
		$(".slideCurr").next().fadeIn().css('left', slideWidth + "px").animate({"left": "-=" + slideWidth + "px"}, "medium" )
		.end()
		.appendTo('#slideshow');
		//reset "current" and "next" slide classes to whichever are first & last after the appendTo
		$("#slideshow div").removeClass("slideCurr slidePrev");
		$('.slide:first').addClass("slideCurr");
		$('.slide:last').addClass("slidePrev");
	}
	
	function prevSlide() {
		//set/remove classes
		$(".slideCurr").removeClass("hiddenL").addClass("hiddenR");
		$(".slidePrev").removeClass("hiddenL hiddenR");
		//slide current out of view
		$(".slideCurr").animate({"left": "+=" + slideWidth + "px"}, "medium" );
		$(".slidePrev").prependTo('#slideshow');
		//simultaneously, target the previous one, set it slideWidth to the left, fade it in, and then slide it into view
		$(".slidePrev").fadeIn().css("left", "-" + slideWidth + "px").animate({"left": "+=" + slideWidth + "px"}, "medium" );
		//reset classes
		$("#slideshow div").removeClass("slideCurr slidePrev");
		$('.slide:first').addClass("slideCurr");
		$('.slide:last').addClass("slidePrev");
	}
	
	function pauseSlide() {
		clearInterval(slideInterval);
		isPaused = true;
		$('.btnPP img').attr("src", "play.png");
	}
	
	function playSlide() {
		slideInterval = setInterval(function() { nextSlide(); }, 4000);
		isPaused = false;
		$('.btnPP img').attr("src", "pause.png");
	}
	// ***** ----------------------------- *****
	

	// Button click events
	
	$(".btnNextSlide").on('click touchend', function() {
		if (isPaused==false) {
			clearInterval(slideInterval);
			nextSlide();
			playSlide();
		}
		else {
			nextSlide();
		}
	});
	
	$(".btnPrevSlide").on('click touchend', function() {
		clearInterval(slideInterval);
		prevSlide();
		pauseSlide();
	});
	
	$(".btnPP").on('click touchend', function() {
		if (isPaused==false) {
			pauseSlide();
		}
		else {
			playSlide();
		}
	});
	
	// Touch events
	
    var startx = 0;
    var distx = 0;
	var swipeDir;
	var touchobj;
	var keepSwiping = false;
	
	$(".slide")
		// When finger touches slide
		.on('touchstart', function(event) {
			keepSwiping = true;
			$('.subcap').fadeOut();
			$(".btnPP img").css('opacity', '0');
			// Reset slide "left" values just in case
			$(".slideCurr").next().css("left", slideWidth + "px");
			$(".slidePrev").css("left", (-1 * slideWidth) + "px");
			// Default to no swipe direction
			swipeDir = "_";
			//$("#swipeCounter").text("slideWidth = " + slideWidth + "px");
			clearInterval(slideInterval);
			isPaused = true;
			var e = event.originalEvent;			// for jQuery, must point back to original event to access certain properties
			touchobj = e.changedTouches[0];			// reference first touch point (ie: first finger)
			startx = parseInt(touchobj.clientX);	// get x position of touch point relative to left edge of browser
			starty = parseInt(touchobj.clientY);	// get y position of touch point relative to top edge of browser
			e.preventDefault();						// prevent links & stuff within div from being triggered by touches
			// fade in prev & next slides so they're both ready to be used
			// (and so there's no repeated fadeIn call on every touchmove event)
			$(".slideCurr").next().fadeIn();
			$(".slidePrev").fadeIn();
			// reset classes
			$("#slideshow div").removeClass("slideCurr slidePrev");
			$('.slide:first').addClass("slideCurr");
			$('.slide:last').addClass("slidePrev");
		})
		// When finger moves
		.on('touchmove', function(event) {
			if (keepSwiping) {
				var e = event.originalEvent;
				touchobj = e.changedTouches[0];		// reference first touch point for this event
				distx = Math.ceil( parseInt(touchobj.clientX) - startx );
				e.preventDefault();
				
				// Swiped far enough right to trigger slide transition (PREVIOUS)
				if (distx > slideWidth/2) {
					keepSwiping = false;
					swipeDir = "Right";
					//$("#swipeCounter").text(swipeDir + " " + distx.toString());
					//set/remove classes
					$(".slideCurr").removeClass("hiddenL").addClass("hiddenR");
					$(".slidePrev").removeClass("hiddenL hiddenR");
					//slide current out of view
					$(".slideCurr").animate({"left": slideWidth + "px"}, "fast" );
					//slide next one into view
					$(".slidePrev").prependTo('#slideshow');
					$(".slidePrev").animate({"left": "0px"}, "fast" );
				}
				// Swiped far enough left to trigger slide transition (NEXT)
				else if (distx < -1*slideWidth/2) {
					keepSwiping = false;
					swipeDir = "Left";
					//$("#swipeCounter").text(swipeDir + " " + distx.toString());
					//set/remove classes
					$(".slideCurr").removeClass("hiddenR").addClass("hiddenL");
					$(".slideCurr").next().removeClass("hiddenL hiddenR");
					//slide current out of view
					$(".slideCurr").animate({"left": "-=" + (slideWidth-distx) + "px"}, "medium" );
					//slide next one into view
					$(".slideCurr").next().animate({"left": "0px" }, "fast" )
					.end().appendTo('#slideshow');
				}
				// For a touch that shouldn't be considered any kind of swipe
				else if (Math.abs(distx) < 10) {
					swipeDir = "_";
				}
				// Standard slide movement
				else {
					$(".slideCurr").css("left", distx + "px");
					
					// Move next/prev slides depending on swipe direction
					if (distx > 0) {
						swipeDir = "Right";	//PREVIOUS
						$(".slidePrev").css("left", (distx - slideWidth) + "px");
						$(".slideCurr").next().css("left", (slideWidth + distx) + "px");
						
						/*
						//TEST OUTPUT
						$("#swipeCounter").text(
												"$('.slidePrev').css('left', " + (distx - slideWidth) + "px) \n" +
												"$('.slideCurr').css('left', " + distx + "px) \n" +
												"$('.slideCurr').next().css('left', " + (slideWidth + distx) + "px)"
												);
						//$("#swipeCounter").text("Current slide swiping " + swipeDir + "; CSS LEFT attribute = " + $(".slideCurr").css("left").toString());
						*/
					}
					else {
						swipeDir = "Left";	//NEXT
						$(".slideCurr").next().css("left", (slideWidth + distx) + "px");
						$(".slidePrev").css("left", (distx - slideWidth) + "px");
						/*
						//TEST OUTPUT
						$("#swipeCounter").text(
												"$('.slidePrev').css('left', " + (distx - slideWidth) + "px) \n" +
												"$('.slideCurr').css('left', " + distx + "px) \n" +
												"$('.slideCurr').next().css('left', " + (slideWidth + distx) + "px)"
												);
						//$("#swipeCounter").text("Current slide swiping " + swipeDir + "; CSS LEFT attribute = " + $(".slideCurr").css("left").toString());
						*/
					}
				}
			}
		})
		// When finger is lifted
		.on('touchend', function(event) {
			//$("#swipeCounter").text("touchend");
			var e = event.originalEvent;
			touchobj = e.changedTouches[0];
			e.preventDefault();
			//If user didn't swipe far enough for transition, revert
			if (Math.abs(distx) < slideWidth/2) {
				$(".slideCurr").animate({"left": "-=" + distx + "px"}, "medium" );
				if (swipeDir == "Left") {
					$(".slideCurr").next().animate({"left": "-=" + distx + "px"}, "medium" );
				}
				else {
					$(".slidePrev").animate({"left": "-=" + distx + "px"}, "medium");
				}
			}
			// reset classes
			$("#slideshow div").removeClass("slideCurr slidePrev");
			$('.slide:first').addClass("slideCurr");
			$('.slide:last').addClass("slidePrev");
			
			// set opacity of control elements similar to mouse hover, but disappear after 5 seconds
			$('.subcap').fadeIn();
			$(".btnPP img").css('opacity', '0.5');
			setTimeout(function(){
				$('.subcap').fadeOut();
				$(".btnPP img").css('opacity', '0');
			}, 5000);
			
			// reset "touch distance" measurement (probably not necessary, but it's clean)
			distx = 0;
		});
		
		$(".btnPP img").on('tap', function() {
					$(".btnPP img").css('transform', 'scale(1.5,1.5)').css('opacity', '0');
				});
	
	// ***** INITIALIZATION *****
	// **************************
	
	//Start by setting all slide divs to be slideWidth right of the main view div
	$(".slide:gt(0)").css('left', slideWidth + "px").addClass("hiddenR");
	$(".subcap").hide();
	
	//Set first slide to "slideCurr", last slide to "slidePrev"
	$('.slide:first').addClass("slideCurr");
	$('.slide:last').addClass("slidePrev");
	
	//Start the initial slideshow interval, which will continue to run automatically until interrupted.
	//This interval will be destroyed if the user clicks an arrow, but a new one will be created.
	slideInterval = setInterval(function() { nextSlide(); }, 4000);
	
});