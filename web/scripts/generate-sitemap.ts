#!/usr/bin/env node
/**
 * Chạy lúc BUILD (trước "next build"), sinh sitemap tĩnh vào public/ vì "output: export"
 * không tự sinh sitemap.xml gộp cho generateSitemaps() của Next (route ảo, không export được).
 *
 * Sinh public/sitemap.xml (mục lục) + public/sitemaps/static.xml + public/sitemaps/{year}.xml
 * (một file mỗi năm trong khoảng YEAR_START..YEAR_END).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { type SolarDate, jdFromDate, jdToDate } from "@licham/core";
import { LE_LIST } from "../lib/le";
import { SITE_URL } from "../lib/site";
import { YEAR_END, YEAR_START } from "../lib/site-years";
import { CON_GIAP_LIST } from "../lib/tu-vi";
import { ALL_CAN_CHI, CHI_LIST, canChiSlug } from "../lib/tuoi";
import { VAN_KHAN_LIST } from "../lib/van-khan";
import { NAM_SINH_MAX, NAM_SINH_MIN, ketHonSlug } from "../lib/xem-tuoi-ket-hon";
import { VIEC_LIST } from "../lib/xem-ngay-tot";

// Reimplemented here (not imported from lib/date-slug, lib/month-slug) because those
// pull in "@/lib/format" via the Next.js "@/*" path alias, which the plain Node loader
// used to run this build-time script cannot resolve.
function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function dateToSlug(d: SolarDate): string {
  return `${pad2(d.day)}-${pad2(d.month)}-${d.year}`;
}

function monthToSlug(month: number, year: number): string {
  return `lich-thang-${month}-${year}`;
}

const PUBLIC_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const SITEMAPS_DIR = join(PUBLIC_DIR, "sitemaps");

interface SitemapEntry {
  url: string;
  changefreq: string;
  priority: number;
}

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;");
}

function renderUrlset(entries: SitemapEntry[]): string {
  const lastmod = new Date().toISOString();
  const body = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${xmlEscape(e.url)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function renderSitemapIndex(files: string[]): string {
  const lastmod = new Date().toISOString();
  const body = files
    .map((f) => `  <sitemap>\n    <loc>${SITE_URL}/sitemaps/${f}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

function buildStaticEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  entries.push({ url: `${SITE_URL}/`, changefreq: "daily", priority: 1 });
  entries.push({ url: `${SITE_URL}/doi-ngay-am-duong/`, changefreq: "yearly", priority: 0.6 });
  entries.push({ url: `${SITE_URL}/gioi-thieu/`, changefreq: "yearly", priority: 0.4 });
  entries.push({ url: `${SITE_URL}/lien-he/`, changefreq: "yearly", priority: 0.4 });
  entries.push({ url: `${SITE_URL}/dieu-khoan/`, changefreq: "yearly", priority: 0.3 });
  entries.push({ url: `${SITE_URL}/chinh-sach-bao-mat/`, changefreq: "yearly", priority: 0.3 });

  for (const v of VIEC_LIST) {
    entries.push({ url: `${SITE_URL}/xem-ngay-tot/${v.slug}/`, changefreq: "monthly", priority: 0.7 });
  }

  entries.push({ url: `${SITE_URL}/van-khan/`, changefreq: "monthly", priority: 0.7 });
  for (const v of VAN_KHAN_LIST) {
    entries.push({ url: `${SITE_URL}/van-khan/${v.slug}/`, changefreq: "yearly", priority: 0.7 });
  }

  entries.push({ url: `${SITE_URL}/tu-vi/`, changefreq: "daily", priority: 0.7 });
  for (const cg of CON_GIAP_LIST) {
    entries.push({ url: `${SITE_URL}/tu-vi/${cg.slug}/`, changefreq: "daily", priority: 0.6 });
  }

  entries.push({ url: `${SITE_URL}/le/`, changefreq: "weekly", priority: 0.8 });
  for (const le of LE_LIST) {
    entries.push({ url: `${SITE_URL}/le/${le.slug}/`, changefreq: "weekly", priority: 0.7 });
  }

  entries.push({ url: `${SITE_URL}/tuoi/`, changefreq: "yearly", priority: 0.7 });
  for (const c of CHI_LIST) {
    entries.push({ url: `${SITE_URL}/tuoi/${c.slug}/`, changefreq: "yearly", priority: 0.6 });
  }
  for (const cc of ALL_CAN_CHI) {
    entries.push({ url: `${SITE_URL}/tuoi/${canChiSlug(cc)}/`, changefreq: "yearly", priority: 0.5 });
  }

  entries.push({ url: `${SITE_URL}/xem-tuoi-ket-hon/`, changefreq: "yearly", priority: 0.7 });
  for (let namNam = NAM_SINH_MIN; namNam <= NAM_SINH_MAX; namNam++) {
    for (let namNu = NAM_SINH_MIN; namNu <= NAM_SINH_MAX; namNu++) {
      entries.push({ url: `${SITE_URL}/xem-tuoi-ket-hon/${ketHonSlug(namNam, namNu)}/`, changefreq: "yearly", priority: 0.5 });
    }
  }

  return entries;
}

function buildYearEntries(year: number): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  for (let month = 1; month <= 12; month++) {
    entries.push({ url: `${SITE_URL}/${monthToSlug(month, year)}/`, changefreq: "monthly", priority: 0.7 });
  }

  const start = jdFromDate(1, 1, year);
  const end = jdFromDate(31, 12, year);
  for (let jd = start; jd <= end; jd++) {
    entries.push({ url: `${SITE_URL}/ngay/${dateToSlug(jdToDate(jd))}/`, changefreq: "yearly", priority: 0.5 });
  }

  return entries;
}

function main() {
  mkdirSync(SITEMAPS_DIR, { recursive: true });

  const files: string[] = [];

  writeFileSync(join(SITEMAPS_DIR, "static.xml"), renderUrlset(buildStaticEntries()));
  files.push("static.xml");

  for (let year = YEAR_START; year <= YEAR_END; year++) {
    const fileName = `${year}.xml`;
    writeFileSync(join(SITEMAPS_DIR, fileName), renderUrlset(buildYearEntries(year)));
    files.push(fileName);
  }

  writeFileSync(join(PUBLIC_DIR, "sitemap.xml"), renderSitemapIndex(files));

  console.log(`sitemap: đã sinh public/sitemap.xml + ${files.length} file trong public/sitemaps/`);
}

main();
