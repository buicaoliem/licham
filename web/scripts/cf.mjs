// Chạy opennextjs-cloudflare (build | preview | deploy) với đúng biến môi trường lúc build mà Vercel từng cấp:
//  - VAN_HOA_PUBLIC=1  (đang bật ở Vercel production; đọc lúc build để mở /van-hoa cho index và sitemap)
//  - TZ=Asia/Ho_Chi_Minh (buildCommand cũ trong vercel.json)
// Đã đặt sẵn thì giữ nguyên giá trị đó. Ví dụ build không tracking cho địa chỉ tạm: LICHAM_TRACKING=off pnpm deploy.
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const [cmd, ...rest] = process.argv.slice(2);
if (!["build", "preview", "deploy"].includes(cmd ?? "")) {
  console.error("Dùng: node scripts/cf.mjs <build|preview|deploy> [tham số...]");
  process.exit(2);
}
process.env.VAN_HOA_PUBLIC ??= "1";
process.env.TZ ??= "Asia/Ho_Chi_Minh";

const r = spawnSync("pnpm", ["exec", "opennextjs-cloudflare", cmd, ...rest], { stdio: "inherit", shell: true, env: process.env });
if (r.status !== 0) process.exit(r.status ?? 1);

if (cmd === "build") {
  // Ảnh heritage chạy thẳng từ static assets (không qua Worker, xem wrangler.jsonc run_worker_first), nên header CORS đặt ở đây.
  // Vercel trả "Access-Control-Allow-Origin: *" cho mọi file tĩnh; app di động tải tranh từ /heritage/*.webp.
  const headers = ["/heritage/*", "/heritage-thumb/*"].map((p) => `${p}\n  Access-Control-Allow-Origin: *\n`).join("\n");
  writeFileSync(join(".open-next", "assets", "_headers"), headers);
}
