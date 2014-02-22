define(["jquery", "app/helpers"], function($,helpers) {

	console.log('loading up page.js');

	var info = {
		loaded: false,
		viewport: {
			width: 0,
			height: 0
		}
	},

	load = function() {

		this.setupInfo();
		this.setupMain();

		// mark the page as loaded
		this.info.loaded = true;
	},

	setupInfo = function() {

		this.info.viewport.width = $(window).width();
		this.info.viewport.height = $(window).height();

	},
	
	setupMain = function() {

		// set height of .main <section> to viewport height
		$('.main').css('height', this.info.viewport.height);

		// vertically align .main-frame (div containing projets carousel) in viewport
		$('.main-frame').vAlignInViewport();

		// vertically align the left/right navs for projects carousel in in viewport
		$('.main-nav .left, .main-nav .right').vAlignInViewport();

	},

	setupEvents = function() {

		$('#logo').on('click', function(e) {
			e.preventDefault();
			$('.about').toggle('slide');
		});
		$('.shutter').on('click', function(e) {
			e.preventDefault();
			$('.gridnav').toggle('slide', { direction: 'up'} );
		});

	},

	height = function() {
		if ( this.loaded() ) {
			return this.info.viewport.height;
		} else {
			console.error("Page is not yet loaded");
			return null;
		}
	},

	width = function() {
		if ( this.loaded() ) {
			return this.info.viewport.width;
		} else {
			console.error("Page is not yet loaded");
			return null;
		}
	},

	loaded = function() {
		return this.info.loaded;
	};
	
	//reveal module functions
	return {
		info: info,
		load: load,
		setupInfo: setupInfo,
		setupMain: setupMain,
		setupEvents: setupEvents,
		height: height,
		width: width,
		loaded: loaded
	};

});