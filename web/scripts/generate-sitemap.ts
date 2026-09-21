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
import { jdFromDate, jdToDate } from "@licham/core";
import { canIndexPage } from "../lib/calendar/policy";
import { INDEX_RANGE } from "../lib/calendar/config";
import { dayHref, monthHref, yearHref } from "../lib/calendar/urls";
import { LE_LIST } from "../lib/le";
import { TOOLS, TOOLS_HUB } from "../lib/tools/tools";
import { SITE_URL } from "../lib/site";
import { YEAR_END, YEAR_START } from "../lib/site-years";
import { CON_GIAP_LIST } from "../lib/tu-vi";
import { ALL_CAN_CHI, CHI_LIST, canChiSlug } from "../lib/tuoi";
import { VAN_KHAN_LIST } from "../lib/van-khan";
import { NAM_SINH_MAX, NAM_SINH_MIN, ketHonSlug } from "../lib/xem-tuoi-ket-hon";
import { COUNTDOWN_LIST } from "../lib/countdown";
import { TEN_LIST } from "../lib/ten";
import { nghiLeYears } from "../lib/lich-nghi-le";
import { sinhNamYears } from "../lib/sinh-nam";
import { VIEC_LIST } from "../lib/xem-ngay-tot";
import { KNOWLEDGE } from "../lib/knowledge";


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
  entries.push({ url: `${SITE_URL}/hom-nay/`, changefreq: "daily", priority: 0.9 });
  entries.push({ url: `${SITE_URL}/ngay-mai/`, changefreq: "daily", priority: 0.8 });
  entries.push({ url: `${SITE_URL}/phuong-phap-tinh-lich/`, changefreq: "yearly", priority: 0.5 });
  entries.push({ url: `${SITE_URL}/kien-thuc/`, changefreq: "monthly", priority: 0.7 });
  for (const k of KNOWLEDGE) {
    entries.push({ url: `${SITE_URL}/kien-thuc/${k.slug}/`, changefreq: "yearly", priority: 0.6 });
  }
  entries.push({ url: `${SITE_URL}/doi-ngay-am-duong/`, changefreq: "yearly", priority: 0.6 });
  entries.push({ url: `${SITE_URL}/gioi-thieu/`, changefreq: "yearly", priority: 0.4 });
  entries.push({ url: `${SITE_URL}/lien-he/`, changefreq: "yearly", priority: 0.4 });
  entries.push({ url: `${SITE_URL}/dieu-khoan/`, changefreq: "yearly", priority: 0.3 });
  entries.push({ url: `${SITE_URL}/chinh-sach-bao-mat/`, changefreq: "yearly", priority: 0.3 });

  entries.push({ url: `${SITE_URL}${TOOLS_HUB.href}`, changefreq: "monthly", priority: 0.8 });
  for (const t of TOOLS) {
    entries.push({ url: `${SITE_URL}${t.href}`, changefreq: "monthly", priority: 0.7 });
  }

  entries.push({ url: `${SITE_URL}/xem-ngay-tot/`, changefreq: "monthly", priority: 0.8 });
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
    for (let y = YEAR_START; y <= YEAR_END; y++) {
      entries.push({ url: `${SITE_URL}/tu-vi/${cg.slug}/${y}/`, changefreq: "yearly", priority: 0.5 });
    }
  }

  entries.push({ url: `${SITE_URL}/ten/`, changefreq: "yearly", priority: 0.7 });
  for (const t of TEN_LIST) {
    entries.push({ url: `${SITE_URL}/ten/${t.slug}/`, changefreq: "yearly", priority: 0.5 });
  }

  entries.push({ url: `${SITE_URL}/le/`, changefreq: "weekly", priority: 0.8 });
  for (const le of LE_LIST) {
    entries.push({ url: `${SITE_URL}/le/${le.slug}/`, changefreq: "weekly", priority: 0.7 });
  }

  entries.push({ url: `${SITE_URL}/tinh-tuoi/`, changefreq: "daily", priority: 0.9 });
  entries.push({ url: `${SITE_URL}/phong-thuy/xung-tuoi/`, changefreq: "yearly", priority: 0.7 });
  entries.push({ url: `${SITE_URL}/phong-thuy/xem-tuoi-xay-nha/`, changefreq: "yearly", priority: 0.7 });
  for (const c of COUNTDOWN_LIST) {
    entries.push({ url: `${SITE_URL}/countdown/${c.slug}/`, changefreq: "daily", priority: 0.8 });
  }
  for (const y of nghiLeYears()) {
    entries.push({ url: `${SITE_URL}/lich-nghi-le/${y}/`, changefreq: "yearly", priority: 0.6 });
  }
  for (const y of sinhNamYears()) {
    entries.push({ url: `${SITE_URL}/sinh-nam/${y}/`, changefreq: "yearly", priority: 0.6 });
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

function buildMonthEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  for (let year = INDEX_RANGE.start; year <= INDEX_RANGE.end; year++) {
    for (let month = 1; month <= 12; month++) {
      if (canIndexPage({ kind: "month", month, year })) {
        entries.push({ url: `${SITE_URL}${monthHref(month, year)}`, changefreq: "monthly", priority: 0.7 });
      }
    }
  }
  return entries;
}

function buildYearListEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  for (let year = INDEX_RANGE.start; year <= INDEX_RANGE.end; year++) {
    if (canIndexPage({ kind: "year", year })) entries.push({ url: `${SITE_URL}${yearHref(year)}`, changefreq: "yearly", priority: 0.8 });
  }
  return entries;
}

/** Mỗi năm một file, luôn dưới 50.000 URL và chỉ chứa URL canonical được phép index. */
function buildDayEntries(year: number): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  for (let jd = jdFromDate(1, 1, year); jd <= jdFromDate(31, 12, year); jd++) {
    const date = jdToDate(jd);
    if (canIndexPage({ kind: "day", date })) entries.push({ url: `${SITE_URL}${dayHref(date)}`, changefreq: "yearly", priority: 0.5 });
  }
  return entries;
}

function main() {
  mkdirSync(SITEMAPS_DIR, { recursive: true });

  const files: string[] = [];
  const write = (name: string, entries: SitemapEntry[]) => {
    writeFileSync(join(SITEMAPS_DIR, name), renderUrlset(entries));
    files.push(name);
  };

  write("static.xml", buildStaticEntries());
  write("months.xml", buildMonthEntries());
  write("years.xml", buildYearListEntries());
  for (let year = INDEX_RANGE.start; year <= INDEX_RANGE.end; year++) write(`days-${year}.xml`, buildDayEntries(year));

  writeFileSync(join(PUBLIC_DIR, "sitemap.xml"), renderSitemapIndex(files));

  console.log(`sitemap: đã sinh public/sitemap.xml + ${files.length} file trong public/sitemaps/`);
}

main();
