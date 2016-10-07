angular.module('MyPortfolio').directive("blogLoader", function() {
	return {
		restrict: "A",
		link: function(scope, element) {
			/** jQuery code **/
			
			// Next/Prev button hover opacity
			var navVisible = false;
			$("#slideViewPort")
				.on('mouseenter', function() {
					console.log("slideViewPort mouseenter");
					$('.btnPN img').css('opacity', '0.25');
					$('.subcap').fadeIn();
				})
				.on('mouseleave', function() {
					console.log("slideViewPort mouseleave");
					$('.btnPN img').css('opacity', '0');
					$('.subcap').fadeOut();
				});
			$(".btnPN img")
				.on('mouseenter', function() {
					console.log("btnPN mouseenter");
					$(this).css('opacity', '0.75');
				})
				.on('mouseleave', function() {
					console.log("btnPN mouseleave");
					$(this).css('opacity', '0.25');
				})
				.on('mousedown', function() {
					console.log("btnPN mousedown");
					$(this).css('opacity', '1');
				})
				.on('mouseup', function() {
					console.log("btnPN mouseup");
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
		}
	};
});