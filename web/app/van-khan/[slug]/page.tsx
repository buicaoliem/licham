import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { VanKhanActions } from "@/components/VanKhanActions";
import { Breadcrumb } from "@/components/calendar/Breadcrumb";
import { ChShell } from "@/components/heritage/ChShell";
import { Icon } from "@/components/heritage/Icon";
import { HeritageImage, heritageVisible } from "@/components/heritage/HeritageImage";
import { TocDetails } from "@/components/heritage/TocDetails";
import { NHOM_ICON } from "@/components/heritage/vanKhanUi";
import { heritageFile, heritageSlot, heroArtStyle } from "@/lib/heritage-assets";
import { vanKhanImagePaths } from "@/lib/van-khan-anh";
import { LE_LIST } from "@/lib/le";
import { getVietnamToday } from "@/lib/today";
import { VAN_KHAN_LIST, splitFillIns, vanKhanBySlug, vanKhanLienQuan } from "@/lib/van-khan";
import { viecLienQuanKhan } from "@/lib/van-khan-viec";

export function generateStaticParams() {
  return VAN_KHAN_LIST.map((v) => ({ slug: v.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const bai = vanKhanBySlug(slug);
  if (!bai) return {};
  const year = getVietnamToday().year;
  return {
    title: `${bai.ten} ${year} — đầy đủ sắm lễ | Lịch Âm`,
    description: bai.moTa,
    alternates: { canonical: `/van-khan/${slug}/` },
  };
}

function Doan({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <p>
      {lines.map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {splitFillIns(line).map((part, j) =>
            part.isFillIn ? (
              <span className="fillin" key={j}>
                {part.text}
              </span>
            ) : (
              <span key={j}>{part.text}</span>
            ),
          )}
        </span>
      ))}
    </p>
  );
}

/** "Hương: ba nén hoặc năm nén" → tên lễ vật đậm, phần định lượng nhạt; mục không có ":" giữ nguyên. */
function LeVat({ text }: { text: string }) {
  const i = text.indexOf(":");
  if (i < 0) return <>{text}</>;
  return (
    <>
      <b>{text.slice(0, i)}</b>
      {text.slice(i)}
    </>
  );
}

export default async function VanKhanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bai = vanKhanBySlug(slug);
  if (!bai) notFound();

  const cungNhom = vanKhanLienQuan(bai);
  const leLienQuan = LE_LIST.filter((l) => l.vanKhan.includes(bai.slug));
  const viecLienQuan = viecLienQuanKhan(bai.slug);

  const coNhieuPhan = bai.baiKhan.length > 1;
  const tenNgan = bai.ten.replace(/^Văn khấn /, "");
  const anh = vanKhanImagePaths(bai.slug, bai.nhom);
  const coAnh = heritageVisible(anh.own, anh.nhom);
  const goc = heritageSlot("scriptureCorner");
  const lienQuan = cungNhom.filter((v) => v.slug !== bai.slug);

  const toc = (
    <ol className="ch-toc">
      <li>
        <a href="#sam-le">Sắm lễ</a>
      </li>
      <li>
        <a href="#luu-y">Lưu ý</a>
      </li>
      <li>
        <a href="#bai-khan">Nội dung bài khấn</a>
        {coNhieuPhan && (
          <ul>
            {bai.baiKhan.map((phan, i) =>
              phan.tieuDe ? (
                <li key={phan.tieuDe}>
                  <a href={`#bai-khan-${i + 1}`}>{phan.tieuDe}</a>
                </li>
              ) : null,
            )}
          </ul>
        )}
      </li>
      <li>
        <a href="#hoi-dap">Câu hỏi thường gặp</a>
      </li>
    </ol>
  );

  return (
    <ChShell activeMenu="Văn khấn" className="ch-vk">
      <div className="ch-wrap ch-main vk-detail">
        <div className="vk-crumb">
          <Breadcrumb
            items={[{ label: "Trang chủ", href: "/" }, { label: "Văn khấn", href: "/van-khan/" }, { label: bai.ten }]}
            jsonLd={false}
          />
        </div>
        <div className="ch-layout vk-layout">
          <section className={coAnh ? "vk-herocard vk-hero has-art" : "vk-herocard vk-hero"}>
            <div className="vk-hero-text">
              <div className="ch-eyebrow">
                <Icon name={NHOM_ICON[bai.nhom]} size={15} />
                Văn khấn · {bai.nhom}
              </div>
              <h1 className="ch-h1">{bai.ten}</h1>
              <p className="ch-lead">{bai.moTa}</p>
              <VanKhanActions bai={bai} />
            </div>
            {coAnh && (
              <div className="vk-hero-art" style={heroArtStyle(heritageFile(anh.own) ? anh.own : anh.nhom)}>
                <HeritageImage src={anh.own} fallback={anh.nhom} alt={`Minh họa ${bai.ten.charAt(0).toLowerCase()}${bai.ten.slice(1)}`} eager label="Ảnh chủ đạo bài (4:3); thiếu thì dùng ảnh nhóm" />
              </div>
            )}
          </section>

          <div className="vk-main">
            <TocDetails
              className="vk-toc-m khan-noprint"
              summary={
                <>
                  <Icon name="list" size={19} />
                  Mục lục bài viết
                  <span className="n">4 mục</span>
                  <Icon name="chevron" size={18} className="chev" />
                </>
              }
            >
              {toc}
            </TocDetails>

            <section className="ch-card vk-sec" id="sam-le">
              <div className="vk-sec-ico">
                <Icon name="bowl" size={26} stroke={1.4} />
              </div>
              <h2 className="vk-sec-h">Sắm lễ</h2>
              <ul className="vk-list vk-sec-b">
                {bai.samLe.map((item) => (
                  <li key={item}>
                    <LeVat text={item} />
                  </li>
                ))}
              </ul>
            </section>

            <section className="ch-card vk-sec" id="luu-y">
              <div className="vk-sec-ico">
                <Icon name="note" size={26} stroke={1.4} />
              </div>
              <h2 className="vk-sec-h">Lưu ý</h2>
              <ul className="vk-list one vk-sec-b">
                {bai.luuY.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="ch-card vk-sec" id="bai-khan">
              <div className="vk-sec-ico">
                <Icon name="scroll" size={26} stroke={1.4} />
              </div>
              <h2 className="vk-sec-h">Nội dung bài khấn</h2>
              <div className="vk-sec-b wide">
                {bai.baiKhan.map((phan, i) => (
                  <div
                    className={goc ? "vk-scroll has-corner" : "vk-scroll"}
                    key={phan.tieuDe ?? i}
                    id={coNhieuPhan ? `bai-khan-${i + 1}` : undefined}
                  >
                    {goc &&
                      (["tl", "tr", "bl", "br"] as const).map((pos) => (
                        <img className={`vk-scroll-corner ${pos}`} src={goc} alt="" aria-hidden="true" key={pos} />
                      ))}
                    {phan.tieuDe ? (
                      <h3 className="vk-scroll-t">{phan.tieuDe}</h3>
                    ) : (
                      <div className="vk-scroll-t" aria-hidden="true">
                        {bai.ten}
                      </div>
                    )}
                    {phan.doanVan.map((doan, j) => (
                      <Doan text={doan} key={j} />
                    ))}
                  </div>
                ))}
              </div>
            </section>

            <section className="ch-card vk-sec khan-noprint" id="hoi-dap">
              <div className="vk-sec-ico">
                <Icon name="question" size={26} stroke={1.4} />
              </div>
              <h2 className="vk-sec-h">Câu hỏi thường gặp</h2>
              <div className="faqs vk-faq vk-sec-b">
                <div className="faq">
                  <b>Khấn {tenNgan} vào lúc nào?</b>
                  <p>{bai.luuY[0]}.</p>
                </div>
                <div className="faq">
                  <b>Sắm lễ {tenNgan} gồm những gì?</b>
                  <p>Chuẩn bị: {bai.samLe.join("; ")}.</p>
                </div>
                <div className="faq">
                  <b>Có cần đọc đúng nguyên văn không?</b>
                  <p>
                    Không nhất thiết. Thành tâm là chính, không cần thuộc lòng từng chữ, có thể vừa đọc vừa khấn theo ý mình miễn giữ đủ ý
                    chính của bài.
                  </p>
                </div>
              </div>
            </section>
            <TraditionalDisclaimer />
          </div>

          <aside className="ch-side vk-side khan-noprint">
            <nav className="ch-sidebox vk-toc khan-noprint" aria-labelledby="vk-toc-h">
              <div className="vk-sidebox-h son" id="vk-toc-h">
                <Icon name="list" size={20} />
                Mục lục bài viết
              </div>
              <div className="vk-sidebox-b">{toc}</div>
            </nav>

            <div className="ch-sidebox">
              <div className="vk-sidebox-h jade">
                <span className="dot">
                  <Icon name="lotus" size={20} />
                </span>
                Thông tin nhanh
              </div>
              <div className="vk-sidebox-b">
                <ul className="vk-facts">
                  <li>
                    <Icon name={NHOM_ICON[bai.nhom]} size={18} />
                    <span className="k">Nhóm</span>
                    <span className="v">{bai.nhom}</span>
                  </li>
                  <li>
                    <Icon name="bowl" size={18} />
                    <span className="k">Sắm lễ</span>
                    <span className="v">{bai.samLe.length} mục</span>
                  </li>
                  <li>
                    <Icon name="scroll" size={18} />
                    <span className="k">Bài khấn</span>
                    <span className="v">{coNhieuPhan ? `${bai.baiKhan.length} phần` : "1 bài"}</span>
                  </li>
                  {leLienQuan.length > 0 && (
                    <li>
                      <Icon name="calendar" size={18} />
                      <span className="k">Ngày lễ liên quan</span>
                      <span className="v">
                        {leLienQuan.map((l, i) => (
                          <span key={l.slug}>
                            {i > 0 && ", "}
                            <Link href={`/le/${l.slug}/`}>{l.ten}</Link>
                          </span>
                        ))}
                      </span>
                    </li>
                  )}
                  {viecLienQuan && (
                    <li>
                      <Icon name="sun" size={18} />
                      <span className="k">Chọn ngày</span>
                      <span className="v">
                        <Link href={`/xem-ngay-tot/${viecLienQuan.slug}/`}>{viecLienQuan.label}</Link>
                      </span>
                    </li>
                  )}
                  <li>
                    <Icon name="calendar" size={18} />
                    <span className="k">Xem ngày</span>
                    <span className="v">
                      <Link href="/xem-ngay-tot/">Xem ngày tốt</Link>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="ch-sidebox">
              <h2 className="vk-sidebox-h gold">
                <Icon name="book" size={20} />
                Cùng nhóm {bai.nhom.toLowerCase()}
              </h2>
              <div className="vk-sidebox-b">
                <ul className="vk-rel">
                  {lienQuan.map((v) => {
                    const p = vanKhanImagePaths(v.slug, v.nhom);
                    const coThumb = heritageVisible(p.own, p.nhom);
                    return (
                      <li key={v.slug}>
                        <Link href={`/van-khan/${v.slug}/`} className={coThumb ? undefined : "no-thumb"}>
                          {coThumb && <HeritageImage src={p.own} fallback={p.nhom} alt="" />}
                          <span>
                            <span className="t">{v.ten}</span>
                            <small>{v.nhom}</small>
                          </span>
                          {!coThumb && <Icon name="chevron" size={16} className="arr" />}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link className="vk-side-more" href="/van-khan/">
                  Tất cả văn khấn <Icon name="arrow" size={15} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </ChShell>
  );
}
