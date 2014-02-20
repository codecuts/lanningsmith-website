define(["jquery", "jquery-ui", "app/helpers", "app/ourCarousel"], function($,ui,helpers,ourCarousel) {

	$(document).ready(function() {
		helpers.setupEvents();
		helpers.managePageLoad();
		ourCarousel.init();


		/*console.log('viewport:'+$(window).height());
		console.log('.main:'+$('.main').height());
		console.log('.main-frame:'+$('.main-frame').height());*/
	});

	$(window).resize(function() {
		helpers.managePageLoad();

		/*console.log('viewport:'+$(window).height());
		console.log('.main:'+$('.main').height());
		console.log('.main-frame:'+$('.main-frame').height());*/

	});

});