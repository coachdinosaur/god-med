// Shared mobile reading-size preference for both PCO Studio and its accreditation guide.
const key = "pco.reading-size.v1";
const toggle = document.getElementById("fontSizeToggle");
let preference = "comfortable";
try {
  preference = localStorage.getItem(key) === "large" ? "large" : "comfortable";
} catch { /* private-browsing storage can be unavailable */ }
function applyReadingSize() {
  const large = preference === "large";
  document.documentElement.dataset.readingSize = preference;
  if (!toggle) return;
  toggle.textContent = large ? "A−" : "A+";
  toggle.setAttribute("aria-pressed", String(large));
  toggle.setAttribute("aria-label", large ? "Return to comfortable text size" : "Increase text size");
  toggle.title = large ? "Comfortable text size" : "Larger text size";
}
applyReadingSize();
toggle?.addEventListener("click", () => {
  preference = preference === "large" ? "comfortable" : "large";
  applyReadingSize();
  try { localStorage.setItem(key, preference); } catch { /* optional persistence */ }
});
