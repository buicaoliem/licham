import Link from "next/link";
import type { ReactNode } from "react";
import { FOOTER_LINKS, buildTimeLabel } from "@/components/Footer";
import { MENU, type MenuItem, menuHref } from "@/components/Header";
import { Breadcrumb, type Crumb } from "@/components/calendar/Breadcrumb";
import { Icon } from "./Icon";
import { InkLandscape } from "./InkLandscape";

function Logo() {
  return (
    <Link href="/" className="ch-logo">
      <img src="/logo.svg" alt="" width={44} height={44} aria-hidden="true" />
      <span>
        Lịch <span className="son">Âm</span>
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
  return (
    <footer className="ch-foot">
      <div className="ch-wrap ch-foot-in">
        <Logo />
        <nav className="ch-foot-links" aria-label="Liên kết chân trang">
          {FOOTER_LINKS.map((l) => (
            <Link href={l.href} key={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ch-foot-meta">
          <span>Miễn phí, không quảng cáo · Thông tin phong thủy mang tính tham khảo</span>
          <span>
            <a href="mailto:lienhe@licham.app">Lienhe@licham.app</a> · Cập nhật {buildTimeLabel}
          </span>
        </div>
      </div>
    </footer>
  );
}

/** Khung trang Contemporary Heritage: đầu trang, nội dung, chân trang. */
export function ChShell({ activeMenu, children }: { activeMenu: MenuItem; children: ReactNode }) {
  return (
    <div className="ch">
      <ChHeader activeMenu={activeMenu} />
      <main>{children}</main>
      <ChFooter />
    </div>
  );
}

/** Dải đầu trang: breadcrumb, tiêu đề, mô tả, tranh sơn thủy bên phải. */
export function ChHero({
  crumbs,
  crumbJsonLd = true,
  eyebrow,
  title,
  lead,
  children,
}: {
  crumbs?: Crumb[];
  /** false: chỉ hiển thị breadcrumb, không phát JSON-LD (trang trước đây chưa có). */
  crumbJsonLd?: boolean;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="ch-hero">
      <div className="ch-hero-art">
        <InkLandscape idPrefix="hero" />
      </div>
      <div className="ch-wrap ch-hero-in">
        {crumbs && <Breadcrumb items={crumbs} jsonLd={crumbJsonLd} />}
        <div className="ch-hero-body">
          {eyebrow && <div className="ch-eyebrow">{eyebrow}</div>}
          <h1 className="ch-h1">{title}</h1>
          {lead && <p className="ch-lead">{lead}</p>}
          {children && <div className="ch-hero-extra">{children}</div>}
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
