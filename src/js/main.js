// First screen animation

var tl = new TimelineMax();
tl
    .fromTo('.header__logo-box', 1, { y: -200, opacity: 0 }, { y: 0, opacity: 1 })
    .fromTo('.header__bottom-info', 1, { y: -200, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.7")
    .fromTo('.header__top-info', 1, { y: -200, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.7")
    .staggerFromTo('.nav a', 0.5, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, 0.03)
    .fromTo('.hero-slider', 0.5, { opacity: 0 }, { opacity: 1 })


// custom select on page LEADS
$('.select').on('click', '.placeholder', function() {
    var parent = $(this).closest('.select');
    if (!parent.hasClass('is-open')) {
        parent.addClass('is-open');
        $('.select.is-open').not(parent).removeClass('is-open');
    } else {
        parent.removeClass('is-open');
    }
}).on('click', 'ul>li', function() {
    var parent = $(this).closest('.select');
    parent.removeClass('is-open').find('.placeholder').text($(this).text());
    parent.find('input[type=hidden]').attr('value', $(this).attr('data-value'));

});
// Hero Slider
$(document).ready(function() {
    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 250,
        autoplay: true,
        autoplayTimeout: 8000,
        nav: true,
        navText: false,
        dots: false
    });
});
$('#pride-parallax').parallax({ imageSrc: 'img/bgparallax-01.jpg' });
$('#testimonials-parallax').parallax({ imageSrc: 'img/bgparallax-02.jpg' });
$('#footer-parallax').parallax({ imageSrc: 'img/bgparallax-03.jpg' });