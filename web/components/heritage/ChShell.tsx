import Link from "next/link";
import type { ReactNode } from "react";
import { FOOTER_LINKS, buildTimeLabel } from "@/components/Footer";
import { MENU, type MenuItem, menuHref } from "@/components/Header";
import { Breadcrumb, type Crumb } from "@/components/calendar/Breadcrumb";
import { HERITAGE_SLOTS, heritageSlot } from "@/lib/heritage-assets";
import { HeritageImage, heritageVisible } from "./HeritageImage";
import { Icon } from "./Icon";

/** Khẩu hiệu thương hiệu theo mock Contemporary Heritage (licham-01, licham-10). */
export const BRAND_TAGLINE = "Giữ gìn cội nguồn Việt";

/** Liên kết giới thiệu/pháp lý hiển thị ở hàng đầu chân trang, theo mock. */
const FOOT_PRIMARY = ["/gioi-thieu/", "/dieu-khoan/", "/chinh-sach-bao-mat/", "/lien-he/"];

function Logo({ small = false }: { small?: boolean }) {
  // Dấu triện là asset riêng; khi chưa có file thì dùng logo hiện hành của site.
  const seal = heritageSlot("logoSeal");
  return (
    <Link href="/" className={small ? "ch-logo sm" : "ch-logo"}>
      <img src={seal ?? "/logo.svg"} alt="" width={48} height={48} aria-hidden="true" />
      <span className="ch-logo-t">
        <span className="ch-logo-name">Lịch Âm</span>
        <span className="ch-logo-tag">{BRAND_TAGLINE}</span>
      </span>
    </Link>
  );
}

function ChHeader({ activeMenu }: { activeMenu: MenuItem }) {
  const items = MENU.map((item) => (
    <li key={item} className={item === activeMenu ? "on" : undefined}>
      <Link href={menuHref(item)} aria-current={item === activeMenu ? "page" : undefined}>
        {item}
      </Link>
    </li>
  ));
  return (
    <header className="ch-head">
      <div className="ch-wrap ch-head-in">
        <Logo />
        <nav className="ch-nav" aria-label="Menu chính">
          <ul>{items}</ul>
        </nav>
        <details className="ch-menu">
          <summary aria-label="Mở menu">
            <Icon name="menu" size={22} />
          </summary>
          <nav className="ch-menu-panel" aria-label="Menu chính">
            <ul>{items}</ul>
          </nav>
        </details>
      </div>
    </header>
  );
}

function ChFooter() {
  const primary = FOOTER_LINKS.filter((l) => FOOT_PRIMARY.includes(l.href)).sort(
    (a, b) => FOOT_PRIMARY.indexOf(a.href) - FOOT_PRIMARY.indexOf(b.href),
  );
  const explore = FOOTER_LINKS.filter((l) => !FOOT_PRIMARY.includes(l.href));
  return (
    <footer className="ch-foot">
      <div className="ch-wrap">
        <div className="ch-foot-top">
          <Logo small />
          <nav className="ch-foot-primary" aria-label="Thông tin">
            {primary.map((l) => (
              <Link href={l.href} key={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <a className="ch-foot-mail" href="mailto:lienhe@licham.app">
            Lienhe@licham.app
          </a>
        </div>
        <nav className="ch-foot-explore" aria-label="Khám phá">
          <span>Khám phá</span>
          {explore.map((l) => (
            <Link href={l.href} key={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ch-foot-meta">
          <span>Miễn phí, không quảng cáo · Thông tin phong thủy mang tính tham khảo</span>
          <span>Cập nhật {buildTimeLabel}</span>
        </div>
      </div>
    </footer>
  );
}

/** Khung trang Contemporary Heritage: tranh lề hai bên (nếu có asset), đầu trang, nội dung, chân trang. */
export function ChShell({
  activeMenu,
  className,
  children,
}: {
  activeMenu: MenuItem;
  /** Lớp bổ sung để một nhóm trang tinh chỉnh khung riêng (vd. tranh lề). */
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className ? `ch ${className}` : "ch"}>
      <div className="ch-side-art l" aria-hidden="true">
        <HeritageImage src={HERITAGE_SLOTS.sideLeft.path} label={HERITAGE_SLOTS.sideLeft.spec} />
      </div>
      <div className="ch-side-art r" aria-hidden="true">
        <HeritageImage src={HERITAGE_SLOTS.sideRight.path} label={HERITAGE_SLOTS.sideRight.spec} />
      </div>
      <ChHeader activeMenu={activeMenu} />
      <main>{children}</main>
      <ChFooter />
    </div>
  );
}

/** Dải đầu trang: breadcrumb, tiêu đề, mô tả; tranh minh họa bên phải khi có asset. */
export function ChHero({
  crumbs,
  crumbJsonLd = true,
  eyebrow,
  title,
  lead,
  art,
  className,
  children,
}: {
  crumbs?: Crumb[];
  /** false: chỉ hiển thị breadcrumb, không phát JSON-LD (trang trước đây chưa có). */
  crumbJsonLd?: boolean;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  /** Asset tranh hero (đường dẫn trong public). */
  art?: { src: string; label?: string };
  /** Lớp bổ sung để trang tinh chỉnh tỷ lệ hero riêng. */
  className?: string;
  children?: ReactNode;
}) {
  const hasArt = art ? heritageVisible(art.src) : false;
  const cls = ["ch-hero", hasArt ? "has-art" : "", className ?? ""].filter(Boolean).join(" ");
  return (
    <section className={cls}>
      <div className="ch-wrap ch-hero-in">
        {crumbs && <Breadcrumb items={crumbs} jsonLd={crumbJsonLd} />}
        <div className="ch-hero-grid">
          <div className="ch-hero-body">
            {eyebrow && <div className="ch-eyebrow">{eyebrow}</div>}
            <h1 className="ch-h1">{title}</h1>
            {lead && <p className="ch-lead">{lead}</p>}
            {children && <div className="ch-hero-extra">{children}</div>}
          </div>
          {art && hasArt && (
            <div className="ch-hero-art">
              <HeritageImage src={art.src} label={art.label} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Tiêu đề mục: h2 + mô tả ngắn + liên kết phụ bên phải (tùy chọn). */
export function ChSectionHead({ title, sub, more, id }: { title: ReactNode; sub?: ReactNode; more?: ReactNode; id?: string }) {
  return (
    <div className="ch-sec-head">
      <div>
        <h2 className="ch-h2" id={id}>
          {title}
        </h2>
        {sub && <p className="ch-sub">{sub}</p>}
      </div>
      {more}
    </div>
  );
}
