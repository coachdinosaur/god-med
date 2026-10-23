import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { shuffle, pickQuestions, scorePct } from "../pco/quiz.js";

const data = JSON.parse(readFileSync(new URL("../pco/data.json", import.meta.url), "utf8"));
const topicIds = new Set(data.topics.map((t) => t.id));

test("every question is well formed", () => {
  const ids = new Set();
  for (const q of data.questions) {
    assert.ok(!ids.has(q.id), `duplicate question id ${q.id}`);
    ids.add(q.id);
    assert.ok(topicIds.has(q.topic), `unknown topic on question ${q.id}`);
    assert.equal(q.choices.length, 4, `question ${q.id} needs 4 choices`);
    assert.equal(new Set(q.choices).size, 4, `question ${q.id} has duplicate choices`);
    assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, `question ${q.id} answer out of range`);
    assert.ok(q.q.trim() && q.why.trim(), `question ${q.id} is missing text`);
  }
});

test("every card is well formed", () => {
  const ids = new Set();
  for (const c of data.cards) {
    assert.ok(!ids.has(c.id), `duplicate card id ${c.id}`);
    ids.add(c.id);
    assert.ok(topicIds.has(c.topic), `unknown topic on card ${c.id}`);
    assert.ok(c.q.trim() && c.a.trim(), `card ${c.id} is missing text`);
  }
});

test("sources are https links", () => {
  assert.ok(data.sources.length > 0);
  for (const s of data.sources) assert.match(s.url, /^https:\/\//);
});

test("shuffle keeps all items and does not mutate the input", () => {
  const input = [1, 2, 3, 4, 5];
  const out = shuffle(input);
  assert.deepEqual([...out].sort(), [1, 2, 3, 4, 5]);
  assert.deepEqual(input, [1, 2, 3, 4, 5]);
});

test("pickQuestions filters by topic and caps the count", () => {
  const air = pickQuestions(data.questions, "air", "all");
  assert.ok(air.length > 0 && air.every((q) => q.topic === "air"));
  assert.equal(pickQuestions(data.questions, "all", "10").length, 10);
  assert.equal(pickQuestions(data.questions, "laws", "10").length, data.questions.filter((q) => q.topic === "laws").length);
  assert.equal(pickQuestions(data.questions, "all", "all").length, data.questions.length);
});

test("scorePct rounds and handles zero", () => {
  assert.equal(scorePct(7, 10), 70);
  assert.equal(scorePct(1, 3), 33);
  assert.equal(scorePct(0, 0), 0);
});
