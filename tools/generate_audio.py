"""Generate verse audio with Kokoro-82M and encode to MP3.

Run with the existing Kokoro venv, e.g.:
  C:\\Users\\Ronaldo\\Documents\\dev\\tts_app\\.venv\\Scripts\\python.exe tools\\generate_audio.py
"""
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import tempfile
from pathlib import Path

import numpy as np
import soundfile as sf

SAMPLE_RATE = 24000
ROOT = Path(__file__).resolve().parent.parent


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--voice", default="af_heart")
    parser.add_argument("--speed", type=float, default=0.92)
    parser.add_argument("--only", type=int, nargs="*", help="Only these verse ids")
    args = parser.parse_args()

    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        raise SystemExit("ffmpeg not found on PATH")

    verses = json.loads((ROOT / "verses.json").read_text(encoding="utf-8"))
    out_dir = ROOT / "audio"
    out_dir.mkdir(exist_ok=True)

    from kokoro import KPipeline

    pipeline = KPipeline(lang_code=args.voice[0], repo_id="hexgrad/Kokoro-82M")
    pause = np.zeros(int(SAMPLE_RATE * 0.6), dtype=np.float32)

    for verse in verses:
        if args.only and verse["id"] not in args.only:
            continue
        parts: list[np.ndarray] = []
        for line in (verse["spoken"], verse.get("tts", verse["text"])):
            for result in pipeline(line, voice=args.voice, speed=args.speed, split_pattern=r"\n+"):
                audio = result.audio
                if audio is None:
                    continue
                parts.append(np.clip(audio.detach().cpu().numpy(), -1, 1).astype(np.float32))
            parts.append(pause)
        samples = np.concatenate(parts[:-1])  # drop trailing pause

        out = out_dir / f"{verse['id']:02d}.mp3"
        with tempfile.TemporaryDirectory() as tmp:
            wav = Path(tmp) / "v.wav"
            sf.write(str(wav), samples, SAMPLE_RATE, subtype="PCM_16")
            subprocess.run(
                [ffmpeg, "-y", "-hide_banner", "-loglevel", "error", "-i", str(wav),
                 "-ac", "1", "-c:a", "libmp3lame", "-b:a", "64k", str(out)],
                check=True,
            )
        print(f"{out.name}  {len(samples) / SAMPLE_RATE:.1f}s  {verse['ref']}", flush=True)


if __name__ == "__main__":
    main()
