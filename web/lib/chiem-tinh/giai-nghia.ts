/**
 * Nhãn và diễn giải chiêm tinh phương Tây — nội dung do Lịch Âm tự biên soạn theo ý nghĩa phổ thông
 * của chiêm tinh hiện đại. Phần DIỄN GIẢI tách khỏi phần TÍNH TOÁN (engine.ts): vị trí thiên thể là số liệu
 * thiên văn; ý nghĩa là quan niệm chiêm tinh, không có cơ sở khoa học, chỉ để tham khảo, giải trí.
 */
import type { AspectType, PointId } from "./engine";

export type Element = "Lửa" | "Đất" | "Khí" | "Nước";
export type Modality = "Tiên phong" | "Kiên định" | "Linh hoạt";

export interface SignInfo {
  name: string;
  latin: string;
  symbol: string;
  element: Element;
  modality: Modality;
  ruler: string;
  keywords: string;
  /** Cách biểu hiện: dùng để ghép câu "… theo cách …". */
  style: string;
}

// Ký hiệu kèm U+FE0E để hiển thị dạng chữ, không thành emoji.
const T = "︎";

export const SIGNS: readonly SignInfo[] = [
  { name: "Bạch Dương", latin: "Aries", symbol: `♈${T}`, element: "Lửa", modality: "Tiên phong", ruler: "Sao Hỏa", keywords: "can đảm, khởi xướng, bộc trực", style: "thẳng thắn, nhanh nhạy và thích đi đầu" },
  { name: "Kim Ngưu", latin: "Taurus", symbol: `♉${T}`, element: "Đất", modality: "Kiên định", ruler: "Sao Kim", keywords: "bền bỉ, thực tế, hưởng thụ", style: "chậm rãi, chắc chắn, coi trọng sự an toàn và cảm giác dễ chịu" },
  { name: "Song Tử", latin: "Gemini", symbol: `♊${T}`, element: "Khí", modality: "Linh hoạt", ruler: "Sao Thủy", keywords: "tò mò, giao tiếp, đa năng", style: "linh hoạt, ham hiểu biết, thích trao đổi và thay đổi" },
  { name: "Cự Giải", latin: "Cancer", symbol: `♋${T}`, element: "Nước", modality: "Tiên phong", ruler: "Mặt Trăng", keywords: "chăm sóc, gia đình, nhạy cảm", style: "giàu cảm xúc, bảo bọc và gắn bó với người thân" },
  { name: "Sư Tử", latin: "Leo", symbol: `♌${T}`, element: "Lửa", modality: "Kiên định", ruler: "Mặt Trời", keywords: "tự tin, hào phóng, sáng tạo", style: "nồng nhiệt, rộng rãi, muốn được ghi nhận" },
  { name: "Xử Nữ", latin: "Virgo", symbol: `♍${T}`, element: "Đất", modality: "Linh hoạt", ruler: "Sao Thủy", keywords: "tỉ mỉ, phân tích, phục vụ", style: "cẩn thận, chú ý chi tiết và muốn mọi thứ hữu ích" },
  { name: "Thiên Bình", latin: "Libra", symbol: `♎${T}`, element: "Khí", modality: "Tiên phong", ruler: "Sao Kim", keywords: "hài hòa, công bằng, hợp tác", style: "tìm sự cân bằng, lịch thiệp và coi trọng quan hệ đôi bên" },
  { name: "Bọ Cạp", latin: "Scorpio", symbol: `♏${T}`, element: "Nước", modality: "Kiên định", ruler: "Sao Diêm Vương (cổ điển: Sao Hỏa)", keywords: "sâu sắc, mãnh liệt, chuyển hóa", style: "sâu sắc, kín đáo, dồn hết sức và khó buông bỏ" },
  { name: "Nhân Mã", latin: "Sagittarius", symbol: `♐${T}`, element: "Lửa", modality: "Linh hoạt", ruler: "Sao Mộc", keywords: "tự do, lạc quan, triết lý", style: "phóng khoáng, lạc quan, hướng tới ý nghĩa và những chân trời mới" },
  { name: "Ma Kết", latin: "Capricorn", symbol: `♑${T}`, element: "Đất", modality: "Tiên phong", ruler: "Sao Thổ", keywords: "kỷ luật, tham vọng, trách nhiệm", style: "nghiêm túc, bền chí, hướng tới mục tiêu dài hạn" },
  { name: "Bảo Bình", latin: "Aquarius", symbol: `♒${T}`, element: "Khí", modality: "Kiên định", ruler: "Sao Thiên Vương (cổ điển: Sao Thổ)", keywords: "độc lập, cải cách, cộng đồng", style: "độc lập, khác biệt, quan tâm tới tập thể và cái mới" },
  { name: "Song Ngư", latin: "Pisces", symbol: `♓${T}`, element: "Nước", modality: "Linh hoạt", ruler: "Sao Hải Vương (cổ điển: Sao Mộc)", keywords: "trực giác, cảm thông, mơ mộng", style: "mềm mỏng, giàu trí tưởng tượng và dễ đồng cảm" },
];

export interface PointInfo {
  name: string;
  short: string;
  symbol: string;
  /** Lĩnh vực mà điểm này đại diện. */
  domain: string;
  meaning: string;
}

export const POINTS: Record<PointId, PointInfo> = {
  sun: { name: "Mặt Trời", short: "MTr", symbol: `☉${T}`, domain: "Bản ngã và sức sống", meaning: "Cái tôi cốt lõi, mục đích sống, cách tỏa sáng. Cung Mặt Trời là “cung hoàng đạo” quen thuộc." },
  moon: { name: "Mặt Trăng", short: "MTg", symbol: `☽${T}`, domain: "Cảm xúc và nhu cầu", meaning: "Đời sống cảm xúc, thói quen, điều khiến mình thấy an toàn; mối liên hệ với mẹ và gia đình." },
  mercury: { name: "Sao Thủy", short: "Thủy", symbol: `☿${T}`, domain: "Tư duy và giao tiếp", meaning: "Cách suy nghĩ, học hỏi, nói và viết." },
  venus: { name: "Sao Kim", short: "Kim", symbol: `♀${T}`, domain: "Tình cảm và giá trị", meaning: "Cách yêu thương, gu thẩm mỹ, điều mình trân trọng, quan hệ với tiền bạc." },
  mars: { name: "Sao Hỏa", short: "Hỏa", symbol: `♂${T}`, domain: "Hành động và ý chí", meaning: "Năng lượng, sự quyết đoán, cách theo đuổi mục tiêu và đối mặt xung đột." },
  jupiter: { name: "Sao Mộc", short: "Mộc", symbol: `♃${T}`, domain: "Phát triển và niềm tin", meaning: "Sự mở rộng, may mắn, lạc quan, học vấn cao và triết lý sống." },
  saturn: { name: "Sao Thổ", short: "Thổ", symbol: `♄${T}`, domain: "Kỷ luật và giới hạn", meaning: "Trách nhiệm, cấu trúc, bài học phải trả giá, sự trưởng thành theo thời gian." },
  uranus: { name: "Sao Thiên Vương", short: "TVư", symbol: `♅${T}`, domain: "Đổi mới và tự do", meaning: "Sự đột phá, bất ngờ, khác biệt. Đi chậm (~7 năm một cung) nên mang tính thế hệ." },
  neptune: { name: "Sao Hải Vương", short: "HVư", symbol: `♆${T}`, domain: "Mơ ước và tâm linh", meaning: "Trực giác, nghệ thuật, lý tưởng, cả sự mơ hồ. Đi rất chậm (~14 năm một cung), mang tính thế hệ." },
  pluto: { name: "Sao Diêm Vương", short: "DVư", symbol: `♇${T}`, domain: "Chuyển hóa và quyền lực", meaning: "Sự biến đổi sâu, tái sinh, quyền lực ngầm. Đi rất chậm, mang tính thế hệ." },
  node: { name: "Nút Bắc", short: "NBắc", symbol: `☊${T}`, domain: "Hướng phát triển", meaning: "Điểm giao giữa quỹ đạo Mặt Trăng và hoàng đạo; chiêm tinh hiện đại xem là hướng cần vươn tới." },
  southNode: { name: "Nút Nam", short: "NNam", symbol: `☋${T}`, domain: "Thói quen sẵn có", meaning: "Đối diện Nút Bắc; những gì đã quen, dễ dựa vào nhưng không nên bám mãi." },
  asc: { name: "Ascendant (Mọc)", short: "ASC", symbol: "AC", domain: "Dáng vẻ bên ngoài", meaning: "Điểm hoàng đạo đang mọc ở chân trời phía đông lúc sinh: ấn tượng đầu tiên, cách tiếp cận cuộc sống. Cần giờ sinh chính xác." },
  mc: { name: "Thiên đỉnh (MC)", short: "MC", symbol: "MC", domain: "Sự nghiệp và danh tiếng", meaning: "Điểm hoàng đạo cao nhất trên kinh tuyến lúc sinh: định hướng nghề nghiệp, hình ảnh xã hội." },
};

export const HOUSES: readonly { name: string; meaning: string }[] = [
  { name: "Nhà 1", meaning: "Bản thân, ngoại hình, cách khởi đầu" },
  { name: "Nhà 2", meaning: "Tiền bạc, tài sản, giá trị bản thân" },
  { name: "Nhà 3", meaning: "Giao tiếp, học tập, anh chị em, đi lại gần" },
  { name: "Nhà 4", meaning: "Gia đình, nhà cửa, cội nguồn" },
  { name: "Nhà 5", meaning: "Sáng tạo, niềm vui, tình yêu, con cái" },
  { name: "Nhà 6", meaning: "Công việc hằng ngày, sức khỏe, thói quen" },
  { name: "Nhà 7", meaning: "Hôn nhân, đối tác, quan hệ một-một" },
  { name: "Nhà 8", meaning: "Tài chính chung, gắn kết sâu, chuyển hóa" },
  { name: "Nhà 9", meaning: "Học vấn cao, niềm tin, đi xa" },
  { name: "Nhà 10", meaning: "Sự nghiệp, địa vị, danh tiếng" },
  { name: "Nhà 11", meaning: "Bạn bè, cộng đồng, ước vọng" },
  { name: "Nhà 12", meaning: "Nội tâm, điều ẩn giấu, nghỉ ngơi, buông bỏ" },
];

export const ASPECT_MEANING: Record<AspectType, string> = {
  conjunction: "Hai năng lượng hòa làm một, khuếch đại nhau — tốt hay khó tùy bản chất hai điểm.",
  sextile: "Hỗ trợ nhẹ nhàng, cơ hội mở ra nếu chủ động nắm bắt.",
  square: "Căng thẳng, thôi thúc hành động; thử thách giúp trưởng thành.",
  trine: "Hài hòa, tài năng tự nhiên, mọi việc trôi chảy.",
  opposition: "Hai cực kéo ngược nhau, cần cân bằng; thường thể hiện qua quan hệ với người khác.",
};

export const signOf = (lon: number): SignInfo => SIGNS[Math.floor((((lon % 360) + 360) % 360) / 30)];

/** "15°32′ Kim Ngưu". */
export function formatSignDegree(lon: number): string {
  const l = ((lon % 360) + 360) % 360;
  const inSign = l % 30;
  let d = Math.floor(inSign);
  let m = Math.round((inSign - d) * 60);
  if (m === 60) {
    d += 1;
    m = 0;
  }
  return `${d}°${String(m).padStart(2, "0")}′ ${signOf(l).name}`;
}

/** Câu diễn giải ghép "điểm trong cung". */
export function pointInSign(id: PointId, lon: number): string {
  const p = POINTS[id];
  const s = signOf(lon);
  return `${p.domain} được thể hiện theo cách ${s.style}.`;
}

export function pointInHouse(id: PointId, house: number): string {
  return `${POINTS[id].domain} hướng về lĩnh vực ${HOUSES[house - 1].meaning.toLowerCase()}.`;
}

/** Thống kê nguyên tố và tính chất theo 10 hành tinh (cộng ASC nếu có). */
export function balance(points: { id: PointId; lon: number }[]): { element: Record<Element, number>; modality: Record<Modality, number> } {
  const element: Record<Element, number> = { Lửa: 0, Đất: 0, Khí: 0, Nước: 0 };
  const modality: Record<Modality, number> = { "Tiên phong": 0, "Kiên định": 0, "Linh hoạt": 0 };
  for (const p of points) {
    if (p.id === "node" || p.id === "southNode" || p.id === "mc") continue;
    const s = signOf(p.lon);
    element[s.element] += 1;
    modality[s.modality] += 1;
  }
  return { element, modality };
}
