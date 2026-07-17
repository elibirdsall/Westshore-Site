// Westshore Land Sales — static site scripts

// Contact form: submit to Formspree via fetch (AJAX) so the page never
// reloads; falls back to a normal POST if JS is unavailable.
(function () {
  var form = document.getElementById("demo-form");
  if (!form) return;
  var success = document.getElementById("demo-success");
  var error = document.getElementById("demo-error");
  var submitBtn = form.querySelector('button[type="submit"]');
  var submitLabel = submitBtn ? submitBtn.textContent : "";

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (error) {
      error.style.display = "none";
      error.textContent = "";
    }
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
    }

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then(function (response) {
        if (response.ok) {
          form.style.display = "none";
          if (success) success.style.display = "grid";
          return;
        }
        return response.json().then(function (data) {
          var message =
            data && data.errors && data.errors.length
              ? data.errors.map(function (err) { return err.message; }).join(", ")
              : "Something went wrong. Please try again or call us directly.";
          throw new Error(message);
        });
      })
      .catch(function (err) {
        if (error) {
          error.textContent =
            (err && err.message) ||
            "Sorry, we couldn't send your request. Please try again or call us directly.";
          error.style.display = "block";
        }
      })
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitLabel;
        }
      });
  });
})();

// Gallery lightbox: click a tile to enlarge; X / Esc / backdrop to close;
// arrows (buttons or keyboard) to move between photos.
(function () {
  var tiles = Array.prototype.slice.call(
    document.querySelectorAll("[data-lightbox]")
  );
  var box = document.getElementById("lightbox");
  if (!tiles.length || !box) return;

  var imgEl = box.querySelector(".lightbox-img");
  var capEl = box.querySelector(".lightbox-cap");
  var countEl = box.querySelector(".lightbox-count");
  var items = tiles.map(function (t) {
    return { src: t.getAttribute("data-full"), alt: t.getAttribute("data-alt") || "" };
  });
  var i = 0;
  var lastFocus = null;

  function show(n) {
    i = (n + items.length) % items.length;
    imgEl.src = items[i].src;
    imgEl.alt = items[i].alt;
    if (capEl) capEl.textContent = items[i].alt;
    if (countEl) countEl.textContent = (i + 1) + " / " + items.length;
  }
  function open(n) {
    lastFocus = document.activeElement;
    show(n);
    box.classList.add("open");
    box.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var closeBtn = box.querySelector(".lightbox-close");
    if (closeBtn) closeBtn.focus();
  }
  function close() {
    box.classList.remove("open");
    box.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    imgEl.src = "";
    if (lastFocus) lastFocus.focus();
  }

  tiles.forEach(function (t, n) {
    t.addEventListener("click", function () { open(n); });
  });
  box.addEventListener("click", function (e) {
    var act = e.target.getAttribute && e.target.getAttribute("data-action");
    if (act === "close" || e.target === box || e.target.classList.contains("lightbox-stage")) close();
    else if (act === "prev") show(i - 1);
    else if (act === "next") show(i + 1);
  });
  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(i - 1);
    else if (e.key === "ArrowRight") show(i + 1);
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
