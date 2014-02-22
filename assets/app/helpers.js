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

	$.fn.hAlignInViewport = function() {
		return this.each(function() {
			var ah = $(this).width();
	    	var ph = $(window).width();
	    	var mh = (ph - ah) / 2;
	    	$(this).css('margin-left', mh);
		});
	};



});