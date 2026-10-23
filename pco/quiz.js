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
