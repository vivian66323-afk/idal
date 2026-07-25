// 手機版導覽：點連結後收合選單、Enter/Space 可開合漢堡
(function () {
  var toggle = document.getElementById("nav-toggle");
  if (!toggle) return;
  document.querySelectorAll(".nav ul a").forEach(function (a) {
    a.addEventListener("click", function () { toggle.checked = false; });
  });
  var burger = document.querySelector(".nav-burger");
  if (burger) {
    burger.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle.checked = !toggle.checked; }
    });
  }
})();

// 四大軸／觀點卡片：點擊展開收合
document.querySelectorAll(".pillar").forEach(function (p) {
  p.addEventListener("click", function () {
    var open = p.classList.toggle("open");
    p.setAttribute("aria-expanded", open ? "true" : "false");
    p.querySelector(".more").textContent = open ? "－ 收合" : "＋ 展開";
  });
});

document.querySelectorAll(".insight").forEach(function (n) {
  n.addEventListener("click", function () {
    var open = n.classList.toggle("open");
    n.setAttribute("aria-expanded", open ? "true" : "false");
    n.querySelector(".i-more").textContent = open ? "－ 收合" : "＋ 展開閱讀";
  });
});

// 會員名錄：依服務地區篩選
(function () {
  var btns = document.querySelectorAll(".df-btn");
  if (!btns.length) return;
  var cards = document.querySelectorAll(".directory-grid .member-card");
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      var region = b.dataset.region;
      btns.forEach(function (x) {
        var on = x === b;
        x.classList.toggle("active", on);
        x.setAttribute("aria-pressed", on ? "true" : "false");
      });
      cards.forEach(function (c) {
        var show = region === "all" || c.dataset.region === region;
        c.style.display = show ? "" : "none";
      });
    });
  });
})();

// 進場顯示
var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduced) {
  document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
} else {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
}

// ============================================================
// 進階滾動效果（2026-07 新增・只新增不改動既有；移除本段即復原）
// ============================================================

// ① 卡片/清單「依序」滑入（stagger cascade）
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var groups = document.querySelectorAll(".pillars, .directory-grid, .benefits, .item-list, .insight-list");
  if (!groups.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var kids = e.target.children, i;
      for (i = 0; i < kids.length; i++) {
        (function (el, idx) {
          el.style.transitionDelay = (idx * 0.08) + "s";
          requestAnimationFrame(function () { el.classList.add("stagger-in"); });
        })(kids[i], i);
      }
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  groups.forEach(function (g) {
    var kids = g.children, i;
    for (i = 0; i < kids.length; i++) kids[i].classList.add("stagger-item");
    io.observe(g);
  });
})();

// ② 頂部金色捲動進度線
(function () {
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  function update() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var p = max > 0 ? h.scrollTop / max : 0;
    bar.style.transform = "scaleX(" + p + ")";
  }
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

// ③ Hero logo 隨滑動優雅退場：明顯縮小 + 淡出 + 微上移
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var logo = document.querySelector(".hero .wordmark-img");
  if (!logo) return;
  var ticking = false;
  function apply() {
    var y = window.scrollY || window.pageYOffset || 0;
    var p = Math.min(y / 480, 1);          // 前 480px 內完成
    var scale = 1 - p * 0.22;              // 1 → 0.78（明顯縮小）
    var op = 1 - p * 0.75;                 // 1 → 0.25（明顯淡出）
    logo.style.transform = "translateY(" + (y * 0.12) + "px) scale(" + scale + ")";
    logo.style.opacity = op.toFixed(3);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { requestAnimationFrame(apply); ticking = true; }
  }, { passive: true });
})();
