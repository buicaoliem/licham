/** Hán tự của 12 địa chi, theo thứ tự chiIndex 0..11 (Tý → Hợi). */
const HAN_CHI = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;

/** Dấu tròn Hán tự của địa chi — thay cho tranh con giáp khi chưa có bộ minh họa. Chỉ trang trí. */
export function ChiSeal({ chiIndex, size, tone }: { chiIndex: number; size?: "lg"; tone?: "jade" }) {
  return (
    <span className={["ch-seal", size, tone].filter(Boolean).join(" ")} aria-hidden="true" lang="zh">
      {HAN_CHI[chiIndex]}
    </span>
  );
}
