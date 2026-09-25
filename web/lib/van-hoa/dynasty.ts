import { heritageFile } from "@/lib/heritage-assets";

/**
 * Ảnh minh hoạ theo triều đại trên dòng thời gian của trang năm can chi.
 * Khoá `dynasty` trong dữ liệu sự kiện tra ở đây; thiếu khoá hoặc thiếu file thì dùng khung hoa văn trung tính.
 */
const DIR = "/heritage/van-hoa/trieu-dai";
const D = (key: string, name: string) => ({ key, name, file: `${DIR}/trieu-dai-${key}.webp` });

/** Thứ tự thời gian; cũng là thứ tự nhóm ở trang danh sách sự kiện. Tên file ảnh: trieu-dai-<khoá>.webp. */
export const DYNASTY_LIST = [
  D("van-lang", "Văn Lang"),
  D("au-lac", "Âu Lạc"),
  D("bac-thuoc", "Bắc thuộc"),
  D("van-xuan", "Vạn Xuân"),
  D("nha-ngo", "Nhà Ngô"),
  D("nha-dinh", "Nhà Đinh"),
  D("tien-le", "Tiền Lê"),
  D("nha-ly", "Nhà Lý"),
  D("nha-tran", "Nhà Trần"),
  D("nha-ho", "Nhà Hồ"),
  D("thuoc-minh", "Thuộc Minh"),
  D("le-so", "Lê sơ"),
  D("nha-mac", "Nhà Mạc"),
  D("le-trung-hung", "Lê Trung Hưng"),
  D("tay-son", "Tây Sơn"),
  D("nha-nguyen", "Nhà Nguyễn"),
  D("hien-dai", "Việt Nam hiện đại"),
] as const;

export function dynastyInfo(key: string): { name: string; image: string | null } {
  const d = DYNASTY_LIST.find((x) => x.key === key);
  return { name: d?.name ?? key, image: d ? heritageFile(d.file) : null };
}
