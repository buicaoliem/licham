import type { Metadata } from "next";
import Link from "next/link";
import { jdFromDate } from "@licham/core";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { pad2 } from "@/lib/format";
import { LE_LIST, LE_NHOM_LABEL, type LeNhom } from "@/lib/le";
import { nextOccurrence } from "@/lib/le-date-engine";
import { getVietnamToday } from "@/lib/today";

export const metadata: Metadata = {
  title: "Ngày lễ Việt Nam trong năm — Âm lịch, dương lịch, nghỉ lễ | LịchÂm",
  description:
    "Tra cứu 60 ngày lễ, ngày giỗ và ngày kỷ niệm của Việt Nam: ngày nghỉ lễ theo luật, lễ âm lịch, giỗ anh hùng dân tộc, ngày kỷ niệm và ngày quốc tế phổ biến.",
  alternates: { canonical: "/le/" },
};

const NHOM_ORDER: LeNhom[] = ["nghi-le", "am-lich", "anh-hung", "ky-niem", "quoc-te"];

export default function LeHubPage() {
  const today = getVietnamToday();

  const withNext = LE_LIST.map((page) => ({ page, next: nextOccurrence(page, today) }));

  const sapToi = [...withNext]
    .sort(
      (a, b) =>
        jdFromDate(a.next.solar.day, a.next.solar.month, a.next.solar.year) -
        jdFromDate(b.next.solar.day, b.next.solar.month, b.next.solar.year),
    )
    .slice(0, 8);

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Ngày lễ" />

        <div className="leband">
          <h1>Các ngày lễ trong năm</h1>
          <p className="sub">Tra cứu ngày âm lịch, dương lịch, ngày nghỉ lễ và ý nghĩa của các ngày lễ, ngày giỗ trong năm</p>
        </div>

        <div className="body">
          <section className="lehub-nhom">
            <h2 style={{ textAlign: "center" }}>Sắp tới</h2>
            <div className="chips">
              {sapToi.map(({ page, next }) => (
                <Link className="chip lehub-chip" href={`/le/${page.slug}`} key={page.slug}>
                  {page.ten}
                  <small>
                    {pad2(next.solar.day)}/{pad2(next.solar.month)}
                  </small>
                </Link>
              ))}
            </div>
          </section>

          {NHOM_ORDER.map((nhom) => {
            const items = withNext.filter(({ page }) => page.nhom === nhom);
            if (items.length === 0) return null;
            return (
              <section className="lehub-nhom" key={nhom}>
                <h2 style={{ textAlign: "center" }}>{LE_NHOM_LABEL[nhom]}</h2>
                <div className="chips">
                  {items.map(({ page, next }) => (
                    <Link className="chip lehub-chip" href={`/le/${page.slug}`} key={page.slug}>
                      {page.ten}
                      <small>
                        {pad2(next.solar.day)}/{pad2(next.solar.month)}
                      </small>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <Footer />
      </div>
    </div>
  );
}
