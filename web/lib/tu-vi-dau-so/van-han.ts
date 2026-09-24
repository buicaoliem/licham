/**
 * Vận hạn theo năm xem (Nam phái): đại hạn 10 năm, tiểu hạn 1 năm, và các sao lưu niên
 * (Lưu Thái Tuế, Lưu Tang Môn, Lưu Bạch Hổ, Lưu Thiên Khốc/Hư, Lưu Lộc Tồn, Lưu Kình Dương, Lưu Đà La,
 * Lưu Thiên Mã, Tứ Hóa theo can năm xem). Tuổi dùng là tuổi mụ (năm xem − năm sinh âm + 1).
 */
import { canChiOfYear, type CanChi } from "@licham/core";
import { type Cung, type LaSo, locTonOfCan, mod12, thienMaOfChi } from "./engine";
import { HOA, type HoaName, STARS, type StarId, TU_HOA } from "./stars";

export interface SaoLuu {
  id: string;
  name: string;
  chi: number;
  tone: "cat" | "sat" | "trung";
}

export interface VanHanNam {
  namXem: number;
  canChiNamXem: CanChi;
  tuoi: number;
  /** Cung đại hạn đang đi (undefined khi tuổi nhỏ hơn tuổi khởi đại hạn đầu tiên). */
  daiHan?: Cung;
  tieuHan: Cung;
  /** Cung có Lưu Thái Tuế (cung chi năm xem). */
  luuThaiTue: Cung;
  saoLuu: SaoLuu[];
  tuHoaLuu: { hoa: HoaName; star: StarId; name: string; chi: number }[];
}

export class VanHanInputError extends Error {}

export function vanHanNam(laSo: LaSo, namXem: number): VanHanNam {
  const tuoi = namXem - laSo.birth.year + 1;
  if (!Number.isInteger(namXem) || tuoi < 1 || tuoi > 120) {
    throw new VanHanInputError("Năm xem cần từ năm sinh tới 120 tuổi.");
  }
  const cc = canChiOfYear(namXem);
  const Z = cc.chiIndex;
  const lt = locTonOfCan(cc.canIndex);
  const saoLuu: SaoLuu[] = [
    { id: "luuThaiTue", name: "L. Thái Tuế", chi: Z, tone: "trung" },
    { id: "luuTangMon", name: "L. Tang Môn", chi: mod12(Z + 2), tone: "sat" },
    { id: "luuBachHo", name: "L. Bạch Hổ", chi: mod12(Z + 8), tone: "sat" },
    { id: "luuThienKhoc", name: "L. Thiên Khốc", chi: mod12(6 - Z), tone: "sat" },
    { id: "luuThienHu", name: "L. Thiên Hư", chi: mod12(6 + Z), tone: "sat" },
    { id: "luuLocTon", name: "L. Lộc Tồn", chi: lt, tone: "cat" },
    { id: "luuKinhDuong", name: "L. Kình Dương", chi: mod12(lt + 1), tone: "sat" },
    { id: "luuDaLa", name: "L. Đà La", chi: mod12(lt - 1), tone: "sat" },
    { id: "luuThienMa", name: "L. Thiên Mã", chi: thienMaOfChi(Z), tone: "cat" },
  ];
  const tuHoaLuu = TU_HOA[cc.canIndex].map((star, i) => ({ hoa: HOA[i], star, name: STARS[star].name, chi: laSo.viTri[star] }));
  const daiHan = laSo.cung.find((c) => tuoi >= c.daiHan.tu && tuoi <= c.daiHan.den);
  const tieuHan = laSo.cung.find((c) => c.tieuHan.includes(tuoi)) as Cung;
  return { namXem, canChiNamXem: cc, tuoi, daiHan, tieuHan, luuThaiTue: laSo.cung[Z], saoLuu, tuHoaLuu };
}

/** Danh sách 12 đại hạn theo thứ tự tuổi. */
export function danhSachDaiHan(laSo: LaSo): Cung[] {
  return [...laSo.cung].sort((a, b) => a.daiHan.tu - b.daiHan.tu);
}
