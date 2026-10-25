import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { updates, sources, statusInfo, reviewedOn } from "../pco/regulatory/updates-data.js";
import { filterUpdates, countByStatus, validateUpdates } from "../pco/regulatory/filter.js";

const read = name => readFileSync(new URL("../"+name, import.meta.url), "utf8");

test("review date is declared and update records validate", () => {
  assert.equal(reviewedOn,"2026-10-25");
  assert.deepEqual(validateUpdates(updates,sources,statusInfo),[]);
  assert.equal(new Set(updates.map(x=>x.id)).size,updates.length);
});
test("tracker separates binding baseline, signed issuances, drafts and bills", () => {
  const c=countByStatus(updates);
  assert.equal(c.all,updates.length);
  assert.ok(c.issued>=4);
  assert.ok(c.draft>=1);
  assert.ok(c.legislation>=1);
  assert.ok(c.baseline>=2);
  assert.equal(updates.find(x=>x.id==="hazwaste-draft").status,"draft");
  assert.equal(updates.find(x=>x.id==="dao2013-22").status,"baseline");
  assert.equal(updates.find(x=>x.id==="hb6683").status,"legislation");
});
test("issued entries include PICCS and chemical control orders", () => {
  for (const id of ["dao2025-09","dao2026-24","dao2026-28","dao2026-29"]) {
    assert.equal(updates.find(x=>x.id===id)?.status,"issued");
  }
});
test("filters include matching legal statuses only", () => {
  assert.ok(filterUpdates(updates,{status:"issued"}).every(x=>x.status==="issued"));
  assert.deepEqual(filterUpdates(updates,{status:"draft"}).map(x=>x.id),["hazwaste-draft"]);
  assert.ok(filterUpdates(updates,{status:"legislation"}).every(x=>x.status==="legislation"));
});
test("topic, search and combined filters work and ignore casing", () => {
  assert.deepEqual(filterUpdates(updates,{query:"Benzene"}).map(x=>x.id),["dao2026-29"]);
  assert.ok(filterUpdates(updates,{topic:"Chemical inventory"}).every(x=>x.topic==="Chemical inventory"));
  assert.deepEqual(filterUpdates(updates,{query:"PICCS",status:"issued",topic:"Chemical inventory"}).map(x=>x.id).sort(),["dao2025-09","dao2026-24"].sort());
  assert.equal(filterUpdates(updates,{query:"a-phrase-not-in-any-entry"}).length,0);
});
test("nothing treats the draft hazardous waste revision as final", () => {
  const r=updates.find(x=>x.id==="hazwaste-draft");
  assert.match(r.summary,/not the same as a signed and effective/i);
  assert.match(r.note,/No final superseding DAO was verified/);
  assert.match(r.action,/DAO 2013-22/);
  assert.match(updates.find(x=>x.id==="hb6683").summary,/RA 8749/);
  assert.match(updates.find(x=>x.id==="hb6683").why,/NOT an enacted amendment to RA 6969/);
});
test("issued CCOs describe separate effectivity and registration checks", () => {
  for (const id of ["dao2026-28","dao2026-29"]) {
    const rec=updates.find(x=>x.id===id);
    assert.match(rec.note,/effectivity|operative date/i);
    assert.match(rec.action,/registration|CCO/i);
  }
});
test("all source links are HTTPS and traceable by identifier", () => {
  for (const src of sources) assert.match(src.url,/^https:\/\//);
  for (const item of updates) for (const id of item.sourceIds) assert.ok(sources.some(x=>x.id===id),id);
});
test("regulatory page IDs and scripts exist", () => {
  const html=read("pco/regulatory/index.html");
  for(const id of ["reviewDate","statusFilters","updateSearch","topicSelect","updatesList","emptyMessage","resultsCount","sourcesList","fontSizeToggle"]) assert.ok(html.includes('id="'+id+'"'),id);
  for(const src of ["app.js","style.css"]) assert.ok(html.includes(src));
  const css=read("pco/regulatory/style.css");
  assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
  assert.ok(css.includes("max-width:650px"));
});
test("app links tracker and offline cache precaches all dependencies", () => {
  const main=read("pco/index.html"), accreditation=read("pco/accreditation/index.html"), worker=read("sw.js");
  assert.ok(main.includes('href="regulatory/"'));
  assert.ok(accreditation.includes('href="../regulatory/"'));
  for(const asset of ["pco/regulatory/","pco/regulatory/index.html","pco/regulatory/style.css","pco/regulatory/updates-data.js","pco/regulatory/filter.js","pco/regulatory/app.js"]) assert.ok(worker.includes('"'+asset+'"'),asset);
  assert.match(worker,/const VERSION = "godmed-v14"/);
});
