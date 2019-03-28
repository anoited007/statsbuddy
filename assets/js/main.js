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
var countries = {"ghana":"GHA","mauritius":"MUS", "united-kingdom":"GBR" };
var indicators = {"internet-penetration":"IT.NET.USER.P3","cellular-subscription":"IT.CEL.SETS.P2",
                  "fixed-broadband":"IT.NET.BBND.P2","secure-server":"IT.NET.SECR.P6", "personal-computers":"IT.CMP.PCMP.P2", "population":"SP.POP.TOTL", "population-density":"EN.POP.DNST",
                 "gdp":"NY.GDP.MKTP.CD", "gdp-percapita":"NY.GDP.PCAP.PP.KD"};

var country_arr = ["ghana"];
var country_codes = [];

//equivalent to $(document).ready()
$(function(){

  var canvas = $("#chart");

   // TODO: if country is more than 1 add ';' in between.
  var country = getCountryCode();
  var indicator = "IT.NET.USER.P3";

  $("input[type=radio]").each(function() {
    $(this).on("change",getDataPoint);
  })

  $("input[type=checkbox]").each(function() {
    $(this).on("change",getSelectedCountry);
  })


})


  function getCountry(){
    if($.inArray(this.value, country_arr) === -1 && this.checked){
      country_arr.push(this.value);
    }

    else if ($.inArray(this.value, country_arr) >= 0 && !this.checked) {
      country_arr.pop(this.value);
    }
    console.log("This is country " +country_arr);
    getCountryCode();
    return country_arr;
  }

  function getSelectedCountry() {
    $("input[type=checkbox]").each(function () {
      if(this.checked){
        let code = $(this).attr("data-code") //equivalent to this.getAttribute("data-code")
        country_codes.push(code)
      }
      console.log(country_codes);

    })


  }

  function getDataPoint(){
    if(this.checked){
      indicator = indicators[this.value]
      console.log(this.value);
      console.log(indicator);
      return this.value;
  }
}

function getCountryCode() {
  let code ="";
  country_arr.forEach(function(element,index){
    if(country_arr.length === 1){
       code  += countries[element]
    }
    else {
      if(index === country_arr.length -1){
        code += country_arr[element]
      }
      else {
        code += country_arr[element]+";"
      }

    }

  })
  country = code;
  console.log(country);
  return code;
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
