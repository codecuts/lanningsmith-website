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

	return {
		get: get,
		count: count
	};

});