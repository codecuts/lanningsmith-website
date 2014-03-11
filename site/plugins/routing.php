<?php

	/**
	*	Intercepts the $_SERVER object containing the HTTP request information 
	*   in order to change it before Kirby loads the site
	* 
	*   Currently it does the following:
	*      1. Check to see if the REQUEST_URI contains the slug 'category'
	*      2. If it does not, then it preprends /projects/ to the path.
	*/
	$uri = &$_SERVER['REQUEST_URI'];  // passing as reference
	$base = 'http://'.$_SERVER['HTTP_HOST'];
	$path = str::split($uri, '/');

//	dump($uri);
	
	if ( $uri == '/projects') {

		go( $base );
		
	}
	if ( !str::contains($uri,'category') || !str::contains($uri,'.') ) {

		$uri = '/projects/'.$path[0];

	}
	if ( str::contains($uri, 'category') ) {
		$uri = '/category';
	}
	 
?>