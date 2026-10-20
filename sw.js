// Offline-first service worker: precaches the app shell and all verse audio.
const VERSION = "godmed-v1";
const CORE = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "habit.js",
  "verses.json",
  "manifest.webmanifest",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
];
const AUDIO = Array.from({ length: 12 }, (_, i) => `audio/${String(i + 1).padStart(2, "0")}.mp3`);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll([...CORE, ...AUDIO])).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Safari/iOS (and seeking in other browsers) request audio with Range headers;
// a plain cached 200 response breaks playback, so slice the cached body ourselves.
async function rangeResponse(request, cached) {
  const buf = await cached.arrayBuffer();
  const match = /bytes=(\d*)-(\d*)/.exec(request.headers.get("range") || "");
  if (!match) return cached;
  const total = buf.byteLength;
  let start = match[1] === "" ? Math.max(total - Number(match[2]), 0) : Number(match[1]);
  let end = match[1] !== "" && match[2] !== "" ? Math.min(Number(match[2]), total - 1) : total - 1;
  if (start >= total || start > end) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${total}` } });
  }
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      "Content-Type": cached.headers.get("Content-Type") || "audio/mpeg",
      "Content-Range": `bytes ${start}-${end}/${total}`,
      "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes",
    },
  });
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(VERSION);
    // Ignore the query string and range header when matching the stored copy.
    const cached = await cache.match(request.url, { ignoreSearch: true });
    if (cached) {
      return request.headers.has("range") ? rangeResponse(request, cached) : cached;
    }
    try {
      const response = await fetch(request);
      if (response.ok && response.status === 200) cache.put(request.url, response.clone());
      return response;
    } catch {
      if (request.mode === "navigate") return (await cache.match("index.html")) || Response.error();
      return Response.error();
    }
  })());
});
