"""Tối ưu ảnh trò chơi dân gian: PNG nguồn (artwork-inbox/vanhoa/tro-choi-dan-gian) -> WebP.
  {slug}-hero.png 16:9 -> {slug}-hero.webp 1280x720 (trang, OG/twitter)
  {slug}-the.png  1:1  -> {slug}-the.webp  480x480  (thẻ, "Bài liên quan")
Chạy: python scripts/optimize-tro-choi-images.py  (sau đó: pnpm assets:scan). Không sửa file nguồn.
"""
from pathlib import Path
from PIL import Image

WEB = Path(__file__).resolve().parent.parent
SRC = WEB.parent / "artwork-inbox" / "vanhoa" / "tro-choi-dan-gian"
OUT = WEB / "public" / "heritage" / "van-hoa" / "tro-choi-dan-gian"
OUT.mkdir(parents=True, exist_ok=True)
SIZES = {"hero": (1280, 720), "the": (480, 480)}

n = 0
for kind, size in SIZES.items():
    for src in sorted(SRC.glob(f"*-{kind}.png")):
        im = Image.open(src).convert("RGB")
        if im.size != size:
            im = im.resize(size, Image.LANCZOS)
        dst = OUT / f"{src.stem}.webp"
        im.save(dst, "WEBP", quality=80, method=6)
        n += 1
        print(f"{dst.name} {dst.stat().st_size // 1024} KB")
print(f"{n} files")
