define(["jquery", "jcarousel", "jcarousel-control"], function() {

	var init = function() {

		/*// initizialize the gridnav carousel
		$('.jcarousel')
			.on('jcarousel:create jcarousel:reload', function() {
		        var element = $(this),
		            width = element.innerWidth(),
		            height = element.innerHeight();

	        	//element.jcarousel('items').css('width', width + 'px');
		        //element.jcarousel('items').css('margin-right', '150px');

				$gi = element.find('.grid-item');
				$gir = element.find('.grid-item-rightmost');
				
				$gi.each(function() {
		        	$(this).parent().css('width',width);
		        	$(this).css('width', (width-63)/4);
		        	$(this).css('margin-right', '21px');
		        	$(this).css('float', 'left');
		        });
				
				$gir.each(function() {
		        	$(this).parent().css('width',width);
		        	$(this).css('width', (width-64)/4);
		        	$(this).css('float', 'left');
		        });
	            
		    }).jcarousel({
		        // Your configurations options
		});*/

		// initialize the projects carousel in the main-frame
		$('.jcarousel.projects').on('jcarousel:create jcarousel:reload', function() {
			// do some setup stuff...
		}).jcarousel({
			vertical: true
		});

		// initialize the individual project carousel in the main-frame
		$('.jcarousel.project').on('jcarousel:create jcarousel:reload', function() {
			var carousel = $(this);

			// set width of carousel by width of parent carousel, i.e. .jcarouse.projects
			carousel.css('width', $('.jcarousel.projects').css('width'));
			carousel.css('height', $('.jcarousel.projects').css('height'));

			// set item width equal to carousel width
			carousel.jcarousel('items').css('width', carousel.width());

			// vertically align the prev/next controls in the viewport
			carousel.find('a[class*="jcarousel-control-"]').vAlignInViewport();

		}).jcarousel();

		$('.jcarousel-control-prev').jcarouselControl({
		    target: '-=1'
		});

		$('.jcarousel-control-next').jcarouselControl({
		    target: '+=1'
		});

	};

	return {
		init: init
	};
})