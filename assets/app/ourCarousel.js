define(["jquery", "jcarousel", "jcarousel-control"], function() {

	var init = function() {

		// initizialize the gridnav carousel
		/*$('.jcarousel.thumbs')
			.on('jcarousel:create jcarousel:reload', function() {
		        var element = $(this),
		            width = element.innerWidth(),
		            height = element.innerHeight();

	        	//element.jcarousel('items').css('width', width + 'px');
		        //element.jcarousel('items').css('margin-right', '150px');

				gi = element.find('.grid-item, .grid-item-rightmost' );

				aspectRatio = 3/2;
				itemWidth = (width-63)/4;
				itemHeight = itemWidth*(1/aspectRatio);
				gi.each(function() {
		        	$(this).css('width', itemWidth);
					$(this).css('height', itemHeight);
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

		/*$('.jcarousel-control-prev').jcarouselControl({
		    target: '-=1'
		});

		$('.jcarousel-control-next').jcarouselControl({
		    target: '+=1'
		});*/

		/*$('.main .main-nav div').each(function() {
			var ctrl = $(this),
				elemClass = ctrl.attr('class'),
				projectsCarousel = $('.jcarousel.projects'),
				activeProjectCarousel = projectsCarousel.find('.jcarousel.project');

			if ( elemClass == 'top' || elemClass == 'bottom' ) {
				ctrl.jcarouselControl({ 
					carousel: projectsCarousel, 
					target: ( elemClass == 'top' ) ? '-=1' : '+=1'
				});
			}
			else {
				ctrl.jcarouselControl({
					carousel: activeProjectCarousel,
					target: ( elemClass == 'left' ) ? '-=1' : '+=1'
				});
			}
		});*/

	};

	// reveal module functions
	return {
		init: init
	};
})