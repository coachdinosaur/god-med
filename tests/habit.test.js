import test from "node:test";
import assert from "node:assert/strict";
import {
  dayKey, shiftKey, hasListenedEnough, markVerseDone, isDayComplete,
  computeStreak, computeBestStreak, monthCells, doneCount,
} from "../habit.js";

const empty = () => ({ days: {} });

test("dayKey uses local date", () => {
  assert.equal(dayKey(new Date(2026, 0, 5, 23, 59)), "2026-01-05");
  assert.equal(dayKey(new Date(2026, 0, 6, 0, 0)), "2026-01-06");
});

test("shiftKey crosses month and year boundaries", () => {
  assert.equal(shiftKey("2026-03-01", -1), "2026-02-28");
  assert.equal(shiftKey("2026-01-01", -1), "2025-12-31");
  assert.equal(shiftKey("2025-12-31", 1), "2026-01-01");
});

test("listen threshold is 95%", () => {
  assert.equal(hasListenedEnough(9.4, 10), false);
  assert.equal(hasListenedEnough(9.5, 10), true);
  assert.equal(hasListenedEnough(5, NaN), false);
  assert.equal(hasListenedEnough(5, 0), false);
});

test("day completes only when all verses are done", () => {
  let s = empty();
  for (let id = 1; id <= 11; id++) s = markVerseDone(s, "2026-10-20", id, 12);
  assert.equal(isDayComplete(s, "2026-10-20"), false);
  s = markVerseDone(s, "2026-10-20", 12, 12);
  assert.equal(isDayComplete(s, "2026-10-20"), true);
});

test("marking the same verse twice does not double count", () => {
  let s = markVerseDone(empty(), "2026-10-20", 3, 12);
  s = markVerseDone(s, "2026-10-20", 3, 12);
  assert.equal(doneCount(s, "2026-10-20"), 1);
});

function complete(s, key) {
  for (let id = 1; id <= 2; id++) s = markVerseDone(s, key, id, 2);
  return s;
}

test("streak counts consecutive days and survives an unfinished today", () => {
  let s = empty();
  s = complete(s, "2026-10-18");
  s = complete(s, "2026-10-19");
  assert.equal(computeStreak(s, "2026-10-20"), 2); // today not done yet
  s = complete(s, "2026-10-20");
  assert.equal(computeStreak(s, "2026-10-20"), 3);
});

test("streak resets after a missed day", () => {
  let s = complete(empty(), "2026-10-17");
  s = complete(s, "2026-10-19");
  assert.equal(computeStreak(s, "2026-10-20"), 1);
  assert.equal(computeStreak(s, "2026-10-21"), 0 + 0);
});

test("best streak", () => {
  let s = empty();
  for (const k of ["2026-10-01", "2026-10-02", "2026-10-03", "2026-10-10", "2026-10-11"]) s = complete(s, k);
  assert.equal(computeBestStreak(s), 3);
});

test("monthCells pads to the weekday of the 1st", () => {
  const cells = monthCells(2026, 9); // October 2026 starts on Thursday
  assert.equal(cells.filter((c) => c === null).length, 4);
  assert.equal(cells.filter(Boolean).length, 31);
  assert.equal(cells[4], "2026-10-01");
});
