import Link from "next/link";
import { Icon, type IconName } from "./Icon";

/**
 * Thanh chuyển giữa các công cụ xem tuổi đang có (không thêm công cụ mới).
 * `current`: mục đang xem; `exact` = đúng trang (aria-current="page"), ngược lại chỉ đánh dấu mục cha.
 */
export function XemTuoiTabs({ current, exact = true }: { current: "ket-hon" | "xay-nha" | "xung-tuoi"; exact?: boolean }) {
  const tabs: { key: typeof current; label: string; href: string; icon: IconName }[] = [
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

/** Giải thích 4 mức độ hợp nhau — diễn giải đúng quy tắc của mucDoHopNhau (lib/xem-tuoi-ket-hon.ts). */
export function KetHonLegend() {
  const rows: { cls: string; label: string; text: string }[] = [
    { cls: "pill g", label: "Rất hợp", text: "Từ 2 trong 3 yếu tố tốt, không yếu tố nào xấu." },
    { cls: "pill g", label: "Hợp", text: "1 yếu tố tốt, các yếu tố còn lại bình hòa." },
    { cls: "pill k", label: "Bình thường", text: "Có 1 yếu tố xấu, hoặc cả 3 yếu tố đều bình hòa." },
    { cls: "pill r", label: "Cần cân nhắc", text: "Từ 2 yếu tố xấu trở lên." },
  ];
  return (
    <div className="ch-sidebox">
      <h2 className="ch-sidebox-h jade">
        <Icon name="clover" size={20} />Ý nghĩa kết quả
      </h2>
      <div className="ch-sidebox-b" style={{ paddingTop: 16, paddingBottom: 18 }}>
        <p style={{ margin: "0 0 12px", fontSize: 13.5, color: "var(--ink-3)" }}>Ba yếu tố: con giáp, mệnh nạp âm và thiên can.</p>
        <ul className="kh-legend">
          {rows.map((r) => (
            <li key={r.label}>
              <span className={r.cls}>{r.label}</span>
              <span>{r.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function XemTuoiRelated() {
  const links: { label: string; href: string; icon: IconName }[] = [
    { label: "Xem ngày tốt cưới hỏi", href: "/xem-ngay-tot/cuoi-hoi/", icon: "sun" },
    { label: "Xem tuổi 12 con giáp", href: "/tuoi/", icon: "yinyang" },
    { label: "Tuổi xây nhà", href: "/phong-thuy/xem-tuoi-xay-nha/", icon: "home" },
    { label: "Xung tuổi", href: "/phong-thuy/xung-tuoi/", icon: "bolt" },
  ];
  return (
    <div className="ch-sidebox">
      <h2 className="ch-sidebox-h">
        <Icon name="list" size={20} />
        Công cụ liên quan
      </h2>
      <div className="ch-sidebox-b">
        <ul className="ch-linklist">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>
                <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <Icon name={l.icon} size={18} />
                  {l.label}
                </span>
                <Icon name="chevron" size={16} className="arr" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
