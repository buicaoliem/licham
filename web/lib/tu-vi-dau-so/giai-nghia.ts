/**
 * Diễn giải truyền thống cho lá số Tử Vi — nội dung do Lịch Âm tự biên soạn, tóm lược ý nghĩa phổ thông
 * của sao và cung theo sách Tử Vi Việt Nam. Đây là phần DIỄN GIẢI, tách khỏi phần TÍNH TOÁN (engine.ts):
 * vị trí sao là kết quả thuật toán có kiểm chứng; ý nghĩa là quan niệm truyền thống, chỉ để tham khảo.
 */
import { type Cung, type LaSo, mod12, tamPhuongTuChinh } from "./engine";
import type { HoaName, StarId, TenCung } from "./stars";

export const Y_NGHIA_CUNG: Record<TenCung, string> = {
  Mệnh: "Cung gốc của lá số: tính cách, năng lực, thể chất và khuynh hướng chung của cả đời người.",
  "Phụ Mẫu": "Cha mẹ, bề trên, mối quan hệ với người nuôi dạy; cũng được xem cho giấy tờ, học vấn thuở nhỏ.",
  "Phúc Đức": "Phúc phần dòng họ, đời sống tinh thần, sự an nhiên và tuổi thọ.",
  "Điền Trạch": "Nhà cửa, đất đai, tài sản cố định và môi trường sống.",
  "Quan Lộc": "Công danh, sự nghiệp, cách làm việc và vị trí trong xã hội.",
  "Nô Bộc": "Bạn bè, đồng nghiệp, cấp dưới, người giúp việc — những mối quan hệ ngang hàng hoặc dưới quyền.",
  "Thiên Di": "Ra ngoài, đi xa, giao tế; cách người khác nhìn nhận mình ở môi trường bên ngoài.",
  "Tật Ách": "Sức khỏe, bệnh tật, tai nạn và những khó khăn về thân thể.",
  "Tài Bạch": "Tiền bạc, cách kiếm tiền và giữ tiền.",
  "Tử Tức": "Con cái, học trò, người mình nuôi dạy; cũng liên quan tới sức sáng tạo.",
  "Phu Thê": "Vợ chồng, hôn nhân, người bạn đời và cách mình ứng xử trong tình cảm.",
  "Huynh Đệ": "Anh chị em ruột, người thân ngang hàng và sự tương trợ trong gia đình.",
};

export interface YNghiaChinhTinh {
  tinhChat: string;
  tuKhoa: string[];
  moTa: string;
}

export const Y_NGHIA_CHINH_TINH: Record<string, YNghiaChinhTinh> = {
  tuVi: {
    tinhChat: "Đế tinh, chủ về quyền uy và phúc thọ",
    tuKhoa: ["lãnh đạo", "tự trọng", "độ lượng"],
    moTa: "Sao đứng đầu, tượng vua. Người có Tử Vi thủ Mệnh thường có phong thái đĩnh đạc, muốn làm chủ, được người khác nể trọng. Cần có Tả Phù, Hữu Bật, Thiên Tướng… phò trợ mới phát huy trọn vẹn; đứng một mình dễ cô độc, cả nể hoặc tự cao.",
  },
  thienCo: {
    tinhChat: "Thiện tinh, chủ về trí tuệ và mưu lược",
    tuKhoa: ["thông minh", "linh hoạt", "hay suy nghĩ"],
    moTa: "Tượng người mưu sĩ. Nhanh trí, khéo tay, giỏi tính toán và lập kế hoạch; hợp nghề cần óc phân tích, kỹ thuật, tư vấn. Mặt trái là hay lo nghĩ, dễ thay đổi, khó giữ một hướng lâu dài.",
  },
  thaiDuong: {
    tinhChat: "Quý tinh, chủ về danh tiếng; tượng cha, chồng, con trai",
    tuKhoa: ["hào phóng", "nhiệt tình", "danh vọng"],
    moTa: "Mặt Trời, tỏa sáng và cho đi. Người thẳng thắn, rộng rãi, thích giúp đỡ, trọng danh hơn lợi. Sách cổ xem Thái Dương đóng ban ngày, ở các cung phía đông (Dần đến Ngọ) là sáng sủa; đóng cung đêm thì vất vả hơn.",
  },
  vuKhuc: {
    tinhChat: "Tài tinh, chủ về tiền bạc và ý chí",
    tuKhoa: ["quyết đoán", "thực tế", "tài chính"],
    moTa: "Sao tài lộc, thiên về kinh doanh, tài chính, kỹ thuật cơ khí. Tính cương nghị, nói ít làm nhiều, có khi cứng nhắc. Sách cổ cho rằng Vũ Khúc hợp với người làm kinh tế, không lợi cho sự êm đềm trong hôn nhân nếu gặp sát tinh.",
  },
  thienDong: {
    tinhChat: "Phúc tinh, chủ về hưởng thụ và hòa thuận",
    tuKhoa: ["hiền hòa", "vui vẻ", "dễ thích nghi"],
    moTa: "Tượng đứa trẻ hồn nhiên. Tính ôn hòa, dễ gần, biết hưởng thụ, ít tranh giành. Thường qua giai đoạn vất vả ban đầu rồi mới an nhàn; mặt trái là thiếu quyết tâm, dễ ỷ lại.",
  },
  liemTrinh: {
    tinhChat: "Tù tinh, chủ về pháp luật, kỷ cương và tình cảm mãnh liệt",
    tuKhoa: ["nguyên tắc", "cá tính", "tham vọng"],
    moTa: "Sao hai mặt: đắc địa thì liêm chính, giỏi tổ chức, hợp ngành luật, quân sự, hành chính; hãm địa hoặc gặp sát tinh thì nóng nảy, dễ vướng thị phi, kiện tụng.",
  },
  thienPhu: {
    tinhChat: "Tài khố tinh, chủ về tích lũy và giữ của",
    tuKhoa: ["ổn định", "cẩn trọng", "bao dung"],
    moTa: "Kho của trời. Người điềm đạm, biết lo xa, giỏi quản lý và giữ gìn. Thiên Phủ bảo vệ, giải bớt tính hung của sát tinh; nhưng dễ bảo thủ, ngại thay đổi.",
  },
  thaiAm: {
    tinhChat: "Phú tinh, chủ về điền sản; tượng mẹ, vợ, con gái",
    tuKhoa: ["dịu dàng", "tinh tế", "tích góp"],
    moTa: "Mặt Trăng, thiên về nội tâm và cái đẹp. Người nhạy cảm, chu đáo, có óc thẩm mỹ, giỏi tích lũy nhà đất. Sách cổ xem Thái Âm đóng cung đêm (Thân đến Tý) là sáng; cung ngày thì kém.",
  },
  thamLang: {
    tinhChat: "Đào hoa tinh, chủ về dục vọng và giao tế",
    tuKhoa: ["đa tài", "khéo giao thiệp", "ham muốn"],
    moTa: "Sao của ham muốn và sức sống. Đa tài, nhiều sở thích, khéo ăn nói, giỏi quan hệ. Đắc địa thì thành đạt nhờ xoay xở; hãm địa thì dễ sa đà hưởng lạc, tửu sắc.",
  },
  cuMon: {
    tinhChat: "Ám tinh, chủ về ngôn ngữ và thị phi",
    tuKhoa: ["ăn nói", "phân tích", "hoài nghi"],
    moTa: "Sao của lời nói. Giỏi lý luận, tranh biện, hợp nghề luật sư, giảng dạy, truyền thông. Mặt trái là hay nghi ngờ, dễ gây hiểu lầm, khẩu thiệt. Gặp Thái Dương sáng thì tốt hơn.",
  },
  thienTuong: {
    tinhChat: "Ấn tinh, chủ về quyền chức và sự công bằng",
    tuKhoa: ["chính trực", "trách nhiệm", "hào hiệp"],
    moTa: "Tượng quan giữ ấn. Người trọng lẽ phải, thích bênh vực kẻ yếu, có tài giúp việc và tổ chức. Chịu ảnh hưởng mạnh của sao đi cùng: gặp Hóa Lộc, Lộc Tồn thì tốt; gặp Kình Đà, Hóa Kỵ thì bị kìm hãm.",
  },
  thienLuong: {
    tinhChat: "Ấm tinh, chủ về che chở, thọ và giải ách",
    tuKhoa: ["nhân hậu", "chín chắn", "thích khuyên bảo"],
    moTa: "Sao của người già, thầy thuốc, thầy giáo. Tính đứng đắn, thích giúp đỡ và dạy bảo; hay gặp nạn nhưng được giải. Hợp nghề y, giáo dục, xã hội, tư pháp.",
  },
  thatSat: {
    tinhChat: "Tướng tinh, chủ về uy dũng và biến động",
    tuKhoa: ["can đảm", "độc lập", "quyết liệt"],
    moTa: "Tượng võ tướng ra trận. Gan dạ, dám làm, thích tự quyết, chịu được áp lực. Cuộc đời nhiều thăng trầm, thành bại nhanh; hợp môi trường cạnh tranh, quân đội, kinh doanh mạo hiểm.",
  },
  phaQuan: {
    tinhChat: "Hao tinh, chủ về phá cũ lập mới",
    tuKhoa: ["đổi mới", "táo bạo", "khó đoán"],
    moTa: "Sao tiên phong, phá bỏ cái cũ. Người dám nghĩ dám làm, không thích khuôn phép, có sức bật sau thất bại. Mặt trái là tiêu hao, bốc đồng, quan hệ dễ đổ vỡ nếu thiếu cát tinh.",
  },
};

export const Y_NGHIA_PHU_TINH: Partial<Record<StarId, string>> = {
  taPhu: "Trợ lực, được người giúp đỡ; tăng sức cho chính tinh cùng cung.",
  huuBat: "Trợ lực, sự giúp đỡ âm thầm; đi đôi với Tả Phù thành bộ Tả Hữu.",
  vanXuong: "Văn chương, học hành, thi cử, giấy tờ chính thức.",
  vanKhuc: "Tài ăn nói, nghệ thuật, âm nhạc; cùng Văn Xương thành bộ Xương Khúc.",
  thienKhoi: "Quý nhân nam giới, người trên nâng đỡ; lợi thi cử, thăng tiến.",
  thienViet: "Quý nhân nữ giới, sự giúp đỡ kín đáo; cùng Thiên Khôi thành bộ Khôi Việt.",
  locTon: "Lộc trời, tiền bạc ổn định, biết giữ của; tính thận trọng.",
  thienMa: "Di chuyển, thay đổi, bôn ba; gặp Lộc Tồn thành cách Lộc Mã giao trì (đi xa phát tài).",
  kinhDuong: "Sát tinh: cương cường, dễ va chạm, thương tích; đắc địa thì thành uy dũng.",
  daLa: "Sát tinh: trì trệ, dây dưa, âm thầm cản trở.",
  hoaTinh: "Sát tinh: nóng nảy, bột phát, tai họa bất ngờ nhưng qua nhanh.",
  linhTinh: "Sát tinh: âm ỉ, bực bội kéo dài; cùng Hỏa Tinh thành bộ Hỏa Linh.",
  diaKhong: "Sát tinh: hư không, mất mát, ý tưởng viển vông; cũng chủ óc sáng tạo khác thường.",
  diaKiep: "Sát tinh: tổn thất, trắc trở bất ngờ; cùng Địa Không thành bộ Không Kiếp.",
  longTri: "Văn nhã, khéo tay, thi cử đỗ đạt; đi cặp với Phượng Các.",
  phuongCac: "Danh tiếng, sự trang nhã; cùng Long Trì thành bộ Long Phượng.",
  giaiThan: "Giải trừ tai ương, hóa giải bớt sát tinh cùng cung.",
  hongLoan: "Hỷ sự, tình duyên, cưới hỏi; dung mạo dễ mến.",
  thienHy: "Tin vui, sinh nở, hỷ sự; đối cung với Hồng Loan.",
  daoHoa: "Sức hấp dẫn, giao tế, tình cảm; nhiều người mến.",
  hoaCai: "Tài hoa, thích cái đẹp, có khi cô độc, thiên về tôn giáo triết học.",
  kiepSat: "Hung tinh: tai họa, trộm cắp, mất mát bất ngờ.",
  coThan: "Cô đơn, ít anh em trợ giúp (thường xét cho nam).",
  quaTu: "Quạnh quẽ, muộn duyên (thường xét cho nữ).",
  thienKhoc: "Buồn phiền, nước mắt; đắc địa ở Tý, Ngọ thì lại chủ danh tiếng.",
  thienHu: "Hư hao, lo âu; đi cặp với Thiên Khốc.",
  phaToai: "Hao tán, đổ vỡ vặt, công việc dở dang.",
  thienDuc: "Phúc đức, được che chở, giải bớt tai ương.",
  nguyetDuc: "Đức độ, hòa thuận, giải bớt tai ương; cùng Thiên Đức thành bộ Nhị Đức.",
  thienHinh: "Hình pháp, kỷ luật, dao kéo; đắc địa hợp nghề quân sự, y khoa, luật.",
  thienRieu: "Đào hoa, lãng mạn, dễ mê đắm; cũng chủ sự mê tín.",
  thienY: "Thuốc men, chữa bệnh; lợi cho sức khỏe, nghề y.",
  thienGiai: "Giải trừ tai nạn lớn.",
  diaGiai: "Giải trừ tai nạn, nhất là về đất đai, nhà cửa.",
  tamThai: "Quý hiển, được trọng vọng; đi cặp với Bát Tọa.",
  batToa: "Địa vị, chỗ đứng vững vàng; cùng Tam Thai thành bộ Thai Tọa.",
  anQuang: "Ân huệ, được người trên thương; lợi thi cử.",
  thienQuy: "Quý nhân, được ban ơn; cùng Ân Quang thành bộ Quang Quý.",
  thaiPhu: "Danh vị, chức vụ; đi cặp với Phong Cáo.",
  phongCao: "Được khen thưởng, phong chức.",
  thienTai: "Tài năng, sự khéo léo; làm tăng hoặc giảm tính chất sao cùng cung.",
  thienTho: "Tuổi thọ, tính hiền lành.",
  thienQuan: "Quý nhân, lợi quan chức, gặp dữ hóa lành.",
  thienPhuc: "Phúc lộc, được giúp đỡ.",
  thienThuong: "Hao tổn, buồn phiền (luôn đóng cung Nô Bộc).",
  thienSu: "Trở ngại, tai ương nhỏ (luôn đóng cung Tật Ách).",
  thienLa: "Lưới trời — trói buộc, vướng mắc (cố định ở Thìn).",
  diaVong: "Lưới đất — bế tắc, khó thoát (cố định ở Tuất).",
  thienKhong: "Hư không, mưu tính khó thành; cũng chủ sự thông minh khác lạ.",
};

export const Y_NGHIA_TU_HOA: Record<HoaName, string> = {
  Lộc: "Hóa Lộc — tài lộc, may mắn, sự hanh thông ở cung đóng.",
  Quyền: "Hóa Quyền — quyền hành, năng lực, sự chủ động.",
  Khoa: "Hóa Khoa — danh tiếng, học vấn, được quý nhân giúp.",
  Kỵ: "Hóa Kỵ — trở ngại, thị phi, điều canh cánh; cũng là nơi mình dồn tâm sức.",
};

export const Y_NGHIA_TRANG_SINH: Record<string, string> = {
  "Tràng Sinh": "khởi đầu, sinh sôi",
  "Mộc Dục": "non trẻ, dễ lầm lỡ, đào hoa",
  "Quan Đới": "trưởng thành, có danh phận",
  "Lâm Quan": "ra đời làm việc, vững vàng",
  "Đế Vượng": "thịnh vượng nhất",
  Suy: "bắt đầu suy giảm",
  Bệnh: "yếu kém, bệnh tật",
  Tử: "bế tắc, ngưng trệ",
  Mộ: "tàng trữ, tích lũy",
  Tuyệt: "cạn kiệt, cô lập",
  Thai: "thai nghén, ý tưởng mới",
  Dưỡng: "nuôi dưỡng, chờ thời",
};

export const Y_NGHIA_TUAN_TRIET =
  "Tuần và Triệt là hai vòng không vong: làm giảm sức của sao trong cung — sao tốt bớt tốt, sao xấu bớt xấu. Sách cổ cho rằng Triệt mạnh ở nửa đời trước, Tuần ảnh hưởng về sau.";

export interface DoanGiaiNghia {
  tieuDe: string;
  noiDung: string;
}

/** Diễn giải tổng hợp một cung: ý nghĩa cung, chính tinh (hoặc vô chính diệu), bộ sao phụ, tứ hóa, tuần triệt. */
export function giaiNghiaCung(laSo: LaSo, chi: number): DoanGiaiNghia[] {
  const c = laSo.cung[mod12(chi)];
  const out: DoanGiaiNghia[] = [{ tieuDe: `Cung ${c.ten}`, noiDung: Y_NGHIA_CUNG[c.ten] }];
  if (c.laThan) out.push({ tieuDe: "Thân cư cung này", noiDung: "Cung Thân cho biết khuynh hướng của nửa đời sau (từ khoảng 30 tuổi); nơi Thân đóng là lĩnh vực người đó dồn sức." });
  if (c.chinhTinh.length) {
    for (const s of c.chinhTinh) {
      const y = Y_NGHIA_CHINH_TINH[s.id];
      out.push({ tieuDe: `${s.name}${s.hoa ? ` hóa ${s.hoa}` : ""} — ${y.tinhChat}`, noiDung: y.moTa });
    }
  } else {
    const doi = laSo.cung[tamPhuongTuChinh(c.chi).xungChieu];
    const muon = doi.chinhTinh.map((s) => s.name).join(", ");
    out.push({
      tieuDe: "Vô chính diệu",
      noiDung: `Cung không có chính tinh. Theo sách, xét mượn chính tinh ở cung xung chiếu (${doi.ten} – ${doi.chiName}${muon ? `: ${muon}` : ""}) nhưng sức yếu hơn; nhiều sách coi vô chính diệu gặp Tuần/Triệt hoặc Không Kiếp là cách "không" dễ thành.`,
    });
  }
  const pairs: [StarId, StarId, string][] = [
    ["taPhu", "huuBat", "Bộ Tả Hữu: được nhiều người trợ giúp."],
    ["vanXuong", "vanKhuc", "Bộ Xương Khúc: học hành, văn chương, nghệ thuật."],
    ["thienKhoi", "thienViet", "Bộ Khôi Việt: quý nhân phù trợ."],
    ["kinhDuong", "daLa", "Bộ Kình Đà: tranh chấp, trì trệ."],
    ["hoaTinh", "linhTinh", "Bộ Hỏa Linh: nóng nảy, biến cố."],
    ["diaKhong", "diaKiep", "Bộ Không Kiếp: hao tổn, bất ngờ."],
    ["longTri", "phuongCac", "Bộ Long Phượng: văn nhã, hỷ sự."],
    ["tamThai", "batToa", "Bộ Thai Tọa: địa vị, được nể trọng."],
    ["anQuang", "thienQuy", "Bộ Quang Quý: ân huệ, quý nhân."],
  ];
  const tp = tamPhuongTuChinh(c.chi);
  const group = [tp.banCung, tp.xungChieu, ...tp.tamHop];
  for (const [a, b, text] of pairs) {
    const inBan = laSo.viTri[a] === c.chi || laSo.viTri[b] === c.chi;
    if (inBan && group.includes(laSo.viTri[a]) && group.includes(laSo.viTri[b])) {
      out.push({ tieuDe: "Bộ sao hội chiếu", noiDung: `${text} (hai sao cùng nằm trong tam phương tứ chính của cung).` });
    }
  }
  for (const s of [...c.chinhTinh, ...c.phuTinhCat, ...c.phuTinhSat]) {
    if (s.hoa) out.push({ tieuDe: `Hóa ${s.hoa} tại cung (${s.name})`, noiDung: Y_NGHIA_TU_HOA[s.hoa] });
  }
  if (c.tuan || c.triet) out.push({ tieuDe: [c.tuan && "Tuần", c.triet && "Triệt"].filter(Boolean).join(" và "), noiDung: Y_NGHIA_TUAN_TRIET });
  out.push({ tieuDe: `Vòng Tràng Sinh: ${c.trangSinh}`, noiDung: `Tượng giai đoạn ${Y_NGHIA_TRANG_SINH[c.trangSinh]}.` });
  return out;
}

/** Cung có nhiều nghĩa nhất để mở mặc định: cung Mệnh. */
export function cungMacDinh(laSo: LaSo): Cung {
  return laSo.cung[laSo.menhChi];
}
