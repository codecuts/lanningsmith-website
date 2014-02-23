define(["jquery", "app/helpers"], function($,helpers) {

	// capture the projects data from the global level
	if ( typeof projects === 'undefined' ) {
		console.error("The projects JSON object is missing.");
	} else {
		var _projects = projects;
	}

	console.log(_projects instanceof Array);	
	
	var count = function() {
		return _projects.length;
	},

	get = function() {
		return _projects;
	};
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	
	var category = "all", activeProjects, indexX=0, indexY=0; // Y is projects, X is media for the current project	
	
	var setCategory = function (categoryName){	// sets a new categpry and recomputes the subset of projects
		category = categoryName;
		this.reactivateProjects();
	};
	
	var	reactivateProjects = function(){		// recomputes subset of projects based on current category

		activeProjects = new array();

		if(category == "all"){
			activeProjects.concat(projects);
			return;
		}
		
		for(var i=0;i<projects.length;i++){
			var categories = projects[i].categories.split(', ');			
			if(categories.indexOf(category)>-1)
				activeProjects.push(projects[i]);
		}		
	};
	
	var move = function(dir){					// switches into appropiate method calls
		
		this.createDummyContent();
		return;
		
		switch(dir){
			case "left":
				indexX--;
				break;	
			case "right":
				indexX++;
				break;
			case "up":
				indexY++;
				break;
			case "down":
				indexY--;
		}	
		return this.getOptionsForCurrentPosition();
	};
	
	var createDummyContent = function (){
	
		var left	= 	this.createStep("DummyProjectName"+Math.random(), "some caption", "http://lorempixel.com/800/600");
		var right	= 	this.createStep("DummyProjectName"+Math.random(), "some caption", "http://lorempixel.com/800/600");
		var center	=	this.createStep("DummyProjectName"+Math.random(), "some caption", "http://lorempixel.com/800/600");
		var top		=	this.createStep("DummyProjectName"+Math.random(), "some caption", "http://lorempixel.com/800/600");
		var bottom	=	this.createStep("DummyProjectName"+Math.random(), "some caption", "http://lorempixel.com/800/600");		
	};
	
	var createStep = function (n, c, u){
		var step = {
			projectName = n,
			caption = c,
			url = u
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
		return nil; // only if we didn't find that project
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
			center = this.getStepForXY(x, y),
			left = this.getStepForXY(x-1, y),
			right = this.getStepForXY(x+1, y),
			top = this.getStepForXY(x, y+1);
			bottom = this.getStepForXY(x, y-1);
		};
		return options;
	};
	
	var getStepForXY = function(x, y){
		
		if(y>=activeProjects.length || y<0)
			return nil;
			
		project = projects[y];
		return this.createStep(project.title, project.description, this.getProjectMedia(x, y));
	};
	
	var getProjectMedia = function(x, y){
		
		m = projects[y].media;
		if(x>=media.length || x<0)
			return nil;
		return m[x];
	};
	
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////	

	return {
		get: get,
		count: count,
		move: move,
		relocate: relocate,
		ceateStep: createStep,
		createDummyContent: createDummyContent,
		reactivateProjects: reactivateProjects,
		setCategory: setCategory,
		slug: slug,
		getOptionsForXY: getOptionsForXY,
		getProjectMedia: getProjectMedia,
		getStepForXY: getStepForXY,
		relocateToY: relocateToY,
		getOptionsForCurrentPosition: getOptionsForCurrentPosition,
		resetToXY: resetToXY
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


var fun = sort;


 private function sort(cat){
	
	
	
}













