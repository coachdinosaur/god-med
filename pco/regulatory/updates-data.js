/**
 * PCO Study Studio — carefully sourced regulatory snapshot.
 * Reviewed: 25 October 2026 (Asia/Manila).
 * Status is editorial: "issued" means officially issued/published, NOT a
 * blanket determination of effectivity or applicability to every company.
 * Confirm the text, effectivity clauses, and regional implementation.
 */
export const reviewedOn = "2026-10-25";
export const sources = Object.freeze([
  { id:"dao2013", title:"DENR DAO 2013-22 — complete hazardous-waste procedural manual", url:"https://emb.gov.ph/wp-content/uploads/2025/02/DAO-2013-22-Procedures-and-Standards-for-Hazwaste-1.pdf", publisher:"DENR–EMB" },
  { id:"hazPlan", title:"EMB 2025 Annual Regulatory Plan", url:"https://r11.emb.gov.ph/wp-content/uploads/2025/08/2025-EMB-ANNUAL-REGULATORY-PLAN.pdf", publisher:"DENR–EMB Region XI" },
  { id:"draft2020", title:"EMB publicly circulated proposed revisions to DAO 2013-22 (2020 draft, NOT final)", url:"https://www.emb.gov.ph/wp-content/uploads/2020/11/proposed-revisions-to-DAO-2013-22_-October-22-2020.pdf", publisher:"DENR–EMB" },
  { id:"piccsLaw", title:"Official list of RA 6969 chemical policies", url:"https://chemical.emb.gov.ph/?page_id=121", publisher:"EMB Chemical Management Section" },
  { id:"piccs2025", title:"DAO 2025-09 — PICCS (ONAR registered copy)", url:"https://naro.law.upd.edu.ph/issuances/7858", publisher:"ONAR / UP Law Center" },
  { id:"piccs2026", title:"EMB PICCS information and updates", url:"https://chemical.emb.gov.ph/?page_id=138", publisher:"EMB Chemical Management Section" },
  { id:"cco", title:"EMB notice: Vinyl Chloride and Benzene CCOs", url:"https://chemical.emb.gov.ph/?p=950", publisher:"EMB Chemical Management Section" },
  { id:"ccoIndex", title:"Chemical Control Orders and general guidance", url:"https://chemical.emb.gov.ph/?page_id=44", publisher:"EMB Chemical Management Section" },
  { id:"hb6683", title:"HB 6683 — Waste Treatment Technology Act (20th Congress)", url:"https://www.congress.gov.ph/legis/results?congress=20&oth_nos=HB06683&qrytype=N&signif=NL", publisher:"House of Representatives" },
  { id:"chemicalRegistry", title:"Official PICCS validation tool", url:"https://opms.emb.gov.ph/piccs_search/", publisher:"DENR–EMB" },
  { id:"denrRegister", title:"EMB hazardous-waste management legal framework", url:"https://r12.emb.gov.ph/hazardous-waste-management/", publisher:"DENR–EMB Region XII" },
  { id:"houseBills", title:"20th Congress legislative records", url:"https://www.congress.gov.ph/legislative-documents", publisher:"House of Representatives" }
]);

export const updates = Object.freeze([
  {
    id:"hazwaste-draft",status:"draft",topic:"Hazardous waste",date:"2025-01-21",period:"2025 regulatory plan",
    code:"Proposed revision of DAO 2013-22",
    title:"Revised hazardous-waste management manual — under development",
    summary:"EMB's 2025 Annual Regulatory Plan lists a revised Manual of Procedures and Standards for the Management of Hazardous Waste. Planning or consultation is not the same as a signed and effective administrative order.",
    why:"A revision could affect generator, transporter, TSD, classification, manifest and documentation rules. The exact changes must be confirmed against an issued final text, not inferred from a draft.",
    action:"For current compliance, keep using DAO 2013-22 together with applicable later EMB issuances. Check the DENR order register and your EMB Regional Office before changing processes.",
    note:"No final superseding DAO was verified in the official sources reviewed as of 25 October 2026; this is a verification limit, not a guarantee that none exists.",
    sourceIds:["hazPlan","draft2020","dao2013","denrRegister"]
  },
  {
    id:"dao2026-28",status:"issued",topic:"Chemical controls",date:"2026-09-24",period:"Published 24 Sep 2026",
    code:"DAO 2026-28",
    title:"Chemical Control Order for Vinyl Chloride",
    summary:"DENR issued a CCO for vinyl chloride. EMB states that affected holders of existing PCL registrations or exemptions are also covered and must apply for CCO registration.",
    why:"Businesses importing, manufacturing, distributing or using vinyl chloride should review the specific obligations, registration requirements and transition rules.",
    action:"Check the inventory and CAS information; read the full DAO; determine whether CCO registration, import clearance, reporting and safe handling requirements apply.",
    note:"EMB reports publication and ONAR submission on 24 September 2026. The announced effectivity rule depends on publication plus ONAR acknowledgment; verify the operative date and any transitional deadlines.",
    sourceIds:["cco","ccoIndex"]
  },
  {
    id:"dao2026-29",status:"issued",topic:"Chemical controls",date:"2026-09-24",period:"Published 24 Sep 2026",
    code:"DAO 2026-29",
    title:"Chemical Control Order for Benzene",
    summary:"DENR issued a CCO for benzene. EMB says affected businesses holding prior PCL registrations or PCL exemptions must also assess CCO registration.",
    why:"Establishments handling benzene may have new chemical-specific registration, control and reporting obligations beyond general hazardous-waste compliance.",
    action:"Match the company's benzene inventory to the CCO; review current registration and exemptions; confirm requirements with EMB Chemical Management Section.",
    note:"EMB reports publication and ONAR submission on 24 September 2026. Check the effectivity clause and any phase-in provisions in the official text.",
    sourceIds:["cco","ccoIndex"]
  },
  {
    id:"dao2026-24",status:"issued",topic:"Chemical inventory",date:"2026",period:"2026 PICCS update",
    code:"DAO 2026-24",
    title:"Additional chemicals included in PICCS (CY 2024 batch)",
    summary:"DENR issued an additional list of chemicals for the Philippine Inventory of Chemicals and Chemical Substances (PICCS). EMB lists DAO 2026-24 alongside DAO 2025-09 as an applicable PICCS update.",
    why:"For importers and manufacturers, the PICCS listing status affects whether a new-chemical notification (PMPIN) may be required. PICCS listing does not override a separate PCL or CCO obligation.",
    action:"Re-check chemical names and CAS Registry Numbers against the current PICCS/EMB tool, then check whether any chemical is covered by PCL or a CCO.",
    note:"The annual chemical-inventory update is separate from the proposed hazardous-waste manual revision.",
    sourceIds:["piccs2026","piccsLaw","chemicalRegistry"]
  },
  {
    id:"dao2025-09",status:"issued",topic:"Chemical inventory",date:"2025-01-22",period:"Signed 22 Jan 2025",
    code:"DAO 2025-09",
    title:"Updated Philippine Inventory of Chemicals and Chemical Substances",
    summary:"DAO 2025-09 updates the PICCS and its maintenance framework pursuant to RA 6969 and its implementing rules.",
    why:"PICCS helps identify existing versus new chemicals and relevant pre-manufacture / pre-importation requirements.",
    action:"Check inventory substances by their proper CAS number, record the result, and separately check PCL/CCO rules and PMPIN obligations if needed.",
    note:"This signed DAO is separate from later draft PICCS policies circulated for consultation.",
    sourceIds:["piccs2025","piccs2026","chemicalRegistry"]
  },
  {
    id:"hb6683",status:"legislation",topic:"Legislation",date:"2025-12-17",period:"Transmitted to Senate 17 Dec 2025",
    code:"House Bill 6683 · 20th Congress",
    title:"Waste Treatment Technology Act — a bill, not yet a law",
    summary:"The House record shows HB 6683 passed the House on 16 December 2025 and was transmitted to the Senate on 17 December 2025. It concerns municipal and hazardous-waste treatment technologies and seeks to repeal Section 20 of RA 8749.",
    why:"This legislative proposal concerns waste-treatment technology. It is NOT an enacted amendment to RA 6969 and does not itself revise DAO 2013-22.",
    action:"Track its legislative status on official House/Senate sites. Do not use bill provisions as permit or operational requirements unless enacted and effective.",
    note:"Status is based on the House's legislative record available for this review; confirm whether any later Senate or enactment action occurred.",
    sourceIds:["hb6683","houseBills"]
  },
  {
    id:"dao2013-22",status:"baseline",topic:"Hazardous waste",date:"2013-12-04",period:"Existing framework",
    code:"DAO 2013-22",
    title:"Existing hazardous-waste procedures and standards",
    summary:"DAO 2013-22 is the DENR Revised Procedures and Standards for the Management of Hazardous Wastes under RA 6969. It governs established hazardous-waste management processes together with other applicable issuances.",
    why:"A draft replacement in a regulatory plan does not automatically repeal or supersede the existing order.",
    action:"Continue to verify waste characterization, generator registration, storage, transport, manifest, approved transporter/TSD arrangements and reporting against the applicable rule text.",
    note:"Use the latest applicable EMB memoranda, regional guidance and permits as well; the baseline is not a substitute for checking later amendments.",
    sourceIds:["dao2013","hazPlan"]
  },
  {
    id:"ra6969",status:"baseline",topic:"Legislation",date:"1990",period:"Underlying statute",
    code:"Republic Act 6969",
    title:"Toxic Substances and Hazardous and Nuclear Wastes Control Act",
    summary:"RA 6969 remains the underlying statute for the chemical controls and hazardous-waste framework discussed here. DENR administrative orders can be updated without Congress amending RA 6969.",
    why:"An administrative-order update, a draft regulatory plan, and a congressional bill have different legal effects.",
    action:"Check enacted Republic Acts and official government legislative records when assessing claims that RA 6969 itself was amended.",
    note:"No direct amending Republic Act enacted since January 2025 was confirmed in the sources reviewed; this is not a comprehensive legislative-history certification.",
    sourceIds:["piccsLaw","houseBills","denrRegister"]
  }
]);
export const statusInfo = Object.freeze({
  issued: { label:"Issued order",description:"A signed/published issuance was located. Check its own effectivity, transition periods and applicability." },
  draft: { label:"Draft / planned",description:"Consultation or planning only. Do not treat proposed wording as mandatory." },
  legislation: { label:"Proposed bill",description:"A bill is not binding until enacted, published and effective." },
  baseline: { label:"Existing baseline",description:"Underlying law or existing administrative order used alongside applicable newer rules." }
});
