/**
 * Kiểm tra feed nội dung đã sinh ra đĩa theo hợp đồng của app (licham_mobile docs/CONTENT_SYNC.md):
 * hình dạng manifest và từng collection, hash khớp đúng byte file, đủ collection,
 * câu chú thích tranh thống nhất, feed không có trong sitemap.
 */
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { COLLECTIONS, FEED_BASE_PATH, type CollectionName } from "./feed";
import { ILLUSTRATION_CAPTION } from "../heritage-assets";

const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
const HASH = /^sha256:[0-9a-f]{64}$/;

type Json = Record<string, unknown>;
const isObj = (v: unknown): v is Json => typeof v === "object" && v !== null && !Array.isArray(v);

export interface ValidateOptions {
  /** Thư mục chứa manifest.json và các file collection. */
  feedDir: string;
  /** Thư mục public/ để kiểm tra sitemap không chứa feed (bỏ qua nếu không có). */
  publicDir?: string;
}

/** Trả về danh sách lỗi; rỗng nghĩa là hợp lệ. */
export function validateFeed({ feedDir, publicDir }: ValidateOptions): string[] {
  const errors: string[] = [];
  const err = (m: string) => errors.push(m);

  const manifestPath = join(feedDir, "manifest.json");
  if (!existsSync(manifestPath)) return [`thiếu ${manifestPath}`];
  let manifest: unknown;
  try {
    manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  } catch {
    return ["manifest.json không phải JSON hợp lệ"];
  }
  if (!isObj(manifest)) return ["manifest không phải object"];
  if (manifest.schemaVersion !== 1) err("manifest.schemaVersion phải là 1");
  for (const k of ["contentVersion", "generatedAt"]) {
    if (typeof manifest[k] !== "string" || !ISO.test(manifest[k] as string)) err(`manifest.${k} phải là ISO-8601 UTC`);
  }
  const collections = manifest.collections;
  if (!isObj(collections)) return [...errors, "manifest.collections thiếu"];
  for (const name of COLLECTIONS) if (!(name in collections)) err(`manifest thiếu collection ${name}`);
  for (const name of Object.keys(collections)) if (!(COLLECTIONS as readonly string[]).includes(name)) err(`collection lạ: ${name}`);

  const parsed: Partial<Record<CollectionName, unknown>> = {};
  for (const name of COLLECTIONS) {
    const entry = collections[name];
    if (!isObj(entry)) continue;
    const { path, hash, updatedAt, bytes } = entry;
    if (typeof path !== "string" || !path.startsWith(`${FEED_BASE_PATH}/`) || !path.endsWith(".json")) {
      err(`${name}.path phải là đường dẫn tuyệt đối dưới ${FEED_BASE_PATH}/`);
      continue;
    }
    if (typeof hash !== "string" || !HASH.test(hash)) err(`${name}.hash phải dạng sha256:<64 hex>`);
    if (typeof updatedAt !== "string" || !ISO.test(updatedAt)) err(`${name}.updatedAt phải là ISO-8601 UTC`);
    if (!Number.isInteger(bytes) || (bytes as number) < 0) err(`${name}.bytes phải là số nguyên`);

    const file = join(feedDir, path.slice(FEED_BASE_PATH.length + 1));
    if (!existsSync(file)) {
      err(`${name}: thiếu file ${path}`);
      continue;
    }
    const buf = readFileSync(file);
    const digest = `sha256:${createHash("sha256").update(buf).digest("hex")}`;
    if (digest !== hash) err(`${name}: hash trong manifest không khớp byte file (${digest})`);
    if (buf.length !== bytes) err(`${name}: bytes trong manifest (${String(bytes)}) khác kích thước file (${buf.length})`);
    const plain = join(feedDir, `${name}.json`);
    if (!existsSync(plain) || !readFileSync(plain).equals(buf)) err(`${name}: ${name}.json không trùng file có hash`);
    try {
      parsed[name] = JSON.parse(buf.toString("utf8"));
    } catch {
      err(`${name}: JSON hỏng`);
    }
  }

  const catalog = parsed.catalog;
  if (isObj(catalog)) {
    if (catalog.schemaVersion !== 1) err("catalog.schemaVersion phải là 1");
    if (catalog.source !== "licham-web-read-only-export") err("catalog.source sai");
    for (const k of ["generatedAt", "sourceCommit"]) if (typeof catalog[k] !== "string") err(`catalog.${k} thiếu`);
    if (!isObj(catalog.range) || !Number.isInteger(catalog.range.firstYear) || !Number.isInteger(catalog.range.lastYear)) err("catalog.range sai");
    for (const k of ["festivals", "prayers", "knowledge", "tools", "goodDayTopics"]) {
      const list = catalog[k];
      if (!Array.isArray(list) || list.length < 5) {
        err(`catalog.${k} phải là mảng không ngắn bất thường`);
        continue;
      }
      const slugs = list.map((x) => (isObj(x) ? x.slug : undefined));
      if (slugs.some((s) => typeof s !== "string" || !s) || new Set(slugs).size !== slugs.length) err(`catalog.${k}: slug thiếu hoặc trùng`);
    }
  } else if (catalog !== undefined) err("catalog phải là object");

  const heritage = parsed.heritage;
  if (isObj(heritage)) {
    if (heritage.schemaVersion !== 1) err("heritage.schemaVersion phải là 1");
    if (heritage.source !== "licham-web-read-only-export") err("heritage.source sai");
    for (const k of ["generatedAt", "sourceCommit"]) if (typeof heritage[k] !== "string") err(`heritage.${k} thiếu`);
    for (const k of ["banners", "festivalArt", "prayerArt", "conGiapArt", "solarTermSeasons", "solarTermSources"]) {
      if (!isObj(heritage[k])) err(`heritage.${k} phải là object`);
    }
    if (!Array.isArray(heritage.eras)) err("heritage.eras phải là mảng");
    if (!Array.isArray(heritage.heroes) || heritage.heroes.length < 1) err("heritage.heroes rỗng");
    if (!Array.isArray(heritage.solarTerms) || heritage.solarTerms.length !== 24) err("heritage.solarTerms phải đủ 24 tiết khí");
    // Mọi chú thích tranh minh họa đều là câu chuẩn; ảnh Wikimedia (kind photo) giữ nguyên ghi công.
    const arts: unknown[] = [
      ...(isObj(heritage.festivalArt) ? Object.values(heritage.festivalArt) : []),
      ...(Array.isArray(heritage.heroes) ? heritage.heroes.map((h) => (isObj(h) ? h.art : null)) : []),
      ...(Array.isArray(heritage.solarTerms) ? heritage.solarTerms.map((t) => (isObj(t) ? t.art : null)) : []),
    ];
    for (const a of arts) {
      if (!isObj(a) || a.kind !== "img" || a.note === null || a.note === undefined) continue;
      if (a.note !== ILLUSTRATION_CAPTION) err(`heritage: chú thích tranh sai: "${String(a.note)}"`);
    }
  } else if (heritage !== undefined) err("heritage phải là object");

  if (parsed.articles !== undefined && !Array.isArray(parsed.articles)) err("articles phải là mảng");

  if (publicDir) {
    const sitemaps = [join(publicDir, "sitemap.xml")];
    const dir = join(publicDir, "sitemaps");
    if (existsSync(dir)) for (const f of readdirSync(dir)) if (f.endsWith(".xml")) sitemaps.push(join(dir, f));
    for (const f of sitemaps) {
      if (existsSync(f) && readFileSync(f, "utf8").includes(FEED_BASE_PATH)) err(`${f} chứa đường dẫn feed`);
    }
  }
  return errors;
}
