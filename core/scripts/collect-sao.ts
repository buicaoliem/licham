/**
 * Thu thập TÊN SAO tốt/xấu từng ngày để suy ngược bảng luật.
 *
 * CHẠY TAY, không nằm trong luồng build:
 *   node --experimental-strip-types --experimental-loader ./scripts/ts-extension-loader.mjs scripts/collect-sao.ts
 *
 * Nguồn: lichvannien.net, trang riêng cho từng ngày
 *   https://lichvannien.net/lich-am/nam/<yyyy>/thang/<m>/ngay/<d>
 *
 * Nguyên tắc:
 * - CHỈ trích TÊN SAO. Phần mô tả sau dấu ":" bị cắt bỏ và không bao giờ được lưu.
 * - Truy cập chậm, tối thiểu 1 giây giữa hai lần gọi, user-agent ghi rõ mục đích.
 * - Kết quả ghi ra scripts/data/sao-raw.json (KHÔNG commit, đã vào .gitignore).
 * - Có thể dừng giữa chừng rồi chạy lại: ngày nào đã có trong file thì bỏ qua.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve as resolvePath } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_FILE = resolvePath(HERE, "data/sao-raw.json");

const START = { day: 1, month: 1, year: 2025 };
const DAY_COUNT = 730;
const DELAY_MS = 1200;
const USER_AGENT =
  "licham-research/1.0 (nghien cuu quy luat sao tot sao xau, chi lay ten sao; lien he: liembuicao@gmail.com)";

export interface RawDay {
  /** Ngày dương, dạng YYYY-MM-DD. */
  date: string;
  saoTot: string[];
  saoXau: string[];
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function isoOf(d: Date): string {
  return `${d.getUTCFullYear()}-${pad2(d.getUTCMonth() + 1)}-${pad2(d.getUTCDate())}`;
}

/** Gỡ thẻ HTML và giải mã vài thực thể hay gặp. */
function stripTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Lấy danh sách tên sao trong khối có tiêu đề cho trước.
 * Mỗi dòng của trang nguồn có dạng "Tên sao: <mô tả>"; chỉ giữ phần trước ":".
 */
function extractNames(html: string, heading: "Sao tốt" | "Sao xấu"): string[] {
  const start = html.indexOf(heading);
  if (start < 0) return [];
  const end = html.indexOf("</table>", start);
  if (end < 0) return [];
  const block = html.slice(start, end);
  const names: string[] = [];
  for (const m of block.matchAll(/<p>([\s\S]*?)<\/p>/g)) {
    const line = stripTags(m[1] ?? "");
    const colon = line.indexOf(":");
    const name = (colon >= 0 ? line.slice(0, colon) : line).trim();
    if (name.length > 0 && name.length < 60) names.push(name);
  }
  return names;
}

async function fetchDay(d: Date): Promise<RawDay> {
  const url = `https://lichvannien.net/lich-am/nam/${d.getUTCFullYear()}/thang/${d.getUTCMonth() + 1}/ngay/${d.getUTCDate()}`;
  const res = await fetch(url, { headers: { "user-agent": USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status} cho ${url}`);
  const html = await res.text();
  const saoTot = extractNames(html, "Sao tốt");
  const saoXau = extractNames(html, "Sao xấu");
  if (saoTot.length === 0 && saoXau.length === 0) {
    throw new Error(`Không tìm thấy khối sao nào trong ${url} — có thể trang đã đổi cấu trúc`);
  }
  return { date: isoOf(d), saoTot, saoXau };
}

function load(): Map<string, RawDay> {
  if (!existsSync(OUT_FILE)) return new Map();
  const rows = JSON.parse(readFileSync(OUT_FILE, "utf8")) as RawDay[];
  return new Map(rows.map((r) => [r.date, r]));
}

function save(byDate: Map<string, RawDay>): void {
  mkdirSync(dirname(OUT_FILE), { recursive: true });
  const rows = [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
  writeFileSync(OUT_FILE, `${JSON.stringify(rows, null, 2)}\n`, "utf8");
}

async function main(): Promise<void> {
  const byDate = load();
  const base = Date.UTC(START.year, START.month - 1, START.day);
  let fetched = 0;
  let failures = 0;
  for (let i = 0; i < DAY_COUNT; i++) {
    const d = new Date(base + i * 86400000);
    const iso = isoOf(d);
    if (byDate.has(iso)) continue;
    try {
      byDate.set(iso, await fetchDay(d));
      fetched++;
    } catch (err) {
      failures++;
      console.error(`Lỗi ${iso}: ${(err as Error).message}`);
      // Vài lỗi lẻ thì bỏ qua; hỏng hàng loạt thì dừng để xem lại.
      if (failures > 20) throw new Error("Quá 20 ngày lỗi — dừng, cần xem lại nguồn.");
    }
    if (fetched % 25 === 0 && fetched > 0) {
      save(byDate);
      console.log(`Đã lấy ${byDate.size}/${DAY_COUNT} ngày…`);
    }
    await sleep(DELAY_MS);
  }
  save(byDate);
  console.log(`Xong: ${byDate.size}/${DAY_COUNT} ngày, lỗi ${failures}.`);
}

await main();
