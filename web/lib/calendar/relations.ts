import { CHI } from "@licham/core";

/** Quan hệ địa chi — bảng cố định của lịch truyền thống, không tính toán thiên văn. */
const LUC_HOP: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [2, 11],
  [3, 10],
  [4, 9],
  [5, 8],
  [6, 7],
];
const TAM_HOP: ReadonlyArray<readonly [number, number, number]> = [
  [8, 0, 4],
  [11, 3, 7],
  [2, 6, 10],
  [5, 9, 1],
];
const HAI: ReadonlyArray<readonly [number, number]> = [
  [0, 7],
  [1, 6],
  [2, 5],
  [3, 4],
  [8, 11],
  [9, 10],
];
const PHA: ReadonlyArray<readonly [number, number]> = [
  [0, 9],
  [1, 4],
  [2, 11],
  [3, 6],
  [5, 8],
  [7, 10],
];
/** Tam hình: Dần–Tỵ–Thân, Sửu–Tuất–Mùi; tương hình Tý–Mão; tự hình Thìn, Ngọ, Dậu, Hợi. */
const HINH_GROUPS: ReadonlyArray<readonly number[]> = [
  [2, 5, 8],
  [1, 10, 7],
  [0, 3],
];
const TU_HINH = new Set([4, 6, 9, 11]);

export interface ChiRelations {
  lucHop: string;
  tamHop: string[];
  xung: string;
  hinh: string[];
  hai: string;
  pha: string;
}

function partner(pairs: ReadonlyArray<readonly [number, number]>, i: number): number {
  const p = pairs.find(([a, b]) => a === i || b === i)!;
  return p[0] === i ? p[1] : p[0];
}

export function chiRelations(chiIndex: number): ChiRelations {
  const group = TAM_HOP.find((g) => g.includes(chiIndex))!;
  const hinhGroup = HINH_GROUPS.find((g) => g.includes(chiIndex));
  const hinh = hinhGroup ? hinhGroup.filter((i) => i !== chiIndex) : TU_HINH.has(chiIndex) ? [chiIndex] : [];
  return {
    lucHop: CHI[partner(LUC_HOP, chiIndex)]!,
    tamHop: group.filter((i) => i !== chiIndex).map((i) => CHI[i]!),
    xung: CHI[(chiIndex + 6) % 12]!,
    hinh: hinh.map((i) => CHI[i]!),
    hai: CHI[partner(HAI, chiIndex)]!,
    pha: CHI[partner(PHA, chiIndex)]!,
  };
}
