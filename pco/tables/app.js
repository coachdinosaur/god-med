import {TABLES,GROUPS,SOURCES,REVIEWED,filterTables,validateTables} from "./data.js";

const $ = id => document.getElementById(id);
const create = (tag,className,text) => {
  const el = document.createElement(tag);
  if(className) el.className=className;
  if(text !== undefined) el.textContent=String(text);
  return el;
};
const state={query:"",group:"all"};
const coverageLabel={full:"Complete table",grouped:"Grouped thresholds",summary:"Study summary",selected:"Selected rows"};
const validation=validateTables();
if(validation.length){
  console.error("Reference table data validation failed",validation);
  $("resultsCount").textContent="Some table records need review. Please use the original DENR sources.";
}
$("tableTotal").textContent=TABLES.length+" regulatory tables · "+TABLES.reduce((n,t)=>n+t.rows.length,0)+" reference rows";

const groups=$("groupSelect");
for(const group of GROUPS){
  const option=document.createElement("option");
  option.value=group;
  option.textContent=group;
  groups.append(option);
}

function makeReferenceTable(item,query){
  const article=create("article","ref-card");
  article.id=item.id;
  article.setAttribute("aria-labelledby",item.id+"-heading");
  const head=create("div","ref-card-head"), info=create("div","ref-heading");
  const meta=create("div","ref-meta");
  meta.append(create("span","ref-tag",item.tag),create("span","ref-coverage",coverageLabel[item.coverage]),create("span","ref-group",item.group));
  const title=create("h3","",item.title);title.id=item.id+"-heading";
  const desc=create("p","ref-intro",item.description);
  info.append(meta,title,desc);
  const source=SOURCES[item.source];
  const anchor=create("a","source-link","Open source PDF ↗");
  anchor.href=source.url;anchor.target="_blank";anchor.rel="noopener noreferrer";
  head.append(info,anchor);article.append(head);
  article.append(create("p","ref-source-meta",source.title+" · "+item.sourcePage));

  const scroll=create("div","table-scroll");
  scroll.tabIndex=0;
  scroll.setAttribute("role","region");
  scroll.setAttribute("aria-label",item.title+" — scroll horizontally for more columns");
  const table=create("table","ref-table"+(item.columns.length>5?" is-wide":""));
  const caption=create("caption","sr-only",item.title);
  const thead=document.createElement("thead"),headRow=document.createElement("tr");
  for(const name of item.columns){
    const cell=create("th","",name);cell.scope="col";headRow.append(cell);
  }
  thead.append(headRow);table.append(caption,thead);
  const tbody=document.createElement("tbody");

  const needle=query.trim().toLocaleLowerCase("en");
  const structural=[item.title,item.tag,item.group,item.description,item.sourcePage,item.topic||""].join(" ").toLocaleLowerCase("en").includes(needle);
  const displayed=needle&&!structural ? item.rows.filter(row=>row.join(" ").toLocaleLowerCase("en").includes(needle)) : item.rows;

  for(const row of displayed){
    const tr=document.createElement("tr");
    for(let i=0;i<row.length;i++){
      const cell=create(i===0?"th":"td","",row[i]);
      if(i===0)cell.scope="row";
      tr.append(cell);
    }
    tbody.append(tr);
  }
  table.append(tbody);scroll.append(table);
  article.append(create("p","scroll-tip","Swipe the table sideways to view additional columns →"));
  article.append(scroll);
  if(displayed.length!==item.rows.length){
    article.append(create("p","ref-row-count",displayed.length+" of "+item.rows.length+" rows match your search; clear search to see the full table."));
  }
  article.append(create("p","ref-note",item.note));
  return article;
}
function render() {
  const items=filterTables(TABLES,state.query,state.group);
  const fragment=document.createDocumentFragment();
  for(const t of items) fragment.append(makeReferenceTable(t,state.query));
  $("tablesList").replaceChildren(fragment);
  $("emptyTables").hidden=items.length>0;
  if(!validation.length) $("resultsCount").textContent=items.length+" of "+TABLES.length+" tables shown";
}
$("tableSearch").addEventListener("input",event=>{state.query=event.target.value;render();});
groups.addEventListener("change",event=>{state.group=event.target.value;render();});
$("tableFilters").addEventListener("reset",event=>{
  event.preventDefault();
  state.query="";state.group="all";$("tableSearch").value="";groups.value="all";render();
});

for(const link of document.querySelectorAll(".quick-grid a")){
  link.addEventListener("click",event=>{
    const id=link.getAttribute("href")?.slice(1);
    if(!TABLES.some(t=>t.id===id))return;
    event.preventDefault();
    if(state.query||state.group!=="all"){
      state.query="";state.group="all";$("tableSearch").value="";groups.value="all";render();
    }
    if(location.hash!=="#"+id)history.pushState(null,"","#"+id);
    document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});
  });
}
render();
const anchor=decodeURIComponent(location.hash.replace(/^#/,""));
if(TABLES.some(t=>t.id===anchor)){
  requestAnimationFrame(()=>document.getElementById(anchor)?.scrollIntoView({block:"start"}));
}
