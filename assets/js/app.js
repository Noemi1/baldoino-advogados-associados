NProgress.start();
$(document).ready(function () {
    let screenSize = 'XL' | 'LG' | 'MD' | 'SM';

    AOS.init();
    NProgress.done();
    setScreenSize();


    $('.btn-mobile').on('click', function (e) {
        e.preventDefault();
        setScreenSize();
        if (screenSize == 'MD' || screenSize == 'SM') {
            $('.header').toggleClass('toggle');
        }
    });

    $(window).on('resize', function () {
        setScreenSize();
    })


    function setScreenSize() {
        $(window).scrollLeft(0)
        let size = $(window).width();
        console.log(size)
        if (size < 576) {
            screenSize = 'SM'
        }
        else if (size >= 576 && size < 992) {
            screenSize = 'MD'
        }
        else if (size >= 992) {
            screenSize = 'LG'
        }
        else {
            screenSize = 'XL'
        }
    }
    $(window).scrollLeft(0);

    $('.atuacao-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        // arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        draggable: true,
        adaptiveHeight: false,
        variableWidth: true,
        centerMode: false,
    });
    // $('.header-navigation-link').unbind('mouseenter');
    // $('.header-navigation-link').unbind('mouseleave');

    $('.header-navigation-link').on('mouseenter', function () {
        console.log(screenSize)
        if (screenSize == 'LG' || screenSize == 'XL') {
            let left = $(this).position().left;
            let width = $(this).innerWidth();
            $('.header-navigation-link').removeClass('hover');
            $(this).addClass('hover')
            $('.border-movement').animate({
                left: left + 'px',
                width: width + 'px'
            }, 200)
        }
    });

    $('.header-navigation-link').on('mouseleave', function () {
        if (screenSize == 'LG' || screenSize == 'XL') {
            $('.header-navigation-link').removeClass('hover');
            setTimeout(function () {
                if ($('.header-navigation-link.hover').length == 0) {
                    $('.border-movement').animate({
                        left: 0 + 'px',
                        width: 0 + 'px'
                    }, 300);
                }
            }, 100);

        }
    });

    $(window).on('scroll', function (e) {
        if (!canScroll) {
            e.preventDefault()
        } 
    })
    
    let canMouseout = true;
    let canMouseenter = true;
    let lastCardHover;
    let canScroll = true;
    $('.atuacao-card').on('mouseleave', function() {
        canScroll = false;
        if (canMouseout) {
            $(this).removeClass('is-back');
            $(this).parent('.scene').removeClass('is-back');
        }
        setTimeout(() => {
            canMouseenter = true;
            canScroll = true;
        }, 500);
    })
    
    $('.atuacao-card').on('mousemove', function() {
        $('.atuacao-card').removeClass('is-back');
        $('.scene').removeClass('is-back');
        canScroll = false;
        if (canMouseenter || lastCardHover != $(this).data('name')) {
            $(this).addClass('is-back')
            $(this).parent('.scene').addClass('is-back');
        }
        setTimeout(() => {
            canMouseout = true;
            canScroll = true;
        }, 500);
        lastCardHover = $(this).data('name');
    })
});

function setHeaderScroll() {
    if (window.navigator.brave) {
        $('.header').addClass('scroll')
    } else {
        if ($(window).scrollTop() > 10) {
            $('.header').addClass('scroll')
        } else {
            $('.header').removeClass('scroll')
        }
    }
}


function toggleHeaderNavigation() {
    if ($(window).width() <= 992) {
        $('.header').toggleClass('toggle');
    }
}
