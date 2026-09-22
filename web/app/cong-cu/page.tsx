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

const TONES = ["t-son", "t-jade", "t-gold"] as const;
const ICON_TONES = ["", "jade", "gold"] as const;

const RELATED: { label: string; href: string; icon: IconName }[] = [
  { label: "Đổi ngày âm dương", href: "/doi-ngay-am-duong/", icon: "swap" },
  { label: "Tính tuổi và con giáp", href: "/tinh-tuoi/", icon: "user" },
  { label: "Xem ngày tốt", href: "/xem-ngay-tot/", icon: "sun" },
];

export default function ToolsHubPage() {
  return (
    <ChShell activeMenu="Đổi ngày">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Công cụ" }]}
        title="Công cụ ngày tháng"
        lead="Tính toán ngày dương lịch chính xác theo giờ Việt Nam, kèm thứ và ngày âm lịch của kết quả."
      />
      <div className="ch-wrap ch-main">
        <section>
          <ChSectionHead title="Chọn công cụ" />
          <div className="ch-grid c3">
            {TOOLS.map((t, i) => (
              <Link key={t.slug} href={t.href} className={`ch-tile ${TONES[i % 3]}`}>
                <span className={`ch-ico ${ICON_TONES[i % 3]}`}>
                  <Icon name={TOOL_ICON[t.slug] ?? "calendar"} size={28} />
                </span>
                <span className="ttl">{t.name}</span>
                <span className="dsc">{t.description}</span>
                <span className="go" aria-hidden="true">
                  <Icon name="arrow" size={20} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 44 }}>
          <ChSectionHead title="Công cụ liên quan" />
          <div className="ch-grid c3">
            {RELATED.map((r) => (
              <Link className="ch-rowcard" href={r.href} key={r.href}>
                <Icon name={r.icon} size={20} />
                <span>{r.label}</span>
                <Icon name="chevron" size={16} className="arr" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </ChShell>
  );
}
