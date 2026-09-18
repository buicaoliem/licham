import { type CanChi, type ChiName, type NguHanh, canChiCoXung, canChiFromIndex, canChiNamDuong } from "@licham/core";

/** Bỏ dấu tiếng Việt và chuyển khoảng trắng thành gạch nối, dùng cho slug can chi. */
function boDauThanhSlug(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .trim()
    .replace(/\s+/g, "-");
}

// ---------------------------------------------------------------------------
// PHẦN 2 — 12 con giáp (dữ liệu chữ, độc lập với web/lib/tu-vi.ts)
// ---------------------------------------------------------------------------

export interface ChiInfo {
  /** 0..11, vị trí trong mảng CHI của @licham/core. */
  chiIndex: number;
  ten: ChiName;
  slug: string;
  conVat: string;
  gio: string;
  moTa1: string;
  moTa2: string;
}

/** Tỵ dùng slug "ty-ran" vì trùng "ty" với Tý khi bỏ dấu. */
const CHI_SLUGS = ["ty", "suu", "dan", "mao", "thin", "ty-ran", "ngo", "mui", "than", "dau", "tuat", "hoi"] as const;

const CHI_DATA: ReadonlyArray<Omit<ChiInfo, "chiIndex" | "slug">> = [
  {
    ten: "Tý",
    conVat: "Chuột",
    gio: "23h–1h",
    moTa1: "Người tuổi Tý được cho là nhanh nhạy, tiết kiệm, giỏi xoay xở và nhìn ra cơ hội sớm hơn người khác.",
    moTa2: "Dân gian cũng nói tuổi Tý hay lo xa, thích tích cóp và cẩn trọng trước khi quyết việc lớn.",
  },
  {
    ten: "Sửu",
    conVat: "Trâu",
    gio: "1h–3h",
    moTa1: "Người tuổi Sửu được cho là bền bỉ, chịu khó, đã nhận việc thì làm đến nơi đến chốn.",
    moTa2: "Đổi lại, tuổi Sửu thường bị nói là bảo thủ, khó thay đổi ý khi đã quyết.",
  },
  {
    ten: "Dần",
    conVat: "Hổ",
    gio: "3h–5h",
    moTa1: "Người tuổi Dần được cho là mạnh mẽ, dám nghĩ dám làm, thích đứng ra gánh việc.",
    moTa2: "Dân gian nói tuổi Dần nóng tính, hợp việc cần quyết đoán hơn là việc đòi nhẫn nại lâu dài.",
  },
  {
    ten: "Mão",
    conVat: "Mèo",
    gio: "5h–7h",
    moTa1: "Người tuổi Mão được cho là hiền hòa, khéo léo trong cư xử, ít khi để mất lòng ai.",
    moTa2: "Tuổi Mão thường được nói là thích sự yên ổn, tránh va chạm và không ưa mạo hiểm.",
  },
  {
    ten: "Thìn",
    conVat: "Rồng",
    gio: "7h–9h",
    moTa1: "Người tuổi Thìn được cho là có chí lớn, tự tin, thích làm việc có tầm vóc.",
    moTa2: "Dân gian nói tuổi Thìn khá thẳng tính, không giỏi nhún nhường khi thấy mình đúng.",
  },
  {
    ten: "Tỵ",
    conVat: "Rắn",
    gio: "9h–11h",
    moTa1: "Người tuổi Tỵ được cho là sâu sắc, kín đáo, nghĩ kỹ rồi mới nói.",
    moTa2: "Tuổi Tỵ thường được nói là giỏi quan sát, hợp những việc cần tính toán đường dài.",
  },
  {
    ten: "Ngọ",
    conVat: "Ngựa",
    gio: "11h–13h",
    moTa1: "Người tuổi Ngọ được cho là năng động, thích tự do, không ngồi yên một chỗ được lâu.",
    moTa2: "Dân gian nói tuổi Ngọ nhiệt tình nhưng dễ chán, cần việc luôn có cái mới.",
  },
  {
    ten: "Mùi",
    conVat: "Dê",
    gio: "13h–15h",
    moTa1: "Người tuổi Mùi được cho là hiền lành, biết nghĩ cho người khác, dễ gần.",
    moTa2: "Tuổi Mùi hay được nói là cả nể, ngại từ chối nên đôi khi nhận phần thiệt.",
  },
  {
    ten: "Thân",
    conVat: "Khỉ",
    gio: "15h–17h",
    moTa1: "Người tuổi Thân được cho là thông minh, linh hoạt, học nhanh và xoay xở giỏi.",
    moTa2: "Dân gian nói tuổi Thân hiếu động, hợp việc cần ứng biến hơn là việc lặp đi lặp lại.",
  },
  {
    ten: "Dậu",
    conVat: "Gà",
    gio: "17h–19h",
    moTa1: "Người tuổi Dậu được cho là chăm chỉ, ngăn nắp, chú ý đến chi tiết.",
    moTa2: "Tuổi Dậu thường được nói là thẳng thắn, nghĩ sao nói vậy nên đôi khi mất lòng.",
  },
  {
    ten: "Tuất",
    conVat: "Chó",
    gio: "19h–21h",
    moTa1: "Người tuổi Tuất được cho là trung thực, có trách nhiệm, đã hứa là giữ lời.",
    moTa2: "Dân gian nói tuổi Tuất sống tình cảm, coi trọng bạn bè và gia đình.",
  },
  {
    ten: "Hợi",
    conVat: "Lợn",
    gio: "21h–23h",
    moTa1: "Người tuổi Hợi được cho là thật thà, rộng rãi, ít tính toán thiệt hơn.",
    moTa2: "Tuổi Hợi thường được nói là dễ tin người, hợp sống thong thả hơn là bon chen.",
  },
];

export const CHI_LIST: readonly ChiInfo[] = CHI_DATA.map((d, chiIndex) => ({
  ...d,
  chiIndex,
  slug: CHI_SLUGS[chiIndex]!,
}));

export function chiBySlug(slug: string): ChiInfo | undefined {
  return CHI_LIST.find((c) => c.slug === slug);
}

export function chiByIndex(chiIndex: number): ChiInfo {
  const c = CHI_LIST[((chiIndex % 12) + 12) % 12];
  if (!c) throw new RangeError(`chiIndex không hợp lệ: ${chiIndex}`);
  return c;
}

// ---------------------------------------------------------------------------
// PHẦN 1 — Bảng quy tắc dùng chung
// ---------------------------------------------------------------------------

/** Tam hợp: Thân-Tý-Thìn (Thủy), Tỵ-Dậu-Sửu (Kim), Dần-Ngọ-Tuất (Hỏa), Hợi-Mão-Mùi (Mộc). */
const TAM_HOP_GROUPS: readonly number[][] = [
  [8, 0, 4],
  [5, 9, 1],
  [2, 6, 10],
  [11, 3, 7],
];

/** Tứ hành xung: Tý-Ngọ-Mão-Dậu, Dần-Thân-Tỵ-Hợi, Thìn-Tuất-Sửu-Mùi. */
const TU_HANH_XUNG_GROUPS: readonly number[][] = [
  [0, 6, 3, 9],
  [2, 8, 5, 11],
  [4, 10, 1, 7],
];

/** Nhị hợp (lục hợp): Tý-Sửu, Dần-Hợi, Mão-Tuất, Thìn-Dậu, Tỵ-Thân, Ngọ-Mùi. */
const NHI_HOP: ReadonlyMap<number, number> = new Map([
  [0, 1],
  [1, 0],
  [2, 11],
  [11, 2],
  [3, 10],
  [10, 3],
  [4, 9],
  [9, 4],
  [5, 8],
  [8, 5],
  [6, 7],
  [7, 6],
]);

/** Lục hại: Tý-Mùi, Sửu-Ngọ, Dần-Tỵ, Mão-Thìn, Thân-Hợi, Dậu-Tuất. */
const LUC_HAI: ReadonlyMap<number, number> = new Map([
  [0, 7],
  [7, 0],
  [1, 6],
  [6, 1],
  [2, 5],
  [5, 2],
  [3, 4],
  [4, 3],
  [8, 11],
  [11, 8],
  [9, 10],
  [10, 9],
]);

function xungChiIndex(chiIndex: number): number {
  return (chiIndex + 6) % 12;
}

function groupContaining(groups: readonly number[][], chiIndex: number): readonly number[] {
  const g = groups.find((group) => group.includes(chiIndex));
  if (!g) throw new RangeError(`chiIndex không hợp lệ: ${chiIndex}`);
  return g;
}

/** Nhóm tam hợp đầy đủ (gồm cả chính chi này), theo thứ tự CHI. */
export function tamHopGroup(chiIndex: number): number[] {
  return [...groupContaining(TAM_HOP_GROUPS, chiIndex)].sort((a, b) => a - b);
}

/** Nhóm tứ hành xung đầy đủ (gồm cả chính chi này), theo thứ tự CHI. */
export function tuHanhXungGroup(chiIndex: number): number[] {
  return [...groupContaining(TU_HANH_XUNG_GROUPS, chiIndex)].sort((a, b) => a - b);
}

/** Đối tác nhị hợp (lục hợp) của một chi, nếu có. */
export function nhiHopChi(chiIndex: number): number | undefined {
  return NHI_HOP.get(chiIndex);
}

/** Các chi hợp tuổi: 2 đối tác tam hợp + 1 đối tác nhị hợp (không gồm chính chi này). */
export function hopTuoiChi(chiIndex: number): number[] {
  const tamHop = groupContaining(TAM_HOP_GROUPS, chiIndex).filter((c) => c !== chiIndex);
  const nhiHop = NHI_HOP.get(chiIndex);
  return nhiHop === undefined ? tamHop : [...tamHop, nhiHop];
}

/** Các chi kỵ tuổi: chi xung + chi hại. */
export function kyTuoiChi(chiIndex: number): number[] {
  const xung = xungChiIndex(chiIndex);
  const hai = LUC_HAI.get(chiIndex);
  return hai === undefined ? [xung] : [xung, hai];
}

/** Màu theo ngũ hành, dùng chung cho khối "màu hợp/nên tránh". */
const MAU_THEO_NGU_HANH: Record<NguHanh, readonly string[]> = {
  Kim: ["trắng", "xám", "bạc"],
  Mộc: ["xanh lá"],
  Thủy: ["xanh dương", "đen"],
  Hỏa: ["đỏ", "hồng", "tím"],
  Thổ: ["vàng", "nâu đất"],
};

/** Mộc sinh Hỏa, Hỏa sinh Thổ, Thổ sinh Kim, Kim sinh Thủy, Thủy sinh Mộc. */
const NGU_HANH_SINH: Record<NguHanh, NguHanh> = {
  Mộc: "Hỏa",
  Hỏa: "Thổ",
  Thổ: "Kim",
  Kim: "Thủy",
  Thủy: "Mộc",
};

/** Mộc khắc Thổ, Thổ khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim, Kim khắc Mộc. */
const NGU_HANH_KHAC: Record<NguHanh, NguHanh> = {
  Mộc: "Thổ",
  Thổ: "Thủy",
  Thủy: "Hỏa",
  Hỏa: "Kim",
  Kim: "Mộc",
};

function hanhSinhRa(hanh: NguHanh): NguHanh {
  const found = (Object.keys(NGU_HANH_SINH) as NguHanh[]).find((k) => NGU_HANH_SINH[k] === hanh);
  if (!found) throw new RangeError(`Ngũ hành không hợp lệ: ${hanh}`);
  return found;
}

function hanhKhacNo(hanh: NguHanh): NguHanh {
  const found = (Object.keys(NGU_HANH_KHAC) as NguHanh[]).find((k) => NGU_HANH_KHAC[k] === hanh);
  if (!found) throw new RangeError(`Ngũ hành không hợp lệ: ${hanh}`);
  return found;
}

export interface HopMenh {
  /** Hành sinh ra mệnh này. */
  sinhRa: NguHanh;
  /** Hành mà mệnh này sinh ra. */
  sinhBoi: NguHanh;
  /** Hành khắc mệnh này. */
  khacBoi: NguHanh;
  mauHop: string[];
  mauTranh: string[];
}

/** Suy ra hành sinh/khắc mệnh và màu hợp/nên tránh, theo bảng ngũ hành ở Phần 1. */
export function hopMenh(hanh: NguHanh): HopMenh {
  const sinhRa = hanhSinhRa(hanh);
  const sinhBoi = NGU_HANH_SINH[hanh];
  const khacBoi = hanhKhacNo(hanh);
  return {
    sinhRa,
    sinhBoi,
    khacBoi,
    mauHop: [...MAU_THEO_NGU_HANH[sinhRa], ...MAU_THEO_NGU_HANH[hanh]],
    mauTranh: [...MAU_THEO_NGU_HANH[khacBoi]],
  };
}

// ---------------------------------------------------------------------------
// PHẦN 3 — 30 mệnh nạp âm (một dòng ý nghĩa mỗi mệnh)
// ---------------------------------------------------------------------------

export const NAP_AM_MO_TA: Record<string, string> = {
  "Hải Trung Kim": "Vàng trong biển — của quý còn ẩn, chưa lộ ra ngoài.",
  "Lư Trung Hỏa": "Lửa trong lò — lửa được giữ trong khuôn, cháy đều và bền.",
  "Đại Lâm Mộc": "Cây rừng lớn — cây cao giữa rừng rậm.",
  "Lộ Bàng Thổ": "Đất ven đường — đất chịu người qua lại, quen dãi dầu.",
  "Kiếm Phong Kim": "Vàng đầu kiếm — kim loại đã tôi thành lưỡi sắc.",
  "Sơn Đầu Hỏa": "Lửa trên núi — ngọn lửa cao, nhìn thấy từ xa.",
  "Giản Hạ Thủy": "Nước dưới khe — dòng nước nhỏ trong và chảy đều.",
  "Thành Đầu Thổ": "Đất đắp thành — đất được nện chặt để che chắn.",
  "Bạch Lạp Kim": "Vàng chân nến — kim loại mềm, dùng làm đồ tinh xảo.",
  "Dương Liễu Mộc": "Cây dương liễu — thân mềm, dẻo dai trước gió.",
  "Tuyền Trung Thủy": "Nước trong suối — nguồn nước sạch chảy quanh năm.",
  "Ốc Thượng Thổ": "Đất trên mái — đất phủ mái nhà, che mưa nắng.",
  "Tích Lịch Hỏa": "Lửa sấm sét — lửa mạnh và bất ngờ.",
  "Tùng Bách Mộc": "Cây tùng bách — cây chịu được rét, đứng vững lâu năm.",
  "Trường Lưu Thủy": "Nước chảy dài — dòng sông lớn chảy không dứt.",
  "Sa Trung Kim": "Vàng trong cát — vàng lẫn trong cát, phải đãi mới thấy.",
  "Sơn Hạ Hỏa": "Lửa dưới chân núi — lửa ấm, cháy trong chỗ khuất gió.",
  "Bình Địa Mộc": "Cây đồng bằng — cây mọc nơi đất bằng, tán rộng.",
  "Bích Thượng Thổ": "Đất trên vách — đất trát tường, gắn kết bền.",
  "Kim Bạch Kim": "Vàng trắng — kim loại đã luyện kỹ, sáng và tinh.",
  "Phú Đăng Hỏa": "Lửa đèn dầu — ngọn lửa nhỏ nhưng soi được lâu.",
  "Thiên Hà Thủy": "Nước sông trời — nước mưa từ trên cao rơi xuống.",
  "Đại Trạch Thổ": "Đất nền nhà — đất làm nền, chịu sức nặng.",
  "Thoa Xuyến Kim": "Vàng trang sức — kim loại làm thành đồ đeo.",
  "Tang Đố Mộc": "Cây dâu tằm — cây nuôi tằm, gắn với nghề tơ lụa.",
  "Đại Khê Thủy": "Nước khe lớn — dòng khe rộng, chảy xiết.",
  "Sa Trung Thổ": "Đất lẫn cát — đất pha cát, tơi và dễ thoát nước.",
  "Thiên Thượng Hỏa": "Lửa trên trời — ánh mặt trời, soi khắp nơi.",
  "Thạch Lựu Mộc": "Cây thạch lựu — cây ra hoa đỏ, sống được nơi khô cằn.",
  "Đại Hải Thủy": "Nước biển lớn — biển rộng, sâu và không cạn.",
};

/** Kiểm tra ở lúc build: mọi mệnh nạp âm mà lõi lịch có thể sinh ra đều có dòng ý nghĩa tương ứng. */
export function validateNapAmCoverage(): void {
  for (let i = 0; i < 60; i++) {
    const { napAm } = canChiFromIndex(i);
    if (!(napAm.name in NAP_AM_MO_TA)) {
      throw new Error(`Thiếu mô tả nạp âm cho "${napAm.name}" (can chi ${canChiFromIndex(i).name})`);
    }
  }
}

// ---------------------------------------------------------------------------
// 60 hoa giáp — slug, tra cứu, năm sinh
// ---------------------------------------------------------------------------

const CAN_SLUGS = ["giap", "at", "binh", "dinh", "mau", "ky", "canh", "tan", "nham", "quy"] as const;

export function canChiSlug(canChi: CanChi): string {
  return `${CAN_SLUGS[canChi.canIndex]}-${boDauThanhSlug(canChi.chi)}`;
}

export const ALL_CAN_CHI: readonly CanChi[] = Array.from({ length: 60 }, (_, i) => canChiFromIndex(i));

export function canChiBySlug(slug: string): CanChi | undefined {
  return ALL_CAN_CHI.find((cc) => canChiSlug(cc) === slug);
}

/** Đảm bảo không trùng slug giữa 12 trang con giáp và 60 trang can chi. */
export function assertNoSlugCollision(): void {
  const chiSlugs = new Set(CHI_LIST.map((c) => c.slug));
  const canChiSlugs = new Set(ALL_CAN_CHI.map((cc) => canChiSlug(cc)));
  if (canChiSlugs.size !== 60) throw new Error("Trùng slug giữa các trang can chi với nhau");
  for (const s of canChiSlugs) {
    if (chiSlugs.has(s)) throw new Error(`Slug can chi "${s}" trùng với slug trang con giáp`);
  }
}

/**
 * Năm sinh dương lịch (ước lượng qua `canChiNamDuong`) gần đây nhất ứng với một chi,
 * tính lùi từ năm hiện tại, giới hạn tuổi 0-100.
 */
export function birthYearsForChi(chiIndex: number, currentYear: number, count = 6): number[] {
  const years: number[] = [];
  for (let y = currentYear; y >= currentYear - 100 && years.length < count; y--) {
    if (canChiNamDuong(y).chiIndex === chiIndex) years.push(y);
  }
  return years.reverse();
}

/** Năm dương lịch gần đây nhất (<= currentYear) ứng với một vị trí trong 60 hoa giáp. */
export function mostRecentBirthYearForCanChi(canChiIndex: number, currentYear: number): number {
  let y = currentYear;
  while (canChiNamDuong(y).index !== canChiIndex) y--;
  return y;
}

/** 3 năm sinh của một tuổi can chi: chu kỳ trước, năm gần nhất, chu kỳ sau. */
export function birthYearsForCanChi(canChiIndex: number, currentYear: number): [number, number, number] {
  const y = mostRecentBirthYearForCanChi(canChiIndex, currentYear);
  return [y - 60, y, y + 60];
}

/** Năm gần nhất (>= currentYear, có thể là chính năm nay) mà chi của năm đó là chiIndex đã cho. */
export function nextYearForChi(chiIndex: number, currentYear: number): number {
  let y = currentYear;
  while (canChiNamDuong(y).chiIndex !== chiIndex) y++;
  return y;
}

export function soTuoi(birthYear: number, currentYear: number): number {
  return currentYear - birthYear;
}

// ---------------------------------------------------------------------------
// Các năm đáng lưu ý cho một tuổi can chi (trang con)
// ---------------------------------------------------------------------------

export type NamLuuYNhan = "xung" | "tam-hop" | "nam-tuoi";

export interface NamLuuY {
  year: number;
  canChi: CanChi;
  nhan: NamLuuYNhan;
}

/** 4 năm tới đáng lưu ý: năm xung, 2 năm tam hợp và năm tuổi (bổn mạng), sắp theo thời gian. */
export function namDangLuuY(chiIndex: number, currentYear: number): NamLuuY[] {
  const tamHopPartners = groupContaining(TAM_HOP_GROUPS, chiIndex).filter((c) => c !== chiIndex);
  const targets: { chi: number; nhan: NamLuuYNhan }[] = [
    { chi: xungChiIndex(chiIndex), nhan: "xung" },
    ...tamHopPartners.map((chi) => ({ chi, nhan: "tam-hop" as const })),
    { chi: chiIndex, nhan: "nam-tuoi" },
  ];
  return targets
    .map(({ chi, nhan }) => {
      const year = nextYearForChi(chi, currentYear);
      return { year, canChi: canChiNamDuong(year), nhan };
    })
    .sort((a, b) => a.year - b.year);
}

/** Năm hiện tại có xung với can chi (tuổi) đã cho hay không, và mức xung. */
export function xungTrongNam(canChi: CanChi, year: number): ReturnType<typeof canChiCoXung> {
  return canChiCoXung(canChi, canChiNamDuong(year));
}
