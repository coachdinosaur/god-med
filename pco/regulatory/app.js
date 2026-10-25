import { updates, sources, statusInfo, reviewedOn } from "./updates-data.js";
import { filterUpdates, countByStatus, validateUpdates } from "./filter.js";

const $ = (id) => document.getElementById(id);
const state = { status: "all", topic: "all", query: "" };
const validation = validateUpdates(updates, sources, statusInfo);
if (validation.length) console.error("Regulatory tracker data validation:", validation);

const create = (tag, className, value) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (value !== undefined) element.textContent = String(value);
  return element;
};
const link = (label, url, className = "") => {
  const element = create("a", className, label);
  element.href = url;
  element.target = "_blank";
  element.rel = "noopener noreferrer";
  return element;
};
const prettyDate = (date) => {
  const parsed = new Date(date+"T00:00:00+08:00");
  return new Intl.DateTimeFormat("en-PH", { day:"numeric", month:"long", year:"numeric", timeZone:"Asia/Manila" }).format(parsed);
};
$("reviewDate").textContent = prettyDate(reviewedOn);

function makeEntry(item) {
  const article = create("article", "update-card");
  article.id = item.id;
  article.dataset.status = item.status;
  const head = create("div", "entry-head");
  const meta = create("div", "entry-meta");
  const mark = create("span", "entry-status "+item.status, statusInfo[item.status].label);
  meta.append(mark, create("span", "entry-date", item.period));
  head.append(meta, create("span", "entry-topic", item.topic));
  article.append(head);

  const code = create("div", "entry-code", item.code);
  const title = create("h3", "entry-title", item.title);
  const summary = create("p", "entry-summary", item.summary);
  article.append(code,title,summary);

  const details = create("details", "entry-details");
  const opener = create("summary", "", "Why it matters, what to do and sources");
  const body = create("div", "entry-body");
  body.append(create("h4", "", "Why it matters"),create("p", "", item.why));
  body.append(create("h4", "", "What a PCO should check"),create("p", "", item.action));
  const caveat = create("p", "entry-note", item.note);
  body.append(caveat);
  const sourceHeading = create("h4", "", "Original sources");
  const ul = create("ul", "entry-sources");
  for (const id of item.sourceIds) {
    const source = sources.find(x => x.id === id);
    if (!source) continue;
    const li = document.createElement("li");
    li.append(link(source.title+" ↗",source.url));
    ul.append(li);
  }
  body.append(sourceHeading,ul);
  details.append(opener,body);
  article.append(details);
  return article;
}
const sourceFragment = document.createDocumentFragment();
for (const source of sources) {
  const tile = link("", source.url, "source-card");
  tile.append(create("strong", "", source.title),create("span", "", source.publisher+" · Open reference ↗"));
  sourceFragment.append(tile);
}
$("sourcesList").append(sourceFragment);

const counts = countByStatus(updates);
document.querySelectorAll("#statusFilters button").forEach((button) => {
  const status = button.dataset.status;
  const suffix = counts[status] ? " ("+counts[status]+")" : "";
  button.textContent += suffix;
  button.addEventListener("click", () => {
    state.status = status;
    for (const b of document.querySelectorAll("#statusFilters button")) {
      const selected = b.dataset.status === status;
      b.classList.toggle("is-selected", selected);
      b.setAttribute("aria-pressed", String(selected));
    }
    render();
  });
});
$("updateSearch").addEventListener("input", e => {
  state.query = e.target.value;
  render();
});
$("topicSelect").addEventListener("change", e => {
  state.topic = e.target.value;
  render();
});

function render() {
  const matching = filterUpdates(updates, state);
  const fragment = document.createDocumentFragment();
  matching.forEach(item => fragment.append(makeEntry(item)));
  $("updatesList").replaceChildren(fragment);
  $("emptyMessage").hidden = matching.length > 0;
  $("resultsCount").textContent = matching.length+" of "+updates.length+" verified entries shown";
}
render();

// Deep links allow direct navigation to a particular issuance. If it was hidden
// by a previous filter, reset the selectors instead of presenting an empty view.
const anchor = decodeURIComponent(window.location.hash.replace(/^#/, ""));
if (updates.some(item => item.id === anchor)) {
  requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView({block:"start"}));
}
