#!/usr/bin/env python3
"""
Generate the README demo GIF for ai-systems-evolution.

Runs all six rungs in mock mode (no API keys), captures their real output,
and renders a typed-terminal animated GIF. No screen recorder required.

Usage:
    python scripts/make-demo-gif.py

Output: demo.gif in the repo root.
"""

import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "demo.gif"

# --- terminal look -----------------------------------------------------------
W, H = 880, 540
PAD_X, PAD_TOP = 22, 56          # left padding, top padding (below title bar)
LINE_H = 22
FONT_SIZE = 16
BG = (13, 17, 23)                # GitHub dark
TITLEBAR = (22, 27, 34)
PROMPT_COL = (63, 185, 80)       # green $
CMD_COL = (201, 209, 217)        # command text
OUT_COL = (139, 148, 158)        # muted output
ACCENT = (88, 166, 255)          # rung tag lines
DOT_COLS = [(255, 95, 86), (255, 189, 46), (39, 201, 63)]

RUNGS = [
    ("00-plain-code/main.js",   "00-plain-code"),
    ("01-single-llm-call/main.js", "01-single-llm-call"),
    ("02-workflow/main.js",     "02-workflow"),
    ("03-agent/main.js",        "03-agent"),
    ("04-agentic-team/main.js", "04-agentic-team"),
    ("05-swarm/main.js",        "05-swarm"),
]


def load_font(size):
    for p in (r"C:\Windows\Fonts\consola.ttf",
              r"C:\Windows\Fonts\cour.ttf",
              "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"):
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


FONT = load_font(FONT_SIZE)
VIEW_LINES = (H - PAD_TOP - 16) // LINE_H


def run_rung(script):
    res = subprocess.run(["node", str(REPO / script)],
                         capture_output=True, text=True, cwd=REPO,
                         encoding="utf-8")
    out = (res.stdout or "").rstrip("\n")
    return out.splitlines()


def wrap(line, max_chars=92):
    if len(line) <= max_chars:
        return [line]
    chunks, cur = [], ""
    for word in line.split(" "):
        if len(cur) + len(word) + 1 > max_chars and cur:
            chunks.append(cur)
            cur = word
        else:
            cur = (cur + " " + word).strip()
    if cur:
        chunks.append(cur)
    return chunks


def render(buffer):
    """buffer: list of (text, color). Returns a PIL frame of the last VIEW_LINES."""
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 34], fill=TITLEBAR)
    for i, c in enumerate(DOT_COLS):
        d.ellipse([18 + i * 22, 12, 30 + i * 22, 24], fill=c)
    d.text((W // 2 - 110, 9), "ai-systems-evolution — the autonomy ladder",
           font=load_font(13), fill=(139, 148, 158))

    visible = buffer[-VIEW_LINES:]
    y = PAD_TOP
    for text, color in visible:
        if text.startswith("$ "):
            d.text((PAD_X, y), "$", font=FONT, fill=PROMPT_COL)
            d.text((PAD_X + FONT.getlength("$ "), y), text[2:],
                   font=FONT, fill=CMD_COL)
        else:
            d.text((PAD_X, y), text, font=FONT, fill=color)
        y += LINE_H
    return img


def main():
    frames, durations = [], []
    buffer = []

    def snap(ms):
        frames.append(render(buffer))
        durations.append(ms)

    for script, label in RUNGS:
        # type the command character by character
        cmd = f"node {script}"
        buffer.append(("$ ", CMD_COL))
        for i in range(1, len(cmd) + 1):
            buffer[-1] = (f"$ {cmd[:i]}", CMD_COL)
            snap(45 if i < len(cmd) else 280)

        # output line by line
        for raw in run_rung(script):
            for seg in wrap(raw):
                col = ACCENT if seg.strip().startswith("[rung") else OUT_COL
                buffer.append((seg, col))
                snap(110)
        buffer.append(("", OUT_COL))
        snap(950)  # pause so the viewer can read

    # final hold
    snap(1800)

    frames[0].save(
        OUT, save_all=True, append_images=frames[1:],
        duration=durations, loop=0, optimize=True, disposal=2,
    )
    size_mb = OUT.stat().st_size / 1_048_576
    print(f"wrote {OUT}  ({len(frames)} frames, {size_mb:.2f} MB)")


if __name__ == "__main__":
    main()
