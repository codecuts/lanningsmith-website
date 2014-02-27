define(["jquery",
	    "app/helpers", 
	    "app/projects",
	    "jcarousel", 
	    "jcarousel-control", 
	    "jcarousel-pagination"], function($,helpers,projects) {

	console.log('loading up page.js');

	var info = {
		title: siteTitle,
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
				x: 0.075,
				y: 0.10
			},
			carousel: null
		}
	},

	load = function() {

		this.setPageInfo();
		this.relocate( this.info.url );
		this.initThumbMenu();
		this.setupEvents();

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

	relocate = function(url) {
		var pageTitle,
			html,
			path = url.replace(/^http:\/\/[^/]*/,'').split('/');

		this.handleRequest( path );
		
		html = document.getElementsByClassName('main-frame')[0].innerHTML
		pageTitle = document.title;
		this.pushToHistory( url, pageTitle, html);
	},

	handleRequest = function(path) {

		if ( path[1] == '' ) {  // showing all projects
			console.log('handleRequest: url is / , showing all projects');
			document.title = this.info.title+' - Home';
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
				document.title = this.info.title+' - '+success.center.projectName;
				this.populateMainFrame( success, 'relocate' );
			} else {
				console.error("Failed to get projects with slug: "+path[1]);
			}
		}

	},

	pushToHistory = function(url, pageTitle, html) {
		console.log('pushToHistory: url:',url);
		console.log('pushToHistory: pageTitle:',pageTitle);
//		console.log('pushToHistory: html:',html);
		history.pushState({'html':html, 'pageTitle':pageTitle}, pageTitle, url);
 		this.setPageInfo();
	},

	setupEvents = function() {

		var page = this;  // makes it possible to refer to page module's function inside jQuery event functions

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

		$('.left, .right, .up, .down').on('click', function(e) {
			e.preventDefault();
			var dir = $(this).attr('class').slice(5);
			
			if ( $(this).parent().attr('class') == 'main-nav' ) {
				console.log( 'main-frame moving: '+dir);
				var options = projects.move( dir ); 
				if(options == null) return;
				page.animate(dir , function() {
					document.title = page.info.title+' - '+options.center.projectName;
					page.populateMainFrame(options, dir);
					
					if ( dir == 'up' || 'down' ) {
						var url = options.center.url,
							pageTitle = document.title,
							html = document.getElementsByClassName('main-frame')[0].innerHTML;
						page.pushToHistory(url, pageTitle, html);	
					}
					
				});  
			} else if ( $(this).parent().attr('class') == 'thumbmenu-nav' ) {
				$(this).jcarouselControl({
					target: ( dir == 'right' ) ? '+=1' : '-=1'
				});
			}
		});

		$(document).on('click', '.grid-item a', function(e) {
			e.preventDefault();
			page.relocate( $(this).attr('href').replace('/projects','') );  // strip /projects if there, might not have been removed earlier
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
	
	positionMainFrame = function() {

		$('.main').css('height', this.info.viewport.height);
		$('.main-frame').vAlignInViewport();
		$('.main-nav .left, .main-nav .right').vAlignInViewport();

	},

	populateMainFrame = function (options, dir) {

		console.log('populateMainFrame: options:',options);

		if ( dir == 'relocate' ) {

			console.log('populateMainFrame: relocating to this project: ',options);

			var l = options.left != null ? this.createOptionContent(options.left, 'left') : null,
			r = options.right != null ? this.createOptionContent(options.right, 'right'): null,
			u = options.up != null ? this.createOptionContent(options.up, 'up') : null,
			d = options.down != null ? this.createOptionContent(options.down, 'down') : null,
			c = options.center != null ? this.createOptionContent(options.center, 'center') : null;

			$('.option').remove();
			$('.main-frame').append(c).append(l).append(r).append(u).append(d);	

		} 
		else {

			console.log('populateMainFrame: animating to this project or project image: ', options);

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

		var url = o.url,
			media = o.media,
			caption = o.caption,
			pName = o.projectName;

		var elem = $('<article class="option '+dir+'" data-url="'+url+'"></article>');
		elem.append('<img src="'+media.url+'" alt="'+caption+'"/>');
		elem.append('<div class="caption"><span class="project-title">'+pName+'</span><span class="description">'+caption+'</span></div>');
		return elem;
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

		var grid = this.calculateThumbGrid()

		// add pages of thumbs
		$.each(projects.get(), function() {

			// add new carousel <li> where necessary
			var e;
			if ( this.i % grid.itemsPerPage == 0 ) {
				c.carousel.find('ul').append('<li class="grid-page"><div></div></li>');
			}

			// add project thumb
			var classes = ( (this.i+1) % grid.cols  == 0 ) ? 'grid-item rightmost' : 'grid-item';
			
			var elem = $('<div class="'+classes+'"></div>');
			elem.append('<div class="overlay"><h1 class="project-title">'+this.title+'</h1><h2 class="project-description">'+this.description+'</h2></div>')
			elem.append('<a href="'+this.url+'">'+this.thumb+'</a>');

			$('.grid-page > div').last().append(elem);

		});

		// layouts thumb grid and pages
		$('.grid-item').css({'width':c.thumbs.width+'px', 'height':c.thumbs.height+'px','margin-right': c.gutter+'px','margin-bottom': c.gutter+'px' });
		$('.grid-item.rightmost').css('margin-right','');
		$('.gridframe, .grid-page').css({
			'width': ( (grid.cols*c.thumbs.width) + ((grid.cols-1)*c.gutter) )+'px',
			'height': ( (grid.rows*c.thumbs.height) + ((grid.rows-1)*c.gutter) )+'px'
		});
		$('.gridframe').vAlignInViewport();

	}

	calculateThumbGrid = function() {

		c = this.info.thumbMenu;

		// first attempt to calculate cols and rows
		var cols = Math.floor( ( this.width() - 2*c.margin.x*this.width() )  / c.thumbs.width );
		var rows = Math.floor( ( this.height() - 2*c.margin.y*this.width() ) / c.thumbs.height );

		// now account for gutter space and if necessary remove one column or row
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

		return { rows: rows, cols: cols, itemsPerPage: itemsPerPage };

	}

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
		setupEvents: setupEvents,
		animate: animate,
		relocate: relocate,
		pushToHistory: pushToHistory,
		initThumbMenu: initThumbMenu,
		setupThumbMenu: setupThumbMenu,
		calculateThumbGrid: calculateThumbGrid,
		toggleThumbMenu: toggleThumbMenu,
		clearThumbMenu: clearThumbMenu,
		loaded: loaded,
		height: height,
		width: width
	};

});