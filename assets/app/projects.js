define(["jquery", "app/helpers"], function($,helpers) {

	// capture the projects data from the global level
	if ( typeof projects === 'undefined' ) {
		console.error("The projects JSON object is missing.");
	} else {
		var _projects = projects;
	}
	
	var count = function() {
		return _projects.length;
	},

	get = function() {
		return _projects;
	};
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	
	var category = "all"; 
	var activeProjects = new Array(); 
	var indexX;
	var indexY; // Y is projects, X is media for the current project	
	var loop = imagesInLoop;
	
	var init = function (mode,target){
		this.resetToXY(0,0);
		if ( mode == 'category' ){
			this.setCategory( target );
			return this.relocateToY(0);
		} 
		else if ( mode == 'single' ){
			this.setCategory( 'all' );
			return this.relocate( target );
		}
		else {
			return null;
		}
	};

	var setCategory = function (categoryName){	// sets a new categpry and recomputes the subset of projects
		category = categoryName;
		this.reactivateProjects();
	};
	
	var	reactivateProjects = function(){		// recomputes subset of projects based on current category

		activeProjects = new Array();

		if(category == "all"){
			activeProjects = projects;
			return;
		}
		
		for(var i=0;i<projects.length;i++){
			var categories = projects[i].categories.split(', ');			
			if(categories.indexOf(category)>-1)
				activeProjects.push(projects[i]);
		}		
	};
	
	var move = function(dir){					// switches into appropiate method calls
		
		switch(dir){
			case "left":
				if(!imagesInLoop){
					if(indexX == 0)
						return null;
				}
				else{
					if(projects[indexY].media.length == 1)
						return null;
					if(indexX == 0){
						indexX = projects[indexY].media.length-1;
						break;
					}
				}
				indexX--;
				break;	
			case 'right':
				if(!imagesInLoop){
					if(projects[indexY].media.length<=indexX+1)
						return null;
				}
				else{
					if(projects[indexY].media.length == 1)
						return null;
					if(indexX==projects[indexY].media.length-1){
						indexX=0;
						break;
					}
				}
				indexX++;
				break;
			case "up":
				if(!imagesInLoop){
					if(indexY == 0)
						return null;
				}
				else{
					if(indexY == 0){
						indexY = this.count()-1;
						indexX=0;
						break;
					}
				}
				indexY--;
				indexX=0;
				break;
			case "down":
				if(!imagesInLoop){
					if(indexY >= this.count()-1)
						return null;
				}
				else{
					if(indexY >= this.count()-1){
						indexY = 0;
						indexX = 0;
						break;
					}
				}
				indexY++;
				indexX=0;
		}	
		return this.getOptionsForCurrentPosition();
	};
	
	var createStep = function (u, n, c, m){
		var step = {
			url: u,
			projectName: n,
			caption: c,
			media: m
		};
		return step;
	};
	
	var slug = function (url){						// returns last Path Component
		var a = url.split('/');
		return a[a.length-1];
	};
	
	var relocate = function (name){					// returns options after relocating to project specified by name (slug)	
		for(var i=0;i<activeProjects.length;i++){
			if(name == this.slug(projects[i].url))
				return this.relocateToY(i);
		}
		return null; // only if we didn't find that project
	};
	
	var resetToXY = function(x,y){					// resets internal indexes
		indexX = x;
		indexY = y;
	};
	
	var relocateToY = function (y){	
		this.resetToXY(0,y);
		return this.getOptionsForCurrentPosition();
	};
	
	var getOptionsForCurrentPosition = function(){
		return this.getOptionsForXY(indexX, indexY);
	};
	
	var getOptionsForXY = function(x,y){
		
		var options = {
			center: this.getStepForXY(x, y),
			left: this.getStepForXY(x-1, y),
			right: this.getStepForXY(x+1, y),
			up: this.getStepForXY(0, y-1),
			down: this.getStepForXY(0, y+1)
		};
		return options;
	};
	
	var getStepForXY = function(x, y){
	
		if(imagesInLoop){
			/*if(projects[y].media.length == 1 && x!=0)
				return null;*/
			if(y>=activeProjects.length)
				y = 0;
			if(y == -1)
				y = activeProjects.length-1;
			if(x == projects[y].media.length)
				x = 0;
			if(x == -1)
				x = projects[y].media.length-1
			
		}
		else{
			if(x<0 || y>=activeProjects.length || y<0 || x>=projects[y].media.length )
				return null;
		}
		
		project = projects[y];
		return this.createStep(project.url, project.title, project.description, project.media[x]);
	};
		
	////////////////////////////////////////////////////////////////////////////////////////////////	

	return {
		get: get,
		count: count,
		move: move,
		relocate: relocate,
		createStep: createStep,
		reactivateProjects: reactivateProjects,
		setCategory: setCategory,
		slug: slug,
		getOptionsForXY: getOptionsForXY,
		getStepForXY: getStepForXY,
		relocateToY: relocateToY,
		getOptionsForCurrentPosition: getOptionsForCurrentPosition,
		resetToXY: resetToXY, 
		init: init
	};
});



/*	


var possibleSteps = {
	//each one contains a "step"
	left ={},
	right = {},
	center ={},
	top ={},
	bottom = {}
}

	

var step = {
	
	projectName ="",
	caption="",
	url =""
}

move('direction');
relocate('name')

*/