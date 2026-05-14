/*================ GLOBAL =================*/
var $grid;

/*======== WINDOW LOAD ========*/
$(window).on('load', function() {

    /*======== Preloader ========*/
    $(".loader").fadeOut();
    $(".preloader").delay(1000).fadeOut();

    /*======== Isotope Portfolio Setup ========*/
    if ($('.portfolio-items').length) {

        $grid = $(".portfolio-items").isotope({
            itemSelector: '.item',
            layoutMode: 'fitRows'
        });

        // FILTER CLICK
        $('.portfolio-filter ul li').on('click', function () {

            // yalnız öz UL-də active dəyiş
            $(this).closest('ul').find('li').removeClass('active');
            $(this).addClass('active');

            var selector = $(this).attr('data-filter');

            $grid.isotope('arrange', {
                filter: selector
            });
        });
    }

    /*======== Blogs Masonry ========*/
    $('.blogs-masonry').isotope({ layoutMode: 'moduloColumns' });

    $('#video-container video').attr('playsinline', '');
    $('#video-container video').attr('controls', '');

});


/*======== DOCUMENT READY ========*/
$(document).ready(function() {

    "use strict";

    /*======== SimpleBar ========*/
    $('.pt-page').each(function() {
        new SimpleBar(this);
    });

    /*======== Fitty ========*/
    fitty('.header-name', {
        multiLine: false,
        maxSize: 20,
        minSize: 10
    });

    /*======== Menu ========*/
    $('.nav-menu a').on('click', function() {
        $('.header-content').removeClass('on');
    });

    $('.header-toggle').on('click', function() {
        $('header .header-content').toggleClass('on');
    });

    /*======== Carousel ========*/
    $(".clients .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        dots: false,
        responsive: {
            0: { items: 2 },
            500: { items: 3 },
            700: { items: 4 },
            1000: { items: 6 },
        },
    });

    $(".testimonials .owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
        smartSpeed: 500,
        dots: false,
        responsive: {
            0: { items: 1 },
            1000: { items: 2 },
        },
    });

    /*======== Portfolio Popup ========*/
    $('.portfolio-items .image-link').magnificPopup({
        type: 'image',
        gallery: { enabled: true }
    });

    $('.portfolio-items .video-link').magnificPopup({
        type: 'iframe',
        gallery: { enabled: true }
    });

    ajaxPortfolioSetup($('.portfolio-items .ajax-link'), $('.ajax-portfolio-popup'));

    $('#portfolio .item figure').tilt({
        maxTilt: 3,
        glare: true,
        maxGlare: .6,
        reverse: true
    });

    /*======== Contact ========*/
    contactFormSetup();
});


/*======== TAB SYSTEM (ƏSAS FIX BURDA) ========*/
document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        // TAB ACTIVE
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // CONTENT CHANGE
        document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
        const activeContent = document.getElementById(btn.dataset.tab);
        activeContent.classList.add("active");

        
        activeContent.querySelectorAll("li").forEach(li => li.classList.remove("active"));
        const allBtn = activeContent.querySelector('li[data-filter="*"]');
        if (allBtn) allBtn.classList.add("active");

        
        if ($grid) {
            $grid.isotope('arrange', { filter: '*' });
        }
    });
});


/*********** AJAX PORTFOLIO **********/
function ajaxPortfolioSetup($ajaxLink, $ajaxContainer) {

    $ajaxLink.on('click', function(e) {

        var link = $(this).attr('href');
        if(link === "#") return e.preventDefault();

        $ajaxContainer.find('.popup-content').empty();
        $ajaxContainer.addClass('on');

        $.ajax({
            url: link,
            beforeSend: function() {
                $ajaxContainer.find('.ajax-loader').show();
            },
            success: function(result) {
                $ajaxContainer.find('.popup-content').html(result);
            },
            complete: function() {
                $ajaxContainer.find('.ajax-loader').hide();
            }
        });

        e.preventDefault();
    });

    $ajaxContainer.find('.popup-close').on('click', function() {
        $ajaxContainer.removeClass('on');
    });
}


/********** CONTACT FORM **********/
function contactFormSetup() {

    $('.input__field').on('keyup', function() {
        $(this).parent().toggleClass('input--filled', !!$(this).val());
    });

    $('#contact-form').on('submit', function(e) {
        e.preventDefault();

        var required = 0;

        $('.cf-validate', this).each(function() {
            if(!$(this).val()) {
                $(this).addClass('cf-error');
                required++;
            } else {
                $(this).removeClass('cf-error');
            }
        });

        if(required === 0) {
            $.post('mail.php', {
                cf_name: $('#cf-name').val(),
                cf_email: $('#cf-email').val(),
                cf_message: $('#cf-message').val()
            }, function(data) {
                $("#contact-form .input__field").val("");
                showAlertBox(data.status, data.responseText);
            });
        }
    });
}


/********** ALERT **********/
function showAlertBox(response, message) {

    var $alertBox = $('<div class="alert"></div>');

    if(response == 200) {
        $alertBox.addClass('alert-success').html(message);
    } else {
        $alertBox.addClass('alert-danger').html(message);
    }

    $('#contact-form .alert-container')
        .html($alertBox)
        .fadeIn(300)
        .delay(2000)
        .fadeOut(400);
}
