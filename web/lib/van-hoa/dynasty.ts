import { heritageFile } from "@/lib/heritage-assets";

/**
 * Ảnh minh hoạ theo triều đại trên dòng thời gian của trang năm can chi.
 * Khoá `dynasty` trong dữ liệu sự kiện tra ở đây; thiếu khoá hoặc thiếu file thì dùng khung hoa văn trung tính.
 * Ánh xạ ảnh ↔ triều đại là tạm (chưa có nhãn gốc từ hoạ sĩ) — cần duyệt lại khi có dữ liệu thật.
 */
const DIR = "/heritage/van-hoa/trieu-dai";
export const DYNASTIES: Record<string, { name: string; file: string }> = {
  "hung-vuong": { name: "Thời Hùng Vương", file: `${DIR}/hung-vuong.webp` },
  "an-duong-vuong": { name: "Âu Lạc (An Dương Vương)", file: `${DIR}/an-duong-vuong.webp` },
  "bac-thuoc": { name: "Thời Bắc thuộc", file: `${DIR}/bac-thuoc.webp` },
  ngo: { name: "Triều Ngô", file: `${DIR}/ngo.webp` },
  "dinh-le": { name: "Triều Đinh – Tiền Lê", file: `${DIR}/dinh-le.webp` },
  ly: { name: "Triều Lý", file: `${DIR}/ly.webp` },
  tran: { name: "Triều Trần", file: `${DIR}/tran.webp` },
  ho: { name: "Triều Hồ", file: `${DIR}/ho.webp` },
  "le-so": { name: "Triều Lê sơ", file: `${DIR}/le-so.webp` },
  "le-trung-hung": { name: "Triều Lê Trung Hưng", file: `${DIR}/le-trung-hung.webp` },
  mac: { name: "Triều Mạc", file: `${DIR}/mac.webp` },
  "tay-son": { name: "Triều Tây Sơn", file: `${DIR}/tay-son.webp` },
  nguyen: { name: "Triều Nguyễn", file: `${DIR}/nguyen.webp` },
  "hien-dai": { name: "Việt Nam hiện đại", file: `${DIR}/hien-dai.webp` },
};

export function dynastyInfo(key: string): { name: string; image: string | null } {
  const d = DYNASTIES[key];
  return { name: d?.name ?? key, image: d ? heritageFile(d.file) : null };
}
