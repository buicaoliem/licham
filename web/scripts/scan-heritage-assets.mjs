// Quét public/heritage và ghi danh sách file đang có vào lib/heritage-assets.generated.ts.
// Trang chỉ dùng artwork khi file thật sự tồn tại; thiếu file thì khối minh họa được ẩn
// (không thay bằng hình tự vẽ). Chạy lại sau khi thêm asset: pnpm --filter @licham/web assets:scan
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = fileURLToPath(new URL("..", import.meta.url));
const root = join(webRoot, "public", "heritage");
const ALLOWED = /\.(webp|avif|png|jpe?g|svg)$/i;

function walk(dir) {
  let out = [];
  let entries = [];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const name of entries) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out = out.concat(walk(full));
    else if (ALLOWED.test(name)) out.push("/heritage/" + relative(root, full).split(sep).join("/"));
  }
  return out;
}

const files = walk(root).sort();
const body = `// File sinh tự động bởi scripts/scan-heritage-assets.mjs — không sửa tay.
export const HERITAGE_FILES: readonly string[] = ${JSON.stringify(files, null, 2)};
`;
writeFileSync(join(webRoot, "lib", "heritage-assets.generated.ts"), body);
console.log(`heritage assets: ${files.length} file`);
