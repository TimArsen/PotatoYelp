'use strict';

console.log("Hi!");

// header and footer on home page
$(".navbar").hide();
$("footer").hide();

// When clicked on login or register, unhide
$("a").on("click", function() {
  $(".navbar").show();
  $("footer").show();
});
