import type { ItemLabel } from "./types";

/** Loại sự kiện: quyết định biểu tượng thay cho tranh minh họa dùng chung. */
export const EVENT_TYPES = [
  { key: "khoi-nghia", label: "Khởi nghĩa, kháng chiến" },
  { key: "tran-danh", label: "Chiến thắng, trận đánh" },
  { key: "trieu-dai", label: "Triều đại, lên ngôi, thoái vị" },
  { key: "chinh-tri", label: "Chính trị, hiệp ước" },
  { key: "van-hoa", label: "Văn hoá, giáo dục" },
  { key: "ton-giao", label: "Tôn giáo, tín ngưỡng" },
  { key: "truyen-thuyet", label: "Truyền thuyết" },
  { key: "nhan-vat", label: "Nhân vật, sự kiện cá nhân" },
  { key: "khac", label: "Khác" },
] as const;

export type EventType = (typeof EVENT_TYPES)[number]["key"];

export const eventTypeLabel = (t: EventType): string => EVENT_TYPES.find((x) => x.key === t)!.label;

/** Quy tắc theo thứ tự ưu tiên, so khớp trên tiêu đề (chữ thường). Khớp đầu tiên thắng. */
const RULES: readonly [EventType, RegExp][] = [
  ["van-hoa", /văn miếu|quốc tử giám|khoa thi|nho học|bia tiến sĩ|quốc học|bộ sách|soạn/],
  ["ton-giao", /chùa|phật hoàng|viên tịch/],
  ["nhan-vat", /qua đời|băng hà|\bmất\b|tuẫn tiết|hy sinh|bị sát hại|bị ám hại|hành quyết|bị đầu độc|bị bắt|bị giặc|bị phế|lưu đày|kết hôn|tử trận|rời tổ quốc|liều mình/],
  ["trieu-dai", /lên ngôi|xưng |nối ngôi|kế vị|kế nhiệm|kế lập|nhường ngôi|phế truất|cướp ngôi|thoái vị|lập (nước|vương triều|nhà)|thành lập nước|đặt niên hiệu|định đô|phục hưng triều|hồi loan|đổi quốc hiệu|định quốc hiệu|khai sinh|đại lễ|làm chủ giao châu|loạn|tranh quyền/],
  ["khoi-nghia", /khởi nghĩa|khởi binh|dựng cờ|kháng|chống |cần vương|nghĩa quân|bùng nổ|đàn áp|phong trào|hội thề|phá huyện|hội nghị (quân sự|diên hồng|bình than)|hịch/],
  ["tran-danh", /trận|đại thắng|chiến thắng|đại phá|đánh|xâm lược|tấn công|tiêu diệt|thôn tính|chiếm|hạ thành|thất thủ|phòng tuyến|thủy chiến|hải chiến|tập kích|phục kích|giết|thu phục|bình định|dẹp|vây|cướp phá|điều binh|phát quân|xâm lấn|bắt sống|chặn giặc|bức hàng|cướp đoàn|trừ khử|thủy quân|tiến quân|thành (vạn|đồ|xương|gia|hà)/],
  ["chinh-tri", /hòa ước|ký kết|ban hành|luật|cải cách|chính sách|đảng|hội duy tân|mặt trận|liên bang|thành lập|hội nghị|kinh lược|chia đặt|đô hộ|thái thú|thứ sử|trấn thủ|phụ chính|công nhận|dâng đất|nộp đất|phân tranh|đắp|xây|khởi dựng|bóc lột|tự chủ|giành quyền|cai trị|đảo chính|chiếu dời đô|tuyên ngôn|tiền giấy/],
];

/** Ngoại lệ theo tiêu đề đầy đủ, cho các mốc mà từ khoá trong tiêu đề dễ xếp nhầm. */
const OVERRIDES: Record<string, EventType> = {
  "Nghĩa quân Lam Sơn hạ thành Xương Giang": "tran-danh",
  "Hội thề Đông Quan chấm dứt chiến tranh": "chinh-tri",
  "Triệu Việt Vương phá tan Dương Sàn": "tran-danh",
  "Chu Đạt chém Nghê Thức": "tran-danh",
  "Lữ Đại lừa sát hại Sĩ Huy": "nhan-vat",
  "Thái hậu Cù thị cầu hòa nhà Hán": "chinh-tri",
  "Vua Lê Hoàn cày ruộng Tịch điền": "ton-giao",
  "Lý Phật Tử đánh úp Triệu Việt Vương": "tran-danh",
  "Binh biến Lê Nghi Dân": "trieu-dai",
  "Binh biến phục kích tại kinh thành Huế": "tran-danh",
  "Nguyễn Ánh tái chiếm Phú Xuân": "tran-danh",
  "Tuyên ngôn Độc lập khai sinh nước VNDCCH": "trieu-dai",
  "Hồ Quý Ly cho xây dựng thành Tây Đô": "chinh-tri",
  "Đào Duy Từ đắp Lũy Thầy": "chinh-tri",
  "Cao Biền đánh Nam Chiếu đắp Đại La": "tran-danh",
  "Chu Tuấn đàn áp Lương Long": "khoi-nghia",
  "Thái sư Tô Hiến Thành phụ chính": "chinh-tri",
  "Đặt tên An Nam đô hộ phủ": "chinh-tri",
  "Nhà Hán sai Mã Viện xâm lược": "tran-danh",
};

export function classifyEvent(e: { title: string; label: ItemLabel }): EventType {
  if (e.label === "truyen-thuyet") return "truyen-thuyet";
  const o = OVERRIDES[e.title];
  if (o) return o;
  const t = e.title.toLowerCase();
  for (const [type, re] of RULES) if (re.test(t)) return type;
  return "khac";
}
