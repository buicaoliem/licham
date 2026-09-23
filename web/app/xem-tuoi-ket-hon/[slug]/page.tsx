import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShareButton } from "@/components/ShareButton";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { KetHonYearPicker } from "@/components/KetHonYearPicker";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { KetHonKetQua } from "@/components/heritage/KetHonKetQua";
import { KET_HON_STEPS, KetHonLegend, XemTuoiFormCard, XemTuoiRelated, XemTuoiSteps } from "@/components/heritage/KetHonParts";
import { KetHonNamCuoi } from "@/components/KetHonNamCuoi";
import { buildShareUrl } from "@/lib/share";
import { chiByIndex } from "@/lib/tuoi";
import {
  NAM_SINH_MAX,
  NAM_SINH_MIN,
  capNamSinhTrongPhamVi,
  ketHonSlug,
  parseKetHonSlug,
  tinhKetHonPairInfo,
} from "@/lib/xem-tuoi-ket-hon";

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
  const chiTenNam = chiByIndex(info.canChiNam.chiIndex).ten;
  const chiTenNu = chiByIndex(info.canChiNu.chiIndex).ten;
  const similar = similarPairs(namNam, namNu);
  const namMacDinh = info.bangNamCuoi[0]!.nam;

  return (
    <ChShell activeMenu="Xem tuổi" className="ch-tu ch-kh">
      <ChHero
        className="kh-hero"
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
          <XemTuoiFormCard
            current="ket-hon"
            exact={false}
            desc="Xem cặp năm sinh khác, hoặc chọn năm xem cưới để đổi bảng năm cưới bên dưới."
          >
            <KetHonYearPicker initialNamNam={namNam} initialNamNu={namNu} namMacDinh={namMacDinh} />
          </XemTuoiFormCard>

          <KetHonKetQua info={info} />

          <KetHonNamCuoi namNam={namNam} namNu={namNu} initialRows={info.bangNamCuoi} namMacDinh={namMacDinh} />

          <section className="ch-card kh-near" aria-labelledby="kh-near-h">
            <h2 className="kh-sec-h" id="kh-near-h">
              Các cặp năm sinh gần đây
            </h2>
            <div className="chips">
              {similar.map((p) => (
                <Link className="chip" href={`/xem-tuoi-ket-hon/${ketHonSlug(p.namNam, p.namNu)}/`} key={`${p.namNam}-${p.namNu}`}>
                  Nam {p.namNam} · Nữ {p.namNu}
                </Link>
              ))}
            </div>
          </section>
          <TraditionalDisclaimer />
        </div>

        <aside className="ch-side">
          <KetHonLegend />
          <XemTuoiSteps title="Cách xem" steps={KET_HON_STEPS} />
          <XemTuoiRelated />
        </aside>
      </div>
    </ChShell>
  );
}
