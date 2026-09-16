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
