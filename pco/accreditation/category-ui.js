import { assessCategoryB } from "./category-classifier.js";

const $ = (id) => document.getElementById(id);
const form = $("categoryForm");
const resultBox = $("categoryResult");
const btnUse = $("categoryUse");
let lastAssessment = null;

function clearList(id) { $(id).replaceChildren(); }
function putFindings(id, findings) {
  const target = $(id);
  target.replaceChildren();
  for (const item of findings) {
    const li = document.createElement("li");
    const title = document.createElement("strong");
    title.textContent = item.label;
    const reason = document.createElement("p");
    reason.textContent = item.reason;
    const evidence = document.createElement("small");
    evidence.textContent = "Useful evidence: " + item.evidence;
    li.append(title, reason, evidence);
    target.append(li);
  }
}
function render(assessment) {
  const r = assessment;
  resultBox.hidden = false;
  resultBox.dataset.status = r.status;
  $("categoryResultTitle").textContent = r.title;
  $("categoryResultText").textContent = r.message;
  putFindings("categoryTriggers", r.triggers);
  putFindings("categoryReview", r.review);
  $("categoryTriggersWrap").hidden = !r.triggers.length;
  $("categoryReviewWrap").hidden = !r.review.length;

  // Unknown details are important even when a B criterion is identified.
  const unresolved = [...new Set(r.unknown)];
  $("categoryUnknownWrap").hidden = unresolved.length === 0;
  $("categoryUnknown").textContent = unresolved.length
    ? unresolved.join(" · ") + ". Unknowns do not negate a confirmed Category B criterion."
    : "";

  btnUse.hidden = r.status !== "b-indicated";
  const route = $("route");
  btnUse.textContent = route.value === "owner"
    ? "Switch to standard Category B application →"
    : "Use Category B for my document checklist →";
  resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const answers = Object.fromEntries(new FormData(form).entries());
  const assessment = assessCategoryB(answers);
  lastAssessment = assessment;
  render(assessment);
});
form.addEventListener("reset", () => {
  lastAssessment = null;
  resultBox.hidden = true;
  resultBox.removeAttribute("data-status");
});
btnUse.addEventListener("click", () => {
  if (!lastAssessment || lastAssessment.status !== "b-indicated") return;
  const route = $("route");
  if (route.value === "owner") {
    route.value = "new";
    route.dispatchEvent(new Event("change", { bubbles: true }));
  }
  const category = $("category");
  category.value = "B";
  category.dispatchEvent(new Event("change", { bubbles: true }));
  document.querySelector('[data-view="documents"].viewtab')?.click();
  document.querySelector(".section-nav")?.scrollIntoView({ behavior: "smooth", block: "start" });
});
$("categoryPrint").addEventListener("click", () => {
  if (!lastAssessment) return;
  document.body.classList.add("print-category");
  window.print();
});
window.addEventListener("afterprint", () => document.body.classList.remove("print-category"));
