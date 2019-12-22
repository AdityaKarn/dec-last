(function($) {

	"use strict";

    // Preloader
    $(window).on('load', function() { 
      $('#preloader').delay(350).fadeOut('slow'); 
    })

    // Wow Animation
    new WOW().init();

    // Navbar animation on scroll
    $(window).scroll(function() {
      if ($(document).scrollTop() > 5) {
        $('.navbar').addClass('scrolling-header');
      } else {
        $('.navbar').removeClass('scrolling-header');
      }
    });

    // History carousel
    if($('.history-carousel').length){
        $('.history-carousel').owlCarousel({
            rtl: true,
            loop: true,
            margin: 30,
            dots: false,
            nav: true,
            autoplayHoverPause: true,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 700,
            navText: [
              '<i class="fas fa-long-arrow-alt-left"></i>',
              '<i class="fas fa-long-arrow-alt-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                    center: false
                },
                480:{
                    items:1,
                    center: false
                },
                600: {
                    items: 1,
                    center: false
                },
                768: {
                    items: 1
                },
                992: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        })
    }



    // Speaker carousel
    if($('.speaker-carousel').length){
        $('.speaker-carousel').owlCarousel({
            loop: true,
            margin: 30,
            dots: false,
            nav: true,
            autoplayHoverPause: true,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 700,
            navText: [
              '<i class="fas fa-long-arrow-alt-left"></i>',
              '<i class="fas fa-long-arrow-alt-right"></i>'
            ],
            responsive: {
                0: {
                    items: 1,
                    center: false
                },
                480:{
                    items:1,
                    center: false
                },
                600: {
                    items: 2,
                    center: false
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 3
                }
            }
        })
    }



    
    // CounterUp
    $('.counter').counterUp({
          delay: 10,
          time: 1000
      }); 


    // Parallax background
    $('.jarallax').jarallax({
        speed: 0.5
    });

    // Light box - Portfolio Gallery
    lightbox.option({
      'imageFadeDuration': 500,
      'resizeDuration': 500,
      'wrapAround': true
    })


    // YTPlayer for bg video
    $('.bg-video').mb_YTPlayer();

    // Water ripples animation
    $('#water-animation').ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: 0.04
    });

    //Scroll-Up
    dyscrollup.init({
        showafter : 500,
        scrolldelay : 1000,
        position : 'right',
        shape : 'squre',
        width : "20",
        height : "20"
    });



})(window.jQuery);