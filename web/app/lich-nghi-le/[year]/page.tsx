import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { Icon } from "@/components/heritage/Icon";
import { LeDateTile } from "@/components/heritage/LeParts";
import { dayHref } from "@/lib/calendar/urls";
import { leRuleLabel } from "@/lib/le-hub";
import {
  NGHI_LE_YEAR_END,
  NGHI_LE_YEAR_START,
  formatNghiLeDate,
  nghiLeCuaNam,
  nghiLeYears,
} from "@/lib/lich-nghi-le";

export function generateStaticParams() {
  return nghiLeYears().map((year) => ({ year: String(year) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ year: string }> }): Promise<Metadata> {
  const { year: y } = await params;
  const year = Number(y);
  return {
    title: `Lịch nghỉ lễ năm ${year} — Ngày dương và số ngày nghỉ | Lịch Âm`,
    description: `Các ngày nghỉ lễ ${year} theo Bộ luật Lao động: Tết, Giỗ Tổ, 30/4, 1/5, Quốc khánh… kèm ngày dương tính từ lịch âm khi lễ là ngày âm.`,
    alternates: { canonical: `/lich-nghi-le/${year}/` },
  };
}

export default async function LichNghiLePage({ params }: { params: Promise<{ year: string }> }) {
  const { year: y } = await params;
  const year = Number(y);
  if (!Number.isInteger(year) || year < NGHI_LE_YEAR_START || year > NGHI_LE_YEAR_END) notFound();

  const rows = nghiLeCuaNam(year);
  const prev = year > NGHI_LE_YEAR_START ? year - 1 : null;
  const next = year < NGHI_LE_YEAR_END ? year + 1 : null;
  const tongNgay = rows.reduce((s, r) => s + r.soNgay, 0);

  return (
    <ChShell activeMenu="Ngày lễ" className="ch-le">
      <ChHero
        className="le-hero-sub"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Ngày lễ", href: "/le/" }, { label: `Lịch nghỉ lễ ${year}` }]}
        crumbJsonLd={false}
        eyebrow="Ngày nghỉ lễ theo luật"
        title={`Lịch nghỉ lễ năm ${year}`}
        lead="Số ngày nghỉ theo dữ liệu trang lễ (Bộ luật Lao động). Ngày dương của lễ âm tính từ lõi lịch. Lịch nghỉ cụ thể từng năm (nghỉ bù, dồn ngày) do Chính phủ công bố — trang này không thay thông báo đó."
      />

      <div className="ch-wrap ch-main ch-layout le-nl-layout">
        <div className="ch-stack">
          <section className="ch-card le-nl" aria-labelledby="le-nl-h">
            <div className="le-nl-head">
              <h2 className="kh-sec-h" id="le-nl-h">
                {rows.length} dịp nghỉ lễ năm {year}
              </h2>
              <nav className="le-yearnav" aria-label="Chọn năm">
                {prev ? (
                  <Link href={`/lich-nghi-le/${prev}/`} aria-label={`Năm ${prev}`}>
                    <Icon name="chevron" size={16} className="flip" />
                    {prev}
                  </Link>
                ) : (
                  <span />
                )}
                <b>{year}</b>
                {next ? (
                  <Link href={`/lich-nghi-le/${next}/`} aria-label={`Năm ${next}`}>
                    {next}
                    <Icon name="chevron" size={16} />
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            </div>
            <p className="kh-sec-sub">
              Cộng theo số ngày nghỉ quy định của từng dịp: {tongNgay} ngày. Ngày nghỉ bù, hoán đổi theo từng năm không tính ở đây.
            </p>

            <ol className="le-nl-list">
              {rows.map((r) => (
                <li key={r.page.slug} className={`n-${r.page.nhom}`}>
                  <LeDateTile day={r.solar.day} month={r.solar.month} tone={`n-${r.page.nhom}`} size="md" />
                  <div className="b">
                    <Link className="t" href={`/le/${r.page.slug}/`}>
                      {r.page.ten}
                    </Link>
                    <span className="s">
                      <Link href={dayHref(r.solar)}>{formatNghiLeDate(r.solar)}</Link> · {r.weekday} · {leRuleLabel(r.page)}
                    </span>
                  </div>
                  <div className="so">
                    <b>{r.soNgay}</b>
                    <span>ngày</span>
                    {r.ghiChu && <small>{r.ghiChu}</small>}
                  </div>
                </li>
              ))}
            </ol>
          </section>
          <TraditionalDisclaimer compact />
        </div>

        <aside className="ch-side">
          <div className="ch-sidebox">
            <h2 className="vk-sidebox-h son">
              <Icon name="list" size={20} />
              Các năm khác
            </h2>
            <div className="le-years">
              {nghiLeYears().map((yy) => (
                <Link key={yy} href={`/lich-nghi-le/${yy}/`} className={yy === year ? "on" : undefined} aria-current={yy === year ? "page" : undefined}>
                  {yy}
                </Link>
              ))}
            </div>
          </div>
          <div className="ch-sidebox">
            <h2 className="vk-sidebox-h gold">
              <Icon name="hourglass" size={20} />
              Có thể anh cần
            </h2>
            <ul className="ch-linklist kh-rel le-rel">
              <li>
                <Link href="/countdown/tet/">
                  <span className="ic" aria-hidden="true">
                    <Icon name="hourglass" size={19} />
                  </span>
                  <span className="tx">
                    Đếm ngược Tết
                    <small>Số ngày còn lại đến Tết Nguyên đán</small>
                  </span>
                  <Icon name="chevron" size={16} className="arr" />
                </Link>
              </li>
              <li>
                <Link href="/le/">
                  <span className="ic" aria-hidden="true">
                    <Icon name="calendar" size={19} />
                  </span>
                  <span className="tx">
                    Tất cả ngày lễ
                    <small>Lễ âm lịch, nghỉ lễ, ngày kỷ niệm</small>
                  </span>
                  <Icon name="chevron" size={16} className="arr" />
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </ChShell>
  );
}
