// Pure habit logic (no DOM access) so it can be unit tested in Node.

export const LISTEN_THRESHOLD = 0.95;

/** Local-date key "YYYY-MM-DD" (uses the device's local timezone). */
export function dayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Shift a "YYYY-MM-DD" key by a number of days (DST-safe, uses local noon). */
export function shiftKey(key, deltaDays) {
  const [y, m, d] = key.split("-").map(Number);
  return dayKey(new Date(y, m - 1, d + deltaDays, 12));
}

/** Has enough of the verse really been played? */
export function hasListenedEnough(playedSeconds, duration) {
  if (!Number.isFinite(duration) || duration <= 0) return false;
  return playedSeconds >= duration * LISTEN_THRESHOLD;
}

/** Record a verse as listened for a day. Returns a new state object. */
export function markVerseDone(state, key, verseId, total) {
  const day = state.days[key] || { done: [], complete: false };
  const done = day.done.includes(verseId) ? day.done : [...day.done, verseId];
  const complete = day.complete || done.length >= total;
  return { ...state, days: { ...state.days, [key]: { done, complete } } };
}

export function isDayComplete(state, key) {
  return Boolean(state.days[key] && state.days[key].complete);
}

export function doneCount(state, key) {
  return state.days[key] ? state.days[key].done.length : 0;
}

/**
 * Streak of consecutive completed days. If today is not done yet the streak
 * stays alive as long as yesterday was completed.
 */
export function computeStreak(state, todayKey) {
  let cursor = isDayComplete(state, todayKey) ? todayKey : shiftKey(todayKey, -1);
  let streak = 0;
  while (isDayComplete(state, cursor)) {
    streak += 1;
    cursor = shiftKey(cursor, -1);
  }
  return streak;
}

/** Best streak ever recorded. */
export function computeBestStreak(state) {
  const keys = Object.keys(state.days).filter((k) => state.days[k].complete).sort();
  let best = 0;
  let run = 0;
  let prev = null;
  for (const k of keys) {
    run = prev && shiftKey(prev, 1) === k ? run + 1 : 1;
    best = Math.max(best, run);
    prev = k;
  }
  return best;
}

/** Cells for a month grid (Sunday first): null padding then day keys. */
export function monthCells(year, month) {
  const first = new Date(year, month, 1);
  const count = new Date(year, month + 1, 0).getDate();
  const cells = Array(first.getDay()).fill(null);
  for (let d = 1; d <= count; d++) cells.push(dayKey(new Date(year, month, d, 12)));
  return cells;
}
