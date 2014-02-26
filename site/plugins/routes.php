<?php

	/**
	*	Intercepts the $_SERVER object containing the HTTP request information 
	*   in order to change it before Kirby loads the site
	* 
	*   Currently it does the following:
	*      1. Check to see if the REQUEST_URI contains the slug 'category'
	*      2. If it does not, then it preprends /projects/ to the path.
	*/

	if ( !str::contains($_SERVER['REQUEST_URI'],'category') ||
		 !str::contains($_SERVER['REQUEST_URI'],'.') ) {
		$path = str::split($_SERVER['REQUEST_URI'],'/');
		$_SERVER['REQUEST_URI'] = '/projects/'.$path[0];
	}
	 
?>