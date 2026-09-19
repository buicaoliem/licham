import { canChiNamDuong } from "@licham/core";
import { YEAR_END, YEAR_START } from "@/lib/site-years";
import { getVietnamToday } from "@/lib/today";
import { CON_GIAP_LIST, type ConGiap, type QuanHe, quanHeVoiNgay } from "@/lib/tu-vi";
import { NAP_AM_MO_TA } from "@/lib/tuoi";
import { hashOnDinh } from "@/lib/xem-tuoi-ket-hon-text";
import { kimLau, tuoiMu } from "@/lib/xem-tuoi-ket-hon";
import { hoangOc, namPhamTamTai, tamTaiLabel } from "@/lib/xem-tuoi-xay-nha";

export const TU_VI_NAM_START = YEAR_START;
export const TU_VI_NAM_END = YEAR_END;

export function tuViNamTrongPhamVi(year: number): boolean {
  return Number.isInteger(year) && year >= TU_VI_NAM_START && year <= TU_VI_NAM_END;
}

export function tuViNamYears(): number[] {
  const years: number[] = [];
  for (let y = TU_VI_NAM_START; y <= TU_VI_NAM_END; y++) years.push(y);
  return years;
}

function chon<T>(bienThe: readonly T[], seed: string): T {
  const v = bienThe[hashOnDinh(seed) % bienThe.length];
  if (!v) throw new Error("Danh sách biến thể rỗng");
  return v;
}

type LuanFn = (ten: string, nam: number, canChiNam: string, napAm: string, hanh: string) => string;

const LUAN: Record<QuanHe, readonly LuanFn[]> = {
  trung: [
    (ten, nam, cc, nap, hanh) =>
      `Năm ${nam} (${cc}, mệnh ${nap}, hành ${hanh}) trùng chi với tuổi ${ten} — đây là năm tuổi, dân gian gọi là năm bổn mạng. Việc lớn thường được khuyên cân nhắc, không phải năm "mặc định tốt".`,
    (ten, nam, cc, nap, hanh) =>
      `Tuổi ${ten} gặp đúng chi năm ${nam} (${cc}). Nạp âm năm là ${nap} (hành ${hanh}), lấy theo can chi năm chứ không phải một hành chung cho mọi người tuổi ${ten}. Năm tuổi hay được nhắc khi xem hạn, cưới hỏi, xây nhà.`,
  ],
  xung: [
    (ten, nam, cc, nap, hanh) =>
      `Năm ${nam} ${cc} đứng xung chi với tuổi ${ten}. Mệnh năm là ${nap} (hành ${hanh}) — đây là nạp âm của năm ${nam}, khác mệnh từng người sinh năm ${ten} khác can. Dân gian coi năm xung là năm nên tránh việc lớn nếu còn chọn được.`,
    (ten, nam, cc, nap, hanh) =>
      `Tuổi ${ten} và năm ${nam} (${cc}) thuộc lục xung. ${nap} là mệnh nạp âm năm ${nam} (hành ${hanh}), không phải "tuổi ${ten} mệnh ${hanh}". Xung chi là luật 12 địa chi, tách khỏi ngũ hành nạp âm.`,
  ],
  hinh: [
    (ten, nam, cc, nap, hanh) =>
      `Năm ${nam} ${cc} hình với tuổi ${ten} theo tam hình. Nạp âm năm: ${nap}, hành ${hanh}. Hình nhẹ hơn xung nhưng vẫn được sách dân gian liệt kê riêng, không gộp vào một câu "xui cả năm".`,
    (ten, nam, cc, nap, hanh) =>
      `Tuổi ${ten} năm ${nam} rơi quan hệ hình (${cc}, ${nap}). Hành ${hanh} là của năm, không gán cho cả con giáp. Trang này không viết một đoạn rồi đổi tên 12 tuổi.`,
  ],
  hai: [
    (ten, nam, cc, nap, hanh) =>
      `Năm ${nam} ${cc} lục hại với tuổi ${ten}. Mệnh năm ${nap} (hành ${hanh}). Hại được coi nhẹ hơn xung; nhiều người vẫn làm việc lớn, chỉ lưu ý thêm.`,
    (ten, nam, cc, nap, hanh) =>
      `Tuổi ${ten} và ${cc} năm ${nam} là cặp hại. ${nap} mô tả nạp âm năm, hành ${hanh}. Không dùng hại để kết luận sức khỏe hay hôn nhân.`,
  ],
  "tam-hop": [
    (ten, nam, cc, nap, hanh) =>
      `Năm ${nam} ${cc} tam hợp với tuổi ${ten}. Nạp âm năm ${nap} (hành ${hanh}) — tam hợp là nhóm ba chi, khác ngũ hành nạp âm. Dân gian coi đây là năm dễ thuận việc hơn năm xung.`,
    (ten, nam, cc, nap, hanh) =>
      `Tuổi ${ten} nằm cùng bộ tam hợp với chi năm ${nam} (${cc}). ${nap} là mệnh của năm ${nam}, không phải mệnh mọi người tuổi ${ten}. Tam hợp không xóa Kim Lâu hay năm tuổi của từng người.`,
  ],
  "luc-hop": [
    (ten, nam, cc, nap, hanh) =>
      `Năm ${nam} ${cc} lục hợp (nhị hợp) với tuổi ${ten}. Nạp âm năm ${nap}, hành ${hanh}. Lục hợp là từng cặp chi, mức hợp vừa, không mạnh bằng tam hợp.`,
    (ten, nam, cc, nap, hanh) =>
      `Tuổi ${ten} và năm ${nam} (${cc}) là cặp lục hợp. ${nap} (hành ${hanh}) gắn can chi năm. Trang năm-tuổi này luận theo năm, khác tử vi hôm nay theo can chi ngày.`,
  ],
  "binh-hoa": [
    (ten, nam, cc, nap, hanh) =>
      `Năm ${nam} ${cc} không trùng, không xung, không hình hại, không hợp đặc biệt với tuổi ${ten} — bình hòa về chi. Việc xem thêm nằm ở nạp âm năm (${nap}, hành ${hanh}) và hạn từng người (Kim Lâu, tuổi mụ).`,
    (ten, nam, cc, nap, hanh) =>
      `Tuổi ${ten} năm ${nam} trung tính về địa chi. ${cc} mệnh ${nap} (hành ${hanh}) là số liệu năm, không copy một câu may mắn cho cả 12 con giáp.`,
  ],
};

export interface TuViNamInfo {
  giap: ConGiap;
  year: number;
  canChiNam: ReturnType<typeof canChiNamDuong>;
  quanHe: QuanHe;
  tamTai: boolean;
  namTuoi: boolean;
  luan: string;
  napAmMoTa: string;
  tamTaiNam: string;
  birthRows: { namSinh: number; canChi: string; tuoiMu: number; kimLau: string; hoangOc: string }[];
}

export function tuViNamInfo(giap: ConGiap, year: number): TuViNamInfo {
  const canChiNam = canChiNamDuong(year);
  const quanHe = quanHeVoiNgay(canChiNam.chiIndex, giap.chiIndex);
  const fn = chon(LUAN[quanHe], `tuvi:${giap.slug}:${year}:${quanHe}`);
  const today = getVietnamToday();
  const birthYears: number[] = [];
  for (let y = Math.min(today.year, year); birthYears.length < 4 && y >= year - 72; y--) {
    if (canChiNamDuong(y).chiIndex === giap.chiIndex) birthYears.push(y);
  }
  birthYears.reverse();

  return {
    giap,
    year,
    canChiNam,
    quanHe,
    tamTai: namPhamTamTai(giap.chiIndex, canChiNam.chiIndex),
    namTuoi: giap.chiIndex === canChiNam.chiIndex,
    luan: fn(giap.ten, year, canChiNam.name, canChiNam.napAm.name, canChiNam.napAm.element),
    napAmMoTa: NAP_AM_MO_TA[canChiNam.napAm.name] ?? "",
    tamTaiNam: tamTaiLabel(giap.chiIndex),
    birthRows: birthYears.map((namSinh) => {
      const mu = tuoiMu(year, namSinh);
      const kl = kimLau(mu);
      const ho = hoangOc(mu);
      return {
        namSinh,
        canChi: canChiNamDuong(namSinh).name,
        tuoiMu: mu,
        kimLau: kl.phamKimLau ? (kl.loai ?? "Phạm") : "Không phạm",
        hoangOc: `${ho.name}${ho.tot ? " (tốt)" : " (xấu)"}`,
      };
    }),
  };
}

export function tuViNamParams(): { slug: string; nam: string }[] {
  const params: { slug: string; nam: string }[] = [];
  for (const cg of CON_GIAP_LIST) {
    for (const y of tuViNamYears()) params.push({ slug: cg.slug, nam: String(y) });
  }
  return params;
}


