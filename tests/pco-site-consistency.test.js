import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const read = file => readFileSync(new URL("../"+file,import.meta.url),"utf8");
const pages = [
  { key:"study",file:"pco/index.html",main:["./","accreditation/","regulatory/"] },
  { key:"accreditation",file:"pco/accreditation/index.html",main:["../","./","../regulatory/"] },
  { key:"regulatory",file:"pco/regulatory/index.html",main:["../","../accreditation/","./"] }
];
function navLinks(html,className) {
  const match=html.match(new RegExp('<nav class="'+className+'"[^>]*>([\\s\\S]*?)<\\/nav>'));
  assert.ok(match,"Missing "+className);
  return {
    hrefs:[...match[1].matchAll(/href="([^"]+)"/g)].map(m=>m[1]),
    actives:(match[1].match(/aria-current="page"/g)||[]).length
  };
}
test("all pages have identical global section order and matching routes",()=>{
  for(const page of pages){
    const html=read(page.file);
    const top=navLinks(html,"pco-top-nav"),bottom=navLinks(html,"pco-bottom-nav");
    assert.deepEqual(top.hrefs,page.main,page.file+" desktop navigation");
    assert.deepEqual(bottom.hrefs,page.main,page.file+" mobile navigation");
    assert.equal(top.actives,1);
    assert.equal(bottom.actives,1);
    assert.match(html,new RegExp('class="pco-app pco-'+page.key+'"'));
    assert.ok(html.includes("site-shell.css"),page.file+" lacks shared style");
  }
});
test("header has one consistent logo, A+ and theme toggle on each page",()=>{
  for(const {file} of pages){
    const html=read(file);
    for(const id of ["fontSizeToggle","themeToggle"]){
      assert.equal((html.match(new RegExp('id="'+id+'"','g'))||[]).length,1,file+" "+id);
    }
    assert.equal((html.match(/class="pco-header-brand"/g)||[]).length,1);
    const ids=[...html.matchAll(/\\bid="([^"]+)"/g)].map(m=>m[1]);
    assert.equal(new Set(ids).size,ids.length,file+" duplicate IDs");
  }
});
test("all study modes remain available on phones without adding routes",()=>{
  const html=read("pco/index.html");
  const modes=[...html.matchAll(/class="mobile-tab pco-study-tab[^"]*" data-go="([^"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(modes,["Dashboard","Notes","Cards","Quiz","Interview"]);
  assert.ok(read("pco/pco.js").includes('document.querySelectorAll(".mobile-tab")'));
  for(const id of ["viewDashboard","viewNotes","viewCards","viewQuiz","viewInterview"]) assert.ok(html.includes('id="'+id+'"'));
});
test("existing accreditation and regulatory workflows remain mounted",()=>{
  const guide=read("pco/accreditation/index.html");
  const rules=read("pco/regulatory/index.html");
  for(const id of ["panelJourney","panelDocuments","panelAfter","panelSources","panelCategory","categoryForm"]) assert.ok(guide.includes('id="'+id+'"'));
  for(const id of ["updatesList","statusFilters","updateSearch","topicSelect","sourcesList"]) assert.ok(rules.includes('id="'+id+'"'));
});
test("cross-page colors, mobile touch navigation and reading sizes are shared",()=>{
  const css=read("pco/site-shell.css");
  for(const token of ["--bg","--panel","--surface","--text","--ink","--muted","--green","--line","--accent-soft"]) assert.ok(css.includes(token));
  assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length);
  assert.match(css,/:root\[data-theme="dark"\]/);
  assert.match(css,/:root\[data-reading-size="large"\]/);
  assert.match(css,/max-width:800px/);
  assert.match(css,/\.pco-bottom-nav/);
  assert.match(css,/\.pco-study-tabs/);
  assert.match(css,/\.pco-regulatory \.entry-summary/);
});
function fakeTheme(start="light",storageBlocked=false){
  const records=new Map([["pco.theme",start]]);
  const callbacks={},attrs={};
  const button={setAttribute(k,v){attrs[k]=v;},addEventListener(type,fn){callbacks[type]=fn;}};
  const meta={content:""};
  const doc={documentElement:{dataset:{}},getElementById(id){assert.equal(id,"themeToggle");return button;},querySelector(q){assert.equal(q,'meta[name="theme-color"]');return meta;}};
  const storage={getItem(k){if(storageBlocked)throw Error("unavailable");return records.get(k);},setItem(k,v){if(storageBlocked)throw Error("unavailable");records.set(k,v);}};
  new Function("document","localStorage",read("pco/site-theme.js"))(doc,storage);
  return {doc,meta,button,callbacks,attrs,records};
}
test("the same saved theme is restored and toggled from either subpage",()=>{
  const state=fakeTheme("dark");
  assert.equal(state.doc.documentElement.dataset.theme,"dark");
  assert.equal(state.attrs["aria-pressed"],"true");
  assert.equal(state.attrs["aria-label"],"Switch to light mode");
  state.callbacks.click();
  assert.equal(state.doc.documentElement.dataset.theme,"light");
  assert.equal(state.records.get("pco.theme"),"light");
  assert.equal(state.attrs["aria-pressed"],"false");
  assert.equal(state.meta.content,"#f7f9f6");
});
test("theme controls still work if browser storage is unavailable",()=>{
  const state=fakeTheme("dark",true);
  assert.equal(state.doc.documentElement.dataset.theme,"light");
  assert.doesNotThrow(()=>state.callbacks.click());
  assert.equal(state.doc.documentElement.dataset.theme,"dark");
});
test("offline cache includes every new shared resource and bumps version",()=>{
  const worker=read("sw.js");
  assert.match(worker,/const VERSION = "godmed-v13"/);
  for(const path of ["pco/site-shell.css","pco/site-theme.js","pco/text-size.js","pco/regulatory/index.html","pco/accreditation/index.html"]) assert.ok(worker.includes('"'+path+'"'));
});
