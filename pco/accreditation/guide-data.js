// Source-backed PCO accreditation data. Review official sources before filing.
export const SOURCES = [
  {id:"dao",region:"National",title:"DENR Administrative Order 2014-02",description:"National baseline: categorization, qualifications, designation, accreditation and renewal.",url:"https://apidb.denr.gov.ph/infores/uploads/rmdd/dao-2014-02.pdf"},
  {id:"mc",region:"National",title:"EMB Memorandum Circular 2020-28",description:"Renewal clarification: three-year compliance evidence and conditional affidavit of commitment.",url:"https://www.emb.gov.ph/wp-content/uploads/2020/09/EMB-MC-2020-28-CLARIFICATION-ON-THE-RENEWAL-AND-REVOCATION-OF-ACCREDITATION-OF-POLLUTION-CONTROL-OFFICERS.pdf"},
  {id:"portal",region:"National",title:"PCO Online Accreditation System",description:"Official application submission and tracking.",url:"https://pco.emb.gov.ph/"},
  {id:"pcomanual",region:"National",title:"PCO Online Applicant Manual (new application)",description:"Official screenshots for first-time online filing, evaluation, payment, receipt re-submission and certificate printing.",url:"https://pco.emb.gov.ph/uploads/attachment/system/how_to_apply_for_new_application.pdf"},
  {id:"crs",region:"National",title:"EMB Company Registration System (CRS)",description:"Establishment registration, required explicitly by some EMB regions.",url:"https://client.emb.gov.ph/crs"},
  {id:"r1",region:"Region I",title:"EMB Region I Citizen's Charter (2025)",description:"PCO new and renewal service checklists and online procedure.",url:"https://r1.emb.gov.ph/wp-content/uploads/2025/03/2025-FINAL-EMB-R1-Citizens-Charter-ARTA.pdf"},
  {id:"r1forms",region:"Region I",title:"EMB Region I Downloadable Forms",description:"PCO application, checklist, affidavit and owner-as-PCO forms.",url:"https://r1.emb.gov.ph/ufaq/pollution-control-officer-pco-accreditation/"},
  {id:"r4a",region:"Region IV-A",title:"EMB CALABARZON PCO Requirements (2026)",description:"New, owner-as-PCO and renewal checklists.",url:"https://calabarzon.emb.gov.ph/wp-content/uploads/2026/02/PCO-REQUIREMENTS.pdf"},
  {id:"r4aforms",region:"Region IV-A",title:"EMB CALABARZON Downloadable Forms",description:"Approved PCO application and affidavit templates.",url:"https://calabarzon.emb.gov.ph/downloadable-forms/"},
  {id:"r7new",region:"Region VII",title:"EMB Region VII New Application Checklist",description:"CRS, photo, signature, designation, employment and establishment categorization.",url:"https://r7.emb.gov.ph/wp-content/uploads/2024/02/CHECKLIST-OF-REQUIREMENTS-FOR-PCO-NEW-APPLICATIONS.pdf"},
  {id:"r7renew",region:"Region VII",title:"EMB Region VII Renewal Checklist",description:"Renewal supporting documents including previous accreditation and compliance evidence.",url:"https://r7.emb.gov.ph/wp-content/uploads/2024/02/CHECKLIST-OF-REQUIREMENTS-FOR-RENEWAL-OF-PCO-ACCREDITATION.pdf"},
  {id:"r7forms",region:"Region VII",title:"EMB Region VII PCO Forms and Checklists",description:"New, renewal and clustered application forms and affidavit templates.",url:"https://r7.emb.gov.ph/downloadables-v3-0/"},
  {id:"r12process",region:"Region XII",title:"EMB Region XII PCO Process (2026)",description:"Current Citizen’s Charter flow: CRS, account activation, evaluation, payment, receipt upload and certificate release.",url:"https://r12.emb.gov.ph/wp-content/uploads/2026/06/EMB-12-015.pdf"},
  {id:"r12",region:"Region XII",title:"EMB Region XII PCO Requirements List",description:"Office checklist for new, renewal and clustered cases.",url:"https://r12.emb.gov.ph/wp-content/uploads/2026/03/0076_PCO-List-of-Requirements-revised.pdf"},
  {id:"r11faq",region:"Additional guidance",title:"EMB Region XI PCO FAQs",description:"Application handling, multiple installations, resignation and other questions.",url:"https://r11.emb.gov.ph/pollution-control-officer-faqs/"}
];

export const REGIONS = {
  general:{label:"Other / general",source:"dao",note:"National baseline only. EMB regional offices may ask for additional items, special templates, or proof of establishment compliance. Verify your region's latest checklist."},
  r1:{label:"EMB Region I",source:"r1",note:"Region I's 2025 Citizen's Charter lists designation, photo and e-signature, joint affidavit, qualification proof, training and application form. Confirm office-specific changes."},
  r4a:{label:"EMB CALABARZON",source:"r4a",note:"CALABARZON's 2026 checklist also lists the certificate of employment, diploma/TOR, and ECC/CNC for new applications, plus an ownership route for Category A."},
  r7:{label:"EMB Region VII",source:"r7new",note:"Region VII specifically asks for approved CRS registration and an establishment categorization checklist for new applications; pay only after the evaluator's notification."},
  r12:{label:"EMB Region XII",source:"r12",note:"Region XII publishes a combined checklist for new, renewal, and clustered cases, including separate photo, signature, employment and accreditation items."}
};

const NR=["new","owner","cluster","replace"], ALL=["new","owner","cluster","replace","renew"];
// tags: core=generally required; conditional=depends on qualifications/operations; regional=office-specific.
export const DOCUMENTS = [
  {id:"classify",phase:"pre",routes:NR,title:"Establishment classification / Category A or B assessment",desc:"Review chemical handling, hazardous waste, air sources, solid waste and wastewater criteria under DAO 2014-02, Table 1. Get EMB confirmation if unclear.",tag:"Preparation",status:"conditional"},
  {id:"appointment",phase:"pre",routes:["new","replace","cluster"],title:"Signed PCO appointment / designation letter",desc:"Issued by the owner/managing head or authorized officer, identifying the appointee, establishment or site and effectivity date.",tag:"Core"},
  {id:"replacementNotice",phase:"pre",routes:["replace"],title:"Written notice of previous PCO resignation / termination to EMB",desc:"Managing Head must inform EMB within 15 calendar days and seek new PCO accreditation within 30 days of the former PCO's departure.",tag:"Core"},
  {id:"categorySheet",phase:"pre",routes:NR,title:"Completed establishment categorization checklist",desc:"Attach the office's categorization form and facts supporting the category when required by the regional evaluator.",tag:"Office-dependent",status:"conditional"},
  {id:"categorySheetR7",phase:"pre",routes:NR,regions:["r7"],title:"Region VII establishment categorization checklist form",desc:"A specific new-application requirement from the EMB VII PCO checklist. Include forms for each installation when clustered.",tag:"Region VII"},
  {id:"clusterLetter",phase:"pre",routes:["cluster"],title:"EMB-approved clustering authorization letter",desc:"Obtain EMB assessment/approval of the proposed group of installations. A single PCO does not automatically cover multiple establishments.",tag:"Cluster"},
  {id:"clusterSites",phase:"pre",routes:["cluster"],title:"List of all clustered sites and site-specific categorization documents",desc:"Identify each installation, location, environmental activities and coverage; Region VII expressly requires categorization per site.",tag:"Cluster"},
  {id:"ownership",phase:"pre",routes:["owner"],title:"Proof of business ownership (SEC/DTI certificate)",desc:"For Category A owner/managing-head-as-PCO route. CALABARZON explicitly requests a copy.",tag:"Owner case"},
  {id:"cv",phase:"eligibility",routes:ALL,title:"Updated curriculum vitae / résumé with ID photo",desc:"Include education, environmental management experience, dates of employment and relevant responsibilities. Some regional offices accept CV as alternate qualification evidence.",tag:"Core"},
  {id:"employment",phase:"eligibility",routes:["new","cluster","replace","renew"],title:"Certificate of employment confirming full-time status",desc:"Include establishment, position, full-time appointment and relevant experience. Explicitly listed in Region VII, Region XII and CALABARZON guidance.",tag:"Common EMB"},
  {id:"qualification",phase:"eligibility",routes:["new","cluster","replace","renew"],title:"Proof of education / qualifying experience (diploma, TOR or other accepted evidence)",desc:"Category A: related technical course, third-year tertiary study, or equivalent supervisory/responsible experience. Category B has experience-based professional criteria. Submit evidence appropriate to your qualification pathway.",tag:"Qualification"},
  {id:"prc",phase:"eligibility",routes:ALL,categories:["B"],title:"Valid PRC professional license, if applicable",desc:"Required where the Category B qualification is based on a PRC-regulated profession. Not every Category B pathway needs a PRC card.",tag:"If applicable",status:"conditional"},
  {id:"previousEmployment",phase:"eligibility",routes:NR,title:"Certificates from previous employers, when relying on earlier experience",desc:"Help substantiate the relevant-experience qualification. Specifically mentioned as applicable by EMB Region VII.",tag:"If applicable",status:"conditional"},
  {id:"governmentIdR12",phase:"eligibility",routes:ALL,regions:["r12"],title:"Government-issued identification document",desc:"Region XII’s 2026 Citizen’s Charter lists a government-issued ID (for example PRC, LTO, DFA or SSS) in its PCO checklist.",tag:"Region XII"},
  {id:"photo",phase:"eligibility",routes:ALL,title:"Recent 2×2 ID photo, plain white background",desc:"Use the size/background specified by your regional PCO online upload requirements.",tag:"Common EMB"},
  {id:"signature",phase:"eligibility",routes:ALL,title:"Electronic specimen signature of PCO",desc:"Separate clean image file if required by the online system and regional checklist.",tag:"Common EMB"},
  {id:"basicTraining",phase:"training",routes:NR,title:"Certificate of 40-hour Basic PCO Training",desc:"Course must be given by an EMB-recognized organization/institution. Under DAO 2014-02, new applicants must have completed it within the last three years.",tag:"Core"},
  {id:"headTraining",phase:"training",routes:ALL,title:"Managing Head's 8-hour environmental management training certificate",desc:"Covers basic environmental laws and PCO responsibilities. Ask your EMB office if an existing certificate is acceptable for renewal.",tag:"Core"},
  {id:"renewBasic",phase:"training",routes:["renew"],title:"Copy of earlier 40-hour Basic PCO Training certificate",desc:"Region VII and Region XII renewal checklists ask for the previous basic PCO certificate.",tag:"Regional",status:"conditional"},
  {id:"renewAdvanced",phase:"training",routes:["renew"],title:"Relevant continuing/advanced PCO training certificates or attendance record",desc:"DAO 2014-02 Sec. 11 sets a 40-hour participant / 20-hour trainer framework. EMB MC 2020-28 clarifies renewal during advanced-module suspension based on three consecutive years of compliance; current regional practice must be checked.",tag:"Confirm locally",status:"conditional"},
  {id:"application",phase:"filing",routes:ALL,title:"Accomplished PCO accreditation application form / online application",desc:"Use the form or fields from your region's official portal. Check applicant, establishment, category and route entries carefully.",tag:"Core"},
  {id:"affidavit",phase:"filing",routes:["new","replace","cluster","renew"],title:"Signed, notarized Joint Affidavit of Undertaking — PCO and Managing Head",desc:"Use the correct regional pro-forma and ensure both parties sign before notarization.",tag:"Core"},
  {id:"ownerAffidavit",phase:"filing",routes:["owner"],title:"Signed, notarized Affidavit of Undertaking — owner acting as Category A PCO",desc:"Use the single-party owner/PCO template where allowed rather than the standard joint affidavit.",tag:"Owner case"},
  {id:"crs",phase:"filing",routes:ALL,regions:["r7"],title:"Approved Company Registration System (CRS) registration",desc:"Explicit prerequisite in EMB Region VII online PCO accreditation checklists. Register company and secure approval before uploading.",tag:"Region VII"},
  {id:"crsR12",phase:"filing",routes:NR,regions:["r12"],title:"Approved CRS establishment record for a newly registered company",desc:"Region XII’s 2026 process begins with registration at client.emb.gov.ph/crs when the establishment is not yet registered.",tag:"If new company",status:"conditional"},
  {id:"crsOther",phase:"filing",routes:ALL,regions:["r1","r4a","r12"],title:"Company Registration System (CRS) record, when required by your portal",desc:"Some offices require or link the establishment's approved CRS record before the PCO application can proceed. Check the regional portal workflow.",tag:"If requested",status:"conditional"},
  {id:"eccCnc",phase:"filing",routes:NR,regions:["r4a"],title:"Copy of Environmental Compliance Certificate (ECC) or Certificate of Non-Coverage (CNC)",desc:"Explicitly included in the CALABARZON 2026 new/owner-as-PCO checklist. Ensure it refers to the same establishment.",tag:"Region IV-A"},
  {id:"eccOther",phase:"filing",routes:NR,regions:["r1","r7","r12"],title:"Applicable ECC/CNC or establishment permit reference, if evaluator requests it",desc:"Keep relevant facility clearances and permits ready. Whether these are direct accreditation uploads varies by region and establishment.",tag:"If requested",status:"conditional"},
  {id:"newManagingHead",phase:"filing",routes:["renew"],title:"Documentation for changed Managing Head (new appointment / updated training)",desc:"If the managing head changed, the EMB office may require the new designation and training certificate.",tag:"If changed",status:"conditional"},
  {id:"priorCoa",phase:"compliance",routes:["renew"],title:"Previously issued PCO Certificate of Accreditation",desc:"Provide the latest accreditation document, including identifying details and expiration date.",tag:"Core"},
  {id:"complianceSummary",phase:"compliance",routes:["renew"],title:"Three consecutive years of environmental compliance evidence",desc:"EMB MC 2020-28 considers compliance with PD 1586, RA 6969, RA 8749, RA 9003, RA 9275, relevant IRRs and reportorial duties. Regional proof-of-compliance format may apply.",tag:"Core"},
  {id:"smr",phase:"compliance",routes:["renew"],title:"Copies or receipts of quarterly Self-Monitoring Reports (SMRs)",desc:"Retain proof of submission for the relevant three-year period (or approved reporting exception). Core renewal compliance evidence.",tag:"As applicable",status:"conditional"},
  {id:"cmr",phase:"compliance",routes:["renew"],title:"Compliance Monitoring Reports (CMRs) and EMB submission evidence",desc:"For ECC-covered establishments required to submit CMRs. Include proof of monitoring/reporting and any corrected findings.",tag:"If applicable",status:"conditional"},
  {id:"facilityPermits",phase:"compliance",routes:["renew"],title:"Applicable facility permits/registrations: ECC/CNC, PTO, wastewater discharge permit, HWG ID",desc:"Copies of current/relevant environmental permits and registrations. Region VII explicitly lists them when applicable.",tag:"If applicable",status:"conditional"},
  {id:"mrf",phase:"compliance",routes:["renew"],title:"MRF photographs and proof of waste-management compliance",desc:"Where an MRF or solid-waste management facility applies, retain documentation or photographs. Region VII explicitly mentions MRF photos.",tag:"If applicable",status:"conditional"},
  {id:"hazard",phase:"compliance",routes:["renew"],title:"Hazardous-waste manifests, permits to transport and certificates of treatment",desc:"If hazardous waste is generated/transported, keep complete tracking and disposal records to support applicable legal compliance.",tag:"If applicable",status:"conditional"},
  {id:"tests",phase:"compliance",routes:["renew"],title:"Relevant emissions/effluent test reports and corrective-action evidence",desc:"Support air and water discharge compliance, monitoring and corrective actions, when your installation requires them.",tag:"If applicable",status:"conditional"},
  {id:"commitment",phase:"compliance",routes:["renew"],title:"Notarized Affidavit of Commitment (when required for deficiencies)",desc:"Under EMB MC 2020-28, a company non-compliant with one or two requirements may receive a one-year renewal subject to a joint affidavit of commitment; not mandatory for every renewal.",tag:"If instructed",status:"conditional"},
  {id:"acknowledgment",phase:"decision",routes:ALL,title:"Online submission acknowledgment / application reference number",desc:"Retain the email or on-screen acknowledgment and application ID used for evaluator follow-ups. Save or print it for your records.",tag:"Application record"},
  {id:"orderPayment",phase:"decision",routes:ALL,title:"Official Order of Payment (when generated)",desc:"Download the EMB-generated order after procedural screening/evaluation if the portal asks for it. Avoid paying before the correct instruction.",tag:"Payment stage",status:"conditional"},
  {id:"payment",phase:"decision",routes:ALL,title:"Official fee payment and Official Receipt / proof of payment",desc:"DAO 2014-02 establishes ₱500 processing (new) and renewal fees. Pay only via the office's instructed method/step; local documentary stamp or other charges may apply.",tag:"After assessment"},
  {id:"certificate",phase:"decision",routes:ALL,title:"Approved PCO Certificate of Accreditation",desc:"Download/claim the signed or issued accreditation certificate, verify establishment and PCO details and effective dates, and save a copy.",tag:"Final output"}
];

export const PHASES = [
 {id:"pre",title:"1 · Establishment and appointment"},
 {id:"eligibility",title:"2 · Personal and qualification records"},
 {id:"training",title:"3 · Training certificates"},
 {id:"filing",title:"4 · Filing, notarization and registration"},
 {id:"compliance",title:"5 · Renewal compliance evidence"},
 {id:"decision",title:"6 · Payment and accreditation output"}
];

export const AFTER = [
 {title:"Keep permits and registrations current",body:"Monitor ECC conditions, wastewater discharge permits, air Permit to Operate, hazardous waste registrations, and any other applicable environmental authorizations."},
 {title:"Submit required SMR and CMR reports",body:"DAO 2014-02 Sec. 12 generally requires quarterly SMRs. CMR obligations depend on ECC conditions and approved reporting arrangements; retain filing evidence."},
 {title:"Maintain monitoring and waste records",body:"Keep air/effluent laboratory results, logbooks, waste manifests, treatment certificates, inspections and corrective actions in the establishment's compliance files."},
 {title:"Escalate incidents promptly",body:"DAO 2014-02 Sec. 10 requires written notice within 24 hours for specified spills/breakdowns and exceedances once laboratory/online results become available."},
 {title:"Plan renewal before expiry",body:"Standard accreditation is renewed every three years under DAO 2014-02. Allow time to assemble current regional requirements and the three-year compliance evidence."},
 {title:"Report resignation and update accreditation",body:"Managing Head must notify EMB within 15 calendar days of resignation/termination and seek accreditation for a new PCO within 30 days; a new employer requires new accreditation."}
];

export function stepsFor(route,region) {
 const newBase = [
 ["01","Determine whether a PCO is required","Confirm applicability and categorize the establishment.",[
 "Identify emission sources, wastewater discharge, hazardous waste, chemicals and solid-waste management activities.",
 "Use DAO 2014-02 Table 1 to assess Category A versus B. If uncertain, ask the relevant EMB Regional Office before assuming a category.",
 "For multiple installations, seek EMB review of clustering/multiple-site arrangements instead of assuming one officer may serve unrelated establishments."
 ]],
 ["02","Check qualifications and designate the PCO","Match the applicant to the establishment category and create the formal designation.",[
 "Basic criteria include Filipino citizenship, legal age, full-time employment, and recognized Basic PCO Training.",
 "Category A: related technical-course graduate, completed third-year tertiary education, or three years of responsible/supervisory experience (owner/manager exception under DAO 2014-02 Sec. 7).",
 "Category B: licensed engineer/chemist with two years relevant experience; engineering or physical/natural sciences professional with three years; or another appropriate professional with five years.",
 "The Managing Head appoints/designates the PCO in writing. DAO 2014-02 sets a 15-calendar-day period to apply for accreditation after designation."
 ]],
 ["03","Complete the required training","Prepare training proof from EMB-recognized providers.",[
 "PCO: 40-hour Basic PCO Training, completed within the previous three years for a new applicant.",
 "Managing Head: eight hours of environmental management training.",
 "Keep complete signed certificates. Check with the EMB office that the provider and certificate format are accepted."
 ]],
 ["04","Prepare, sign and notarize documents","Collect identity, competency, designation and affidavit files.",[
 "Check every item on the Documents tab, including conditional PRC/qualification and facility documents.",
 "Prepare CV, qualifications, employment proof, photos and electronic signature in the accepted upload format.",
 "Use the region's prescribed Joint Affidavit of Undertaking (or approved owner-as-PCO form); sign and notarize as instructed."
 ]],
 ["05","Register the establishment and create a PCO portal account","Check whether the online system requires an approved CRS record.",[
 "Use the official EMB Company Registration System if required; Region VII expressly lists approved CRS.",
 "Open pco.emb.gov.ph and create/access the required account for the proper establishment.",
 "Check the registered email for the activation link; activate the account, then select the proper new or renewal route and confirm site and category details."
 ]],
 ["06","Upload and submit the online application","Attach documents and retain a submission reference.",[
 "For documentary attachments, the official PCO applicant manual specifies PDF. Prepare clear PDFs, and follow the on-screen format requirements for portrait and signature fields.",
 "Saving the application may keep it as a draft; click Submit Application to forward it to the regional case handler. Save the application ID/acknowledgment.",
 "Review portal status, evaluator comments and registered email regularly. An application forwarded to the case handler may be temporarily locked for edits until returned."
 ]],
 ["07","Respond to evaluation and pay when instructed","The EMB Regional Office evaluates eligibility, supporting records and compliance.",[
 "If an application is incomplete, fix the listed deficiencies and resubmit. If disapproved, DAO 2014-02 Sec. 8 gives 30 calendar days to address deficiencies or designate another PCO.",
 "Follow the official order-of-payment instructions. DAO 2014-02 sets a ₱500 accreditation processing fee; additional regional charges may be assessed.",
 "After a payment instruction, download the Order of Payment, pay through an authorized channel, then upload the official receipt. Click Update Application and Submit to Evaluator as instructed; upload alone may leave it pending.",
 "Processing targets vary: DAO 2014-02 includes 15 calendar days from receipt, but a regional Citizen’s Charter may use a different published service time."
 ]],
 ["08","Receive the certificate and start compliance monitoring","Confirm approval and keep records for the next cycle.",[
 "When the portal status becomes Approved, print/download the PCO Certificate of Accreditation. Verify the officer, establishment, category and validity.",
 "Provide the establishment with a copy; record the expiry date and maintain required SMR, CMR and other environmental reporting.",
 "Plan renewal with the latest EMB regional checklist. Accreditation is not transferable automatically to a different employer."
 ]]
 ];
 const renew = [
 ["01","Check expiry and changes","Verify the current accreditation and relevant establishment details.",[
 "Confirm the current Certificate of Accreditation and due date; ask EMB about expired or otherwise unusual applications.",
 "Identify changes in managing head, installation, company name, category or environmental permits.",
 "Open the Documents tab using the Renewal selection for a complete checklist."
 ]],
 ["02","Compile three years of compliance","Gather records that demonstrate compliance with environmental laws and reporting.",[
 "Use EMB MC 2020-28's three-consecutive-year compliance review for PD 1586, RA 6969, RA 8749, RA 9003, RA 9275 and applicable IRRs.",
 "Gather SMR/CMR submission evidence, applicable permits (ECC, PTO, WDP, HWG ID), tests, waste documentation and corrective actions.",
 "If noncompliance is identified, consult EMB about a possible affidavit of commitment and shorter renewal; do not assume automatic approval."
 ]],
 ["03","Verify training and employment records","Update personal documents and check office-specific training evidence.",[
 "Keep previous basic-training certificate and relevant advanced/continuing training records.",
 "DAO 2014-02 Sec. 11 states a 40-hour relevant training / 20-hour trainer benchmark; EMB MC 2020-28 clarified renewal during advanced-module suspension. The office's current instruction governs.",
 "Prepare updated employment evidence, managing-head training and qualification records as required."
 ]],
 ["04","Prepare renewal forms and affidavits","Use correct regional templates and recheck notarization.",[
 "Attach prior PCO accreditation, application form and current identification/photo/signature.",
 "Prepare and notarize the Joint Affidavit of Undertaking; use a commitment affidavit only when required by EMB.",
 "Upload regional compliance checklist/summary and all applicable attachments."
 ]],
 ["05","Apply through the official PCO portal","Submit the renewal and monitor the evaluation.",[
 "Log in to the PCO Online Accreditation System, choose renewal, and verify establishment information.",
 "Upload legible PDF attachments as instructed; use Submit Application (not just Save as Draft), and retain the acknowledgement/application ID.",
 "Respond to evaluator requests for evidence, clarifications or corrections."
 ]],
 ["06","Pay the instructed renewal fee","Complete payment and receipt-upload steps.",[
 "DAO 2014-02 lists a ₱500 renewal fee; the exact payment workflow may differ by EMB regional office.",
 "Pay only when notified. Where the portal uses the documented workflow, upload the receipt, select Update Application, then Submit to Evaluator so the file is not left pending on your side.",
 "Check the office's decision and accredited period; deficiencies may affect the outcome under EMB MC 2020-28."
 ]],
 ["07","Keep your renewed certificate and monitor compliance","Store the new accreditation and keep operating records current.",[
 "Verify the issued renewed certificate, validity period, officer, company and category.",
 "Keep the supporting three-year compliance evidence in the company records and continue required reporting.",
 "Calendar the next renewal and monitor DENR/EMB announcements."
 ]]
 ];
 const items = route==="renew" ? renew : newBase;
 if (route==="owner") {
  items[1][2]="For Category A, an owner/manager can be the PCO under DAO 2014-02's stated exception.";
  items[1][3][0]="Category A owner/manager exception applies to professional competency, not all other basic PCO requirements. Verify this route with EMB.";
  items[3][3].push("Use the owner-as-PCO affidavit rather than an inapplicable two-person joint affidavit where your region allows it.");
 }
 if (route==="cluster") {
  items[0][3].push("Secure approval of clustering from EMB and attach the approved clustering letter and site-by-site categorization documents.");
  items[5][3].push("Use the office's clustered-installation application path and its specific supporting documents.");
 }
 if (route==="replace") {
  items[1][3].push("If replacing a departed PCO, notify EMB within 15 calendar days and seek accreditation of the replacement within 30 days; the Managing Head acts as interim PCO.");
  items[5][3].push("A PCO moving to a new employer must obtain new accreditation for that establishment.");
 }
 if (region==="r7" && route!=="renew") items[4][3].push("Region VII: obtain approved Company Registration System (CRS) registration before starting the PCO upload.");
 return items;
}
