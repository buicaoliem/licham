import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export type XemTuoiTab = "ket-hon" | "xay-nha" | "xung-tuoi";

/**
 * Thanh chuyển giữa các công cụ xem tuổi đang có (không thêm công cụ mới).
 * `current`: mục đang xem; `exact` = đúng trang (aria-current="page"), ngược lại chỉ đánh dấu mục cha.
 */
export function XemTuoiTabs({ current, exact = true }: { current: XemTuoiTab; exact?: boolean }) {
  const tabs: { key: XemTuoiTab; label: string; href: string; icon: IconName }[] = [
    { key: "ket-hon", label: "Kết hôn", href: "/xem-tuoi-ket-hon/", icon: "rings" },
    { key: "xay-nha", label: "Xây nhà", href: "/phong-thuy/xem-tuoi-xay-nha/", icon: "home" },
    { key: "xung-tuoi", label: "Xung tuổi", href: "/phong-thuy/xung-tuoi/", icon: "bolt" },
  ];
  return (
    <nav className="kh-tabs" aria-label="Công cụ xem tuổi">
      {tabs.map((t) => (
        <Link key={t.key} href={t.href} aria-current={t.key === current ? (exact ? "page" : "true") : undefined}>
          <Icon name={t.icon} size={19} />
          {t.label}
        </Link>
      ))}
    </nav>
  );
}

/** Khung form dùng chung của nhóm Xem tuổi hợp: tab công cụ + một dòng mô tả + nội dung form. */
export function XemTuoiFormCard({
  current,
  exact,
  desc,
  children,
}: {
  current: XemTuoiTab;
  exact?: boolean;
  desc: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="ch-card kh-formcard">
      <XemTuoiTabs current={current} exact={exact} />
      <p className="kh-formdesc">{desc}</p>
      {children}
    </section>
  );
}

/** Hộp bên: tiêu đề + nội dung. */
export function SideBox({ title, icon, tone, children }: { title: string; icon: IconName; tone?: "jade" | "gold"; children: ReactNode }) {
  return (
    <div className="ch-sidebox kh-side">
      <h2 className={tone ? `ch-sidebox-h ${tone}` : "ch-sidebox-h"}>
        <Icon name={icon} size={20} />
        {title}
      </h2>
      <div className="ch-sidebox-b">{children}</div>
    </div>
  );
}

/** Các bước dùng công cụ (hoặc cách tính) — danh sách đánh số. */
export function XemTuoiSteps({ title, icon = "book", steps }: { title: string; icon?: IconName; steps: { t: ReactNode; d: ReactNode }[] }) {
  return (
    <SideBox title={title} icon={icon}>
      <ol className="kh-steps">
        {steps.map((s, i) => (
          <li key={i}>
            <span className="n" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <b>{s.t}</b>
              <span>{s.d}</span>
            </div>
          </li>
        ))}
      </ol>
    </SideBox>
  );
}

/** Các bước xem tuổi kết hôn — mô tả đúng luồng của công cụ. */
export const KET_HON_STEPS: { t: string; d: string }[] = [
  { t: "Chọn năm sinh", d: "Năm sinh dương lịch của nam và nữ; sinh trước Tết thì can chi có thể lùi một năm." },
  { t: "Xem mức độ hợp", d: "So con giáp, mệnh nạp âm và thiên can; mỗi yếu tố xếp Tốt, Bình hòa hoặc Không tốt." },
  { t: "Chọn năm cưới", d: "Bảng 5 năm theo Kim Lâu của cô dâu; có thể đổi năm xem để dời bảng." },
  { t: "Chọn ngày cưới", d: "Có năm rồi thì xem ngày tốt cưới hỏi trong năm đó." },
];

/** Giải thích 4 mức độ hợp nhau — diễn giải đúng quy tắc của mucDoHopNhau (lib/xem-tuoi-ket-hon.ts). */
export function KetHonLegend() {
  const rows: { cls: string; label: string; text: string }[] = [
    { cls: "g", label: "Rất hợp", text: "Từ 2 trong 3 yếu tố tốt, không yếu tố nào xấu." },
    { cls: "g", label: "Hợp", text: "1 yếu tố tốt, các yếu tố còn lại bình hòa." },
    { cls: "k", label: "Bình thường", text: "Có 1 yếu tố xấu, hoặc cả 3 yếu tố đều bình hòa." },
    { cls: "r", label: "Cần cân nhắc", text: "Từ 2 yếu tố xấu trở lên." },
  ];
  return (
    <SideBox title="Ý nghĩa kết quả" icon="clover" tone="jade">
      <p className="kh-side-lead">Ba yếu tố: con giáp, mệnh nạp âm và thiên can — mỗi yếu tố xếp Tốt, Bình hòa hoặc Không tốt.</p>
      <ul className="kh-legend">
        {rows.map((r) => (
          <li key={r.label} className={r.cls}>
            <span className="lb">
              <Icon name="clover" size={16} />
              {r.label}
            </span>
            <span>{r.text}</span>
          </li>
        ))}
      </ul>
    </SideBox>
  );
}

/** Chú giải dạng nhãn + mô tả dùng cho trang xây nhà / xung tuổi. */
export function XemTuoiLegend({ title, lead, rows }: { title: string; lead?: ReactNode; rows: { cls: "g" | "k" | "r"; label: string; text: ReactNode }[] }) {
  return (
    <SideBox title={title} icon="clover" tone="jade">
      {lead && <p className="kh-side-lead">{lead}</p>}
      <ul className="kh-legend">
        {rows.map((r) => (
          <li key={r.label} className={r.cls}>
            <span className="lb">{r.label}</span>
            <span>{r.text}</span>
          </li>
        ))}
      </ul>
    </SideBox>
  );
}

export interface RelatedLink {
  label: string;
  sub: string;
  href: string;
  icon: IconName;
}

const KET_HON_LINKS: RelatedLink[] = [
  { label: "Xem ngày tốt cưới hỏi", sub: "Chọn ngày lành cho lễ ăn hỏi, lễ cưới", href: "/xem-ngay-tot/cuoi-hoi/", icon: "sun" },
  { label: "Xem tuổi 12 con giáp", sub: "Tuổi hợp, tuổi kỵ, mệnh theo năm sinh", href: "/tuoi/", icon: "yinyang" },
  { label: "Tính tuổi", sub: "Tuổi dương và tuổi mụ theo ngày sinh", href: "/tinh-tuoi/", icon: "cake" },
  { label: "Đổi ngày âm dương", sub: "Chuyển đổi giữa âm lịch và dương lịch", href: "/doi-ngay-am-duong/", icon: "swap" },
];

export function XemTuoiRelated({ links = KET_HON_LINKS }: { links?: RelatedLink[] }) {
  return (
    <SideBox title="Công cụ liên quan" icon="list">
      <ul className="ch-linklist kh-rel">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>
              <span className="ic" aria-hidden="true">
                <Icon name={l.icon} size={19} />
              </span>
              <span className="tx">
                {l.label}
                <small>{l.sub}</small>
              </span>
              <Icon name="chevron" size={16} className="arr" />
            </Link>
          </li>
        ))}
      </ul>
    </SideBox>
  );
}
