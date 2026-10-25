import test from "node:test";
import assert from "node:assert/strict";
import {SOURCES, REGIONS, DOCUMENTS, PHASES, AFTER, stepsFor} from "../pco/accreditation/guide-data.js";

const routes=["new","renew","owner","cluster","replace"];
const applicable=(route,region,category="unknown")=>DOCUMENTS.filter(d=>
  d.routes.includes(route)&&(!d.regions||d.regions.includes(region))&&(!d.categories||d.categories.includes(category))
);
test("documents have unique IDs, valid phases and declared routes",()=>{
  assert.equal(new Set(DOCUMENTS.map(d=>d.id)).size,DOCUMENTS.length);
  for(const d of DOCUMENTS){
    assert.ok(d.title&&d.desc&&d.id);
    assert.ok(PHASES.some(p=>p.id===d.phase),d.id+" invalid phase");
    assert.ok(d.routes.every(x=>routes.includes(x)),d.id+" invalid route");
  }
});
test("every route contains critical training, filing and output records",()=>{
  for(const route of routes){
    const docs=applicable(route,"general");
    assert.ok(docs.some(d=>d.id==="application"),route);
    assert.ok(docs.some(d=>d.id==="headTraining"),route);
    assert.ok(docs.some(d=>d.id==="payment"),route);
    assert.ok(docs.some(d=>d.id==="certificate"),route);
    assert.ok(stepsFor(route,"general").length>=7,route);
  }
});
test("new and replacement paths require 40-hour basic PCO training",()=>{
  for(const route of ["new","owner","cluster","replace"]){
    assert.ok(applicable(route,"r1").some(d=>d.id==="basicTraining"));
  }
  assert.ok(applicable("replace","r1").some(d=>d.id==="replacementNotice"));
});
test("owner route requires ownership and solo affidavit but not professional qualification",()=>{
  const docs=applicable("owner","r4a","A");
  assert.ok(docs.some(d=>d.id==="ownership"));
  assert.ok(docs.some(d=>d.id==="ownerAffidavit"));
  assert.ok(!docs.some(d=>d.id==="qualification"));
});
test("renewal path contains prior certificate and compliance evidence",()=>{
  const docs=applicable("renew","r7","B");
  for(const id of ["priorCoa","complianceSummary","smr","cmr","facilityPermits","renewAdvanced","crs"])
    assert.ok(docs.some(d=>d.id===id),id);
  assert.ok(docs.some(d=>d.id==="prc"));
});
test("clustering needs authorization and site-by-site documentation",()=>{
  const docs=applicable("cluster","r7");
  assert.ok(docs.some(d=>d.id==="clusterLetter"));
  assert.ok(docs.some(d=>d.id==="clusterSites"));
  assert.ok(docs.some(d=>d.id==="categorySheetR7"));
});
test("regional supporting files appear only in their selected office",()=>{
  assert.ok(applicable("new","r12").some(d=>d.id==="governmentIdR12"));
  assert.ok(!applicable("new","r1").some(d=>d.id==="governmentIdR12"));
  assert.ok(applicable("new","r4a").some(d=>d.id==="eccCnc"));
  assert.ok(!applicable("new","r7").some(d=>d.id==="eccCnc"));
});
test("sources reference HTTPS resources and regional configuration is complete",()=>{
  for(const s of SOURCES) assert.ok(s.url.startsWith("https://"),s.id);
  for(const key of ["general","r1","r4a","r7","r12"])assert.ok(REGIONS[key].note);
  assert.equal(AFTER.length,6);
});
