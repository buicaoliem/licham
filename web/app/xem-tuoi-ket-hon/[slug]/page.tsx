import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareButton } from "@/components/ShareButton";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { KetHonYearPicker } from "@/components/KetHonYearPicker";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { Icon } from "@/components/heritage/Icon";
import { KetHonLegend, XemTuoiRelated, XemTuoiTabs } from "@/components/heritage/KetHonParts";
import { buildShareUrl } from "@/lib/share";
import { chiByIndex, hopMenh } from "@/lib/tuoi";
import {
  NAM_SINH_MAX,
  NAM_SINH_MIN,
  capNamSinhTrongPhamVi,
  ketHonSlug,
  type MucTang,
  mucDoClassName,
  mucTangCanPair,
  mucTangChiPair,
  mucTangNguHanhCoChieu,
  parseKetHonSlug,
  tinhKetHonPairInfo,
} from "@/lib/xem-tuoi-ket-hon";
import { luanGiaiConGiap, luanGiaiMenh, luanGiaiThienCan } from "@/lib/xem-tuoi-ket-hon-text";

// Sinh MỌI cặp năm sinh trong khoảng 1980–2010 (961 trang), không giới hạn chênh lệch tuổi —
// xem lý do ở comment của capNamSinhTrongPhamVi trong lib/xem-tuoi-ket-hon.ts.
function allValidPairs(): { namNam: number; namNu: number }[] {
  const pairs: { namNam: number; namNu: number }[] = [];
  for (let namNam = NAM_SINH_MIN; namNam <= NAM_SINH_MAX; namNam++) {
    for (let namNu = NAM_SINH_MIN; namNu <= NAM_SINH_MAX; namNu++) {
      pairs.push({ namNam, namNu });
    }
  }
  return pairs;
}

export function generateStaticParams() {
  return allValidPairs().map(({ namNam, namNu }) => ({ slug: ketHonSlug(namNam, namNu) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseKetHonSlug(slug);
  if (!parsed || !capNamSinhTrongPhamVi(parsed.namNam, parsed.namNu)) return {};
  const { namNam, namNu } = parsed;
  return {
    title: `Nam ${namNam} nữ ${namNu} có hợp nhau không? Xem tuổi kết hôn | LịchÂm`,
    description: `Xem tuổi kết hôn nam sinh ${namNam} và nữ sinh ${namNu}: mức độ hợp con giáp và mệnh, tra Kim Lâu, gợi ý năm cưới hợp tuổi cô dâu.`,
    alternates: { canonical: `/xem-tuoi-ket-hon/${slug}/` },
  };
}

const MUC_TANG_PILL: Record<MucTang, { cls: string; label: string }> = {
  tot: { cls: "pill g", label: "Tốt" },
  "binh-hoa": { cls: "pill k", label: "Bình hòa" },
  xau: { cls: "pill r", label: "Không tốt" },
};

function TangPill({ muc }: { muc: MucTang }) {
  const p = MUC_TANG_PILL[muc];
  return <span className={p.cls}>{p.label}</span>;
}

function similarPairs(namNam: number, namNu: number): { namNam: number; namNu: number }[] {
  const candidates: { namNam: number; namNu: number }[] = [
    { namNam: namNam - 1, namNu },
    { namNam: namNam + 1, namNu },
    { namNam, namNu: namNu - 1 },
    { namNam, namNu: namNu + 1 },
    { namNam: namNam - 1, namNu: namNu - 1 },
    { namNam: namNam + 1, namNu: namNu + 1 },
    { namNam: namNam - 2, namNu },
    { namNam, namNu: namNu + 2 },
  ];
  const seen = new Set<string>();
  const result: { namNam: number; namNu: number }[] = [];
  for (const c of candidates) {
    if (c.namNam === namNam && c.namNu === namNu) continue;
    if (!capNamSinhTrongPhamVi(c.namNam, c.namNu)) continue;
    const key = `${c.namNam}-${c.namNu}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(c);
    if (result.length >= 6) break;
  }
  return result;
}

export default async function XemTuoiKetHonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsed = parseKetHonSlug(slug);
  if (!parsed || !capNamSinhTrongPhamVi(parsed.namNam, parsed.namNu)) notFound();
  const { namNam, namNu } = parsed;

  const info = tinhKetHonPairInfo(namNam, namNu);
  const hMenhNam = hopMenh(info.canChiNam.napAm.element);
  const hMenhNu = hopMenh(info.canChiNu.napAm.element);
  const chiTenNam = chiByIndex(info.canChiNam.chiIndex).ten;
  const chiTenNu = chiByIndex(info.canChiNu.chiIndex).ten;
  const similar = similarPairs(namNam, namNu);
  const mucDoCls = mucDoClassName(info.mucDo);
  const textConGiap = luanGiaiConGiap(info.canChiNam, info.canChiNu, info.chiPair, namNam, namNu);
  const textMenh = luanGiaiMenh(info.canChiNam, info.canChiNu, info.napAmPair, namNam, namNu);
  const textThienCan = luanGiaiThienCan(info.canChiNam, info.canChiNu, info.canPair, namNam, namNu);

  return (
    <ChShell activeMenu="Xem tuổi">
      <ChHero
        crumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Xem tuổi kết hôn", href: "/xem-tuoi-ket-hon/" },
          { label: `Nam ${namNam} · Nữ ${namNu}` },
        ]}
        crumbJsonLd={false}
        eyebrow={`${info.canChiNam.name} — ${info.canChiNu.name}`}
        title={`Nam ${namNam} và nữ ${namNu} có hợp nhau không?`}
        lead={
          <>
            Nam tuổi {chiTenNam} ({info.canChiNam.name}, mệnh {info.canChiNam.napAm.name}) và nữ tuổi {chiTenNu} ({info.canChiNu.name}, mệnh{" "}
            {info.canChiNu.napAm.name}).
          </>
        }
      >
        <ShareButton
          url={buildShareUrl(`/xem-tuoi-ket-hon/${slug}/`)}
          title={`Nam ${namNam} và nữ ${namNu}`}
          text={`Nam ${namNam} và nữ ${namNu} có hợp nhau không? Mức độ hợp: ${info.mucDo} – xem chi tiết tại Lịch Âm.`}
        />
      </ChHero>

      <div className="ch-wrap ch-main ch-layout">
        <div className="ch-stack">
          <section className="ch-card">
            <XemTuoiTabs current="ket-hon" exact={false} />
            <KetHonYearPicker initialNamNam={namNam} initialNamNu={namNu} />
          </section>

          <section className="ch-card">
            <div className="ch-card-h">
              <h2 className="ch-h2">Kết quả xem tuổi</h2>
              <p className="ch-sub">
                Nam {namNam} ({info.canChiNam.name}) và nữ {namNu} ({info.canChiNu.name})
              </p>
            </div>

            <div className={`kh-overview ${mucDoCls}`}>
              <span className="kh-emblem" aria-hidden="true">
                <Icon name="clover" size={40} stroke={1.4} />
              </span>
              <div>
                <div className="k">Mức độ hợp nhau</div>
                <div className="v">{info.mucDo.charAt(0).toUpperCase() + info.mucDo.slice(1)}</div>
                <p>Xét trên ba yếu tố: con giáp, mệnh nạp âm và thiên can.</p>
              </div>
            </div>

            <div className="kh-factors">
              <div className="kh-factor">
                <div className="kh-factor-h">
                  <b>Con giáp</b>
                  <TangPill muc={mucTangChiPair(info.chiPair)} />
                </div>
                <div className="pair">
                  {chiTenNam} — {chiTenNu}
                </div>
                <h3 className="ch-h3" style={{ fontSize: 15, margin: "0 0 4px" }}>
                  Hai tuổi có xung nhau không
                </h3>
                <p>{textConGiap}</p>
              </div>
              <div className="kh-factor">
                <div className="kh-factor-h">
                  <b>Mệnh</b>
                  <TangPill muc={mucTangNguHanhCoChieu(info.napAmPair)} />
                </div>
                <div className="pair">
                  {info.canChiNam.napAm.name} — {info.canChiNu.napAm.name}
                </div>
                <h3 className="ch-h3" style={{ fontSize: 15, margin: "0 0 4px" }}>
                  Mệnh có hợp nhau không
                </h3>
                <p>{textMenh}</p>
                <p style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 8 }}>
                  Màu hợp mệnh {info.canChiNam.napAm.name} (chồng): {hMenhNam.mauHop.join(", ")}. Màu hợp mệnh {info.canChiNu.napAm.name}{" "}
                  (vợ): {hMenhNu.mauHop.join(", ")}.
                </p>
              </div>
              <div className="kh-factor">
                <div className="kh-factor-h">
                  <b>Thiên can</b>
                  <TangPill muc={mucTangCanPair(info.canPair)} />
                </div>
                <div className="pair">
                  {info.canChiNam.can} — {info.canChiNu.can}
                </div>
                <h3 className="ch-h3" style={{ fontSize: 15, margin: "0 0 4px" }}>
                  Thiên can có hợp nhau không
                </h3>
                <p>{textThienCan}</p>
              </div>
            </div>

            <div className="kh-conclude">
              <b className="t">Năm cưới</b>
              {info.namCuoiGanNhat ? (
                <p>
                  Năm cưới gần nhất nên chọn: <b>{info.namCuoiGanNhat.nam}</b> (tuổi mụ cô dâu {info.namCuoiGanNhat.tuoiMuCoDau}, không phạm
                  Kim Lâu{info.lyDoBoQuaNamCuoi ? `; ${info.lyDoBoQuaNamCuoi}` : ""}).
                </p>
              ) : (
                <p>Cả 5 năm tới đều phạm Kim Lâu với tuổi cô dâu — xem bảng chi tiết bên dưới để cân nhắc thêm.</p>
              )}
              <Link className="ch-btn ghost" href="/xem-ngay-tot/cuoi-hoi/">
                Xem ngày tốt cưới hỏi
                <Icon name="arrow" size={16} />
              </Link>
            </div>
          </section>

          <div className="box">
            <div className="box-h">
              <span className="rule" />
              <span className="t">5 năm cưới sắp tới, xét theo tuổi cô dâu</span>
              <span className="rule" />
            </div>
            <table className="tuoitable">
              <thead>
                <tr>
                  <th>Năm</th>
                  <th>Tuổi mụ cô dâu</th>
                  <th>Kim Lâu</th>
                  <th>Kết luận</th>
                </tr>
              </thead>
              <tbody>
                {info.bangNamCuoi.map((r) => (
                  <tr key={r.nam}>
                    <td data-k="Năm">{r.nam}</td>
                    <td data-k="Tuổi mụ cô dâu">{r.tuoiMuCoDau}</td>
                    <td data-k="Kim Lâu">
                      {r.kimLau.phamKimLau ? <span className="pill r">{r.kimLau.loai}</span> : <span className="pill g">Không phạm</span>}
                    </td>
                    <td data-k="Kết luận">
                      {r.nenHayTranh === "nên" ? <span className="pill g">Nên</span> : <span className="pill r">Nên cân nhắc</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 10 }}>
              Kim Lâu chỉ xét trên tuổi mụ của cô dâu, theo tục &ldquo;lấy vợ xem tuổi đàn bà&rdquo;. Chỉ mang tính tham khảo dân gian.
            </p>
          </div>

          <div className="box">
            <div className="box-h">
              <span className="rule" />
              <span className="t">Các cặp năm sinh gần đây</span>
              <span className="rule" />
            </div>
            <div className="chips">
              {similar.map((p) => (
                <Link className="chip" href={`/xem-tuoi-ket-hon/${ketHonSlug(p.namNam, p.namNu)}/`} key={`${p.namNam}-${p.namNu}`}>
                  Nam {p.namNam} · Nữ {p.namNu}
                </Link>
              ))}
              <Link className="chip hot" href="/xem-ngay-tot/cuoi-hoi/">
                Xem ngày tốt cưới hỏi ›
              </Link>
            </div>
          </div>
          <TraditionalDisclaimer />
        </div>

        <aside className="ch-side">
          <KetHonLegend />
          <XemTuoiRelated />
        </aside>
      </div>
    </ChShell>
  );
}
