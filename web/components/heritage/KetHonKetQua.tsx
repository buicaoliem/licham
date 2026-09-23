import Link from "next/link";
import type { NguHanh } from "@licham/core";
import { chiByIndex, hopMenh } from "@/lib/tuoi";
import {
  type CanPairQuanHe,
  type ChiPairQuanHe,
  type KetHonPairInfo,
  type MucTang,
  type QuanHeNguHanhCoChieu,
  hanhCuaCan,
  mucDoClassName,
  mucTangCanPair,
  mucTangChiPair,
  mucTangNguHanhCoChieu,
} from "@/lib/xem-tuoi-ket-hon";
import { luanGiaiConGiap, luanGiaiMenh, luanGiaiThienCan } from "@/lib/xem-tuoi-ket-hon-text";
import { Icon, type IconName } from "./Icon";

// Khối kết quả xem tuổi kết hôn. Chỉ trình bày lại kết quả của lib/xem-tuoi-ket-hon.ts
// (3 tầng con giáp, mệnh nạp âm, thiên can → mucDoHopNhau), không thêm yếu tố hay quy tắc mới.

export const MUC_TANG_LABEL: Record<MucTang, { cls: string; label: string }> = {
  tot: { cls: "pill g", label: "Tốt" },
  "binh-hoa": { cls: "pill k", label: "Bình hòa" },
  xau: { cls: "pill r", label: "Không tốt" },
};

const CHI_QUAN_HE: Record<ChiPairQuanHe, string> = {
  "tam-hop": "Cùng nhóm tam hợp",
  "nhi-hop": "Nhị hợp (lục hợp)",
  xung: "Xung đối (tứ hành xung)",
  hai: "Lục hại",
  "binh-hoa": "Không hợp, không xung hại",
};

function quanHeNguHanh(q: QuanHeNguHanhCoChieu, hanhNam: NguHanh, hanhNu: NguHanh): string {
  switch (q) {
    case "nam-sinh-nu":
      return `${hanhNam} sinh ${hanhNu} · chồng sinh vợ`;
    case "nu-sinh-nam":
      return `${hanhNu} sinh ${hanhNam} · vợ sinh chồng`;
    case "nam-khac-nu":
      return `${hanhNam} khắc ${hanhNu} · chồng khắc vợ`;
    case "nu-khac-nam":
      return `${hanhNu} khắc ${hanhNam} · vợ khắc chồng`;
    case "cung-hanh":
      return `Cùng hành ${hanhNam}`;
  }
}

function quanHeCan(q: CanPairQuanHe, hanhNam: NguHanh, hanhNu: NguHanh): string {
  return q === "can-hop" ? "Thiên can ngũ hợp" : quanHeNguHanh(q, hanhNam, hanhNu);
}

/** Câu giải thích mức độ, đúng theo quy tắc của mucDoHopNhau. */
function moTaMucDo(soTot: number, soXau: number): string {
  if (soXau >= 2) return `Có ${soXau} yếu tố không tốt — theo cách xét ở đây, cần cân nhắc thêm.`;
  if (soXau === 1) return "Có 1 yếu tố không tốt, nên mức hợp nhau dừng ở bình thường.";
  if (soTot >= 2) return `Có ${soTot} trong 3 yếu tố tốt và không yếu tố nào xấu.`;
  if (soTot === 1) return "Có 1 yếu tố tốt, hai yếu tố còn lại bình hòa.";
  return "Cả ba yếu tố đều bình hòa: không có điểm cộng, cũng không có điểm trừ.";
}

function joinVi(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} và ${items.at(-1)}`;
}

interface Factor {
  key: string;
  ten: string;
  icon: IconName;
  muc: MucTang;
  cap: string;
  quanHe: string;
}

export function KetHonKetQua({ info, className }: { info: KetHonPairInfo; className?: string }) {
  const { namNam, namNu, canChiNam, canChiNu } = info;
  const chiNam = chiByIndex(canChiNam.chiIndex).ten;
  const chiNu = chiByIndex(canChiNu.chiIndex).ten;
  const hMenhNam = hopMenh(canChiNam.napAm.element);
  const hMenhNu = hopMenh(canChiNu.napAm.element);

  const factors: Factor[] = [
    {
      key: "chi",
      ten: "Con giáp",
      icon: "yinyang",
      muc: mucTangChiPair(info.chiPair),
      cap: `${chiNam} — ${chiNu}`,
      quanHe: CHI_QUAN_HE[info.chiPair],
    },
    {
      key: "menh",
      ten: "Mệnh nạp âm",
      icon: "lotus",
      muc: mucTangNguHanhCoChieu(info.napAmPair),
      cap: `${canChiNam.napAm.name} — ${canChiNu.napAm.name}`,
      quanHe: quanHeNguHanh(info.napAmPair, canChiNam.napAm.element, canChiNu.napAm.element),
    },
    {
      key: "can",
      ten: "Thiên can",
      icon: "sun",
      muc: mucTangCanPair(info.canPair),
      cap: `${canChiNam.can} — ${canChiNu.can}`,
      quanHe: quanHeCan(info.canPair, hanhCuaCan(canChiNam.canIndex), hanhCuaCan(canChiNu.canIndex)),
    },
  ];
  const soTot = factors.filter((f) => f.muc === "tot").length;
  const soBinh = factors.filter((f) => f.muc === "binh-hoa").length;
  const soXau = factors.filter((f) => f.muc === "xau").length;
  const tenThuong = (m: MucTang) => factors.filter((f) => f.muc === m).map((f) => f.ten.toLowerCase());
  const ketLuan = [
    tenThuong("tot").length ? `${joinVi(tenThuong("tot"))} tốt` : "",
    tenThuong("binh-hoa").length ? `${joinVi(tenThuong("binh-hoa"))} bình hòa` : "",
    tenThuong("xau").length ? `${joinVi(tenThuong("xau"))} không tốt` : "",
  ].filter(Boolean);
  const mucDoHoa = info.mucDo.charAt(0).toUpperCase() + info.mucDo.slice(1);

  const luanGiai = [
    {
      f: factors[0]!,
      h: "Hai tuổi có xung nhau không",
      text: luanGiaiConGiap(canChiNam, canChiNu, info.chiPair, namNam, namNu),
      note: null as string | null,
    },
    {
      f: factors[1]!,
      h: "Mệnh có hợp nhau không",
      text: luanGiaiMenh(canChiNam, canChiNu, info.napAmPair, namNam, namNu),
      note: `Màu hợp mệnh ${canChiNam.napAm.name} (chồng): ${hMenhNam.mauHop.join(", ")}. Màu hợp mệnh ${canChiNu.napAm.name} (vợ): ${hMenhNu.mauHop.join(", ")}.`,
    },
    {
      f: factors[2]!,
      h: "Thiên can có hợp nhau không",
      text: luanGiaiThienCan(canChiNam, canChiNu, info.canPair, namNam, namNu),
      note: null,
    },
  ];

  return (
    <section className={["ch-card kh-result", className ?? ""].filter(Boolean).join(" ")} aria-labelledby="kh-result-h">
      <div className="kh-result-head">
        <h2 className="kh-sec-h" id="kh-result-h">
          Kết quả xem tuổi
        </h2>
        <p className="kh-sec-sub">
          Nam {namNam} ({canChiNam.name}) và nữ {namNu} ({canChiNu.name}) · xét con giáp, mệnh nạp âm, thiên can
        </p>
      </div>

      <div className={`kh-overview ${mucDoClassName(info.mucDo)}`}>
        <span className="kh-emblem" aria-hidden="true">
          <Icon name="clover" size={40} stroke={1.4} />
        </span>
        <div className="kh-ov-main">
          <div className="k">Mức độ hợp nhau</div>
          <div className="v">{mucDoHoa}</div>
          <p>{moTaMucDo(soTot, soXau)}</p>
        </div>
        <dl className="kh-tally" aria-label="Số yếu tố theo mức">
          <div className="t">
            <dt>Tốt</dt>
            <dd>{soTot}</dd>
          </div>
          <div className="b">
            <dt>Bình hòa</dt>
            <dd>{soBinh}</dd>
          </div>
          <div className="x">
            <dt>Không tốt</dt>
            <dd>{soXau}</dd>
          </div>
        </dl>
      </div>

      <ul className="kh-factors">
        {factors.map((f) => (
          <li className={`kh-factor m-${f.muc}`} key={f.key}>
            <div className="kh-factor-h">
              <span className="ic" aria-hidden="true">
                <Icon name={f.icon} size={18} />
              </span>
              <b>{f.ten}</b>
              <span className={MUC_TANG_LABEL[f.muc].cls}>{MUC_TANG_LABEL[f.muc].label}</span>
            </div>
            <div className="pair">{f.cap}</div>
            <div className="rel">{f.quanHe}</div>
          </li>
        ))}
      </ul>

      <div className="kh-lg">
        <h3 className="kh-lg-h">Luận giải từng yếu tố</h3>
        <ol className="kh-lg-list">
          {luanGiai.map((l, i) => (
            <li key={l.f.key}>
              <span className="n" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <div className="kh-lg-t">
                  <h4>{l.h}</h4>
                  <span className={MUC_TANG_LABEL[l.f.muc].cls}>
                    {l.f.ten}: {MUC_TANG_LABEL[l.f.muc].label}
                  </span>
                </div>
                <p>{l.text}</p>
                {l.note && <p className="kh-note">{l.note}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="kh-conclude">
        <span className="ic" aria-hidden="true">
          <Icon name="yinyang" size={26} />
        </span>
        <div className="kh-cl-body">
          <b className="t">Kết luận</b>
          <p>
            Mức <b>{info.mucDo}</b>: {ketLuan.join("; ")}. Kim Lâu không tính vào mức hợp nhau mà dùng để chọn năm cưới — xem khối năm cưới
            bên dưới.
          </p>
        </div>
        <Link className="ch-btn ghost" href="/xem-ngay-tot/cuoi-hoi/">
          Xem ngày tốt cưới hỏi
          <Icon name="arrow" size={16} />
        </Link>
      </div>
    </section>
  );
}
