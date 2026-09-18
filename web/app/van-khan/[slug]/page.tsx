import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { VanKhanActions } from "@/components/VanKhanActions";
import { LE_LIST } from "@/lib/le";
import { VAN_KHAN_LIST, splitFillIns, vanKhanBySlug, vanKhanLienQuan } from "@/lib/van-khan";

export function generateStaticParams() {
  return VAN_KHAN_LIST.map((v) => ({ slug: v.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const bai = vanKhanBySlug(slug);
  if (!bai) return {};
  return {
    title: `${bai.ten} đầy đủ và chuẩn nhất | Lịch Âm`,
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

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Văn khấn" />

        <div className="band">
          <div className="bg bg-son" />
          <div className="band-in">
            <h1>{bai.ten}</h1>
            <p>{bai.moTa}</p>
          </div>
        </div>

        <div className="body">
          <div className="cols2">
            <div className="box">
              <div className="box-h">
                <span className="rule" />
                <span className="t">Sắm lễ</span>
                <span className="rule" />
              </div>
              <ul className="khanul">
                {bai.samLe.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="box">
              <div className="box-h">
                <span className="rule" />
                <span className="t">Lưu ý</span>
                <span className="rule" />
              </div>
              <ul className="khanul">
                {bai.luuY.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="hh" style={{ marginTop: 28 }}>
            Nội dung bài khấn
          </h2>
          {bai.baiKhan.map((phan, i) => (
            <div className="scripture" key={phan.tieuDe ?? i}>
              {phan.tieuDe && <h3>{phan.tieuDe}</h3>}
              {phan.doanVan.map((doan, j) => (
                <Doan text={doan} key={j} />
              ))}
            </div>
          ))}

          <VanKhanActions bai={bai} />

          {leLienQuan.length > 0 && (
            <p style={{ textAlign: "center", fontSize: 13.5, marginTop: 16 }} className="khan-noprint">
              Ngày lễ liên quan:{" "}
              {leLienQuan.map((l, i) => (
                <span key={l.slug}>
                  {i > 0 && ", "}
                  <Link href={`/le/${l.slug}`}>{l.ten}</Link>
                </span>
              ))}
            </p>
          )}

          <div style={{ marginTop: 32 }} className="khan-noprint">
            <h2 className="hh">Câu hỏi thường gặp</h2>
            <div className="box faqs">
              <div className="faq">
                <b>Khấn {bai.ten.replace(/^Văn khấn /, "")} vào lúc nào?</b>
                <p>{bai.luuY[0]}.</p>
              </div>
              <div className="faq">
                <b>Sắm lễ {bai.ten.replace(/^Văn khấn /, "")} gồm những gì?</b>
                <p>Chuẩn bị: {bai.samLe.join("; ")}.</p>
              </div>
              <div className="faq">
                <b>Có cần đọc đúng nguyên văn không?</b>
                <p>
                  Không nhất thiết. Thành tâm là chính, không cần thuộc lòng từng chữ, có thể vừa đọc vừa khấn theo ý
                  mình miễn giữ đủ ý chính của bài.
                </p>
              </div>
            </div>
          </div>

          <h2 className="hh khan-noprint" style={{ marginTop: 32 }}>
            Văn khấn cùng nhóm {bai.nhom.toLowerCase()}
          </h2>
          <div className="chips khan-noprint">
            {cungNhom.map((v) =>
              v.slug === bai.slug ? (
                <span className="chip hot" key={v.slug}>
                  {v.ten}
                </span>
              ) : (
                <Link className="chip" href={`/van-khan/${v.slug}`} key={v.slug}>
                  {v.ten}
                </Link>
              ),
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
