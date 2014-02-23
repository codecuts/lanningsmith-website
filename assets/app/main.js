define(["jquery", 
		"app/helpers",
		"app/projects", 
		"app/page",
		"app/thumbMenu", 
		"app/ourCarousel",
		"jquery-ui",
		"debounced-resize"], // see https://github.com/louisremi/jquery-smartresize, 
	    function($,helpers,projects,page,thumbMenu,ourCarousel) {

	$(document).ready(function() {
		page.load();
		thumbMenu.init();

//		ourCarousel.init();
	});

	$(window).on('debouncedresize', function(e) {
//		console.log('resize event');
		//page.load();
		//thumbMenu.clearGrid();
		//thumbMenu.init();
	});

});