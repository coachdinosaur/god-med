// Pure quiz helpers (no DOM) so they can be unit tested in Node.

/** Fisher-Yates shuffle; returns a new array. */
export function shuffle(items, rand = Math.random) {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick questions for a run: filter by topic, shuffle, cap at count ("all" = no cap). */
export function pickQuestions(pool, topic, count, rand = Math.random) {
  const filtered = pool.filter((q) => topic === "all" || q.topic === topic);
  const mixed = shuffle(filtered, rand);
  const n = count === "all" ? mixed.length : Math.min(Number(count) || mixed.length, mixed.length);
  return mixed.slice(0, n);
}

export function scorePct(right, total) {
  return total ? Math.round((right / total) * 100) : 0;
}

/** Add one answer to per-topic stats. Returns a new stats object. */
export function recordAnswer(stats, topic, correct) {
  const cur = stats[topic] || { right: 0, total: 0 };
  return { ...stats, [topic]: { right: cur.right + (correct ? 1 : 0), total: cur.total + 1 } };
}

/**
 * Split text into [{ text, hit }] segments for highlighting a case-insensitive query.
 * Returns null when the query is non-empty and not found.
 */
export function matchSegments(text, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [{ text, hit: false }];
  const lower = text.toLowerCase();
  if (!lower.includes(q)) return null;
  const out = [];
  let i = 0;
  for (let j = lower.indexOf(q); j !== -1; j = lower.indexOf(q, i)) {
    if (j > i) out.push({ text: text.slice(i, j), hit: false });
    out.push({ text: text.slice(j, j + q.length), hit: true });
    i = j + q.length;
  }
  if (i < text.length) out.push({ text: text.slice(i), hit: false });
  return out;
}

/** Map a key press to a choice index (1-4 or a-d), or -1. */
export function keyToChoice(key) {
  const k = String(key).toLowerCase();
  const n = "1234".indexOf(k);
  if (n !== -1 && k.length === 1) return n;
  const a = "abcd".indexOf(k);
  return a !== -1 && k.length === 1 ? a : -1;
}
