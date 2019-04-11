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
var d = document;
var w = window;
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
function isMicrosoftBrowser(userAgent) {
  var userAgentPatterns = ["MSIE ", "Trident/", "Edge/"];

  return new RegExp(userAgentPatterns.join("|")).test(userAgent);
}

var select = function(selector) {
  return d.querySelector(selector);
};


var selectAll = function(selector) {
  var items = {},
    results = [],
    length = 0,
    i = 0;

  // Doesn"t work on IE lt 8 and BlackBerry browsers
  results = Array.prototype.slice.call(d.querySelectorAll(selector));
  length = results.length;

  // add results to item Obj
  for (; i < length;) {
    items[i] = results[i];
    i++;
  }

  // some additional prooperties to make it look like an array
  items.each = function(callback) {
    var i = 0;
    for (; i < length;) {
      callback.call(items[i]);
      i++;
    }
  };
  return items;
};

// Load a script
function loadScript(src, done) {
  var js = d.createElement("script");
  js.src = src;
  js.onload = function() {
    return done();
  };
  js.onerror = function() {
    return done(new Error("Unable to load script"));
  };
  d.head.appendChild(js);

}

function scrollTopValue(hash) {
  return w.scrollTo({
    top: hash,
    left: 0,
    behavior: "smooth"
  });
}

// easing
// function easeInOutQuart(t, b, c, d) {
//   if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
//   return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
// };


// CHECK IF A MICROSOFT BROWSER OR IF HAS scrollTo method TO LOAD POLYFILL
if (!w.scrollTo || !w.scroll || !w.scrollBy || isMicrosoftBrowser(w.navigator.userAgent)) {
  w.__forceSmoothScrollPolyfill__ = true;
  console.time("some features may not be available, loading polyfill...");
  loadScript("assets/js/polyfill.js", function() {
    console.timeEnd("polyfill loaded successfully.");
  });
}


// NAVBAR ANIMATION
var navbarToggle = select(".navbar-toggle");
var navbar = d.getElementById("navbar");
navbarToggle.onclick = function() {
  if (navbar.classList.contains("collapse")) {
    navbar.classList.toggle("in");
  }
  navbar.onclick = function(e) {
    navbar.classList.toggle("in");
    return false;
  };
};


// SCROLL DIVs BACKGROUNDS
var scrollBgs = selectAll("div.scroll-bg");
scrollBgs.each(function() {
  this.style.backgroundImage = "url(\"" + this.getAttribute("data-src") + "\")";
});

// back_to_top
var back_to_top = select("a.cd-top");
(function() {
  // menu-link-active
  var sections = [];
  var i = 0;
  selectAll("section[id]").each(function() {
    sections.push({index: ++i, id: this.id, hash: this.offsetTop - 360});
  });
  sections.push({index: ++i, id: "window", hash: d.documentElement.offsetHeight});

  w.onscroll = function() {
    // toTop stuffs
    w.pageYOffset > 300 ? back_to_top.classList.add("cd-is-visible") : back_to_top.classList.remove("cd-is-visible");
    w.pageYOffset > 1200 ? back_to_top.classList.add("cd-fade-out") : back_to_top.classList.remove("cd-fade-out");

    var scrollPosition = d.documentElement.scrollTop || d.body.scrollTop;
    var length = sections.length;
    for (var i = 0; i < length; i++) {
      var elt = sections[i];
      var nextIndexInArray = elt.index < 6 ? elt.index : 6;
      var condition = scrollPosition > elt.hash && scrollPosition < sections[nextIndexInArray].hash;
      var menuElt = select("a[href=\"#" + elt.id + "\"]");
      var parent = (elt.index !== 6) ? menuElt.parentElement : false;
      if (condition) {
        if (!parent.classList.contains("active")) {
          parent.setAttribute("class", "active");
        }
      } else if (parent) {
        (parent.classList.contains("active")) ? parent.setAttribute("class", " ") : false;
      }
    }
  };
})();

selectAll("a[href^='#'']").each(function() {
  var scrollToElementID = this.getAttribute("href").slice(1);
  var elementCoordsY = d.getElementById(scrollToElementID).offsetTop - 120;
  this.onclick = function(e) {
    e.preventDefault();
    return scrollTopValue(elementCoordsY);
  };
});

// type JS
var text;
var headerHeading = d.querySelector("#header h1");
var headingText = headerHeading.textContent;
var iteration = 1;
(function type() {
  text = headingText;
  text = text.slice(0, ++iteration);
  headerHeading.textContent = text;
  if (text === headingText) {
    console.log(iteration);
    return clearTimeout(timer);
  }
  var timer = setTimeout(type, 90);
}());
