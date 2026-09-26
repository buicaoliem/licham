/**
 * Liên kết nội bộ dùng chung cho Lịch sử & Văn hoá: relatedPeople / relatedEvents.
 * Mục lục nhân vật hiện lấy từ trang anh hùng dân tộc; mục lục sự kiện lấy từ 235 mốc theo năm.
 * Khớp tên riêng đầy đủ (lần nhắc đầu tiên); không đoán tên chung ("vua Trần").
 */
import { ANH_HUNG, anhHungHref, anhHungImagePath, type AnhHung } from "../anh-hung";
import { heritageFile } from "../heritage-assets";
import { NAM_SU_KIEN } from "./data/nam-su-kien";
import { dynastyInfo } from "./dynasty";
import { yearPageHref } from "./import-logic";
import { canChiYearOfEvent } from "./logic";
import { FIXTURE_SLUG, type NamSuKien, type RelatedLink, type RelatedRefs } from "./types";

export interface PersonAlias {
  slug: string;
  name: string;
  /** Tên riêng dùng để khớp; dài hơn đứng trước. */
  alias: string;
}

export interface LinkedPerson {
  slug: string;
  name: string;
  href: string;
  summary: string;
  image?: string;
}

export interface LinkedEvent {
  slug: string;
  title: string;
  href: string;
  summary: string;
  image?: string;
}

export interface TextSeg {
  text: string;
  href?: string;
}

const TITLE_HEAD = /^(vua|hoàng đế|thái hậu|thái úy|thái sư|đức ông)\s+/i;
/** Tên riêng đứng sau từ chỉ địa danh thì là tên chỗ, không phải nhân vật trong mốc. */
const PLACE_BEFORE = /(khu rừng|rừng|phố|đường|đền|chùa|miếu|đình|lăng|trường|cầu|núi|sông|hồ|công viên|chiến khu|khu)\s+$/i;

function uniq(xs: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const x of xs) {
    const t = x.replace(/\s+/g, " ").trim();
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}

/** Cắt tên kép "A – B", "A (B)", bỏ ngoặc có chữ "theo". */
export function namePieces(raw: string): string[] {
  const cleaned = raw.replace(/\s*\([^)]*theo[^)]*\)/gi, " ").trim();
  const parts = cleaned.split(/\s*[–—]\s*|\s*\(|\)\s*|,\s*/);
  const out: string[] = [];
  for (const p of parts) {
    const t = p.trim();
    if (!t) continue;
    out.push(t);
    const stripped = t.replace(/^(Chủ tịch|Đại tướng)\s+/u, "").trim();
    if (stripped && stripped !== t) out.push(stripped);
  }
  return uniq(out);
}

function usableAlias(alias: string): boolean {
  if (alias.length < 5) return false;
  if (/theo /i.test(alias)) return false;
  if (TITLE_HEAD.test(alias)) return false;
  if (/^(hắc đế|phật hoàng)$/i.test(alias)) return false;
  return true;
}

/** Biệt danh chỉ lấy khi là tên riêng 2+ tiếng, không phải tước hiệu hay tên một chữ dễ trùng. */
function usableTenKhac(alias: string): boolean {
  if (!usableAlias(alias)) return false;
  if (!/\s/.test(alias)) return false;
  if (/(vương|hầu|công|hoàng đế|hoàng hậu|thái hậu|đế)$/i.test(alias)) return false;
  return true;
}

/** Tên riêng đủ rõ để khớp; không lấy danh xưng chung. */
export function aliasesOfPerson(p: Pick<AnhHung, "slug" | "ten" | "tenThat" | "tenKhac">): PersonAlias[] {
  const names = uniq([
    ...namePieces(p.ten),
    ...(p.tenThat ? namePieces(p.tenThat) : []),
    ...p.tenKhac.filter(usableTenKhac).flatMap(namePieces).filter(usableTenKhac),
  ]);
  return names.filter(usableAlias).map((alias) => ({ slug: p.slug, name: p.ten, alias }));
}

export function personCatalog(list: readonly AnhHung[] = ANH_HUNG): PersonAlias[] {
  const all = list.flatMap(aliasesOfPerson);
  return all.sort((a, b) => b.alias.length - a.alias.length || a.alias.localeCompare(b.alias, "vi"));
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Tìm lần xuất hiện đầu của mỗi slug; không chồng lên đoạn đã khớp. */
export function firstMentions(text: string, catalog: readonly PersonAlias[], already = new Set<string>()): { slug: string; start: number; end: number; alias: string }[] {
  const found: { slug: string; start: number; end: number; alias: string }[] = [];
  const usedRange: [number, number][] = [];
  const taken = new Set(already);
  const overlaps = (a: number, b: number) => usedRange.some(([x, y]) => a < y && b > x);
  for (const { slug, alias } of catalog) {
    if (taken.has(slug)) continue;
    const re = new RegExp(`(?<![\\p{L}\\p{N}])${escapeRe(alias)}(?![\\p{L}\\p{N}])`, "ui");
    const m = re.exec(text);
    if (!m || overlaps(m.index, m.index + alias.length)) continue;
    if (PLACE_BEFORE.test(text.slice(Math.max(0, m.index - 24), m.index))) continue;
    taken.add(slug);
    usedRange.push([m.index, m.index + alias.length]);
    found.push({ slug, start: m.index, end: m.index + alias.length, alias });
  }
  return found.sort((a, b) => a.start - b.start);
}

export function linkSegments(text: string, catalog: readonly PersonAlias[], used: Set<string>, hrefOf: (slug: string) => string | undefined): TextSeg[] {
  const hits = firstMentions(text, catalog, used);
  if (hits.length === 0) return [{ text }];
  const segs: TextSeg[] = [];
  let i = 0;
  for (const h of hits) {
    const href = hrefOf(h.slug);
    if (!href) continue;
    if (h.start > i) segs.push({ text: text.slice(i, h.start) });
    segs.push({ text: text.slice(h.start, h.end), href });
    used.add(h.slug);
    i = h.end;
  }
  if (i < text.length) segs.push({ text: text.slice(i) });
  return segs.length ? segs : [{ text }];
}

function firstSentence(text: string): string {
  const s = text.split(/(?<=[.!?])\s/)[0] ?? text;
  return s.length > 120 ? `${s.slice(0, 117).trimEnd()}…` : s;
}

function eventHref(e: NamSuKien): string | undefined {
  if (!e.id || e.id === FIXTURE_SLUG) return undefined;
  const y = canChiYearOfEvent(e);
  if (y === null) return undefined;
  return `${yearPageHref(y)}#${e.id}`;
}

export function personBySlug(slug: string): LinkedPerson | undefined {
  const a = ANH_HUNG.find((x) => x.slug === slug);
  if (!a) return undefined;
  const image = heritageFile(anhHungImagePath(a.slug)) ?? undefined;
  return { slug: a.slug, name: a.ten, href: anhHungHref(a.slug), summary: firstSentence(a.tomTat), image };
}

export function eventBySlug(slug: string, list: readonly NamSuKien[] = NAM_SU_KIEN): LinkedEvent | undefined {
  const e = list.find((x) => x.id === slug);
  if (!e || !e.id) return undefined;
  const href = eventHref(e);
  if (!href) return undefined;
  return {
    slug: e.id,
    title: e.title,
    href,
    summary: firstSentence(e.summary),
    image: dynastyInfo(e.dynasty).image ?? undefined,
  };
}

function eventBody(e: NamSuKien): string {
  return [e.title, e.summary, e.disputed ?? ""].filter(Boolean).join("\n");
}

function scanPeople(text: string, catalog: readonly PersonAlias[]): string[] {
  return firstMentions(text, catalog).map((h) => h.slug);
}

function buildGraph(events: readonly NamSuKien[], people: readonly AnhHung[]) {
  const catalog = personCatalog(people);
  const peopleByEvent = new Map<string, string[]>();
  const eventsByPerson = new Map<string, string[]>();
  for (const e of events) {
    if (!e.id || e.id === FIXTURE_SLUG) continue;
    const slugs = e.relatedPeople?.length ? e.relatedPeople : scanPeople(eventBody(e), catalog);
    if (!slugs.length) continue;
    peopleByEvent.set(e.id, slugs);
    for (const s of slugs) {
      const list = eventsByPerson.get(s) ?? [];
      list.push(e.id);
      eventsByPerson.set(s, list);
    }
  }
  return { peopleByEvent, eventsByPerson };
}

const GRAPH = buildGraph(NAM_SU_KIEN, ANH_HUNG);

/** Quét tên riêng trong các đoạn văn; dùng khi trang chưa ghi relatedPeople. */
export function peopleInText(texts: readonly string[]): string[] {
  return scanPeople(texts.filter(Boolean).join("\n"), personCatalog());
}

export function relatedPeopleOf(item: RelatedRefs & { id?: string; slug?: string }): string[] {
  if (item.relatedPeople?.length) return item.relatedPeople;
  const key = item.id ?? item.slug;
  return (key ? GRAPH.peopleByEvent.get(key) : undefined) ?? [];
}

export function relatedEventsOf(item: RelatedRefs & { slug?: string }): string[] {
  if (item.relatedEvents?.length) return item.relatedEvents;
  return (item.slug ? GRAPH.eventsByPerson.get(item.slug) : undefined) ?? [];
}

export function relatedPeopleLinks(slugs: readonly string[]): RelatedLink[] {
  return slugs
    .map(personBySlug)
    .filter((p): p is LinkedPerson => Boolean(p))
    .map((p) => ({ label: p.name, href: p.href, summary: p.summary, image: p.image, badge: "Anh hùng" }));
}

export function relatedEventsLinks(slugs: readonly string[]): RelatedLink[] {
  return slugs
    .map((s) => eventBySlug(s))
    .filter((e): e is LinkedEvent => Boolean(e))
    .map((e) => ({ label: e.title, href: e.href, summary: e.summary, image: e.image, badge: "Sự kiện" }));
}

export function personHref(slug: string): string | undefined {
  return ANH_HUNG.some((a) => a.slug === slug) ? anhHungHref(slug) : undefined;
}

/** Số mốc / nhân vật có ít nhất một liên kết (để báo cáo). */
export function crossLinkStats() {
  const eventIds = [...GRAPH.peopleByEvent.keys()];
  const people = [...GRAPH.eventsByPerson.keys()];
  return {
    eventsLinked: eventIds.length,
    eventsTotal: NAM_SU_KIEN.filter((e) => e.id && e.id !== FIXTURE_SLUG).length,
    peopleLinked: people.length,
    peopleTotal: ANH_HUNG.length,
  };
}
