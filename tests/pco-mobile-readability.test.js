import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = (file) => readFileSync(new URL("../" + file, import.meta.url), "utf8");
const reviewer = read("pco/index.html");
const guide = read("pco/accreditation/index.html");
const style = read("pco/readability.css");
const js = read("pco/text-size.js");
const worker = read("sw.js");

function launch(initial = null, unavailable = false) {
  const events = {};
  const attrs = {};
  const values = new Map(initial == null ? [] : [["pco.reading-size.v1", initial]]);
  const root = { dataset: {} };
  const button = {
    textContent: "", title: "",
    setAttribute(name, value) { attrs[name] = value; },
    addEventListener(name, fn) { events[name] = fn; }
  };
  const doc = { documentElement: root, getElementById(id) {
    assert.equal(id, "fontSizeToggle");
    return button;
  }};
  const storage = {
    getItem(name) { if (unavailable) throw new Error("blocked"); return values.get(name); },
    setItem(name, value) { if (unavailable) throw new Error("blocked"); values.set(name, value); }
  };
  new Function("document", "localStorage", js)(doc, storage);
  return { button, attrs, events, root, values };
}
test("both PCO pages include a shared reading control and stylesheet", () => {
  assert.match(reviewer, /id="fontSizeToggle"/);
  assert.match(reviewer, /href="readability.css"/);
  assert.match(reviewer, /src="text-size.js"/);
  assert.match(guide, /id="fontSizeToggle"/);
  assert.match(guide, /href="\.\.\/readability.css"/);
  assert.match(guide, /src="\.\.\/text-size.js"/);
});
test("A+ starts at comfortable readable default, enlarges, and resets", () => {
  const s = launch();
  assert.equal(s.root.dataset.readingSize, "comfortable");
  assert.equal(s.button.textContent, "A+");
  assert.equal(s.attrs["aria-pressed"], "false");
  s.events.click();
  assert.equal(s.root.dataset.readingSize, "large");
  assert.equal(s.button.textContent, "A−");
  assert.equal(s.attrs["aria-pressed"], "true");
  assert.equal(s.values.get("pco.reading-size.v1"), "large");
  s.events.click();
  assert.equal(s.root.dataset.readingSize, "comfortable");
  assert.equal(s.values.get("pco.reading-size.v1"), "comfortable");
});
test("stored large preference applies automatically across pages", () => {
  const s = launch("large");
  assert.equal(s.root.dataset.readingSize, "large");
  assert.equal(s.attrs["aria-label"], "Return to comfortable text size");
});
test("blocked localStorage does not stop the font-size toggle", () => {
  const s = launch(null, true);
  assert.doesNotThrow(() => s.events.click());
  assert.equal(s.root.dataset.readingSize, "large");
});
test("mobile typography covers key learning and accreditation components", () => {
  assert.match(style, /max-width:800px/);
  for (const selector of [
    ".app-shell .page-intro", ".app-shell .mode-desc",
    ".app-shell .card-text", ".app-shell .choice",
    ".app-shell .iv-prompt", ".layout .doc-title",
    ".layout .step-body li", ".layout .cat-fieldset input",
    ".layout .cat-result p"
  ]) assert.ok(style.includes(selector), "Missing readability rule " + selector);
  assert.match(style, /data-reading-size="large"/);
  assert.equal((style.match(/{/g) || []).length, (style.match(/}/g) || []).length);
});
test("updated app shell assets are precached with bumped version", () => {
  assert.match(worker, /const VERSION = "godmed-v14"/);
  assert.ok(worker.includes('"pco/readability.css"'));
  assert.ok(worker.includes('"pco/text-size.js"'));
});
