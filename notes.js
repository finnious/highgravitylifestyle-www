(function () {
  var bar = document.querySelector(".reading-progress span");
  if (bar) {
    var track = bar.parentNode;
    var tick = function () {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var amount = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      bar.style.transform = "scaleX(" + amount + ")";
      if (track && track.getAttribute("aria-hidden") !== "true") {
        track.setAttribute("aria-valuenow", String(Math.round(amount * 100)));
      }
    };
    tick();
    document.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", tick);
  }

  var pager = document.querySelector(".note-pager");
  if (pager) {
    document.addEventListener("keydown", function (event) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        return;
      }
      var tag = event.target && event.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON") {
        return;
      }
      var link = null;
      if (event.key === "ArrowLeft") {
        link = pager.querySelector("a.note-pager-prev");
      } else if (event.key === "ArrowRight") {
        link = pager.querySelector("a.note-pager-next");
      }
      if (!link) {
        return;
      }
      event.preventDefault();
      window.location.href = link.href;
    });
  }

  var filters = document.querySelector(".note-filters");
  if (!filters) {
    return;
  }

  var items = Array.prototype.slice.call(document.querySelectorAll(".notes-index li"));
  var empty = document.querySelector(".note-empty");
  var year = "all";
  var theme = "all";
  var review = "all";

  function tokenMatch(raw, value) {
    if (!raw) {
      return false;
    }
    return raw.split(/\s+/).indexOf(value) !== -1;
  }

  function apply() {
    var shown = 0;
    var last = null;
    items.forEach(function (item) {
      item.classList.remove("is-last-visible");
      var yearOk = year === "all" || tokenMatch(item.getAttribute("data-year"), year);
      var themeOk = theme === "all" || tokenMatch(item.getAttribute("data-theme"), theme);
      var reviewOk = review === "all" || tokenMatch(item.getAttribute("data-review"), review);
      var visible = yearOk && themeOk && reviewOk;
      item.hidden = !visible;
      if (visible) {
        shown += 1;
        last = item;
      }
    });
    if (last) {
      last.classList.add("is-last-visible");
    }
    if (empty) {
      empty.hidden = shown !== 0;
    }
  }

  filters.addEventListener("click", function (event) {
    var button = event.target.closest("button");
    if (!button || !filters.contains(button)) {
      return;
    }
    var group = button.getAttribute("data-group");
    var value = button.getAttribute("data-value");
    if (group === "year") {
      year = value;
    } else if (group === "theme") {
      theme = value;
    } else if (group === "review") {
      review = value;
    } else {
      return;
    }
    Array.prototype.forEach.call(filters.querySelectorAll('button[data-group="' + group + '"]'), function (peer) {
      peer.setAttribute("aria-pressed", peer === button ? "true" : "false");
    });
    apply();
  });

  apply();
})();
