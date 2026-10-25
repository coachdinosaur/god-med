import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {TABLES,SOURCES,GROUPS,filterTables,validateTables} from "../pco/tables/data.js";

const read=path=>readFileSync(new URL("../"+path,import.meta.url),"utf8");
const get=id=>TABLES.find(t=>t.id===id);

test("All regulatory tables have valid source links, unique IDs and correctly sized rows",()=>{
  assert.deepEqual(validateTables(),[]);
  assert.equal(new Set(TABLES.map(t=>t.id)).size,TABLES.length);
  assert.ok(TABLES.length>=13);
  assert.equal(GROUPS.length,4);
  for(const s of Object.values(SOURCES)) assert.match(s.url,/^https:\/\//);
});
test("DAO 2014-02 Table 1 has all environmental factors",()=>{
  const t=get("pco-table1");
  assert.equal(t.columns.length,3);
  assert.equal(t.rows.length,6);
  for(const keyword of ["Chemicals","Hazardous waste","Air emissions","Solid waste","Wastewater","Sludge"])assert.ok(t.rows.some(r=>r[0]===keyword));
  assert.match(t.rows.find(r=>r[0]==="Wastewater")[2],/≥30/);
});
test("PCL Annex 1 has 48 listed entries with unique numbered rows and original CAS text",()=>{
  const t=get("pco-annex1");
  assert.equal(t.rows.length,48);
  for(let i=0;i<48;i++)assert.equal(Number(t.rows[i][0]),i+1);
  assert.ok(t.rows.some(r=>r[2]==="BENZENE"&&r[1]==="000071-43-2"));
  assert.ok(t.rows.some(r=>r[2]==="VINYL CHLORIDE"&&r[1]==="000075-01-4"));
  assert.ok(t.note.includes("legacy"));
});
test("DAO 2014-02 Annex 2 and DAO 2013-22 generator quantities are not combined",()=>{
  const pco=get("pco-annex2"),haz=get("haz-table31");
  assert.equal(pco.columns.length,3);
  assert.equal(haz.columns.length,4);
  assert.ok(pco.rows.some(r=>r[1].includes("<36,000")&&r[2].includes("≥36,000")));
  assert.ok(haz.rows.some(r=>r[1].includes("<18,000")&&r[2].includes("18,000–36,000")));
  assert.notEqual(pco.source,haz.source);
});
test("Annex 3 includes eight wastewater quality parameters",()=>{
  const t=get("pco-annex3");
  assert.equal(t.rows.length,8);
  for(const name of ["Arsenic","Mercury (total)","Formaldehyde","PCBs"])assert.ok(t.rows.some(r=>r[1]===name));
});
test("Source-backed effluent limits preserve BOD, COD, TSS and strong-wastewater bands",()=>{
  const ges=get("water-table9"),strong=get("water-table10");
  assert.equal(ges.columns.length,10);
  const bod=ges.rows.find(r=>r[0].startsWith("BOD"));
  assert.equal(bod[4],"50");
  assert.equal(bod[7],"30");
  assert.deepEqual(strong.rows.map(r=>r[1]),["100","200","600","900"]);
  assert.ok(ges.note.includes("SELECTED"));
});
test("Air table retains distinct measurement units and averaging periods",()=>{
  const t=get("air-table1");
  assert.equal(t.rows.length,7);
  const co=t.rows.find(r=>r[0].includes("Carbon monoxide"));
  assert.match(co[1],/mg\/Nm³/);
  const tsp=t.rows.find(r=>r[0].includes("Total suspended"));
  assert.match(tsp[1],/µg\/Nm³/);
});
test("Search works for CAS number, waste code, table number, and grouped law",()=>{
  assert.ok(filterTables(TABLES,"000071-43-2").some(t=>t.id==="pco-annex1"));
  assert.ok(filterTables(TABLES,"A101").some(t=>t.id==="pco-annex2"));
  assert.ok(filterTables(TABLES,"BOD").some(t=>t.id==="water-table9"));
  assert.ok(filterTables(TABLES,"","Clean Air Act").every(t=>t.group==="Clean Air Act"));
  assert.equal(filterTables(TABLES,"this_is_unlikely_to_match_any_table").length,0);
});
test("Reference table page retains semantic tables, responsive scrolling and trusted links",()=>{
  const html=read("pco/tables/index.html"),app=read("pco/tables/app.js"),css=read("pco/tables/style.css");
  for(const id of ["tableSearch","groupSelect","tablesList","resultsCount","tableFilters","emptyTables"])assert.ok(html.includes('id="'+id+'"'));
  for(const keyword of ['create("table"','document.createElement("thead")','document.createElement("tbody")','scope="row"','tabIndex=0'])assert.ok(app.includes(keyword),keyword);
  assert.match(css,/overflow-x:auto/);
  assert.match(css,/position:sticky/);
  assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
  assert.match(app,/rel="noopener noreferrer"/);
});
test("Every top and bottom nav connects to Tables without losing existing routes",()=>{
  const paths=["pco/index.html","pco/accreditation/index.html","pco/regulatory/index.html","pco/tables/index.html"];
  for(const path of paths){
    const html=read(path);
    for(const nav of ["pco-top-nav","pco-bottom-nav"]){
      const section=html.match(new RegExp('<nav class="'+nav+'"[^>]*>([\\s\\S]*?)<\\/nav>'))?.[1];
      assert.ok(section,path+" "+nav);
      assert.equal((section.match(/href=/g)||[]).length,4,path+" "+nav);
    }
  }
  const js=read("pco/pco.js");
  assert.ok(js.includes("NOTE_REFERENCE_TABLES"));
  assert.ok(js.includes('a.href = "tables/#" + reference'));
});
test("Offline cache contains new tables, matching v14 tests and existing app assets",()=>{
  const worker=read("sw.js");
  assert.match(worker,/godmed-v14/);
  for(const asset of ["pco/tables/","pco/tables/index.html","pco/tables/style.css","pco/tables/data.js","pco/tables/pco-data.js","pco/tables/hazard-data.js","pco/tables/water-data.js","pco/tables/air-data.js","pco/tables/app.js","pco/pco.js"])assert.ok(worker.includes('"'+asset+'"'),asset);
});
