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
  let totalPopulation = $.get("assets/json/population.json");
  let populationDensity = $.get("assets/json/population-density.json");
  let gdp = $.get("assets/json/gdp.json");
  let capita = $.get("assets/json/gdp-per-capita.json");

// Declaring function-wide variables
  var ghPopulation, muPopulation,ukPopulation;
  var ghDensity, muDensity, ukDensity;
  var ghGdp, muGdp, ukGdp;
  var ghCapita, muCapita, ukCapita;
  var formatter = new Intl.NumberFormat(); // Using ES6 number formatter to make number easily readable

  $.when(totalPopulation, populationDensity, gdp, capita).done(function (total,density,gross,perCapita) {

    ghPopulation = total[0]["GHA"].value;
    muPopulation = total[0]["MUS"].value;
    ukPopulation = total[0]["GBR"].value;

    ghDensity = Math.round(density[0]["GHA"].value);
    muDensity = Math.round(density[0]["MUS"].value);
    ukDensity = Math.round(density[0]["GBR"].value);

    ghGdp = Math.round(gross[0]["GHA"].value);
    muGdp = Math.round(gross[0]["MUS"].value);
    ukGdp = Math.round(gross[0]["GBR"].value);

    ghCapita = Math.round(perCapita[0]["GHA"].value);
    muCapita = Math.round(perCapita[0]["MUS"].value);
    ukCapita = Math.round(perCapita[0]["GBR"].value);
  })

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

  //var ghContainer =
  var ghMap = new google.maps.Map(document.querySelector("#ghana div > .map"), {
    zoom: 6,
    center: ghana
  });

  var muMap = new google.maps.Map(document.querySelector("#mauritius div > .map"),{
    zoom: 10,
    center: mauritius
  })

  var ukMap = new google.maps.Map(document.querySelector("#uk div > .map"),{
    zoom: 5,
    center: uk
  })

  var ghMarker = new google.maps.Marker({
    position: ghana,
    map: ghMap,
    title: "Ghana"
  });

  var muMarker = new google.maps.Marker({
    position: mauritius,
    map: muMap,
    title: "Mauritius"
  });

  var ukMarker = new google.maps.Marker({
    position: uk,
    map: ukMap,
    title: "United Kingdom"
  });


  ghMarker.addListener("click", function() {

    var ghDetails = '<div class="map-content"><p><span class="map-title">Ghana</span><br/>'+
                    'Total Population(2017): ' +formatter.format(ghPopulation) + '<br/>' +
                    'Population Density(2017): ' +formatter.format(ghDensity) + '<br/>'+
                    'GDP(2017): ' +formatter.format(ghGdp) +'<br/>' +
                    'GDP Per Capita (2017): ' +formatter.format(ghCapita) +'<br/>' +
                    '</p></div>';

    var ghWindow = new google.maps.InfoWindow({
    content: ghDetails
    });

    ghWindow.open(ghMap, ghMarker);
  });

  muMarker.addListener("click", function() {
    var murDetails = '<div class="map-content"><p><span class="map-title">Mauritius</span><br/>'+
                    'Total Population(2017): ' +formatter.format(muPopulation) + '<br/>' +
                    'Population Density(2017): ' +formatter.format(muDensity) + '<br/>'+
                    'GDP(2017): ' +formatter.format(muGdp) +'<br/>' +
                    'GDP Per Capita (2017): ' +formatter.format(muCapita) +'<br/>' +
                    '</p></div>';

    var muWindow = new google.maps.InfoWindow({
      content: murDetails
    });

    muWindow.open(ghMap, muMarker);
  });

  ukMarker.addListener("click", function() {
    var ukDetails = '<div class="map-content"><p><span class="map-title">United Kingdom</span><br/>'+
                    'Total Population(2017): ' +formatter.format(ukPopulation) + '<br/>' +
                    'Population Density(2017): ' +formatter.format(ukDensity) + '<br/>'+
                    'GDP(2017): ' +formatter.format(ukGdp) +'<br/>' +
                    'GDP Per Capita (2017): ' +formatter.format(ukCapita) +'<br/>' +
                    '</p></div>';

    var ukWindow = new google.maps.InfoWindow({
      content: ukDetails
    });

    ukWindow.open(ukMap, ukMarker);
  });

}
