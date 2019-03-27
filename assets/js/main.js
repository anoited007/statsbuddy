$.get("assets/templates/header.html", function(data, status){
   $(".header-container").html(data);
})

$.get("assets/templates/footer.html", function(data, status){
   $("footer").html(data);
})

//equivalent to $(document).ready()
$(function(){

  var canvas = $("#chart");
  let baseUrl = "https://api.worldbank.org/v2/";
  var countries = {"ghana":"GHA","mauritius":"MUS", "united-kingdom":"GBR" };
  var indicators = {"internet-penetration":"IT.NET.USER.P3","cellular-subscription":"IT.CEL.SETS.P2",
                    "fixed-broadband":"IT.NET.BBND.P2","secure-server":"IT.NET.SECR.P6", "personal-computers":"IT.CMP.PCMP.P2", "population":"SP.POP.TOTL", "population-density":"EN.POP.DNST",
                   "gdp":"NY.GDP.MKTP.CD", "gdp-percapita":"NY.GDP.PCAP.PP.KD"};

  var country_arr = ["ghana"];

  var indicator = "IT.NET.USER.P3";

  $("input[type=radio]").each(function() {
    $(this).on("change",getDataPoint);
  })

  $("input[type=checkbox]").each(function() {
    $(this).on("change",getCountry);
  })


  function getCountry(){
    if($.inArray(this.value, country_arr) === -1 && this.checked){
      country_arr.push(this.value);
    }

    else if ($.inArray(this.value, country_arr) >= 0 && !this.checked) {
      country_arr.pop(this.value);
    }
    console.log("This is country " +country_arr);
    return countries;
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
