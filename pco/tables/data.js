import {pcoTables} from "./pco-data.js";
import {hazardTables} from "./hazard-data.js";
import {waterTables} from "./water-data.js";
import {airTables} from "./air-data.js";

export const REVIEWED = "25 October 2026";
export const SOURCES = Object.freeze({
  pco: {title:"DENR DAO 2014-02 — PCO accreditation",url:"https://apidb.denr.gov.ph/infores/uploads/rmdd/dao-2014-02.pdf",agency:"DENR"},
  haz: {title:"DENR DAO 2013-22 — Hazardous Waste Manual",url:"https://www.pntr.gov.ph/wp-content/uploads/2021/04/IRR-2213.pdf",agency:"DENR / Philippine National Trade Repository"},
  water: {title:"DENR DAO 2016-08 — Water Quality and Effluent Standards",url:"https://pab.emb.gov.ph/wp-content/uploads/2022/10/DAO-2016-08-Water-Quality-Guidelines-and-General-Effluent-Standards-of-2016.pdf",agency:"DENR–EMB"},
  air: {title:"DENR DAO 2000-81 — Clean Air Act IRR",url:"https://www.emb.gov.ph/wp-content/uploads/2015/10/DAO-2000-81.pdf",agency:"DENR–EMB"}
});
export const TABLES = Object.freeze([...pcoTables,...hazardTables,...waterTables,...airTables]);
export const GROUPS = Object.freeze([...new Set(TABLES.map(t=>t.group))]);

export function filterTables(tables=TABLES,query="",group="all") {
  const q=String(query??"").trim().toLocaleLowerCase("en");
  return tables.filter(t=>(group==="all"||t.group===group) &&
    (!q||[t.title,t.tag,t.group,t.description,t.sourcePage,...t.columns,...t.rows.flat()].join(" ").toLocaleLowerCase("en").includes(q)));
}

export function validateTables(tables=TABLES) {
  const errors=[], ids=new Set();
  for (const t of tables) {
    if(!t.id||ids.has(t.id))errors.push("Duplicate or missing ID: "+t.id);
    ids.add(t.id);
    if(!SOURCES[t.source])errors.push("Missing source: "+t.id);
    if(!t.title||!t.sourcePage||!t.tag||!t.description||!t.note)errors.push("Missing text metadata: "+t.id);
    if(!t.columns?.length||!t.rows?.length||t.rows.some(r=>r.length!==t.columns.length))
      errors.push("Columns and rows do not match: "+t.id);
    if(!["full","summary","grouped","selected"].includes(t.coverage))
      errors.push("Unlabeled coverage: "+t.id);
  }
  return errors;
}
