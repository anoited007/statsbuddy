/*
The first few lines get the footer and the header and inserts into the DOM
*/
$.get("assets/templates/header.html", function(data, status){
   $(".header-container").html(data);
})

$.get("assets/templates/footer.html", function(data, status){
   $("footer").html(data);
})

/*
Declaring Global Variables. These are Global because they will be accessed in different scopes of the script.
Also, they don't require the DOM to be ready before they can be initialiazed.
*/
let baseUrl = "https://api.worldbank.org/v2/";

//var countries = {"ghana":"GHA","mauritius":"MUS", "united-kingdom":"GBR" };
var indicators = {"internet-penetration":"IT.NET.USER.P3","cellular-subscription":"IT.CEL.SETS.P2",
                  "fixed-broadband":"IT.NET.BBND.P2","secure-server":"IT.NET.SECR.P6", "personal-computers":"IT.CMP.PCMP.P2", "population":"SP.POP.TOTL", "population-density":"EN.POP.DNST",
                 "gdp":"NY.GDP.MKTP.CD", "gdp-percapita":"NY.GDP.PCAP.PP.KD"};

var country_codes = ["GHA"];
var country_code ; //will be initialiazed when ready to be used in getCountry function.

//equivalent to $(document).ready()
$(function(){
  var countries = $("input[type=checkbox]");
  //var canvas = $("#chart");

   // TODO: if country is more than 1 add ';' in between.
  var indicator = "IT.NET.USER.P3";

  $("input[type=radio]").each(function() {
    $(this).on("change",getDataPoint);
  })

  $("input[type=checkbox]").each(function() {
    $(this).on("change",getCountry);
  })


    function getCountry(){
      // Saving the this object in the current context to use it when the contenxt of this changes.
      let element = $(this).attr("data-code");
      let index = country_codes.indexOf(element);
      country_code = ""; //initialiazed to be used in loop after getting codes.

      if( index === -1 && this.checked){
        country_codes.push(element);
      }

      else if (index >= 0 && !this.checked) {
        country_codes.splice(index, 1);
      }

    for (let i = 0; i < country_codes.length; i++) {

      if(i === country_codes.length -1){
        country_code += country_codes[i]
      }
      else {
        country_code += country_codes[i] +";"
      }

    }


      console.log("This is country " +country_codes);
      console.log(country_code);
      return country_code;
      }

  function getDataPoint(){
    if(this.checked){
      indicator = indicators[this.value]
      console.log(this.value);
      console.log(indicator);
      return this.value;
  }
 }

})

$.ajax({
  url:"https://api.worldbank.org/v2/country/GBR;GHA/indicators/IT.CEL.SETS.P2?date=2013:2018&format=json",
  //url:baseUrl+"countries/"+country_code+"indicators/"+indicator+"?date=2013:2018&format=json",
  crossDomain: true
}
).done(function(data){
  var canvas = $("#chart");
  let indicatorName;
  let labels = []; // labels are the names of the countries in the graph
  let dates = [];
  let values = [];

  indicatorName = data[1][0]["indicator"]["value"];
  console.log(indicatorName);

  $.each(data[1],function (index, data) {
    let date = data["date"];

    if($.inArray(date,dates)=== -1){
      dates.push(date);
    }

    values.push(Math.round(this["value"]))
    let country_name = data.country.value;

// if country name hasn't been added to labels, add it
    if($.inArray(country_name,labels) === -1){
      labels.push(country_name);
    }
    console.log("printing current items");
    console.log(labels);
    console.log(dates);
    console.log(values);

})
let element =$("input[type=radio]").filter(function(){return this.checked}).attr("value")
 new Chart(canvas,{
  type: 'bar',
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
        data: [2478,5267,734,784,433]
      }
    ]
  },
  options: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Predicted world population (millions) in 2050'
    }
  }
})

})
