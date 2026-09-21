/** Dữ liệu 60 trang "Ngày lễ" (/le/[slug]), transcribe nguyên văn từ mock/le-dot-{1,2,3}.md. */
import { VAN_KHAN_LIST } from "./van-khan";

export type LeNhom = "anh-hung" | "am-lich" | "nghi-le" | "ky-niem" | "quoc-te";
export type LeLich = "am" | "am-cuoi-thang" | "tiet-khi" | "duong" | "duong-thu";

export interface LeNgayChinh {
  /** lich === "am": ngày/tháng âm lịch (tháng không nhuận). */
  am?: { ngay: number; thang: number };
  /** lich === "am-cuoi-thang": luôn tháng 12 (Chạp), ngày cuối tháng (29 hoặc 30 tùy năm). */
  amCuoiThang?: { thang: number };
  /** lich === "tiet-khi": tên tiết khí, khớp SolarTermName của lõi lịch. */
  tietKhi?: string;
  /** lich === "duong": ngày/tháng dương lịch cố định. */
  duong?: { ngay: number; thang: number };
  /** lich === "duong-thu": ví dụ CN thứ 2 tháng 5 → { thuTu: 2, thu: 0, thang: 5 } (thu: 0=CN..6=Thứ Bảy). */
  duongThu?: { thuTu: number; thu: number; thang: number };
}

export interface LeNghiLe {
  soNgay: number;
  ghiChu?: string;
}

export interface LeLienKet {
  label: string;
  href: string;
}

export interface LePage {
  slug: string;
  ten: string;
  tieuDe: string;
  nhom: LeNhom;
  lich: LeLich;
  ngayChinh: LeNgayChinh;
  ngayPhu?: string;
  namMat?: number;
  namSinh?: number;
  namGoc?: number;
  nghiLe?: LeNghiLe;
  /** Slug bài văn khấn liên quan (VAN_KHAN_LIST), thẻ đầu tiên là thẻ chính. */
  vanKhan: string[];
  moTa: string;
  /** Đoạn văn "Đôi nét" (nhóm anh-hùng) hoặc "Ý nghĩa" (các nhóm khác). */
  yNghia: string[];
  /** "Thông tin nhanh" dạng cặp nhãn — giá trị, chỉ nhóm anh-hùng dùng. */
  thongTin?: { label: string; value: string }[];
  /** Gạch đầu dòng "Phong tục" (đợt 2) hoặc "Hoạt động" (đợt 3). */
  bullets?: string[];
  lienKet?: LeLienKet[];
  /** Trang này có ảnh thật (chỉ Hồ Chí Minh) thay vì minh hoạ SVG. */
  coAnhThat?: boolean;
}

// ---------- đợt 1: Anh hùng dân tộc (16 trang) ----------
const DOT_1: LePage[] = [
  {
    slug: "gio-hai-ba-trung",
    ten: "Hai Bà Trưng",
    tieuDe: "Giỗ Hai Bà Trưng",
    nhom: "anh-hung",
    lich: "am",
    ngayChinh: { am: { ngay: 6, thang: 2 } },
    namMat: 43,
    vanKhan: [],
    moTa: "Ngày giỗ Trưng Trắc, Trưng Nhị — hai nữ anh hùng lãnh đạo cuộc khởi nghĩa năm 40 chống ách đô hộ nhà Hán.",
    yNghia: [
      "Năm 40, Hai Bà Trưng phất cờ khởi nghĩa, giành lại độc lập và xưng vương, đóng đô ở Mê Linh. Đây là cuộc khởi nghĩa lớn đầu tiên trong lịch sử chống phong kiến phương Bắc.",
      "Hai Bà được nhân dân tôn thờ ở nhiều nơi, lễ giỗ tổ chức hằng năm vào ngày 6 tháng Hai âm lịch.",
    ],
    thongTin: [
      { label: "Tên", value: "Trưng Trắc, Trưng Nhị" },
      { label: "Sự kiện", value: "Khởi nghĩa Hai Bà Trưng (năm 40)" },
      { label: "Ngày giỗ", value: "6/2 âm lịch" },
      { label: "Nơi thờ", value: "Đền Hạ Lôi (Mê Linh, Hà Nội), đền Đồng Nhân (Hà Nội)" },
    ],
  },
  {
    slug: "gio-ba-trieu",
    ten: "Bà Triệu",
    tieuDe: "Giỗ Bà Triệu",
    nhom: "anh-hung",
    lich: "am",
    ngayChinh: { am: { ngay: 22, thang: 2 } },
    namMat: 248,
    vanKhan: [],
    moTa: "Ngày giỗ nữ anh hùng Triệu Thị Trinh, người lãnh đạo khởi nghĩa chống quân Đông Ngô năm 248.",
    yNghia: [
      "Bà Triệu lãnh đạo nghĩa quân chống quân Đông Ngô. Do lực lượng chênh lệch, Bà hy sinh tại núi Tùng ngày 22 tháng Hai năm Mậu Thìn (248).",
      "Lễ hội đền Bà Triệu ở Thanh Hóa diễn ra quanh ngày giỗ, chính hội đúng ngày 22 tháng Hai âm lịch.",
    ],
    thongTin: [
      { label: "Tên", value: "Triệu Thị Trinh" },
      { label: "Năm mất", value: "248" },
      { label: "Ngày giỗ", value: "22/2 âm lịch" },
      { label: "Nơi thờ", value: "Đền Bà Triệu, xã Triệu Lộc, tỉnh Thanh Hóa" },
    ],
  },
  {
    slug: "gio-ngo-quyen",
    ten: "Ngô Quyền",
    tieuDe: "Giỗ vua Ngô Quyền",
    nhom: "anh-hung",
    lich: "am",
    ngayChinh: { am: { ngay: 14, thang: 8 } },
    namMat: 944,
    vanKhan: [],
    moTa: "Ngày giỗ vua Ngô Quyền, người đánh tan quân Nam Hán trên sông Bạch Đằng năm 938.",
    yNghia: [
      "Năm 938, Ngô Quyền dùng trận địa cọc trên sông Bạch Đằng đánh tan quân Nam Hán, mở ra thời kỳ độc lập lâu dài cho đất nước. Ông lên ngôi vua năm 939.",
      "Hằng năm vào ngày 14 tháng Tám âm lịch, chính quyền và nhân dân Đường Lâm tổ chức lễ giỗ tại đền và lăng Ngô Quyền.",
    ],
    thongTin: [
      { label: "Quê", value: "Đường Lâm (Sơn Tây, Hà Nội)" },
      { label: "Chiến công", value: "Chiến thắng Bạch Đằng (938)" },
      { label: "Ngày giỗ", value: "14/8 âm lịch" },
      { label: "Nơi thờ", value: "Đền và lăng Ngô Quyền, thôn Cam Lâm, Đường Lâm" },
    ],
  },
  {
    slug: "gio-phung-hung",
    ten: "Phùng Hưng",
    tieuDe: "Lễ tưởng niệm Bố Cái Đại Vương Phùng Hưng",
    nhom: "anh-hung",
    lich: "am",
    ngayChinh: { am: { ngay: 8, thang: 1 } },
    vanKhan: [],
    moTa: "Ngày lễ tưởng niệm Bố Cái Đại Vương Phùng Hưng tại quê hương Đường Lâm.",
    yNghia: [
      "Phùng Hưng là người lãnh đạo cuộc khởi nghĩa chống ách đô hộ nhà Đường ở thế kỷ 8, được nhân dân tôn là Bố Cái Đại Vương.",
      "Hằng năm vào mùng 8 tháng Giêng âm lịch, nhân dân Đường Lâm tổ chức lễ tưởng niệm tại đền thờ Phùng Hưng.",
    ],
    thongTin: [
      { label: "Tôn xưng", value: "Bố Cái Đại Vương" },
      { label: "Quê", value: "Đường Lâm (Sơn Tây, Hà Nội)" },
      { label: "Ngày lễ", value: "8/1 âm lịch" },
      { label: "Nơi thờ", value: "Đền thờ Phùng Hưng, Đường Lâm" },
    ],
  },
  {
    slug: "le-hoi-hoa-lu",
    ten: "Vua Đinh Tiên Hoàng",
    tieuDe: "Lễ hội Hoa Lư (vua Đinh Tiên Hoàng)",
    nhom: "anh-hung",
    lich: "am",
    ngayChinh: { am: { ngay: 10, thang: 3 } },
    vanKhan: [],
    moTa: "Ngày chính lễ của Lễ hội Hoa Lư, tôn vinh vua Đinh Tiên Hoàng — người lập ra nhà nước Đại Cồ Việt.",
    yNghia: [
      "Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, lên ngôi Hoàng đế năm 968, đặt quốc hiệu Đại Cồ Việt và đóng đô ở Hoa Lư. Tương truyền ngày 10 tháng Ba là ngày vua lên ngôi.",
      "Lễ hội Hoa Lư ở Ninh Bình kéo dài nhiều ngày đầu tháng Ba âm lịch, ngày 10 là ngày chính lễ, tưởng niệm vua Đinh Tiên Hoàng và vua Lê Đại Hành.",
    ],
    thongTin: [
      { label: "Tên", value: "Đinh Bộ Lĩnh" },
      { label: "Sự kiện", value: "Lên ngôi Hoàng đế, lập nước Đại Cồ Việt (968)" },
      { label: "Ngày chính lễ", value: "10/3 âm lịch" },
      { label: "Nơi thờ", value: "Đền vua Đinh Tiên Hoàng, Cố đô Hoa Lư, Ninh Bình" },
      { label: "Lưu ý", value: "Trùng ngày Giỗ Tổ Hùng Vương" },
    ],
  },
  {
    slug: "gio-le-dai-hanh",
    ten: "Vua Lê Đại Hành",
    tieuDe: "Giỗ vua Lê Đại Hành",
    nhom: "anh-hung",
    lich: "am",
    ngayChinh: { am: { ngay: 8, thang: 3 } },
    namMat: 1005,
    vanKhan: [],
    moTa: "Ngày giỗ vua Lê Đại Hành (Lê Hoàn), người đánh thắng quân Tống năm 981.",
    yNghia: [
      "Lê Hoàn lên ngôi năm 980, lập ra nhà Tiền Lê và lãnh đạo quân dân đánh thắng quân Tống xâm lược năm 981.",
      "Ngày 8 tháng Ba âm lịch là ngày mất của vua, nằm trong dịp Lễ hội Hoa Lư ở Ninh Bình.",
    ],
    thongTin: [
      { label: "Tên", value: "Lê Hoàn" },
      { label: "Chiến công", value: "Đánh thắng quân Tống (981)" },
      { label: "Ngày giỗ", value: "8/3 âm lịch" },
      { label: "Nơi thờ", value: "Đền vua Lê Đại Hành, Cố đô Hoa Lư, Ninh Bình" },
    ],
  },
  {
    slug: "gio-quang-trung",
    ten: "Hoàng đế Quang Trung",
    tieuDe: "Giỗ vua Quang Trung",
    nhom: "anh-hung",
    lich: "am",
    ngayChinh: { am: { ngay: 29, thang: 7 } },
    ngayPhu: "Mùng 5 Tết — lễ kỷ niệm chiến thắng Ngọc Hồi – Đống Đa",
    namMat: 1792,
    vanKhan: [],
    moTa: "Ngày giỗ Hoàng đế Quang Trung – Nguyễn Huệ, người đại phá quân Thanh mùa xuân Kỷ Dậu 1789.",
    yNghia: [
      "Nguyễn Huệ cùng anh em nhà Tây Sơn khởi nghĩa năm 1771, lên ngôi Hoàng đế năm 1788 và đại phá quân Thanh ở Ngọc Hồi – Đống Đa dịp Tết Kỷ Dậu 1789.",
      "Vua mất ngày 29 tháng Bảy năm Nhâm Tý (1792) khi mới 39 tuổi. Lễ giỗ được tổ chức hằng năm tại quê hương Tây Sơn và đền thờ trên núi Dũng Quyết.",
    ],
    thongTin: [
      { label: "Tên", value: "Nguyễn Huệ" },
      { label: "Chiến công", value: "Đại phá quân Thanh (Tết Kỷ Dậu 1789)" },
      { label: "Ngày giỗ", value: "29/7 âm lịch" },
      { label: "Nơi thờ", value: "Bảo tàng Quang Trung (Tây Sơn), đền thờ trên núi Dũng Quyết (Vinh)" },
    ],
  },
  {
    slug: "gio-nguyen-trai",
    ten: "Nguyễn Trãi",
    tieuDe: "Giỗ Nguyễn Trãi",
    nhom: "anh-hung",
    lich: "am",
    ngayChinh: { am: { ngay: 16, thang: 8 } },
    namMat: 1442,
    vanKhan: [],
    moTa: "Ngày giỗ Nguyễn Trãi — nhà chính trị, quân sự, văn hóa lớn, tác giả Bình Ngô đại cáo.",
    yNghia: [
      "Nguyễn Trãi là mưu sĩ hàng đầu của khởi nghĩa Lam Sơn, người soạn Bình Ngô đại cáo sau khi đánh đuổi quân Minh.",
      "Lễ dâng hương tưởng niệm được tổ chức vào ngày 16 tháng Tám âm lịch tại Côn Sơn, trong dịp Lễ hội mùa thu Côn Sơn – Kiếp Bạc.",
    ],
    thongTin: [
      { label: "Hiệu", value: "Ức Trai" },
      { label: "Tác phẩm tiêu biểu", value: "Bình Ngô đại cáo" },
      { label: "Ngày giỗ", value: "16/8 âm lịch" },
      { label: "Nơi thờ", value: "Đền thờ Nguyễn Trãi, Khu di tích Côn Sơn" },
    ],
  },
  {
    slug: "gio-duc-thanh-tran",
    ten: "Trần Hưng Đạo",
    tieuDe: "Giỗ Đức Thánh Trần",
    nhom: "anh-hung",
    lich: "am",
    ngayChinh: { am: { ngay: 20, thang: 8 } },
    namMat: 1300,
    vanKhan: ["den-tran"],
    moTa: "Ngày giỗ Hưng Đạo Đại Vương Trần Quốc Tuấn, người lãnh đạo quân dân nhà Trần đánh thắng quân Nguyên Mông.",
    yNghia: [
      "Vị tướng tổng chỉ huy quân đội nhà Trần, lãnh đạo nhân dân đánh thắng quân Nguyên Mông ở thế kỷ 13. Nhân dân tôn xưng ông là Đức Thánh Trần và lập đền thờ ở nhiều nơi.",
      "Dân gian có câu \"Tháng Tám giỗ Cha, tháng Ba giỗ Mẹ\" — \"Cha\" ở đây là Đức Thánh Trần.",
    ],
    thongTin: [
      { label: "Tên thật", value: "Trần Quốc Tuấn" },
      { label: "Tôn xưng", value: "Đức Thánh Trần" },
      { label: "Ngày giỗ", value: "20/8 âm lịch" },
      { label: "Nơi thờ", value: "Đền Trần (Nam Định), đền Kiếp Bạc" },
    ],
  },
  {
    slug: "gio-le-lai",
    ten: "Trung Túc Vương Lê Lai",
    tieuDe: "Giỗ Lê Lai",
    nhom: "anh-hung",
    lich: "am",
    ngayChinh: { am: { ngay: 21, thang: 8 } },
    vanKhan: [],
    moTa: "Ngày giỗ Trung Túc Vương Lê Lai, người liều mình cứu chúa trong khởi nghĩa Lam Sơn.",
    yNghia: [
      "Lê Lai mặc áo bào giả làm Lê Lợi, xông vào vòng vây quân Minh để chủ tướng thoát nạn. Nhớ công ơn ấy, vua Lê Thái Tổ dặn con cháu làm giỗ Lê Lai trước giỗ vua một ngày.",
      "Từ đó dân gian có câu \"Hai mốt Lê Lai, hai hai Lê Lợi\".",
    ],
    thongTin: [
      { label: "Tước hiệu", value: "Trung Túc Vương" },
      { label: "Sự kiện", value: "Liều mình cứu Lê Lợi" },
      { label: "Ngày giỗ", value: "21/8 âm lịch" },
      { label: "Nơi thờ", value: "Đền thờ Lê Lai, làng Tép, xã Kiên Thọ (Thanh Hóa)" },
    ],
  },
  {
    slug: "gio-le-loi",
    ten: "Vua Lê Thái Tổ (Lê Lợi)",
    tieuDe: "Giỗ vua Lê Thái Tổ",
    nhom: "anh-hung",
    lich: "am",
    ngayChinh: { am: { ngay: 22, thang: 8 } },
    namMat: 1433,
    vanKhan: [],
    moTa: "Ngày giỗ vua Lê Thái Tổ – Lê Lợi, người lãnh đạo khởi nghĩa Lam Sơn và lập ra nhà Hậu Lê.",
    yNghia: [
      "Lê Lợi lãnh đạo khởi nghĩa Lam Sơn đánh đuổi quân Minh, lên ngôi Hoàng đế năm 1428, khôi phục quốc hiệu Đại Việt.",
      "Vua mất ngày 22 tháng Tám năm Quý Sửu (1433). Lễ hội Lam Kinh ở Thanh Hóa có ngày chính lễ đúng ngày này.",
    ],
    thongTin: [
      { label: "Tên", value: "Lê Lợi" },
      { label: "Sự kiện", value: "Khởi nghĩa Lam Sơn, lên ngôi năm 1428" },
      { label: "Ngày giỗ", value: "22/8 âm lịch" },
      { label: "Nơi thờ", value: "Khu di tích Lam Kinh, Thanh Hóa" },
    ],
  },
  {
    slug: "gio-nguyen-trung-truc",
    ten: "Nguyễn Trung Trực",
    tieuDe: "Giỗ anh hùng Nguyễn Trung Trực",
    nhom: "anh-hung",
    lich: "am",
    ngayChinh: { am: { ngay: 27, thang: 8 } },
    namMat: 1868,
    vanKhan: [],
    moTa: "Ngày giỗ anh hùng Nguyễn Trung Trực, thủ lĩnh nghĩa quân chống Pháp ở Nam Bộ.",
    yNghia: [
      "Nguyễn Trung Trực chỉ huy trận đốt tàu Pháp trên sông Nhật Tảo và trận đánh đồn Rạch Giá. Ông bị thực dân Pháp hành hình năm 1868, để lại câu nói \"Bao giờ người Tây nhổ hết cỏ nước Nam, thì mới hết người Nam đánh Tây\".",
      "Lễ hội tưởng niệm diễn ra từ ngày 26 đến 28 tháng Tám âm lịch tại Rạch Giá, người dân quen gọi là lễ giỗ Cụ Nguyễn.",
    ],
    thongTin: [
      { label: "Tên khác", value: "Nguyễn Văn Lịch" },
      { label: "Chiến công", value: "Đốt tàu Pháp ở Nhật Tảo, đánh đồn Rạch Giá" },
      { label: "Ngày giỗ", value: "27/8 âm lịch (lễ hội 26–28/8)" },
      { label: "Nơi thờ", value: "Đình thần Nguyễn Trung Trực, Rạch Giá" },
    ],
  },
  {
    slug: "gio-tran-nhan-tong",
    ten: "Phật hoàng Trần Nhân Tông",
    tieuDe: "Ngày tưởng niệm Phật hoàng Trần Nhân Tông",
    nhom: "anh-hung",
    lich: "am",
    ngayChinh: { am: { ngay: 1, thang: 11 } },
    namMat: 1308,
    vanKhan: ["di-chua"],
    moTa: "Ngày Phật hoàng Trần Nhân Tông nhập Niết bàn — vị vua hai lần đánh thắng quân Nguyên Mông, sáng lập Thiền phái Trúc Lâm.",
    yNghia: [
      "Vua Trần Nhân Tông lãnh đạo quân dân nhà Trần đánh thắng quân Nguyên Mông năm 1285 và 1288. Sau khi nhường ngôi, ngài lên Yên Tử tu hành và sáng lập Thiền phái Trúc Lâm.",
      "Ngài viên tịch tại am Ngọa Vân ngày mùng 1 tháng 11 năm Mậu Thân (1308). Hằng năm vào ngày này, Giáo hội Phật giáo tổ chức đại lễ tưởng niệm tại Yên Tử.",
    ],
    thongTin: [
      { label: "Tên", value: "Trần Khâm" },
      { label: "Sự nghiệp", value: "Hai lần đánh thắng quân Nguyên Mông, sáng lập Thiền phái Trúc Lâm" },
      { label: "Ngày tưởng niệm", value: "1/11 âm lịch" },
      { label: "Nơi thờ", value: "Yên Tử, am Ngọa Vân (Quảng Ninh)" },
    ],
  },
  {
    slug: "ngay-sinh-bac-ho",
    ten: "Chủ tịch Hồ Chí Minh",
    tieuDe: "Ngày sinh Chủ tịch Hồ Chí Minh",
    nhom: "anh-hung",
    lich: "duong",
    ngayChinh: { duong: { ngay: 19, thang: 5 } },
    ngayPhu: "Ngày mất 2/9/1969 — trùng ngày Quốc khánh",
    namSinh: 1890,
    vanKhan: [],
    coAnhThat: true,
    moTa: "Kỷ niệm ngày sinh Chủ tịch Hồ Chí Minh (19/5/1890), người sáng lập nước Việt Nam Dân chủ Cộng hòa.",
    yNghia: [
      "Chủ tịch Hồ Chí Minh sinh ngày 19/5/1890 tại Nghệ An. Ngày 2/9/1945, Người đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa.",
      "Người mất ngày 2/9/1969, đúng ngày Quốc khánh. Ngày 19/5 hằng năm là dịp cả nước tưởng nhớ Người.",
    ],
    thongTin: [
      { label: "Tên khai sinh", value: "Nguyễn Sinh Cung" },
      { label: "Ngày sinh", value: "19/5/1890" },
      { label: "Ngày mất", value: "2/9/1969" },
      { label: "Nơi tưởng niệm", value: "Lăng Chủ tịch Hồ Chí Minh (Hà Nội), Khu di tích Kim Liên (Nghệ An)" },
    ],
  },
  {
    slug: "ngay-sinh-dai-tuong-vo-nguyen-giap",
    ten: "Đại tướng Võ Nguyên Giáp",
    tieuDe: "Ngày sinh Đại tướng Võ Nguyên Giáp",
    nhom: "anh-hung",
    lich: "duong",
    ngayChinh: { duong: { ngay: 25, thang: 8 } },
    ngayPhu: "Ngày mất 4/10/2013",
    namSinh: 1911,
    vanKhan: [],
    moTa: "Kỷ niệm ngày sinh Đại tướng Võ Nguyên Giáp (25/8/1911), vị tướng chỉ huy chiến dịch Điện Biên Phủ.",
    yNghia: [
      "Đại tướng Võ Nguyên Giáp là Tổng Tư lệnh Quân đội nhân dân Việt Nam, người chỉ huy chiến dịch Điện Biên Phủ năm 1954.",
      "Đại tướng mất ngày 4/10/2013 và được an táng tại Vũng Chùa – Đảo Yến.",
    ],
    thongTin: [
      { label: "Quê", value: "Quảng Bình" },
      { label: "Chiến công", value: "Chỉ huy chiến dịch Điện Biên Phủ (1954)" },
      { label: "Ngày sinh", value: "25/8/1911" },
      { label: "Ngày mất", value: "4/10/2013" },
      { label: "Nơi an nghỉ", value: "Vũng Chùa – Đảo Yến" },
    ],
  },
  {
    slug: "gio-vo-thi-sau",
    ten: "Anh hùng Võ Thị Sáu",
    tieuDe: "Giỗ anh hùng Võ Thị Sáu",
    nhom: "anh-hung",
    lich: "duong",
    ngayChinh: { duong: { ngay: 23, thang: 1 } },
    namMat: 1952,
    vanKhan: [],
    moTa: "Ngày giỗ nữ Anh hùng Lực lượng vũ trang nhân dân Võ Thị Sáu, hy sinh tại Côn Đảo ngày 23/1/1952.",
    yNghia: [
      "Võ Thị Sáu tham gia đội công an xung phong Đất Đỏ từ khi còn rất trẻ. Chị bị thực dân Pháp bắt, kết án tử hình và đưa ra Côn Đảo.",
      "Rạng sáng 23/1/1952, chị hy sinh khi chưa tròn 20 tuổi. Hằng năm, Côn Đảo tổ chức lễ giỗ chị tại Nghĩa trang Hàng Dương và Đền thờ Côn Đảo.",
    ],
    thongTin: [
      { label: "Quê", value: "Đất Đỏ (Bà Rịa – Vũng Tàu cũ)" },
      { label: "Danh hiệu", value: "Anh hùng Lực lượng vũ trang nhân dân" },
      { label: "Ngày giỗ", value: "23/1 dương lịch" },
      { label: "Nơi an nghỉ", value: "Nghĩa trang Hàng Dương, Côn Đảo" },
    ],
  },
];

// ---------- đợt 2: Lễ âm lịch (16 trang) ----------
const DOT_2: LePage[] = [
  {
    slug: "tet-nguyen-dan",
    ten: "Tết Nguyên đán",
    tieuDe: "Tết Nguyên đán",
    nhom: "am-lich",
    lich: "am",
    ngayChinh: { am: { ngay: 1, thang: 1 } },
    nghiLe: { soNgay: 5 },
    vanKhan: ["mung-mot-tet", "giao-thua-trong-nha", "hoa-vang"],
    moTa: "Mùng 1 tháng Giêng âm lịch — ngày đầu năm mới, dịp lễ lớn nhất trong năm của người Việt.",
    yNghia: [
      "Tết Nguyên đán mở đầu một năm mới theo âm lịch. Đây là dịp gia đình sum họp, tưởng nhớ tổ tiên và chúc nhau năm mới bình an, may mắn.",
    ],
    bullets: [
      "Cúng giao thừa, cúng gia tiên ba ngày Tết",
      "Xông đất, chúc Tết, mừng tuổi",
      "Đi lễ chùa đầu năm, hái lộc",
      "Kiêng quét nhà, kiêng cãi vã trong ngày đầu năm",
    ],
  },
  {
    slug: "via-than-tai",
    ten: "Ngày vía Thần Tài",
    tieuDe: "Ngày vía Thần Tài",
    nhom: "am-lich",
    lich: "am",
    ngayChinh: { am: { ngay: 10, thang: 1 } },
    vanKhan: ["via-than-tai", "than-tai-tho-dia"],
    moTa: "Mùng 10 tháng Giêng âm lịch — ngày cúng Thần Tài của người buôn bán, cầu một năm làm ăn thuận lợi.",
    yNghia: ["Người kinh doanh coi mùng 10 tháng Giêng là ngày vía Thần Tài, làm lễ cầu tài lộc cho cả năm."],
    bullets: ["Lau dọn ban Thần Tài, thay nước, thay hoa", "Cúng lễ tại nhà hoặc cửa hàng", "Nhiều người mua vàng lấy may"],
  },
  {
    slug: "ram-thang-gieng",
    ten: "Rằm tháng Giêng",
    tieuDe: "Rằm tháng Giêng",
    nhom: "am-lich",
    lich: "am",
    ngayChinh: { am: { ngay: 15, thang: 1 } },
    vanKhan: ["ram-thang-gieng", "cau-an-dau-nam"],
    moTa: "Tết Nguyên tiêu, còn gọi là Tết Thượng nguyên — ngày rằm lớn đầu tiên của năm âm lịch.",
    yNghia: [
      "Rằm tháng Giêng là ngày trăng tròn đầu tiên của năm mới. Dân gian có câu \"lễ Phật quanh năm không bằng rằm tháng Giêng\", nên đây là một trong những ngày rằm được coi trọng nhất.",
      "Ngày này gia đình thường sum họp, cúng gia tiên và cầu mong một năm bình an, làm ăn thuận lợi.",
    ],
    bullets: [
      "Cúng thần linh và gia tiên tại nhà, mâm chay hoặc mặn tùy nhà",
      "Đi lễ chùa cầu an đầu năm",
      "Thả đèn hoa đăng ở một số địa phương",
      "Ngày thơ Việt Nam được tổ chức vào dịp này",
    ],
  },
  {
    slug: "via-quan-am",
    ten: "Vía Quan Thế Âm Bồ Tát",
    tieuDe: "Ngày vía Quan Âm",
    nhom: "am-lich",
    lich: "am",
    ngayChinh: { am: { ngay: 19, thang: 2 } },
    vanKhan: ["quan-the-am", "di-chua"],
    moTa: "Ngày 19 tháng Hai âm lịch — ngày vía Quan Thế Âm Bồ Tát theo truyền thống Phật giáo.",
    yNghia: [
      "Trong Phật giáo Bắc tông, 19 tháng Hai là ngày kỷ niệm đản sinh của Quan Thế Âm Bồ Tát, vị Bồ Tát tượng trưng cho lòng từ bi. Nhiều người đi chùa, ăn chay trong ngày này.",
    ],
    bullets: ["Đi chùa lễ Phật, lễ Quan Âm", "Ăn chay, phóng sinh", "Dâng hoa, quả, không dâng đồ mặn lên ban Phật"],
  },
  {
    slug: "tet-han-thuc",
    ten: "Tết Hàn thực",
    tieuDe: "Tết Hàn thực",
    nhom: "am-lich",
    lich: "am",
    ngayChinh: { am: { ngay: 3, thang: 3 } },
    vanKhan: ["tet-han-thuc"],
    moTa: "Mùng 3 tháng Ba âm lịch — ngày làm bánh trôi, bánh chay dâng tổ tiên.",
    yNghia: ["Tết Hàn thực có nghĩa là \"ăn đồ nguội\". Ở Việt Nam, ngày này gắn với tục làm bánh trôi, bánh chay dâng lên tổ tiên."],
    bullets: ["Nặn bánh trôi, bánh chay", "Dâng bánh lên ban thờ gia tiên", "Nhiều nhà ăn đồ nguội, hạn chế đun nấu"],
  },
  {
    slug: "gio-to-hung-vuong",
    ten: "Giỗ Tổ Hùng Vương",
    tieuDe: "Giỗ Tổ Hùng Vương",
    nhom: "am-lich",
    lich: "am",
    ngayChinh: { am: { ngay: 10, thang: 3 } },
    nghiLe: { soNgay: 1 },
    vanKhan: ["gio-to-hung-vuong"],
    moTa: "Mùng 10 tháng Ba âm lịch — ngày tưởng nhớ các Vua Hùng, người có công dựng nước.",
    yNghia: [
      "\"Dù ai đi ngược về xuôi, nhớ ngày giỗ Tổ mùng mười tháng Ba.\" Đây là ngày cả nước hướng về đất Tổ, tưởng nhớ công lao dựng nước của các Vua Hùng.",
      "Tín ngưỡng thờ cúng Hùng Vương ở Phú Thọ đã được UNESCO ghi danh là di sản văn hóa phi vật thể đại diện của nhân loại.",
    ],
    bullets: ["Lễ dâng hương tại Đền Hùng (Phú Thọ)", "Dâng bánh chưng, bánh giầy", "Lễ tại gia hướng về đất Tổ"],
  },
  {
    slug: "phat-dan",
    ten: "Lễ Phật đản",
    tieuDe: "Lễ Phật đản",
    nhom: "am-lich",
    lich: "am",
    ngayChinh: { am: { ngay: 15, thang: 4 } },
    vanKhan: ["di-chua"],
    moTa: "Rằm tháng Tư âm lịch — ngày kỷ niệm Đức Phật đản sinh theo lịch của Giáo hội Phật giáo Việt Nam.",
    yNghia: [
      "Phật đản là ngày lễ lớn của Phật giáo, kỷ niệm ngày Đức Phật Thích Ca đản sinh. Giáo hội Phật giáo Việt Nam tổ chức đại lễ vào rằm tháng Tư âm lịch.",
    ],
    bullets: ["Lễ tắm Phật tại chùa", "Treo cờ Phật giáo, thả đèn hoa đăng", "Ăn chay, làm việc thiện"],
  },
  {
    slug: "tet-doan-ngo",
    ten: "Tết Đoan ngọ",
    tieuDe: "Tết Đoan ngọ",
    nhom: "am-lich",
    lich: "am",
    ngayChinh: { am: { ngay: 5, thang: 5 } },
    vanKhan: ["tet-doan-ngo"],
    moTa: "Mùng 5 tháng Năm âm lịch — Tết diệt sâu bọ, dịp giữa năm để cầu sức khỏe.",
    yNghia: [
      "Tết Đoan ngọ rơi vào thời điểm nắng nóng, dễ sinh bệnh. Dân gian làm lễ vào buổi sáng để cầu cho người khỏe, mùa màng không sâu bệnh.",
    ],
    bullets: ["Ăn cơm rượu nếp, hoa quả chua vào buổi sáng", "Hái lá thuốc giờ Ngọ", "Cúng gia tiên"],
  },
  {
    slug: "vu-lan",
    ten: "Lễ Vu Lan (Rằm tháng Bảy)",
    tieuDe: "Lễ Vu Lan",
    nhom: "am-lich",
    lich: "am",
    ngayChinh: { am: { ngay: 15, thang: 7 } },
    vanKhan: ["ram-thang-bay", "cung-co-hon"],
    moTa: "Rằm tháng Bảy âm lịch — lễ Vu Lan báo hiếu cha mẹ, cũng là ngày xá tội vong nhân.",
    yNghia: [
      "Lễ Vu Lan bắt nguồn từ tích Mục Kiền Liên cứu mẹ, là dịp con cháu tỏ lòng biết ơn cha mẹ, ông bà. Dân gian cũng gọi rằm tháng Bảy là ngày xá tội vong nhân.",
    ],
    bullets: ["Cúng gia tiên, cúng chúng sinh (cô hồn)", "Đi chùa dự lễ Vu Lan, cài bông hồng lên áo", "Phóng sinh, làm việc thiện"],
  },
  {
    slug: "tet-trung-thu",
    ten: "Tết Trung thu",
    tieuDe: "Tết Trung thu",
    nhom: "am-lich",
    lich: "am",
    ngayChinh: { am: { ngay: 15, thang: 8 } },
    vanKhan: ["ram-thang-tam"],
    moTa: "Rằm tháng Tám âm lịch — Tết của trẻ em, dịp trăng tròn và sáng nhất năm.",
    yNghia: ["Tết Trung thu là dịp gia đình quây quần ngắm trăng, và là ngày hội của trẻ em với đèn lồng, mâm cỗ."],
    bullets: ["Bày mâm cỗ, phá cỗ trông trăng", "Rước đèn ông sao, múa lân", "Biếu bánh Trung thu"],
  },
  {
    slug: "tet-trung-cuu",
    ten: "Tết Trùng cửu",
    tieuDe: "Tết Trùng cửu",
    nhom: "am-lich",
    lich: "am",
    ngayChinh: { am: { ngay: 9, thang: 9 } },
    vanKhan: ["mung-mot-ngay-ram"],
    moTa: "Mùng 9 tháng Chín âm lịch — ngày \"hai lần chín\", dịp cầu sức khỏe, sống lâu.",
    yNghia: [
      "Tết Trùng cửu (Trùng dương) có nguồn gốc từ Trung Hoa. Ở Việt Nam, một số gia đình và vùng quê vẫn làm lễ nhỏ, cầu sức khỏe cho người già.",
    ],
    bullets: ["Cúng gia tiên", "Ngắm hoa cúc, uống rượu cúc ở một số nơi", "Leo núi, đi chơi xa"],
  },
  {
    slug: "tet-ha-nguyen",
    ten: "Tết Hạ nguyên (Rằm tháng Mười)",
    tieuDe: "Rằm tháng Mười",
    nhom: "am-lich",
    lich: "am",
    ngayChinh: { am: { ngay: 15, thang: 10 } },
    vanKhan: ["ram-thang-muoi"],
    moTa: "Rằm tháng Mười âm lịch — Tết Hạ nguyên, còn gọi là Tết cơm mới sau mùa gặt.",
    yNghia: [
      "Rằm tháng Mười rơi vào lúc vừa thu hoạch lúa mùa. Người nông dân dâng cơm gạo mới lên tổ tiên để tạ ơn sau một mùa làm lụng.",
    ],
    bullets: ["Nấu xôi, cơm bằng gạo mới", "Cúng gia tiên và thần linh", "Nhiều chùa làm lễ vào ngày này"],
  },
  {
    slug: "ram-thang-chap",
    ten: "Rằm tháng Chạp",
    tieuDe: "Rằm tháng Chạp",
    nhom: "am-lich",
    lich: "am",
    ngayChinh: { am: { ngay: 15, thang: 12 } },
    vanKhan: ["cung-ram-thang-chap"],
    moTa: "Rằm tháng Chạp — ngày rằm cuối cùng của năm âm lịch.",
    yNghia: ["Rằm tháng Chạp là dịp tạ ơn thần linh, tổ tiên đã phù hộ cả năm, trước khi bước vào những ngày chuẩn bị Tết."],
    bullets: ["Cúng thần linh và gia tiên", "Dọn dẹp, lau ban thờ chuẩn bị Tết", "Đi chùa lễ rằm cuối năm"],
  },
  {
    slug: "ong-cong-ong-tao",
    ten: "Ông Công ông Táo",
    tieuDe: "Ông Công ông Táo",
    nhom: "am-lich",
    lich: "am",
    ngayChinh: { am: { ngay: 23, thang: 12 } },
    vanKhan: ["ong-cong-ong-tao"],
    moTa: "Ngày 23 tháng Chạp âm lịch — ngày tiễn ông Công ông Táo về trời.",
    yNghia: [
      "Theo tín ngưỡng dân gian, ngày 23 tháng Chạp Táo quân về trời báo cáo việc trong nhà suốt một năm. Đây cũng là mốc bắt đầu những ngày Tết.",
    ],
    bullets: ["Cúng ông Công ông Táo trước giờ Ngọ", "Thả cá chép", "Dọn dẹp bếp, nhà cửa"],
  },
  {
    slug: "giao-thua",
    ten: "Giao thừa",
    tieuDe: "Giao thừa",
    nhom: "am-lich",
    lich: "am-cuoi-thang",
    ngayChinh: { amCuoiThang: { thang: 12 } },
    vanKhan: ["giao-thua-trong-nha", "giao-thua-ngoai-troi", "tat-nien"],
    moTa: "Đêm cuối cùng của năm âm lịch — thời khắc chuyển giao sang năm mới.",
    yNghia: [
      "Giao thừa là thời khắc năm cũ qua, năm mới đến. Theo tín ngưỡng, đây là lúc quan Hành khiển năm cũ bàn giao cho quan năm mới, nên nhà nhà làm lễ cúng.",
      "Tháng Chạp có năm đủ 30 ngày, có năm thiếu chỉ 29 ngày, nên đêm giao thừa không cố định là \"30 Tết\".",
    ],
    bullets: ["Cúng giao thừa ngoài trời và trong nhà", "Xem pháo hoa, chúc mừng năm mới", "Hái lộc đầu năm"],
  },
  {
    slug: "tet-thanh-minh",
    ten: "Tết Thanh minh",
    tieuDe: "Tết Thanh minh",
    nhom: "am-lich",
    lich: "tiet-khi",
    ngayChinh: { tietKhi: "Thanh minh" },
    vanKhan: ["thanh-minh-ta-mo"],
    moTa: "Ngày bắt đầu tiết Thanh minh (khoảng 4–5/4 dương lịch) — dịp tảo mộ, sửa sang mộ phần tổ tiên.",
    yNghia: [
      "Thanh minh là một trong 24 tiết khí, tính theo vị trí Mặt Trời nên luôn rơi vào khoảng đầu tháng Tư dương lịch. \"Thanh minh trong tiết tháng Ba\" là dịp con cháu đi tảo mộ.",
    ],
    bullets: [
      "Tảo mộ, dọn cỏ, sửa sang mộ phần",
      "Thắp hương, cúng tổ tiên tại mộ",
      "Việc tảo mộ có thể làm trong cả tiết Thanh minh (khoảng 15 ngày)",
    ],
  },
];

// ---------- đợt 3: Lễ dương lịch (28 trang) ----------
const DOT_3: LePage[] = [
  {
    slug: "tet-duong-lich",
    ten: "Tết Dương lịch",
    tieuDe: "Tết Dương lịch",
    nhom: "nghi-le",
    lich: "duong",
    ngayChinh: { duong: { ngay: 1, thang: 1 } },
    nghiLe: { soNgay: 1 },
    vanKhan: [],
    moTa: "Ngày 1/1 — ngày đầu tiên của năm mới theo dương lịch.",
    yNghia: ["Tết Dương lịch đánh dấu năm mới theo lịch quốc tế. Người lao động được nghỉ 1 ngày theo Bộ luật Lao động."],
    bullets: ["Đón giao thừa, xem pháo hoa đêm 31/12", "Gửi lời chúc năm mới", "Đặt kế hoạch cho năm mới"],
  },
  {
    slug: "ngay-giai-phong-mien-nam",
    ten: "Ngày Giải phóng miền Nam, thống nhất đất nước",
    tieuDe: "Ngày 30/4",
    nhom: "nghi-le",
    lich: "duong",
    ngayChinh: { duong: { ngay: 30, thang: 4 } },
    namGoc: 1975,
    nghiLe: { soNgay: 1 },
    vanKhan: [],
    moTa: "Ngày 30/4/1975 — miền Nam hoàn toàn giải phóng, đất nước thống nhất.",
    yNghia: ["Trưa 30/4/1975, chiến dịch Hồ Chí Minh toàn thắng, kết thúc cuộc kháng chiến chống Mỹ, non sông thu về một mối."],
    bullets: ["Treo cờ Tổ quốc", "Lễ kỷ niệm, diễu binh vào các năm chẵn", "Nghỉ lễ liền với ngày 1/5"],
  },
  {
    slug: "quoc-te-lao-dong",
    ten: "Ngày Quốc tế Lao động",
    tieuDe: "Ngày Quốc tế Lao động 1/5",
    nhom: "nghi-le",
    lich: "duong",
    ngayChinh: { duong: { ngay: 1, thang: 5 } },
    nghiLe: { soNgay: 1 },
    vanKhan: [],
    moTa: "Ngày 1/5 — ngày tôn vinh người lao động trên toàn thế giới.",
    yNghia: ["Ngày Quốc tế Lao động gắn với phong trào đấu tranh đòi ngày làm việc 8 giờ của công nhân vào cuối thế kỷ 19."],
    bullets: ["Nghỉ lễ liền với ngày 30/4", "Hoạt động của công đoàn, tôn vinh người lao động", "Du lịch, về quê"],
  },
  {
    slug: "quoc-khanh",
    ten: "Quốc khánh nước Cộng hòa xã hội chủ nghĩa Việt Nam",
    tieuDe: "Quốc khánh 2/9",
    nhom: "nghi-le",
    lich: "duong",
    ngayChinh: { duong: { ngay: 2, thang: 9 } },
    namGoc: 1945,
    nghiLe: { soNgay: 2, ghiChu: "ngày 2/9 và 1 ngày liền kề" },
    vanKhan: [],
    moTa: "Ngày 2/9/1945 — Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập, khai sinh nước Việt Nam Dân chủ Cộng hòa.",
    yNghia: ["Tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập. Ngày 2/9 cũng là ngày Người mất năm 1969."],
    bullets: ["Treo cờ Tổ quốc", "Lễ chào cờ, lễ kỷ niệm, bắn pháo hoa", "Viếng Lăng Chủ tịch Hồ Chí Minh"],
    lienKet: [{ label: "Ngày sinh Chủ tịch Hồ Chí Minh", href: "/le/ngay-sinh-bac-ho/" }],
  },
  {
    slug: "ngay-van-hoa-viet-nam",
    ten: "Ngày Văn hóa Việt Nam",
    tieuDe: "Ngày Văn hóa Việt Nam 24/11",
    nhom: "nghi-le",
    lich: "duong",
    ngayChinh: { duong: { ngay: 24, thang: 11 } },
    namGoc: 1946,
    nghiLe: { soNgay: 1, ghiChu: "áp dụng từ năm 2026" },
    vanKhan: [],
    moTa: "Ngày 24/11 — Ngày Văn hóa Việt Nam, người lao động được nghỉ hưởng nguyên lương từ năm 2026.",
    yNghia: [
      "Ngày 24/11/1946, Chủ tịch Hồ Chí Minh phát biểu tại Hội nghị Văn hóa toàn quốc lần thứ nhất. Từ năm 2026, ngày 24/11 hằng năm là Ngày Văn hóa Việt Nam và là ngày nghỉ lễ mới.",
    ],
    bullets: ["Nghỉ lễ 1 ngày", "Các hoạt động văn hóa, nghệ thuật, tham quan di tích", "Lịch nghỉ cụ thể theo thông báo của Chính phủ từng năm"],
  },
  {
    slug: "ngay-hoc-sinh-sinh-vien",
    ten: "Ngày truyền thống học sinh, sinh viên Việt Nam",
    tieuDe: "Ngày học sinh, sinh viên 9/1",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 9, thang: 1 } },
    namGoc: 1950,
    vanKhan: [],
    moTa: "Ngày 9/1 — ngày truyền thống của học sinh, sinh viên Việt Nam.",
    yNghia: [
      "Ngày 9/1/1950, học sinh, sinh viên Sài Gòn xuống đường đấu tranh chống thực dân Pháp. Anh Trần Văn Ơn hy sinh trong cuộc đấu tranh này.",
    ],
    bullets: ["Các trường tổ chức hoạt động tuổi trẻ", "Tuyên dương học sinh, sinh viên tiêu biểu"],
  },
  {
    slug: "thanh-lap-dang",
    ten: "Ngày thành lập Đảng Cộng sản Việt Nam",
    tieuDe: "Ngày thành lập Đảng 3/2",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 3, thang: 2 } },
    namGoc: 1930,
    vanKhan: [],
    moTa: "Ngày 3/2/1930 — ngày thành lập Đảng Cộng sản Việt Nam.",
    yNghia: [
      "Đầu năm 1930, Hội nghị hợp nhất các tổ chức cộng sản do Nguyễn Ái Quốc chủ trì đã thành lập Đảng Cộng sản Việt Nam. Ngày 3/2 được chọn là ngày kỷ niệm thành lập Đảng.",
    ],
    bullets: ["Treo cờ, lễ kỷ niệm", "Các hoạt động văn hóa, văn nghệ mừng Đảng"],
  },
  {
    slug: "thay-thuoc-viet-nam",
    ten: "Ngày Thầy thuốc Việt Nam",
    tieuDe: "Ngày Thầy thuốc Việt Nam 27/2",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 27, thang: 2 } },
    namGoc: 1955,
    vanKhan: [],
    moTa: "Ngày 27/2 — ngày tôn vinh những người làm nghề y.",
    yNghia: [
      "Ngày 27/2/1955, Chủ tịch Hồ Chí Minh gửi thư cho Hội nghị cán bộ ngành y tế với lời dạy \"Lương y phải như từ mẫu\". Ngày này trở thành Ngày Thầy thuốc Việt Nam.",
    ],
    bullets: ["Tặng hoa, gửi lời cảm ơn bác sĩ, điều dưỡng", "Các bệnh viện tổ chức lễ kỷ niệm, khen thưởng"],
  },
  {
    slug: "quoc-te-phu-nu",
    ten: "Ngày Quốc tế Phụ nữ",
    tieuDe: "Ngày Quốc tế Phụ nữ 8/3",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 8, thang: 3 } },
    vanKhan: [],
    moTa: "Ngày 8/3 — ngày tôn vinh phụ nữ trên toàn thế giới.",
    yNghia: [
      "Ngày Quốc tế Phụ nữ gắn với phong trào đấu tranh vì quyền bình đẳng của phụ nữ đầu thế kỷ 20. Ở Việt Nam, đây là dịp tôn vinh mẹ, vợ, con gái và đồng nghiệp nữ.",
    ],
    bullets: ["Tặng hoa, quà cho phụ nữ", "Cơ quan, trường học tổ chức gặp mặt"],
  },
  {
    slug: "thanh-lap-doan",
    ten: "Ngày thành lập Đoàn Thanh niên Cộng sản Hồ Chí Minh",
    tieuDe: "Ngày thành lập Đoàn 26/3",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 26, thang: 3 } },
    namGoc: 1931,
    vanKhan: [],
    moTa: "Ngày 26/3/1931 — ngày thành lập Đoàn Thanh niên Cộng sản Hồ Chí Minh.",
    yNghia: ["Ngày 26/3 là ngày truyền thống của Đoàn Thanh niên, tổ chức chính trị – xã hội của thanh niên Việt Nam."],
    bullets: ["Hoạt động tình nguyện, thể thao của đoàn viên", "Kết nạp đoàn viên mới"],
  },
  {
    slug: "chien-thang-dien-bien-phu",
    ten: "Ngày Chiến thắng Điện Biên Phủ",
    tieuDe: "Ngày Chiến thắng Điện Biên Phủ 7/5",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 7, thang: 5 } },
    namGoc: 1954,
    vanKhan: [],
    moTa: "Ngày 7/5/1954 — chiến dịch Điện Biên Phủ toàn thắng.",
    yNghia: [
      "Chiến thắng Điện Biên Phủ \"lừng lẫy năm châu, chấn động địa cầu\" buộc thực dân Pháp ký Hiệp định Genève, kết thúc cuộc kháng chiến chống Pháp.",
    ],
    bullets: ["Lễ kỷ niệm tại Điện Biên và cả nước", "Thăm các di tích chiến trường"],
    lienKet: [{ label: "Ngày sinh Đại tướng Võ Nguyên Giáp", href: "/le/ngay-sinh-dai-tuong-vo-nguyen-giap/" }],
  },
  {
    slug: "quoc-te-thieu-nhi",
    ten: "Ngày Quốc tế Thiếu nhi",
    tieuDe: "Ngày Quốc tế Thiếu nhi 1/6",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 1, thang: 6 } },
    vanKhan: [],
    moTa: "Ngày 1/6 — ngày dành cho trẻ em.",
    yNghia: ["Ngày Quốc tế Thiếu nhi là dịp quan tâm, chăm lo quyền lợi và niềm vui của trẻ em."],
    bullets: ["Tặng quà, đưa trẻ đi chơi", "Các khu vui chơi, nhà văn hóa tổ chức chương trình cho thiếu nhi"],
  },
  {
    slug: "bao-chi-cach-mang",
    ten: "Ngày Báo chí Cách mạng Việt Nam",
    tieuDe: "Ngày Báo chí Cách mạng Việt Nam 21/6",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 21, thang: 6 } },
    namGoc: 1925,
    vanKhan: [],
    moTa: "Ngày 21/6 — ngày tôn vinh những người làm báo.",
    yNghia: ["Ngày 21/6/1925, Nguyễn Ái Quốc sáng lập báo Thanh Niên, mở đầu nền báo chí cách mạng Việt Nam."],
    bullets: ["Tặng hoa, chúc mừng người làm báo", "Trao giải báo chí"],
  },
  {
    slug: "gia-dinh-viet-nam",
    ten: "Ngày Gia đình Việt Nam",
    tieuDe: "Ngày Gia đình Việt Nam 28/6",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 28, thang: 6 } },
    namGoc: 2001,
    vanKhan: [],
    moTa: "Ngày 28/6 — ngày tôn vinh giá trị gia đình Việt Nam.",
    yNghia: [
      "Năm 2001, Thủ tướng Chính phủ quyết định lấy ngày 28/6 hằng năm là Ngày Gia đình Việt Nam, nhằm đề cao vai trò của gia đình trong đời sống.",
    ],
    bullets: ["Gia đình sum họp, ăn cơm chung", "Các địa phương tổ chức ngày hội gia đình"],
  },
  {
    slug: "thuong-binh-liet-si",
    ten: "Ngày Thương binh – Liệt sĩ",
    tieuDe: "Ngày Thương binh – Liệt sĩ 27/7",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 27, thang: 7 } },
    namGoc: 1947,
    vanKhan: [],
    moTa: "Ngày 27/7 — ngày tri ân thương binh, liệt sĩ và người có công.",
    yNghia: [
      "Từ năm 1947, ngày 27/7 được chọn là ngày tưởng nhớ, tri ân những người đã hy sinh, cống hiến cho độc lập dân tộc.",
    ],
    bullets: ["Thắp nến tri ân tại nghĩa trang liệt sĩ", "Thăm hỏi gia đình chính sách"],
  },
  {
    slug: "cach-mang-thang-tam",
    ten: "Ngày Cách mạng tháng Tám thành công",
    tieuDe: "Ngày Cách mạng tháng Tám 19/8",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 19, thang: 8 } },
    namGoc: 1945,
    vanKhan: [],
    moTa: "Ngày 19/8/1945 — nhân dân Hà Nội giành chính quyền, mở đầu thắng lợi của Cách mạng tháng Tám.",
    yNghia: [
      "Thắng lợi ở Hà Nội ngày 19/8/1945 tạo đà cho tổng khởi nghĩa trên cả nước, dẫn tới ngày 2/9 khai sinh nước Việt Nam Dân chủ Cộng hòa.",
    ],
    bullets: ["Lễ kỷ niệm, treo cờ", "Ngày truyền thống của lực lượng Công an nhân dân"],
    lienKet: [{ label: "Quốc khánh 2/9", href: "/le/quoc-khanh/" }],
  },
  {
    slug: "giai-phong-thu-do",
    ten: "Ngày Giải phóng Thủ đô",
    tieuDe: "Ngày Giải phóng Thủ đô 10/10",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 10, thang: 10 } },
    namGoc: 1954,
    vanKhan: [],
    moTa: "Ngày 10/10/1954 — bộ đội Việt Nam tiến vào tiếp quản Thủ đô Hà Nội.",
    yNghia: ["Sau Hiệp định Genève, ngày 10/10/1954 quân đội tiến về tiếp quản Hà Nội trong niềm vui của nhân dân Thủ đô."],
    bullets: ["Lễ kỷ niệm tại Hà Nội", "Các hoạt động văn hóa, triển lãm về Hà Nội"],
  },
  {
    slug: "doanh-nhan-viet-nam",
    ten: "Ngày Doanh nhân Việt Nam",
    tieuDe: "Ngày Doanh nhân Việt Nam 13/10",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 13, thang: 10 } },
    namGoc: 2004,
    vanKhan: [],
    moTa: "Ngày 13/10 — ngày tôn vinh đội ngũ doanh nhân Việt Nam.",
    yNghia: [
      "Ngày 13/10/1945, Chủ tịch Hồ Chí Minh gửi thư cho giới công thương. Năm 2004, Thủ tướng Chính phủ quyết định lấy ngày 13/10 hằng năm là Ngày Doanh nhân Việt Nam.",
    ],
    bullets: ["Tôn vinh doanh nhân, doanh nghiệp tiêu biểu", "Gửi lời chúc tới đối tác, khách hàng"],
  },
  {
    slug: "phu-nu-viet-nam",
    ten: "Ngày Phụ nữ Việt Nam",
    tieuDe: "Ngày Phụ nữ Việt Nam 20/10",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 20, thang: 10 } },
    namGoc: 1930,
    vanKhan: [],
    moTa: "Ngày 20/10 — ngày thành lập Hội Liên hiệp Phụ nữ Việt Nam, dịp tôn vinh phụ nữ Việt.",
    yNghia: [
      "Ngày 20/10/1930, Hội Phụ nữ phản đế Việt Nam — tiền thân của Hội Liên hiệp Phụ nữ Việt Nam — được thành lập.",
    ],
    bullets: ["Tặng hoa, quà cho phụ nữ", "Gặp mặt, tôn vinh phụ nữ tại cơ quan"],
  },
  {
    slug: "nha-giao-viet-nam",
    ten: "Ngày Nhà giáo Việt Nam",
    tieuDe: "Ngày Nhà giáo Việt Nam 20/11",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 20, thang: 11 } },
    namGoc: 1982,
    vanKhan: [],
    moTa: "Ngày 20/11 — ngày tri ân thầy cô giáo.",
    yNghia: ["Từ năm 1982, ngày 20/11 được chọn là Ngày Nhà giáo Việt Nam, thể hiện truyền thống \"tôn sư trọng đạo\"."],
    bullets: ["Học trò thăm thầy cô, tặng hoa", "Các trường tổ chức lễ kỷ niệm, văn nghệ"],
  },
  {
    slug: "quan-doi-nhan-dan",
    ten: "Ngày thành lập Quân đội nhân dân Việt Nam",
    tieuDe: "Ngày Quân đội nhân dân Việt Nam 22/12",
    nhom: "ky-niem",
    lich: "duong",
    ngayChinh: { duong: { ngay: 22, thang: 12 } },
    namGoc: 1944,
    vanKhan: [],
    moTa: "Ngày 22/12/1944 — thành lập Đội Việt Nam Tuyên truyền Giải phóng quân, tiền thân của Quân đội nhân dân Việt Nam.",
    yNghia: [
      "Đội Việt Nam Tuyên truyền Giải phóng quân do Võ Nguyên Giáp chỉ huy được thành lập ngày 22/12/1944. Ngày này cũng là Ngày hội Quốc phòng toàn dân.",
    ],
    bullets: ["Thăm hỏi, chúc mừng bộ đội, cựu chiến binh", "Lễ kỷ niệm tại các đơn vị"],
    lienKet: [{ label: "Ngày sinh Đại tướng Võ Nguyên Giáp", href: "/le/ngay-sinh-dai-tuong-vo-nguyen-giap/" }],
  },
  {
    slug: "valentine",
    ten: "Ngày Valentine",
    tieuDe: "Ngày Valentine 14/2",
    nhom: "quoc-te",
    lich: "duong",
    ngayChinh: { duong: { ngay: 14, thang: 2 } },
    vanKhan: [],
    moTa: "Ngày 14/2 — ngày lễ tình nhân.",
    yNghia: ["Valentine là ngày các cặp đôi bày tỏ tình cảm với nhau, phổ biến ở nhiều nước, trong đó có Việt Nam."],
    bullets: ["Tặng hoa, sô-cô-la, quà", "Hẹn hò, ăn tối"],
  },
  {
    slug: "valentine-trang",
    ten: "Ngày Valentine Trắng",
    tieuDe: "Ngày Valentine Trắng 14/3",
    nhom: "quoc-te",
    lich: "duong",
    ngayChinh: { duong: { ngay: 14, thang: 3 } },
    vanKhan: [],
    moTa: "Ngày 14/3 — ngày đáp lễ của Valentine 14/2.",
    yNghia: ["Valentine Trắng bắt nguồn từ Nhật Bản, là dịp người nhận quà hôm 14/2 đáp lại tình cảm."],
    bullets: ["Tặng quà đáp lễ, thường là sô-cô-la trắng", "Hẹn hò"],
  },
  {
    slug: "ca-thang-tu",
    ten: "Ngày Cá tháng Tư",
    tieuDe: "Ngày Cá tháng Tư 1/4",
    nhom: "quoc-te",
    lich: "duong",
    ngayChinh: { duong: { ngay: 1, thang: 4 } },
    vanKhan: [],
    moTa: "Ngày 1/4 — ngày nói dối vui, trêu đùa nhau.",
    yNghia: ["Cá tháng Tư là ngày mọi người được phép đùa vui, \"nói dối\" vô hại với nhau."],
    bullets: ["Trêu đùa bạn bè, người thân", "Tránh đùa quá trớn gây hiểu lầm"],
  },
  {
    slug: "ngay-cua-me",
    ten: "Ngày của Mẹ",
    tieuDe: "Ngày của Mẹ",
    nhom: "quoc-te",
    lich: "duong-thu",
    ngayChinh: { duongThu: { thuTu: 2, thu: 0, thang: 5 } },
    vanKhan: [],
    moTa: "Chủ nhật thứ hai của tháng 5 — ngày tri ân mẹ.",
    yNghia: ["Ngày của Mẹ bắt nguồn từ Mỹ và được nhiều nước hưởng ứng. Ngày này không cố định, luôn rơi vào Chủ nhật thứ hai của tháng 5."],
    bullets: ["Tặng hoa, quà cho mẹ", "Nấu bữa cơm, dành thời gian bên mẹ"],
  },
  {
    slug: "ngay-cua-cha",
    ten: "Ngày của Cha",
    tieuDe: "Ngày của Cha",
    nhom: "quoc-te",
    lich: "duong-thu",
    ngayChinh: { duongThu: { thuTu: 3, thu: 0, thang: 6 } },
    vanKhan: [],
    moTa: "Chủ nhật thứ ba của tháng 6 — ngày tri ân cha.",
    yNghia: ["Ngày của Cha được nhiều nước tổ chức vào Chủ nhật thứ ba của tháng 6, là dịp con cái bày tỏ lòng biết ơn cha."],
    bullets: ["Tặng quà, gửi lời cảm ơn cha", "Đi chơi, ăn cơm cùng gia đình"],
  },
  {
    slug: "halloween",
    ten: "Lễ hội Halloween",
    tieuDe: "Halloween 31/10",
    nhom: "quoc-te",
    lich: "duong",
    ngayChinh: { duong: { ngay: 31, thang: 10 } },
    vanKhan: [],
    moTa: "Ngày 31/10 — lễ hội hóa trang Halloween.",
    yNghia: ["Halloween có nguồn gốc từ châu Âu, nay phổ biến với giới trẻ ở Việt Nam như một dịp hóa trang vui chơi."],
    bullets: ["Hóa trang, dự tiệc", "Trang trí bí ngô, đèn lồng"],
  },
  {
    slug: "giang-sinh",
    ten: "Lễ Giáng sinh",
    tieuDe: "Lễ Giáng sinh (Noel)",
    nhom: "quoc-te",
    lich: "duong",
    ngayChinh: { duong: { ngay: 25, thang: 12 } },
    vanKhan: [],
    moTa: "Ngày 25/12 — lễ Giáng sinh, đêm Noel là tối 24/12.",
    yNghia: ["Giáng sinh là ngày lễ lớn của Kitô giáo, kỷ niệm sự ra đời của Chúa Giêsu. Ở Việt Nam, đêm Noel cũng là dịp vui chơi của nhiều người."],
    bullets: ["Dự lễ tại nhà thờ đêm 24/12", "Trang trí cây thông, tặng quà", "Dạo phố ngắm đèn"],
  },
];

export const LE_LIST: readonly LePage[] = [...DOT_1, ...DOT_2, ...DOT_3];

export const LE_NHOM_LABEL: Record<LeNhom, string> = {
  "anh-hung": "Anh hùng dân tộc",
  "am-lich": "Lễ âm lịch",
  "nghi-le": "Ngày nghỉ lễ",
  "ky-niem": "Ngày kỷ niệm",
  "quoc-te": "Ngày quốc tế",
};

export function leBySlug(slug: string): LePage | undefined {
  return LE_LIST.find((l) => l.slug === slug);
}

export function leKhac(page: LePage, count = 4): LePage[] {
  return LE_LIST.filter((l) => l.nhom === page.nhom && l.slug !== page.slug).slice(0, count);
}

// ---------- kiểm tra tính toàn vẹn dữ liệu tại thời điểm build ----------
function validateLeData(): void {
  const seen = new Set<string>();
  for (const p of LE_LIST) {
    if (seen.has(p.slug)) throw new Error(`Trùng slug trong LE_LIST: ${p.slug}`);
    seen.add(p.slug);
    for (const vk of p.vanKhan) {
      if (!VAN_KHAN_LIST.some((v) => v.slug === vk)) {
        throw new Error(`Trang lễ "${p.slug}" tham chiếu văn khấn không tồn tại: ${vk}`);
      }
    }
  }
  if (LE_LIST.length !== 60) {
    throw new Error(`LE_LIST phải có đúng 60 trang, hiện có ${LE_LIST.length}`);
  }
}
validateLeData();
