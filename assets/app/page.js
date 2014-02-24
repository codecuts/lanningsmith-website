define(["jquery", "app/helpers", "app/projects"], function($,helpers,projects) {

	console.log('loading up page.js');

	var info = {
		loaded: false,
		viewport: {
			width: 0,
			height: 0
		},
		url: null,
		path: null  // will ultimately hold window.location.pathname.split('/');
	},

	load = function() {

		this.setPageInfo();
		this.handleRequest();
		this.setupNavEvents();

		this.info.loaded = true;
	},

	reload = function() {

		this.setPageInfo();
		this.positionMainFrame();

	},

	handleRequest = function() {

		if ( this.info.path[1] == '' ) {  // showing all projects
			console.log('handleRequest: url is / , showing all projects');
			this.setupMainFrame( projects.init() );
		}
		else {
			
			if ( this.info.path[1] == 'category' ) { // showing specific category
				// do stuff to select category
			} 
			else {
				console.log('handleRequest: url is seeking specific project, relocating to that project');
				var success = projects.init( 'single', this.info.path[1] );
				
				if ( success !== null ) {
					console.log('handleRequest: suceesfully initialized projects, returned options:',success);
					this.setupMainFrame( success );
				} else {
					console.error("Failed to initialize projects with slug: "+this.info.path[1]);
				}
			}

		}

	},
	setPageInfo = function() {

		this.info.viewport.width = $(window).width();
		this.info.viewport.height = $(window).height();
		this.info.url = window.location.href;
		this.info.path = window.location.pathname.split('/');  // return array of path elements 

	},

	positionMainFrame = function() {

		$('.main').css('height', this.info.viewport.height);
		$('.main-frame').vAlignInViewport();
		$('.main-nav .left, .main-nav .right').vAlignInViewport();

	},
	
	setupMainFrame = function(options) { 

		this.positionMainFrame();

//		console.log('setupMainFrame: options:',options);

		var l = options.left != null ? this.createOptionContent(options.left, 'left') : null,
			r = options.right != null ? this.createOptionContent(options.right, 'right'): null,
			u = options.up != null ? this.createOptionContent(options.up, 'up') : null,
			d = options.down != null ? this.createOptionContent(options.down, 'down') : null,
			c = options.center != null ? this.createOptionContent(options.center, 'center') : null;

		$('.main-frame').append(c).append(l).append(r).append(u).append(d);
	},

	repopulateMainFrame = function (options, dir) {

		var l = options.left != null ? this.createOptionContent(options.left, 'left') : null,
			r = options.right != null ? this.createOptionContent(options.right, 'right'): null,
			u = options.up != null ? this.createOptionContent(options.up, 'up') : null,
			d = options.down != null ? this.createOptionContent(options.down, 'down') : null;

		$('.option:not(.'+dir+')').remove();
		var newCenter = $('.option.'+dir).removeClass(dir).addClass('center');
	
		$('.main-frame').append(l).append(r).append(u).append(d);

	},

	createOptionContent = function(o, dir){

//		console.log('createOptionContent: for direction '+dir,o);

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
		reload: reload,
		handleRequest: handleRequest,
		setPageInfo: setPageInfo,
		setupMainFrame: setupMainFrame,
		positionMainFrame: positionMainFrame,
		repopulateMainFrame: repopulateMainFrame,
		createOptionContent: createOptionContent,
		setupNavEvents: setupNavEvents,
		animate: animate,
		toggleThumbMenu: toggleThumbMenu,
		loaded: loaded,
		height: height,
		width: width
	};

});