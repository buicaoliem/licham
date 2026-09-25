#!/usr/bin/env node
/**
 * SEO audit nội bộ: khởi động server production (`next start`, cần `pnpm build` trước), lấy toàn bộ URL trong
 * sitemap, tải từng trang và kiểm tra. Thoát mã 1 nếu có lỗi critical.
 *
 *   pnpm seo:audit                       # audit đầy đủ
 *   SEO_AUDIT_BASE_URL=http://... pnpm seo:audit   # dùng server có sẵn
 *   SEO_AUDIT_SAMPLE_DAYS=7 pnpm seo:audit         # chỉ lấy 1/7 trang ngày (nhanh hơn)
 */
import { get, pool, withServer } from "./lib/server.mjs";

const SITE_URL = "https://licham.app";
const SAMPLE_DAYS = Number(process.env.SEO_AUDIT_SAMPLE_DAYS ?? 1);
const CONCURRENCY = Number(process.env.SEO_AUDIT_CONCURRENCY ?? 16);
/** Trang lịch do audit này chịu trách nhiệm: trùng title/thiếu description là lỗi critical. */
const STRICT_PREFIX = /^\/(ngay|thang|nam|cong-cu)\//;
/** Đường dẫn cũ chỉ tồn tại để tương thích: không được xuất hiện trong sitemap hay link nội bộ. */
const LEGACY = [/^\/ngay\/\d{2}-\d{2}-\d{4}\/?$/, /^\/lich-thang-\d{1,2}-\d{4}\/?$/];

const findings = []; // {severity, rule, url, detail}
const add = (severity, rule, url, detail = "") => findings.push({ severity, rule, url, detail });

function decode(s) {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function attr(tag, name) {
  const m = new RegExp(`\\s${name}=("([^"]*)"|'([^']*)')`, "i").exec(tag);
  return m ? decode(m[2] ?? m[3] ?? "") : null;
}

function parseHtml(html) {
  const title = /<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1];
  const metas = [...html.matchAll(/<meta\s[^>]*>/gi)].map((m) => m[0]);
  const description = metas.map((t) => (attr(t, "name") === "description" ? attr(t, "content") : null)).find((v) => v !== null && v !== undefined);
  const robots = metas.map((t) => (attr(t, "name") === "robots" ? attr(t, "content") : null)).find((v) => v !== null && v !== undefined);
  const canonicals = [...html.matchAll(/<link\s[^>]*>/gi)].map((m) => m[0]).filter((t) => attr(t, "rel") === "canonical").map((t) => attr(t, "href"));
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  const links = [...html.matchAll(/<a\s[^>]*>/gi)].map((m) => attr(m[0], "href")).filter(Boolean);
  const jsonLd = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const text = decode(html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
  return { title: title === undefined ? null : decode(title).trim(), description, robots, canonicals, h1Count, links, jsonLd, text };
}

function normalizeLink(href) {
  let h = href.trim();
  if (h.startsWith(SITE_URL)) h = h.slice(SITE_URL.length) || "/";
  if (!h.startsWith("/") || h.startsWith("//")) return null;
  h = h.split("#")[0];
  if (h.startsWith("/_next/")) return null;
  return h || "/";
}

function isValidSolar(y, m, d) {
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

function checkUrlShape(path, from) {
  const day = /^\/ngay\/(\d{4})-(\d{2})-(\d{2})\/?$/.exec(path);
  if (day && (!isValidSolar(+day[1], +day[2], +day[3]) || +day[1] < 1970 || +day[1] > 2050)) add("critical", "invalid-date-url", path, `linked from ${from}`);
  const month = /^\/thang\/(\d{4})-(\d{2})\/?$/.exec(path);
  if (month && (+month[2] < 1 || +month[2] > 12 || +month[1] < 1970 || +month[1] > 2050)) add("critical", "invalid-date-url", path, `linked from ${from}`);
  const year = /^\/nam\/(\d{4})\/?$/.exec(path);
  if (year && (+year[1] < 1970 || +year[1] > 2050)) add("critical", "invalid-date-url", path, `linked from ${from}`);
  if (LEGACY.some((re) => re.test(path))) add("critical", "legacy-url-in-content", path, `linked from ${from}`);
}

function checkJsonLd(path, page) {
  const types = [];
  for (const raw of page.jsonLd) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      add("critical", "jsonld-invalid-json", path);
      continue;
    }
    for (const node of Array.isArray(data) ? data : [data]) {
      types.push(node["@type"]);
      if (node["@context"] !== "https://schema.org") add("critical", "jsonld-context", path);
      if (node["@type"] === "BreadcrumbList") {
        const items = node.itemListElement ?? [];
        items.forEach((it, i) => {
          if (it.position !== i + 1) add("critical", "jsonld-breadcrumb-position", path);
          if (!it.name) add("critical", "jsonld-breadcrumb-name", path);
          if (!it.item && i < items.length - 1) add("critical", "jsonld-breadcrumb-item", path, `mục ${i + 1} thiếu item`);
          if (it.item && !it.item.startsWith(SITE_URL)) add("critical", "jsonld-breadcrumb-item", path, it.item);
        });
      }
      if (node["@type"] === "FAQPage") {
        for (const q of node.mainEntity ?? []) {
          const a = q.acceptedAnswer?.text ?? "";
          if (!page.text.includes(q.name) || !page.text.includes(a)) add("critical", "jsonld-faq-not-visible", path, q.name);
        }
      }
    }
  }
  for (const t of ["BreadcrumbList", "FAQPage"]) {
    if (types.filter((x) => x === t).length > 1) add("critical", "jsonld-duplicate", path, t);
  }
}

async function fetchSitemapUrls(base) {
  const index = await get(base, "/sitemap.xml");
  if (index.status !== 200) throw new Error(`/sitemap.xml trả ${index.status}`);
  const files = [...index.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => normalizeLink(decode(m[1])));
  const urls = [];
  for (const f of files) {
    const res = await get(base, f);
    if (res.status !== 200) {
      add("critical", "sitemap-file-not-200", f, String(res.status));
      continue;
    }
    const locs = [...res.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
    if (locs.length > 50000) add("critical", "sitemap-too-large", f, String(locs.length));
    for (const loc of locs) {
      if (!loc.startsWith(SITE_URL + "/")) {
        add("critical", "sitemap-foreign-url", loc, f);
        continue;
      }
      urls.push({ path: loc.slice(SITE_URL.length), file: f });
    }
  }
  return urls;
}

try {
  await withServer(async (base) => {
  const started = Date.now();
  const all = await fetchSitemapUrls(base);
  let dayIdx = 0;
  const targets = all.filter((u) => !/^\/ngay\//.test(u.path) || dayIdx++ % SAMPLE_DAYS === 0);
  const seen = new Set();
  for (const u of targets) {
    if (seen.has(u.path)) add("critical", "sitemap-duplicate-url", u.path, u.file);
    seen.add(u.path);
  }
  console.log(`Sitemap: ${all.length} URL (${targets.length} được audit${SAMPLE_DAYS > 1 ? `, lấy mẫu 1/${SAMPLE_DAYS} ngày` : ""})`);

  const pages = new Map(); // path -> parsed
  const inbound = new Map(); // path -> Set(from)
  const linkTargets = new Map(); // path -> from (first)

  await pool(targets, CONCURRENCY, async ({ path }) => {
    if (LEGACY.some((re) => re.test(path))) add("critical", "legacy-url-in-sitemap", path);
    checkUrlShape(path, "sitemap");
    const res = await get(base, path);
    if (res.status >= 300 && res.status < 400) return add("critical", "sitemap-redirect", path, `${res.status} → ${res.location}`);
    if (res.status !== 200) return add("critical", "sitemap-not-200", path, String(res.status));
    const page = parseHtml(res.body);
    pages.set(path, page);
    const strict = STRICT_PREFIX.test(path);

    if (!page.title) add("critical", "missing-title", path);
    if (!page.description) add(strict ? "critical" : "warning", "missing-description", path);
    if (page.h1Count !== 1) add("critical", page.h1Count === 0 ? "missing-h1" : "multiple-h1", path, `${page.h1Count} h1`);
    if (page.robots && /noindex/i.test(page.robots)) add("critical", "noindex-in-sitemap", path, page.robots);
    if (page.canonicals.length !== 1) add("critical", "canonical-count", path, `${page.canonicals.length} canonical`);
    else if (page.canonicals[0] !== SITE_URL + path) add("critical", "canonical-mismatch", path, page.canonicals[0]);
    checkJsonLd(path, page);

    for (const href of page.links) {
      const l = normalizeLink(href);
      if (!l) continue;
      checkUrlShape(l, path);
      if (!inbound.has(l)) inbound.set(l, new Set());
      inbound.get(l).add(path);
      if (!linkTargets.has(l)) linkTargets.set(l, path);
    }
  });

  // Trùng title / canonical giữa các trang trong sitemap.
  const byTitle = new Map();
  const byCanon = new Map();
  for (const [path, p] of pages) {
    if (p.title) (byTitle.get(p.title) ?? byTitle.set(p.title, []).get(p.title)).push(path);
    for (const c of p.canonicals) (byCanon.get(c) ?? byCanon.set(c, []).get(c)).push(path);
  }
  for (const [title, paths] of byTitle) {
    if (paths.length > 1) add(STRICT_PREFIX.test(paths[0]) ? "critical" : "warning", "duplicate-title", paths.slice(0, 3).join(" , "), `${paths.length} trang: ${title}`);
  }
  for (const [c, paths] of byCanon) if (paths.length > 1) add("critical", "duplicate-canonical", c, paths.slice(0, 3).join(" , "));

  // Link nội bộ: phải 200 và không đi qua redirect.
  const toCheck = [...linkTargets.keys()].filter((l) => !seen.has(l));
  console.log(`Link nội bộ: ${inbound.size} URL duy nhất, ${toCheck.length} chưa nằm trong sitemap`);
  await pool(toCheck, CONCURRENCY, async (l) => {
    const res = await get(base, l);
    const from = linkTargets.get(l);
    if (res.status >= 300 && res.status < 400) add("critical", "internal-link-redirects", l, `${res.status} → ${res.location} (từ ${from})`);
    else if (res.status !== 200) add("critical", "broken-internal-link", l, `${res.status} (từ ${from})`);
  });

  // Trang quan trọng không có link trỏ tới từ trang khác.
  const important = targets.filter((u) => /^\/(thang|nam|cong-cu|le|van-khan|tuoi|tu-vi|xem-ngay-tot|countdown)\//.test(u.path) || u.file.includes("static") || u.file.includes("years") || u.file.includes("months"));
  for (const { path } of important) {
    const from = [...(inbound.get(path) ?? [])].filter((p) => p !== path);
    if (from.length === 0) add("critical", "orphan-page", path);
  }

  // URL cũ: đúng 1 bước 301 tới URL cuối 200; ngày sai thì 404, không redirect.
  const probes = [
    ["/ngay/21-09-2026/", 301, "/ngay/2026-09-21/"],
    ["/lich-thang-9-2026/", 301, "/thang/2026-09/"],
    ["/lich-thang-12-2026/", 301, "/thang/2026-12/"],
    ["/ngay/31-02-2026/", 404],
    ["/lich-thang-13-2026/", 404],
  ];
  for (const [path, status, dest] of probes) {
    const res = await get(base, path);
    if (res.status !== status) add("critical", "legacy-probe", path, `mong ${status}, nhận ${res.status}`);
    if (dest) {
      const loc = res.location ? new URL(res.location, base).pathname : null;
      if (loc !== dest) add("critical", "legacy-redirect-target", path, `mong ${dest}, nhận ${loc}`);
      else {
        const final = await get(base, dest);
        if (final.status !== 200) add("critical", "redirect-chain", path, `${dest} trả ${final.status}`);
      }
    }
  }

  // Báo cáo
  const critical = findings.filter((f) => f.severity === "critical");
  const warnings = findings.filter((f) => f.severity !== "critical");
  const group = (list) => {
    const m = new Map();
    for (const f of list) (m.get(f.rule) ?? m.set(f.rule, []).get(f.rule)).push(f);
    return m;
  };
  for (const [label, list] of [["CRITICAL", critical], ["WARNING", warnings]]) {
    for (const [rule, items] of group(list)) {
      console.log(`\n[${label}] ${rule} (${items.length})`);
      for (const f of items.slice(0, 8)) console.log(`  ${f.url}${f.detail ? "  " + f.detail : ""}`);
      if (items.length > 8) console.log(`  … và ${items.length - 8} mục nữa`);
    }
  }
  console.log(`\nĐã audit ${pages.size} trang + ${toCheck.length} link trong ${((Date.now() - started) / 1000).toFixed(1)}s: ${critical.length} critical, ${warnings.length} warning.`);
  process.exitCode = critical.length > 0 ? 1 : 0;
});
} catch (e) {
  console.error("Audit không chạy hết:", e);
  process.exitCode = 2;
}
