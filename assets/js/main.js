/*
Get the footer and the header and inserts into the DOM
*/
$.get("assets/templates/header.html", function(data, status){
   $(".header-container").html(data);
})

$.get("assets/templates/footer.html", function(data, status){
   $("footer").html(data);
})

$(function () {
  if (document.querySelector(".mln_sec")) {
    /* Initialiaze scrolling plugin */
    $('body').mln_full({
      'target' : '.mln_sec',
      'color' : '#455a64',
      'hover' : '#607d8b',
      'full' : true,
      'itens' : ['Ghana', 'Mauritius', 'United Kingdom']
    });

  }
})

/* Initialising Google Maps */
function initMap() {
  // fallbak if height turns 0
  $(".map").css("height", "100%");
  var ghana = {
    lat: 8.0300284,
    lng: -1.0800271
  };

  var mauritius = {
    lat: -20.2759451,
    lng: 57.5703566
  };

  var uk = {
    lat: 54.7023545,
    lng: -3.2765753
  };

  var ghMap = new google.maps.Map(document.getElementById("ghana"), {
    zoom: 15,
    center: ghana
  });
/* Using single quotes to escape the double quotes */
  var ghDetails = '<div id="map-content"><p id="location-title">Cim Finance</p> <i class="fa fa-map-marker" aria-hidden="true"></i> Manhattan Building, Edith Cavell St, Port Louis <br /> <i class="fa fa-globe" aria-hidden="true"></i><a href="http://cimfinance.mu">Visit Our Website </a></div>';

  var murDetails = '<div id="map-content"><p id="location-title">Cim Finance</p> <i class="fa fa-map-marker" aria-hidden="true"></i> Manhattan Building, Edith Cavell St, Port Louis <br /> <i class="fa fa-globe" aria-hidden="true"></i><a href="http://cimfinance.mu">Visit Our Website </a></div>';

  var ukDetails = '<div id="map-content"><p id="location-title">Cim Finance</p> <i class="fa fa-map-marker" aria-hidden="true"></i> Manhattan Building, Edith Cavell St, Port Louis <br /> <i class="fa fa-globe" aria-hidden="true"></i><a href="http://cimfinance.mu">Visit Our Website </a></div>';

  var ghWindow = new google.maps.InfoWindow({
    content: ghDetails
  });

  var ghMarker = new google.maps.Marker({
    position: ghana,
    map: ghMap,
    title: "Ghana"
  });
  ghMarker.addListener("click", function() {
    ghWindow.open(ghMap, marker);
  });
}
