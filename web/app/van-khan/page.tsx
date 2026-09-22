import type { Metadata } from "next";
import Link from "next/link";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { VanKhanSearch } from "@/components/VanKhanSearch";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { getVietnamToday } from "@/lib/today";
import { VAN_KHAN_NHOM_LIST, vanKhanByNhom } from "@/lib/van-khan";

export function generateMetadata(): Metadata {
  const year = getVietnamToday().year;
  return {
    title: `Văn khấn cổ truyền Việt Nam ${year} — Tuyển tập đầy đủ | Lịch Âm`,
    description: `Tuyển tập bài văn khấn ${year}: trong nhà, lễ tết, việc lớn, cầu an và đi lễ — sắm lễ, lưu ý và bài khấn nguyên văn.`,
    alternates: { canonical: "/van-khan/" },
  };
}

export default function VanKhanIndexPage() {
  const year = getVietnamToday().year;
  const nhomList = VAN_KHAN_NHOM_LIST.map((nhom) => ({ ten: nhom, items: vanKhanByNhom(nhom) }));

  return (
    <ChShell activeMenu="Văn khấn">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Văn khấn" }]}
        crumbJsonLd={false}
        title={<>Văn khấn cổ truyền Việt Nam {year}</>}
        lead="Bài văn khấn đầy đủ, chia theo năm nhóm: trong nhà, lễ tết, việc lớn, cầu an và đi lễ"
      >
        <div className="chips">
          <Link className="chip" href="/xem-ngay-tot/">
            Xem ngày tốt
          </Link>
          <Link className="chip" href="/van-khan/mung-mot-ngay-ram/">
            Mùng một, rằm
          </Link>
          <Link className="chip" href="/van-khan/dong-tho/">
            Khấn động thổ
          </Link>
          <Link className="chip" href="/countdown/tet/">
            Đếm ngược Tết
          </Link>
        </div>
      </ChHero>

      <div className="ch-wrap ch-main">
        <VanKhanSearch nhomList={nhomList} />
        <TraditionalDisclaimer />
      </div>
    </ChShell>
  );
}
