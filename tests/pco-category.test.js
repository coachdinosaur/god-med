import test from "node:test";
import assert from "node:assert/strict";
import {assessCategoryB, defaultAnswers, CRITERIA_SOURCE} from "../pco/accreditation/category-classifier.js";

test("no data never receives an affirmative Category A verdict", () => {
  const r = assessCategoryB();
  assert.equal(r.status, "no-trigger");
  assert.equal(r.triggers.length, 0);
  assert.ok(r.unknown.length > 0);
  assert.match(r.message, /does NOT certify Category A/);
});

test("priority chemicals trigger Category B regardless of recorded quantity", () => {
  const r = assessCategoryB({priorityChemicals:"yes"});
  assert.equal(r.status, "b-indicated");
  assert.ok(r.triggers.some(x=>x.key==="priorityChemicals"));
});
test("hazardous-waste generator follows Annex 2 classification", () => {
  assert.equal(assessCategoryB({hazardousWaste:"large"}).status,"b-indicated");
  assert.equal(assessCategoryB({hazardousWaste:"small"}).triggers.length,0);
  assert.equal(assessCategoryB({hazardousFacility:"yes"}).status,"b-indicated");
});
test("30 cubic metres wastewater per day is inclusive threshold", () => {
  assert.equal(assessCategoryB({wastewaterM3:"30"}).status,"b-indicated");
  assert.equal(assessCategoryB({wastewaterM3:"29.999"}).triggers.length,0);
  assert.equal(assessCategoryB({wastewaterM3:"0"}).triggers.length,0);
});
test("strong wastewater uses influent BOD threshold of at least 3000", () => {
  assert.equal(assessCategoryB({bodMgL:"3000"}).status,"b-indicated");
  assert.equal(assessCategoryB({bodMgL:"2999"}).triggers.length,0);
});
test("Annex 3 parameters trigger B even at low wastewater volume", () => {
  const r = assessCategoryB({wastewaterM3:"2",annex3Effluent:"yes"});
  assert.ok(r.triggers.some(x=>x.key==="annex3Effluent"));
});
test("air classification and required stack sampling each trigger B", () => {
  assert.equal(assessCategoryB({airClass:"yes"}).status,"b-indicated");
  assert.equal(assessCategoryB({stackSampling:"yes"}).status,"b-indicated");
});
test("air equipment thresholds are review flags, not unsupported automatic B classification", () => {
  for(const [key,value] of [["boilerHp","50"],["generatorKw","300"],["otherAirTons","10"]]){
    const r=assessCategoryB({[key]:value});
    assert.equal(r.status,"air-review");
    assert.equal(r.triggers.length,0);
    assert.ok(r.review.some(x=>x.key===key));
  }
  assert.equal(assessCategoryB({boilerHp:"49.99",generatorKw:"299",otherAirTons:"9.99"}).review.length,0);
});
test("sludge, sewage and solid-waste treatment are separate Category B triggers", () => {
  for(const key of ["sludgeOperator","wastewaterOperator","solidFacility"]){
    assert.ok(assessCategoryB({[key]:"yes"}).triggers.some(x=>x.key===key));
  }
});
test("uncertainty persists if inputs are missing or invalid", () => {
  assert.ok(assessCategoryB({wastewaterM3:""}).unknown.includes("Daily wastewater discharge volume"));
  assert.ok(assessCategoryB({bodMgL:"-20"}).unknown.includes("Influent BOD concentration"));
  assert.equal(assessCategoryB({wastewaterM3:"garbage",bodMgL:"Infinity"}).triggers.length,0);
});
test("multiple independent positive answers show multiple grounds", () => {
  const r=assessCategoryB({priorityChemicals:"yes",wastewaterM3:"30",sludgeOperator:"yes"});
  assert.equal(r.triggers.length,3);
  assert.ok(r.triggers.every(x=>x.label&&x.reason&&x.evidence));
});
test("data source points to the original national administrative order", () => {
  assert.match(CRITERIA_SOURCE,/\.pdf$/);
  assert.ok(Object.isFrozen(defaultAnswers));
});
