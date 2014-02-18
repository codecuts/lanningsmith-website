requirejs.config({
    "baseUrl": "../assets/js/vendor",
    "paths": {
      "app": "../../app",
      "jquery": "jquery-2.1.0",
      "jcarousel": "jquery.jcarousel-core",
      "jcarousel-control": "jquery.jcarousel-control"
    },
    "shim": {
        "jcarousel": ["jquery"],
        "jcarousel-control": ["jquery", "jcarousel"]
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);