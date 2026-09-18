"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { chiByIndex } from "@/lib/tuoi";
import {
  NAM_SINH_MAX,
  NAM_SINH_MIN,
  capNamSinhTrongPhamVi,
  ketHonSlug,
  tinhKetHonPairInfo,
} from "@/lib/xem-tuoi-ket-hon";
import { luanGiaiConGiap, luanGiaiMenh, luanGiaiThienCan } from "@/lib/xem-tuoi-ket-hon-text";

const NAM_OPTIONS = Array.from({ length: NAM_SINH_MAX - NAM_SINH_MIN + 1 }, (_, i) => NAM_SINH_MAX - i);

const MUC_DO_CLASS: Record<string, string> = {
  "rất hợp": "pill g",
  hợp: "pill g",
  "bình thường": "pill k",
  "cần cân nhắc": "pill r",
};

interface Props {
  initialNamNam?: number;
  initialNamNu?: number;
  title?: string;
}

/** Công cụ chọn năm sinh nam/nữ dùng chung cho trang chỉ mục và trang chi tiết cặp năm sinh. */
export function KetHonYearPicker({ initialNamNam = 1992, initialNamNu = 1994, title = "Xem nhanh cặp năm sinh khác" }: Props) {
  const router = useRouter();
  const [namNam, setNamNam] = useState(initialNamNam);
  const [namNu, setNamNu] = useState(initialNamNu);
  const [inlineResultKey, setInlineResultKey] = useState<string | null>(null);

  const inlineInfo = inlineResultKey ? tinhKetHonPairInfo(namNam, namNu) : null;

  function handleXem() {
    if (capNamSinhTrongPhamVi(namNam, namNu)) {
      setInlineResultKey(null);
      router.push(`/xem-tuoi-ket-hon/${ketHonSlug(namNam, namNu)}`);
      return;
    }
    // Ngoài phạm vi sinh tĩnh (chênh lệch tuổi > 15 hoặc năm ngoài 1980-2010):
    // trang /xem-tuoi-ket-hon/nam-*-nu-* của cặp này không tồn tại (dynamicParams = false
    // khiến Next.js trả 404 ngay ở tầng routing), nên tính và hiển thị kết quả tại chỗ,
    // không điều hướng.
    setInlineResultKey(`${namNam}-${namNu}-${Date.now()}`);
  }

  function handleReset() {
    setNamNam(initialNamNam);
    setNamNu(initialNamNu);
    setInlineResultKey(null);
  }

  const ngoaiPhamVi = !capNamSinhTrongPhamVi(namNam, namNu);

  return (
    <div className="box">
      <div className="box-h">
        <span className="rule" />
        <span className="t">{title}</span>
        <span className="rule" />
      </div>
      <div className="difld">
        <label htmlFor="ket-hon-nam">Năm sinh chú rể (nam)</label>
        <select id="ket-hon-nam" value={namNam} onChange={(e) => setNamNam(Number(e.target.value))}>
          {NAM_OPTIONS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div className="difld" style={{ marginBottom: 0 }}>
        <label htmlFor="ket-hon-nu">Năm sinh cô dâu (nữ)</label>
        <select id="ket-hon-nu" value={namNu} onChange={(e) => setNamNu(Number(e.target.value))}>
          {NAM_OPTIONS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      {ngoaiPhamVi && (
        <p style={{ fontSize: 12.5, color: "var(--ink-3)", margin: "8px 0 0" }}>
          Năm sinh ngoài {NAM_SINH_MIN}–{NAM_SINH_MAX}: kết quả sẽ hiển thị ngay tại đây thay vì mở trang riêng.
        </p>
      )}
      <div className="right">
        <button type="button" className="btn" onClick={handleReset}>
          Đặt lại
        </button>
        <button type="button" className="btn pri" onClick={handleXem}>
          Xem kết quả
        </button>
      </div>

      {inlineInfo && (
        <div style={{ marginTop: 16, borderTop: "1px solid var(--line)", paddingTop: 16 }}>
          <p style={{ textAlign: "center", margin: "0 0 8px" }}>
            Nam {inlineInfo.namNam} ({inlineInfo.canChiNam.name}) và nữ {inlineInfo.namNu} ({inlineInfo.canChiNu.name}):{" "}
            <span className={MUC_DO_CLASS[inlineInfo.mucDo]}>{inlineInfo.mucDo}</span>
          </p>
          <p style={{ fontSize: 13.5 }}>{luanGiaiConGiap(inlineInfo.canChiNam, inlineInfo.canChiNu, inlineInfo.chiPair, inlineInfo.namNam, inlineInfo.namNu)}</p>
          <p style={{ fontSize: 13.5 }}>{luanGiaiMenh(inlineInfo.canChiNam, inlineInfo.canChiNu, inlineInfo.napAmPair, inlineInfo.namNam, inlineInfo.namNu)}</p>
          <p style={{ fontSize: 13.5 }}>{luanGiaiThienCan(inlineInfo.canChiNam, inlineInfo.canChiNu, inlineInfo.canPair, inlineInfo.namNam, inlineInfo.namNu)}</p>
          {inlineInfo.namCuoiGanNhat && (
            <p style={{ fontSize: 13.5, textAlign: "center" }}>
              Năm cưới gần nhất nên chọn: <b>{inlineInfo.namCuoiGanNhat.nam}</b> (tuổi mụ cô dâu {inlineInfo.namCuoiGanNhat.tuoiMuCoDau}, không phạm Kim Lâu).
            </p>
          )}
          <p style={{ fontSize: 12, color: "var(--ink-3)", textAlign: "center" }}>
            Con giáp: {chiByIndex(inlineInfo.canChiNam.chiIndex).ten} — {chiByIndex(inlineInfo.canChiNu.chiIndex).ten}. Chỉ mang tính tham khảo dân gian.
          </p>
        </div>
      )}
    </div>
  );
}
