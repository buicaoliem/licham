/**
 * Ngọc Hạp Thông Thư — sao tốt và sao xấu theo can chi ngày.
 *
 * Nguồn: xonevn-ai/lunar-calendar (Dart)
 * Repo: https://github.com/xonevn-ai/lunar-calendar
 * Tệp nguồn: lib/core/models/ngoc_hap.dart, lib/core/services/ngoc_hap_service.dart
 * Giấy phép: MIT — Copyright (c) 2025 Thigio.com
 * Ngày lấy: 2026-09-16
 *
 * Ghi công theo yêu cầu giấy phép MIT: giữ nguyên thông báo bản quyền và giấy
 * phép gốc ở trên khi sử dụng lại dữ liệu này.
 *
 * Nguồn chỉ có 7 sao tốt và 6 sao xấu, chưa đủ bộ Ngọc hạp thông thư đầy đủ.
 */
import type { CanName, ChiName } from "../canChi";

export interface NgocHapSaoEntry {
  name: string;
  chineseName: string;
  isGood: boolean;
  /** Việc nên làm (sao tốt) hoặc việc nên kiêng (sao xấu). */
  affects: string[];
  description: string;
}

/** Điều kiện can/chi ngày để một sao xuất hiện, theo đúng logic của nguồn. */
interface SaoTrigger {
  entry: NgocHapSaoEntry;
  matches: (can: CanName, chi: ChiName, lunarDay: number) => boolean;
}

const GOOD_TRIGGERS: readonly SaoTrigger[] = [
  {
    entry: {
      name: "Thiên Phú",
      chineseName: "天富",
      isGood: true,
      affects: ["Khai trương", "Xây dựng nhà cửa", "An táng", "Mọi việc"],
      description: "Tốt cho mọi việc, nhất là khai trương, việc xây dựng nhà cửa và an táng",
    },
    matches: (_can, chi) => chi === "Mùi" || chi === "Tuất",
  },
  {
    entry: {
      name: "Thiên Phúc",
      chineseName: "天福",
      isGood: true,
      affects: ["Mọi việc"],
      description: "Tốt cho mọi việc",
    },
    matches: (can) => can === "Giáp" || can === "Ất",
  },
  {
    entry: {
      name: "Thiên Mã",
      chineseName: "天馬",
      isGood: true,
      affects: ["Giao dịch", "Cầu tài lộc", "Kinh doanh", "Xuất hành"],
      description: "Tốt cho việc giao dịch, cầu tài lộc, kinh doanh, xuất hành",
    },
    matches: (_can, chi) => chi === "Thân" || chi === "Tý",
  },
  {
    entry: {
      name: "Lộc Khố",
      chineseName: "祿庫",
      isGood: true,
      affects: ["Khai trương", "Kinh doanh", "Cầu tài", "Giao dịch"],
      description: "Tốt cho việc khai trương, kinh doanh, cầu tài, giao dịch",
    },
    matches: (can) => can === "Mậu" || can === "Kỷ",
  },
  {
    entry: {
      name: "Phúc Sinh",
      chineseName: "福生",
      isGood: true,
      affects: ["Mọi việc"],
      description: "Tốt cho mọi việc",
    },
    matches: (can) => can === "Bính" || can === "Đinh",
  },
  {
    entry: {
      name: "Dịch Mã",
      chineseName: "驛馬",
      isGood: true,
      affects: ["Mọi việc", "Xuất hành"],
      description: "Tốt cho mọi việc, nhất là việc xuất hành",
    },
    matches: (_can, chi) => chi === "Dần" || chi === "Ngọ",
  },
  {
    entry: {
      name: "Nguyệt Không",
      chineseName: "月空",
      isGood: true,
      affects: ["Làm nhà", "Sửa nhà", "Làm giường", "Đặt giường"],
      description: "Tốt cho việc làm nhà, sửa nhà, làm giường, đặt giường",
    },
    matches: (_can, _chi, lunarDay) => lunarDay === 1 || lunarDay === 15,
  },
];

const BAD_TRIGGERS: readonly SaoTrigger[] = [
  {
    entry: {
      name: "Thổ Ôn",
      chineseName: "土瘟",
      isGood: false,
      affects: ["Xây dựng", "Đào ao", "Đào giếng", "Tế tự (cúng bái)"],
      description: "Kỵ việc xây dựng, đào ao, đào giếng, xấu về tế tự (cúng bái)",
    },
    // Nguồn: ngũ hành của Can ngày là Thổ (Mậu/Kỷ) và chi ngày là Thìn hoặc Tuất.
    matches: (can, chi) => (can === "Mậu" || can === "Kỷ") && (chi === "Thìn" || chi === "Tuất"),
  },
  {
    entry: {
      name: "Hoang Vu",
      chineseName: "荒蕪",
      isGood: false,
      affects: ["Mọi công việc"],
      description: "Xấu cho mọi công việc",
    },
    matches: (_can, _chi, lunarDay) => [4, 10, 16, 22, 28].includes(lunarDay),
  },
  {
    entry: {
      name: "Hoàng Sa",
      chineseName: "黃沙",
      isGood: false,
      affects: ["Xuất hành"],
      description: "Xấu đối với việc xuất hành",
    },
    matches: (_can, chi) => chi === "Mão" || chi === "Dậu",
  },
  {
    entry: {
      name: "Bạch Hổ Hắc Đạo",
      chineseName: "白虎黑道",
      isGood: false,
      affects: ["Mai táng"],
      description: "Kỵ việc mai táng. Nếu trùng ngày với Thiên Giải thì sao tốt",
    },
    matches: (_can, chi) => chi === "Dần" || chi === "Thân",
  },
  {
    entry: {
      name: "Quả Tú",
      chineseName: "寡宿",
      isGood: false,
      affects: ["Giá thú (cưới hỏi)"],
      description: "Xấu với việc giá thú (cưới hỏi)",
    },
    matches: (_can, chi) => chi === "Sửu" || chi === "Mùi",
  },
  {
    entry: {
      name: "Sát Chủ",
      chineseName: "殺主",
      isGood: false,
      affects: ["Mọi công việc"],
      description: "Xấu cho mọi công việc",
    },
    matches: (can) => can === "Canh" || can === "Tân",
  },
];

/** Sao tốt của Ngọc hạp thông thư ứng với can chi và ngày âm lịch đã cho. */
export function saoTotOfDay(can: CanName, chi: ChiName, lunarDay: number): NgocHapSaoEntry[] {
  return GOOD_TRIGGERS.filter((t) => t.matches(can, chi, lunarDay)).map((t) => t.entry);
}

/** Sao xấu của Ngọc hạp thông thư ứng với can chi và ngày âm lịch đã cho. */
export function saoXauOfDay(can: CanName, chi: ChiName, lunarDay: number): NgocHapSaoEntry[] {
  return BAD_TRIGGERS.filter((t) => t.matches(can, chi, lunarDay)).map((t) => t.entry);
}
