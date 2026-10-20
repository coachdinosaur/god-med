# God Med – Daily Scripture (offline PWA)

12 KJV verses with Kokoro-generated audio. Listen to every verse each day; each verse is ticked when you finish it, and the day gets a green check when all 12 are done. Includes a streak counter and monthly calendar.

## Run
```powershell
./serve.ps1        # then open http://localhost:8080
```
Offline mode and "Install app" need `localhost` or HTTPS (not `file://`). To use it on a phone, host this folder on any static host (GitHub Pages, Cloudflare Pages), open it once online, and it then works offline.

## Change verses or voice
1. Edit `verses.json`.
2. Regenerate audio with the Kokoro venv:
   ```powershell
   C:\Users\Ronaldo\Documents\dev\tts_app\.venv\Scripts\python.exe tools\generate_audio.py [--voice am_michael] [--speed 0.92] [--only 5]
   ```
3. If you add or remove verses, update the `AUDIO` list in `sw.js` and bump `VERSION` so devices refresh their cache.

## Tests
```powershell
node --test            # habit/streak logic
node tests/e2e.mjs     # browser test (needs server on :8080)
```
