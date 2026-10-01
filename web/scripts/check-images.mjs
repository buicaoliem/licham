// Kiểm tra mọi đường dẫn ảnh được tham chiếu đều có thật trong git (đúng cả chữ hoa/thường).
//   node scripts/check-images.mjs          quét mã nguồn/dữ liệu (chạy trước `next build`)
//   node scripts/check-images.mjs --built  quét HTML đã dựng sau build (bắt cả đường dẫn ghép từ biến/slug)
// Thoát mã 1 nếu có tham chiếu thiếu hoặc lệch hoa/thường.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const WEB = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BUILT = process.argv.includes("--built");
const git = (...a) => execFileSync("git", a, { cwd: WEB, encoding: "utf8", maxBuffer: 1 << 27 }).split("\0").filter(Boolean);
const tracked = new Set(git("ls-files", "-z", "--", "public").map((p) => "/" + p.replace(/^public\//, "")));
const lower = new Map([...tracked].map((p) => [p.toLowerCase(), p]));
const SCAN = ["app", "components", "lib", "content", "data"];
const TEXT = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".css", ".md", ".mdx"]);
const REF = /["'`(](\/[A-Za-z0-9_\-.%\/]+\.(?:webp|png|jpe?g|avif|svg|gif|ico))(?=["'`)?#])/g;
const HTML_REF = /(?:src|srcSet|content|href)="(\/[^"\s,]+\.(?:webp|png|jpe?g|avif|svg|gif))/g;

const bad = [];
const seen = new Set();
function report(file, ref, extra) {
  const key = `${file}|${ref}`;
  if (seen.has(key)) return;
  seen.add(key);
  const hit = lower.get(ref.toLowerCase());
  bad.push({ file, ref, problem: hit ? `case mismatch (git has ${hit})` : extra });
}

if (BUILT) {
  // Ảnh thu nhỏ sinh lúc build không nằm trong git nên được liệt kê riêng từ đĩa.
  const thumbs = new Set();
  const walk = (dir, base, visit) => {
    for (const n of readdirSync(dir)) {
      const f = resolve(dir, n);
      if (statSync(f).isDirectory()) walk(f, base + "/" + n, visit);
      else visit(f, base + "/" + n);
    }
  };
  const thumbRoot = resolve(WEB, "public/heritage-thumb");
  if (existsSync(thumbRoot)) walk(thumbRoot, "/heritage-thumb", (_f, p) => thumbs.add(p));
  const root = resolve(WEB, ".next/server/app");
  let pages = 0;
  if (existsSync(root)) {
    walk(root, "", (f) => {
      if (!f.endsWith(".html")) return;
      pages++;
      for (const m of readFileSync(f, "utf8").matchAll(HTML_REF)) {
        const ref = decodeURI(m[1]);
        if (!tracked.has(ref) && !thumbs.has(ref)) report(f.slice(root.length), ref, "missing from git/thumbs");
      }
    });
  }
  console.log(`check:images --built: ${pages} trang HTML đã quét`);
} else {
  for (const file of git("ls-files", "-z", "--", ...SCAN)) {
    if (!TEXT.has(extname(file)) || file.endsWith("heritage-assets.generated.ts")) continue;
    for (const m of readFileSync(resolve(WEB, file), "utf8").matchAll(REF)) {
      const ref = decodeURI(m[1]);
      if (!tracked.has(ref) && !ref.startsWith("/heritage-thumb/")) report(file, ref, "missing from git");
    }
  }
}

if (bad.length) {
  console.error(`check:images — ${bad.length} tham chiếu ảnh lỗi:`);
  for (const b of bad) console.error(`  ${b.file}: ${b.ref} — ${b.problem}`);
  process.exit(1);
}
console.log(`check:images OK — ${tracked.size} file ảnh theo dõi, mọi tham chiếu hợp lệ`);
