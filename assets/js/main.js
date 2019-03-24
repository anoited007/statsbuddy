$.get("assets/templates/header.html", function(data, status){
   $(".header-container").html(data);
})

$.get("assets/templates/footer.html", function(data, status){
   $(".footer-container").html(data);
})
