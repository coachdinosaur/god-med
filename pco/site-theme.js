/* Use the reviewer's existing 'pco.theme' preference on all subpages.
 * The main reviewer keeps its own established theme controller; this module
 * is only loaded by Accreditation and Regulatory Updates. */
const KEY = "pco.theme";
const toggle = document.getElementById("themeToggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
let current = "light";
try {
  current = localStorage.getItem(KEY) === "dark" ? "dark" : "light";
} catch { /* Storage might be disabled */ }

function applyTheme() {
  const dark = current === "dark";
  document.documentElement.dataset.theme = current;
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(dark));
    toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    toggle.title = dark ? "Switch to light mode" : "Switch to dark mode";
  }
  if (themeColor) themeColor.content = dark ? "#121d19" : "#f7f9f6";
}
applyTheme();
toggle?.addEventListener("click", () => {
  current = current === "dark" ? "light" : "dark";
  applyTheme();
  try { localStorage.setItem(KEY, current); } catch { /* Optional persistence */ }
});
