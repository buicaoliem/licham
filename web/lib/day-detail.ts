import type { DayInfo } from "@licham/core";

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

/** The 12 two-hour Lý Thuần Phong slots grouped into their 6 repeating pairs (chi and chi+6 always share a state). Pairs with no known state are dropped rather than shown as a placeholder. */
export function ltpPairs(info: DayInfo): LtpPair[] {
  const ltp = info.lyThuanPhong ?? [];
  const pairs: LtpPair[] = [];
  for (let i = 0; i < 6; i++) {
    const state = ltp.find((l) => l.chiIndex === i);
    if (!state) continue;
    const a = info.hours[i]!;
    const b = info.hours[i + 6]!;
    pairs.push({
      aLabel: hourLabel(a.start, a.end),
      bLabel: hourLabel(b.start, b.end),
      name: state.name,
      isGood: state.isGood,
    });
  }
  return pairs;
}

export type ViecVerdict = "thuan" | "nua-thuan" | "khong-thuan";

export interface ViecFaq {
  viec: string;
  verdict: ViecVerdict;
  verdictLabel: string;
}

export interface ViecDef {
  /** Tên việc, dùng trong câu hỏi. */
  viec: string;
  /** Các cụm từ tìm trong mô tả sao — lấy đúng chữ đã xuất hiện trong mô tả, không suy diễn thêm. */
  keywords: string[];
}

/** "Tốt cho mọi việc" / "Kiêng mọi việc" trong mô tả sao thì tính cho mọi câu hỏi việc. */
export const WILDCARD_KEYWORDS = ["mọi việc", "mọi công việc"];

const VIEC_DEFS: readonly ViecDef[] = [
  { viec: "cưới hỏi", keywords: ["cưới hỏi", "giá thú", "ăn hỏi", "dạm ngõ"] },
  { viec: "khai trương", keywords: ["khai trương"] },
  { viec: "xuất hành", keywords: ["xuất hành"] },
  { viec: "an táng", keywords: ["an táng", "cải táng", "mai táng"] },
  { viec: "cầu tài", keywords: ["cầu tài", "cầu lộc"] },
  { viec: "làm nhà, động thổ", keywords: ["làm nhà", "xây cất", "động thổ", "dựng cột", "cất nóc"] },
];

/** Từ đánh dấu câu kiêng kỵ — chỉ những câu có chữ này mới tính là "xấu" cho việc đó. */
export const KIENG_TRIGGERS = ["kiêng"];
/** Từ đánh dấu câu thuận lợi — chỉ những câu có chữ này mới tính là "tốt" cho việc đó. */
export const HOP_TRIGGERS = ["hợp", "tốt", "thuận"];

function splitSentences(description: string): string[] {
  return description.split(/(?<=[.!?])\s+/).filter(Boolean);
}

/**
 * Chỉ những câu thực sự nêu kiêng/hợp (chứa từ đánh dấu tương ứng) mới được tính khớp việc.
 * Tránh trường hợp một câu khác trong cùng mô tả nhắc tên việc đó theo nghĩa ngược lại
 * (ví dụ câu nói rõ "việc X thì vẫn làm được" nằm cạnh câu "Kiêng ...").
 */
function matchesViec(description: string, def: ViecDef, triggers: readonly string[]): boolean {
  const keywords = [...def.keywords, ...WILDCARD_KEYWORDS];
  return splitSentences(description).some((sentence) => {
    const lower = sentence.toLowerCase();
    if (!triggers.some((t) => lower.includes(t))) return false;
    return keywords.some((k) => lower.includes(k));
  });
}

/** Tên các sao (trong danh sách đã cho) có câu mô tả khớp việc — dùng lại cho cả câu hỏi ngày và trang xem ngày tốt. */
export function matchingStarNames(
  stars: readonly { name: string; description: string }[],
  def: ViecDef,
  triggers: readonly string[],
): string[] {
  return stars.filter((s) => matchesViec(s.description, def, triggers)).map((s) => s.name);
}

/**
 * Câu trả lời "ngày này có hợp việc X không" — chỉ suy từ mô tả của các sao tốt/xấu
 * thực sự có mặt trong ngày (không thêm phân loại tay, không sửa mô tả). Có sao tốt
 * nhắc tới việc mà không có sao xấu nào nhắc tới thì THUẬN; có cả hai thì NỬA THUẬN;
 * chỉ có sao xấu thì KHÔNG THUẬN. Việc nào không sao nào nhắc tới thì bỏ hẳn câu hỏi.
 */
export function viecFaqs(info: DayInfo): ViecFaq[] {
  const saoTot = info.saoTot ?? [];
  const saoXau = info.saoXau ?? [];
  const faqs: ViecFaq[] = [];
  for (const def of VIEC_DEFS) {
    const goodStars = matchingStarNames(saoTot, def, HOP_TRIGGERS);
    const badStars = matchingStarNames(saoXau, def, KIENG_TRIGGERS);
    const good = goodStars.length > 0;
    const bad = badStars.length > 0;
    if (!good && !bad) continue;
    const verdict: ViecVerdict = good && bad ? "nua-thuan" : good ? "thuan" : "khong-thuan";
    const verdictLabel =
      verdict === "thuan"
        ? `Thuận — có sao ${joinVi(goodStars)} hợp việc này`
        : verdict === "khong-thuan"
          ? `Không thuận — có sao ${joinVi(badStars)} kiêng việc này`
          : `Nửa thuận — sao ${joinVi(goodStars)} hợp nhưng sao ${joinVi(badStars)} kiêng`;
    faqs.push({ viec: def.viec, verdict, verdictLabel });
  }
  return faqs;
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
