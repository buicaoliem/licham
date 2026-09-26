/**
 * Các bước chuyển đổi thuần (không đọc file) dùng bởi scripts/import-van-hoa.ts; tách riêng để kiểm thử.
 * Chỉ dùng import tương đối (script chạy ngoài Next).
 */
import { canChiOfYear, lunarToSolar, vnTimeZoneOfYear } from "@licham/core";
import { canChiSlug } from "../tuoi";
import type { EventTag, HistoryEvent } from "./content";
import { canChiYearOfEvent, normalizeVi } from "./logic";
import type { BaiVietBlock, BaiVietSection, Festival, ItemLabel, NamSuKien, NhanVatPlace } from "./types";

export function slugify(s: string): string {
  return normalizeVi(s)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const LABEL_BY_TEXT: Record<string, ItemLabel> = {
  "Chính sử": "chinh-su",
  "Truyền thuyết": "truyen-thuyet",
  "Tín ngưỡng": "tin-nguong",
};

const TAG_BY_LABEL: Record<ItemLabel, EventTag> = { "chinh-su": "Chính sử", "truyen-thuyet": "Truyền thuyết", "tin-nguong": "Tín ngưỡng" };

/** "2879 TCN" → -2879, "40" → 40, "2 SCN" → 2; năm không rõ ("Thời Hùng Vương") → null. */
export function parseSolarYear(text: string): number | null {
  const m = /^(\d+)\s*(TCN|SCN)?$/.exec(text.trim());
  if (!m) return null;
  const n = Number(m[1]);
  return m[2] === "TCN" ? -n : n;
}

/** Ngày âm nguyên văn → ngày/tháng. "26/7" và "5/10 - 7/10" có ngày cụ thể; "tháng 8" chỉ có tháng; "mùa xuân" không có gì. */
export function parseLunarDate(text: string): { day?: number; month?: number } {
  const t = text.trim();
  const d = /^(\d{1,2})\/(\d{1,2})/.exec(t);
  if (d) return { day: Number(d[1]), month: Number(d[2]) };
  const m = /^tháng\s+(\d{1,2})$/i.exec(t);
  if (m) return { month: Number(m[1]) };
  return {};
}

/** "13/6/1801" → { day, month, year }. */
export function parseSolarDate(text: string): { day: number; month: number; year: number } | undefined {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{3,4})$/.exec(text.trim());
  return m ? { day: Number(m[1]), month: Number(m[2]), year: Number(m[3]) } : undefined;
}

/**
 * Ngày dương của ngày âm theo múi giờ lịch của năm đó (UTC+8 trước 1968, UTC+7 từ 1968).
 * Ngoài khoảng thư viện hỗ trợ (1900–2100) hoặc ngày không tồn tại → undefined (không đoán).
 */
export function computeSolar(day: number, month: number, lunarYear: number): { day: number; month: number; year: number } | undefined {
  try {
    return lunarToSolar(day, month, lunarYear, false, vnTimeZoneOfYear(lunarYear));
  } catch {
    return undefined;
  }
}

export function yearPageHref(lunarYear: number): string {
  return `/van-hoa/nam/${canChiSlug(canChiOfYear(lunarYear))}/`;
}

/** Mốc có ngày âm cụ thể → "Ngày này năm xưa". Mốc chỉ có tháng hoặc không gắn năm âm thì bỏ. */
export function toHistoryEvents(list: readonly NamSuKien[]): HistoryEvent[] {
  return list
    .filter((e) => e.lunarDay !== undefined && e.lunarMonth !== undefined && canChiYearOfEvent(e) !== null)
    .map((e) => ({
      lunarDay: e.lunarDay!,
      lunarMonth: e.lunarMonth!,
      year: e.year,
      yearText: e.yearText ?? String(e.year),
      title: e.title,
      summary: e.summary,
      tag: TAG_BY_LABEL[e.label],
      sources: (e.sources ?? []).map((s) => s.text),
      href: `${yearPageHref(canChiYearOfEvent(e)!)}#${e.id ?? `nam-${e.year}`}`,
    }));
}

/** Dòng hiển thị nơi thờ: "{nơi thờ} – {địa chỉ mới} (trước đây: {địa chỉ cũ})". */
export function placeLine(p: NhanVatPlace): string {
  return `${p.name} – ${placeAddress(p)}`;
}

export function placeAddress(p: NhanVatPlace): string {
  return p.oldAddress && p.oldAddress !== p.address ? `${p.address} (trước đây: ${p.oldAddress})` : p.address;
}

const MONTH_WORD: Record<string, number> = { giêng: 1, chạp: 12 };

function monthOf(word: string): number | undefined {
  const n = Number(word);
  if (Number.isInteger(n) && n >= 1 && n <= 12) return n;
  return MONTH_WORD[word.toLowerCase()];
}

/** Ngày âm đầu tiên trong một đoạn chữ: "7–9/4", "15/1", "23 tháng Chạp", "mùng 2 – rằm tháng Giêng". */
export function firstLunarDay(text: string): { day: number; month: number; index: number } | undefined {
  const slash = /(\d{1,2})(?:\s*[–-]\s*\d{1,2})?\/(\d{1,2})/.exec(text);
  const word = /(\d{1,2})(?:\s*(?:[–-]|rạng)\s*\d{1,2})?\D{0,20}?tháng\s+(Giêng|Chạp|\d{1,2})/i.exec(text);
  const pick = [slash, word].filter((m): m is RegExpExecArray => Boolean(m)).sort((a, b) => a.index - b.index)[0];
  if (!pick) return undefined;
  const day = Number(pick[1]);
  const month = monthOf(pick[2]!);
  if (!month || day < 1 || day > 30) return undefined;
  return { day, month, index: pick.index };
}

const cap = (s: string) => (s ? s[0]!.toUpperCase() + s.slice(1) : s);

/** Cột festivals của nhân vật → các lễ hội có ngày âm (cho bảng 10 năm). Đoạn không có ngày cụ thể thì bỏ qua. */
export function parseFestivals(text: string): Festival[] {
  const out: Festival[] = [];
  for (const seg of splitList(text)) {
    const d = firstLunarDay(seg);
    if (!d) continue;
    const head = seg.includes(":") && seg.indexOf(":") < d.index ? seg.slice(0, seg.indexOf(":")) : seg.slice(0, d.index);
    const name = cap(head.trim().replace(/\s*\((chính hội)?\s*$/i, "").replace(/\s+(khoảng|ngày|từ)$/i, "").replace(/[\s,:(–-]+$/, "").trim());
    if (!name || out.some((f) => f.name === name)) continue;
    out.push({ name, lunarDay: d.day, lunarMonth: d.month });
  }
  return out;
}

/** Tách danh sách ngăn bởi ";". */
export function splitList(text: string): string[] {
  return text
    .split(";")
    .map((x) => x.trim())
    .filter(Boolean);
}

/** Dòng "lunarDates" của bài Tết → hộp "Ngày âm liên quan". Không có chú thích trong ngoặc thì dùng `fallbackLabel`. */
export function parseArticleLunarDates(text: string, fallbackLabel: string): { label: string; day: number; month: number; text?: string }[] {
  const out: { label: string; day: number; month: number; text?: string }[] = [];
  for (const seg of splitList(text)) {
    const m = /^(.*?)\s*\(([^)]+)\)\s*$/.exec(seg);
    const when = (m ? m[1]! : seg).trim();
    const label = m ? cap(m[2]!.trim()) : fallbackLabel;
    const d = firstLunarDay(when);
    if (!d) continue;
    out.push({ label, day: d.day, month: d.month, text: /^\d{1,2}\/\d{1,2}$/.test(when) ? `${d.day} tháng ${d.month}` : when });
  }
  return out;
}

/** Thân bài markdown (sau tiêu đề "# …") → đoạn mở bài + các mục "## …" (tiểu mục "### …", đoạn, danh sách "- ", bảng "|"). */
export function parseArticleBody(md: string): { intro: string[]; sections: BaiVietSection[] } {
  const intro: string[] = [];
  const sections: BaiVietSection[] = [];
  let blocks: BaiVietBlock[] | null = null;
  let subParas: string[] | null = null;
  let para: string[] = [];
  let list: string[] | null = null;
  let table: string[][] | null = null;
  const flush = () => {
    const target = blocks;
    if (para.length) {
      const text = para.join(" ");
      if (subParas) subParas.push(text);
      else if (target) target.push({ type: "p", text });
      else intro.push(text);
    }
    if (list && target && !subParas) target.push({ type: "ul", items: list });
    if (table && target && !subParas && table.length > 0) target.push({ type: "table", head: table[0]!, rows: table.slice(1) });
    para = [];
    list = null;
    table = null;
  };
  for (const raw of md.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("# ")) continue;
    if (line.startsWith("### ")) {
      flush();
      const last = sections[sections.length - 1];
      if (last) {
        last.sub ??= [];
        const item = { heading: line.slice(4).trim(), paras: [] as string[] };
        last.sub.push(item);
        subParas = item.paras;
      }
      continue;
    }
    if (line.startsWith("## ")) {
      flush();
      const heading = line.slice(3).trim();
      blocks = [];
      subParas = null;
      sections.push({ id: slugify(heading), heading, paras: [], blocks });
      continue;
    }
    if (!line) {
      flush();
      continue;
    }
    if (line.startsWith("- ")) {
      if (!list) {
        flush();
        list = [];
      }
      list.push(line.slice(2).trim());
      continue;
    }
    if (line.startsWith("|")) {
      if (!table) {
        flush();
        table = [];
      }
      const cells = line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      if (!cells.every((c) => /^:?-{3,}:?$/.test(c))) table.push(cells);
      continue;
    }
    para.push(line);
  }
  flush();
  return { intro, sections };
}

/** Tách file bài Tết: mỗi bài là khối "---" (metadata "khoá: giá trị") rồi thân bài markdown. */
export function splitArticles(md: string): { meta: Record<string, string>; body: string }[] {
  const text = md.replace(/\r\n/g, "\n").replace(/<!--[\s\S]*?-->/g, "");
  const re = /^---\n((?:[a-zA-Z]+:.*\n)+)---\n/gm;
  const heads = [...text.matchAll(re)];
  return heads.map((h, i) => {
    const meta: Record<string, string> = {};
    for (const line of h[1]!.split("\n")) {
      const k = line.indexOf(":");
      if (k > 0) meta[line.slice(0, k).trim()] = line.slice(k + 1).trim();
    }
    const start = h.index! + h[0].length;
    const end = i + 1 < heads.length ? heads[i + 1]!.index! : text.length;
    return { meta, body: text.slice(start, end).trim() };
  });
}
