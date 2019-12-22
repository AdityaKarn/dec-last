jQuery(document).foundation();
/*
These functions make sure WordPress
and Foundation play nice together.
*/

jQuery(document).ready(function($) {

    // Remove empty P tags created by WP inside of Accordion and Orbit
    jQuery('.accordion p:empty, .orbit p:empty').remove();

	 // Makes sure last grid item floats left
	jQuery('.archive-grid .columns').last().addClass( 'end' );

	// Adds Flex Video to YouTube and Vimeo Embeds
    jQuery('iframe[src*="youtube.com"], iframe[src*="vimeo.com"]').each(function () {
        if (jQuery(this).innerWidth() / jQuery(this).innerHeight() > 1.5) {
            jQuery(this).wrap("<div class='widescreen flex-video'/>");
        } else {
            jQuery(this).wrap("<div class='flex-video'/>");
        }
    });

    /**
     * Owl Carousel
     */
    $('#employee-slider').owlCarousel({
        autoPlay: 3000, //Set AutoPlay to 3 seconds
        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true

        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false

    });

    var owl = $("#owl-demo");
    owl.owlCarousel({
        items : 4, //10 items above 1000px browser width
        itemsDesktop : [1000,3], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,3], // betweem 900px and 601px
        itemsTablet: [600,1], //2 items between 600 and 0
        itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
        navigation : true, // Show next and prev buttons
    });

    /**
     * Nivo Lightbox
     */
    $('.niv-box').nivoLightbox({
        effect: 'fade',                             // The effect to use when showing the lightbox
        theme: 'default',                           // The lightbox theme to use
        keyboardNav: true,                          // Enable/Disable keyboard navigation (left/right/escape)
        clickOverlayToClose: true,                  // If false clicking the "close" button will be the only way to close the lightbox
        onInit: function(){},                       // Callback when lightbox has loaded
        beforeShowLightbox: function(){},           // Callback before the lightbox is shown
        afterShowLightbox: function(lightbox){},    // Callback after the lightbox is shown
        beforeHideLightbox: function(){},           // Callback before the lightbox is hidden
        afterHideLightbox: function(){},            // Callback after the lightbox is hidden
        onPrev: function(element){},                // Callback when the lightbox gallery goes to previous item
        onNext: function(element){},                // Callback when the lightbox gallery goes to next item
        errorMessage: 'The requested content cannot be loaded. Please try again later.' // Error message when content can't be loaded
    });

    /**
     * Dynamic height
     */
    var windowHeight = $(window).height();
    $('.full').css('height', windowHeight);

    /**
     * Video attributes
     */
    $('video').prop('volume', 0)
    $('video').prop('muted', true)

    /**
     * Scroll to top
     */
    $(window).scroll(function() {
        if ($(this).scrollTop()>0) {
            $('.scroll-fade').fadeOut();

        } else {
            $('.scroll-fade').fadeIn();
        }
    });

    /**
     * FadeThis
     */
    $(window).fadeThis({
        speed: 600,
        offset:-1000,
        distance:200,
        reverse:false,
    });


    /**
     * Autoplay videos when modal opens
     */

    // Add autoplay=1 parameter on open
    $(document).on('open.zf.reveal', '[data-reveal]', function(){
        var $this = $(this);
        var src = $this.find('iframe').attr('src');

        if (src) {
            src = src.replace(/&autoplay=0/i, '');
            $this.find('iframe').attr('src', src + '&autoplay=1');
        }
    });

    // Add autoplay=0 parameter on close
    $(document).on('closed.zf.reveal', '[data-reveal]', function(){
        var $this = $(this);
        var src = $this.find('iframe').attr('src');

        if (src) {
            src = src.replace(/&autoplay=1/i, '');
            $this.find('iframe').attr('src', src + '&autoplay=0');
        }
    });

    /**
     * Slidebox
     */
    $(".close-slidebox").click(function(){
        $(this).parent().css('display','none');
    });

    $(".show-slidebox").click(function(){
        $(".slidebox").show();
    });

    // Timed fade-in for slidebox that executes on page load
    $(function() {

        //test if there is at least one instance of slidebox
        if($(".slidebox")[0]){

            //test to see if any slideboxes are timed or default-in...
            $( ".slidebox" ).each(function( index ) {
                if($( this ).attr('data-fadeType') == "calloutTimeIn"){
                    //...if so, execute the time-in function...
                    testTimeIn($( this ));
                }
                else if($( this ).attr('data-fadeType') == "calloutDefaultIn"){
                    //...or default-in the slidebox
                    $( this ).removeClass( "hide" ).addClass( "fade-up" );
                }
                else{ /*THIS ELSE NEVER DID ANYTHING ANYWAAAAY*/}
            });

            //Listen for scrolling
            window.onscroll = function() {

                //...loop through instances and check their Fade Type...
                $( ".slidebox" ).each(function( index ) {

                    switch($( this ).attr('data-fadeType')) {
                        //...Then test their individual fade values according to fade type, and call their specific functions
                        case 'calloutPixelIn':
                            testPixelIn($( this ));
                            break;
                        case 'calloutPercentageIn':
                            testPercentageIn($( this ));
                            break;
                        default:
                            break;
                    }

                });
            }
        }else{ /*do nothing */ }
    });

    $(function() {
        $('.solid').addClass('fade-out');
    });

    //Pixel-based fade in function
    function testPixelIn(div){
        //test if value of pixels scrolled down is greater than or equal to the desired number
        if($(document).scrollTop() >= div.attr('data-fadeVal')){
            div.removeClass( "hide" ).addClass( "fade-up" );
        }
    }

    //Percentage-based fade-in function
    function testPercentageIn(div){
        var toTop = ($(document).scrollTop());
        var toBottom = $(document).height() - window.innerHeight - toTop;
        var total = toTop + toBottom;

        //test if percentage scrolled down is greater than or equal to the desired %
        if((toTop/total) >= div.attr('data-fadeVal')) {
            div.removeClass( "hide" ).addClass( "fade-up" );
        }
    }

    //Timed fade-in function
    function testTimeIn(div){
        //delay timed-in slidebox by assigned number of milliseconds
        var timeDelay = div.attr('data-fadeVal');
        setTimeout(function() {
            div.removeClass( "hide" ).addClass( "fade-up" );
        }, timeDelay);
    }

    /**
     * Instagram feed
     */
    var userFeed = new Instafeed({
        get: 'user',
        userId: '1409456152',
        accessToken: '1409456152.04f866d.e4eeab9c08f047548428183d8e8b7caf',
        template: '<a class=" float-left small-2 medium-1" href="{{link}}"><img src="{{image}}" /></a>',
        resolution: 'low_resolution',
        limit: '12'
    });

    if ($('#instafeed').length) {
        userFeed.run();
    }
});