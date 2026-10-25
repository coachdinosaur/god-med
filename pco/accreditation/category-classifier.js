/**
 * Educational screening against DENR DAO 2014-02 §5, Table 1.
 * NOT an official EMB classification. A single positive Table 1 criterion
 * can indicate Category B; uncertain answers never establish Category A.
 * Sources: https://apidb.denr.gov.ph/infores/uploads/rmdd/dao-2014-02.pdf
 *          https://r3.emb.gov.ph/wp-content/uploads/2022/10/Establishment-Categorization.pdf
 */
export const CRITERIA_SOURCE = "https://apidb.denr.gov.ph/infores/uploads/rmdd/dao-2014-02.pdf";
export const EMB_CATEGORIZATION = "https://r3.emb.gov.ph/wp-content/uploads/2022/10/Establishment-Categorization.pdf";

export const defaultAnswers = Object.freeze({
  business: "",
  priorityChemicals: "unknown",
  hazardousWaste: "unknown",
  hazardousFacility: "unknown",
  airClass: "unknown",
  stackSampling: "unknown",
  boilerHp: "",
  generatorKw: "",
  otherAirTons: "",
  solidFacility: "unknown",
  wastewaterM3: "",
  annex3Effluent: "unknown",
  bodMgL: "",
  wastewaterOperator: "unknown",
  sludgeOperator: "unknown"
});
const numberOrNull = (raw) => {
  if (raw === "" || raw == null || String(raw).trim() === "") return null;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : null;
};

export function assessCategoryB(answers = {}) {
  const a = { ...defaultAnswers, ...answers };
  const triggers = [], review = [], unknown = [];
  const yes = (key, label, reason, evidence) => {
    if (a[key] === "yes") triggers.push({ key, label, reason, evidence });
    else if (a[key] === "unknown") unknown.push(label);
  };
  yes("priorityChemicals", "Annex 1 priority chemicals",
    "Using, storing or handling a chemical listed in DAO 2014-02 Annex 1 is a Category B criterion regardless of quantity.",
    "Inventory and safety data sheets (SDS); identify the precise Annex 1 chemical.");
  if (a.hazardousWaste === "large") triggers.push({
    key: "hazardousWaste", label: "Large-quantity hazardous waste generator",
    reason: "Large-quantity status under Annex 2 qualifies as Category B; the threshold depends on waste type and annual quantity.",
    evidence: "Waste-generator registration and annual generation records matched to Annex 2."
  });
  else if (a.hazardousWaste === "unknown") unknown.push("Hazardous-waste quantity / Annex 2 class");
  yes("hazardousFacility", "Accredited waste transporter or TSD facility",
    "An accredited hazardous-waste transporter or treatment, storage and disposal (TSD) facility meets the Category B criterion.",
    "Relevant transporter or TSD accreditation and operating records.");
  yes("airClass", "EMB MC 2007-003 air-source category",
    "An air-emission source classified as small, medium, large or environmentally significant under EMB MC 2007-003 is Category B.",
    "Air inventory, permitting details and MC 2007-003 source classification.");
  yes("stackSampling", "Required stack sampling",
    "Being required to conduct stack sampling is an independent Category B criterion.",
    "Permit to Operate, air-emissions sampling requirements or EMB instruction.");
  yes("solidFacility", "Centralized solid-waste / landfill facility",
    "A centralized MRF, solid-waste treatment/processing facility, or sanitary landfill falls under Category B.",
    "Facility classification, permits and operating description.");
  yes("annex3Effluent", "Annex 3 effluent parameter",
    "Wastewater with an effluent quality parameter listed in DAO 2014-02 Annex 3 meets the Category B criterion, regardless of volume.",
    "Wastewater laboratory analysis against the parameters listed in Annex 3.");
  yes("wastewaterOperator", "Wastewater / sewage / septage transporter or treater",
    "Transporting or treating wastewater, sewage or septage qualifies under Table 1.",
    "Business activity and operating permits for wastewater/septage services.");
  yes("sludgeOperator", "Sludge transporter or treater",
    "Transporting or treating sludge is a Category B criterion.",
    "Sludge handling activities, manifests or relevant permit documentation.");

  const volume = numberOrNull(a.wastewaterM3);
  if (volume !== null && volume >= 30) triggers.push({
    key: "wastewaterM3", label: "Wastewater discharge ≥ 30 m³/day",
    reason: "Daily wastewater discharge equal to or greater than 30 cubic meters is a Category B criterion.",
    evidence: "Water balance, flowmeter records and discharge-volume calculations."
  });
  else if (volume === null) unknown.push("Daily wastewater discharge volume");
  const bod = numberOrNull(a.bodMgL);
  if (bod !== null && bod >= 3000) triggers.push({
    key: "bodMgL", label: "Strong wastewater (influent BOD ≥ 3,000 mg/L)",
    reason: "The Table 1 strong-wastewater threshold uses INFLUENT BOD, not treated-effluent BOD.",
    evidence: "Influent wastewater sampling/laboratory report showing BOD in mg/L."
  });
  else if (bod === null) unknown.push("Influent BOD concentration");

  // Numerical air cutoffs are screening clues, not a substitute for actual
  // EMB MC 2007-003 classification or a written stack-sampling requirement.
  const boiler = numberOrNull(a.boilerHp);
  const generator = numberOrNull(a.generatorKw);
  const airTons = numberOrNull(a.otherAirTons);
  if (boiler !== null && boiler >= 50) review.push({
    key: "boilerHp", label: "Boiler rated ≥ 50 HP",
    reason: "A 50-HP or larger boiler crosses the Category A size band. Verify its air-source category under EMB MC 2007-003.",
    evidence: "Boiler nameplate, rated horsepower and air Permit to Operate."
  });
  if (generator !== null && generator >= 300) review.push({
    key: "generatorKw", label: "Generator rated ≥ 300 kW",
    reason: "A generator at or above 300 kW crosses the Category A size band. Confirm the MC 2007-003 category and stack-sampling duty.",
    evidence: "Generator nameplate, rated kilowatts and air Permit to Operate."
  });
  if (airTons !== null && airTons >= 10) review.push({
    key: "otherAirTons", label: "Other source potential emissions ≥ 10 tonnes/year",
    reason: "At or above 10 tonnes per year of a regulated pollutant, the source exceeds the Category A air threshold; verify the EMB classification.",
    evidence: "Regulated-pollutant potential-to-emit calculations and air permit."
  });
  if (boiler === null || generator === null || airTons === null) {
    unknown.push("Air-source capacities or potential emissions (where applicable)");
  }

  const status = triggers.length ? "b-indicated" : review.length ? "air-review" : "no-trigger";
  const title = status === "b-indicated" ? "Category B is indicated"
    : status === "air-review" ? "Possible Category B — verify air classification"
    : "No Category B trigger confirmed";
  const message = status === "b-indicated"
    ? "One or more of your answers meets a Category B criterion in DAO 2014-02 Table 1. Check the evidence and ask your EMB Regional Office for the formal classification."
    : status === "air-review"
    ? "Your reported equipment or emissions crosses a Category A air-source cutoff. Confirm the actual source class or stack-sampling obligation with EMB; equipment size alone is not an official decision."
    : "None of your provided answers establishes Category B. This does NOT certify Category A: unanswered criteria, permits and the actual establishment activity must still be checked by EMB.";
  return { status, title, message, triggers, review, unknown, answers: a };
}
