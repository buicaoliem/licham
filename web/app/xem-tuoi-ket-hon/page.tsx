import type { Metadata } from "next";
import Link from "next/link";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { KetHonYearPicker } from "@/components/KetHonYearPicker";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { ConGiapArt } from "@/components/heritage/ConGiapArt";
import { Icon, type IconName } from "@/components/heritage/Icon";
import { KET_HON_STEPS, KetHonLegend, XemTuoiFormCard, XemTuoiRelated, XemTuoiSteps } from "@/components/heritage/KetHonParts";
import { CHI_LIST, chiByIndex, tamHopGroup, tuHanhXungGroup } from "@/lib/tuoi";
import { kimLau, namBatDauMacDinh } from "@/lib/xem-tuoi-ket-hon";

export const metadata: Metadata = {
  title: "Xem tuổi kết hôn: Kim Lâu, hợp tuổi vợ chồng | LịchÂm",
  description:
    "Xem tuổi kết hôn theo năm sinh: tuổi mụ nào phạm Kim Lâu, tam hợp - tứ hành xung 12 con giáp, và công cụ tra nhanh mức độ hợp nhau, năm cưới nên chọn.",
  alternates: { canonical: "/xem-tuoi-ket-hon/" },
};

const TAM_HOP: { chi: string; hanh: string }[] = [
  { chi: "Thân — Tý — Thìn", hanh: "Thủy" },
  { chi: "Tỵ — Dậu — Sửu", hanh: "Kim" },
  { chi: "Dần — Ngọ — Tuất", hanh: "Hỏa" },
  { chi: "Hợi — Mão — Mùi", hanh: "Mộc" },
];
const XUNG_LABELS = ["Tý — Ngọ — Mão — Dậu", "Dần — Thân — Tỵ — Hợi", "Thìn — Tuất — Sửu — Mùi"];

const KIM_LAU_ROWS = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((du) => ({ du, ...kimLau(du) }));

/** Cách xếp từng yếu tố — đúng theo mucTangChiPair / mucTangNguHanhCoChieu / mucTangCanPair. */
const CACH_XET: { ten: string; icon: IconName; tot: string; binh: string; xau: string }[] = [
  { ten: "Con giáp", icon: "yinyang", tot: "Tam hợp, nhị hợp", binh: "Không hợp, không xung hại", xau: "Xung đối, lục hại" },
  { ten: "Mệnh nạp âm", icon: "lotus", tot: "Mệnh này sinh mệnh kia", binh: "Cùng hành", xau: "Mệnh này khắc mệnh kia" },
  { ten: "Thiên can", icon: "sun", tot: "Ngũ hợp, hoặc hành can này sinh hành can kia", binh: "Cùng hành", xau: "Hành can này khắc hành can kia" },
];

export default function XemTuoiKetHonHubPage() {
  const namMacDinh = namBatDauMacDinh();
  return (
    <ChShell activeMenu="Xem tuổi" className="ch-tu ch-kh">
      <ChHero
        className="kh-hero"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Xem tuổi", href: "/tuoi/" }, { label: "Xem tuổi kết hôn" }]}
        crumbJsonLd={false}
        title="Xem tuổi kết hôn: Kim Lâu và hợp tuổi vợ chồng"
        lead="Tra Kim Lâu theo tuổi mụ cô dâu, xem con giáp và mệnh hai người có hợp nhau không, theo quan niệm dân gian."
      />

      <div className="ch-wrap ch-main ch-layout">
        <div className="ch-stack">
          <XemTuoiFormCard current="ket-hon" desc="Xem tuổi vợ chồng có hợp nhau không và năm nào cưới không phạm Kim Lâu của cô dâu.">
            <KetHonYearPicker namMacDinh={namMacDinh} />
          </XemTuoiFormCard>

          <section className="ch-card" aria-labelledby="kh-cach-h">
            <h2 className="kh-sec-h" id="kh-cach-h">
              Cách xét mức độ hợp nhau
            </h2>
            <p className="kh-sec-sub">Ba yếu tố độc lập, mỗi yếu tố xếp một trong ba mức. Kim Lâu không nằm trong đây mà dùng để chọn năm cưới.</p>
            <div className="kh-rules">
              {CACH_XET.map((c) => (
                <div className="kh-rule" key={c.ten}>
                  <div className="kh-rule-h">
                    <span className="ic" aria-hidden="true">
                      <Icon name={c.icon} size={18} />
                    </span>
                    <b>{c.ten}</b>
                  </div>
                  <dl>
                    <div>
                      <dt className="pill g">Tốt</dt>
                      <dd>{c.tot}</dd>
                    </div>
                    <div>
                      <dt className="pill k">Bình hòa</dt>
                      <dd>{c.binh}</dd>
                    </div>
                    <div>
                      <dt className="pill r">Không tốt</dt>
                      <dd>{c.xau}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          </section>

          <section className="ch-card" aria-labelledby="kh-kl-h">
            <h2 className="kh-sec-h" id="kh-kl-h">
              Kim Lâu là gì
            </h2>
            <div className="kh-prose">
              <p>
                Kim Lâu là một kiêng kỵ dân gian khi chọn năm cưới, tính theo <b>tuổi mụ</b> (năm xem trừ năm sinh cộng 1) của <b>cô dâu</b> —
                theo tục &ldquo;lấy vợ xem tuổi đàn bà&rdquo;, Kim Lâu không xét đến tuổi chú rể. Cách tính: lấy tuổi mụ chia cho 9, xét số
                dư.
              </p>
            </div>
            <ol className="kh-kl" aria-label="Tuổi mụ chia 9, theo số dư">
              {KIM_LAU_ROWS.map((r) => (
                <li key={r.du} className={r.phamKimLau ? "pham" : "ok"}>
                  <span className="du">
                    Dư <b>{r.du}</b>
                  </span>
                  <span className="kq">{r.phamKimLau ? r.loai : "Không phạm"}</span>
                </li>
              ))}
            </ol>
            <p className="kh-note">
              Ví dụ: cô dâu tuổi mụ 19 (19 chia 9 dư 1) thì phạm Kim Lâu Thân. Tuổi mụ 27 (chia hết cho 9, dư 0) thì không phạm.
            </p>
          </section>

          <section className="ch-card" aria-labelledby="kh-th-h">
            <h2 className="kh-sec-h" id="kh-th-h">
              Tam hợp và tứ hành xung 12 con giáp
            </h2>
            <div className="kh-groups">
              <div>
                <h3 className="kh-groups-h g">Tam hợp (rất hợp)</h3>
                <ul>
                  {TAM_HOP.map((t) => (
                    <li key={t.chi}>
                      <span>{t.chi}</span>
                      <span className="pill g">{t.hanh}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="kh-groups-h r">Tứ hành xung (nên cân nhắc)</h3>
                <ul>
                  {XUNG_LABELS.map((label) => (
                    <li key={label}>
                      <span>{label}</span>
                      <span className="pill r">Xung</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="kh-note">
              Ngoài ra còn nhị hợp (lục hợp — từng cặp hai chi) và lục hại (mức xung nhẹ hơn tứ hành xung). Xem chi tiết ở trang{" "}
              <Link href="/tuoi/">Xem tuổi</Link> theo từng con giáp.
            </p>
          </section>

          <section className="ch-card" aria-labelledby="kh-cg-h">
            <h2 className="kh-sec-h" id="kh-cg-h">
              Xem theo con giáp
            </h2>
            <ul className="kh-cg">
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
                  <li key={c.slug}>
                    <Link href={`/tuoi/${c.slug}/`}>
                      <ConGiapArt chiSlug={c.slug} ten={c.ten} so={c.chiIndex + 1} className="kh-cg-art" />
                      <span className="tx">
                        <b>Tuổi {c.ten}</b>
                        <small>
                          Hợp {tamHop} · Xung {xung}
                        </small>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
          <TraditionalDisclaimer />
        </div>

        <aside className="ch-side">
          <XemTuoiSteps title="Hướng dẫn sử dụng" steps={KET_HON_STEPS} />
          <KetHonLegend />
          <XemTuoiRelated />
        </aside>
      </div>
    </ChShell>
  );
}
