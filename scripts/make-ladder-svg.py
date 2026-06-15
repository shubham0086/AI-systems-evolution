#!/usr/bin/env python3
"""
Generate an animated SVG of the autonomy ladder for the README.

Vector graphic (SMIL animation) — crisp at any size, ~kb file, and animated
SVGs play inside GitHub READMEs. Six rungs light up in sequence, each with a
mini node-diagram showing growing structure, and a signal climbs the spine.

Usage:  python scripts/make-ladder-svg.py
Output: ladder.svg in the repo root.
"""

from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
OUT = REPO / "ladder.svg"

W, H = 900, 560
TOP, ROW_H = 120, 68
SPINE_X = 74
DUR = 11.0  # full loop seconds

RUNGS = [
    ("00", "Plain code",    "hard-coded output — no model is called",        "#3fb950"),
    ("01", "Single LLM call", "one call, no tools, no checking its work",    "#2dd4bf"),
    ("02", "Workflow",      "a fixed multi-step chain, running on rails",     "#38bdf8"),
    ("03", "Agent",         "the model picks tools inside a loop",            "#6366f1"),
    ("04", "Agentic team",  "many roles share one blackboard",               "#a855f7"),
    ("05", "Swarm",         "peers react to peers — no orchestrator",        "#ec4899"),
]


def row_cy(display_row):           # display_row 0 = top
    return TOP + ROW_H * display_row + ROW_H // 2


def opacity_anim(t_on):
    """Dim -> bright at t_on -> hold -> fade at loop end. Loops cleanly."""
    kt = [0, max(t_on - 0.001, 0), t_on, t_on + 0.05, 0.9, 1.0]
    vals = [0.18, 0.18, 0.18, 1, 1, 0.18]
    return (f'<animate attributeName="opacity" dur="{DUR}s" '
            f'repeatCount="indefinite" '
            f'keyTimes="{";".join(f"{k:.4f}" for k in kt)}" '
            f'values="{";".join(str(v) for v in vals)}"/>')


def glyph(kind, cx, cy, color):
    """Mini node-diagram per rung, centered at (cx, cy). Box ~ 150x44."""
    s = []
    def box(x, y, w=22, h=22, r=5):
        s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" '
                 f'fill="{color}" fill-opacity="0.18" stroke="{color}" stroke-width="1.6"/>')
    def dot(x, y, r=7):
        s.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{color}" fill-opacity="0.25" '
                 f'stroke="{color}" stroke-width="1.6"/>')
    def line(x1, y1, x2, y2, w=1.6):
        s.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" '
                 f'stroke-width="{w}" stroke-opacity="0.7"/>')

    if kind == "00":
        box(cx - 11, cy - 11)
    elif kind == "01":
        box(cx - 36, cy - 11)
        line(cx - 14, cy, cx + 18, cy)
        dot(cx + 30, cy)
    elif kind == "02":
        for i, x in enumerate((cx - 48, cx, cx + 48)):
            box(x - 11, cy - 11)
            if i:
                line(x - 37, cy, x - 11, cy)
    elif kind == "03":
        box(cx - 11, cy - 11)
        s.append(f'<path d="M {cx+14} {cy-6} a 18 18 0 1 1 -10 -16" fill="none" '
                 f'stroke="{color}" stroke-width="1.6" stroke-opacity="0.8"/>')
        s.append(f'<path d="M {cx+4} {cy-24} l 6 2 l -3 6 z" fill="{color}"/>')
    elif kind == "04":
        box(cx - 11, cy - 11)                       # blackboard
        for x, y in ((cx - 48, cy - 14), (cx + 48, cy - 14), (cx, cy + 24)):
            dot(x, y, 6)
            line(cx, cy, x, y)
    elif kind == "05":
        import math
        pts = [(cx + 30 * math.cos(math.radians(a)), cy + 18 * math.sin(math.radians(a)))
               for a in (-90, -18, 54, 126, 198)]
        for i, (x1, y1) in enumerate(pts):
            for x2, y2 in pts[i + 1:]:
                line(x1, y1, x2, y2, 1.1)
        for x, y in pts:
            dot(x, y, 5)
    return "".join(s)


def build():
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
        f'viewBox="0 0 {W} {H}" font-family="Segoe UI, Helvetica, Arial, sans-serif">',
        f'<rect x="1" y="1" width="{W-2}" height="{H-2}" rx="16" fill="#0d1117" '
        f'stroke="#30363d" stroke-width="1.5"/>',
        f'<text x="40" y="54" font-size="30" font-weight="700" fill="#e6edf3">'
        f'The Autonomy Ladder</text>',
        f'<text x="40" y="84" font-size="16" fill="#8b949e">'
        f'from plain code to a swarm — six rungs of AI autonomy</text>',
    ]

    # vertical spine
    parts.append(f'<line x1="{SPINE_X}" y1="{row_cy(0)}" x2="{SPINE_X}" '
                 f'y2="{row_cy(5)}" stroke="#30363d" stroke-width="2"/>')

    # activation order: rung 00 (bottom) first, climbing up
    cy_by_rung = {}
    for d, (num, title, desc, color) in enumerate(reversed(RUNGS)):
        cy = row_cy(d)
        cy_by_rung[num] = cy
        # activation index: rung number value (00 first)
        act = int(num)
        t_on = 0.05 + act * 0.13

        g = [f'<g opacity="0.18">{opacity_anim(t_on)}']
        # node circle + number
        g.append(f'<circle cx="{SPINE_X}" cy="{cy}" r="21" fill="{color}" '
                 f'fill-opacity="0.18" stroke="{color}" stroke-width="2"/>')
        g.append(f'<text x="{SPINE_X}" y="{cy+5}" font-size="15" font-weight="700" '
                 f'fill="{color}" text-anchor="middle">{num}</text>')
        # title + desc
        g.append(f'<text x="112" y="{cy-3}" font-size="21" font-weight="600" '
                 f'fill="#e6edf3">{title}</text>')
        g.append(f'<text x="112" y="{cy+20}" font-size="14" fill="#8b949e">{desc}</text>')
        # glyph on the right
        g.append(glyph(num, 780, cy, color))
        g.append('</g>')
        parts.append("".join(g))

    # climbing signal up the spine
    cys = [cy_by_rung[f"0{i}"] for i in range(6)]   # 00..05 -> bottom..top
    kt = [0.0] + [0.05 + i * 0.13 for i in range(6)] + [1.0]
    yvals = [cys[0]] + cys + [cys[-1]]
    parts.append(
        f'<circle cx="{SPINE_X}" r="6" fill="#ffffff">'
        f'<animate attributeName="cy" dur="{DUR}s" repeatCount="indefinite" '
        f'keyTimes="{";".join(f"{k:.4f}" for k in kt)}" '
        f'values="{";".join(str(v) for v in yvals)}"/>'
        f'<animate attributeName="opacity" dur="{DUR}s" repeatCount="indefinite" '
        f'keyTimes="0;0.88;1" values="0.9;0.9;0"/>'
        f'</circle>')

    parts.append('</svg>')
    OUT.write_text("\n".join(parts), encoding="utf-8")
    print(f"wrote {OUT}  ({OUT.stat().st_size/1024:.1f} KB)")


if __name__ == "__main__":
    build()
