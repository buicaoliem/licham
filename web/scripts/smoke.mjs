#!/usr/bin/env node
/** Smoke test trên server production thật (`pnpm build` trước, hoặc SEO_AUDIT_BASE_URL). Thoát mã 1 nếu có ca sai. */
import { get, withServer } from "./lib/server.mjs";

const SITE = "https://www.licham.app";
const failures = [];
let passed = 0;

function check(name, ok, detail = "") {
  if (ok) passed++;
  else failures.push(`${name}${detail ? ": " + detail : ""}`);
}

const robotsOf = (html) => /<meta name="robots" content="([^"]*)"/.exec(html)?.[1] ?? null;
const canonicalOf = (html) => /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1] ?? null;
const h1s = (html) => (html.match(/<h1[\s>]/g) ?? []).length;

await withServer(async (base) => {
  // [path, status]
  const statuses = [
    ["/ngay/2026-09-21/", 200], // ngày hợp lệ
    ["/ngay/2026-02-31/", 404], // ngày không tồn tại
    ["/ngay/2026-13-01/", 404],
    ["/ngay/abc/", 404],
    ["/ngay/1970-01-01/", 200], // biên dưới
    ["/ngay/1969-12-31/", 404],
    ["/ngay/2050-12-31/", 200], // biên trên
    ["/ngay/2051-01-01/", 404],
    ["/ngay/2028-02-29/", 200], // năm nhuận dương lịch
    ["/ngay/2027-02-29/", 404],
    ["/thang/2026-09/", 200],
    ["/thang/1970-01/", 200],
    ["/thang/2050-12/", 200],
    ["/thang/2026-13/", 404],
    ["/thang/2026-00/", 404],
    ["/thang/2026-9/", 404],
    ["/thang/2051-01/", 404],
    ["/nam/2026/", 200],
    ["/nam/1970/", 200],
    ["/nam/2050/", 200],
    ["/nam/1969/", 404],
    ["/nam/2051/", 404],
    ["/nam/26/", 404],
  ];
  for (const [path, want] of statuses) {
    const res = await get(base, path);
    check(`${path} → ${want}`, res.status === want, `nhận ${res.status}`);
    if (want === 200) {
      check(`${path} có đúng 1 h1`, h1s(res.body) === 1);
      check(`${path} có canonical tự trỏ`, canonicalOf(res.body) === SITE + path, String(canonicalOf(res.body)));
    }
  }

  // Trang lịch ngày có nội dung chính.
  const day = await get(base, "/ngay/2026-09-21/");
  day.body = day.body.replace(/<!-- -->/g, "");
  for (const needle of ["Giờ hoàng đạo", "Bành Tổ Bách Kỵ", "Ngày hôm trước", "Ngày hôm sau", "Xem tháng 9/2026"]) {
    check(`ngày 2026-09-21 chứa "${needle}"`, day.body.includes(needle));
  }
  check("ngày trong index range không noindex", robotsOf(day.body) === null || !/noindex/.test(robotsOf(day.body)));

  // Trang lịch lịch sử: render được nhưng noindex.
  for (const path of ["/ngay/1985-06-15/", "/ngay/2040-01-01/", "/thang/1985-06/", "/nam/2045/"]) {
    const res = await get(base, path);
    check(`${path} render 200`, res.status === 200, String(res.status));
    check(`${path} noindex`, /noindex/.test(robotsOf(res.body) ?? ""), String(robotsOf(res.body)));
    check(`${path} vẫn có canonical`, canonicalOf(res.body) === SITE + path);
  }

  // URL cũ: 301 một bước.
  for (const [from, to] of [
    ["/ngay/21-09-2026/", "/ngay/2026-09-21/"],
    ["/lich-thang-9-2026/", "/thang/2026-09/"],
    ["/lich-thang-12-2026/", "/thang/2026-12/"],
  ]) {
    const res = await get(base, from);
    check(`${from} → 301`, res.status === 301, String(res.status));
    check(`${from} → ${to}`, res.location && new URL(res.location, base).pathname === to, String(res.location));
    check(`${to} là trang cuối, không redirect tiếp`, (await get(base, to)).status === 200);
  }
  for (const from of ["/ngay/31-02-2026/", "/ngay/99-99-2026/", "/ngay/01-01-1969/", "/lich-thang-13-2026/", "/lich-thang-1-2051/"]) {
    const res = await get(base, from);
    check(`${from} (không hợp lệ) → 404, không redirect`, res.status === 404, String(res.status));
  }


  // Công cụ ngày tháng: URL sạch index được, trạng thái nhập liệu noindex, canonical luôn về URL sạch.
  const tools = ["dem-ngay", "ngay-sau", "ngay-truoc", "con-bao-nhieu-ngay", "da-bao-nhieu-ngay", "tuoi-theo-ngay-sinh"];
  for (const t of ["", ...tools]) {
    const path = t ? `/cong-cu/${t}/` : "/cong-cu/";
    const res = await get(base, path);
    check(`${path} → 200`, res.status === 200, String(res.status));
    check(`${path} có đúng 1 h1`, h1s(res.body) === 1);
    check(`${path} canonical sạch`, canonicalOf(res.body) === SITE + path);
    check(`${path} index được`, !/noindex/.test(robotsOf(res.body) ?? ""));
  }
  const cases = [
    ["/cong-cu/dem-ngay/?tu=2026-01-01&den=2026-09-21", "263 ngày"],
    ["/cong-cu/ngay-sau/?tu=2026-09-21&so=100", "30/12/2026"],
    ["/cong-cu/ngay-truoc/?tu=2026-09-21&so=21", "31/08/2026"],
    ["/cong-cu/con-bao-nhieu-ngay/?ngay=2100-12-31", "31/12/2100"],
    ["/cong-cu/con-bao-nhieu-ngay/?den=tet-nguyen-dan", "Tết Nguyên đán"],
    ["/cong-cu/da-bao-nhieu-ngay/?tu=2000-01-01", "Đã qua"],
    ["/cong-cu/tuoi-theo-ngay-sinh/?sinh=1990-01-20&den=2026-09-21", "36 tuổi"],
  ];
  for (const [path, needle] of cases) {
    const res = await get(base, path);
    const body = res.body.replace(/<!-- -->/g, "");
    check(`${path} → 200`, res.status === 200, String(res.status));
    check(`${path} chứa "${needle}"`, body.includes(needle));
    check(`${path} noindex`, /noindex/.test(robotsOf(res.body) ?? ""), String(robotsOf(res.body)));
    check(`${path} canonical về URL sạch`, canonicalOf(res.body) === SITE + path.split("?")[0]);
  }
  const bad = [
    "/cong-cu/dem-ngay/?tu=2026-02-31&den=2026-09-21",
    "/cong-cu/ngay-sau/?tu=2026-09-21&so=-5",
    "/cong-cu/ngay-sau/?tu=2100-12-31&so=10",
    "/cong-cu/tuoi-theo-ngay-sinh/?sinh=2030-01-01",
    "/cong-cu/da-bao-nhieu-ngay/?tu=2100-01-01",
  ];
  for (const path of bad) {
    const res = await get(base, path);
    check(`${path} báo lỗi nhập liệu, không sập`, res.status === 200 && res.body.includes("role=\"alert\""), String(res.status));
  }

  // Sitemap: mẫu URL.
  const idx = await get(base, "/sitemap.xml");
  check("sitemap index 200", idx.status === 200);
  const files = [...idx.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, ""));
  check("sitemap có days-2026, months, years, static", ["days-2026", "months", "years", "static"].every((n) => files.some((f) => f.includes(n))));
  check("sitemap không có ngày ngoài index range", !files.some((f) => /days-(19|2019|2036|2050)/.test(f)));
  const days2026 = await get(base, files.find((f) => f.includes("days-2026")));
  const locs = [...days2026.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  check("days-2026 có 365 URL", locs.length === 365, String(locs.length));
  check("days-2026 chỉ chứa URL canonical mới", locs.every((l) => /^https:\/\/licham\.app\/ngay\/2026-\d{2}-\d{2}\/$/.test(l)));
  for (const sample of [locs[0], locs[100], locs.at(-1)]) {
    check(`mẫu sitemap ${sample} → 200`, (await get(base, sample.replace(SITE, ""))).status === 200);
  }
  const months = await get(base, files.find((f) => f.includes("months")));
  check("months.xml dùng /thang/YYYY-MM/", [...months.body.matchAll(/<loc>([^<]+)<\/loc>/g)].every((m) => /\/thang\/\d{4}-\d{2}\/$/.test(m[1])));
});

if (failures.length > 0) {
  console.error(`Smoke test thất bại (${failures.length} ca, ${passed} ca đạt):`);
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}
console.log(`Smoke test đạt: ${passed} kiểm tra.`);
