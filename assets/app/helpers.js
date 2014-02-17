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

	var managePageLoad = function() {

		$('.main').css('height', $(window).height());

		$('.main-frame').vAlignInViewport();

		$('.container').animate({opacity:1},80);

	};
	return {
		managePageLoad: managePageLoad
	};

});