/* i2 Leadership — site.js */
(function () {
  document.documentElement.classList.add("js");

  /* Booking link: set the Calendly URL once, here. Every element with
     [data-booking] picks it up (they also carry the same href statically). */
  var BOOKING_URL = "https://calendly.com/i2leadership";
  document.querySelectorAll("[data-booking]").forEach(function (a) {
    a.href = BOOKING_URL;
  });

  /* Mobile nav toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Services submenu: make the caret usable on touch without hover */
  document.querySelectorAll(".has-menu > a").forEach(function (link) {
    link.addEventListener("touchend", function (e) {
      var item = link.parentElement;
      if (!item.classList.contains("is-open")) {
        e.preventDefault();
        item.classList.add("is-open");
        link.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* Reveal on scroll — transform + opacity only, ease-out */
  var revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealed.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Testimonial rotators: one centered quote at a time, click through.
     Without JS all quotes stay visible (no .is-ready). */
  document.querySelectorAll("[data-rotator]").forEach(function (rot) {
    var quotes = Array.prototype.slice.call(rot.querySelectorAll(".quote"));
    if (quotes.length < 2) return;
    var count = rot.querySelector(".rotator-count");
    var i = 0;
    function show(n) {
      i = (n + quotes.length) % quotes.length;
      quotes.forEach(function (q, k) { q.classList.toggle("is-active", k === i); });
      if (count) count.textContent = (i + 1) + " / " + quotes.length;
    }
    rot.querySelector("[data-prev]").addEventListener("click", function () { show(i - 1); });
    rot.querySelector("[data-next]").addEventListener("click", function () { show(i + 1); });
    rot.classList.add("is-ready");
    show(0);
  });

  /* Footer year */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
