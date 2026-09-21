import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/calendar/Breadcrumb";
import { TOOLS, TOOLS_HUB } from "@/lib/tools/tools";

export const metadata: Metadata = {
  title: `${TOOLS_HUB.title} | Lịch Âm`,
  description: TOOLS_HUB.description,
  alternates: { canonical: TOOLS_HUB.href },
};

export default function ToolsHubPage() {
  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Đổi ngày" />
        <div className="dhead">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Công cụ" }]} />
          <h1 className="dh1">Công cụ ngày tháng</h1>
          <p className="dsub">Tính toán ngày dương lịch chính xác theo giờ Việt Nam, kèm thứ và ngày âm lịch của kết quả.</p>
        </div>
        <div className="body">
          <h2 className="hh">Chọn công cụ</h2>
          <div className="cols2">
            {TOOLS.map((t) => (
              <Link key={t.slug} href={t.href} className="box">
                <b>{t.name}</b>
                <p style={{ margin: "6px 0 0", color: "var(--ink-3)", fontSize: 13.5 }}>{t.description}</p>
              </Link>
            ))}
          </div>
          <h2 className="hh" style={{ marginTop: 32 }}>
            Công cụ liên quan
          </h2>
          <div className="chips">
            <Link className="chip" href="/doi-ngay-am-duong/">
              Đổi ngày âm dương
            </Link>
            <Link className="chip" href="/tinh-tuoi/">
              Tính tuổi và con giáp
            </Link>
            <Link className="chip" href="/xem-ngay-tot/">
              Xem ngày tốt
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
