import {
  dayKey, hasListenedEnough, markVerseDone, isDayComplete, doneCount,
  computeStreak, computeBestStreak, monthCells,
} from "./habit.js";

const STORE_KEY = "godmed.v1";
const $ = (id) => document.getElementById(id);
const player = $("player");

let verses = [];
let state = loadState();
let today = dayKey();
let viewYear = new Date().getFullYear();
let viewMonth = new Date().getMonth();

let currentId = null;      // verse currently loaded in the player
let playAllMode = false;
const played = new Map();  // verseId -> seconds actually listened this session
let lastTime = 0;

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE_KEY));
    if (parsed && parsed.days) return parsed;
  } catch { /* fall through to a fresh state */ }
  return { days: {} };
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch { /* storage full/blocked */ }
}

const audioSrc = (v) => `audio/${String(v.id).padStart(2, "0")}.mp3`;

/* ---------- rendering ---------- */

const CHECK_SVG = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function buildVerses() {
  const list = $("verses");
  list.textContent = "";
  for (const v of verses) {
    const li = document.createElement("li");
    li.className = "verse";
    li.dataset.id = v.id;

    const btn = document.createElement("button");
    btn.className = "play";
    btn.type = "button";
    btn.addEventListener("click", () => togglePlay(v.id, false));

    const body = document.createElement("div");
    const ref = document.createElement("div");
    ref.className = "ref";
    ref.textContent = v.ref;
    const text = document.createElement("p");
    text.className = "vtext";
    text.textContent = v.text;
    const prog = document.createElement("div");
    prog.className = "vprog";
    prog.appendChild(document.createElement("i"));
    body.append(ref, text, prog);

    const tick = document.createElement("div");
    tick.className = "tick";
    tick.innerHTML = CHECK_SVG;

    li.append(btn, body, tick);
    list.appendChild(li);
  }
}

function render() {
  const total = verses.length;
  const key = today;
  const done = doneCount(state, key);
  const complete = isDayComplete(state, key);
  const doneIds = new Set(state.days[key] ? state.days[key].done : []);

  $("todayDate").textContent = new Date().toLocaleDateString(undefined, {
    weekday: "long", month: "long", day: "numeric",
  });
  $("count").textContent = `${done} / ${total} verses listened`;
  $("bar").style.width = total ? `${(done / total) * 100}%` : "0";
  $("progress").setAttribute("aria-valuenow", String(done));
  $("progress").setAttribute("aria-valuemax", String(total));
  $("today").classList.toggle("complete", complete);
  $("doneMsg").hidden = !complete;
  $("dayCheck").setAttribute("aria-hidden", String(!complete));
  $("streakNum").textContent = computeStreak(state, key);
  $("playAll").textContent = playAllMode && !player.paused ? "❚❚ Pause" : complete ? "▶ Listen again" : "▶ Play all";

  for (const li of $("verses").children) {
    const id = Number(li.dataset.id);
    const isPlaying = id === currentId && !player.paused;
    li.classList.toggle("done", doneIds.has(id));
    li.classList.toggle("playing", id === currentId);
    const btn = li.querySelector(".play");
    btn.textContent = isPlaying ? "❚❚" : "▶";
    btn.setAttribute("aria-label", `${isPlaying ? "Pause" : "Play"} ${verses.find((v) => v.id === id).ref}`);
  }
  renderCalendar();
}

function renderCalendar() {
  const total = verses.length || 12;
  $("calTitle").textContent = new Date(viewYear, viewMonth, 1).toLocaleDateString(undefined, {
    month: "long", year: "numeric",
  });
  const grid = $("calGrid");
  grid.textContent = "";
  for (const cell of monthCells(viewYear, viewMonth)) {
    const el = document.createElement("div");
    if (!cell) { grid.appendChild(el); continue; }
    el.className = "day";
    const n = doneCount(state, cell);
    if (isDayComplete(state, cell)) el.classList.add("full");
    else if (n > 0) {
      el.classList.add("partial");
      el.style.setProperty("--pct", `${Math.min(100, (n / total) * 100)}%`);
    }
    if (cell === today) el.classList.add("today-cell");
    const span = document.createElement("span");
    span.textContent = String(Number(cell.slice(8)));
    el.appendChild(span);
    el.title = n ? `${cell}: ${isDayComplete(state, cell) ? "complete" : `${n}/${total}`}` : cell;
    grid.appendChild(el);
  }
  const best = computeBestStreak(state);
  $("best").textContent = best ? `Best streak: ${best} day${best === 1 ? "" : "s"}` : "Finish all verses today to start your streak.";
}

/* ---------- playback ---------- */

function loadVerse(id) {
  const v = verses.find((x) => x.id === id);
  currentId = id;
  played.set(id, 0);
  lastTime = 0;
  player.src = audioSrc(v);
  player.playbackRate = Number($("speed").value);
  setMediaSession(v);
}

function togglePlay(id, fromPlayAll) {
  if (!fromPlayAll) playAllMode = false;
  if (currentId === id && player.src) {
    if (player.paused) player.play().catch(() => {}); else player.pause();
    return;
  }
  loadVerse(id);
  player.play().catch(() => {});
}

function nextUndoneId(afterId) {
  const start = afterId ? verses.findIndex((v) => v.id === afterId) + 1 : 0;
  return verses[start] ? verses[start].id : null;
}

function startPlayAll() {
  if (playAllMode && currentId) {
    if (player.paused) player.play().catch(() => {}); else player.pause();
    return;
  }
  playAllMode = true;
  const doneIds = new Set(state.days[today] ? state.days[today].done : []);
  const firstUndone = verses.find((v) => !doneIds.has(v.id));
  togglePlay(firstUndone ? firstUndone.id : verses[0].id, true);
}

player.addEventListener("timeupdate", () => {
  if (currentId == null) return;
  const cur = player.currentTime;
  const delta = cur - lastTime;
  // Only count smooth forward playback; jumps (seeking) are ignored.
  if (delta > 0 && delta < 1.5 * player.playbackRate + 0.3) {
    played.set(currentId, (played.get(currentId) || 0) + delta);
  }
  lastTime = cur;
  const li = document.querySelector(`.verse[data-id="${currentId}"] .vprog > i`);
  if (li && player.duration) li.style.width = `${(cur / player.duration) * 100}%`;
});
player.addEventListener("seeking", () => { lastTime = player.currentTime; });
player.addEventListener("play", render);
player.addEventListener("pause", render);

player.addEventListener("ended", () => {
  const id = currentId;
  if (id == null) return;
  if (hasListenedEnough(played.get(id) || 0, player.duration)) {
    today = dayKey();
    state = markVerseDone(state, today, id, verses.length);
    saveState();
  }
  const bar = document.querySelector(`.verse[data-id="${id}"] .vprog > i`);
  if (bar) bar.style.width = "0";
  const next = playAllMode ? nextUndoneId(id) : null;
  if (next) {
    loadVerse(next);
    player.play().catch(() => {});
  } else {
    playAllMode = false;
    currentId = null;
    player.removeAttribute("src");
  }
  render();
});

function setMediaSession(v) {
  if (!("mediaSession" in navigator)) return;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: v.ref, artist: "God Med", album: "Daily Scripture",
    artwork: [{ src: "icons/icon-512.png", sizes: "512x512", type: "image/png" }],
  });
  navigator.mediaSession.setActionHandler("play", () => player.play());
  navigator.mediaSession.setActionHandler("pause", () => player.pause());
  navigator.mediaSession.setActionHandler("nexttrack", () => {
    const next = nextUndoneId(currentId);
    if (next) togglePlay(next, playAllMode);
  });
}

/* ---------- wiring ---------- */

$("playAll").addEventListener("click", startPlayAll);
$("speed").addEventListener("change", () => { player.playbackRate = Number($("speed").value); });
$("prevMonth").addEventListener("click", () => {
  viewMonth -= 1;
  if (viewMonth < 0) { viewMonth = 11; viewYear -= 1; }
  renderCalendar();
});
$("nextMonth").addEventListener("click", () => {
  viewMonth += 1;
  if (viewMonth > 11) { viewMonth = 0; viewYear += 1; }
  renderCalendar();
});

// Roll over to the new day without a reload (midnight, or app resumed next day).
function checkNewDay() {
  const now = dayKey();
  if (now !== today) {
    today = now;
    const d = new Date();
    viewYear = d.getFullYear();
    viewMonth = d.getMonth();
    render();
  }
}
setInterval(checkNewDay, 60_000);
document.addEventListener("visibilitychange", () => { if (!document.hidden) checkNewDay(); });
// Keep tabs in sync if progress is saved elsewhere.
window.addEventListener("storage", (e) => {
  if (e.key === STORE_KEY) { state = loadState(); render(); }
});

async function init() {
  try {
    const res = await fetch("verses.json");
    verses = await res.json();
  } catch {
    $("verses").textContent = "Could not load verses.";
    return;
  }
  buildVerses();
  render();
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}
init();
