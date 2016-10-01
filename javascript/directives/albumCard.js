angular.module('MyPortfolio').directive("albumCard", function() {
	return {
		restrict: "E",
		templateUrl: "/views/templates/album-card.html",
		scope: {
			album: "=",
			prev: "=",
			fade: "="
		},
		require: "^libraryDirective",
		link: function(scope, el, attrs, ldc) {
			//FOR MOBILE GALLERY
			//$('.albuminfo').css("height", acw);
			scope.closeIt = function() {
				ldc.closeAlbum();
			}
			
			// Mobile gallery touch events
			if (window.matchMedia('(max-width: 1023px)').matches) {
				$(document).ready(function(){
					el.mobileFadedIn = false;
					$(el).on('touchend', function() {
						if (($('.albuminfo', el).css("display", "none")) && !(el.mobileFadedIn)) {
							$('.albuminfo', el).fadeIn();
							el.mobileFadedIn = true;
						} else if (el.mobileFadedIn) {
							$('.albuminfo', el).fadeOut();
							el.mobileFadedIn = false;
						}
						
					});
				});
			}
			
			// Size album art height to match width, then calculate whether
			// tracklist or album info are taller than that. If so, depending
			// on which one is taller, modify the font size so it fits.
			el.getSizing = function() {
				// Start with everything at font size 1
				$('.trackinfo, .userdata', el).css("font-size", "1em");
				console.log("Font sizes are now 1");
				// Match album cover height to width
				el.acw = $('.albumart', el).width();
				$('.albumart', el).css("height", el.acw);
				// Fill remaining space with infoheader (use offset because it needs to be SLIGHTLY less
				el.fullwidth = $('.albumdetails', el).width();
				$('.infoheader', el).css("width", Math.floor(el.fullwidth - 1.25*(el.acw)));
				// Subtract infoheader height from album cover height
				el.ach = el.acw - $('.infoheader', el).height();
				// Get initial trackinfo & userdata dimensions
				el.trkh = $('.trackinfo', el).height();
				el.ush = $('.userdata', el).height();
				
				if (el.trkh > el.ach) {
					el.trkh = $('.trackinfo', el).height();
					el.trkf = 0.9*(el.ach / el.trkh);
					if (el.trkf < 1) {
						$('.trackinfo', el).css("font-size", el.trkf + "em");
						//$('.trackinfo', el).css("height", "100%");
					}
				}
				if (el.ush > el.ach) {
					el.usf = 0.9*(el.ach / el.ush);
					if (el.usf < 1) {
						$('.userdata', el).css("font-size", el.usf + "em");
						//$('.userdata', el).css("height", "100%");
					}
				}

			}
			
			// Initial sizing
			el.getSizing();
			
			// Watch for when the "hidePrev" (aka "fade") flag changes, which indicates that
			// the current album has changed AND the DOM is ready to show it
			scope.$watch('fade', function() {
				el.getSizing();				
			});
			
			// Check sizing again when window size changes
			$(window).resize(function() {
				el.getSizing();
			});
		}
	};
});