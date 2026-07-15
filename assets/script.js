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
