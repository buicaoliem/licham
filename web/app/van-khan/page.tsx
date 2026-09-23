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

/** Chủ đề hay tìm: mỗi chip dẫn tới một bài có thật trong danh mục (gồm các lối tắt cũ của trang). */
const CHU_DE: { label: string; slug: string }[] = [
  { label: "Thần Tài", slug: "than-tai-tho-dia" },
  { label: "Gia tiên", slug: "gia-tien-ngay-gio" },
  { label: "Mùng một, rằm", slug: "mung-mot-ngay-ram" },
  { label: "Ông Công ông Táo", slug: "ong-cong-ong-tao" },
  { label: "Giao thừa", slug: "giao-thua-trong-nha" },
  { label: "Động thổ", slug: "dong-tho" },
  { label: "Nhập trạch", slug: "nhap-trach" },
  { label: "Khai trương", slug: "khai-truong" },
  { label: "Cúng xe", slug: "cung-xe" },
  { label: "Giải hạn", slug: "giai-han-dau-nam" },
  { label: "Cầu duyên", slug: "cau-duyen" },
  { label: "Đi chùa", slug: "di-chua" },
];

/** Lối tắt sang công cụ liên quan (trước đây là hàng chip dưới tiêu đề). */
const XEM_NHANH: { label: string; href: string; icon: IconName }[] = [
  { label: "Xem ngày tốt", href: "/xem-ngay-tot/", icon: "sun" },
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
  const chuDe = CHU_DE.filter((c) => vanKhanBySlug(c.slug));

  const aside = (
    <aside className="ch-side vk-index-side" key="aside">
      <nav className="ch-sidebox vk-box-nhom" aria-labelledby="vk-nhom-h">
        <h2 className="vk-sidebox-h son" id="vk-nhom-h">
          <Icon name="scroll" size={19} />
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

      <nav className="ch-sidebox" aria-labelledby="vk-chude-h">
        <h2 className="vk-sidebox-h gold" id="vk-chude-h">
          <Icon name="lotus" size={19} />
          Chủ đề hay tìm
        </h2>
        <div className="vk-sidebox-b">
          <ul className="vk-chips">
            {chuDe.map((c) => (
              <li key={c.slug}>
                <Link href={`/van-khan/${c.slug}/`}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <nav className="ch-sidebox" aria-labelledby="vk-nhanh-h">
        <h2 className="vk-sidebox-h jade" id="vk-nhanh-h">
          <Icon name="bolt" size={19} />
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
  );

  return (
    <ChShell activeMenu="Văn khấn" className="ch-vk">
      <ChHero
        className="vk-index-hero"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Văn khấn" }]}
        crumbJsonLd={false}
        title={<>Văn khấn cổ truyền Việt Nam {year}</>}
        lead="Bài văn khấn đầy đủ, chia theo năm nhóm: trong nhà, lễ tết, việc lớn, cầu an và đi lễ"
        art={{ src: HERITAGE_SLOTS.heroVanKhan.path, label: HERITAGE_SLOTS.heroVanKhan.spec }}
      />

      <div className="ch-wrap vk-index-wrap">
        <VanKhanSearch
          nhomList={nhomList}
          featured={noiBat ? { ...toCard(noiBat), samLe: noiBat.samLe, soPhan: noiBat.baiKhan.length } : undefined}
          aside={aside}
          after={<TraditionalDisclaimer key="after" />}
        />
      </div>
    </ChShell>
  );
}
