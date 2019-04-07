/*
Declaring Global Variables. These are Global because they will be accessed in different scopes of the script.
Also, they don't require the DOM to be ready before they can be initialiazed.
*/
let baseUrl = "https://api.worldbank.org/v2/";

//var countries = {"ghana":"GHA","mauritius":"MUS", "united-kingdom":"GBR" };
var indicators = {"internet-penetration":"IT.NET.USER.P3","cellular-subscription":"IT.CEL.SETS.P2",
                  "fixed-broadband":"IT.NET.BBND.P2","secure-server":"IT.NET.SECR.P6", "personal-computers":"IT.CMP.PCMP.P2", "population":"SP.POP.TOTL", "population-density":"EN.POP.DNST",
                 "gdp":"NY.GDP.MKTP.CD", "gdp-percapita":"NY.GDP.PCAP.PP.KD"};

var indicator = indicators["cellular-subscription"];

var country_codes = ["GHA"];
var country_code = "GHA";

//equivalent to $(document).ready()
$(function(){
  queryData();

  var countries = $("input[type=checkbox]");
  //var canvas = $("#chart");

   // TODO: if country is more than 1 add ';' in between.

  $("input[type=radio]").each(function() {
    $(this).on("change",getDataPoint);
  })

  $("input[type=checkbox]").each(function() {
    $(this).on("change",getCountry);

  $("input").each(function () {
    $(this).on("change", queryData);
  })


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


      // console.log("This is country " +country_codes);
      // console.log(country_code);
      return country_code;
      }

  function getDataPoint(){
    if(this.checked){
      indicator = indicators[this.value]
      // console.log(this.value);
      // console.log(indicator);
      return this.value;
  }
 }

})

function queryData() {
  $.ajax({
    //let url = baseUrl+"countries/"+country_code+"indicators/"+indicator+"?date=2013:2018&format=json"
    //url:"https://api.worldbank.org/v2/country/GBR;GHA/indicators/IT.CEL.SETS.P2?date=2013:2018&format=json",
    url: baseUrl.concat("countries/","GHA;MUS;GBR","/indicators/",indicator,"?date=2013:2018&format=json"),
    crossDomain: true
  }).done(function(data){
    let indicatorName;
    let labels = []; // labels are the names of the countries in the graph
    let dates = [];
    let values = [];

  if(data[1] != null){
    indicatorName = data[1][0]["indicator"]["value"];
    // console.log(indicatorName);

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
      // console.log("printing current items");
      // console.log(labels);
      // console.log(dates);
      // console.log(values);

  })

  }
  // console.log("before calling drawGraph");
   drawGraph(labels, dates, values, indicatorName);

  })

}

function drawGraph(labels, dates, values, indicatorName) {
  // Set chart filling to false
  Chart.defaults.global.elements.line.fill = false;

  let canvas = $("#chart");

  let element = $("input[type=radio]").filter(function(){return this.checked}).attr("value");

  if(element === "secure-server" || element === "personal-computers"){

        let valueSet1 = []
        let valueSet2 = []
        let valueSet3 = []
        let midValue = Math.round(values.length / 3)

        for(let i = 0, j = 0; i < values.length; i++){
          if(i < midValue) {
            valueSet1[i] = labels[i];
          }

          else if (i >= midValue && i < values.length - midValue) {
            valueSet2[i-midValue] = labels[i];
          }


          else{
            valueSet3[j++] = labels[i];
          }

      }
      // console.log(valueSet1);
      // console.log(valueSet2);
      // console.log(valueSet3);
      new Chart(canvas, {
          type: 'bar',
          data: {
            labels: dates,
            datasets: [
              {
                label: labels[0],
                backgroundColor: "#3e95cd",
                data: valueSet1
              }, {
                label: labels[1],
                backgroundColor: "#8e5ea2",
                data: valueSet2
              },
              {
                label: labels[2],
                backgroundColor: "#484A47",
                data: valueSet3
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: indicatorName
            }
          }
      });


  }

  else {

      let valueSet1 = []
      let valueSet2 = []
      let valueSet3 = []
      let midValue = Math.round(values.length / 3)

      for(let i = 0, j = 0; i < values.length; i++){
        if(i < midValue) {
          valueSet1[i] = values[i];
        }

        else if (i >= midValue && i < values.length - midValue) {
          valueSet2[i-midValue] = values[i];
        }

        else{
          valueSet3[j++] = values[i];
        }

    }
    // console.log(valueSet1);

    new Chart(canvas, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [
            {
              label: labels[0],
              backgroundColor: "#3e95cd",
              data: valueSet1
            }, {
              label: labels[1],
              backgroundColor: "#8e5ea2",
              data: valueSet2
            },
            {
              label: labels[2],
              backgroundColor: "#484A47",
              data: valueSet3
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: indicatorName
          }
        }
    });

  }

}
