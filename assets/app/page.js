define(["jquery", "app/helpers", "app/projects"], function($,helpers,projects) {

	console.log('loading up page.js');

	var info = {
		title: '',
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
		this.change( this.info.url );
		this.setupNavEvents();

		this.info.loaded = true;
	},

	reload = function() {

		this.setPageInfo();
		this.positionMainFrame();

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

	populateMainFrame = function (options, dir) {

		if ( dir == 'relocate' ) {
			console.log('populateMainFrame: relocating to: ',options);
			var l = options.left != null ? this.createOptionContent(options.left, 'left') : null,
			r = options.right != null ? this.createOptionContent(options.right, 'right'): null,
			u = options.up != null ? this.createOptionContent(options.up, 'up') : null,
			d = options.down != null ? this.createOptionContent(options.down, 'down') : null,
			c = options.center != null ? this.createOptionContent(options.center, 'center') : null;

			$('.option').remove();
			$('.main-frame').append(c).append(l).append(r).append(u).append(d);	

		} 
		else {

			var l = options.left != null ? this.createOptionContent(options.left, 'left') : null,
				r = options.right != null ? this.createOptionContent(options.right, 'right'): null,
				u = options.up != null ? this.createOptionContent(options.up, 'up') : null,
				d = options.down != null ? this.createOptionContent(options.down, 'down') : null;

			$('.option:not(.'+dir+')').remove();
			var newCenter = $('.option.'+dir).removeClass(dir).addClass('center');
		
			$('.main-frame').append(l).append(r).append(u).append(d);

		}

		this.positionMainFrame();
	},

	createOptionContent = function(o, dir){

		console.log('createOptionContent: for direction '+dir,o);

		var media = o.media,
			caption = o.caption,
			pName = o.projectName;

		

		var elem = $('<article class="option '+dir+'"></article>');
		elem.append('<img src="'+media.url+'" alt="'+caption+'"/>');
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

		$('.left, .right, .up, .down').on('click', function() {
			var dir = $(this).attr('class').slice(5);
			console.log( 'moving...'+dir);
			var options = projects.move( dir ); 
			if(options == null) return;
			page.animate( dir , function() { page.populateMainFrame(options, dir); } );  // repopulate function passed as callback
		});

		$(document).on('click', '.grid-item a', function(e) {
			e.preventDefault();
			page.change( $(this).attr('href').replace('/projects','') );
     		page.toggleThumbMenu();
		});

		window.onpopstate = function(e){
			console.log('onpopstate event',e);
		    
		    if(e.state){
		        document.getElementsByClassName('main-frame')[0].innerHTML = e.state.html;
		        document.title = e.state.pageTitle;
		    }
		};

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

	change = function(url) {

		var path = url.replace(/^http:\/\/[^/]*/,'').split('/');
		this.handleRequest( path );
		var html = document.getElementsByClassName('main-frame')[0].innerHTML;
		history.pushState({'html':html, 'pageTitle':document.title}, '', url);
 		this.setPageInfo();

	},

	handleRequest = function(path) {

		if ( path[1] == '' ) {  // showing all projects
			console.log('handleRequest: url is / , showing all projects');
			document.title = '(dev)LANNINGSMITH - Home';
			this.populateMainFrame( projects.init('category', 'all'), 'relocate' );
		} 
		else if ( path[1] == 'category' ) {
			// do stuff to handle category
		}
		else {		
			console.log('handleRequest: url is seeking specific project '+path[1]+', relocating to that project');

			var success = projects.init( 'single', path[1] );
			
			if ( success !== null ) {
				console.log('handleRequest: suceesfully initialized projects, returned options:',success);
				document.title = '(dev)LANNINGSMITH - '+success.center.projectName;
				this.populateMainFrame( success, 'relocate' );
			} else {
				console.error("Failed to initialize projects with slug: "+path[1]);
			}
		}

	},


	toggleThumbMenu = function() {
		$('.gridnav').toggle('slide', { direction: 'up'} );
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
		positionMainFrame: positionMainFrame,
		populateMainFrame: populateMainFrame,
		createOptionContent: createOptionContent,
		setupNavEvents: setupNavEvents,
		animate: animate,
		change: change,
		toggleThumbMenu: toggleThumbMenu,
		loaded: loaded,
		height: height,
		width: width
	};

});