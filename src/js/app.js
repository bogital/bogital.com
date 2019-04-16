// JS Goes here - ES6 supported
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", (user) => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

/*****
 * Author: kamiruvice<kamiruvice@gmail.com> (www.yneka.com)
 */
// GLOBALS
/*--------------------------------------------------------------
- HELPER FUNCTIONS
----------------------------------------------------------------*/

/**
 * indicates if a the current browser is made by Microsoft.
 * Use this functionto load polyfillls for MS browsers if needed.
 * @method isMicrosoftBrowser
 * @param {String} userAgent
 * @returns {Boolean}
 */
// function isMicrosoftBrowser(userAgent) {
//   var userAgentPatterns = ["MSIE ", "Trident/", "Edge/"];

//   return new RegExp(userAgentPatterns.join("|")).test(userAgent);
// }

var $ = window.$;


$("#carouselID").on("slide.bs.carousel", function(e) {
  console.log(e);
  var $e = $(e.relatedTarget);
  var idx = $e.index();
  var itemsPerSlide = 4;
  var totalItems = $(".carousel-item").length;

  if (idx >= totalItems - (itemsPerSlide - 1)) {
    var it = itemsPerSlide - (totalItems - idx);
    for (var i = 0; i < it; i++) {
      // append slides to end
      if (e.direction === "left") {
        $(".carousel-item").eq(i).appendTo(".carousel-inner");
      }
      else {
        $(".carousel-item").eq(0).appendTo(".carousel-inner");
      }
    }
  }
});
