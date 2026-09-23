import type { Metadata } from "next";
import Link from "next/link";
import { ChHero, ChSectionHead, ChShell } from "@/components/heritage/ChShell";
import { Icon, type IconName } from "@/components/heritage/Icon";
import { TOOL_ICON } from "@/components/tools/ToolShell";
import { TOOLS, TOOLS_HUB } from "@/lib/tools/tools";

export const metadata: Metadata = {
  title: `${TOOLS_HUB.title} | Lịch Âm`,
  description: TOOLS_HUB.description,
  alternates: { canonical: TOOLS_HUB.href },
};

const ICON_TONES = ["", "jade", "gold"] as const;

const RELATED: { label: string; desc: string; href: string; icon: IconName }[] = [
  { label: "Đổi ngày âm dương", desc: "Đổi qua lại dương lịch và âm lịch, kèm can chi", href: "/doi-ngay-am-duong/", icon: "swap" },
  { label: "Tính tuổi và con giáp", desc: "Tuổi dương, tuổi mụ, can chi và con giáp", href: "/tinh-tuoi/", icon: "user" },
  { label: "Xem ngày tốt", desc: "Chọn ngày hoàng đạo theo từng việc", href: "/xem-ngay-tot/", icon: "sun" },
];

export default function ToolsHubPage() {
  return (
    <ChShell activeMenu={null} className="ch-cc">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Công cụ" }]}
        title="Công cụ ngày tháng"
        lead="Tính toán ngày dương lịch chính xác theo giờ Việt Nam, kèm thứ và ngày âm lịch của kết quả."
      />
      <div className="ch-wrap ch-main">
        <section>
          <ChSectionHead title="Chọn công cụ" sub={`${TOOLS.length} công cụ tính ngày dương lịch, kèm thứ và ngày âm lịch.`} />
          <div className="ch-grid c3 cc-tools">
            {TOOLS.map((t, i) => (
              <Link key={t.slug} href={t.href} className="ch-tile">
                <span className={`ch-ico ${ICON_TONES[i % 3]}`}>
                  <Icon name={TOOL_ICON[t.slug] ?? "calendar"} size={28} />
                </span>
                <span className="ttl">{t.name}</span>
                <span className="dsc">{t.description}</span>
                <span className="go" aria-hidden="true">
                  Mở công cụ
                  <Icon name="arrow" size={16} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="cc-related">
          <ChSectionHead title="Công cụ liên quan" />
          <div className="ch-grid c3">
            {RELATED.map((r) => (
              <Link className="ch-rowcard" href={r.href} key={r.href}>
                <Icon name={r.icon} size={20} />
                <span>
                  {r.label}
                  <small>{r.desc}</small>
                </span>
                <Icon name="chevron" size={16} className="arr" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </ChShell>
  );
}
