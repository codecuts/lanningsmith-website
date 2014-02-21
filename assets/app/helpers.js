define(["jquery"], function() {
	
	$.fn.vAlign = function() {
		return this.each(function() {
			var ah = $(this).height();
			var ph = $(this).parent().height();
			var mh = (ph - ah) / 2;
			$(this).css('margin-top', mh);
  		});
	};

	$.fn.vAlignInViewport = function() {
		return this.each(function() {
			var ah = $(this).height();
	    	var ph = $(window).height();
	    	var mh = (ph - ah) / 2;
	    	$(this).css('margin-top', mh);
		});
	};

	var setupEvents = function() {

		$('#logo').on('click', function(e) {
			e.preventDefault();
			$('.about').toggle('slide');
		});
		$('.shutter').on('click', function(e) {
			e.preventDefault();
			$('.gridnav').toggle('slide', { direction: 'up'} );
		});

	}

	var managePageLoad = function() {

		$('.main').css('height', $(window).height());

		$('.main-frame').vAlignInViewport();

		$('.main-nav .left, .main-nav .right').vAlignInViewport();

		//$('.container').animate({opacity:1},80);

	};
	//reveal module functions
	return {
		setupEvents: setupEvents,
		managePageLoad: managePageLoad
	};

});