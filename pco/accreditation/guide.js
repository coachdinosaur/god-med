import {SOURCES,REGIONS,DOCUMENTS,PHASES,AFTER,stepsFor} from "./guide-data.js";

const STORAGE="pco.accreditation.guide.v1";
const $=id=>document.getElementById(id);
const node=(tag,cls,txt)=>{
 const e=document.createElement(tag);
 if(cls)e.className=cls;
 if(txt!==undefined)e.textContent=txt;
 return e;
};
const routes={
 new:"First-time accreditation",
 renew:"Accreditation renewal",
 owner:"Owner as Category A PCO",
 cluster:"Clustered installations",
 replace:"Replacement or new employer"
};
let state={region:"general",route:"new",category:"unknown",done:{}};
try{
 const v=JSON.parse(localStorage.getItem(STORAGE));
 if(v&&typeof v==="object"&&v.done&&typeof v.done==="object"){
  state={...state,...v,done:v.done};
 }
}catch{/* Local storage is optional */}
if(!REGIONS[state.region])state.region="general";
if(!routes[state.route])state.route="new";
if(!["A","B","unknown"].includes(state.category))state.category="unknown";
if(state.route==="owner")state.category="A";

function save(){
 try{localStorage.setItem(STORAGE,JSON.stringify(state));}catch{/* Disabled local storage */}
}
function profile(){return state.region+"|"+state.route+"|"+state.category+"|";}
function selectedDocs(){
 return DOCUMENTS.filter(d=>
  d.routes.includes(state.route) &&
  (!d.regions||d.regions.includes(state.region)) &&
  (!d.categories||d.categories.includes(state.category))
 );
}
function toast(message){
 const box=$("toast");
 box.textContent=message;
 box.hidden=false;
 clearTimeout(toast.handle);
 toast.handle=setTimeout(()=>box.hidden=true,3200);
}
function checkName(d){
 return profile()+d.id;
}
function checked(d){
 return !!state.done[checkName(d)];
}
function stats(){
 const all=selectedDocs();
 const have=all.filter(checked).length;
 const pct=all.length?Math.round(100*have/all.length):0;
 return {all,have,pct};
}
function updateProgress(){
 const s=stats();
 $("progressNumber").textContent=s.have+" / "+s.all.length;
 $("progressFill").style.width=s.pct+"%";
 $("progressBar").setAttribute("aria-valuenow",String(s.pct));
 $("progressDescription").textContent=s.pct===100?
 "Your listed items are marked ready. Verify them against the official EMB checklist before submitting.":
 "Only checklist ticks are stored. This is not an EMB completeness or approval determination.";
}
function setSelectors(){
 $("region").value=state.region;
 $("route").value=state.route;
 $("category").value=state.category;
 $("category").disabled=state.route==="owner";
 let help=routes[state.route]+": ";
 if(state.route==="renew")help+="Existing accredited PCO, renewing at the appropriate EMB office.";
 else if(state.route==="owner")help+="DAO 2014-02 permits a Category A owner/manager exception. Basic eligibility and training still matter.";
 else if(state.route==="cluster")help+="Requires EMB assessment/approval; do not assume one PCO can cover unrelated sites.";
 else if(state.route==="replace")help+="A new/changed-employer filing, plus notice of departure where applicable.";
 else help+="Check your proposed establishment category before preparing the documents.";
 $("selectionHelp").textContent=help;
 $("docNote").textContent=REGIONS[state.region].note;
 updateProgress();
}

function showView(name){
 const valid=["journey","documents","after","sources"];
 if(!valid.includes(name))name="journey";
 for(const v of valid){
  $("panel"+v[0].toUpperCase()+v.slice(1)).hidden=v!==name;
 }
 for(const t of document.querySelectorAll("[data-view]")){
  if(!t.classList.contains("viewtab"))continue;
  const active=t.dataset.view===name;
  t.classList.toggle("active",active);
  if(active)t.setAttribute("aria-current","page");
  else t.removeAttribute("aria-current");
 }
 if(location.hash!=="#"+name)history.replaceState(null,"","#"+name);
}
for(const b of document.querySelectorAll("[data-view]")){
 b.addEventListener("click",()=>{
  showView(b.dataset.view);
  if(b.closest(".next-action"))window.scrollTo({top:0,behavior:"smooth"});
 });
}

function createStep(step,i){
 const details=node("details","step");
 if(i===0)details.open=true;
 const summary=node("summary");
 const number=node("span","step-number",step[0]);
 const meta=node("span","step-meta");
 meta.append(node("strong",null,step[1]),node("small",null,step[2]));
 summary.append(number,meta,node("span","chevron","›"));
 const body=node("div","step-body");
 const list=node("ul");
 for(const point of step[3]){
  list.append(node("li",null,point));
 }
 body.append(list);
 const button=node("button",null,"See the required documents →");
 button.type="button";
 button.addEventListener("click",()=>showView("documents"));
 body.append(button);
 details.append(summary,body);
 return details;
}
function renderJourney(){
 const box=$("journeySteps");
 box.replaceChildren();
 const steps=stepsFor(state.route,state.region);
 for(let i=0;i<steps.length;i++)box.append(createStep(steps[i],i));
 $("journeyIntro").textContent=
  routes[state.route]+". "+steps.length+
  " stages, from preparation to official review and record-keeping. Timelines vary by region and application completeness.";
}
function statusTags(doc){
 const badges=node("span","doc-tags");
 let primary=doc.tag||"Core";
 const a=node("span","tag",primary);
 if(doc.status==="conditional")a.classList.add("conditional");
 if(doc.regions||doc.tag==="Cluster"||doc.tag==="Owner case")a.classList.add("region");
 badges.append(a);
 if(doc.regions){
  badges.append(node("span","tag region",REGIONS[state.region].label));
 }
 return badges;
}
function docRow(doc){
 const label=node("label","doc");
 const input=document.createElement("input");
 input.type="checkbox";
 input.checked=checked(doc);
 input.setAttribute("aria-label",doc.title+" ready");
 const copy=node("span","doc-copy");
 copy.append(node("span","doc-title",doc.title));
 copy.append(node("span","doc-desc",doc.desc));
 copy.append(statusTags(doc));
 label.append(input,copy);
 input.addEventListener("change",()=>{
  if(input.checked)state.done[checkName(doc)]=true;
  else delete state.done[checkName(doc)];
  save();
  updateProgress();
  refreshGroupCounts();
 });
 return label;
}
function refreshGroupCounts(){
 const sections=document.querySelectorAll(".doc-section");
 for(const section of sections){
  const phase=section.dataset.phase;
  const items=selectedDocs().filter(d=>d.phase===phase);
  const counter=section.querySelector("h3 span");
  if(counter)counter.textContent=items.filter(checked).length+" of "+items.length+" prepared";
 }
}
function renderDocs(){
 const box=$("docGroups");
 box.replaceChildren();
 const query=$("docSearch").value.trim().toLowerCase();
 let matched=0;
 for(const phase of PHASES){
  const items=selectedDocs().filter(d=>d.phase===phase);
  const filtered=items.filter(d=>(d.title+" "+d.desc+" "+d.tag).toLowerCase().includes(query));
  if(!filtered.length)continue;
  matched+=filtered.length;
  const section=node("section","doc-section");
  section.dataset.phase=phase.id;
  const heading=node("h3",null,phase.title);
  heading.append(node("span",null,items.filter(checked).length+" of "+items.length+" prepared"));
  section.append(heading);
  for(const d of filtered)section.append(docRow(d));
  box.append(section);
 }
 $("noDocs").hidden=matched>0;
 updateProgress();
}
function renderAfter(){
 const box=$("afterCards");
 box.replaceChildren();
 AFTER.forEach((item,i)=>{
  const card=node("article","after-card");
  card.append(node("span","num","ONGOING DUTY "+String(i+1).padStart(2,"0")));
  card.append(node("strong",null,item.title));
  card.append(node("p",null,item.body));
  box.append(card);
 });
 $("renewalNote").textContent=
  "Renewal nuance: DAO 2014-02 states a three-year cycle and a continuing-training framework; EMB MC 2020-28 established a compliance-based renewal approach during the suspension of advanced training modules. Different regional checklists still mention training proof. Follow your EMB Regional Office's current instructions rather than assuming one universal training waiver.";
}
function renderSources(){
 const list=$("sourceList");
 list.replaceChildren();
 const picked=SOURCES.slice().sort((a,b)=>{
  const weights=x=>x.region===REGIONS[state.region].label?0:x.region==="National"?1:2;
  return weights(a)-weights(b);
 });
 for(const s of picked){
  const item=node("article","source-item");
  const left=node("div");
  left.append(node("span",null,s.region.toUpperCase()),node("strong",null,s.title),node("p",null,s.description));
  const a=node("a",null,"Open official source ↗");
  a.href=s.url;
  a.target="_blank";
  a.rel="noopener noreferrer";
  item.append(left,a);
  list.append(item);
 }
}
function refresh(){
 setSelectors();
 renderJourney();
 renderDocs();
 renderSources();
}
$("region").addEventListener("change",e=>{state.region=e.target.value;save();refresh();});
$("route").addEventListener("change",e=>{
 state.route=e.target.value;
 if(state.route==="owner")state.category="A";
 save();refresh();
});
$("category").addEventListener("change",e=>{state.category=e.target.value;save();refresh();});
$("docSearch").addEventListener("input",renderDocs);
$("resetProgress").addEventListener("click",()=>{
 if(!window.confirm("Clear checklist ticks for this application type, region and category?"))return;
 const p=profile();
 for(const k of Object.keys(state.done))if(k.startsWith(p))delete state.done[k];
 save();renderDocs();toast("Checklist progress reset.");
});
$("printChecklist").addEventListener("click",()=>window.print());
$("copyChecklist").addEventListener("click",async()=>{
 const s=stats();
 const lines=[
  "PCO accreditation checklist",
  "Type: "+routes[state.route],
  "Region: "+REGIONS[state.region].label,
  "Establishment category: "+state.category,
  "Prepared: "+s.have+" of "+s.all.length+" listed items",
  "",
  "Confirm the latest requirements with your EMB regional office.",
  ""
 ];
 for(const p of PHASES){
  const group=s.all.filter(d=>d.phase===p.id);
  if(!group.length)continue;
  lines.push(p.title);
  for(const d of group)lines.push((checked(d)?"[x] ":"[ ] ")+d.title+(d.status==="conditional"?" (if applicable / confirm)": ""));
  lines.push("");
 }
 lines.push("Official PCO portal: https://pco.emb.gov.ph/");
 lines.push("DAO 2014-02: https://apidb.denr.gov.ph/infores/uploads/rmdd/dao-2014-02.pdf");
 try{
  if(!navigator.clipboard||!navigator.clipboard.writeText)throw new Error("Clipboard unavailable");
  await navigator.clipboard.writeText(lines.join("\n"));
  toast("Checklist copied to clipboard.");
 }catch{
  toast("Clipboard unavailable. Use Print / save checklist instead.");
 }
});
renderAfter();
refresh();
showView(location.hash.slice(1)||"journey");
