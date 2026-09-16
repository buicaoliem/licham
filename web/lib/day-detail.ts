import type { DayInfo, NgocHapSaoEntry } from "@licham/core";

/** "a, b và c" — Vietnamese-style list join with "và" before the last item. */
export function joinVi(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} và ${items[items.length - 1]}`;
}

export interface LtpPair {
  aLabel: string;
  bLabel: string;
  name: string;
  isGood: boolean;
}

function hourLabel(start: string, end: string): string {
  return `${Number.parseInt(start, 10)}h–${Number.parseInt(end, 10)}h`;
}

/** The 12 two-hour Lý Thuần Phong slots grouped into their 6 repeating pairs (chi and chi+6 always share a state). */
export function ltpPairs(info: DayInfo): LtpPair[] {
  const ltp = info.lyThuanPhong ?? [];
  return Array.from({ length: 6 }, (_, i) => {
    const a = info.hours[i]!;
    const b = info.hours[i + 6]!;
    const state = ltp.find((l) => l.chiIndex === i);
    return {
      aLabel: hourLabel(a.start, a.end),
      bLabel: hourLabel(b.start, b.end),
      name: state?.name ?? "—",
      isGood: state?.isGood ?? false,
    };
  });
}

const WEDDING_KEYWORDS = ["cưới hỏi", "giá thú", "mọi việc", "mọi công việc"];

function affectsWedding(entry: NgocHapSaoEntry): boolean {
  return entry.affects.some((a) => WEDDING_KEYWORDS.some((k) => a.toLowerCase().includes(k)));
}

/** Honest answer for "is this day good for a wedding" from only the sao tốt/xấu actually triggered — no invented data. */
export function weddingAnswer(saoTot: NgocHapSaoEntry[], saoXau: NgocHapSaoEntry[]): string {
  const good = saoTot.filter(affectsWedding);
  const bad = saoXau.filter(affectsWedding);
  if (good.length === 0 && bad.length === 0) {
    return "Không có sao đặc biệt tốt hay xấu cho việc cưới hỏi được ghi nhận trong ngày này theo Ngọc Hạp Thông Thư.";
  }
  const parts: string[] = [];
  if (good.length > 0) parts.push(`sao ${good.map((s) => s.name).join(", ")} tốt cho việc này`);
  if (bad.length > 0) parts.push(`sao ${bad.map((s) => s.name).join(", ")} xấu với việc này`);
  const sentence = parts.join(", nhưng gặp ");
  return `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}.`;
}

export interface BestHour {
  chiName: string;
  start: string;
  end: string;
  ltpName: string;
}

/** Hours that are both giờ hoàng đạo and a "tốt" Lý Thuần Phong slot — computed, not looked up from a poem. */
export function bestHours(info: DayInfo, chiNames: readonly string[]): BestHour[] {
  const ltp = info.lyThuanPhong ?? [];
  return info.hours
    .filter((h) => h.isHoangDao)
    .map((h) => ({ h, state: ltp.find((l) => l.chiIndex === h.chiIndex) }))
    .filter((x): x is { h: (typeof info.hours)[number]; state: NonNullable<typeof x.state> } => x.state?.isGood === true)
    .map(({ h, state }) => ({ chiName: chiNames[h.chiIndex]!, start: h.start, end: h.end, ltpName: state.name }));
}
