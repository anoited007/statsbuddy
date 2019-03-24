$.get(".header-container").load("assets/templates/header.html");

$(function() {
  Handlebars.registerPartial('header', '../templates/header.mustache');
});
