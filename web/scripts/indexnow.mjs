#!/usr/bin/env node
/**
 * IndexNow submitter — pings search engines when production pages are added,
 * changed, or removed. Never submits the whole site on every deploy: it diffs
 * the current sitemap against the last known snapshot and only sends the delta.
 *
 *   npm run indexnow                  # diff sitemap.xml vs last run, submit delta
 *   npm run indexnow -- --dry-run     # same, but only print what would be sent
 *   npm run indexnow -- --all         # bypass the diff, submit every sitemap URL
 *   npm run indexnow -- --urls=https://ORIGIN/a,https://ORIGIN/b
 *
 * Env:  SITEMAP_URL=https://ORIGIN/sitemap.xml (override for local testing)
 *       STATE_FILE=.indexnow-state.json (override state snapshot location)
 *
 * Exit code is always 0 unless the script itself is misconfigured (no key
 * file found, no URLs to submit while --urls was malformed, etc). A failure
 * or timeout from the IndexNow API is logged but never fails the run.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const ORIGIN = "https://licham.app"; // <-- set per repo
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const PUBLIC_DIR = path.join(ROOT, "public");
const STATE_FILE = path.join(ROOT, process.env.STATE_FILE || ".indexnow-state.json");

const KEY_FILE_RE = /^[a-f0-9]{32}\.txt$/i;

function parseArgs(argv) {
  const args = { dryRun: false, all: false, urls: null, sitemapUrl: process.env.SITEMAP_URL || `${ORIGIN}/sitemap.xml` };
  for (const raw of argv) {
    if (raw === "--dry-run") args.dryRun = true;
    else if (raw === "--all") args.all = true;
    else if (raw.startsWith("--urls=")) args.urls = raw.slice(7).split(",").map((s) => s.trim()).filter(Boolean);
    else if (raw.startsWith("--sitemap=")) args.sitemapUrl = raw.slice(10);
  }
  return args;
}

export function findKeyFile(dir = PUBLIC_DIR) {
  const candidates = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => KEY_FILE_RE.test(f)) : [];
  if (candidates.length === 0) throw new Error(`Không tìm thấy key file IndexNow trong ${dir} (cần public/<32-hex>.txt).`);
  if (candidates.length > 1) throw new Error(`Có nhiều key file IndexNow trong ${dir}: ${candidates.join(", ")}. Chỉ được có 1.`);
  const file = candidates[0];
  const key = path.basename(file, ".txt").toLowerCase();
  const content = fs.readFileSync(path.join(dir, file), "utf8").trim();
  if (content.toLowerCase() !== key) throw new Error(`Nội dung ${file} ("${content}") không khớp tên file ("${key}").`);
  return { key, keyLocation: `${ORIGIN}/${file}` };
}

const BLOCKED_PATH_RE = /^\/(api|admin|auth|preview|login|staging)(\/|$)/i;

export function isSubmittableUrl(rawUrl) {
  let u;
  try { u = new URL(rawUrl); } catch { return false; }
  if (u.origin !== ORIGIN) return false;
  if (u.search || u.hash) return false;
  if (u.hostname.endsWith(".vercel.app")) return false;
  // licham.app uses next.config trailingSlash: true, so "/foo/" is the
  // canonical URL for nearly every page — unlike the vayicloud template this
  // was adapted from, a trailing slash must NOT be excluded here.
  if (BLOCKED_PATH_RE.test(u.pathname)) return false;
  if (/\.(xml|txt|json|png|jpg|jpeg|svg|webp|ico|css|js|map)$/i.test(u.pathname)) return false;
  return true;
}

export function dedupeUrls(urls) { return [...new Set(urls)]; }

export function parseSitemap(xml) {
  const entries = [];
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = (m[1].match(/<loc>([\s\S]*?)<\/loc>/) || [])[1]?.trim();
    const lastmod = (m[1].match(/<lastmod>([\s\S]*?)<\/lastmod>/) || [])[1]?.trim();
    if (loc) entries.push({ loc, lastmod: lastmod || null });
  }
  return entries;
}

// licham.app's /sitemap.xml is a <sitemapindex> (see web/scripts/generate-sitemap.ts),
// pointing at sub-sitemaps (static.xml, months.xml, years.xml, days-YYYY.xml) — it has
// no <url> entries of its own. Resolve one level of index before parsing <url> entries.
export function parseSitemapIndex(xml) {
  const locs = [];
  for (const m of xml.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/g)) {
    const loc = (m[1].match(/<loc>([\s\S]*?)<\/loc>/) || [])[1]?.trim();
    if (loc) locs.push(loc);
  }
  return locs;
}

async function fetchXml(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch sitemap thất bại: ${url} → HTTP ${res.status}`);
  return res.text();
}

async function fetchSitemap(sitemapUrl) {
  const xml = await fetchXml(sitemapUrl);
  if (/<sitemapindex[\s>]/.test(xml)) {
    const subSitemapUrls = parseSitemapIndex(xml);
    const entries = [];
    for (const subUrl of subSitemapUrls) {
      const subXml = await fetchXml(subUrl);
      entries.push(...parseSitemap(subXml));
    }
    return entries;
  }
  return parseSitemap(xml);
}

export function loadState(file = STATE_FILE) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { return { urls: {} }; }
}
export function saveState(state, file = STATE_FILE) {
  fs.writeFileSync(file, JSON.stringify(state, null, 2) + "\n");
}

export function diffUrls(current, previousUrls) {
  const added = [], changed = [], removed = [];
  const currentMap = new Map(current.map((e) => [e.loc, e.lastmod]));
  for (const [loc, lastmod] of currentMap) {
    if (!(loc in previousUrls)) added.push(loc);
    else if (previousUrls[loc] !== lastmod) changed.push(loc);
  }
  for (const loc of Object.keys(previousUrls)) if (!currentMap.has(loc)) removed.push(loc);
  return { added, changed, removed };
}

async function submit({ key, keyLocation, urls }) {
  const body = JSON.stringify({ host: new URL(ORIGIN).host, key, keyLocation, urlList: urls });
  const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" }, body });
  const text = await res.text().catch(() => "");
  return { status: res.status, ok: res.ok, body: text };
}

// IndexNow caps a single request at 10,000 URLs. Split larger submissions
// into sequential batches so the portfolio-wide script keeps working as
// sites grow past that limit.
const MAX_URLS_PER_BATCH = 10000;
const MAX_RETRIES_PER_BATCH = 3;

export function chunkUrls(urls, size = MAX_URLS_PER_BATCH) {
  const chunks = [];
  for (let i = 0; i < urls.length; i += size) chunks.push(urls.slice(i, i + size));
  return chunks;
}

function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

// Submits all URLs in batches of at most MAX_URLS_PER_BATCH. A batch that
// gets HTTP 429 is retried with a short backoff; a batch that errors over
// the network is logged and skipped so the rest of the run keeps going.
// Never throws — submission failures must never fail the deployment.
async function submitBatches({ key, keyLocation, urls }) {
  const batches = chunkUrls(urls);
  let submittedCount = 0;
  let allOk = true;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const batchNum = i + 1;
    let attempt = 0;
    let batchOk = false;

    while (attempt < MAX_RETRIES_PER_BATCH && !batchOk) {
      attempt++;
      try {
        const result = await submit({ key, keyLocation, urls: batch });
        const accepted = result.status === 200 || result.status === 202;
        if (accepted) {
          console.log(`Batch ${batchNum}/${batches.length}: ${batch.length} URL — HTTP ${result.status}${result.body ? ` — ${result.body}` : ""}`);
          submittedCount += batch.length;
          batchOk = true;
        } else if (result.status === 429 && attempt < MAX_RETRIES_PER_BATCH) {
          const waitMs = 2000 * attempt;
          console.error(`Batch ${batchNum}/${batches.length}: HTTP 429 (rate limited), thử lại sau ${waitMs}ms (lần ${attempt}/${MAX_RETRIES_PER_BATCH}).`);
          await sleep(waitMs);
        } else {
          console.error(`Batch ${batchNum}/${batches.length}: ${batch.length} URL — HTTP ${result.status}${result.body ? ` — ${result.body}` : ""}. Không làm fail deployment.`);
          allOk = false;
          break;
        }
      } catch (e) {
        console.error(`Batch ${batchNum}/${batches.length}: lỗi mạng — ${e.message}. Bỏ qua, tiếp tục batch tiếp theo.`);
        allOk = false;
        break;
      }
    }
    if (!batchOk && attempt >= MAX_RETRIES_PER_BATCH) allOk = false;
  }

  console.log(`Tổng cộng: ${batches.length} batch, submit thành công ${submittedCount}/${urls.length} URL.`);
  return { ok: allOk, submittedCount, totalCount: urls.length, batchCount: batches.length };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { key, keyLocation } = findKeyFile();
  let urlsToSubmit, nextState = null;

  if (args.urls) {
    const invalid = args.urls.filter((u) => !isSubmittableUrl(u));
    if (invalid.length) throw new Error(`URL không hợp lệ để submit IndexNow: ${invalid.join(", ")}`);
    urlsToSubmit = dedupeUrls(args.urls);
  } else {
    const sitemapEntries = (await fetchSitemap(args.sitemapUrl)).filter((e) => isSubmittableUrl(e.loc));
    const state = loadState();
    const { added, changed, removed } = diffUrls(sitemapEntries, state.urls);
    nextState = { urls: Object.fromEntries(sitemapEntries.map((e) => [e.loc, e.lastmod])) };
    urlsToSubmit = args.all ? dedupeUrls(sitemapEntries.map((e) => e.loc)) : dedupeUrls([...added, ...changed, ...removed]);
    console.log(`Sitemap: ${sitemapEntries.length} URL. mới: ${added.length}, cập nhật: ${changed.length}, đã gỡ: ${removed.length}.`);
  }

  console.log(`Chuẩn bị submit ${urlsToSubmit.length} URL tới IndexNow.`);
  if (urlsToSubmit.length === 0) { console.log("Không có gì để submit."); if (nextState) saveState(nextState); return; }
  for (const u of urlsToSubmit) console.log(`  · ${u}`);

  if (args.dryRun) { console.log("(--dry-run) Không gọi IndexNow API, không lưu state."); return; }

  const result = await submitBatches({ key, keyLocation, urls: urlsToSubmit });
  if (result.ok && nextState) saveState(nextState);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => { console.error(`indexnow.mjs: ${e.message}`); process.exitCode = 1; });
}
