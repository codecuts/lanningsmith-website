define(["jquery", "app/page", "app/projects"], function($,page,projects) {

	console.log('loading up thumbMenu.js');

	var config = {
		thumbs: {
			width: 210,
			height: 133
		},
		gutter: 20,
		margin: {
			x: 0.069,
			y: 0.10
		},
		carousel: $('.jcarousel.thumbs')
	},

	init = function() {

		// short variable for config object
		var c = this.config;
		
		// check to see if carousel object is set
		if ( c.carousel.length == 0 ) {
			console.error("The thumb menu's carousel object is not set.", c.carousel);
		}
		
		// calculate rows, cols, and items per carousel page

		//first attempt to calculate cols and rows
		var cols = Math.floor( ( page.width() - 2*c.margin.x*page.width() )  / c.thumbs.width );
		var rows = Math.floor( ( page.height() - 2*c.margin.y*page.width() ) / c.thumbs.height );

		//ok, now account for gutter space and if necessary remove one column or row
		cols = ( cols*c.thumbs.width + (cols-1)*c.gutter <= page.width() - 2*c.margin.x ) ? 
		       cols : (cols) ? cols-1 : 0;
		rows = ( rows*c.thumbs.hight + (rows-1)*c.gutter <= page.height() - 2*c.margin.y ) ?
		       rows : (rows) ? rows : 0;

		// calculate items per page
		var itemsPerPage = cols * rows;

		// there should always at least be 1 
		cols = ( cols ) ? cols : 1;
		rows = ( rows ) ? rows : 1;
		itemsPerPage = ( itemsPerPage ) ? itemsPerPage : 1;

		console.log('vw:'+page.width(),'cols:'+cols);
		console.log('vh:'+page.height(),'rows:'+rows);
		console.log('itemsPerPage'+itemsPerPage);

		// add pages of thumbs
		$.each(projects.get(), function() {

			// add new carousel <li> where necessary
			var e;
			if ( this.i % itemsPerPage == 0 ) {
				c.carousel.find('ul').append('<li class="grid-page"><div></div></li>');
			}

			// add project thumb
			var classes = ( (this.i+1) % cols  == 0 ) ? 'grid-item rightmost' : 'grid-item';
			
			$('.grid-page > div').last().append('<div class="'+classes+'">'+this.thumb+'</div>');

		});

		// set width and height of all thumbs
		$('.grid-item').css({'width':c.thumbs.width+'px', 'height':c.thumbs.height+'px','margin-right': c.gutter+'px','margin-bottom': c.gutter+'px' });
		
		// but: remove right margin on rightmost
		$('.grid-item.rightmost').css('margin-right','');

		// finally: place the gridframe
		$('.gridframe, .grid-page').css({
			'width': ( (cols*c.thumbs.width) + ((cols-1)*c.gutter) )+'px',
			'height': ( (rows*c.thumbs.height) + ((rows-1)*c.gutter) )+'px'
		});
		$('.gridframe').vAlignInViewport();

//		$('.info').remove();
//		$('<div class="info" style="position:fixed;top:0;left:30px;"></div').html('gridnav.h:'+$('.gridnav').height()+',gf.h:'+$('.gridframe').height()+'m-top:'+$('.gridframe').css('margin-top')).prependTo('body');


	},

	clearGrid = function() {
		this.config.carousel.find('ul').empty();
	};

	return {
		config: config,
		init: init,
		clearGrid: clearGrid
	}
	
});