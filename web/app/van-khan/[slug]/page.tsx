import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { VanKhanActions } from "@/components/VanKhanActions";
import { Breadcrumb } from "@/components/calendar/Breadcrumb";
import { ChShell } from "@/components/heritage/ChShell";
import { Icon } from "@/components/heritage/Icon";
import { InkLandscape } from "@/components/heritage/InkLandscape";
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

export default async function VanKhanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bai = vanKhanBySlug(slug);
  if (!bai) notFound();

  const cungNhom = vanKhanLienQuan(bai);
  const leLienQuan = LE_LIST.filter((l) => l.vanKhan.includes(bai.slug));
  const viecLienQuan = viecLienQuanKhan(bai.slug);

  const coNhieuPhan = bai.baiKhan.length > 1;
  const tenNgan = bai.ten.replace(/^Văn khấn /, "");

  return (
    <ChShell activeMenu="Văn khấn">
      <div className="ch-wrap ch-main">
        <div className="ch-layout vk-layout">
          <section className="vk-herocard vk-hero">
            <div className="ch-hero-art">
              <InkLandscape idPrefix="vk" />
            </div>
            <Breadcrumb
              items={[{ label: "Trang chủ", href: "/" }, { label: "Văn khấn", href: "/van-khan/" }, { label: bai.ten }]}
              jsonLd={false}
            />
            <div className="ch-eyebrow">Văn khấn · {bai.nhom}</div>
            <h1 className="ch-h1">{bai.ten}</h1>
            <p className="ch-lead">{bai.moTa}</p>
            <VanKhanActions bai={bai} />
          </section>

          <nav className="ch-sidebox vk-toc khan-noprint" aria-labelledby="vk-toc-h">
            <div className="ch-sidebox-h" id="vk-toc-h">
              <Icon name="list" size={20} />
              Mục lục bài viết
            </div>
            <div className="ch-sidebox-b">
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
            </div>
          </nav>

          <div className="vk-main ch-stack">
            <section className="ch-card vk-sec" id="sam-le">
              <div className="vk-sec-ico">
                <Icon name="bowl" size={26} />
              </div>
              <div>
                <h2 className="ch-h2">Sắm lễ</h2>
                <ul className="vk-list">
                  {bai.samLe.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="ch-card vk-sec" id="luu-y">
              <div className="vk-sec-ico">
                <Icon name="note" size={26} />
              </div>
              <div>
                <h2 className="ch-h2">Lưu ý</h2>
                <ul className="vk-list one">
                  {bai.luuY.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="ch-card vk-sec" id="bai-khan">
              <div className="vk-sec-ico">
                <Icon name="scroll" size={26} />
              </div>
              <div>
                <h2 className="ch-h2">Nội dung bài khấn</h2>
                {bai.baiKhan.map((phan, i) => (
                  <div className="scripture" key={phan.tieuDe ?? i} id={coNhieuPhan ? `bai-khan-${i + 1}` : undefined}>
                    {phan.tieuDe && <h3>{phan.tieuDe}</h3>}
                    {phan.doanVan.map((doan, j) => (
                      <Doan text={doan} key={j} />
                    ))}
                  </div>
                ))}
              </div>
            </section>

            <section className="ch-card vk-sec khan-noprint" id="hoi-dap">
              <div className="vk-sec-ico">
                <Icon name="question" size={26} />
              </div>
              <div>
                <h2 className="ch-h2">Câu hỏi thường gặp</h2>
                <div className="faqs vk-faq">
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
              </div>
            </section>
            <TraditionalDisclaimer />
          </div>

          <aside className="ch-side vk-side khan-noprint">
            <div className="ch-sidebox">
              <div className="ch-sidebox-h jade">
                <Icon name="lotus" size={20} />
                Thông tin nhanh
              </div>
              <div className="ch-sidebox-b">
                <dl className="ch-facts">
                  <dt>Nhóm</dt>
                  <dd>{bai.nhom}</dd>
                  <dt>Sắm lễ</dt>
                  <dd>{bai.samLe.length} mục</dd>
                  <dt>Bài khấn</dt>
                  <dd>{coNhieuPhan ? `${bai.baiKhan.length} phần` : "1 bài"}</dd>
                  {leLienQuan.length > 0 && (
                    <>
                      <dt>Ngày lễ liên quan</dt>
                      <dd>
                        {leLienQuan.map((l, i) => (
                          <span key={l.slug}>
                            {i > 0 && ", "}
                            <Link href={`/le/${l.slug}/`}>{l.ten}</Link>
                          </span>
                        ))}
                      </dd>
                    </>
                  )}
                  {viecLienQuan && (
                    <>
                      <dt>Chọn ngày</dt>
                      <dd>
                        <Link href={`/xem-ngay-tot/${viecLienQuan.slug}/`}>{viecLienQuan.label}</Link>
                      </dd>
                    </>
                  )}
                </dl>
              </div>
            </div>

            <div className="ch-sidebox">
              <h2 className="ch-sidebox-h gold">
                <Icon name="scroll" size={20} />
                Văn khấn cùng nhóm {bai.nhom.toLowerCase()}
              </h2>
              <div className="ch-sidebox-b">
                <ul className="ch-linklist">
                  {cungNhom.map((v) =>
                    v.slug === bai.slug ? (
                      <li className="on" key={v.slug}>
                        <span aria-current="page">{v.ten}</span>
                      </li>
                    ) : (
                      <li key={v.slug}>
                        <Link href={`/van-khan/${v.slug}/`}>
                          {v.ten}
                          <Icon name="chevron" size={16} className="arr" />
                        </Link>
                      </li>
                    ),
                  )}
                  {viecLienQuan && (
                    <li>
                      <Link href={`/xem-ngay-tot/${viecLienQuan.slug}/`}>
                        {viecLienQuan.label}
                        <Icon name="chevron" size={16} className="arr" />
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link href="/xem-ngay-tot/">
                      Xem ngày tốt
                      <Icon name="chevron" size={16} className="arr" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </ChShell>
  );
}
