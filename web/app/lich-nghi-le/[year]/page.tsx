import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { dayHref } from "@/lib/calendar/urls";
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

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Ngày lễ" />

        <div className="dhead">
          <div className="crumb">
            <Link href="/">Trang chủ</Link> › <Link href="/le/">Ngày lễ</Link> › Lịch nghỉ lễ {year}
          </div>
          <h1 className="dh1">Lịch nghỉ lễ năm {year}</h1>
          <p className="dsub">
            Số ngày nghỉ theo dữ liệu trang lễ (Bộ luật Lao động). Ngày dương của lễ âm tính từ lõi lịch. Lịch nghỉ cụ thể
            từng năm (nghỉ bù, dồn ngày) do Chính phủ công bố — trang này không thay thông báo đó.
          </p>
        </div>

        <div className="body">
          <div className="box">
            <table className="tuoitable">
              <thead>
                <tr>
                  <th>Ngày dương</th>
                  <th>Thứ</th>
                  <th>Lễ</th>
                  <th>Số ngày</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.page.slug}>
                    <td data-k="Ngày">
                      <Link href={dayHref(r.solar)}>{formatNghiLeDate(r.solar)}</Link>
                    </td>
                    <td data-k="Thứ">{r.weekday}</td>
                    <td data-k="Lễ">
                      <Link href={`/le/${r.page.slug}/`}>{r.page.ten}</Link>
                    </td>
                    <td data-k="Số ngày">
                      {r.soNgay}
                      {r.ghiChu ? ` (${r.ghiChu})` : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pn">
            {prev ? <Link href={`/lich-nghi-le/${prev}/`}>‹ Năm {prev}</Link> : <span />}
            {next ? <Link href={`/lich-nghi-le/${next}/`}>Năm {next} ›</Link> : <span />}
          </div>

          <h2 className="hh" style={{ marginTop: 32 }}>
            Có thể anh cần
          </h2>
          <div className="chips">
            <Link className="chip" href="/countdown/tet/">
              Đếm ngược Tết
            </Link>
            <Link className="chip" href="/le/">
              Tất cả ngày lễ
            </Link>
          </div>
          <TraditionalDisclaimer compact />
        </div>

        <Footer />
      </div>
    </div>
  );
}
