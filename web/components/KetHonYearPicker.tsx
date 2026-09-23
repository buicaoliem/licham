"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { canChiNamDuong } from "@licham/core";
import { KetHonKetQua } from "@/components/heritage/KetHonKetQua";
import { Icon, type IconName } from "@/components/heritage/Icon";
import { KetHonNamCuoi } from "@/components/KetHonNamCuoi";
import { namXemHash, setNamXem, useNamXem } from "@/components/ketHonNamXem";
import { NAM_SINH_MAX, NAM_SINH_MIN, capNamSinhTrongPhamVi, ketHonSlug, tinhKetHonPairInfo } from "@/lib/xem-tuoi-ket-hon";

const NAM_OPTIONS = Array.from({ length: NAM_SINH_MAX - NAM_SINH_MIN + 1 }, (_, i) => NAM_SINH_MAX - i);

interface Props {
  initialNamNam?: number;
  initialNamNu?: number;
  /** Năm bắt đầu mặc định của bảng năm cưới (namBatDauMacDinh, tính ở server lúc dựng trang). */
  namMacDinh: number;
}

/** "Canh Ngọ · Lộ Bàng Thổ" — can chi và mệnh nạp âm của năm sinh đang chọn. */
function canChiMenh(nam: number): string {
  const cc = canChiNamDuong(nam);
  return `${cc.name} · ${cc.napAm.name}`;
}

function Field({
  id,
  label,
  icon,
  hint,
  children,
}: {
  id: string;
  label: ReactNode;
  icon: IconName;
  hint: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="ch-field kh-field">
      <label htmlFor={id}>{label}</label>
      <div className="kh-sel">
        <Icon name={icon} size={18} />
        {children}
      </div>
      <small>{hint}</small>
    </div>
  );
}

/** Form chọn năm sinh nam/nữ (và năm xem cưới) dùng chung cho trang chỉ mục và trang chi tiết cặp năm sinh. */
export function KetHonYearPicker({ initialNamNam = 1992, initialNamNu = 1994, namMacDinh }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const hashNam = useNamXem();
  const [namNam, setNamNam] = useState(initialNamNam);
  const [namNu, setNamNu] = useState(initialNamNu);
  const [namXem, setNamXemState] = useState<number | null>(null);
  const [inlineKey, setInlineKey] = useState<string | null>(null);

  // Năm xem đang có trên URL (#nam-xem-YYYY) hiện lại trong ô chọn.
  useEffect(() => {
    setNamXemState(hashNam);
  }, [hashNam]);

  const namXemOptions: number[] = [];
  for (let y = namMacDinh - 1; y <= namMacDinh + 10; y++) namXemOptions.push(y);
  if (namXem !== null && !namXemOptions.includes(namXem)) namXemOptions.push(namXem);
  namXemOptions.sort((a, b) => a - b);

  const inlineInfo = inlineKey ? tinhKetHonPairInfo(namNam, namNu, namXem ?? undefined) : null;

  function handleXem() {
    if (capNamSinhTrongPhamVi(namNam, namNu)) {
      setInlineKey(null);
      const path = `/xem-tuoi-ket-hon/${ketHonSlug(namNam, namNu)}/`;
      if (path.replace(/\/$/, "") === pathname.replace(/\/$/, "")) {
        // Cùng cặp năm sinh: chỉ đổi năm xem rồi cuộn tới khối năm cưới.
        setNamXem(namXem);
        document.getElementById("nam-cuoi")?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      router.push(namXem === null ? path : path + namXemHash(namXem));
      return;
    }
    // Ngoài phạm vi sinh tĩnh (năm ngoài 1980-2010): trang /xem-tuoi-ket-hon/nam-*-nu-* của cặp
    // này không tồn tại (dynamicParams = false), nên tính và hiển thị kết quả tại chỗ.
    setInlineKey(`${namNam}-${namNu}-${Date.now()}`);
  }

  return (
    <>
      <div className="kh-form">
        <Field id="ket-hon-nam" label="Năm sinh nam" icon="user" hint={canChiMenh(namNam)}>
          <select id="ket-hon-nam" value={namNam} onChange={(e) => setNamNam(Number(e.target.value))}>
            {NAM_OPTIONS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </Field>
        <Field id="ket-hon-nu" label="Năm sinh nữ" icon="user" hint={canChiMenh(namNu)}>
          <select id="ket-hon-nu" value={namNu} onChange={(e) => setNamNu(Number(e.target.value))}>
            {NAM_OPTIONS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="ket-hon-xem"
          label={
            <>
              Năm xem cưới <span className="opt">(tùy chọn)</span>
            </>
          }
          icon="calendar"
          hint={namXem === null ? `Tự động: từ năm ${namMacDinh}` : `${canChiNamDuong(namXem).name} · 5 năm từ ${namXem}`}
        >
          <select
            id="ket-hon-xem"
            value={namXem ?? ""}
            onChange={(e) => setNamXemState(e.target.value === "" ? null : Number(e.target.value))}
          >
            <option value="">Tự động</option>
            {namXemOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </Field>
        <button type="button" className="ch-btn pri kh-go" onClick={handleXem}>
          <Icon name="yinyang" size={19} />
          Xem kết quả
        </button>
      </div>

      {inlineInfo && (
        <div className="kh-inline">
          <KetHonKetQua info={inlineInfo} />
          <KetHonNamCuoi
            namNam={inlineInfo.namNam}
            namNu={inlineInfo.namNu}
            initialRows={inlineInfo.bangNamCuoi}
            namMacDinh={inlineInfo.bangNamCuoi[0]!.nam}
          />
        </div>
      )}
    </>
  );
}
