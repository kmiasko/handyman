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
  
  google.maps.event.addDomListener(window, 'load', init);
  
            function init() {
                // Basic options for a simple Google Map
                // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                var mapOptions = {
                    // How zoomed in you want the map to start at (always required)
                    zoom: 11,
   disableDefaultUI: true,//set to true to disable all map controls,
   scrollwheel: false, //set to true to enable mouse scrolling while inside the map area

                    // The latitude and longitude to center the map (always required)
                    center: new google.maps.LatLng(47.5546097, 7.5594406), // New York

                    // How you would like to style the map. 
                    // This is where you would paste any style found on Snazzy Maps.
                    styles: [{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]
                };

                // Get the HTML DOM element that will contain your map 
                // We are using a div with id="map" seen below in the <body>
                var mapElement = document.getElementById('map');

                // Create the Google Map using our element and options defined above
                var map = new google.maps.Map(mapElement, mapOptions);
  google.maps.event.addDomListener(window, "resize", function() {
      var center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center); 
  });
                };
});