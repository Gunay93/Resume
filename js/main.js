$(window).on('load', function() {

    /*======== Preloader ========*/
    $(".loader").fadeOut();
    $(".preloader").delay(1000).fadeOut();


    /*======== Isotope Portfolio Setup ========*/
    let $grid; 

    if( $('.portfolio-items').length ) {

        var $elements = $(".portfolio-items"),
            $filters = $('.portfolio-filter ul li');

        $grid = $elements.isotope({
            itemSelector: '.item',
            layoutMode: 'fitRows'
        });

        $filters.on('click', function(){

            $(this).closest('ul').find('li').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).data('filter');

            $grid.isotope({
                filter: selector,
                hiddenStyle: {
                    transform: 'scale(.2) skew(30deg)',
                    opacity: 0
                },
                visibleStyle: {
                    transform: 'scale(1) skew(0deg)',
                    opacity: 1,
                },
                transitionDuration: '.5s'
            });
        });
    }

    /*======== Blogs Masonry Setup ========*/
    $('.blogs-masonry').isotope({ layoutMode: 'moduloColumns' });

    $('#video-container video').attr('playsinline', '');
    $('#video-container video').attr('controls', '');

});


/*======== Document Ready Function ========*/
$(document).ready(function() {

    "use strict";

    /*======== SimpleBar Setup ========*/
    $('.pt-page').each(function() {
        var $id = '#' + $(this).attr('id');
        new SimpleBar($($id)[0]);
    });

    /*======== Fitty Setup ========*/
    fitty('.header-name', {
        multiLine: false,
        maxSize: 20,
        minSize: 10
    });

    /*======== Active Current Link ========*/
    $('.nav-menu a').on('click',function() {
        if($('.header-content.on').length) {
            $('.header-content').removeClass('on');
        }
    });

    /*======== Mobile Toggle Click Setup ========*/
    $('.header-toggle').on('click', function() {
        $('header .header-content').toggleClass('on');
    });

    /*========Clients OwlCarousel Setup========*/
    $(".clients .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        autoplayHoverPause: true,
        dots: false,
        responsive: {
            0: { items: 2 },
            500: { items: 3 },
            700: { items: 4 },
            1000: { items: 6 },
        },
    });

    /*========Testimonials OwlCarousel Setup========*/
    $(".testimonials .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        responsiveClass: true,
        dots: false,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 1 },
            800: { items: 1 },
            1000: { items: 2 },
        },
    });

    /*======== Skills Progress Animation ========*/
    if($('.skills').length > 0) {
        var el = new SimpleBar($('#resume')[0]).getScrollElement();

        $(el).on('scroll', function() {

            $('.progress .progress-bar').each(function() {
                var bottom_object = $(this).offset().top + $(this).outerHeight();
                var bottom_window = $(window).scrollTop() + $(window).height();
                var progressWidth = $(this).data('progress-value') + '%';

                if (bottom_window > bottom_object) {
                    $(this).css({ width: progressWidth });

                    $(this).find('.progress-value').animate({
                        countNum: parseInt(progressWidth, 10)
                    }, {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $(this).text(Math.floor(this.countNum) + '%');
                        },
                        complete: function() {
                            $(this).text(this.countNum + '%');
                        }
                    });
                }
            });

        });
    }

    /*======== Portfolio Image Link Setup ========*/
    $('.portfolio-items .image-link').magnificPopup({
        type: 'image',
        gallery: { enabled: true }
    });

    /*======== Portfolio Video Link Setup ========*/
    $('.portfolio-items .video-link').magnificPopup({
        type: 'iframe',
        gallery: { enabled: true }
    });

    /*======== Portfolio Ajax Link Setup ========*/
    ajaxPortfolioSetup($('.portfolio-items .ajax-link'), $('.ajax-portfolio-popup'));

    /*======== Portfolio Tilt Setup ========*/
    $('#portfolio .item figure').tilt({
        maxTilt: 3,
        glare: true,
        maxGlare: .6,
        reverse: true
    });

    /*======== Contact Form Setup ========*/
    contactFormSetup();
});


/*********** TAB SYSTEM (FIXED) **********/
const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(btn => {
    btn.addEventListener("click", () => {

        tabs.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        contents.forEach(c => c.classList.remove("active"));
        const activeContent = document.getElementById(btn.dataset.tab);
        activeContent.classList.add("active");

        activeContent.querySelectorAll("li").forEach(li => {
            li.classList.remove("active");
        });

        const allBtn = activeContent.querySelector('li[data-filter="*"]');
        if (allBtn) allBtn.classList.add("active");

        if (typeof $grid !== "undefined") {
            $grid.isotope({ filter: "*" });
        }
    });
});
