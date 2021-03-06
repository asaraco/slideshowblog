angular.module('MyPortfolio').directive("slidePlayer", ['$interval', function($interval) {
	return {
		restrict: "A",
		link: function(scope, element) {
			/** jQuery code **/
			$(document).ready(function(){
				// Next/Prev button hover opacity
				var navVisible = false;
				$("#slideViewPort")
					.on('mouseenter', function() {
						$('.btnNav').removeClass('.btnHide');
						$('.btnPN svg').css('opacity', '0.25');
						$('.subcap').fadeIn();
					})
					.on('mouseleave', function() {
						$('.btnPN svg').css('opacity', '0');
						$('.subcap').fadeOut();
					});
				$(".btnPN svg")
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
				$(".btnPP svg")
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
				
				// Make links within slideshow work for touch
				// This functionality is being moved to the "end of swipe" behavior
				/*
				$(".slide a").on("touchend", function(event) {
					window.location.href = $(this).attr("href");
				});*/

				// * INITIALIZE SLIDESHOW *
				var slideInterval;
				var isPaused = false;
				var viewport = $('#slideViewPort');
				var slideWidth = viewport.width();
				// Make slideshow 2/3 height of width
				viewport.css("height", slideWidth*0.3 + "px");
				// Recapture slide width when viewport is resized, and adjust inactive slide positions
				$(window).resize(function() {
					var oldSlideWidth = slideWidth;
					slideWidth = viewport.width();
					$('.hiddenL').css("left", "-" + slideWidth + "px");
					$('.hiddenR').css("left", slideWidth + "px");
					//  Make slideshow 2/3 height of width
					viewport.css("height", slideWidth*0.3 + "px");
				});
				
				
				// ***** Main Next/Previous slide functions *****
				
				function nextSlide() {
					var sc = $('.slideCurr');
					//set/remove "slide is hidden on right/left" classes (for the window resize function)
					sc.removeClass("hiddenR").addClass("hiddenL");
					sc.next().removeClass("hiddenL hiddenR");
					//slide current out of view
					sc.animate({"left": "-=" + slideWidth + "px"}, "medium" );
					//simultaneously, target the next one, set it slideWidth to the right, fade it in, and then slide it into view
					sc.next().fadeIn().css('left', slideWidth + "px").animate({"left": "-=" + slideWidth + "px"}, "medium" )
					.end()
					.appendTo('#slideshow');
					//reset "current" and "next" slide classes to whichever are first & last after the appendTo
					$("#slideshow div").removeClass("slideCurr slidePrev");
					$('.slide:first').addClass("slideCurr");
					$('.slide:last').addClass("slidePrev");
				}
				
				function prevSlide() {
					var sc = $('.slideCurr');
					//set/remove classes
					sc.removeClass("hiddenL").addClass("hiddenR");
					$(".slidePrev").removeClass("hiddenL hiddenR");
					//slide current out of view
					sc.animate({"left": "+=" + slideWidth + "px"}, "medium" );
					$(".slidePrev").prependTo('#slideshow');
					//simultaneously, target the previous one, set it slideWidth to the left, fade it in, and then slide it into view
					$(".slidePrev").fadeIn().css("left", "-" + slideWidth + "px").animate({"left": "+=" + slideWidth + "px"}, "medium" );
					//reset classes
					$("#slideshow div").removeClass("slideCurr slidePrev");
					$('.slide:first').addClass("slideCurr");
					$('.slide:last').addClass("slidePrev");
				}
				
				function pauseSlide() {
					$interval.cancel(slideInterval);
					isPaused = true;
					$('.btnPP use').attr("xlink:href", "#playTri");
					console.log($('.btnPP use').attr("xlink:href"));
				}
				
				function playSlide() {
					slideInterval = $interval(function() { nextSlide(); }, 4000);
					isPaused = false;
					$('.btnPP use').attr("xlink:href", "#pauseLns");
					console.log($('.btnPP use').attr("xlink:href"));
				}
				// ***** ----------------------------- *****
				
	
				// Button click events
				
				$(".btnNextSlide").on('click', function() {
					if (isPaused==false) {
						$interval.cancel(slideInterval);
						nextSlide();
						playSlide();
					}
					else {
						nextSlide();
					}
				});
				
				$(".btnPrevSlide").on('click', function() {
					$interval.cancel(slideInterval);
					prevSlide();
					pauseSlide();
				});
				
				$(".btnPP").on('click', function() {
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
				var threshold = slideWidth/2;
				var swipeDir;
				var touchobj;
				var keepSwiping = false;
				
				$(".slide")
					// When finger touches slide
					.on('touchstart', function(event) {
						$('.btnNav').addClass('.btnHide');
						var sc = $('.slideCurr');
						keepSwiping = true;
						$('.subcap').fadeOut();
						$(".btnPP img").css('opacity', '0');
						// Reset slide "left" values just in case
						sc.next().css("left", slideWidth + "px");
						$(".slidePrev").css("left", (-1 * slideWidth) + "px");
						// Default to no swipe direction
						swipeDir = "_";
						//clearInterval(slideInterval);
						$interval.cancel(slideInterval);
						isPaused = true;
						var e = event.originalEvent;			// for jQuery, must point back to original event to access certain properties
						touchobj = e.changedTouches[0];			// reference first touch point (ie: first finger)
						startx = parseInt(touchobj.clientX);	// get x position of touch point relative to left edge of browser
						starty = parseInt(touchobj.clientY);	// get y position of touch point relative to top edge of browser
						//threshold = 1.8*Math.abs(startx - slideWidth/2);	// swipe threshold to trigger slide transition is distance from touch start point to midpoint, *2; i.e. you swipe past the middle
						threshold = 1 * (slideWidth/2);
						//console.log("slideWidth/2 = " + slideWidth/2 + ";  startx = " + startx + ";  Threshold = " + threshold);
						e.preventDefault();						// prevent links & stuff within div from being triggered by touches
						// fade in prev & next slides so they're both ready to be used
						// (and so there's no repeated fadeIn call on every touchmove event)
						sc.next().fadeIn();
						$(".slidePrev").fadeIn();
						// reset classes
						$("#slideshow div").removeClass("slideCurr slidePrev");
						$('.slide:first').addClass("slideCurr");
						$('.slide:last').addClass("slidePrev");
					})
					// When finger moves
					.on('touchmove', function(event) {
						var sc = $('.slideCurr');
						if (keepSwiping) {
							var e = event.originalEvent;
							touchobj = e.changedTouches[0];		// reference first touch point for this event
							distx = Math.ceil( parseInt(touchobj.clientX) - startx );
							e.preventDefault();
							
							// Swiped far enough right to trigger slide transition (PREVIOUS)
							if (distx > threshold) {
								//console.log("distx = " + distx);
								keepSwiping = false;
								swipeDir = "Right";
								//set/remove classes
								sc.removeClass("hiddenL").addClass("hiddenR");
								$(".slidePrev").removeClass("hiddenL hiddenR");
								//slide current out of view
								sc.animate({"left": slideWidth + "px"}, "fast" );
								//slide next one into view
								$(".slidePrev").prependTo('#slideshow');
								$(".slidePrev").animate({"left": "0px"}, "fast" );
							}
							// Swiped far enough left to trigger slide transition (NEXT)
							else if (distx < -1*threshold) {
								//console.log("distx = " + distx);
								keepSwiping = false;
								swipeDir = "Left";
								//set/remove classes
								sc.removeClass("hiddenR").addClass("hiddenL");
								sc.next().removeClass("hiddenL hiddenR");
								//slide current out of view
								sc.animate({"left": "-=" + (slideWidth-distx) + "px"}, "medium" );
								//slide next one into view
								sc.next().animate({"left": "0px" }, "fast" )
								.end().appendTo('#slideshow');
							}
							// For a touch that shouldn't be considered any kind of swipe
							else if (Math.abs(distx) < 10) {
								swipeDir = "_";
							}
							// Standard slide movement
							else {
								sc.css("left", distx + "px");
								
								// Move next/prev slides depending on swipe direction
								if (distx > 0) {
									swipeDir = "Right";	//PREVIOUS
									$(".slidePrev").css("left", (distx - slideWidth) + "px");
									sc.next().css("left", (slideWidth + distx) + "px");
								}
								else {
									swipeDir = "Left";	//NEXT
									sc.next().css("left", (slideWidth + distx) + "px");
									$(".slidePrev").css("left", (distx - slideWidth) + "px");
								}
							}
						}
					})
					// When finger is lifted
					.on('touchend', function(event) {
						var sc = $('.slideCurr');
						var e = event.originalEvent;
						touchobj = e.changedTouches[0];
						e.preventDefault();
						//If user didn't swipe far enough for transition, revert
						if (Math.abs(distx) < slideWidth/2) {
							sc.animate({"left": "-=" + distx + "px"}, "medium" );
							if (swipeDir == "Left") {
								sc.next().animate({"left": "-=" + distx + "px"}, "medium" );
							} else if (swipeDir == "Right") {
								$(".slidePrev").animate({"left": "-=" + distx + "px"}, "medium");
							} else {
								//Swipe wasn't far enough to be considered left or right, so treat as tap (trigger a href)
								window.location.href = $('.slideCurr a').attr("href");
							}
						}
						// reset classes
						$("#slideshow div").removeClass("slideCurr slidePrev");
						$('.slide:first').addClass("slideCurr");
						$('.slide:last').addClass("slidePrev");
						
						// set opacity of caption similar to mouse hover, but disappear after 5 seconds
						$('.subcap').fadeIn();
						setTimeout(function(){
							$('.subcap').fadeOut();
						}, 5000);
						
						// reset "touch distance" measurement (probably not necessary, but it's clean)
						distx = 0;
					});
					
					$(".btnPP img").on('tap', function() {
								$(".btnPP img").css('transform', 'scale(1.5,1.5)').css('opacity', '0');
							});
				
				// Wrapping the whole initialization block in a setTimeOut() because it seems like things fire too soon otherwise
				setTimeout(function() {
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
					scope.$apply(function() {
						slideInterval = $interval(function() { nextSlide(); }, 4000);
					});
				}, 1);
				
				// Destroy the animation interval when we leave this page of the site, so that it starts clean when we come back
				$('#slideshow').on('$destroy', function() {
					$interval.cancel(slideInterval);
				});
			});
		}
	};
}]);