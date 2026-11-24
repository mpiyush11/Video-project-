#!/usr/bin/env python3
"""Decode the supplied MP3 and write a normalized RMS amplitude value per 30fps frame."""
import json
import math
import os
import subprocess
import tempfile
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUDIO = ROOT / "public/kishore_clip.mp3"
FFMPEG = ROOT / "node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg"
FFPROBE = ROOT / "node_modules/ffprobe-static/bin/linux/x64/ffprobe"
FPS = 30

probe = subprocess.check_output([
    str(FFPROBE), "-v", "error", "-show_entries", "format=duration",
    "-of", "default=noprint_wrappers=1:nokey=1", str(AUDIO),
], text=True).strip()
duration = float(probe)
frame_count = math.ceil(duration * FPS)
with tempfile.TemporaryDirectory() as td:
    wav_path = Path(td) / "decoded.wav"
    subprocess.run([
        str(FFMPEG), "-hide_banner", "-loglevel", "error", "-y", "-i", str(AUDIO),
        "-vn", "-ac", "1", "-ar", "44100", "-c:a", "pcm_s16le", str(wav_path),
    ], check=True)
    with wave.open(str(wav_path), "rb") as wav:
        sample_rate = wav.getframerate()
        raw = wav.readframes(wav.getnframes())
        samples = [int.from_bytes(raw[i:i + 2], "little", signed=True) / 32768.0
                   for i in range(0, len(raw), 2)]

samples_per_frame = sample_rate / FPS
rms_values = []
for frame in range(frame_count):
    start = round(frame * samples_per_frame)
    end = min(len(samples), round((frame + 1) * samples_per_frame))
    if end <= start:
        rms_values.append(0.0)
    else:
        rms_values.append(math.sqrt(sum(x * x for x in samples[start:end]) / (end - start)))
peak = max(rms_values) or 1.0
# Keep the true per-frame RMS alongside a gently compressed, 0..1 reaction signal.
envelope = [round(min(1.0, value / peak), 5) for value in rms_values]
output = {
    "source": "public/kishore_clip.mp3",
    "durationSeconds": duration,
    "fps": FPS,
    "durationInFrames": frame_count,
    "sampleRate": sample_rate,
    "method": "decoded mono PCM16 RMS per frame, normalized to peak",
    "values": envelope,
}
(ROOT / "src/audioEnvelope.json").write_text(json.dumps(output, ensure_ascii=False, separators=(",", ":")) + "\n")
print(f"Duration: {duration:.6f}s | {frame_count} frames @ {FPS}fps | {len(envelope)} envelope values")
