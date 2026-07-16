// Westshore Land Sales — static site scripts

// Demo contact form: fake a submit and show the success panel.
// Replace with a real endpoint (Formspree, Basin, Netlify Forms, or your own
// handler) when the client is ready. See README.
(function () {
  var form = document.getElementById("demo-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var success = document.getElementById("demo-success");
    form.style.display = "none";
    if (success) success.style.display = "grid";
  });
})();

// Optional: mobile nav toggle (progressive enhancement).
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();
