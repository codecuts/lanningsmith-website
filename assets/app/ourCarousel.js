define(["jquery", "jcarousel", "jcarousel-control"], function() {

	var init = function() {

		$('.jcarousel')
			.on('jcarousel:create jcarousel:reload', function() {
		        var element = $(this),
		            width = element.innerWidth(),
		            height = element.innerHeight();

		        if ( element.parent().attr('class') == 'main-frame' ) {
		        	element.jcarousel('items').css('width', width + 'px');
			        element.jcarousel('items').css('margin-right', '150px');
			        element.find('.jcarousel-control-prev, .jcarousel-control-next').vAlignInViewport();	
		        }
		        else if ( element.parent().attr('class') == 'gridframe' ) {
		        	//element.jcarousel('items').css('width', width + 'px');
			        //element.jcarousel('items').css('margin-right', '150px');
			        element.find('.grid-item').each(function() {
			        	$(this).parent().css('width',width);
			        	$(this).css('width', (width-63)/4);
			        	//console.log(width);
			        	$(this).css('margin-right', '20px');
			        	$(this).css('float', 'left');
			        });
			        element.find('.jcarousel-control-prev, .jcarousel-control-next').vAlignInViewport();
		        }
		        
		    })
		    .jcarousel({
		        // Your configurations options
		    });

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