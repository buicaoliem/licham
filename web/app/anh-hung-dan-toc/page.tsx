import type { Metadata } from "next";
import Link from "next/link";
import { AnhHungBrowser } from "@/components/AnhHungBrowser";
import { JsonLd } from "@/components/calendar/JsonLd";
import { Breadcrumb } from "@/components/calendar/Breadcrumb";
import { AhCard, AhTimeline, DrumPattern, anhHungArt } from "@/components/heritage/AnhHungParts";
import { ChShell } from "@/components/heritage/ChShell";
import { Icon } from "@/components/heritage/Icon";
import { ANH_HUNG, THOI_KY, anhHungHref, trieuDaiList } from "@/lib/anh-hung";
import { heritageFile } from "@/lib/heritage-assets";
import { SITE_URL } from "@/lib/site";

const TITLE = "Các anh hùng dân tộc Việt Nam";
const DESC =
  "Tiểu sử, niên đại, quê quán, công trạng và di tích thờ tự của các anh hùng dân tộc Việt Nam qua từng thời kỳ — từ Hai Bà Trưng, Ngô Quyền, Trần Hưng Đạo đến Chủ tịch Hồ Chí Minh.";

export const metadata: Metadata = {
  title: `${TITLE}: tiểu sử, công trạng, ngày tưởng niệm | Lịch Âm`,
  description: DESC,
  alternates: { canonical: "/anh-hung-dan-toc/" },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "/anh-hung-dan-toc/",
    type: "website",
  },
};

export default function AnhHungHubPage() {
  const list = ANH_HUNG;
  // Tranh hero chuyên mục (1200×460, nội dung dồn phải); chưa có file thì dùng hoa văn trống đồng SVG.
  const heroArt = heritageFile("/heritage/hero/anh-hung-dan-toc.webp");
  const thoiKy = THOI_KY.filter((t) => list.some((a) => a.thoiKy === t.key));
  const soTieuBieu = list.filter((a) => a.tieuBieu2013).length;
  const cards = Object.fromEntries(list.map((a) => [a.slug, <AhCard a={a} art={anhHungArt(a)} key={a.slug} />]));
  const items = list.map((a) => ({
    slug: a.slug,
    search: [a.ten, a.tenThat ?? "", ...a.tenKhac, a.queQuan].join(" "),
    thoiKy: a.thoiKy,
    trieuDai: a.trieuDai,
  }));

  const crumbs = [{ label: "Trang chủ", href: "/" }, { label: "Anh hùng dân tộc" }];
  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESC,
    url: `${SITE_URL}/anh-hung-dan-toc/`,
    inLanguage: "vi",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: list.length,
      itemListElement: list.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: a.ten,
        url: `${SITE_URL}${anhHungHref(a.slug)}`,
      })),
    },
  };

  return (
    <ChShell activeMenu={null} className="ch-ah">
      <JsonLd data={itemList} />
      <section className="ah-hero">
        <div className="ch-wrap ah-hero-in">
          <Breadcrumb items={crumbs} />
          <div className="ah-hero-grid">
            <div className="ah-hero-body">
              <div className="ch-eyebrow">
                <Icon name="temple" size={15} />
                Lịch sử & tưởng niệm
              </div>
              <h1 className="ch-h1">{TITLE}</h1>
              <p className="ch-lead">
                Chân dung những người có công dựng nước và giữ nước qua hơn hai nghìn năm — tiểu sử, bối cảnh, công trạng, nơi thờ tự và ngày tưởng niệm.
              </p>
              <dl className="ah-stats">
                <div>
                  <dt>Nhân vật</dt>
                  <dd>{list.length}</dd>
                </div>
                <div>
                  <dt>Thời kỳ</dt>
                  <dd>{thoiKy.length}</dd>
                </div>
                <div>
                  <dt>Tiêu biểu</dt>
                  <dd>{soTieuBieu}</dd>
                </div>
              </dl>
              <div className="chips ah-hero-chips">
                <a className="chip hot" href="#dong-thoi-gian">
                  Dòng thời gian
                </a>
                <Link className="chip" href="/le/?nhom=anh-hung">
                  Ngày giỗ anh hùng
                </Link>
                <Link className="chip" href="/le/gio-to-hung-vuong/">
                  Giỗ Tổ Hùng Vương
                </Link>
              </div>
            </div>
            <div className={heroArt ? "ah-hero-art img" : "ah-hero-art"} aria-hidden="true">
              {heroArt ? <img src={heroArt} alt="" width={1200} height={460} fetchPriority="high" /> : <DrumPattern className="ah-drum" />}
            </div>
          </div>
        </div>
      </section>

      <div className="ch-wrap ch-main ah-main">
        <AnhHungBrowser items={items} thoiKy={thoiKy.map((t) => ({ key: t.key, label: t.label }))} trieuDai={trieuDaiList()} cards={cards} />

        <section className="ah-tl-sec" id="dong-thoi-gian" aria-labelledby="ah-tl-h">
          <div className="ah-sec-head">
            <h2 className="ch-h2" id="ah-tl-h">
              Dòng thời gian lịch sử
            </h2>
            <p className="ch-sub">Các nhân vật xếp theo thời kỳ, mỗi mốc kèm công trạng tiêu biểu.</p>
          </div>
          <AhTimeline list={list} />
        </section>

        <section className="ah-about" aria-labelledby="ah-about-h">
          <h2 className="ch-h2" id="ah-about-h">
            Về chuyên mục
          </h2>
          <p>
            Năm 2013, Bộ Văn hóa, Thể thao và Du lịch công bố danh sách 14 vị anh hùng dân tộc tiêu biểu (văn bản số 2296/BVHTTDL-MTNATL); các nhân vật trong
            danh sách này được đánh dấu <span className="ah-badge">14 anh hùng tiêu biểu</span>. Chuyên mục cũng giới thiệu những anh hùng khác được nhân dân
            thờ phụng và tưởng niệm hằng năm.
          </p>
          <p>
            Niên đại, quê quán và sự kiện được tóm lược từ các bài Wikipedia tiếng Việt ghi ở cuối mỗi trang; những điểm sử liệu còn khác nhau được nêu rõ.
            Tranh minh họa, không phải chân dung hay tư liệu lịch sử.
          </p>
        </section>
      </div>
    </ChShell>
  );
}
