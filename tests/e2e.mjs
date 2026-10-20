// End-to-end smoke test. Run (server on :8080, audio generated):
//   node tests/e2e.mjs
import { chromium } from "file:///C:/Users/Ronaldo/Documents/dev/_scratch_pw/node_modules/playwright-core/index.mjs";
import assert from "node:assert/strict";

const EXE = "C:\\Users\\Ronaldo\\AppData\\Local\\ms-playwright\\chromium-1228\\chrome-win64\\chrome.exe";
const BASE = process.env.BASE || "http://localhost:8080";
const SHOTS = process.env.SHOTS || ".";

const browser = await chromium.launch({
  headless: true, executablePath: EXE,
  args: ["--autoplay-policy=no-user-gesture-required"],
});
const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

await page.goto(BASE);
await page.waitForSelector(".verse");
assert.equal(await page.locator(".verse").count(), 12, "12 verses render");
assert.equal(await page.locator("#count").textContent(), "0 / 12 verses listened");
console.log("✓ 12 verses render");

// Wait for the service worker to take control and finish precaching.
await page.evaluate(() => navigator.serviceWorker.ready);
await page.waitForFunction(async () => (await caches.keys()).length > 0 && (await (await caches.open((await caches.keys())[0])).keys()).length >= 23, null, { timeout: 15000 });
console.log("✓ service worker precached app + 12 audio files");

// Speed the audio up so the test does not take minutes.
await page.evaluate(() => {
  const a = document.getElementById("player");
  setInterval(() => { a.playbackRate = 16; }, 50);
});

// Skipping to the end must NOT count as listened.
await page.locator(".verse").first().locator(".play").click();
await page.waitForFunction(() => { const a = document.getElementById("player"); return a.duration > 0 && a.currentTime > 0.5; });
await page.evaluate(() => { const a = document.getElementById("player"); a.currentTime = a.duration - 0.3; });
await page.waitForFunction(() => document.getElementById("player").paused || !document.getElementById("player").src);
await page.waitForTimeout(500);
assert.equal(await page.locator("#count").textContent(), "0 / 12 verses listened", "seek-to-end must not count");
console.log("✓ seeking to the end does not tick the verse");

// Play all: should tick every verse and complete the day.
await page.locator("#playAll").click();
await page.waitForFunction(() => document.getElementById("count").textContent.startsWith("12 / 12"), null, { timeout: 120000 });
await page.waitForSelector("#today.complete");
assert.equal(await page.locator(".verse.done").count(), 12);
assert.equal(await page.locator("#streakNum").textContent(), "1");
assert.equal(await page.locator("#doneMsg").isVisible(), true);
assert.equal(await page.locator(".day.full").count(), 1, "today shows a green check in the calendar");
console.log("✓ Play all completes the day (12/12, streak 1, calendar check)");
await page.screenshot({ path: `${SHOTS}/complete.png`, fullPage: true });

// Persistence.
await page.reload();
await page.waitForSelector("#today.complete");
console.log("✓ progress persists after reload");

// Offline.
await context.setOffline(true);
await page.reload();
await page.waitForSelector(".verse");
assert.equal(await page.locator("#today.complete").count(), 1);
const status = await page.evaluate(async () => {
  const r = await fetch("audio/05.mp3", { headers: { Range: "bytes=0-99" } });
  return [r.status, (await r.arrayBuffer()).byteLength];
});
assert.deepEqual(status, [206, 100], "range request served from cache offline");
await page.locator(".verse").nth(4).locator(".play").click();
await page.waitForFunction(() => { const a = document.getElementById("player"); return a.currentTime > 0.5; });
console.log("✓ works offline (page loads, ranged audio served, audio plays)");
await page.screenshot({ path: `${SHOTS}/offline.png` });

assert.deepEqual(errors.filter((e) => !/Failed to load resource/.test(e)), [], "no page errors");
console.log("✓ no console errors");
await browser.close();
console.log("ALL E2E CHECKS PASSED");
