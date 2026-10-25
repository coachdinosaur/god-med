// Source-guided application checklists, reviewed 25 October 2026.
// All regional add-ons remain conditional until confirmed with the receiving EMB office.
const d = (id, title, detail, applicability = "standard") => ({ id, title, detail, applicability });
const s = (id, title, detail, items) => ({ id, title, detail, items });
export const PORTAL = "https://pco.emb.gov.ph";
export const regions = [
  { id: "all", label: "Choose EMB region / General guide", url: "https://www.emb.gov.ph/", note: "Start with DAO 2014-02 and verify the current Citizen’s Charter/checklist of the EMB regional office covering your establishment." },
  { id: "r1", label: "Region I — Ilocos", url: "https://r1.emb.gov.ph/ufaq/pollution-control-officer-pco-accreditation/", note: "Region I publishes its accreditation application checklist, forms, and owner-PCO affidavit. Its 2025 Citizen’s Charter also lists photo, e-signature, training, and qualification documents." },
  { id: "r3", label: "Region III — Central Luzon", url: "https://r3.emb.gov.ph/", note: "Use the EMB Region III Citizen’s Charter or PCO unit for the current detailed document checklist; the national list is your starting point." },
  { id: "r4a", label: "Region IV-A — CALABARZON", url: "https://calabarzon.emb.gov.ph/secsime-no-r4a-cpd-13/", note: "Published regional checklist includes renewal compliance proof, notarized undertaking/commitment, managing-head training and proof of ownership for owner-PCOs." },
  { id: "r7", label: "Region VII — Central Visayas", url: "https://r7.emb.gov.ph/downloadables-v3-0/", note: "Region VII publishes downloadable new, renewal, cluster and renewal-of-cluster forms, including establishment categorization." },
  { id: "r8", label: "Region VIII — Eastern Visayas", url: "https://r8.emb.gov.ph/pco-2/", note: "Region VIII publishes new/renewal checklists, forms and information. Its PCO Online System page offers user manuals." },
  { id: "r11", label: "Region XI — Davao", url: "https://r11.emb.gov.ph/pollution-control-officer-faqs/", note: "Region XI FAQ describes the three-year certificate, online application, site clustering and cashier payment arrangements." },
  { id: "r12", label: "Region XII — SOCCSKSARGEN", url: "https://r12.emb.gov.ph/citizens-charter/", note: "Region XII's published PCO requirements distinguish new, renewal and clustered applications, including notarized commitment for renewal." },
  { id: "ncr", label: "NCR — Metro Manila", url: "https://ncr.emb.gov.ph/pollution-control-officer-corner/", note: "EMB NCR lists recognized training organizations, forms and instructions. Check whether current renewal memos alter training evidence." }
];
export const tracks = [
  { id: "new", label: "First accreditation", short: "New" },
  { id: "renewal", label: "Renew accreditation", short: "Renewal" },
  { id: "cluster", label: "Multiple sites / cluster", short: "Cluster" },
  { id: "replacement", label: "Replace a departing PCO", short: "Replacement" }
];
export const sources = [
  { title: "DENR DAO 2014-02 — Revised Guidelines", url: "https://r7.emb.gov.ph/wp-content/uploads/2025/04/DAO-2014-02.pdf", note: "Legal basis: coverage, category, qualifications, appointment, documentary minimums, fees, renewal and replacement." },
  { title: "EMB Region VII — New application checklist", url: "https://r7.emb.gov.ph/wp-content/uploads/2024/02/CHECKLIST-OF-REQUIREMENTS-FOR-PCO-NEW-APPLICATIONS.pdf", note: "CRS registration, 2×2 photo, e-signature, full-time employment certificate and category checklist." },
  { title: "EMB Region XII — PCO document matrix", url: "https://r12.emb.gov.ph/wp-content/uploads/2026/03/0076_PCO-List-of-Requirements-revised.pdf", note: "New, renewal and clustered supporting-document matrix." },
  { title: "EMB CALABARZON — Official PCO transaction", url: "https://calabarzon.emb.gov.ph/secsime-no-r4a-cpd-13/", note: "Step-by-step order of payment, receipt upload, renewal compliance proof and 500-peso fee." },
  { title: "EMB Region VII — Forms and checklists", url: "https://r7.emb.gov.ph/downloadables-v3-0/", note: "Download regional affidavits, categorization, new/renewal/cluster checklists." },
  { title: "EMB Region I — Official application forms", url: "https://r1.emb.gov.ph/ufaq/pollution-control-officer-pco-accreditation/", note: "Current forms and owner-PCO affidavit links." },
  { title: "EMB Region XI — PCO FAQs", url: "https://r11.emb.gov.ph/pollution-control-officer-faqs/", note: "Accreditation validity, online account, replacements and site rules." },
  { title: "EMB MC 2021-16 — Training certificate clarification", url: "https://www.emb.gov.ph/wp-content/uploads/2021/12/EMB-MC-2021-16.pdf", note: "EMB-recognized training certificate signatory clarification." }
];

const first = [
  s("01", "Confirm your establishment and eligibility", "Start by identifying the establishment's activities, pollution sources, EMB region and whether it is Category A or B under DAO 2014-02, §5.", [
    d("scope", "Check if the establishment falls under PCO coverage", "Applies to potential/actual land, air or water pollution sources. Some narrow exemptions exist under DAO 2014-02, §3.", "action"),
    d("cat", "Establishment categorization checklist / A–B assessment", "Describe air sources, wastewater discharge, hazardous waste, solid waste and treatment activities. Region VII explicitly requires a categorization form.", "regional"),
    d("elig", "Proof of PCO eligibility", "Filipino, of legal age, full-time employee (owner/manager special rule for Category A), trained by an EMB-recognized provider. Category B has stricter experience/discipline criteria.", "action")
  ]),
  s("02", "Complete recognized training", "Book recognized providers and keep original certificates, names, dates and training hours.", [
    d("basic40", "PCO 40-hour Basic Training certificate", "Certificate from an EMB-recognized training institution, completed within the preceding three years for a new application."),
    d("head8", "Managing Head’s 8-hour environmental management certificate", "Eight hours on environmental laws and PCO/managing-head obligations."),
    d("program", "Verify training provider's EMB recognition", "Confirm recognition for the actual course/date; EMB MC 2021-16 clarifies training certificate signatures.", "action")
  ]),
  s("03", "Register establishment and compile identity files", "Collect clear digital copies and use the correct company/establishment record; file sizes and formats depend on the online portal.", [
    d("crs", "Approved establishment registration / CRS identification", "If not yet registered, use the EMB Client Registration System: https://client.emb.gov.ph/crs . Region VII explicitly lists approved CRS.", "regional"),
    d("company", "SEC / DTI / other legal registration", "Establishment identity document; required in certain owner-PCO/cluster and regional cases.", "conditional"),
    d("cv", "Updated PCO curriculum vitae / resume with ID photo", "Include employer, technical roles, relevant environmental work and dates."),
    d("pic", "2×2 ID photograph", "Recent digital photo with white background (commonly requested in the online profile)."),
    d("esign", "PCO e-signature file", "Prepare a legible signature image for profile/certificate processing."),
    d("id", "Valid government-issued ID", "Certain regional checklists request an ID; keep one ready.", "regional"),
    d("diploma", "College diploma and/or transcript of records (TOR)", "Evidence for the applicable Category A/B academic path; include the proof required by the evaluator."),
    d("license", "Valid PRC professional license, if applicable", "For Category B applicants relying on a licensed-professional qualification.", "conditional"),
    d("coe", "Certificate of employment from current company", "State the employment status, role, relevant work and that the applicant is a full-time employee."),
    d("past-coe", "Prior employer certificates / proof of environmental experience", "When the qualifying experience comes from previous employment or a regional checklist requests them.", "conditional")
  ]),
  s("04", "Issue designation and notarize undertakings", "The managing head signs the appointment; prepare the correct affidavit format for employee versus owner-PCO.", [
    d("appoint", "Signed letter of appointment / designation as PCO", "Include establishment/site name, address, appointee, effective date and authorized managing-head signature."),
    d("joint", "Notarized Joint Affidavit of Undertaking", "Signed by the PCO and the managing head using the receiving EMB office's pro-forma."),
    d("solo", "Notarized owner-PCO / sole undertaking (instead of joint affidavit)", "Only when the owner/managing head is also eligible to be PCO; use the regional owner-PCO form.", "conditional"),
    d("ownership", "Proof of ownership (SEC/DTI) when owner acts as PCO", "Some offices ask for separate proof that the PCO is also the owner.", "conditional")
  ]),
  s("05", "Create and submit the online application", "At pco.emb.gov.ph, sign up/activate your account, complete the personal profile, select New, enter establishment details and upload documents.", [
    d("form", "Completed PCO accreditation online application / generated form", "Check the PCO's name, managing head, region, site address, classification and uploads."),
    d("attachments", "All required uploads are attached and readable", "Check IDs and file names; submit the application for procedural screening.", "action"),
    d("reference", "Application tracking/reference number and confirmation", "Save confirmation or screenshot to follow evaluation or corrections.", "action")
  ]),
  s("06", "Respond to evaluation and pay the fee", "EMB checks completeness and establishment category. Respond to correction comments before paying.", [
    d("deficiency", "Requested additional documents / corrected files (if returned)", "Resubmit corrections from the assigned EMB evaluator; do not ignore portal status messages.", "conditional"),
    d("oop", "Order of Payment issued by EMB", "Download/print only when generated after evaluation."),
    d("fee", "Official Receipt / approved proof of ₱500 processing fee", "Pay using the methods offered by the relevant EMB office; other lawful charges, if any, should be verified."),
    d("receipt", "Payment receipt details uploaded to PCO Online", "Submit receipt information or image back to the application as instructed.", "action")
  ]),
  s("07", "Receive the certificate and maintain compliance", "After regional approval, download and retain the official certificate; accreditation generally runs for three years.", [
    d("coa", "Approved PCO Certificate of Accreditation", "Save the signed/downloaded official certificate and confirm name, establishment, category and effective dates."),
    d("records", "Internal compliance record and renewal reminder", "Provide the company a copy, track expiry, training hours, permits and required SMR/CMR reports.", "action")
  ])
];

const renew = [
  s("01", "Review expiration, designation and compliance", "The certificate generally expires three years after issuance. Start well before expiry and confirm any current regional training guidance.", [
    d("oldcoa", "Current/most recent PCO Certificate of Accreditation", "Needed for renewal and often uploaded under personal supporting documents."),
    d("designation-renew", "Current designation / appointment letter", "Keep a current copy; some regional renewal checklists require it.", "regional"),
    d("coe-renew", "Updated certificate of employment", "Shows employment status and site of designation; required by several regional offices."),
    d("cv-renew", "Updated CV/resume with ID photograph", "Include current position, relevant years and recent environmental training."),
    d("photo-renew", "Updated 2×2 photo on white background and e-signature", "Regional portals commonly require both in the PCO profile."),
    d("id-renew", "Valid government ID and diploma/TOR as requested", "Certain offices ask applicants to retain/re-upload education and identification proofs.", "regional"),
    d("prc-renew", "Valid PRC license (Category B, if applicable)", "When the category and professional qualification require a license.", "conditional")
  ]),
  s("02", "Document continuing training", "DAO 2014-02 §11 states 40 hours relevant PCO training as attendee or 20 hours as trainer/subject expert within the preceding three years. Later EMB advisories may affect recognition; confirm with your region.", [
    d("hours-renew", "Continuing/advanced PCO training certificates and dates", "Accumulate qualifying hours and retain the certificates and hours for the correct period."),
    d("trainer-renew", "Trainer/subject-matter expert certificates and hours (if claiming this route)", "20 hours documented as trainer is an alternative in the DAO, subject to current EMB interpretation.", "conditional"),
    d("mh-renew", "Managing Head’s environmental management training certificate", "May be requested again or retained in the portal profile depending on the region.", "regional")
  ]),
  s("03", "Compile environmental compliance evidence", "Compliance under PD 1586, RA 6969, RA 8749, RA 9003 and RA 9275 over the accreditation period may be reviewed. Permit-specific records apply only where relevant.", [
    d("smr", "SMR submissions and acknowledgments", "Quarterly Self-Monitoring Reports for the applicable reporting period, commonly up to the past three years.", "conditional"),
    d("cmr", "CMR submissions/acknowledgments", "Compliance Monitoring Reports if the facility/project is required to submit CMRs.", "conditional"),
    d("ecc", "ECC / CNC and conditions compliance records", "Evidence that applicable EIA requirements/conditions have been followed.", "conditional"),
    d("air", "Permit to Operate (air), test reports and permit compliance", "For facilities with covered air pollution sources and required emissions testing.", "conditional"),
    d("water", "Discharge Permit / interconnection certificate and wastewater tests", "For facilities required to maintain water discharge controls or monitoring.", "conditional"),
    d("haz", "Hazardous Waste Generator registration and manifest/transport/treatment records", "For establishments generating or handling regulated hazardous wastes.", "conditional"),
    d("solid", "Solid waste records and operational/monitoring reports", "For relevant solid-waste obligations and site permits.", "conditional"),
    d("nov", "Notices of Violation / directives and corrective-action proof", "Provide truthful status and compliance action documents when there are incidents or notices.", "conditional")
  ]),
  s("04", "Complete renewal application and undertakings", "Use the renewal form/portal workflow, not a duplicate first-time application unless EMB directs otherwise.", [
    d("renewform", "Completed PCO Renewal Application Form / online record", "Check updated profile, company link, status and supporting uploads."),
    d("intent", "Signed letter of intent for renewal", "Explicitly listed in some regional Citizen's Charters.", "regional"),
    d("joint-renew", "Notarized Joint Affidavit of Undertaking", "PCO and managing-head notarized undertaking or prescribed owner-PCO equivalent."),
    d("commitment", "Notarized Joint Affidavit of Commitment", "Some regions, including XII and IV-A, specifically request this separate renewal document.", "regional")
  ]),
  s("05", "Submit, correct, pay and upload receipt", "Submit renewal through PCO Online; monitor the evaluator's comments, then pay only against an issued Order of Payment.", [
    d("submit-renew", "Renewal tracking/reference number", "Save the online submission confirmation.", "action"),
    d("fix-renew", "Evaluator-requested corrections (if any)", "Upload only the missing or corrected evidence requested by EMB.", "conditional"),
    d("oop-renew", "Order of Payment", "Download the notice after the evaluator sends it."),
    d("or-renew", "Official Receipt of ₱500 renewal fee and uploaded proof", "Payment method and other charges may depend on EMB regional office.")
  ]),
  s("06", "Save renewed accreditation and restart your log", "Download the renewed certificate, confirm dates and retain compliance and training documentation for the next cycle.", [
    d("coa-renew", "Approved renewed Certificate of Accreditation", "Retain digital and printed copies and check the expiry date."),
    d("plan-renew", "Updated renewal calendar and compliance evidence folder", "Track PCO/Managing Head duties, required SMR/CMR and future training.", "action")
  ])
];

const cluster = [
  s("01", "Request approval for multi-site / cluster setup", "Clustering is not an automatic entitlement. DAO 2014-02 §7.1 and regional assessment determine whether a single PCO can serve multiple installations.", [
    d("cluster-request", "Formal letter requesting cluster / multi-installation approval", "Identify each installation and explain why one PCO is appropriate; seek a written EMB regional decision."),
    d("cluster-sites", "Schedule of installations, addresses, regions and activities", "Describe air sources, wastewater amounts, hazardous wastes and the proposed PCO coverage."),
    d("cluster-category", "Establishment categorization details for each site", "Supporting classification forms or operational data as requested.", "regional"),
    d("cluster-approval", "EMB-approved clustering request / approval letter", "Region XII lists an approved letter for clustered PCO applications.")
  ]),
  s("02", "Prepare the common new-accreditation documents", "The PCO and managing head generally complete the standard training and personal requirements in addition to cluster approvals.", [
    d("cluster-crs", "CRS company record / linked establishments", "Confirm that each installation and relevant company record is correctly represented.", "regional"),
    d("cluster-appoint", "PCO appointment/designation letter covering the proposed sites", "Include effective date, names of covered installations and managing-head signature."),
    d("cluster-coe", "Certificate of full-time employment and relevant experience", "Document the PCO's employment and qualifications."),
    d("cluster-cv", "CV, 2×2 photo and e-signature", "Upload current profile/identity files."),
    d("cluster-tor", "Diploma/TOR and PRC license if applicable", "Evidence for the highest applicable establishment category."),
    d("cluster-40", "40-hour Basic PCO training certificate", "From an EMB-recognized training organization, within three years for a new application."),
    d("cluster-8", "8-hour managing-head training certificate", "Provide the managing head's required training evidence."),
    d("cluster-aff", "Notarized cluster/joint undertaking affidavit", "Use the approved cluster-specific regional pro-forma.")
  ]),
  s("03", "Submit cluster accreditation and collect the certificate", "Use the cluster option in the PCO Online System where offered and retain the evaluation and payment trail.", [
    d("cluster-form", "Completed PCO Online 'New Cluster' application", "Attach the cluster approval and standard documentary package."),
    d("cluster-ack", "Submission receipt and evaluator corrections (if any)", "Keep the application ID and any revised attachments.", "action"),
    d("cluster-oop", "Order of Payment", "Wait for the formal fee assessment."),
    d("cluster-or", "Official Receipt and uploaded payment proof", "The published PCO accreditation fee is ₱500; ask whether regional/cluster charges differ."),
    d("cluster-coa", "Approved PCO certificate specifying authorized site coverage", "Verify the certificate covers each approved installation.")
  ])
];

const replacement = [
  s("01", "Notify EMB and designate interim responsibilities", "When a PCO resigns/is terminated, DAO 2014-02 §9 requires written notice to EMB within 15 calendar days and accreditation for the replacement within 30 calendar days.", [
    d("resignation", "Resignation, termination or departure record", "Document the former PCO's effective departure date for the timeline.", "conditional"),
    d("notice", "Written notice to the concerned EMB regional office", "Report departure within 15 calendar days; keep the received/acknowledged letter."),
    d("interim", "Interim PCO designation / managing-head assumption", "Managing head assumes responsibility until replacement is accredited (or next-highest Filipino officer if managing head is foreign).", "action"),
    d("replace-appoint", "Signed appointment of replacement PCO", "Include role, establishment name, effective date and managing-head signature.")
  ]),
  s("02", "Submit a new accreditation package for the replacement", "Accreditation is personal and establishment-linked: moving to another company normally requires new accreditation.", [
    d("replace-40", "Replacement PCO's 40-hour Basic PCO training certificate", "Recognized training within the last three years."),
    d("replace-8", "Managing Head's 8-hour training certificate", "Attach proof of the managing head's training."),
    d("replace-coe", "Full-time certificate of employment", "Confirm replacement's employment with this establishment."),
    d("replace-cv", "Updated CV and photo / e-signature", "Include relevant environmental education and experience."),
    d("replace-tor", "Diploma/TOR and Category B PRC license where applicable", "Submit qualification proofs demanded by the region."),
    d("replace-aff", "Notarized PCO + managing head Joint Undertaking", "Use the region's approved new-PCO format."),
    d("replace-form", "Completed PCO New Application and uploads", "Follow PCO Online submission and keep the tracking ID.")
  ]),
  s("03", "Pay, finalize and restore records", "Follow the same evaluation, Order of Payment, official receipt and approval process as a new application.", [
    d("replace-oop", "EMB Order of Payment and ₱500 official receipt", "Payment is made when assessed, not before."),
    d("replace-coa", "New approved PCO accreditation certificate", "Confirm the new PCO and correct establishment details."),
    d("replace-log", "Updated internal permits, reports and compliance contacts", "Replace references to the departed PCO in the company's records.", "action")
  ])
];

export const guides = { new: first, renewal: renew, cluster, replacement };
export const faq = [
  { q: "Is passing an exam the accreditation process?", a: "No universal separate government PCO accreditation exam is prescribed by DAO 2014-02. The process requires qualifications, recognized training, proper employer designation, documents and EMB approval. Your reviewer helps with learning; it does not itself issue PCO accreditation." },
  { q: "Does training alone make me an accredited PCO?", a: "No. Complete the application and receive an official EMB Certificate of Accreditation. A certificate of training is just one of the requirements." },
  { q: "Category A versus Category B?", a: "Category A generally means less significant pollution potential; Category B involves higher-risk wastes, emissions, discharge or facilities. The exact criteria are under DAO 2014-02, §5 and should be assessed with EMB. Category B requires stronger qualification/experience." },
  { q: "Can the owner act as PCO?", a: "For Category A, an eligible owner/manager may act as PCO under §7 even without a specific professional degree, provided the basic qualifications and training are met. Use the proper owner-PCO affidavit and ownership evidence when requested." },
  { q: "Do I need an ECC, air PTO and water discharge permit to apply?", a: "Not every establishment needs all three. Each environmental permit is a separate facility-specific obligation; compliance copies may be requested for renewal or to evaluate pollution risk. Do not mark non-applicable permits as mandatory." },
  { q: "What if I have several sites?", a: "Ask EMB first. §7.1 generally requires at least one PCO per region and may require separate PCOs for significant discharges/emission-testing facilities. Cluster coverage needs regional assessment and approval." },
  { q: "How long does EMB approval take?", a: "DAO 2014-02 mentions 15 calendar days for action on received applications, while some recent regional Citizen's Charters describe about 14–15 working days for complete online transactions. Deficiencies and payment delays can add time. Follow your EMB region's current charter." },
  { q: "How much and how long is it valid?", a: "The standard accreditation or renewal fee published in DAO 2014-02 is ₱500, excluding any regional processing/documentary-stamp or payment-channel charge. PCO accreditation is generally valid for three years." },
  { q: "What are my obligations after approval?", a: "Monitor applicable ECC/permit compliance, hazardous waste, emissions and wastewater; submit the required Self-Monitoring Reports and other applicable reports; report serious incidents promptly; maintain training and compliance records for renewal." }
];
