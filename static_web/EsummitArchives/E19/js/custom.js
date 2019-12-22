/*

	Template Name: Eventor - Conference & Event HTML Template
	Author: Themewinter
	Author URI: https://themeforest.net/user/themewinter
	Description: Eventor - Conference & Event HTML Template
	Version: 1.0

	1. Mobile Menu
	2. Main Slideshow
	3. Gallery popup
	4. Counter
	5. Contact form
	6. Back to top

*/


jQuery(function($) {
  "use strict";


// detect touch
	if (!("ontouchstart" in document.documentElement)) {
  	document.documentElement.className += "no-touch";
	}
$('.gallery-container').on('touchstart touchend', function(e) {
    $(this).toggleClass('over');
});

	/* ----------------------------------------------------------- */
	/*  Mobile Menu
	/* ----------------------------------------------------------- */



	/* ----------------------------------------------------------- */
	/*  Event counter
	/* -----------------------------------------------------------*/

	if ( $( '.countdown' ).length > 0 ) {
		$(".countdown").jCounter({
		  	date: '8 February 2019 00:00:00',
		  	fallback: function() { console.log("count finished!") }
		});
	}

	/* ----------------------------------------------------------- */
	/*  Event Map
	/* -----------------------------------------------------------*/





	/* ----------------------------------------------------------- */
	/*  Main slideshow
	/* ----------------------------------------------------------- */

		$('#main-slide').carousel({
			pause: true,
			interval: 100000,
		});


	/* ----------------------------------------------------------- */
	/*  Gallery popup
	/* ----------------------------------------------------------- */



	  $(document).ready(function(){

			$(".gallery-popup").colorbox({rel:'gallery-popup', transition:"fade", innerHeight:"400"});

			$(".popup").colorbox({iframe:true, innerWidth:650, innerHeight:450});

	  });





	/* ----------------------------------------------------------- */
	/*  Counter
	/* ----------------------------------------------------------- */

		$('.counterUp').counterUp({
		 delay: 10,
		 time: 1000
		});



	/* ----------------------------------------------------------- */
	/*  Contact form
	/* ----------------------------------------------------------- */



	/* ----------------------------------------------------------- */
	/*  Back to top
	/* ----------------------------------------------------------- */

		$(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				 $('#back-to-top').fadeIn();
			} else {
				 $('#back-to-top').fadeOut();
			}
		});

		// scroll body to 0px on click
		$('#back-to-top').on('click', function () {
			 $('#back-to-top').tooltip('hide');
			 $('body,html').animate({
				  scrollTop: 0
			 }, 800);
			 return false;
		});

		$('#back-to-top').tooltip('hide');

		
		
		
	
		

});
