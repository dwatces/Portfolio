"""Builds the resized images the homepage uses. Originals are left untouched.

Run from the repo root:  python3 scripts/make-images.py
Needs Pillow (pip install pillow).
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT = PUBLIC / "assets" / "img"

# Head-and-shoulders crop (4:5) out of the full-length photo at public/dev/profile.jpg.
# If Daniel supplies a new photo, adjust this box (left, top, right, bottom) in source pixels.
PORTRAIT_BOX = (250, 330, 850, 1080)
PORTRAIT_WIDTHS = (240, 480, 800)

RESEARCH = [
    "hexlife_crossover_locking",
    "kitaev_topological_order",
    "nonabelian_phase",
    "equiv_decoder",
    "coldstart_equivariance",
    "qrc_equivariance",
    "haldane_chern",
]
RESEARCH_WIDTH = 720


def save_pair(im, stem, quality=78):
    im.save(OUT / f"{stem}.webp", "WEBP", quality=quality, method=6)
    im.convert("RGB").save(OUT / f"{stem}.jpg", "JPEG", quality=quality, optimize=True, progressive=True)


def main():
    OUT.mkdir(parents=True, exist_ok=True)

    src = Image.open(PUBLIC / "dev" / "profile.jpg").convert("RGB")
    crop = src.crop(PORTRAIT_BOX)
    for w in PORTRAIT_WIDTHS:
        h = round(w * crop.height / crop.width)
        save_pair(crop.resize((w, h), Image.LANCZOS), f"daniel-{w}")

    # Square version for /dev, matching its CSS (object-fit: cover; object-position: center 25%).
    top = round((src.height - src.width) * 0.25)
    square = src.crop((0, top, src.width, top + src.width)).resize((600, 600), Image.LANCZOS)
    save_pair(square, "daniel-square-600")

    (OUT / "research").mkdir(exist_ok=True)
    for name in RESEARCH:
        im = Image.open(PUBLIC / "research" / f"{name}.png").convert("RGB")
        if im.width > RESEARCH_WIDTH:
            im = im.resize((RESEARCH_WIDTH, round(RESEARCH_WIDTH * im.height / im.width)), Image.LANCZOS)
        im.save(OUT / "research" / f"{name}.webp", "WEBP", quality=80, method=6)
        print(name, im.size)


if __name__ == "__main__":
    main()
