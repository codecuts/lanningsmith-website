define(["jquery", "app/helpers", "app/projects"], function($,helpers,projects) {

	console.log('loading up page.js');

	var info = {
		loaded: false,
		viewport: {
			width: 0,
			height: 0
		}
	},

	load = function() {

		this.setPageInfo();		
		this.setupMainFrame( projects.init() );
		this.setupNavEvents();

		this.info.loaded = true;
	},

	setPageInfo = function() {

		this.info.viewport.width = $(window).width();
		this.info.viewport.height = $(window).height();

	},
	
	setupMainFrame = function(options) { 

		// set height of .main <section> to viewport height
		$('.main').css('height', this.info.viewport.height);

		// vertically align .main-frame (div containing projets carousel) in viewport
		$('.main-frame').vAlignInViewport();

		// vertically align the left/right navs for projects carousel in in viewport
		$('.main-nav .left, .main-nav .right').vAlignInViewport();

		var l = options.left != null ? this.createOptionContent(options.left, 'left') : null,
			r = options.right != null ? this.createOptionContent(options.right, 'right'): null,
			u = options.up != null ? this.createOptionContent(options.top, 'up') : null,
			d = options.down != null ? this.createOptionContent(options.down, 'down') : null,
			c = options.center != null ? this.createOptionContent(options.center, 'center') : null;

		$('.main-frame').append(c).append(l).append(r).append(u).append(d);
	},

	repopulateMainFrame = function (options, dir) {
		console.log('REPOOPUYLKATE: '+dir);
		var l = options.left != null ? this.createOptionContent(options.left, 'left') : null,
			r = options.right != null ? this.createOptionContent(options.right, 'right'): null,
			u = options.up != null ? this.createOptionContent(options.up, 'up') : null,
			d = options.down != null ? this.createOptionContent(options.down, 'down') : null;

		$('.option:not(.'+dir+')').remove();
		var newCenter = $('.option.'+dir).removeClass(dir).addClass('center');
		
		//$('.option.right, option.left, option.top, option.bottom').remove();
		/*$('.options.left').remove();
		$('.options.top').remove();*/

		$('.main-frame').append(l).append(r).append(u).append(d);

	},

	createOptionContent = function(o, dir){

		var url = o.url,
			caption = o.caption,
			pName = o.projectName;

		var elem = $('<article class="option '+dir+'"></article>');
		elem.append('<img src="'+url+'" alt="'+caption+'"/>');
		elem.append('<div class="caption"><span class="project-title">'+pName+'</span><span class="description">'+caption+'</span></div>');
		return elem;
	},

	setupNavEvents = function() {

		var page = this;

		$('#logo').on('click', function(e) {
			e.preventDefault();
			$('.about').toggle('slide');
		});

		$('.ctrl').each(function() {
			if ( $(this).attr('class').indexOf('shutter') != -1 ) {
				$(this).on('click', function(e) {
					e.preventDefault;
					page.toggleThumbMenu();
				});
			}
		});

		$('.left, .right, .up, .down').each(function() {

			console.log(page);
			
			$(this).on('click', function() {
				var dir = $(this).attr('class').slice(5);
				console.log( 'moving...'+dir);
				var options = projects.move( dir ); 
				if(options == null) return;
				//console.log('new options:',options);
				page.animate( dir , function() { page.repopulateMainFrame(options, dir); } );  // repopulate function passed as callback
			});

		});

	}, 

	animate = function(dir, callback) {

		switch(dir){
			case "left":
				$('.option.center').animate({left:'1500px'},500);
				$('.option.left').animate({left:0},500,'swing',callback);
				break;	
			case 'right':
				$('.option.center').animate({left:'-1500px'},500);
				$('.option.right').animate({left:0},500,'swing',callback);
				break;
			case "up":
				$('.option.center').animate({top:'1500px'},500);
				$('.option.up').animate({top:0},500,'swing',callback);
				break;
			case "down":
				$('.option.center').animate({top:'-1500px'},500);
				$('.option.down').animate({top:0},500,'swing',callback);
		}	

	},

	toggleThumbMenu = function() {
		if ( $('.gridnav').css('display') == 'none' ) {
			$('.gridnav').toggle('slide', { direction: 'up'} );
//			thumbMenu.isVisible(false);
		} else {
			$('.gridnav').toggle('slide', { direction: 'up'} );
//			thumbMenu.isVisible(true);
		}
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
		setPageInfo: setPageInfo,
		setupMainFrame: setupMainFrame,
		setupNavEvents: setupNavEvents,
		animate: animate,
		toggleThumbMenu: toggleThumbMenu,
		loaded: loaded,
		height: height,
		width: width,
		repopulateMainFrame: repopulateMainFrame,
		createOptionContent: createOptionContent
	};

});