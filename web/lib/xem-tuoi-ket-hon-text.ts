import type { CanChi } from "@licham/core";
import { chiByIndex } from "@/lib/tuoi";
import type { CanPairQuanHe, ChiPairQuanHe, NapAmPairQuanHe } from "@/lib/xem-tuoi-ket-hon";

// Sinh văn bản "luận giải" cho mục 4 (con giáp) và mục 5 (mệnh nạp âm) trên trang
// nam-{năm}-nu-{năm}. Vì các trang được sinh tĩnh với số lượng lớn, nếu chỉ có MỘT
// mẫu câu rồi thay số vào thì nội dung sẽ bị Google coi là trùng lặp/mỏng. Ở đây mỗi
// nhánh quan hệ có ít nhất 3 cách diễn đạt khác nhau (khác cấu trúc câu, không chỉ đổi
// từ đồng nghĩa), và biến thể được chọn ổn định theo hash của cặp năm sinh — cùng một
// cặp năm sinh luôn ra cùng một biến thể, không có yếu tố ngẫu nhiên lúc dựng trang.

/** Hash chuỗi ổn định (FNV-1a rút gọn), dùng để chọn biến thể văn bản theo cặp năm sinh. */
export function hashOnDinh(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function chonBienThe<T>(bienThe: readonly T[], seed: string): T {
  const v = bienThe[hashOnDinh(seed) % bienThe.length];
  if (!v) throw new Error("Danh sách biến thể rỗng");
  return v;
}

function tenChi(canChi: CanChi): string {
  return chiByIndex(canChi.chiIndex).ten;
}

// ---------------------------------------------------------------------------
// Mục 4 — luận giải theo con giáp (5 nhánh × 3 biến thể)
// ---------------------------------------------------------------------------

type ChiVariant = (nam: string, nu: string, canChiNam: string, canChiNu: string) => string;

const CHI_TEXT: Record<ChiPairQuanHe, readonly ChiVariant[]> = {
  "tam-hop": [
    (nam, nu, ccNam, ccNu) =>
      `Nam tuổi ${nam} và nữ tuổi ${nu} nằm trong cùng một nhóm tam hợp — đây là nhóm ba con giáp được dân gian xem là ăn ý nhất với nhau. Người tuổi ${ccNam} và người tuổi ${ccNu} nhờ vậy thường được nhận xét là dễ tìm được tiếng nói chung, ít khi va chạm vì những chuyện nhỏ nhặt.`,
    (nam, nu, ccNam, ccNu) =>
      `Xét theo can chi, ${ccNam} (nam) và ${ccNu} (nữ) thuộc về một bộ tam hợp. Quan niệm dân gian coi đây là mối quan hệ hỗ trợ lẫn nhau: tuổi ${nam} và tuổi ${nu} khi kết hợp thường được cho là bổ khuyết tốt cho nhau trong cách sống và cách nghĩ.`,
    (nam, nu, ccNam, ccNu) =>
      `Trong 12 con giáp, tuổi ${nam} và tuổi ${nu} là hai trong ba tuổi hợp thành nhóm tam hợp. Vì thế cặp ${ccNam} — ${ccNu} thường được dân gian xếp vào diện "tuổi đẹp đôi", ít lo chuyện xung khắc về con giáp.`,
  ],
  "nhi-hop": [
    (nam, nu, ccNam, ccNu) =>
      `Nam tuổi ${nam} và nữ tuổi ${nu} là một cặp nhị hợp (lục hợp) — hai chi đứng thành đôi với nhau trong vòng 12 con giáp. Người ${ccNam} và người ${ccNu} theo đó được xem là hợp tính, biết nhường nhịn khi sống chung.`,
    (nam, nu, ccNam, ccNu) =>
      `Theo bảng lục hợp, chi của tuổi ${nam} và chi của tuổi ${nu} là một cặp đi liền nhau, nên ${ccNam} và ${ccNu} thường được dân gian đánh giá là hợp nhau ở mức khá, không đến mức xuất sắc như tam hợp nhưng cũng không có gì đáng ngại.`,
    (nam, nu, ccNam, ccNu) =>
      `Cặp con giáp ${ccNam} (nam) — ${ccNu} (nữ) rơi vào nhóm nhị hợp. Dân gian tin rằng hai tuổi đứng cặp kiểu này dễ ăn ý trong việc thu vén gia đình, dù mức độ hợp không mạnh bằng nhóm ba tuổi tam hợp.`,
  ],
  xung: [
    (nam, nu, ccNam, ccNu) =>
      `Nam tuổi ${nam} và nữ tuổi ${nu} nằm trong nhóm tứ hành xung — bốn con giáp được xem là xung khắc trực diện với nhau. Người ${ccNam} và người ${ccNu} theo quan niệm dân gian dễ có những khác biệt về tính cách cần chủ động dung hòa.`,
    (nam, nu, ccNam, ccNu) =>
      `Theo bảng tứ hành xung, chi của tuổi ${nam} đối xung với chi của tuổi ${nu}. Cặp ${ccNam} — ${ccNu} vì vậy thường được nhắc tới là "tuổi xung", một điều nhiều người muốn tìm hiểu kỹ trước khi quyết định chuyện cưới hỏi.`,
    (nam, nu, ccNam, ccNu) =>
      `Tuổi ${nam} (nam) và tuổi ${nu} (nữ) đứng đối nhau trong vòng tứ hành xung. Dân gian cho rằng ${ccNam} và ${ccNu} khi về chung một nhà cần biết cách nhường nhau nhiều hơn các cặp tuổi khác, vì đây là mức xung nặng nhất về con giáp.`,
  ],
  hai: [
    (nam, nu, ccNam, ccNu) =>
      `Nam tuổi ${nam} và nữ tuổi ${nu} thuộc nhóm lục hại — mức xung khắc nhẹ hơn tứ hành xung nhưng vẫn được dân gian lưu ý. Người ${ccNam} và người ${ccNu} có thể có vài điểm chưa ăn ý, song đây không phải trở ngại lớn nếu biết thông cảm.`,
    (nam, nu, ccNam, ccNu) =>
      `Theo bảng lục hại, chi của tuổi ${nam} và chi của tuổi ${nu} tạo thành một cặp hại. Cặp ${ccNam} — ${ccNu} vì thế đôi khi được nhắc là cần chú ý hơn trong giao tiếp hằng ngày, dù mức độ chỉ ở diện nhẹ.`,
    (nam, nu, ccNam, ccNu) =>
      `Tuổi ${nam} và tuổi ${nu} rơi vào quan hệ lục hại trong 12 con giáp. Dân gian xem đây là mức "hơi lệch" chứ không phải xung nặng — ${ccNam} và ${ccNu} vẫn có thể sống hòa hợp nếu biết lắng nghe nhau.`,
  ],
  "binh-hoa": [
    (nam, nu, ccNam, ccNu) =>
      `Nam tuổi ${nam} và nữ tuổi ${nu} không rơi vào nhóm tam hợp, nhị hợp, xung hay hại nào cả — quan hệ con giáp giữa ${ccNam} và ${ccNu} được xem là bình hòa, không có yếu tố nào nổi bật theo cả hai chiều tốt lẫn xấu.`,
    (nam, nu, ccNam, ccNu) =>
      `Xét riêng về can chi, cặp ${ccNam} (nam) — ${ccNu} (nữ) trung tính: không thuộc các nhóm hợp đặc biệt, cũng không thuộc các nhóm xung khắc. Mức độ hợp nhau giữa tuổi ${nam} và tuổi ${nu} vì vậy chủ yếu nên xét thêm ở yếu tố mệnh nạp âm.`,
    (nam, nu, ccNam, ccNu) =>
      `Theo các bảng quan hệ 12 con giáp, tuổi ${nam} và tuổi ${nu} không tạo thành cặp đặc biệt nào — không tam hợp, không nhị hợp, cũng không xung hại. ${ccNam} và ${ccNu} được xem là một cặp "bình thường" về mặt con giáp.`,
  ],
};

export function luanGiaiConGiap(canChiNam: CanChi, canChiNu: CanChi, chiPair: ChiPairQuanHe, namNam: number, namNu: number): string {
  const variants = CHI_TEXT[chiPair];
  const fn = chonBienThe(variants, `chi:${namNam}:${namNu}:${chiPair}`);
  // Người Việt gọi tuổi theo con giáp (ví dụ "tuổi Ngọ"), không gọi theo năm sinh dương lịch
  // ("tuổi 1990") — nên truyền tên chi vào các mẫu câu "tuổi ${nam}/${nu}" thay vì năm sinh.
  return fn(tenChi(canChiNam), tenChi(canChiNu), canChiNam.name, canChiNu.name);
}

// ---------------------------------------------------------------------------
// Mục 5 — luận giải theo mệnh nạp âm (5 nhánh × 3 biến thể)
// ---------------------------------------------------------------------------

// Tương sinh và tương khắc trong ngũ hành CHỈ CÓ MỘT CHIỀU (Thổ sinh Kim chứ không phải "hai
// hành sinh cho nhau" — không dùng lối diễn đạt "có qua có lại"). Vì vậy phải tách riêng 4
// nhánh có chiều (nam sinh nữ / nữ sinh nam / nam khắc nữ / nữ khắc nam), mỗi nhánh một cách
// diễn đạt khác nhau, không chỉ đổi chỗ "nam"/"nữ" cho nhau trong cùng một câu.
type NapAmVariant = (nam: string, nu: string, menhNam: string, menhNu: string, hanhNam: string, hanhNu: string) => string;

const NAP_AM_TEXT: Record<NapAmPairQuanHe, readonly NapAmVariant[]> = {
  "nam-sinh-nu": [
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Về mệnh, nam tuổi ${nam} mang mệnh ${menhNam} (hành ${hanhNam}) sinh cho nữ tuổi ${nu} mang mệnh ${menhNu} (hành ${hanhNu}) — chồng là người nâng đỡ, vợ là người được hưởng. Dân gian coi đây là một điểm cộng, vì mệnh chồng sinh mệnh vợ thường được xem là người chồng biết lo, che chở tốt cho vợ.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Mệnh ${menhNam} (${hanhNam}) của tuổi ${nam} sinh ra mệnh ${menhNu} (${hanhNu}) của tuổi ${nu} theo ngũ hành nạp âm. Đây là chiều sinh thuận về phía nam — chồng vượng thì vợ cũng được nhờ, được nhiều người xem tuổi đánh giá là một điểm tốt.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Xét ngũ hành nạp âm: tuổi ${nam} mệnh ${menhNam} (hành ${hanhNam}) sinh cho tuổi ${nu} mệnh ${menhNu} (hành ${hanhNu}). Tương sinh vốn chỉ có một chiều, và ở cặp này chiều sinh nằm về phía nam — vợ là người được hưởng lợi từ mệnh chồng.`,
  ],
  "nu-sinh-nam": [
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Về mệnh, nữ tuổi ${nu} mang mệnh ${menhNu} (hành ${hanhNu}) lại là bên sinh cho nam tuổi ${nam} mang mệnh ${menhNam} (hành ${hanhNam}) — vợ là người vun vén, chồng là người được bồi đắp. Dân gian vẫn xem đây là một điểm tốt, chỉ khác chiều sinh so với kiểu thường gặp "chồng sinh vợ".`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Theo ngũ hành nạp âm, mệnh ${menhNu} (${hanhNu}) của tuổi ${nu} sinh ra mệnh ${menhNam} (${hanhNam}) của tuổi ${nam}. Chiều sinh nằm về phía nữ: vợ chủ động vun đắp cho chồng — vẫn là một dấu hiệu tốt về mệnh, không phải điều đáng lo.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Xét ngũ hành: tuổi ${nu} mệnh ${menhNu} (hành ${hanhNu}) là bên sinh, tuổi ${nam} mệnh ${menhNam} (hành ${hanhNam}) là bên được sinh. Trường hợp vợ sinh mệnh cho chồng vẫn được dân gian tính là hợp mệnh, chỉ khác ai là người chủ động nâng đỡ ai.`,
  ],
  "nam-khac-nu": [
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Về mệnh, nam tuổi ${nam} mang mệnh ${menhNam} (hành ${hanhNam}) khắc mệnh ${menhNu} (hành ${hanhNu}) của nữ tuổi ${nu} — chồng là bên khắc, vợ là bên bị khắc. Đây là điểm nhiều người xem tuổi lưu ý thêm, dù không phải yếu tố quyết định duy nhất.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Mệnh ${menhNam} (${hanhNam}) của tuổi ${nam} khắc mệnh ${menhNu} (${hanhNu}) của tuổi ${nu} theo ngũ hành nạp âm. Dân gian cho rằng chiều khắc này cần biết cách dung hòa, có thể hóa giải phần nào bằng cách chọn màu sắc, hướng nhà hợp mệnh cho người vợ.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Xét ngũ hành: tuổi ${nam} mệnh ${menhNam} (hành ${hanhNam}) ở thế khắc chế tuổi ${nu} mệnh ${menhNu} (hành ${hanhNu}). Đây là chi tiết đáng tham khảo, mức độ hợp nhau cuối cùng còn phụ thuộc nhiều vào quan hệ con giáp và thiên can của hai người.`,
  ],
  "nu-khac-nam": [
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Về mệnh, nữ tuổi ${nu} mang mệnh ${menhNu} (hành ${hanhNu}) lại là bên khắc mệnh ${menhNam} (hành ${hanhNam}) của nam tuổi ${nam} — vợ là bên khắc, chồng là bên bị khắc. Đây cũng là điều nên biết để hai người chủ động dung hòa, không phải điều gì quá nghiêm trọng.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Theo ngũ hành nạp âm, mệnh ${menhNu} (${hanhNu}) của tuổi ${nu} khắc mệnh ${menhNam} (${hanhNam}) của tuổi ${nam}. Chiều khắc nằm về phía nữ, khác với kiểu thường gặp là chồng khắc vợ — vẫn nên lưu ý để chọn cách hóa giải phù hợp.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Xét ngũ hành: tuổi ${nu} mệnh ${menhNu} (hành ${hanhNu}) khắc chế tuổi ${nam} mệnh ${menhNam} (hành ${hanhNam}). Đây là chi tiết đáng tham khảo hơn là yếu tố quyết định, nên xem thêm quan hệ con giáp và thiên can để có cái nhìn đầy đủ.`,
  ],
  "cung-hanh": [
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Về mệnh, nam tuổi ${nam} mệnh ${menhNam} và nữ tuổi ${nu} mệnh ${menhNu} tuy tên gọi khác nhau nhưng cùng thuộc hành ${hanhNam}. Cùng một hành thì không sinh cũng không khắc, dân gian xem là mức bình hòa về mệnh.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Mệnh ${menhNam} của tuổi ${nam} và mệnh ${menhNu} của tuổi ${nu} đều thuộc hành ${hanhNam}. Vì cùng hành nên quan hệ ngũ hành ở đây trung tính — không phải điểm cộng nhưng cũng không phải điều đáng lo.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Xét ngũ hành nạp âm, tuổi ${nam} (mệnh ${menhNam}) và tuổi ${nu} (mệnh ${menhNu}) cùng chung hành ${hanhNam}. Với trường hợp cùng hành, yếu tố mệnh coi như huề nhau, nên nhìn thêm vào quan hệ con giáp và thiên can ở các mục khác để có cái nhìn đầy đủ hơn.`,
  ],
};

export function luanGiaiMenh(canChiNam: CanChi, canChiNu: CanChi, napAmPair: NapAmPairQuanHe, namNam: number, namNu: number): string {
  const variants = NAP_AM_TEXT[napAmPair];
  const fn = chonBienThe(variants, `napam:${namNam}:${namNu}:${napAmPair}`);
  return fn(String(namNam), String(namNu), canChiNam.napAm.name, canChiNu.napAm.name, canChiNam.napAm.element, canChiNu.napAm.element);
}

// ---------------------------------------------------------------------------
// Mục 6 — luận giải theo thiên can (3 nhánh × 3 biến thể)
// ---------------------------------------------------------------------------

// Dân gian xét quan hệ thiên can theo NGŨ HỢP (tốt) và XUNG (xấu) — không xét theo sinh/khắc
// ngũ hành. Xem bảng cụ thể ở xepLoaiCanPair trong xem-tuoi-ket-hon.ts.
type ThienCanVariant = (nam: string, nu: string, canNam: string, canNu: string) => string;

const THIEN_CAN_TEXT: Record<CanPairQuanHe, readonly ThienCanVariant[]> = {
  "can-hop": [
    (nam, nu, canNam, canNu) =>
      `Về thiên can, can ${canNam} (nam, tuổi ${nam}) và can ${canNu} (nữ, tuổi ${nu}) là một cặp thiên can ngũ hợp — cặp can đặc biệt được dân gian xem là ăn ý, dễ hóa giải mâu thuẫn khi hai người ở gần nhau lâu dài.`,
    (nam, nu, canNam, canNu) =>
      `Xét thiên can, tuổi ${nam} (can ${canNam}) và tuổi ${nu} (can ${canNu}) rơi vào nhóm ngũ hợp thiên can. Đây là một điểm cộng thêm, thường được nhắc tới như một dấu hiệu hai người dễ đồng lòng trong việc lớn.`,
    (nam, nu, canNam, canNu) =>
      `Can ${canNam} và can ${canNu} nằm trong năm cặp thiên can ngũ hợp mà dân gian truyền lại. Tuổi ${nam} (nam) và tuổi ${nu} (nữ) vì thế được xem là hợp can, thêm một điểm thuận bên cạnh quan hệ con giáp và mệnh nạp âm.`,
  ],
  "can-xung": [
    (nam, nu, canNam, canNu) =>
      `Về thiên can, can ${canNam} (nam, tuổi ${nam}) xung với can ${canNu} (nữ, tuổi ${nu}). Đây là điểm cần lưu ý ở tầng thiên can, dù không phải yếu tố quyết định duy nhất khi xét tổng thể.`,
    (nam, nu, canNam, canNu) =>
      `Xét thiên can, can ${canNam} và can ${canNu} thuộc một trong bốn cặp thiên can xung mà dân gian lưu truyền. Tuổi ${nam} và tuổi ${nu} nên biết điều này để chủ động dung hòa, bên cạnh quan hệ con giáp và mệnh nạp âm.`,
    (nam, nu, canNam, canNu) =>
      `Can ${canNam} (nam) và can ${canNu} (nữ) đối xung nhau theo bảng thiên can. Đây là một điểm chưa thuận ở tầng thiên can của tuổi ${nam} và tuổi ${nu}, cần cân nhắc thêm cùng các tầng còn lại.`,
  ],
  "binh-thuong": [
    (nam, nu, canNam, canNu) =>
      `Về thiên can, can ${canNam} (nam) và can ${canNu} (nữ) không thuộc cặp ngũ hợp nào, cũng không xung nhau — quan hệ thiên can ở mức bình thường.`,
    (nam, nu, canNam, canNu) =>
      `Xét thiên can, tuổi ${nam} (can ${canNam}) và tuổi ${nu} (can ${canNu}) trung tính với nhau: không phải cặp ngũ hợp, cũng không phải cặp xung. Nên xem thêm quan hệ con giáp và mệnh nạp âm để có cái nhìn đầy đủ.`,
    (nam, nu, canNam, canNu) =>
      `Can ${canNam} và can ${canNu} không nằm trong bảng ngũ hợp lẫn bảng xung của thiên can. Tầng thiên can giữa tuổi ${nam} và tuổi ${nu} vì vậy được xem là bình thường, không cộng cũng không trừ điểm.`,
  ],
};

export function luanGiaiThienCan(canChiNam: CanChi, canChiNu: CanChi, canPair: CanPairQuanHe, namNam: number, namNu: number): string {
  const variants = THIEN_CAN_TEXT[canPair];
  const fn = chonBienThe(variants, `can:${namNam}:${namNu}:${canPair}`);
  return fn(String(namNam), String(namNu), canChiNam.can, canChiNu.can);
}
