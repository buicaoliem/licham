import type { Metadata } from "next";
import Link from "next/link";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { type VanKhanCardData, VanKhanSearch } from "@/components/VanKhanSearch";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { Icon, type IconName } from "@/components/heritage/Icon";
import { NHOM_ICON, nhomAnchor } from "@/components/heritage/vanKhanUi";
import { HERITAGE_SLOTS, vanKhanImage, vanKhanImagePaths } from "@/lib/heritage-assets";
import { getVietnamToday } from "@/lib/today";
import { VAN_KHAN_NHOM_LIST, type VanKhanBai, vanKhanByNhom, vanKhanBySlug } from "@/lib/van-khan";

export function generateMetadata(): Metadata {
  const year = getVietnamToday().year;
  return {
    title: `Văn khấn cổ truyền Việt Nam ${year} — Tuyển tập đầy đủ | Lịch Âm`,
    description: `Tuyển tập bài văn khấn ${year}: trong nhà, lễ tết, việc lớn, cầu an và đi lễ — sắm lễ, lưu ý và bài khấn nguyên văn.`,
    alternates: { canonical: "/van-khan/" },
  };
}

/** Bài đặt ở khối "Bài nổi bật" — cùng bài trang đã đưa vào lối tắt "Mùng một, rằm". */
const BAI_NOI_BAT = "mung-mot-ngay-ram";

/** Lối tắt sẵn có của trang (trước đây là hàng chip dưới tiêu đề). */
const XEM_NHANH: { label: string; href: string; icon: IconName }[] = [
  { label: "Xem ngày tốt", href: "/xem-ngay-tot/", icon: "sun" },
  { label: "Mùng một, rằm", href: "/van-khan/mung-mot-ngay-ram/", icon: "lotus" },
  { label: "Khấn động thổ", href: "/van-khan/dong-tho/", icon: "home" },
  { label: "Đếm ngược Tết", href: "/countdown/tet/", icon: "hourglass" },
];

function toCard(v: VanKhanBai): VanKhanCardData {
  return {
    slug: v.slug,
    ten: v.ten,
    moTa: v.moTa,
    nhom: v.nhom,
    thumb: vanKhanImage(v.slug, v.nhom),
    thumbPath: vanKhanImagePaths(v.slug, v.nhom).own,
  };
}

export default function VanKhanIndexPage() {
  const year = getVietnamToday().year;
  const nhomList = VAN_KHAN_NHOM_LIST.map((nhom) => ({ ten: nhom, items: vanKhanByNhom(nhom).map(toCard) }));
  const noiBat = vanKhanBySlug(BAI_NOI_BAT);

  return (
    <ChShell activeMenu="Văn khấn">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Văn khấn" }]}
        crumbJsonLd={false}
        title={<>Văn khấn cổ truyền Việt Nam {year}</>}
        lead="Bài văn khấn đầy đủ, chia theo năm nhóm: trong nhà, lễ tết, việc lớn, cầu an và đi lễ"
        art={{ src: HERITAGE_SLOTS.heroVanKhan.path, label: HERITAGE_SLOTS.heroVanKhan.spec }}
      />

      <div className="ch-wrap ch-layout vk-index">
        <div>
          <VanKhanSearch nhomList={nhomList} featured={noiBat ? toCard(noiBat) : undefined} />
          <TraditionalDisclaimer />
        </div>

        <aside className="ch-side">
          <nav className="ch-sidebox" aria-labelledby="vk-nhom-h">
            <h2 className="vk-sidebox-h son" id="vk-nhom-h">
              <Icon name="scroll" size={20} />
              Nhóm văn khấn
            </h2>
            <div className="vk-sidebox-b">
              <ul className="vk-nhom-list">
                {nhomList.map((nhom) => (
                  <li key={nhom.ten}>
                    <a href={`#${nhomAnchor(nhom.ten)}`}>
                      <Icon name={NHOM_ICON[nhom.ten]} size={18} />
                      {nhom.ten}
                      <span className="n">{nhom.items.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <nav className="ch-sidebox" aria-labelledby="vk-nhanh-h">
            <h2 className="vk-sidebox-h gold" id="vk-nhanh-h">
              <Icon name="bolt" size={20} />
              Xem nhanh
            </h2>
            <div className="vk-sidebox-b">
              <ul className="vk-nhom-list">
                {XEM_NHANH.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>
                      <Icon name={l.icon} size={18} />
                      {l.label}
                      <Icon name="chevron" size={16} className="arr" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>
      </div>
    </ChShell>
  );
}
