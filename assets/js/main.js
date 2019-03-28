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

//equivalent to $(document).ready()
$(function(){
  var countries = $("input[type=checkbox]");
  var canvas = $("#chart");

   // TODO: if country is more than 1 add ';' in between.
  var indicator = "IT.NET.USER.P3";

  $("input[type=radio]").each(function() {
    $(this).on("change",getDataPoint);
  })

  $("input[type=checkbox]").each(function() {
    $(this).on("change",getCountry);
  })


    function getCountry(){
      if($.inArray($(this).attr("data-code"), country_codes) === -1 && this.checked){
        country_codes.push($(this).attr("data-code"));
      }

      else if ($.inArray($(this).attr("data-code"), country_codes) >= 0 && !this.checked) {
        country_codes.pop($(this).attr("data-code"));
      }

      else if ($.inArray($(this).attr("data-code"), countries)  ) {

      }
      console.log("This is country " +country_codes);
      return country_codes;
    }

})

  function getDataPoint(){
    if(this.checked){
      indicator = indicators[this.value]
      console.log(this.value);
      console.log(indicator);
      return this.value;
  }
}


$.ajax({url:"assets/js/vendor/test.json"}).done(function(data){

    $.each(data[1],function (name, value) {
      let dates = []
      let values = []
      dates.push(this["date"])
      values.push(Math.round(this["value"]))

      console.log(dates)
      console.log(values)

    })


})
