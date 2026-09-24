/**
 * 24 tiết khí: nội dung trang /tiet-khi/<slug>/. Ngày bắt đầu và kinh độ lấy từ lõi lịch
 * (getSolarTermsOfYear); ở đây chỉ có nghĩa tên gọi và mô tả khí hậu, mùa vụ mang tính khái quát
 * (khí hậu miền Bắc Việt Nam, nơi hệ tiết khí được dùng trong nông lịch truyền thống).
 */
import { SOLAR_TERM_NAMES, type SolarDate, getSolarTermsOfYear, vietnamDateOf } from "@licham/core";
import { tietKhiImage, tietKhiMua, tietKhiSlug } from "./heritage-assets";

export interface TietKhi {
  slug: string;
  ten: string;
  /** Kinh độ Mặt Trời lúc bắt đầu tiết (độ). */
  kinhDo: number;
  /** Tiết (tiết khí đầu tháng tiết) hay trung khí. */
  loai: "tiet" | "trung-khi";
  mua: ReturnType<typeof tietKhiMua>;
  /** Nghĩa của tên gọi Hán Việt. */
  nghia: string;
  /** Khí hậu và mùa vụ thường gặp. */
  moTa: string;
}

const NOI_DUNG: Record<string, { nghia: string; moTa: string }> = {
  "Lập xuân": {
    nghia: "Lập là bắt đầu — tiết mở đầu mùa xuân.",
    moTa: "Tiết đầu tiên của năm theo nông lịch, thường rơi quanh Tết Nguyên đán. Trời còn lạnh nhưng ấm dần, cây cối đâm chồi, nhà nông chuẩn bị vụ chiêm xuân.",
  },
  "Vũ thủy": {
    nghia: "Vũ là mưa, thủy là nước — mưa ẩm bắt đầu nhiều.",
    moTa: "Mưa phùn, độ ẩm cao; ruộng được cày bừa, gieo mạ và cấy lúa chiêm xuân.",
  },
  "Kinh trập": {
    nghia: "Kinh là kinh động, trập là ẩn náu — sâu bọ ngủ đông thức giấc.",
    moTa: "Bắt đầu có sấm xuân, côn trùng và sâu bệnh hoạt động trở lại; cần chăm sóc, phòng trừ sâu cho lúa và hoa màu.",
  },
  "Xuân phân": {
    nghia: "Phân là chia đôi — giữa mùa xuân, ngày và đêm dài gần bằng nhau.",
    moTa: "Mặt Trời qua điểm xuân phân (kinh độ 0°). Thời tiết ấm áp, cây cối xanh tốt.",
  },
  "Thanh minh": {
    nghia: "Thanh là trong, minh là sáng — trời trong sáng.",
    moTa: "Khí trời mát mẻ, trong lành. Đây cũng là dịp tảo mộ, sửa sang mồ mả tổ tiên (Tết Thanh minh).",
  },
  "Cốc vũ": {
    nghia: "Cốc là lúa, vũ là mưa — mưa rào tốt cho lúa.",
    moTa: "Mưa nhiều hơn, thuận lợi cho lúa chiêm xuân đẻ nhánh và hoa màu phát triển.",
  },
  "Lập hạ": {
    nghia: "Bắt đầu mùa hạ.",
    moTa: "Nắng nóng tăng dần, sen bắt đầu nở; lúa chiêm xuân vào giai đoạn làm đòng.",
  },
  "Tiểu mãn": {
    nghia: "Mãn là đầy — hạt lúa bắt đầu mẩy, sắp đầy.",
    moTa: "Nắng nóng, mưa rào mùa hạ bắt đầu; lúa chiêm xuân chắc hạt dần, chuẩn bị thu hoạch.",
  },
  "Mang chủng": {
    nghia: "Mang là râu hạt lúa, chủng là gieo trồng — lúa có râu chín, bắt đầu gieo trồng vụ mới.",
    moTa: "Thu hoạch lúa chiêm xuân và chuẩn bị gieo mạ, cấy vụ mùa.",
  },
  "Hạ chí": {
    nghia: "Chí là cực điểm — giữa mùa hạ, ngày dài nhất năm ở Bắc bán cầu.",
    moTa: "Mặt Trời ở kinh độ 90°, ban ngày dài nhất. Nắng nóng gay gắt xen mưa rào.",
  },
  "Tiểu thử": {
    nghia: "Thử là nóng — nóng nhẹ.",
    moTa: "Trời nóng bức, nhiều mưa dông; ruộng vụ mùa được cấy và chăm sóc.",
  },
  "Đại thử": {
    nghia: "Nóng gay gắt — thời kỳ nóng nhất năm.",
    moTa: "Nắng nóng đỉnh điểm, mưa lớn và bão bắt đầu nhiều; cần giữ nước và phòng úng cho lúa mùa.",
  },
  "Lập thu": {
    nghia: "Bắt đầu mùa thu.",
    moTa: "Nắng dịu dần, sáng sớm và chiều tối mát hơn, nhưng vẫn có thể còn mưa bão.",
  },
  "Xử thử": {
    nghia: "Xử là chấm dứt — hết nóng.",
    moTa: "Cái nóng mùa hè lui dần, tiết trời chuyển sang thu; lúa mùa đứng cái, làm đòng.",
  },
  "Bạch lộ": {
    nghia: "Bạch là trắng, lộ là sương móc — xuất hiện sương trắng buổi sớm.",
    moTa: "Sáng sớm có sương, trời hanh mát; lúa mùa trổ bông.",
  },
  "Thu phân": {
    nghia: "Giữa mùa thu, ngày và đêm dài gần bằng nhau.",
    moTa: "Mặt Trời qua điểm thu phân (kinh độ 180°). Tiết trời mát mẻ, lúa mùa vào chắc.",
  },
  "Hàn lộ": {
    nghia: "Hàn là lạnh — sương móc lạnh.",
    moTa: "Trời se lạnh về sáng và đêm; lúa mùa chín, bắt đầu gặt.",
  },
  "Sương giáng": {
    nghia: "Giáng là rơi xuống — sương mù, sương muối bắt đầu xuất hiện.",
    moTa: "Cuối thu, trời lạnh dần; thu hoạch lúa mùa và chuẩn bị gieo trồng cây vụ đông.",
  },
  "Lập đông": {
    nghia: "Bắt đầu mùa đông.",
    moTa: "Gió mùa đông bắc về, trời lạnh hơn; ruộng sau gặt được trồng cây vụ đông.",
  },
  "Tiểu tuyết": {
    nghia: "Tuyết nhẹ — tên gọi theo khí hậu phương Bắc, ở Việt Nam là thời kỳ rét nhẹ.",
    moTa: "Trời hanh khô, lạnh dần; vùng núi cao phía Bắc có thể có sương muối.",
  },
  "Đại tuyết": {
    nghia: "Tuyết lớn — ở Việt Nam là thời kỳ rét hơn, nhiều sương muối.",
    moTa: "Gió mùa đông bắc mạnh, rét; cần giữ ấm cho người, gia súc và cây trồng.",
  },
  "Đông chí": {
    nghia: "Giữa mùa đông — ngày ngắn nhất, đêm dài nhất năm ở Bắc bán cầu.",
    moTa: "Mặt Trời ở kinh độ 270°. Trời lạnh, nhiều nơi có tục làm lễ cúng Đông chí.",
  },
  "Tiểu hàn": {
    nghia: "Hàn là lạnh — rét nhẹ đầu tháng Chạp.",
    moTa: "Rét đậm bắt đầu; chuẩn bị mạ, làm đất cho vụ chiêm xuân.",
  },
  "Đại hàn": {
    nghia: "Rét đậm — thời kỳ lạnh nhất năm.",
    moTa: "Rét đậm, rét hại có thể kéo dài; cần che chắn mạ non và giữ ấm cho gia súc. Sau Đại hàn là Lập xuân.",
  },
};

/** Thứ tự nông lịch: bắt đầu từ Lập xuân (315°). */
const THU_TU = [...SOLAR_TERM_NAMES.slice(21), ...SOLAR_TERM_NAMES.slice(0, 21)];

export const TIET_KHI: TietKhi[] = THU_TU.map((ten) => {
  const idx = SOLAR_TERM_NAMES.indexOf(ten);
  const kinhDo = idx * 15;
  const nd = NOI_DUNG[ten]!;
  return {
    slug: tietKhiSlug(ten),
    ten,
    kinhDo,
    // Trung khí ở kinh độ chia hết cho 30 (Xuân phân 0°, Cốc vũ 30°…); tiết ở các kinh độ còn lại.
    loai: kinhDo % 30 === 0 ? "trung-khi" : "tiet",
    mua: tietKhiMua(kinhDo),
    nghia: nd.nghia,
    moTa: nd.moTa,
  };
});

export const MUA_LABEL = { xuan: "Mùa xuân", ha: "Mùa hạ", thu: "Mùa thu", dong: "Mùa đông" } as const;

export function tietKhiHref(slug: string): string {
  return `/tiet-khi/${slug}/`;
}

export function tietKhiBySlug(slug: string): TietKhi | undefined {
  return TIET_KHI.find((t) => t.slug === slug);
}

export function tietKhiArt(t: TietKhi): string | null {
  return tietKhiImage(t.ten);
}

/** Ngày bắt đầu (giờ Việt Nam) của tiết trong năm dương lịch `year`. */
export function tietKhiNgay(t: TietKhi, year: number): SolarDate {
  const term = getSolarTermsOfYear(year).find((x) => x.name === t.ten)!;
  return vietnamDateOf(term.start);
}

/** Tiết liền trước / liền sau theo vòng nông lịch (Đại hàn → Lập xuân). */
export function tietKhiKeCan(slug: string): { prev: TietKhi; next: TietKhi } {
  const i = TIET_KHI.findIndex((t) => t.slug === slug);
  return { prev: TIET_KHI[(i + 23) % 24]!, next: TIET_KHI[(i + 1) % 24]! };
}
