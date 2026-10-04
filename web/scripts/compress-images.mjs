// Nén ảnh tại chỗ (không đổi tên/định dạng): node scripts/compress-images.mjs [--dry] [--report=path.json] [dir...]
// Mặc định quét mọi ảnh webp/jpg/png/avif đang được git theo dõi dưới public/.
// Quy tắc: chỉ thu nhỏ khi cạnh dài > 1600px; mã hoá lại cùng định dạng; bỏ metadata; sRGB;
// SSIM so với bản gốc >= 0.97 (không đạt thì tăng chất lượng, vẫn không đạt thì giữ bản gốc); bỏ qua nếu tiết kiệm < 10%.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { dirname, resolve, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const WEB_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MAX_EDGE = 1600;
const MIN_SAVING = 0.1;
const MIN_SSIM = 0.97;
const EXTS = new Set([".webp", ".jpg", ".jpeg", ".png", ".avif"]);

const args = process.argv.slice(2);
const dry = args.includes("--dry");
const reportArg = args.find((a) => a.startsWith("--report="));
const roots = args.filter((a) => !a.startsWith("--"));

function listFiles() {
  const spec = roots.length ? roots : ["public"];
  const out = execFileSync("git", ["ls-files", "-z", "--", ...spec], { cwd: WEB_ROOT, encoding: "utf8", maxBuffer: 1 << 26 });
  return out.split("\0").filter((p) => p && EXTS.has(extname(p).toLowerCase()));
}

// SSIM trên độ sáng, cửa sổ 8x8, bước 4 (đủ nhạy cho kiểm soát chất lượng, không cần thư viện ngoài).
async function luma(input, width, height) {
  const { data, info } = await sharp(input).resize(width, height, { fit: "fill" }).flatten({ background: "#ffffff" }).toColourspace("b-w").raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height, c: info.channels };
}
async function ssim(origBuf, newBuf, width, height) {
  const a = await luma(origBuf, width, height);
  const b = await luma(newBuf, width, height);
  const W = 8, STEP = 4, C1 = (0.01 * 255) ** 2, C2 = (0.03 * 255) ** 2;
  let sum = 0, n = 0;
  for (let y = 0; y + W <= a.h; y += STEP) {
    for (let x = 0; x + W <= a.w; x += STEP) {
      let ma = 0, mb = 0;
      for (let j = 0; j < W; j++) for (let i = 0; i < W; i++) { const k = (y + j) * a.w + x + i; ma += a.data[k]; mb += b.data[k]; }
      ma /= W * W; mb /= W * W;
      let va = 0, vb = 0, cov = 0;
      for (let j = 0; j < W; j++) for (let i = 0; i < W; i++) { const k = (y + j) * a.w + x + i; const da = a.data[k] - ma, db = b.data[k] - mb; va += da * da; vb += db * db; cov += da * db; }
      va /= W * W - 1; vb /= W * W - 1; cov /= W * W - 1;
      sum += ((2 * ma * mb + C1) * (2 * cov + C2)) / ((ma * ma + mb * mb + C1) * (va + vb + C2));
      n++;
    }
  }
  return n ? sum / n : 1;
}

function encoder(img, ext, q, png) {
  switch (ext) {
    case ".jpg": case ".jpeg": return img.jpeg({ quality: q, mozjpeg: true, progressive: true });
    case ".webp": return img.webp({ quality: q, effort: 6 });
    case ".avif": return img.avif({ quality: q, effort: 6 });
    case ".png": return png === "palette" ? img.png({ palette: true, quality: q, effort: 10, compressionLevel: 9 }) : img.png({ compressionLevel: 9, effort: 10 });
  }
}

async function compressOne(file) {
  const abs = resolve(WEB_ROOT, file);
  const ext = extname(file).toLowerCase();
  const orig = readFileSync(abs);
  const meta = await sharp(orig).metadata();
  const row = { file, beforeBytes: orig.length, beforeW: meta.width, beforeH: meta.height, afterBytes: orig.length, afterW: meta.width, afterH: meta.height, ssim: 1, action: "skipped", note: "" };
  if (meta.pages && meta.pages > 1) { row.note = "animated"; return row; }
  if (ext === ".avif" && Math.max(meta.width, meta.height) <= MAX_EDGE && orig.length < 300_000) { row.note = "avif kept"; return row; }

  const long = Math.max(meta.width, meta.height);
  const scale = long > MAX_EDGE ? MAX_EDGE / long : 1;
  const tw = Math.round(meta.width * scale), th = Math.round(meta.height * scale);
  const needsSrgb = meta.space && meta.space !== "srgb";

  const attempts = ext === ".png" ? [["palette", 80], ["palette", 90], ["lossless", 100]] : [["", 78], ["", 85], ["", 92]];
  let best = null;
  for (const [mode, q] of attempts) {
    let img = sharp(orig);
    if (scale < 1) img = img.resize(tw, th, { fit: "inside", withoutEnlargement: true });
    if (needsSrgb) img = img.toColourspace("srgb");
    // sharp mặc định bỏ metadata khi không gọi withMetadata()
    const buf = await encoder(img, ext, q, mode).toBuffer();
    const s = await ssim(orig, buf, tw, th);
    if (s >= MIN_SSIM) { best = { buf, s, q, mode }; break; }
    row.note = `ssim ${s.toFixed(4)} @q${q}`;
  }
  if (!best) { row.action = "kept-original"; row.note += " (quality guard)"; return row; }
  const saving = 1 - best.buf.length / orig.length;
  const resized = scale < 1;
  if (saving < MIN_SAVING && !resized) { row.action = "skipped"; row.note = `saving ${(saving * 100).toFixed(1)}% < 10%`; row.ssim = best.s; return row; }
  if (best.buf.length >= orig.length) { row.action = "skipped"; row.note = "not smaller"; return row; }
  const m2 = await sharp(best.buf).metadata();
  Object.assign(row, { afterBytes: best.buf.length, afterW: m2.width, afterH: m2.height, ssim: Number(best.s.toFixed(4)), action: resized ? "resized+compressed" : "compressed", note: `q${best.q}${best.mode ? " " + best.mode : ""}` });
  if (!dry) writeFileSync(abs, best.buf);
  return row;
}

const files = listFiles();
const rows = [];
for (const f of files) {
  try { rows.push(await compressOne(f)); } catch (e) { rows.push({ file: f, action: "error", note: String(e.message || e), beforeBytes: statSync(resolve(WEB_ROOT, f)).size, afterBytes: statSync(resolve(WEB_ROOT, f)).size }); }
}
const before = rows.reduce((s, r) => s + r.beforeBytes, 0);
const after = rows.reduce((s, r) => s + r.afterBytes, 0);
const count = (a) => rows.filter((r) => r.action === a).length;
const summary = { files: rows.length, beforeBytes: before, afterBytes: after, savedPct: Number((((before - after) / before) * 100).toFixed(1)), compressed: count("compressed"), resizedAndCompressed: count("resized+compressed"), skipped: count("skipped"), keptOriginal: count("kept-original"), errors: count("error"), dry };
if (reportArg) writeFileSync(resolve(reportArg.slice(9)), JSON.stringify({ summary, rows }, null, 1));
console.log(JSON.stringify(summary));
for (const r of rows.filter((r) => r.action === "error" || r.action === "kept-original")) console.log(r.action, relative(WEB_ROOT, resolve(WEB_ROOT, r.file)), r.note);
