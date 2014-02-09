requirejs.config({
    "baseUrl": "assets/js",
    "paths": {
    	"jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min"
    }
});

// Load the main app module to start the app
requirejs(["main"]);