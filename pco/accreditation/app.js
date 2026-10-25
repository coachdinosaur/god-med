import { guides, tracks, regions, sources, faq, PORTAL } from "./guide-data.js";

const $ = (id) => document.getElementById(id);
const KEY = "pco.accreditation.v1";
const choices = ["track", "region", "category", "role"];
const base = { track: "new", region: "all", category: "unknown", role: "employee", done: {} };
let state = { ...base };
try {
  const stored = JSON.parse(localStorage.getItem(KEY) || "{}");
  if (stored && typeof stored === "object") {
    for (const key of choices) if (typeof stored[key] === "string") state[key] = stored[key];
    if (stored.done && typeof stored.done === "object" && !Array.isArray(stored.done)) state.done = stored.done;
  }
} catch { /* private browsing or disabled storage */ }
const byId = (list, id) => list.find((item) => item.id === id);
if (!guides[state.track]) state.track = "new";
if (!byId(regions, state.region)) state.region = "all";
if (!["A", "B", "unknown"].includes(state.category)) state.category = "unknown";
if (!["employee", "owner"].includes(state.role)) state.role = "employee";

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* optional persistence */ }
}
function el(tag, attrs = {}, text = "") {
  const item = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === "className") item.className = value;
    else if (key === "type") item.type = value;
    else if (key === "htmlFor") item.htmlFor = value;
    else item.setAttribute(key, String(value));
  }
  if (text) item.textContent = text;
  return item;
}
function docKey(id) { return state.track + ":" + id; }
function isDone(id) { return state.done[docKey(id)] === true; }
function isCore(doc) { return doc.applicability === "standard" || doc.applicability === "action" || doc.applicability === "employee" && state.role === "employee" || doc.applicability === "owner" && state.role === "owner"; }
function visible(doc) {
  if (doc.applicability === "employee") return state.role === "employee";
  if (doc.applicability === "owner") return state.role === "owner";
  if (doc.applicability === "categoryB") return state.category === "B";
  return true;
}
function relevantSteps() {
  return guides[state.track].map((step) => ({...step, items: step.items.filter(visible)}));
}
function docLabel(doc) {
  switch (doc.applicability) {
    case "regional": return ["Check region", "regional"];
    case "conditional": return ["If applicable", "conditional"];
    case "categoryB": return ["Category B · if applicable", "conditional"];
    case "action": return ["Action", "action"];
    default: return [null, null];
  }
}
function refreshCounters() {
  const items = relevantSteps().flatMap((step) => step.items);
  const core = items.filter(isCore);
  const completed = core.filter((doc) => isDone(doc.id)).length;
  const optional = items.filter((doc) => !isCore(doc));
  const optionalDone = optional.filter((doc) => isDone(doc.id)).length;
  const pct = core.length ? Math.round(completed / core.length * 100) : 0;
  $("completeCount").textContent = completed + " / " + core.length;
  $("progressText").textContent = "Core items done · optional files tracked below";
  $("percentDone").textContent = pct + "% core complete · " + optionalDone + " optional items checked";
  $("progressFill").style.width = pct + "%";
  $("completionBar").setAttribute("aria-valuenow", String(pct));
  document.querySelectorAll(".step").forEach((step) => {
    const stepData = relevantSteps().find((x) => x.id === step.dataset.step);
    if (!stepData) return;
    const mandatory = stepData.items.filter(isCore);
    const current = mandatory.filter((doc) => isDone(doc.id)).length;
    const sub = step.querySelector(".step-head small");
    sub.textContent = mandatory.length ? current + "/" + mandatory.length + " core items completed" : "Conditional / supporting items";
  });
}
function renderSteps() {
  const container = $("steps");
  container.replaceChildren();
  const selected = byId(tracks, state.track);
  $("selectedPath").textContent = selected.label + " · Common steps plus regional/conditional documents if applicable";
  for (const [index, step] of relevantSteps().entries()) {
    const card = el("details", { className: "step", "data-step": step.id });
    if (index === 0 || index === 1) card.open = true;
    const summary = el("summary");
    const num = el("span", { className: "step-num" }, step.id);
    const heading = el("span", { className: "step-head" });
    heading.append(el("strong", {}, step.title), el("small", {}, "Documents and actions"));
    summary.append(num, heading);
    card.append(summary, el("p", { className: "step-desc" }, step.detail));
    const list = el("div", { className: "doc-list" });
    for (const doc of step.items) {
      const checked = isDone(doc.id);
      const row = el("label", { className: "doc" + (checked ? " is-done" : "") });
      const input = el("input", { type: "checkbox", "data-doc": doc.id, "aria-label": "Completed: " + doc.title });
      input.checked = checked;
      const body = el("span", { className: "doc-body" });
      const heading = el("span", { className: "doc-title" }, doc.title);
      const [word, badge] = docLabel(doc);
      if (word) heading.append(el("span", { className: "doc-tag" + (badge === "action" ? "" : " " + badge) }, word));
      body.append(heading, el("span", { className: "doc-detail" }, doc.detail));
      row.append(input, body);
      list.append(row);
    }
    card.append(list);
    container.append(card);
  }
  refreshCounters();
}
function updateRegion() {
  const region = byId(regions, state.region) || regions[0];
  $("regionTitle").textContent = region.label;
  $("regionNote").textContent = region.note;
  $("regionLink").href = region.url;
}
for (const region of regions) $("region").append(el("option", { value: region.id }, region.label));
for (const id of choices) {
  $(id).value = state[id];
  $(id).addEventListener("change", () => {
    state[id] = $(id).value;
    if (id === "role" && state.role === "owner" && state.category === "B") {
      state.category = "A";
      $("category").value = "A";
    }
    if (id === "category" && state.category === "B" && state.role === "owner") {
      state.role = "employee";
      $("role").value = "employee";
    }
    save();
    updateRegion();
    renderSteps();
  });
}
$("steps").addEventListener("change", (event) => {
  const box = event.target;
  if (!(box instanceof HTMLInputElement) || !box.matches("[data-doc]")) return;
  const id = box.dataset.doc;
  if (box.checked) state.done[docKey(id)] = true;
  else delete state.done[docKey(id)];
  box.closest(".doc").classList.toggle("is-done", box.checked);
  save();
  refreshCounters();
});
$("reset").addEventListener("click", () => {
  if (!window.confirm("Clear all checked items for the selected " + state.track + " application?")) return;
  for (const step of guides[state.track]) for (const item of step.items) delete state.done[docKey(item.id)];
  save();
  renderSteps();
});
let beforePrint = [];
$("print").addEventListener("click", () => {
  beforePrint = [...document.querySelectorAll(".step")].map((d) => d.open);
  document.querySelectorAll(".step").forEach((d) => { d.open = true; });
  window.print();
});
window.addEventListener("afterprint", () => document.querySelectorAll(".step").forEach((d, i) => { d.open = beforePrint[i] ?? true; }));
for (const src of sources) {
  const link = el("a", { href: src.url, target: "_blank", rel: "noopener noreferrer" });
  link.append(el("strong", {}, src.title), el("p", {}, src.note), el("span", { className: "open" }, "Open official source ↗"));
  $("resourceList").append(link);
}
for (const entry of faq) {
  const item = el("details");
  item.append(el("summary", {}, entry.q), el("p", {}, entry.a));
  $("faqList").append(item);
}
updateRegion();
renderSteps();
