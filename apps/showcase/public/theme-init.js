(function () {
  var stored = localStorage.getItem("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = stored === "dark" || stored === "light" ? stored : (prefersDark ? "dark" : "light");
  if (theme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
} else {
  document.documentElement.removeAttribute("data-theme");
}
})();
