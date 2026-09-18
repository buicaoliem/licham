import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { KetHonYearPicker } from "@/components/KetHonYearPicker";
import { chiByIndex, hopMenh } from "@/lib/tuoi";
import {
  NAM_SINH_MAX,
  NAM_SINH_MIN,
  capNamSinhTrongPhamVi,
  ketHonSlug,
  mucDoClassName,
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
    <div className="outer">
      <div className="site">
        <Header activeMenu="Xem tuổi" />

        <div className="band">
          <div className="bg bg-luc" />
          <div className="band-in">
            <div className="kh-crumb">
              <Link href="/xem-tuoi-ket-hon">Xem tuổi kết hôn</Link> › Nam {namNam} · Nữ {namNu}
            </div>
            <span className="tuoibadge">
              {info.canChiNam.name} — {info.canChiNu.name}
            </span>
            <h1>Nam {namNam} và nữ {namNu} có hợp nhau không?</h1>
            <p>
              Nam tuổi {chiTenNam} ({info.canChiNam.name}, mệnh {info.canChiNam.napAm.name}) và nữ tuổi {chiTenNu} ({info.canChiNu.name}, mệnh{" "}
              {info.canChiNu.napAm.name}).
            </p>
          </div>
        </div>

        <div className="body">
          <div className="kh-answer">
            <div style={{ fontSize: 13, color: "var(--ink-3)" }}>Mức độ hợp nhau</div>
            <div className={`kh-mucdo ${mucDoCls}`}>{info.mucDo.charAt(0).toUpperCase() + info.mucDo.slice(1)}</div>
            {info.namCuoiGanNhat ? (
              <p className="kh-nam-cuoi">
                Năm cưới gần nhất nên chọn: <b>{info.namCuoiGanNhat.nam}</b> (tuổi mụ cô dâu {info.namCuoiGanNhat.tuoiMuCoDau}, không phạm Kim Lâu
                {info.lyDoBoQuaNamCuoi ? `; ${info.lyDoBoQuaNamCuoi}` : ""}).
              </p>
            ) : (
              <p className="kh-nam-cuoi">Cả 5 năm tới đều phạm Kim Lâu với tuổi cô dâu — xem bảng chi tiết bên dưới để cân nhắc thêm.</p>
            )}
          </div>

          <div className="box">
            <div className="box-h">
              <span className="rule" />
              <span className="t" style={{ textAlign: "center" }}>
                5 năm cưới sắp tới, xét theo tuổi cô dâu
              </span>
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
                    <td data-k="Kim Lâu">{r.kimLau.phamKimLau ? <span className="pill r">{r.kimLau.loai}</span> : <span className="pill g">Không phạm</span>}</td>
                    <td data-k="Kết luận">{r.nenHayTranh === "nên" ? <span className="pill g">Nên</span> : <span className="pill r">Nên cân nhắc</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: 12.5, color: "var(--ink-3)", textAlign: "center", marginTop: 8 }}>
              Kim Lâu chỉ xét trên tuổi mụ của cô dâu, theo tục "lấy vợ xem tuổi đàn bà". Chỉ mang tính tham khảo dân gian.
            </p>
          </div>

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t" style={{ textAlign: "center" }}>
                Hai tuổi có xung nhau không
              </span>
              <span className="rule" />
            </div>
            <p>{textConGiap}</p>
          </div>

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t" style={{ textAlign: "center" }}>
                Mệnh có hợp nhau không
              </span>
              <span className="rule" />
            </div>
            <p>{textMenh}</p>
            <p style={{ fontSize: 12.5, color: "var(--ink-3)", textAlign: "center", marginTop: 4 }}>
              Màu hợp mệnh {info.canChiNam.napAm.name} (chồng): {hMenhNam.mauHop.join(", ")}. Màu hợp mệnh {info.canChiNu.napAm.name} (vợ):{" "}
              {hMenhNu.mauHop.join(", ")}.
            </p>
          </div>

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t" style={{ textAlign: "center" }}>
                Thiên can có hợp nhau không
              </span>
              <span className="rule" />
            </div>
            <p>{textThienCan}</p>
          </div>

          <KetHonYearPicker initialNamNam={namNam} initialNamNu={namNu} />

          <div className="box" style={{ marginTop: 18 }}>
            <div className="box-h">
              <span className="rule" />
              <span className="t" style={{ textAlign: "center" }}>
                Các cặp năm sinh gần đây
              </span>
              <span className="rule" />
            </div>
            <div className="chips">
              {similar.map((p) => (
                <Link className="chip" href={`/xem-tuoi-ket-hon/${ketHonSlug(p.namNam, p.namNu)}`} key={`${p.namNam}-${p.namNu}`}>
                  Nam {p.namNam} · Nữ {p.namNu}
                </Link>
              ))}
              <Link className="chip hot" href="/xem-ngay-tot/cuoi-hoi">
                Xem ngày tốt cưới hỏi ›
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
