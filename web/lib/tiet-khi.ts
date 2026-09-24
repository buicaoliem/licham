/**
 * 24 tiết khí: nội dung trang /tiet-khi/<slug>/. Ngày bắt đầu và kinh độ lấy từ lõi lịch
 * (getSolarTermsOfYear). Nội dung dưới đây đã đối chiếu nguồn (xem NGUON_TIET_KHI và trường
 * `nguon` từng tiết, kiểm chứng 25/9/2026):
 * - `nghia`: nghĩa chữ Hán Việt của tên gọi (tên tiếng Anh theo Đài Thiên văn Hồng Kông để đối chiếu).
 * - `dongA`: ý nghĩa theo lịch pháp Đông Á — hệ tiết khí phản ánh khí hậu vùng trung nguyên Trung Quốc
 *   thời cổ (HKO), không mô tả trực tiếp thời tiết Việt Nam.
 * - `vietNam`: chỉ ghi khi có nguồn, luôn nêu rõ vùng (thường là miền Bắc); không khái quát cho cả nước.
 */
import { SOLAR_TERM_NAMES, type SolarDate, getSolarTermsOfYear, vietnamDateOf } from "@licham/core";
import { tietKhiImage, tietKhiMua, tietKhiSlug } from "./heritage-assets";

export type NguonKey = "hko" | "wiki-tiet-khi" | "wiki-tiet" | "wiki-khi-hau";

export interface TietKhi {
  slug: string;
  ten: string;
  /** Chữ Hán của tên tiết. */
  han: string;
  /** Tên tiếng Anh theo Hong Kong Observatory. */
  tenAnh: string;
  /** Kinh độ Mặt Trời lúc bắt đầu tiết (độ). */
  kinhDo: number;
  /** Tiết (tiết khí đầu tháng tiết) hay trung khí. */
  loai: "tiet" | "trung-khi";
  /** Mùa theo lịch pháp (mùa mở đầu bằng tiết "Lập"). */
  mua: ReturnType<typeof tietKhiMua>;
  /** Nghĩa chữ của tên gọi. */
  nghia: string;
  /** Ý nghĩa theo lịch pháp Đông Á (khí hậu Trung Hoa cổ đại). */
  dongA: string;
  /** Liên hệ với khí hậu Việt Nam — chỉ có khi có nguồn; luôn nêu rõ vùng. */
  vietNam?: string;
  /** Nguồn dùng cho tiết này. */
  nguon: NguonKey[];
}

type NoiDung = Pick<TietKhi, "han" | "tenAnh" | "nghia" | "dongA" | "vietNam"> & {
  /** true: câu về Việt Nam lấy từ bài "Khí hậu Việt Nam". */
  nguonVn?: boolean;
};

const NOI_DUNG: Record<string, NoiDung> = {
  "Lập xuân": {
    han: "立春",
    tenAnh: "Spring Commences",
    nghia: "Lập là bắt đầu, xuân là mùa xuân — tiết mở đầu mùa xuân theo lịch pháp.",
    dongA: "Bắt đầu mùa xuân. Trong hệ tiết khí, mỗi mùa mở đầu bằng một tiết có chữ “Lập” (Lập xuân, Lập hạ, Lập thu, Lập đông).",
    vietNam:
      "Ở miền Bắc (từ đèo Hải Vân trở ra), từ khoảng thời gian này thường bắt đầu có mưa phùn do giao thời giữa gió đông bắc và gió đông nam, độ ẩm tăng cao, dễ gây hiện tượng nồm.",
  },
  "Vũ thủy": {
    han: "雨水",
    tenAnh: "Spring Showers",
    nghia: "Vũ là mưa, thủy là nước.",
    dongA: "Mưa ẩm.",
    vietNam: "Ở miền Bắc, nửa sau mùa đông thường có nhiều ngày nhiều mây và mưa phùn.",
    nguonVn: true,
  },
  "Kinh trập": {
    han: "驚蟄",
    tenAnh: "Insects Waken",
    nghia: "Kinh là làm kinh động, trập là (côn trùng) ẩn náu qua mùa đông.",
    dongA: "Sâu nở — côn trùng ngủ đông thức giấc.",
  },
  "Xuân phân": {
    han: "春分",
    tenAnh: "Vernal Equinox",
    nghia: "Phân là chia đôi — điểm giữa mùa xuân theo lịch pháp.",
    dongA: "Mặt Trời qua điểm xuân phân (kinh độ 0°); ngày và đêm dài bằng nhau. Kinh độ của các tiết khác được tính từ điểm này.",
  },
  "Thanh minh": {
    han: "清明",
    tenAnh: "Bright and Clear",
    nghia: "Thanh là trong, minh là sáng — trời trong sáng.",
    dongA: "Trời trong sáng. Tiết này gắn với Tết Thanh minh, dịp tảo mộ và đi đạp thanh.",
    vietNam: "Ở miền Bắc, gió mùa đông bắc đã yếu, gió đông nam mạnh dần lên và mưa phùn gần như chấm dứt.",
  },
  "Cốc vũ": {
    han: "穀雨",
    tenAnh: "Corn Rain",
    nghia: "Cốc là ngũ cốc, vũ là mưa.",
    dongA: "Mưa rào — mưa có lợi cho ngũ cốc.",
  },
  "Lập hạ": {
    han: "立夏",
    tenAnh: "Summer Commences",
    nghia: "Lập là bắt đầu, hạ là mùa hè.",
    dongA: "Bắt đầu mùa hè theo lịch pháp.",
  },
  "Tiểu mãn": {
    han: "小滿",
    tenAnh: "Corn Forms",
    nghia: "Tiểu là nhỏ, mãn là đầy — hạt ngũ cốc bắt đầu mẩy nhưng chưa đầy hẳn.",
    dongA: "Hạt ngũ cốc bắt đầu hình thành. Wikipedia tiếng Việt giải nghĩa tiết này là “lũ nhỏ, duối vàng”.",
  },
  "Mang chủng": {
    han: "芒種",
    tenAnh: "Corn on Ear",
    nghia: "Mang là râu của hạt lúa, lúa mì; chủng là hạt giống, gieo trồng.",
    dongA: "Ngũ cốc trổ bông.",
    vietNam: "Theo kinh nghiệm của nhà nông Việt Nam, đây còn là lúc thấy chòm sao Tua Rua (trong chòm Kim Ngưu) mọc.",
  },
  "Hạ chí": {
    han: "夏至",
    tenAnh: "Summer Solstice",
    nghia: "Chí là tột cùng — điểm giữa mùa hạ theo lịch pháp.",
    dongA: "Mặt Trời ở kinh độ 90°; ở Bắc bán cầu, đây là ngày có ban ngày dài nhất năm.",
  },
  "Tiểu thử": {
    han: "小暑",
    tenAnh: "Moderate Heat",
    nghia: "Tiểu là nhỏ, thử là nắng nóng.",
    dongA: "Nóng nhẹ.",
  },
  "Đại thử": {
    han: "大暑",
    tenAnh: "Great Heat",
    nghia: "Đại là lớn, thử là nắng nóng.",
    dongA: "Nóng oi — theo lịch pháp là thời kỳ nóng nhất năm.",
    vietNam: "Mùa hè cũng là mùa bão: trung bình mỗi mùa hè có khoảng 11 cơn bão và áp thấp nhiệt đới phát triển trên Biển Đông.",
    nguonVn: true,
  },
  "Lập thu": {
    han: "立秋",
    tenAnh: "Autumn Commences",
    nghia: "Lập là bắt đầu, thu là mùa thu.",
    dongA: "Bắt đầu mùa thu theo lịch pháp.",
  },
  "Xử thử": {
    han: "處暑",
    tenAnh: "End of Heat",
    nghia: "Xử là dừng, kết thúc; thử là nắng nóng.",
    dongA: "Hết nóng bức — cái nóng mùa hè lui dần.",
  },
  "Bạch lộ": {
    han: "白露",
    tenAnh: "White Dew",
    nghia: "Bạch là trắng, lộ là sương móc — sương trắng.",
    dongA: "Sáng sớm xuất hiện sương móc. Wikipedia tiếng Việt giải nghĩa tiết này là “nắng nhạt”.",
  },
  "Thu phân": {
    han: "秋分",
    tenAnh: "Autumnal Equinox",
    nghia: "Phân là chia đôi — điểm giữa mùa thu theo lịch pháp.",
    dongA: "Mặt Trời qua điểm thu phân (kinh độ 180°); ngày và đêm dài bằng nhau.",
  },
  "Hàn lộ": {
    han: "寒露",
    tenAnh: "Cold Dew",
    nghia: "Hàn là lạnh, lộ là sương móc — sương lạnh.",
    dongA: "Sương lạnh, trời mát mẻ.",
  },
  "Sương giáng": {
    han: "霜降",
    tenAnh: "Frost",
    nghia: "Sương là sương giá, giáng là rơi xuống.",
    dongA: "Ở vùng Trung Hoa cổ đại, sương giá bắt đầu xuất hiện. Wikipedia tiếng Việt giải nghĩa là “sương mù xuất hiện”.",
  },
  "Lập đông": {
    han: "立冬",
    tenAnh: "Winter Commences",
    nghia: "Lập là bắt đầu, đông là mùa đông.",
    dongA: "Bắt đầu mùa đông theo lịch pháp.",
    vietNam: "Mùa đông ở miền Bắc chịu ảnh hưởng mạnh của gió mùa đông bắc; miền Nam chỉ có mùa mưa và mùa khô.",
    nguonVn: true,
  },
  "Tiểu tuyết": {
    han: "小雪",
    tenAnh: "Light Snow",
    nghia: "Tiểu là nhỏ — tuyết nhỏ.",
    dongA: "Tuyết bắt đầu xuất hiện ở vùng Trung Hoa cổ đại.",
    vietNam:
      "Gần như toàn bộ lãnh thổ Việt Nam không có tuyết trong thời kỳ này. Tuyết chỉ hiếm hoi xuất hiện trên một số đỉnh núi cao phía Bắc như Fansipan, Mẫu Sơn, và thường rơi vào các tiết Tiểu hàn – Đại hàn.",
  },
  "Đại tuyết": {
    han: "大雪",
    tenAnh: "Heavy Snow",
    nghia: "Đại là lớn — tuyết lớn.",
    dongA: "Tuyết dày ở vùng Trung Hoa cổ đại.",
    vietNam:
      "Tên gọi không phản ánh thời tiết Việt Nam: gần như cả nước không có tuyết; chỉ một số đỉnh núi cao phía Bắc hiếm hoi có tuyết, thường vào Tiểu hàn – Đại hàn.",
  },
  "Đông chí": {
    han: "冬至",
    tenAnh: "Winter Solstice",
    nghia: "Chí là tột cùng — điểm giữa mùa đông theo lịch pháp.",
    dongA: "Mặt Trời ở kinh độ 270°; ở Bắc bán cầu, đây là ngày có ban ngày ngắn nhất năm.",
  },
  "Tiểu hàn": {
    han: "小寒",
    tenAnh: "Moderate Cold",
    nghia: "Tiểu là nhỏ, hàn là lạnh.",
    dongA: "Rét nhẹ.",
    vietNam: "Tuyết, nếu có, thường chỉ hiếm hoi xuất hiện trên các đỉnh núi cao phía Bắc (như Fansipan, Mẫu Sơn) vào khoảng Tiểu hàn – Đại hàn.",
  },
  "Đại hàn": {
    han: "大寒",
    tenAnh: "Severe Cold",
    nghia: "Đại là lớn, hàn là lạnh.",
    dongA: "Thường là thời kỳ lạnh nhất năm ở vùng Trung Hoa cổ đại; tuy vậy, nếu Tiểu hàn đã rất lạnh thì Đại hàn thường không lạnh lắm.",
    vietNam: "Ở miền Bắc (từ đèo Hải Vân trở ra), gió mùa đông bắc khô lạnh còn mạnh; nhà nông chú ý tiết này để bảo vệ cây trồng khỏi rét đậm, rét hại.",
  },
};

/** Nguồn tham khảo chung của trang tiết khí. */
export const NGUON_TIET_KHI: Record<Exclude<NguonKey, "wiki-tiet">, { ten: string; url: string }> = {
  hko: { ten: "Đài Thiên văn Hồng Kông (Hong Kong Observatory), “The 24 Solar Terms”", url: "https://www.hko.gov.hk/en/gts/time/24solarterms.htm" },
  "wiki-tiet-khi": { ten: "Wikipedia tiếng Việt, “Tiết khí”", url: "https://vi.wikipedia.org/wiki/Ti%E1%BA%BFt_kh%C3%AD" },
  "wiki-khi-hau": { ten: "Wikipedia tiếng Việt, “Khí hậu Việt Nam”", url: "https://vi.wikipedia.org/wiki/Kh%C3%AD_h%E1%BA%ADu_Vi%E1%BB%87t_Nam" },
};

/** Bài Wikipedia tiếng Việt riêng của tiết. */
export function wikiTietUrl(ten: string): string {
  return `https://vi.wikipedia.org/wiki/${encodeURIComponent(ten.replace(/ /g, "_"))}`;
}

/** Thứ tự nông lịch: bắt đầu từ Lập xuân (315°). */
const THU_TU = [...SOLAR_TERM_NAMES.slice(21), ...SOLAR_TERM_NAMES.slice(0, 21)];

export const TIET_KHI: TietKhi[] = THU_TU.map((ten) => {
  const idx = SOLAR_TERM_NAMES.indexOf(ten);
  const kinhDo = idx * 15;
  const { nguonVn, ...nd } = NOI_DUNG[ten]!;
  return {
    slug: tietKhiSlug(ten),
    ten,
    ...nd,
    kinhDo,
    // Trung khí ở kinh độ chia hết cho 30 (Xuân phân 0°, Cốc vũ 30°…); tiết ở các kinh độ còn lại.
    loai: kinhDo % 30 === 0 ? "trung-khi" : "tiet",
    mua: tietKhiMua(kinhDo),
    nguon: ["hko", "wiki-tiet", "wiki-tiet-khi", ...(nguonVn ? (["wiki-khi-hau"] as const) : [])],
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
