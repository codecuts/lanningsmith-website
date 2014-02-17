define(["jquery"], function() {
	
	$.fn.vAlign = function() {
	  return this.each(function() {
	  	console.log('vAlign called');
	    var ah = $(this).height();
	    var ph = $(this).parent().height();
	    var mh = (ph - ah) / 2;
	    console.log('mainframe: '+ah+', main: ',+ph);
	    $(this).css('margin-top', mh);
	  });
	};

});