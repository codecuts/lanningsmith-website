define(["jquery",
	    "app/helpers", 
	    "app/projects",
	    "jcarousel", 
	    "jcarousel-control", 
	    "jcarousel-pagination"], function($,helpers,projects) {

	console.log('loading up page.js');

	var info = {
		title: '',
		loaded: false,
		viewport: {
			width: 0,
			height: 0
		},
		url: null,
		path: null,  // will ultimately hold window.location.pathname.split('/');
		thumbMenu: {
//			state: {
//				showByDefault: false,
//				visibile: false
//			},
			thumbs: {
				width: 210,
				height: 133
			},
			gutter: 20,
			margin: {
				x: 0.069,
				y: 0.10
			},
			carousel: null
		}
	},

	load = function() {

		this.setPageInfo();
		this.change( this.info.url );
		this.initThumbMenu();
		this.setupNavEvents();

		this.info.loaded = true;
	},

	reload = function() {

		this.setPageInfo();
		this.positionMainFrame();
		this.clearThumbMenu();
		this.initThumbMenu();

	},

	setPageInfo = function() {

		this.info.viewport.width = $(window).width();
		this.info.viewport.height = $(window).height();
		this.info.url = window.location.href;
		this.info.path = window.location.pathname.split('/');  // return array of path elements 
		this.info.thumbMenu.carousel = $('.jcarousel.thumbs');

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

//		console.log('createOptionContent: for direction '+dir,o);

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

	initThumbMenu = function() {

		this.setupThumbMenu();

		$('.jcarousel.thumbs').on('jcarousel:create jcarousel:reload', function() {
			// do some setup stuff...
		}).jcarousel({
			//config			
		});

		$('.jcarousel-pagination')
			.on('jcarouselpagination:active', 'a', function() {
				$(this).addClass('active');
			})
			.on('jcarouselpagination:inactive', 'a', function() {
				$(this).removeClass('active');
			})
			.on('click', function(e) {
				e.preventDefault();
			})
			.jcarouselPagination({
				item: function(page) {
		    		return '<a href="#' + page + '">' + page + '</a>';
				}
			});
    

	},

	setupThumbMenu = function() {

		// short variable for config object
		var c = this.info.thumbMenu;
		
		// check to see if carousel object is set
		if ( c.carousel.length == 0 ) {
			console.error("The thumb menu's carousel object is not set.", c.carousel);
		}
		
		// calculate rows, cols, and items per carousel page

		//first attempt to calculate cols and rows
		var cols = Math.floor( ( this.width() - 2*c.margin.x*this.width() )  / c.thumbs.width );
		var rows = Math.floor( ( this.height() - 2*c.margin.y*this.width() ) / c.thumbs.height );

		//ok, now account for gutter space and if necessary remove one column or row
		cols = ( cols*c.thumbs.width + (cols-1)*c.gutter <= this.width() - 2*c.margin.x ) ? 
		       cols : (cols) ? cols-1 : 0;
		rows = ( rows*c.thumbs.hight + (rows-1)*c.gutter <= this.height() - 2*c.margin.y ) ?
		       rows : (rows) ? rows : 0;

		// calculate items per page
		var itemsPerPage = cols * rows;

		// there should always at least be 1 
		cols = ( cols ) ? cols : 1;
		rows = ( rows ) ? rows : 1;
		itemsPerPage = ( itemsPerPage ) ? itemsPerPage : 1;

//		console.log('vw:'+page.width(),'cols:'+cols);
//		console.log('vh:'+page.height(),'rows:'+rows);
//		console.log('itemsPerPage'+itemsPerPage);

		// add pages of thumbs
		$.each(projects.get(), function() {

			// add new carousel <li> where necessary
			var e;
			if ( this.i % itemsPerPage == 0 ) {
				c.carousel.find('ul').append('<li class="grid-page"><div></div></li>');
			}

			// add project thumb
			var classes = ( (this.i+1) % cols  == 0 ) ? 'grid-item rightmost' : 'grid-item';
			
			$('.grid-page > div').last().append('<div class="'+classes+'"><a href="'+this.url+'">'+this.thumb+'</a></div>');

		});

		// layouts thumb grid and pages
		$('.grid-item').css({'width':c.thumbs.width+'px', 'height':c.thumbs.height+'px','margin-right': c.gutter+'px','margin-bottom': c.gutter+'px' });
		$('.grid-item.rightmost').css('margin-right','');
		$('.gridframe, .grid-page').css({
			'width': ( (cols*c.thumbs.width) + ((cols-1)*c.gutter) )+'px',
			'height': ( (rows*c.thumbs.height) + ((rows-1)*c.gutter) )+'px'
		});
		$('.gridframe').vAlignInViewport();

	},

	toggleThumbMenu = function() {
		$('.gridnav').toggle('slide', { direction: 'up'} );
		if ( $('.main-nav').css('visibility') == 'hidden' ) {
			$('.main-nav').css('visibility', 'visible');
		} else {
			$('.main-nav').css('visibility', 'hidden');
		}
	},

	clearThumbMenu = function() {
		this.info.thumbMenu.carousel.find('ul').empty();
	},

	height = function() {
		return this.info.viewport.height;
	},

	width = function() {
		return this.info.viewport.width;
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
		initThumbMenu: initThumbMenu,
		setupThumbMenu: setupThumbMenu,
		toggleThumbMenu: toggleThumbMenu,
		clearThumbMenu: clearThumbMenu,
		loaded: loaded,
		height: height,
		width: width
	};

});