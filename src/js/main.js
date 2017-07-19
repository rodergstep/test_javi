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