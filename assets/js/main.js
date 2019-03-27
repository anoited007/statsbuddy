$.get("assets/templates/header.html", function(data, status){
   $(".header-container").html(data);
})

$.get("assets/templates/footer.html", function(data, status){
   $("footer").html(data);
})

//equivalent to $(document).ready()
$(function(){
  var canvas = $("#chart").getContext("2d");
  var countries = {"ghana":"GHA","mauritius":"MUS", "united-kingdom":"GBR" };
  var indicators = {"internet-penetration":"IT.NET.USER.P3","cellular-subscription":"IT.CEL.SETS.P2",
                    "fixed-broadband":"IT.NET.BBND.P2","secure-server":"IT.NET.SECR.P6", "personal-computers":"IT.CMP.PCMP.P2", "population":"SP.POP.TOTL", "population-density":"EN.POP.DNST"
                   "gdp":"NY.GDP.MKTP.CD", "gdp-percapita":"NY.GDP.PCAP.PP.KD"};

  let country = "GHA";
  let indicator = null;
  let baseUrl = "https://api.worldbank.org/v2/";

  $.ajax({
    url:baseUrl+"countries/"+country+"indicators/"+indicator+"?date=2013:2018",
    crossDomain: true
  }
  ),function(data){
    console.log(data)
  }


})
