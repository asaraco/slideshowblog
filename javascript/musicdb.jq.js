$(document).ready(function(){
	// Recapture album cover width when viewport is resized
	$(window).resize(function() {
		var acw = $('.albumart').width();
		$('.albumart').css("height", acw);
	});
});