import type { CanChi } from "@licham/core";
import { chiByIndex } from "@/lib/tuoi";
import type { ChiPairQuanHe, NapAmPairQuanHe } from "@/lib/xem-tuoi-ket-hon";

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
  return fn(String(namNam), String(namNu), canChiNam.name, canChiNu.name);
}

// ---------------------------------------------------------------------------
// Mục 5 — luận giải theo mệnh nạp âm (3 nhánh × 3 biến thể)
// ---------------------------------------------------------------------------

type NapAmVariant = (nam: string, nu: string, menhNam: string, menhNu: string, hanhNam: string, hanhNu: string) => string;

const NAP_AM_TEXT: Record<NapAmPairQuanHe, readonly NapAmVariant[]> = {
  "tuong-sinh": [
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Về mệnh, nam tuổi ${nam} mang mệnh ${menhNam} (hành ${hanhNam}), nữ tuổi ${nu} mang mệnh ${menhNu} (hành ${hanhNu}) — hai hành này tương sinh với nhau. Dân gian coi đây là một điểm cộng lớn, vì mệnh tương sinh thường được ví như hai người biết nâng đỡ nhau trong cuộc sống.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Mệnh ${menhNam} (${hanhNam}) của tuổi ${nam} và mệnh ${menhNu} (${hanhNu}) của tuổi ${nu} thuộc quan hệ tương sinh trong ngũ hành. Theo quan niệm phong thủy, đây là một trong những dấu hiệu tốt khi xét chuyện lâu dài giữa hai người.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Xét ngũ hành nạp âm: tuổi ${nam} mệnh ${menhNam}, tuổi ${nu} mệnh ${menhNu}, hai hành ${hanhNam} và ${hanhNu} sinh cho nhau. Đây là kiểu kết hợp mà dân gian gọi vui là "có qua có lại", mỗi người một phần giúp đỡ phần còn lại.`,
  ],
  "tuong-khac": [
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Về mệnh, nam tuổi ${nam} mang mệnh ${menhNam} (hành ${hanhNam}) trong khi nữ tuổi ${nu} mang mệnh ${menhNu} (hành ${hanhNu}) — hai hành này ở thế tương khắc. Đây là điểm nhiều người xem tuổi thường lưu ý thêm, dù không phải yếu tố quyết định duy nhất.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Mệnh ${menhNam} (${hanhNam}) của tuổi ${nam} và mệnh ${menhNu} (${hanhNu}) của tuổi ${nu} khắc nhau theo ngũ hành nạp âm. Dân gian cho rằng cặp mệnh khắc cần biết cách dung hòa nhiều hơn, nhưng vẫn có thể hóa giải bằng cách chọn màu sắc, hướng nhà hợp mệnh.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Xét ngũ hành: tuổi ${nam} mệnh ${menhNam}, tuổi ${nu} mệnh ${menhNu}; hai hành ${hanhNam} và ${hanhNu} thuộc quan hệ tương khắc. Đây là chi tiết đáng tham khảo, song mức độ hợp nhau cuối cùng còn phụ thuộc nhiều vào quan hệ con giáp và thực tế cuộc sống của hai người.`,
  ],
  "cung-hanh": [
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Về mệnh, nam tuổi ${nam} mệnh ${menhNam} và nữ tuổi ${nu} mệnh ${menhNu} tuy tên gọi khác nhau nhưng cùng thuộc hành ${hanhNam}. Cùng một hành thì không sinh cũng không khắc, dân gian xem là mức bình hòa về mệnh.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Mệnh ${menhNam} của tuổi ${nam} và mệnh ${menhNu} của tuổi ${nu} đều thuộc hành ${hanhNam}. Vì cùng hành nên quan hệ ngũ hành ở đây trung tính — không phải điểm cộng nhưng cũng không phải điều đáng lo.`,
    (nam, nu, menhNam, menhNu, hanhNam, hanhNu) =>
      `Xét ngũ hành nạp âm, tuổi ${nam} (mệnh ${menhNam}) và tuổi ${nu} (mệnh ${menhNu}) cùng chung hành ${hanhNam}. Với trường hợp cùng hành, yếu tố mệnh coi như huề nhau, nên nhìn thêm vào quan hệ con giáp ở mục trên để có cái nhìn đầy đủ hơn.`,
  ],
};

export function luanGiaiMenh(canChiNam: CanChi, canChiNu: CanChi, napAmPair: NapAmPairQuanHe, namNam: number, namNu: number): string {
  const variants = NAP_AM_TEXT[napAmPair];
  const fn = chonBienThe(variants, `napam:${namNam}:${namNu}:${napAmPair}`);
  return fn(String(namNam), String(namNu), canChiNam.napAm.name, canChiNu.napAm.name, canChiNam.napAm.element, canChiNu.napAm.element);
}
