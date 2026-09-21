// Dùng chung cho seo-audit.mjs và smoke.mjs: khởi động `next start` (cần đã build) hoặc dùng URL có sẵn.
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const WEB_ROOT = join(import.meta.dirname, "..", "..");

async function waitReady(base, child, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (child && child.exitCode !== null) throw new Error("`next start` thoát sớm; hãy chạy `pnpm build` trước.");
    try {
      const res = await fetch(`${base}/`, { redirect: "manual" });
      if (res.status < 500) return;
    } catch {
      // chưa sẵn sàng
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error("Hết thời gian chờ server khởi động");
}

/** Xin hệ điều hành một cổng đang trống (tránh đụng cổng còn giữ bởi lượt chạy trước). */
function freePort() {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

/** Dừng process (cả cây process con) và chờ nó thoát thật sự, không dùng sleep cố định. */
function stop(child) {
  if (child.exitCode !== null || child.signalCode !== null) return Promise.resolve();
  return new Promise((resolve) => {
    child.once("exit", resolve);
    if (process.platform === "win32") {
      spawn("taskkill", ["/pid", String(child.pid), "/t", "/f"], { stdio: "ignore" }).on("error", () => child.kill("SIGKILL"));
    } else {
      child.kill("SIGKILL");
    }
  });
}

/** Chạy `fn(base)` với một server đang chạy. Đặt SEO_AUDIT_BASE_URL để dùng server có sẵn thay vì tự khởi động. */
export async function withServer(fn) {
  if (process.env.SEO_AUDIT_BASE_URL) return fn(process.env.SEO_AUDIT_BASE_URL.replace(/\/$/, ""));
  const port = Number(process.env.SEO_AUDIT_PORT) || (await freePort());
  const nextBin = require.resolve("next/dist/bin/next", { paths: [WEB_ROOT] });
  const child = spawn(process.execPath, [nextBin, "start", "-p", String(port)], { cwd: WEB_ROOT, stdio: ["ignore", "pipe", "pipe"] });
  let log = "";
  child.stdout.on("data", (d) => (log += d));
  child.stderr.on("data", (d) => (log += d));
  const base = `http://localhost:${port}`;
  try {
    await waitReady(base, child);
    return await fn(base);
  } catch (e) {
    if (log) console.error(log.split("\n").slice(-15).join("\n"));
    throw e;
  } finally {
    await stop(child);
  }
}

/** GET không tự theo redirect; trả về {status, location, body}. */
export async function get(base, path) {
  // Server từ xa (SEO_AUDIT_BASE_URL) đôi khi ngắt kết nối tạm thời: thử lại vài lần trước khi coi là lỗi.
  let res;
  for (let attempt = 0; ; attempt++) {
    try {
      res = await fetch(base + path, { redirect: "manual" });
      break;
    } catch (e) {
      if (attempt >= 4) throw e;
      await new Promise((r) => setTimeout(r, 500 * 2 ** attempt));
    }
  }
  const ct = res.headers.get("content-type") ?? "";
  const body = ct.includes("html") || ct.includes("xml") || ct.includes("text") ? await res.text() : (await res.arrayBuffer(), "");
  return { status: res.status, location: res.headers.get("location"), body };
}

export async function pool(items, size, worker) {
  let i = 0;
  const results = new Array(items.length);
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++;
        results[idx] = await worker(items[idx], idx);
      }
    }),
  );
  return results;
}
