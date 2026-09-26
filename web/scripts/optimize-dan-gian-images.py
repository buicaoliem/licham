"""Tối ưu ảnh bài Dân gian (tranh Đông Hồ, đồ chơi Tết): PNG nguồn -> WebP.
  Nguồn: artwork-inbox/vanhoa/do-choi-tet-xua và artwork-inbox/vanhoa/tranh-dong-ho (nếu có).
  {stem}-hero.png 16:9 -> {stem}-hero.webp 1280x720
  {stem}-the.png  1:1  -> {stem}-the.webp  480x480
Chạy: python scripts/optimize-dan-gian-images.py  (sau đó: pnpm assets:scan). Không sửa file nguồn.
"""
from pathlib import Path
from PIL import Image

WEB = Path(__file__).resolve().parent.parent
INBOX = WEB.parent / "artwork-inbox" / "vanhoa"
OUT = WEB / "public" / "heritage" / "van-hoa" / "dan-gian"
OUT.mkdir(parents=True, exist_ok=True)
SIZES = {"hero": (1280, 720), "the": (480, 480)}
JOBS = [
    (INBOX / "do-choi-tet-xua", OUT),
    (INBOX / "tranh-dong-ho", OUT),
    (INBOX / "khi-tiet-nong-lich", WEB / "public" / "heritage" / "van-hoa" / "thien-van"),
]

n = 0
for src_dir, dest in JOBS:
    if not src_dir.is_dir():
        continue
    dest.mkdir(parents=True, exist_ok=True)
    for kind, size in SIZES.items():
        for src in sorted(src_dir.glob(f"*-{kind}.png")):
            im = Image.open(src).convert("RGB")
            if im.size != size:
                im = im.resize(size, Image.LANCZOS)
            dst = dest / f"{src.stem}.webp"
            im.save(dst, "WEBP", quality=80, method=6)
            n += 1
            print(f"{dst.name} {dst.stat().st_size // 1024} KB")
print(f"{n} files")
