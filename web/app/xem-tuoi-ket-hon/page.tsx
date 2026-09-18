import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { KetHonYearPicker } from "@/components/KetHonYearPicker";
import { CHI_LIST, chiByIndex, tamHopGroup, tuHanhXungGroup } from "@/lib/tuoi";
import { kimLau } from "@/lib/xem-tuoi-ket-hon";

export const metadata: Metadata = {
  title: "Xem tuổi kết hôn: Kim Lâu, hợp tuổi vợ chồng | LịchÂm",
  description:
    "Xem tuổi kết hôn theo năm sinh: tuổi mụ nào phạm Kim Lâu, tam hợp - tứ hành xung 12 con giáp, và công cụ tra nhanh mức độ hợp nhau, năm cưới nên chọn.",
  alternates: { canonical: "/xem-tuoi-ket-hon/" },
};

const TAM_HOP_LABELS = ["Thân — Tý — Thìn (Thủy)", "Tỵ — Dậu — Sửu (Kim)", "Dần — Ngọ — Tuất (Hỏa)", "Hợi — Mão — Mùi (Mộc)"];
const XUNG_LABELS = ["Tý — Ngọ — Mão — Dậu", "Dần — Thân — Tỵ — Hợi", "Thìn — Tuất — Sửu — Mùi"];

const KIM_LAU_ROWS = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((du) => ({
  du,
  ...kimLau(du),
}));

export default function XemTuoiKetHonHubPage() {
  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Xem tuổi" />

        <div className="band">
          <div className="bg bg-luc" />
          <div className="band-in">
            <h1>Xem tuổi kết hôn: Kim Lâu và hợp tuổi vợ chồng</h1>
            <p>Tra Kim Lâu theo tuổi mụ cô dâu, xem con giáp và mệnh hai người có hợp nhau không, theo quan niệm dân gian.</p>
          </div>
        </div>

        <div className="body">
          <KetHonYearPicker title="Tra nhanh theo năm sinh" />

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t" style={{ textAlign: "center" }}>
                Kim Lâu là gì
              </span>
              <span className="rule" />
            </div>
            <p>
              Kim Lâu là một kiêng kỵ dân gian khi chọn năm cưới, tính theo <b>tuổi mụ</b> (năm xem trừ năm sinh cộng 1) của{" "}
              <b>cô dâu</b> — theo tục "lấy vợ xem tuổi đàn bà", Kim Lâu không xét đến tuổi chú rể. Cách tính: lấy tuổi mụ chia
              cho 9, xét số dư.
            </p>
            <table className="tuoitable">
              <thead>
                <tr>
                  <th>Tuổi mụ chia 9 dư</th>
                  <th>Có phạm Kim Lâu?</th>
                  <th>Loại</th>
                </tr>
              </thead>
              <tbody>
                {KIM_LAU_ROWS.map((r) => (
                  <tr key={r.du}>
                    <td data-k="Số dư">{r.du}</td>
                    <td data-k="Có phạm?">
                      {r.phamKimLau ? <span className="pill r">Phạm</span> : <span className="pill g">Không phạm</span>}
                    </td>
                    <td data-k="Loại">{r.loai ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: 12.5, color: "var(--ink-3)", textAlign: "center", marginTop: 8 }}>
              Ví dụ: cô dâu tuổi mụ 19 (19 chia 9 dư 1) thì phạm Kim Lâu Thân. Tuổi mụ 27 (chia hết cho 9, dư 0) thì không phạm.
            </p>
          </div>

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t" style={{ textAlign: "center" }}>
                Tam hợp và tứ hành xung 12 con giáp
              </span>
              <span className="rule" />
            </div>
            <div className="cols2">
              <div>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>Tam hợp (rất hợp)</p>
                <ul className="dotlist">
                  {TAM_HOP_LABELS.map((label) => (
                    <li key={label}>
                      {label} <span className="pill g">Hợp</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>Tứ hành xung (nên cân nhắc)</p>
                <ul className="dotlist">
                  {XUNG_LABELS.map((label) => (
                    <li key={label}>
                      {label} <span className="pill r">Xung</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--ink-3)", textAlign: "center", marginTop: 8 }}>
              Ngoài ra còn nhị hợp (lục hợp — từng cặp hai chi) và lục hại (mức xung nhẹ hơn tứ hành xung). Xem chi tiết ở trang{" "}
              <Link href="/tuoi">Xem tuổi</Link> theo từng con giáp.
            </p>
          </div>

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t" style={{ textAlign: "center" }}>
                Xem theo con giáp
              </span>
              <span className="rule" />
            </div>
            <div className="chips">
              {CHI_LIST.map((c) => {
                const tamHop = tamHopGroup(c.chiIndex)
                  .filter((i) => i !== c.chiIndex)
                  .map((i) => chiByIndex(i).ten)
                  .join(", ");
                const xung = tuHanhXungGroup(c.chiIndex)
                  .filter((i) => i !== c.chiIndex)
                  .map((i) => chiByIndex(i).ten)
                  .join(", ");
                return (
                  <Link className="chip" href={`/tuoi/${c.slug}`} key={c.slug} title={`Tam hợp: ${tamHop} · Xung: ${xung}`}>
                    Tuổi {c.ten}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
