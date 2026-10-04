/**
 * Nguồn dữ liệu cho feed nội dung của app di động (build-time, tĩnh).
 * Hình dạng từng collection giữ đúng như script export của app (licham_mobile:
 * scripts/export_web_data.mjs → catalog, scripts/export_heritage_content.mjs → heritage),
 * để file tải về khớp file bundle trong app. Hợp đồng: licham_mobile docs/CONTENT_SYNC.md.
 *
 * Chỉ dùng trong script/test (đọc fs, git); không import từ code của Next.
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { LE_LIST, leBySlug } from "../le";
import { VAN_KHAN_LIST } from "../van-khan";
import { KNOWLEDGE } from "../knowledge";
import { TOOLS } from "../tools/tools";
import { VIEC_LIST } from "../xem-ngay-tot";
import { vanKhanImage } from "../van-khan-anh";
import { HERITAGE_SLOTS, ILLUSTRATION_CAPTION, LE_TRANH_LICH_SU, conGiapImagePath, leImage } from "../heritage-assets";
import { ANH_HUNG, THOI_KY, anhHungImagePath, thoiKyLabel, wikiUrl } from "../anh-hung";
import { MUA_LABEL, NGUON_TIET_KHI, TIET_KHI, tietKhiArt, wikiTietUrl } from "../tiet-khi";

export const SCHEMA_VERSION = 1;
export const FEED_BASE_PATH = "/api/app/content";
export const COLLECTIONS = ["catalog", "heritage", "articles"] as const;
export type CollectionName = (typeof COLLECTIONS)[number];

const WEB_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const REPO_ROOT = join(WEB_ROOT, "..");
const PUBLIC_DIR = join(WEB_ROOT, "public");

const RANGE = { firstYear: 2020, lastYear: 2040 };
const NOTE_PHOTO = "Ảnh: Wikimedia Commons, phạm vi công cộng";
const PHOTO_HCM = "/le/ho-chi-minh-1946.jpg";
/** Web chưa có nguồn bài biên tập: collection luôn là mảng rỗng, dấu thời gian cố định. */
const ARTICLES_STAMP = "2026-09-30T10:00:00Z";
const EPOCH = "1970-01-01T00:00:00Z";

/** Thư mục nguồn quyết định nội dung feed (đổi file ở đây → dấu thời gian mới). */
const SOURCE_DIRS = ["web/lib", "web/content", "core/src"];

export interface Stamp {
  /** ISO-8601 UTC, không có phần nghìn giây. */
  at: string;
  commit: string;
}

/** Commit cuối cùng chạm vào nguồn nội dung: ổn định giữa các lần build, chỉ tăng khi nguồn đổi. */
export function sourceStamp(): Stamp {
  try {
    const out = execFileSync("git", ["-C", REPO_ROOT, "log", "-1", "--format=%cI %H", "--", ...SOURCE_DIRS], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const [iso, commit] = out.split(" ");
    if (iso && commit && !Number.isNaN(Date.parse(iso))) {
      return { at: new Date(iso).toISOString().replace(/\.\d{3}Z$/, "Z"), commit };
    }
  } catch {
    /* không có git (bản tải về dạng zip) */
  }
  return { at: EPOCH, commit: "not-provided-in-archive" };
}

/** SHA-256 trên mã nguồn core/src + web/lib (cùng cách tính với export của app). */
function sourceFingerprint(): string {
  const hash = createHash("sha256");
  const visit = (base: string) => {
    for (const entry of readdirSync(base).sort()) {
      const file = join(base, entry);
      if (statSync(file).isDirectory()) visit(file);
      else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
        hash.update(relative(REPO_ROOT, file).replace(/\\/g, "/"));
        hash.update(readFileSync(file));
      }
    }
  };
  visit(join(REPO_ROOT, "core", "src"));
  visit(join(WEB_ROOT, "lib"));
  return hash.digest("hex");
}

/** Tranh dùng trong feed: đường dẫn asset của app, chỉ khi file tồn tại trên web (như export của app). */
function art(webPath: string | null | undefined): string | null {
  if (!webPath) return null;
  if (!existsSync(join(PUBLIC_DIR, webPath))) return null;
  const heritage = webPath.startsWith("/heritage/") ? webPath : "/heritage/photo" + webPath.slice(webPath.lastIndexOf("/"));
  return "assets" + heritage.replace(/\.(jpe?g|png)$/i, ".webp");
}

function buildCatalog(stamp: Stamp): unknown {
  return {
    schemaVersion: SCHEMA_VERSION,
    generatedAt: stamp.at,
    source: "licham-web-read-only-export",
    sourceCommit: stamp.commit,
    sourceFingerprint: sourceFingerprint(),
    range: RANGE,
    festivals: LE_LIST,
    prayers: VAN_KHAN_LIST,
    knowledge: KNOWLEDGE,
    tools: TOOLS,
    goodDayTopics: VIEC_LIST,
  };
}

function buildHeritage(stamp: Stamp): unknown {
  const festivalArt: Record<string, unknown> = {};
  for (const page of LE_LIST) {
    if (page.coAnhThat) {
      festivalArt[page.slug] = { image: art(PHOTO_HCM), kind: "photo", note: NOTE_PHOTO };
      continue;
    }
    const img = leImage(page.slug);
    if (!img) continue;
    const lichSu = img.startsWith("/heritage/le/") && (page.nhom === "anh-hung" || LE_TRANH_LICH_SU.has(page.slug));
    festivalArt[page.slug] = { image: art(img), kind: "img", note: lichSu ? ILLUSTRATION_CAPTION : null };
  }

  const heroArt = (a: (typeof ANH_HUNG)[number]) => {
    const page = a.leSlug ? leBySlug(a.leSlug) : undefined;
    if (page?.coAnhThat) return { image: art(PHOTO_HCM), kind: "photo", note: NOTE_PHOTO };
    const img = page ? leImage(page.slug) : null;
    if (img) return { image: art(img), kind: "img", note: ILLUSTRATION_CAPTION };
    const own = art(anhHungImagePath(a.slug));
    if (own) return { image: own, kind: "img", note: ILLUSTRATION_CAPTION };
    return null;
  };

  const heroes = ANH_HUNG.map((a, order) => ({
    ...a,
    order,
    wikiUrl: wikiUrl(a.wikiTitle),
    thoiKyLabel: thoiKyLabel(a.thoiKy),
    art: heroArt(a),
  }));

  const solarTerms = TIET_KHI.map((t, order) => ({
    ...t,
    order,
    art: tietKhiArt(t) ? { image: art(tietKhiArt(t)), kind: "img", note: null } : null,
    wikiUrl: wikiTietUrl(t.ten),
  }));

  const prayerArt: Record<string, string> = {};
  for (const p of VAN_KHAN_LIST) {
    const img = vanKhanImage(p.slug, p.nhom);
    if (img) prayerArt[p.slug] = art(img) as string;
  }

  const conGiapArt: Record<string, string> = {};
  for (const slug of ["ty", "suu", "dan", "mao", "thin", "ty-ran", "ngo", "mui", "than", "dau", "tuat", "hoi"]) {
    const img = art(conGiapImagePath(slug));
    if (img) conGiapArt[slug] = img;
  }

  const banners: Record<string, string> = {};
  for (const [key, slot] of Object.entries(HERITAGE_SLOTS) as [string, { path: string }][]) {
    if (!slot.path.endsWith(".webp") || key.startsWith("side")) continue;
    const img = art(slot.path);
    if (img) banners[key] = img;
  }
  const hero = art("/heritage/hero/anh-hung-dan-toc.webp");
  if (hero) banners.anhHungDanToc = hero;

  return {
    schemaVersion: SCHEMA_VERSION,
    source: "licham-web-read-only-export",
    sourceCommit: stamp.commit,
    generatedAt: stamp.at,
    banners,
    festivalArt,
    prayerArt,
    conGiapArt,
    eras: THOI_KY,
    heroes,
    solarTermSeasons: MUA_LABEL,
    solarTermSources: NGUON_TIET_KHI,
    solarTerms,
  };
}

export interface FeedFile {
  /** Tên file không băm, ví dụ `catalog.json`. */
  name: string;
  /** Tên file có băm trong URL, ví dụ `catalog.1a2b3c4d5e6f.json` (immutable). */
  hashedName: string;
  bytes: Buffer;
  hash: string;
  updatedAt: string;
}

export interface Feed {
  manifest: Record<string, unknown>;
  files: Record<CollectionName, FeedFile>;
}

const sha256 = (b: Buffer) => createHash("sha256").update(b).digest("hex");

/**
 * Dựng toàn bộ feed trong bộ nhớ. Kết quả tất định: cùng nguồn → cùng byte → cùng hash.
 * `path` trong manifest trỏ tới file có hash trong tên (cache immutable); file không băm
 * cùng nội dung vẫn được phát hành ở đường dẫn của hợp đồng.
 */
export function buildFeed(stamp: Stamp = sourceStamp()): Feed {
  const payloads: Record<CollectionName, { value: unknown; updatedAt: string }> = {
    catalog: { value: buildCatalog(stamp), updatedAt: stamp.at },
    heritage: { value: buildHeritage(stamp), updatedAt: stamp.at },
    articles: { value: [], updatedAt: ARTICLES_STAMP },
  };
  const files = {} as Record<CollectionName, FeedFile>;
  const collections: Record<string, unknown> = {};
  for (const name of COLLECTIONS) {
    const { value, updatedAt } = payloads[name];
    const bytes = Buffer.from(JSON.stringify(value), "utf8");
    const digest = sha256(bytes);
    const hashedName = `${name}.${digest.slice(0, 12)}.json`;
    files[name] = { name: `${name}.json`, hashedName, bytes, hash: `sha256:${digest}`, updatedAt };
    collections[name] = {
      path: `${FEED_BASE_PATH}/${hashedName}`,
      hash: `sha256:${digest}`,
      updatedAt,
      bytes: bytes.length,
    };
  }
  // articles có dấu thời gian cố định nên không tham gia contentVersion.
  const newest = [payloads.catalog.updatedAt, payloads.heritage.updatedAt].sort().at(-1)!;
  return {
    manifest: { schemaVersion: SCHEMA_VERSION, contentVersion: newest, generatedAt: newest, collections },
    files,
  };
}
