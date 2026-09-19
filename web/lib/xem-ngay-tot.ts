import { type DayInfo, type SolarDate, canChiNamSinh, getDayInfo, jdFromDate, jdToDate, namSinhCoXung } from "@licham/core";
import { HOP_TRIGGERS, KIENG_TRIGGERS, type ViecDef, matchingStarNames } from "@/lib/day-detail";
import { MONTH_WORD, WEEKDAY_LONG, pad2 } from "@/lib/format";

export type ViecSlug =
  | "cuoi-hoi"
  | "khai-truong"
  | "dong-tho"
  | "nhap-trach"
  | "ky-ket"
  | "mua-xe"
  | "xuat-hanh"
  | "cat-noc"
  | "an-tang"
  | "sua-nha"
  | "cau-tai"
  | "cung-te";

export interface ViecFaqItem {
  q: string;
  a: string;
}

export interface ViecMeta extends ViecDef {
  slug: ViecSlug;
  /** Tên hiển thị trên chip và tiêu đề, ví dụ "cưới hỏi". */
  label: string;
  /** Mô tả một dòng dưới tiêu đề. */
  tagline: string;
  /** Nhãn từng người cần xem tuổi, ví dụ ["chú rể", "cô dâu"] cho cưới hỏi, ["người xem"] cho việc khác. */
  personLabels: readonly string[];
  /** Đoạn unique theo việc — không dùng chung một khung rồi thay nhãn. */
  intro: string;
  extraFaqs: readonly ViecFaqItem[];
}

export const VIEC_LIST: readonly ViecMeta[] = [
  {
    slug: "cuoi-hoi",
    viec: "cưới hỏi",
    label: "cưới hỏi",
    tagline: "Chọn ngày hợp tuổi cô dâu chú rể, tránh ngày xung và các ngày đại kỵ",
    keywords: ["cưới hỏi", "giá thú", "ăn hỏi", "dạm ngõ"],
    personLabels: ["chú rể", "cô dâu"],
    intro:
      "Cưới hỏi xem ngày cho hai người: chú rể và cô dâu. Dân gian kiêng ngày xung tuổi, Tam nương, Nguyệt kỵ; ngày hoàng đạo chỉ là một trong bốn yếu tố chấm điểm, không đủ để quyết định một mình. Nên đối chiếu thêm Kim Lâu của cô dâu ở trang xem tuổi kết hôn.",
    extraFaqs: [
      {
        q: "Cần nhập ngày sinh cả hai người không?",
        a: "Có. Điểm xung tuổi lấy mức nặng hơn giữa chú rể và cô dâu. Thiếu một người thì không phản ánh đủ tục xem ngày cưới.",
      },
      {
        q: "Ngày đẹp cưới có liên quan Kim Lâu không?",
        a: "Trang này chấm từng ngày trong khoảng đã chọn. Kim Lâu xét theo năm cưới và tuổi mụ cô dâu — xem riêng tại xem tuổi kết hôn, không trộn vào thang điểm ngày.",
      },
    ],
  },
  {
    slug: "khai-truong",
    viec: "khai trương",
    label: "khai trương",
    tagline: "Chọn ngày mở hàng, khai trương hợp tuổi gia chủ, tránh ngày đại kỵ",
    keywords: ["khai trương"],
    personLabels: ["người xem"],
    intro:
      "Khai trương, mở hàng xem ngày cho người đứng cửa hàng. Sao tốt xấu trong mô tả Ngọc Hạp nếu nhắc khai trương mới cộng hoặc trừ điểm; ngày đại kỵ vẫn trừ dù là ngày hoàng đạo.",
    extraFaqs: [
      {
        q: "Khai trương có cần tránh tuổi xung không?",
        a: "Có. Nhập ngày sinh người đứng lễ hoặc chủ cửa hàng. Nếu nhiều người cùng cắt băng, nên lấy người chủ trì.",
      },
      {
        q: "Mùng một hoặc rằm có phải ngày tốt mở hàng?",
        a: "Không mặc định. Rằm và mùng một là ngày cúng trong nhà; có thể trùng hoàng đạo hoặc hắc đạo tùy năm. Hãy chấm điểm khoảng tháng bạn định mở.",
      },
    ],
  },
  {
    slug: "dong-tho",
    viec: "động thổ",
    label: "động thổ",
    tagline: "Chọn ngày động thổ, khởi công xây nhà hợp tuổi, tránh ngày đại kỵ",
    keywords: ["động thổ", "làm nhà", "xây cất", "khởi công xây cất"],
    personLabels: ["người xem"],
    intro:
      "Động thổ, khởi công xem ngày cho gia chủ. Việc này còn gắn với tuổi làm nhà trong năm (Kim Lâu, Hoang Ốc, Tam tai) — thang điểm dưới đây chỉ chấm từng ngày, không thay trang xem tuổi xây nhà.",
    extraFaqs: [
      {
        q: "Động thổ khác cất nóc thế nào?",
        a: "Động thổ là ngày bắt đầu đào móng, khởi công. Cất nóc là ngày đổ mái, dựng cột — chọn riêng, không dùng chung một ngày cho cả hai việc nếu có thể.",
      },
      {
        q: "Năm phạm Tam tai có còn xem ngày động thổ?",
        a: "Nhiều người kiêng cả năm. Nếu vẫn làm, trang này vẫn chấm ngày theo sao và hoàng đạo; phần năm thì xem tuổi xây nhà.",
      },
    ],
  },
  {
    slug: "nhap-trach",
    viec: "nhập trạch",
    label: "nhập trạch",
    tagline: "Chọn ngày về nhà mới hợp tuổi gia chủ, tránh ngày đại kỵ",
    keywords: ["nhập trạch", "về nhà mới"],
    personLabels: ["người xem"],
    intro:
      "Nhập trạch là ngày dọn vào nhà mới, khác ngày động thổ. Dân gian thường chọn giờ hoàng đạo buổi sáng, mang theo bếp lửa hoặc đồ thờ tùy vùng. Thang điểm vẫn dựa trên hoàng đạo, sao và tuổi gia chủ.",
    extraFaqs: [
      {
        q: "Nhập trạch có cần cùng ngày cất nóc không?",
        a: "Không bắt buộc. Nhiều nhà cất nóc xong mới nhập trạch vài tuần hoặc vài tháng, mỗi việc một ngày riêng.",
      },
      {
        q: "Về nhà thuê có xem nhập trạch không?",
        a: "Tùy gia đình. Nếu xem, nhập ngày sinh người đứng tên hoặc người lớn nhất trong nhà.",
      },
    ],
  },
  {
    slug: "ky-ket",
    viec: "ký kết",
    label: "ký kết hợp đồng",
    tagline: "Chọn ngày ký kết, giao ước hợp tuổi, tránh ngày đại kỵ",
    keywords: ["ký kết", "giao ước", "hợp đồng"],
    personLabels: ["người xem"],
    intro:
      "Ký kết, giao ước xem ngày cho người ký. Sao Ngọc Hạp nếu nêu giao ước, hợp đồng mới tính; việc pháp lý thật vẫn theo luật và lịch làm việc, không phụ thuộc ngày hoàng đạo.",
    extraFaqs: [
      {
        q: "Ký cuối tuần có bị trừ điểm không?",
        a: "Không. Thang điểm không xét thứ bảy hay chủ nhật. Ngày làm việc hành chính là chuyện khác, xem lịch nghỉ lễ nếu cần.",
      },
      {
        q: "Hai bên ký có phải nhập cả hai tuổi?",
        a: "Trang này mặc định một người xem. Nếu muốn tránh xung cả hai, chạy hai lần hoặc dùng trang cưới hỏi khi là hợp đồng hôn nhân.",
      },
    ],
  },
  {
    slug: "mua-xe",
    viec: "mua xe",
    label: "mua xe",
    tagline: "Chọn ngày mua xe, tậu xe hợp tuổi, tránh ngày đại kỵ",
    keywords: ["mua xe", "tậu xe", "sắm xe"],
    personLabels: ["người xem"],
    intro:
      "Mua xe, tậu xe xem ngày cho người đứng tên hoặc người lái chính. Dân gian hay chọn ngày không đại kỵ và không xung tuổi; giấy tờ đăng ký xe theo cơ quan đăng kiểm, không theo lịch âm.",
    extraFaqs: [
      {
        q: "Ngày lấy xe khác ngày ký hợp đồng mua?",
        a: "Có thể. Ký hợp đồng xem mục ký kết; ngày giao xe mới dùng thang điểm mua xe.",
      },
      {
        q: "Biển số đẹp có liên quan ngày tốt không?",
        a: "Không. Trang này không xếp biển số, không bán phong thủy xe.",
      },
    ],
  },
  {
    slug: "xuat-hanh",
    viec: "xuất hành",
    label: "xuất hành",
    tagline: "Chọn ngày xuất hành, đi xa hợp tuổi, tránh ngày đại kỵ",
    keywords: ["xuất hành"],
    personLabels: ["người xem"],
    intro:
      "Xuất hành, đi xa xem ngày và giờ hoàng đạo. Hướng xuất hành (hỷ thần, tài thần) nằm trên từng trang /ngay/; thang điểm việc này không chấm hướng, chỉ chấm ngày.",
    extraFaqs: [
      {
        q: "Xuất hành đầu năm khác đi công tác giữa năm?",
        a: "Tục xuất hành đầu năm thường chọn ngày sau Tết. Đi công tác giữa năm vẫn có thể xem ngày, nhưng không bắt buộc theo cùng kiêng kỵ Tết.",
      },
      {
        q: "Giờ xuất hành lấy ở đâu?",
        a: "Trên trang từng ngày: giờ hoàng đạo và khung Lý Thuần Phong. Chấm điểm việc chỉ xếp ngày, không xếp giờ.",
      },
    ],
  },
  {
    slug: "cat-noc",
    viec: "cất nóc",
    label: "cất nóc",
    tagline: "Chọn ngày cất nóc, đổ mái hợp tuổi gia chủ, tránh ngày đại kỵ",
    keywords: ["cất nóc", "dựng cột"],
    personLabels: ["người xem"],
    intro:
      "Cất nóc, đổ mái, dựng cột là mốc giữa chừng khi xây nhà, khác động thổ. Sao mô tả dựng cột, cất nóc mới cộng trừ; gia chủ vẫn nên đối chiếu năm làm nhà.",
    extraFaqs: [
      {
        q: "Không chọn được ngày cất nóc trùng tiến độ thì sao?",
        a: "Thang điểm chỉ gợi ý. Tiến độ thi công, thời tiết và an toàn lao động ưu tiên hơn ngày hoàng đạo.",
      },
      {
        q: "Cất nóc có cần tránh Tam nương?",
        a: "Có, cùng quy tắc ngày đại kỵ với các việc lớn khác trên trang này.",
      },
    ],
  },
  {
    slug: "an-tang",
    viec: "an táng",
    label: "an táng, cải táng",
    tagline: "Chọn ngày an táng, cải táng hợp tuổi người đứng lễ, tránh ngày đại kỵ",
    keywords: ["an táng", "cải táng", "chôn cất", "việc hiếu", "tang lễ"],
    personLabels: ["người đứng lễ"],
    intro:
      "An táng, cải táng xem ngày cho người đứng lễ, không cho người đã khuất. Sao Ngọc Hạp nêu an táng, cải táng, việc hiếu mới tính. Đây là tục dân gian, không thay thủ tục hành chính và quy định nghĩa trang.",
    extraFaqs: [
      {
        q: "Cải táng có cùng bảng điểm với an táng không?",
        a: "Có, vì mô tả sao thường nêu chung an táng và cải táng. Nếu gia đình theo thầy riêng, đó là nguồn khác, trang này không mô phỏng.",
      },
      {
        q: "Có cần giờ tốt cho việc hiếu?",
        a: "Giờ nằm trên trang ngày. Việc hiếu thường kiêng một số sao xấu; hãy đọc mô tả sao trong ngày đã chọn.",
      },
    ],
  },
  {
    slug: "sua-nha",
    viec: "sửa nhà",
    label: "sửa nhà",
    tagline: "Chọn ngày sửa nhà, lợp mái, làm lại bếp hợp tuổi gia chủ, tránh ngày đại kỵ",
    keywords: ["sửa nhà", "lợp mái", "xây bếp", "làm nhà"],
    personLabels: ["người xem"],
    intro:
      "Sửa nhà, lợp mái, làm lại bếp nhẹ hơn động thổ nhưng dân gian vẫn kiêng ngày đại kỵ. Nếu đụng móng hay thay kết cấu, nên xem thêm mục động thổ và tuổi làm nhà trong năm.",
    extraFaqs: [
      {
        q: "Sửa bếp có ngày riêng không?",
        a: "Sao có câu về xây bếp thì khớp việc sửa nhà. Không có lịch 'ngày bếp' tách khỏi thang điểm này.",
      },
      {
        q: "Sửa nhà thuê có cần xem tuổi chủ nhà?",
        a: "Tục thường lấy tuổi gia chủ ở nhà đó, không lấy tuổi thợ.",
      },
    ],
  },
  {
    slug: "cau-tai",
    viec: "cầu tài",
    label: "cầu tài",
    tagline: "Chọn ngày cầu tài, mở kho, bắt đầu việc tiền bạc hợp tuổi, tránh ngày đại kỵ",
    keywords: ["cầu tài", "cầu lộc"],
    personLabels: ["người xem"],
    intro:
      "Cầu tài, mở kho, bắt đầu việc tiền bạc xem ngày theo sao cầu tài, cầu lộc. Không phải công cụ đầu tư; không hứa lợi nhuận. Ngày vía Thần Tài (mùng 10 tháng Giêng) xem ở mục lễ, không tự động đứng đầu bảng điểm.",
    extraFaqs: [
      {
        q: "Vía Thần Tài có phải ngày cầu tài tốt nhất năm?",
        a: "Đó là ngày lễ cố định âm lịch. Thang điểm dưới đây chạy theo khoảng bạn chọn, có thể không trùng mùng 10 tháng Giêng.",
      },
      {
        q: "Mở tài khoản ngân hàng có cần xem ngày?",
        a: "Không bắt buộc. Nếu xem, dùng việc này hoặc việc ký kết tùy bạn coi trọng lễ hay giấy tờ.",
      },
    ],
  },
  {
    slug: "cung-te",
    viec: "cúng tế",
    label: "cúng tế, an vị bàn thờ",
    tagline: "Chọn ngày cúng lễ, an vị hoặc dời bàn thờ hợp tuổi gia chủ, tránh ngày đại kỵ",
    keywords: ["cúng tế", "lễ bái", "cầu phúc", "bàn thờ"],
    personLabels: ["người xem"],
    intro:
      "Cúng tế, an vị hoặc dời bàn thờ xem ngày cho gia chủ. Rằm và mùng một có bài khấn riêng; thang điểm này dành cho ngày làm lễ lớn hoặc dời bàn, không thay văn khấn.",
    extraFaqs: [
      {
        q: "Rằm tháng Bảy có phải lúc nào cũng tốt để cúng?",
        a: "Rằm tháng Bảy là lễ Vu Lan, gia đình thường cúng dù ngày ấy hoàng đạo hay hắc đạo. Thang điểm chỉ hữu ích khi chọn ngày dời bàn hay lễ ngoài mùng một, rằm.",
      },
      {
        q: "Bài khấn lấy ở đâu?",
        a: "Mục Văn khấn. Trang ngày sẽ gắn bài mùng một/rằm khi đúng ngày âm 1 hoặc 15.",
      },
    ],
  },
] as const;

export function viecBySlug(slug: string): ViecMeta | undefined {
  return VIEC_LIST.find((v) => v.slug === slug);
}

const TAM_NUONG_DAYS = [3, 7, 13, 18, 22, 27];
const NGUYET_KY_DAYS = [5, 14, 23];

/** Ngày đại kỵ: Tam nương và Nguyệt kỵ. */
function daiKyReasons(lunarDay: number): string[] {
  const reasons: string[] = [];
  if (TAM_NUONG_DAYS.includes(lunarDay)) reasons.push("Tam nương");
  if (NGUYET_KY_DAYS.includes(lunarDay)) reasons.push("Nguyệt kỵ");
  return reasons;
}

export interface DayScore {
  score: number;
  scoreLabel: string | null;
  hoangDaoPoints: number;
  saoPoints: number;
  tuoiXungPoints: number;
  daiKyPoints: number;
  goodStars: string[];
  badStars: string[];
  daiKy: string[];
  tuoiXungReasons: string[];
  reason: string;
}

/** Điểm "không xung tuổi" theo mức xung nặng nhất trong những người xem — xem tables/tuoi-xung.ts. */
const TUOI_XUNG_POINTS: Record<ReturnType<typeof namSinhCoXung>, number> = {
  "khong-xung": 25,
  "xung-chi": 10,
  "thien-khac-dia-xung": 0,
};

function tuoiXungLabel(level: ReturnType<typeof namSinhCoXung>, personLabel: string): string | null {
  if (level === "thien-khac-dia-xung") return `thiên khắc địa xung tuổi ${personLabel}`;
  if (level === "xung-chi") return `xung tuổi ${personLabel}`;
  return null;
}

/**
 * Chấm điểm một ngày cho một việc, thang 100 — xem "Cách chấm điểm" trên trang.
 * `birthDates` là ngày sinh dương lịch đầy đủ của từng người xem (theo `viec.personLabels`) —
 * cần đủ ngày/tháng/năm để tính đúng can chi năm sinh cho người sinh trước Tết Nguyên đán.
 * Nếu nhiều người, điểm "không xung tuổi" lấy theo mức xung nặng nhất trong số họ. Bỏ trống
 * khi chỉ cần điểm không phụ thuộc người xem (ví dụ thống kê tháng tốt nhất trong năm) — khi
 * đó coi như không xung.
 */
export function scoreDay(
  info: DayInfo,
  viec: ViecDef,
  birthDates: readonly SolarDate[] = [],
  personLabels: readonly string[] = [],
): DayScore {
  const isHoangDao = info.thanSatNgay.isHoangDao;
  const hoangDaoPoints = isHoangDao ? 30 : 0;

  const goodStars = matchingStarNames(info.saoTot ?? [], viec, HOP_TRIGGERS);
  const badStars = matchingStarNames(info.saoXau ?? [], viec, KIENG_TRIGGERS);
  const saoPoints = Math.min(goodStars.length * 8, 25) - Math.min(badStars.length * 8, 25);

  const levels = birthDates.map((d) => namSinhCoXung(d, info.canChi.day));
  const tuoiXungPoints = levels.length > 0 ? Math.min(...levels.map((l) => TUOI_XUNG_POINTS[l])) : 25;
  const tuoiXungReasons = levels
    .map((level, i) => tuoiXungLabel(level, personLabels[i] ?? "người xem"))
    .filter((s): s is string => s !== null);

  const daiKy = daiKyReasons(info.lunar.day);
  const daiKyPoints = daiKy.length > 0 ? 0 : 20;

  const score = Math.max(0, Math.min(100, hoangDaoPoints + saoPoints + tuoiXungPoints + daiKyPoints));
  const scoreLabel = score >= 85 ? "Rất tốt" : score >= 70 ? "Khá" : null;

  const daiKyText = daiKy.length > 0 ? `phạm ${daiKy.join(", ")}` : "không phạm ngày đại kỵ nào";
  const reasonParts = [`${isHoangDao ? "Hoàng đạo" : "Hắc đạo"} ${info.thanSatNgay.star}`, `trực ${info.truc.name}`, daiKyText, ...tuoiXungReasons];
  const reason = reasonParts.join(", ");

  return {
    score,
    scoreLabel,
    hoangDaoPoints,
    saoPoints,
    tuoiXungPoints,
    daiKyPoints,
    goodStars,
    badStars,
    daiKy,
    tuoiXungReasons,
    reason,
  };
}

export interface DayResult {
  solar: SolarDate;
  weekday: string;
  monthWord: string;
  lunarLabel: string;
  canChiName: string;
  score: DayScore;
}

function lunarLabel(info: DayInfo): string {
  return `${info.lunar.day} tháng ${MONTH_WORD[info.lunar.month - 1]}${info.lunar.isLeapMonth ? " nhuận" : ""} âm lịch`;
}

/** Xếp hạng các ngày trong khoảng [from, to] (bao gồm hai đầu) theo điểm giảm dần, lấy tối đa `limit` ngày. */
export function bestDaysInRange(
  viec: ViecMeta,
  from: SolarDate,
  to: SolarDate,
  birthDates: readonly SolarDate[] = [],
  limit = 7,
): DayResult[] {
  const startJd = jdFromDate(from.day, from.month, from.year);
  const endJd = jdFromDate(to.day, to.month, to.year);
  const results: DayResult[] = [];
  for (let jd = startJd; jd <= endJd; jd++) {
    const solar = jdToDate(jd);
    const info = getDayInfo(solar);
    results.push({
      solar,
      weekday: WEEKDAY_LONG[info.solar.dayOfWeek]!,
      monthWord: `Tháng ${solar.month}`,
      lunarLabel: lunarLabel(info),
      canChiName: info.canChi.day.name,
      score: scoreDay(info, viec, birthDates, viec.personLabels),
    });
  }
  results.sort((a, b) => b.score.score - a.score.score);
  return results.slice(0, limit);
}

export interface YearMonthScore {
  month: number;
  avgScore: number;
}

/** Điểm trung bình mỗi tháng trong một năm cho một việc — dùng để trả lời câu hỏi "tháng nào hợp nhất". */
export function monthlyAverageScores(viec: ViecDef, year: number): YearMonthScore[] {
  const sums = new Array(12).fill(0) as number[];
  const counts = new Array(12).fill(0) as number[];
  const startJd = jdFromDate(1, 1, year);
  const endJd = jdFromDate(31, 12, year);
  for (let jd = startJd; jd <= endJd; jd++) {
    const solar = jdToDate(jd);
    if (solar.year !== year) continue;
    const info = getDayInfo(solar);
    const idx = solar.month - 1;
    sums[idx] += scoreDay(info, viec).score;
    counts[idx] += 1;
  }
  return sums.map((sum, i) => ({ month: i + 1, avgScore: counts[i] ? sum / counts[i] : 0 }));
}

export function bestMonthOfYear(viec: ViecDef, year: number): YearMonthScore {
  const scores = monthlyAverageScores(viec, year);
  return scores.reduce((best, cur) => (cur.avgScore > best.avgScore ? cur : best));
}

/** "Ất Hợi · mệnh Sơn Đầu Hỏa" — nhãn can chi năm sinh hiển thị cạnh ô nhập ngày sinh, để người dùng tự kiểm. */
export function birthDateLabel(d: SolarDate): string {
  const cc = canChiNamSinh(d.day, d.month, d.year);
  return `${cc.name} · mệnh ${cc.napAm.name}`;
}

export function formatSolarDate(d: SolarDate): string {
  return `${pad2(d.day)}/${pad2(d.month)}/${d.year}`;
}
