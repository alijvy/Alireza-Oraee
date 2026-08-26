"""Generate the temporary seamless ambient loop used by the local portfolio."""

from __future__ import annotations

import math
import struct
import wave
from pathlib import Path


SAMPLE_RATE = 22_050
DURATION = 12
OUTPUT = Path(__file__).resolve().parents[1] / "public" / "audio" / "ambient.wav"


def sample_at(t: float) -> float:
    slow_breath = 0.62 + 0.38 * math.sin(2 * math.pi * (1 / DURATION) * t - math.pi / 2)
    low = math.sin(2 * math.pi * 55 * t) * 0.085
    middle = math.sin(2 * math.pi * 82.5 * t + 0.7) * 0.043
    shimmer = math.sin(2 * math.pi * 220 * t + math.sin(2 * math.pi * 0.25 * t)) * 0.012
    return max(-1.0, min(1.0, (low + middle) * slow_breath + shimmer))


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(OUTPUT), "wb") as audio:
        audio.setnchannels(1)
        audio.setsampwidth(2)
        audio.setframerate(SAMPLE_RATE)
        frames = bytearray()
        for index in range(SAMPLE_RATE * DURATION):
            frames.extend(struct.pack("<h", int(sample_at(index / SAMPLE_RATE) * 32767)))
        audio.writeframes(frames)


if __name__ == "__main__":
    main()
