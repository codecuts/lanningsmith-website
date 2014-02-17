define(["jquery", "jcarousel", "jcarousel-control"], function($) {

	$(window).ready(function() {

		$('.container').append('<div>viewport height: '+$(window).height()+'</div>');
		$('.container').append('<div>margin-top: '+$('.main-frame').css('margin-top')+'</div>');

		$('.main-frame').vAlign();

		$('.jcarousel')
			.on('jcarousel:create jcarousel:reload', function() {
		        var element = $(this),
		            width = element.innerWidth();

		        // This shows 1 item at a time.
		        // Divide `width` to the number of items you want to display,
		        // eg. `width = width / 3` to display 3 items at a time.
		        element.jcarousel('items').css('width', width + 'px');
		    })
		    .jcarousel({
		        // Your configurations options
		    });

		$('.jcarousel-prev').jcarouselControl({
		    target: '-=1'
		});

		$('.jcarousel-next').jcarouselControl({
		    target: '+=1'
		});

	});

});