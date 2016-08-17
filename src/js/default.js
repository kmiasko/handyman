$(document).ready(function() {
  var controller = new ScrollMagic.Controller();
  var parallax = $('.parallax');

  var $grid = $('.portfolio-grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: 240,
    fitWidth: true,
    gutter: 10
  });

  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });

  new ScrollMagic.Scene({
    triggerElement: "#nav",
    triggerHook: "onLeave"
  })
    .setPin('#nav')
    .setClassToggle('#nav', 'nav-moved')
    .addTo(controller);

  $('.parallax').slick({
    accessibility: false,
    autoplay: true,
    adaptiveHeight: true,
    arrows: false,
    cssEase: 'linear',
    fade: true,
    lazyLoad: 'progressive',
    touchMove: false,
    zIndex: 500
  });

  $('.fancybox a').click(function(e) {
    e.preventDefault();
  });
  $(".fancybox").fancybox({
    helpers: {
      overlay: {
        locked: false
      }
    }
  });

});
