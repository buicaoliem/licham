import { type NguHanh, canChiNamDuong } from "@licham/core";
import { hopMenh } from "@/lib/tuoi";

export type TenGioi = "nam" | "nu" | "chung";

export interface TenEntry {
  slug: string;
  ten: string;
  chuHan: string;
  nghia: string;
  /** Hành gắn với nghĩa/bộ chữ — tục đặt tên, không phải nạp âm năm. */
  hanh: NguHanh;
  gioi: TenGioi;
  nguon: string;
  luan: string;
}

export const TEN_LIST: readonly TenEntry[] = [
  { slug: "minh", ten: "Minh", chuHan: "明", nghia: "sáng, rõ", hanh: "Hỏa", gioi: "chung", nguon: "Hán Việt, chữ Minh (明)", luan: "Minh là chữ hay đặt cho cả trai lẫn gái, gắn với ánh sáng và sự thông suốt. Dân gian thường chọn Minh cho bé mệnh Hỏa hoặc cần hành Hỏa bổ." },
  { slug: "duc", ten: "Đức", chuHan: "德", nghia: "đức hạnh, phẩm hạnh", hanh: "Hỏa", gioi: "nam", nguon: "Hán Việt, chữ Đức (德)", luan: "Đức nhấn phẩm hạnh hơn hình thức. Thường gặp ở tên nam, ít khi đứng một mình ở tên nữ." },
  { slug: "anh", ten: "Anh", chuHan: "英", nghia: "hoa, người tài hoa", hanh: "Mộc", gioi: "chung", nguon: "Hán Việt, chữ Anh (英); nữ đôi khi viết 映", luan: "Anh (英) nghĩa gốc là hoa, về sau chỉ người tuấn tú. Cùng phát âm còn chữ 映 (ánh chiếu) — trang này lấy 英 làm nguồn chính." },
  { slug: "dung", ten: "Dũng", chuHan: "勇", nghia: "dũng cảm", hanh: "Thổ", gioi: "nam", nguon: "Hán Việt, chữ Dũng (勇)", luan: "Dũng gắn với can đảm, ít dùng cho nữ. Không nên nhầm với Dung (容) bên nữ." },
  { slug: "hung", ten: "Hùng", chuHan: "雄", nghia: "hùng mạnh", hanh: "Thổ", gioi: "nam", nguon: "Hán Việt, chữ Hùng (雄)", luan: "Hùng là chữ nam điển hình, nghĩa mạnh mẽ. Khác Hưng (興) là hưng thịnh." },
  { slug: "quang", ten: "Quang", chuHan: "光", nghia: "ánh sáng", hanh: "Hỏa", gioi: "nam", nguon: "Hán Việt, chữ Quang (光)", luan: "Quang cùng nhóm nghĩa với Minh nhưng thiên về ánh sáng tỏa ra, hay gặp ở tên nam." },
  { slug: "tuan", ten: "Tuấn", chuHan: "俊", nghia: "tuấn tú, tài giỏi", hanh: "Hỏa", gioi: "nam", nguon: "Hán Việt, chữ Tuấn (俊)", luan: "Tuấn chỉ người tuấn tú. Rất phổ biến ở tên nam thế hệ 1980–2010." },
  { slug: "hoang", ten: "Hoàng", chuHan: "黃", nghia: "màu vàng; họ Hoàng", hanh: "Thổ", gioi: "nam", nguon: "Hán Việt, chữ Hoàng (黃)", luan: "Hoàng vừa là họ vừa là tên. Khi dùng làm tên, dân gian gắn với hành Thổ vì nghĩa vàng/đất." },
  { slug: "nam", ten: "Nam", chuHan: "南", nghia: "phương nam", hanh: "Hỏa", gioi: "nam", nguon: "Hán Việt, chữ Nam (南)", luan: "Nam chỉ phương nam, trong ngũ hành phương nam thuộc Hỏa. Dùng làm tên riêng, không phải giới tính." },
  { slug: "long", ten: "Long", chuHan: "龍", nghia: "rồng", hanh: "Thủy", gioi: "nam", nguon: "Hán Việt, chữ Long (龍)", luan: "Long là rồng. Tục hay xếp rồng với nước, mưa, nên trang này gắn hành Thủy theo nghĩa chữ chứ không theo nạp âm năm Tỵ/Thìn." },
  { slug: "hai", ten: "Hải", chuHan: "海", nghia: "biển", hanh: "Thủy", gioi: "nam", nguon: "Hán Việt, chữ Hải (海), bộ thủy", luan: "Hải có bộ thủy, nghĩa biển. Đây là tên hành Thủy rõ vì bộ chữ, không phải suy từ con giáp." },
  { slug: "son", ten: "Sơn", chuHan: "山", nghia: "núi", hanh: "Thổ", gioi: "nam", nguon: "Hán Việt, chữ Sơn (山)", luan: "Sơn là núi, hành Thổ theo nghĩa đất đá. Thường đặt cho nam." },
  { slug: "phong", ten: "Phong", chuHan: "峰", nghia: "đỉnh núi", hanh: "Thổ", gioi: "nam", nguon: "Hán Việt, chữ Phong (峰); còn chữ 風 là gió", luan: "Trang này lấy Phong (峰) đỉnh núi. Cùng âm còn 風 (gió) — nếu gia đình chọn gió thì hành khác, cần ghi rõ chữ." },
  { slug: "phuc", ten: "Phúc", chuHan: "福", nghia: "phúc lộc, may mắn", hanh: "Mộc", gioi: "chung", nguon: "Hán Việt, chữ Phúc (福)", luan: "Phúc là phúc khí, chữ cửa thờ. Dùng được cho cả trai gái, hay đứng trong tên kép." },
  { slug: "thanh-dat", ten: "Thành", chuHan: "成", nghia: "nên, thành đạt", hanh: "Thổ", gioi: "nam", nguon: "Hán Việt, chữ Thành (成)", luan: "Thành (成) khác Thanh (清). Thành thiên về nên người, thành đạt." },
  { slug: "trung", ten: "Trung", chuHan: "忠", nghia: "trung thực, trung thành", hanh: "Hỏa", gioi: "nam", nguon: "Hán Việt, chữ Trung (忠)", luan: "Trung (忠) là lòng trung. Khác Trung (中) là ở giữa — nguồn trang này là 忠." },
  { slug: "viet", ten: "Việt", chuHan: "越", nghia: "vượt; nước Việt", hanh: "Mộc", gioi: "nam", nguon: "Hán Việt, chữ Việt (越)", luan: "Việt gắn với ethnonym Việt và nghĩa vượt. Hay đặt cho nam." },
  { slug: "bao", ten: "Bảo", chuHan: "寶", nghia: "của quý", hanh: "Thổ", gioi: "chung", nguon: "Hán Việt, chữ Bảo (寶)", luan: "Bảo là của quý, dùng được cho cả hai giới, thường đứng sau (Gia Bảo, An Bảo)." },
  { slug: "binh", ten: "Bình", chuHan: "平", nghia: "bằng phẳng, yên", hanh: "Thổ", gioi: "nam", nguon: "Hán Việt, chữ Bình (平)", luan: "Bình nghĩa yên, phẳng. Hay gặp ở tên nam thế hệ trước." },
  { slug: "cuong", ten: "Cường", chuHan: "強", nghia: "mạnh", hanh: "Mộc", gioi: "nam", nguon: "Hán Việt, chữ Cường (強)", luan: "Cường là mạnh. Tên nam, ít khi dùng cho nữ." },
  { slug: "dat", ten: "Đạt", chuHan: "達", nghia: "thông đạt, tới nơi", hanh: "Hỏa", gioi: "nam", nguon: "Hán Việt, chữ Đạt (達)", luan: "Đạt nghĩa tới được, thông suốt. Phổ biến ở tên nam." },
  { slug: "hieu", ten: "Hiếu", chuHan: "孝", nghia: "hiếu thảo", hanh: "Thủy", gioi: "nam", nguon: "Hán Việt, chữ Hiếu (孝)", luan: "Hiếu là đạo hiếu. Tên nam thiên về đức hơn hình." },
  { slug: "hoa-thuan", ten: "Hòa", chuHan: "和", nghia: "hòa thuận", hanh: "Thủy", gioi: "chung", nguon: "Hán Việt, chữ Hòa (和)", luan: "Hòa (和) khác Hoa (花). Hòa là thuận, dùng được cho cả hai giới." },
  { slug: "hung-thinh", ten: "Hưng", chuHan: "興", nghia: "hưng thịnh", hanh: "Hỏa", gioi: "nam", nguon: "Hán Việt, chữ Hưng (興)", luan: "Hưng là hưng khởi, khác Hùng (雄). Hay đặt cho nam." },
  { slug: "khang", ten: "Khang", chuHan: "康", nghia: "an khang", hanh: "Mộc", gioi: "nam", nguon: "Hán Việt, chữ Khang (康)", luan: "Khang gắn an khang, thịnh vượng. Tên nam phổ biến những năm gần đây." },
  { slug: "lam", ten: "Lâm", chuHan: "林", nghia: "rừng", hanh: "Mộc", gioi: "nam", nguon: "Hán Việt, chữ Lâm (林), hai chữ Mộc", luan: "Lâm là rừng, chữ gồm hai Mộc — hành Mộc rõ từ bộ chữ." },
  { slug: "loc", ten: "Lộc", chuHan: "祿", nghia: "lộc, bổng lộc", hanh: "Thủy", gioi: "nam", nguon: "Hán Việt, chữ Lộc (祿)", luan: "Lộc là bổng lộc. Hay đi cùng Phúc (Phúc Lộc)." },
  { slug: "nhan", ten: "Nhân", chuHan: "仁", nghia: "nhân ái", hanh: "Kim", gioi: "chung", nguon: "Hán Việt, chữ Nhân (仁)", luan: "Nhân là đức nhân. Dùng được cho nam, đôi khi nữ trong tên kép." },
  { slug: "quoc", ten: "Quốc", chuHan: "國", nghia: "đất nước", hanh: "Thổ", gioi: "nam", nguon: "Hán Việt, chữ Quốc (國)", luan: "Quốc chỉ nước nhà. Tên nam, thường đứng trước (Quốc Anh) hoặc sau." },
  { slug: "tai", ten: "Tài", chuHan: "才", nghia: "năng lực, tài năng", hanh: "Hỏa", gioi: "nam", nguon: "Hán Việt, chữ Tài (才)", luan: "Tài là năng lực. Khác Tài (財) là của cải — nguồn trang này là 才." },
  { slug: "thang", ten: "Thắng", chuHan: "勝", nghia: "thắng, vượt", hanh: "Hỏa", gioi: "nam", nguon: "Hán Việt, chữ Thắng (勝)", luan: "Thắng nghĩa vượt, thắng cuộc. Tên nam." },
  { slug: "tien", ten: "Tiến", chuHan: "進", nghia: "tiến lên", hanh: "Hỏa", gioi: "nam", nguon: "Hán Việt, chữ Tiến (進)", luan: "Tiến là bước tới. Phổ biến ở tên nam." },
  { slug: "tri", ten: "Trí", chuHan: "智", nghia: "trí tuệ", hanh: "Hỏa", gioi: "nam", nguon: "Hán Việt, chữ Trí (智)", luan: "Trí gắn trí tuệ. Tên nam, đôi khi tên kép (Minh Trí)." },
  { slug: "tung", ten: "Tùng", chuHan: "松", nghia: "cây tùng", hanh: "Mộc", gioi: "nam", nguon: "Hán Việt, chữ Tùng (松), bộ mộc", luan: "Tùng là cây tùng, bộ mộc — hành Mộc theo chữ, bền và chịu rét trong nghĩa dân gian." },
  { slug: "vinh", ten: "Vinh", chuHan: "榮", nghia: "vinh hiển", hanh: "Mộc", gioi: "nam", nguon: "Hán Việt, chữ Vinh (榮)", luan: "Vinh (榮) có bộ mộc, nghĩa vinh hiển. Tên nam." },
  { slug: "vu", ten: "Vũ", chuHan: "武", nghia: "võ, võ nghệ", hanh: "Thủy", gioi: "nam", nguon: "Hán Việt, chữ Vũ (武); còn 雨 là mưa", luan: "Trang này lấy Vũ (武) võ. Cùng âm 雨 (mưa) mới là bộ thủy thuần — gia đình cần chọn đúng chữ." },
  { slug: "xuan", ten: "Xuân", chuHan: "春", nghia: "mùa xuân", hanh: "Mộc", gioi: "chung", nguon: "Hán Việt, chữ Xuân (春)", luan: "Xuân là mùa xuân, hành Mộc theo mùa. Dùng được cho cả hai giới." },
  { slug: "linh", ten: "Linh", chuHan: "玲", nghia: "ngọc kêu trong", hanh: "Thủy", gioi: "nu", nguon: "Hán Việt, chữ Linh (玲)", luan: "Linh (玲) là tiếng ngọc. Tên nữ rất phổ biến; khác Linh (靈) là thiêng." },
  { slug: "chi", ten: "Chi", chuHan: "芝", nghia: "nấm linh chi; nhánh", hanh: "Mộc", gioi: "nu", nguon: "Hán Việt, chữ Chi (芝)", luan: "Chi (芝) là linh chi, cây cỏ — hành Mộc. Tên nữ ngắn, hay đi với Anh, Mai." },
  { slug: "mai", ten: "Mai", chuHan: "梅", nghia: "hoa mai", hanh: "Mộc", gioi: "nu", nguon: "Hán Việt, chữ Mai (梅), bộ mộc", luan: "Mai là hoa mai, bộ mộc rõ. Tên nữ, cũng gặp ở nam trong một số thế hệ." },
  { slug: "lan", ten: "Lan", chuHan: "蘭", nghia: "hoa lan", hanh: "Mộc", gioi: "nu", nguon: "Hán Việt, chữ Lan (蘭)", luan: "Lan là hoa lan, hành Mộc. Tên nữ cổ điển." },
  { slug: "hoa", ten: "Hoa", chuHan: "花", nghia: "bông hoa", hanh: "Mộc", gioi: "nu", nguon: "Hán Việt, chữ Hoa (花)", luan: "Hoa (花) khác Hòa (和). Hoa là bông, hành Mộc." },
  { slug: "huong", ten: "Hương", chuHan: "香", nghia: "mùi thơm", hanh: "Mộc", gioi: "nu", nguon: "Hán Việt, chữ Hương (香)", luan: "Hương là thơm. Tên nữ, hay đứng sau (Thu Hương)." },
  { slug: "trang", ten: "Trang", chuHan: "莊", nghia: "nghiêm trang", hanh: "Mộc", gioi: "nu", nguon: "Hán Việt, chữ Trang (莊)", luan: "Trang (莊) là nghiêm. Tên nữ; khác Trang sức theo nghĩa thường." },
  { slug: "thao", ten: "Thảo", chuHan: "草", nghia: "cỏ, cây cỏ", hanh: "Mộc", gioi: "nu", nguon: "Hán Việt, chữ Thảo (草), bộ thảo", luan: "Thảo là cỏ cây, bộ thảo — hành Mộc rõ. Tên nữ." },
  { slug: "ngoc", ten: "Ngọc", chuHan: "玉", nghia: "ngọc", hanh: "Kim", gioi: "nu", nguon: "Hán Việt, chữ Ngọc (玉)", luan: "Ngọc là đá quý. Dân gian thường xếp ngọc với hành Kim. Tên nữ, đôi khi nam (Ngọc Sơn)." },
  { slug: "ha", ten: "Hà", chuHan: "河", nghia: "sông", hanh: "Thủy", gioi: "nu", nguon: "Hán Việt, chữ Hà (河), bộ thủy", luan: "Hà là sông, bộ thủy. Tên nữ ngắn, hành Thủy theo chữ." },
  { slug: "phuong", ten: "Phương", chuHan: "芳", nghia: "thơm; phương hướng", hanh: "Mộc", gioi: "nu", nguon: "Hán Việt, chữ Phương (芳) thơm; còn 方 là hướng", luan: "Trang này lấy Phương (芳) thơm, hành Mộc. 方 (hướng) là chữ khác cùng âm." },
  { slug: "quynh", ten: "Quỳnh", chuHan: "瓊", nghia: "ngọc quỳnh", hanh: "Kim", gioi: "nu", nguon: "Hán Việt, chữ Quỳnh (瓊)", luan: "Quỳnh là ngọc đẹp. Tên nữ, hành Kim theo nghĩa ngọc." },
  { slug: "yen", ten: "Yến", chuHan: "燕", nghia: "chim yến", hanh: "Hỏa", gioi: "nu", nguon: "Hán Việt, chữ Yến (燕)", luan: "Yến là chim yến. Tên nữ; khác Yên (安) là yên ổn." },
  { slug: "ngan", ten: "Ngân", chuHan: "銀", nghia: "bạc", hanh: "Kim", gioi: "nu", nguon: "Hán Việt, chữ Ngân (銀)", luan: "Ngân là bạc, hành Kim rõ từ nghĩa chữ. Tên nữ." },
  { slug: "thanh", ten: "Thanh", chuHan: "清", nghia: "trong, sạch", hanh: "Thủy", gioi: "chung", nguon: "Hán Việt, chữ Thanh (清), bộ thủy", luan: "Thanh (清) có bộ thủy, nghĩa trong. Dùng cho cả hai giới; khác Thành (成)." },
  { slug: "uyen", ten: "Uyên", chuHan: "淵", nghia: "vực sâu", hanh: "Thủy", gioi: "nu", nguon: "Hán Việt, chữ Uyên (淵), bộ thủy", luan: "Uyên là vực sâu, bộ thủy. Tên nữ, hành Thủy theo chữ." },
  { slug: "van", ten: "Vân", chuHan: "雲", nghia: "mây", hanh: "Thủy", gioi: "nu", nguon: "Hán Việt, chữ Vân (雲)", luan: "Vân là mây. Tục xếp mây với nước, hành Thủy. Tên nữ." },
  { slug: "giang", ten: "Giang", chuHan: "江", nghia: "sông lớn", hanh: "Thủy", gioi: "chung", nguon: "Hán Việt, chữ Giang (江), bộ thủy", luan: "Giang là sông, bộ thủy. Dùng cho nữ nhiều hơn nam." },
  { slug: "hong", ten: "Hồng", chuHan: "紅", nghia: "màu đỏ", hanh: "Hỏa", gioi: "nu", nguon: "Hán Việt, chữ Hồng (紅)", luan: "Hồng là đỏ, hành Hỏa theo màu. Tên nữ." },
  { slug: "lien", ten: "Liên", chuHan: "蓮", nghia: "hoa sen", hanh: "Mộc", gioi: "nu", nguon: "Hán Việt, chữ Liên (蓮), bộ thảo", luan: "Liên là sen, bộ thảo — hành Mộc. Sen mọc từ nước nhưng chữ thuộc thảo." },
  { slug: "tuyet", ten: "Tuyết", chuHan: "雪", nghia: "tuyết", hanh: "Thủy", gioi: "nu", nguon: "Hán Việt, chữ Tuyết (雪)", luan: "Tuyết là tuyết, hành Thủy. Tên nữ." },
  { slug: "anh-sang", ten: "Ánh", chuHan: "映", nghia: "chiếu sáng", hanh: "Hỏa", gioi: "nu", nguon: "Hán Việt, chữ Ánh (映)", luan: "Ánh (映) là chiếu. Tên nữ, hành Hỏa theo nghĩa sáng; khác Anh (英)." },
  { slug: "chau", ten: "Châu", chuHan: "珠", nghia: "hạt châu", hanh: "Thủy", gioi: "nu", nguon: "Hán Việt, chữ Châu (珠)", luan: "Châu là hạt châu, ngọc trai — tục gắn nước, hành Thủy. Tên nữ." },
  { slug: "kim", ten: "Kim", chuHan: "金", nghia: "vàng, kim loại", hanh: "Kim", gioi: "chung", nguon: "Hán Việt, chữ Kim (金)", luan: "Kim là kim loại, hành Kim trùng tên hành. Dùng được cho nữ (Kim) và nam trong tên kép." },
  { slug: "truc", ten: "Trúc", chuHan: "竹", nghia: "cây trúc", hanh: "Mộc", gioi: "nu", nguon: "Hán Việt, chữ Trúc (竹)", luan: "Trúc là tre trúc, hành Mộc. Tên nữ, cũng gặp ở nam (Trúc Lâm)." },
  { slug: "an", ten: "An", chuHan: "安", nghia: "yên ổn", hanh: "Thổ", gioi: "chung", nguon: "Hán Việt, chữ An (安)", luan: "An là yên. Dùng rất rộng cho cả hai giới, hay đứng trước hoặc sau." },
  { slug: "khanh", ten: "Khánh", chuHan: "慶", nghia: "mừng, khánh tiết", hanh: "Mộc", gioi: "chung", nguon: "Hán Việt, chữ Khánh (慶)", luan: "Khánh là mừng. Dùng cho nam và nữ (Khánh Linh, Khánh)." },
] as const;

export function tenBySlug(slug: string): TenEntry | undefined {
  return TEN_LIST.find((t) => t.slug === slug);
}

export function tenCungHanh(hanh: NguHanh, exceptSlug?: string): TenEntry[] {
  return TEN_LIST.filter((t) => t.hanh === hanh && t.slug !== exceptSlug);
}

/** Hành sinh ra mệnh năm (tục: lấy chữ hành này hoặc cùng hành mệnh). */
export function hanhGoiYTheoNam(year: number): { namMenh: NguHanh; hanhSinh: NguHanh } {
  const namMenh = canChiNamDuong(year).napAm.element;
  return { namMenh, hanhSinh: hopMenh(namMenh).sinhRa };
}

export function goiYTenTheoNam(year: number, gioi?: TenGioi | "all"): TenEntry[] {
  const { namMenh, hanhSinh } = hanhGoiYTheoNam(year);
  return TEN_LIST.filter((t) => {
    if (gioi && gioi !== "all" && t.gioi !== "chung" && t.gioi !== gioi) return false;
    return t.hanh === namMenh || t.hanh === hanhSinh;
  });
}

export const TEN_GOI_Y_YEARS = [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031] as const;

/** Các năm trong dải gợi ý mà tên này khớp tục hành sinh/cùng mệnh. */
export function namKhopTen(entry: TenEntry): number[] {
  return TEN_GOI_Y_YEARS.filter((y) => {
    const { namMenh, hanhSinh } = hanhGoiYTheoNam(y);
    return entry.hanh === namMenh || entry.hanh === hanhSinh;
  });
}

export function assertTenSlugsUnique(): void {
  const slugs = TEN_LIST.map((t) => t.slug);
  if (new Set(slugs).size !== slugs.length) throw new Error("Trùng slug tên");
}
