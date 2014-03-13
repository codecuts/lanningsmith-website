define(["jquery", 
		"app/helpers",
		"app/projects", 
		"app/page",
		"app/ourCarousel",
		"jquery-ui",
		"debounced-resize"], // see https://github.com/louisremi/jquery-smartresize, 
	    function($,helpers,projects,page,ourCarousel) {

	$(document).ready(function() {
		if ( splashOn === true ) {
			$('.splash').css('left','0px');
		}
		page.load();
		$('.gridnav').hide();
//		ourCarousel.init();
	});

	$(window).on('debouncedresize', function(e) {
		console.log('resize event');
		page.reload();
	});

});