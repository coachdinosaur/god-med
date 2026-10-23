import { shuffle, pickQuestions, scorePct, recordAnswer, matchSegments, keyToChoice } from "./quiz.js";

const KEY = "pco.v1";
const $ = (id) => document.getElementById(id);

const blank = () => ({ known: [], missed: [], best: null, runs: 0, stats: {}, tab: "Notes", mode: "practice" });
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (s && typeof s === "object") return { ...blank(), ...s };
  } catch { /* fresh state */ }
  return blank();
}
let state = load();
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage blocked */ } };

let data = null;

/* ---------- tabs ---------- */
const TABS = ["Notes", "Cards", "Quiz"];
function showTab(name) {
  for (const t of TABS) {
    const on = t === name;
    $("view" + t).hidden = !on;
    $("tab" + t).classList.toggle("active", on);
    $("tab" + t).setAttribute("aria-selected", String(on));
  }
  state.tab = name;
  save();
  window.scrollTo(0, 0);
}
const currentTab = () => TABS.find((t) => !$("view" + t).hidden);
for (const t of TABS) $("tab" + t).addEventListener("click", () => showTab(t));

/* ---------- notes ---------- */
function buildNotes() {
  const box = $("notes");
  box.textContent = "";
  for (const t of data.topics) {
    const det = document.createElement("details");
    const sum = document.createElement("summary");
    const name = document.createElement("span");
    name.textContent = t.title;
    const cnt = document.createElement("span");
    cnt.className = "cnt";
    cnt.textContent = String(t.points.length);
    sum.append(name, cnt);
    const ul = document.createElement("ul");
    for (const p of t.points) {
      const li = document.createElement("li");
      const para = document.createElement("p");
      para.className = "vtext";
      para.dataset.text = p;
      para.textContent = p;
      li.appendChild(para);
      ul.appendChild(li);
    }
    det.append(sum, ul);
    box.appendChild(det);
  }
  const empty = document.createElement("p");
  empty.className = "empty";
  empty.id = "noteEmpty";
  empty.hidden = true;
  empty.textContent = "No notes match your search.";
  box.appendChild(empty);
}

function filterNotes() {
  const q = $("noteSearch").value;
  let hits = 0;
  for (const det of $("notes").querySelectorAll("details")) {
    let inTopic = 0;
    for (const para of det.querySelectorAll("p.vtext")) {
      const segs = matchSegments(para.dataset.text, q);
      para.closest("li").hidden = !segs;
      para.textContent = "";
      for (const s of segs || [{ text: para.dataset.text, hit: false }]) {
        if (s.hit) {
          const m = document.createElement("mark");
          m.textContent = s.text;
          para.appendChild(m);
        } else {
          para.appendChild(document.createTextNode(s.text));
        }
      }
      if (segs) inTopic += 1;
    }
    det.hidden = inTopic === 0;
    det.querySelector(".cnt").textContent = String(inTopic);
    if (q.trim()) det.open = inTopic > 0;
    hits += inTopic;
  }
  $("noteEmpty").hidden = hits > 0;
  $("noteCount").textContent = q.trim() ? `${hits} match${hits === 1 ? "" : "es"}` : "";
}
$("noteSearch").addEventListener("input", filterNotes);
$("expandAll").addEventListener("click", () => { for (const d of $("notes").querySelectorAll("details")) d.open = true; });
$("collapseAll").addEventListener("click", () => { for (const d of $("notes").querySelectorAll("details")) d.open = false; });

function fillTopicSelect(sel) {
  sel.textContent = "";
  const all = document.createElement("option");
  all.value = "all";
  all.textContent = "All topics";
  sel.appendChild(all);
  for (const t of data.topics) {
    const o = document.createElement("option");
    o.value = t.id;
    o.textContent = t.title.replace(/\s*\(.*\)$/, "");
    sel.appendChild(o);
  }
}

/* ---------- flashcards ---------- */
let deck = [];
let di = 0;
let flipped = false;

function buildDeck() {
  const t = $("cardTopic").value;
  const hide = $("cardOnlyNew").checked;
  deck = shuffle(data.cards.filter((c) => (t === "all" || c.topic === t) && (!hide || !state.known.includes(c.id))));
  di = 0;
  flipped = false;
  renderCard();
}

function renderCard() {
  const total = data.cards.filter((c) => $("cardTopic").value === "all" || c.topic === $("cardTopic").value).length;
  const known = data.cards.filter((c) => ($("cardTopic").value === "all" || c.topic === $("cardTopic").value) && state.known.includes(c.id)).length;
  $("cardCount").textContent = `${known} of ${total} known`;
  const card = $("card");
  if (!deck.length) {
    card.classList.remove("back-side");
    $("cardSide").textContent = "Done";
    $("cardText").textContent = "No cards left in this set. Reset known cards or change the topic.";
    $("cardHint").textContent = "";
    $("cardGot").disabled = true;
    $("cardAgain").disabled = true;
    return;
  }
  $("cardGot").disabled = false;
  $("cardAgain").disabled = false;
  const c = deck[di % deck.length];
  card.classList.toggle("back-side", flipped);
  $("cardSide").textContent = flipped ? "Answer" : "Question";
  $("cardText").textContent = flipped ? c.a : c.q;
  $("cardHint").textContent = flipped ? "Tap to flip back" : "Tap to flip";
}

function nextCard(markKnown) {
  if (!deck.length) return;
  const c = deck[di % deck.length];
  if (markKnown) {
    if (!state.known.includes(c.id)) state.known.push(c.id);
    deck.splice(di % deck.length, 1);
    if (di >= deck.length) di = 0;
  } else {
    state.known = state.known.filter((id) => id !== c.id);
    di += 1;
  }
  save();
  flipped = false;
  renderCard();
}

$("card").addEventListener("click", () => { if (deck.length) { flipped = !flipped; renderCard(); } });
$("cardGot").addEventListener("click", () => nextCard(true));
$("cardAgain").addEventListener("click", () => nextCard(false));
$("cardTopic").addEventListener("change", buildDeck);
$("cardOnlyNew").addEventListener("change", buildDeck);
$("cardReset").addEventListener("click", () => { state.known = []; save(); buildDeck(); });


/* ---------- quiz ---------- */
let run = null; // { qs, i, right, missed: [], exam, answered }

const MODE_HINT = {
  practice: "Practice: see the right answer and explanation after each question.",
  exam: "Exam: no feedback until the end, like the real test.",
};

function showQuiz(part) {
  $("quizSetup").hidden = part !== "setup";
  $("quizRun").hidden = part !== "run";
  $("quizEnd").hidden = part !== "end";
}

function renderStats() {
  const list = $("stats");
  list.textContent = "";
  for (const t of data.topics) {
    const s = state.stats[t.id];
    const li = document.createElement("li");
    const top = document.createElement("div");
    top.className = "top-line";
    const name = document.createElement("span");
    name.textContent = t.title.replace(/\s*\(.*\)$/, "");
    const pct = document.createElement("span");
    const meter = document.createElement("div");
    meter.className = "meter";
    const fill = document.createElement("i");
    if (s && s.total) {
      const p = scorePct(s.right, s.total);
      pct.className = `pct ${p >= 75 ? "high" : p >= 50 ? "mid" : "low"}`;
      pct.textContent = `${p}% · ${s.right}/${s.total}`;
      fill.style.width = `${p}%`;
    } else {
      pct.className = "pct none";
      pct.textContent = "not tried";
      fill.style.width = "0";
    }
    meter.appendChild(fill);
    top.append(name, pct);
    li.append(top, meter);
    list.appendChild(li);
  }
}

function renderBest() {
  $("bestNum").textContent = state.best == null ? "–" : `${state.best}%`;
  const n = state.missed.length;
  $("quizMissed").disabled = n === 0;
  $("quizMissed").textContent = n ? `Retry missed (${n})` : "Retry missed";
  $("quizInfo").textContent = state.runs ? `${state.runs} quiz${state.runs === 1 ? "" : "zes"} taken` : "Pick a topic and start.";
  $("modeHint").textContent = MODE_HINT[$("quizMode").value];
  renderStats();
}

function startQuiz(onlyMissed) {
  const t = $("quizTopic").value;
  const cnt = $("quizCount").value;
  const pool = onlyMissed ? data.questions.filter((q) => state.missed.includes(q.id)) : data.questions;
  const picked = pickQuestions(pool, onlyMissed ? "all" : t, onlyMissed ? "all" : cnt);
  if (!picked.length) return;
  run = {
    qs: picked.map((q) => ({
      ...q,
      opts: shuffle(q.choices.map((text, idx) => ({ text, ok: idx === q.answer }))),
    })),
    i: 0, right: 0, missed: [],
    exam: $("quizMode").value === "exam",
    answered: false,
  };
  showQuiz("run");
  renderQuestion();
}

function renderQuestion() {
  const q = run.qs[run.i];
  run.answered = false;
  $("quizProgress").textContent = `Question ${run.i + 1} of ${run.qs.length}${run.exam ? " · Exam" : ""}`;
  $("quizBar").style.width = `${(run.i / run.qs.length) * 100}%`;
  $("qText").textContent = q.q;
  $("why").hidden = true;
  $("quizNext").hidden = true;
  const box = $("choices");
  box.textContent = "";
  q.opts.forEach((o, n) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "choice";
    b.textContent = `${String.fromCharCode(65 + n)}. ${o.text}`;
    b.addEventListener("click", () => answer(n));
    box.appendChild(b);
  });
  window.scrollTo(0, 0);
}

function answer(n) {
  if (run.answered) return;
  run.answered = true;
  const q = run.qs[run.i];
  const ok = q.opts[n].ok;
  const buttons = [...$("choices").children];
  buttons.forEach((b) => { b.disabled = true; });
  if (run.exam) {
    buttons[n].classList.add("picked");
  } else {
    buttons.forEach((b, k) => { if (q.opts[k].ok) b.classList.add("right"); });
    if (!ok) buttons[n].classList.add("wrong");
    $("why").textContent = q.why;
    $("why").hidden = false;
  }
  if (ok) {
    run.right += 1;
    state.missed = state.missed.filter((id) => id !== q.id);
  } else {
    run.missed.push({ ...q, picked: q.opts[n].text });
    if (!state.missed.includes(q.id)) state.missed.push(q.id);
  }
  state.stats = recordAnswer(state.stats, q.topic, ok);
  save();
  $("quizNext").textContent = run.i + 1 >= run.qs.length ? "See results" : "Next";
  $("quizNext").hidden = false;
  $("quizNext").focus();
}

function nextQuestion() {
  if (!run || !run.answered) return;
  run.i += 1;
  if (run.i >= run.qs.length) finishQuiz(); else renderQuestion();
}

function finishQuiz() {
  const pct = scorePct(run.right, run.qs.length);
  state.runs += 1;
  if (run.qs.length >= 10 && (state.best == null || pct > state.best)) state.best = pct;
  save();
  $("quizBar").style.width = "100%";
  $("score").textContent = `${run.right} / ${run.qs.length}`;
  $("scorePct").textContent = `${pct}%${run.exam ? " · exam" : ""}`;
  const list = $("missedList");
  list.textContent = "";
  if (!run.missed.length) {
    const li = document.createElement("li");
    li.textContent = "No mistakes. Nice work.";
    list.appendChild(li);
  }
  for (const q of run.missed) {
    const li = document.createElement("li");
    const a = document.createElement("div");
    a.className = "mq";
    a.textContent = q.q;
    const y = document.createElement("div");
    y.className = "mw";
    y.textContent = `Your answer: ${q.picked}`;
    const b = document.createElement("div");
    b.className = "ma";
    b.textContent = `Answer: ${q.choices[q.answer]}`;
    const c = document.createElement("div");
    c.className = "mw";
    c.textContent = q.why;
    li.append(a, y, b, c);
    list.appendChild(li);
  }
  renderBest();
  showQuiz("end");
  window.scrollTo(0, 0);
}

$("quizNext").addEventListener("click", nextQuestion);
$("quizStart").addEventListener("click", () => startQuiz(false));
$("quizMissed").addEventListener("click", () => startQuiz(true));
$("quizAgain").addEventListener("click", () => { showQuiz("setup"); renderBest(); });
$("quizMode").addEventListener("change", () => {
  state.mode = $("quizMode").value;
  save();
  $("modeHint").textContent = MODE_HINT[state.mode];
});
$("statsReset").addEventListener("click", () => {
  state.stats = {};
  state.missed = [];
  state.best = null;
  state.runs = 0;
  save();
  renderBest();
});

/* ---------- keyboard ---------- */
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const tag = (e.target.tagName || "").toLowerCase();
  if (tag === "input" || tag === "select" || tag === "textarea") return;
  const tab = currentTab();
  if (tab === "Cards") {
    if (e.key === " " && e.target !== $("card")) { e.preventDefault(); $("card").click(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); nextCard(true); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); nextCard(false); }
  } else if (tab === "Quiz" && !$("quizRun").hidden && run) {
    const n = keyToChoice(e.key);
    if (n !== -1 && n < run.qs[run.i].opts.length) { e.preventDefault(); answer(n); }
    else if (e.key === "Enter" && e.target !== $("quizNext")) { e.preventDefault(); nextQuestion(); }
  }
});

/* ---------- init ---------- */
async function init() {
  try {
    const res = await fetch("data.json");
    if (!res.ok) throw new Error(String(res.status));
    data = await res.json();
  } catch {
    $("notes").textContent = "Could not load the reviewer data. Check your connection and reload.";
    return;
  }
  buildNotes();
  fillTopicSelect($("cardTopic"));
  fillTopicSelect($("quizTopic"));
  for (const s of data.sources) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = s.url;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = s.title;
    li.appendChild(a);
    $("sources").appendChild(li);
  }
  if (state.mode === "exam" || state.mode === "practice") $("quizMode").value = state.mode;
  buildDeck();
  renderBest();
  if (TABS.includes(state.tab) && state.tab !== "Notes") showTab(state.tab);
}
init();
