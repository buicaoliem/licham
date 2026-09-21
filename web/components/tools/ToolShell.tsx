import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ShareButton } from "@/components/ShareButton";
import { Breadcrumb } from "@/components/calendar/Breadcrumb";
import { RelatedLinks } from "@/components/calendar/RelatedLinks";
import type { DateSummary } from "@/lib/calendar/date-info";
import { monthHref } from "@/lib/calendar/urls";
import { TOOLS, type ToolDef } from "@/lib/tools/tools";
import { getVietnamToday } from "@/lib/today";

export function ToolShell({ tool, children, notes }: { tool: ToolDef; children: ReactNode; notes?: string[] }) {
  const today = getVietnamToday();
  const related = [
    ...TOOLS.filter((t) => t.slug !== tool.slug).map((t) => ({ label: t.name, href: t.href })),
    { label: `Lịch tháng ${today.month} năm ${today.year}`, href: monthHref(today.month, today.year) },
    { label: "Đổi ngày âm dương", href: "/doi-ngay-am-duong/" },
  ];
  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Đổi ngày" />
        <div className="dhead">
          <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Công cụ", href: "/cong-cu/" }, { label: tool.name }]} />
          <h1 className="dh1">{tool.h1}</h1>
          <p className="dsub">{tool.intro}</p>
        </div>
        <div className="body">
          {children}
          {notes && notes.length > 0 && (
            <section style={{ marginTop: 28 }}>
              <h2 className="hh">Cách tính</h2>
              <ul className="lst">
                {notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </section>
          )}
          <RelatedLinks links={related} />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export function ToolForm({ tool, title, children }: { tool: ToolDef; title: string; children: ReactNode }) {
  return (
    <form method="get" action={tool.href} className="box">
      <h2 className="box-h">
        <span className="rule" />
        <span className="t">{title}</span>
        <span className="rule" />
      </h2>
      {children}
      <div style={{ textAlign: "center", marginTop: 14 }}>
        <button type="submit" className="btn pri">
          Tính
        </button>
      </div>
    </form>
  );
}

export function DateField({
  id,
  name,
  label,
  value,
  hint,
  required = true,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="difld">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type="date" defaultValue={value} min="1900-01-01" max="2100-12-31" required={required} />
      {hint && <p className="fldhint">{hint}</p>}
    </div>
  );
}

export function SelectField({
  id,
  name,
  label,
  value,
  options,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="difld">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name} defaultValue={value}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function NumberField({ id, name, label, value, max }: { id: string; name: string; label: string; value: string; max: number }) {
  return (
    <div className="difld">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type="number" inputMode="numeric" min={0} max={max} step={1} defaultValue={value} required />
    </div>
  );
}

export function ToolError({ children }: { children: ReactNode }) {
  return (
    <div className="dierr" role="alert" style={{ marginTop: 14 }}>
      {children}
    </div>
  );
}

export function ResultBox({ title, rows, share }: { title: string; rows: [string, ReactNode][]; share?: { url: string; title: string; text: string } | null }) {
  return (
    <section className="box" style={{ marginTop: 16 }} aria-live="polite">
      <h2 className="box-h">
        <span className="rule" />
        <span className="t">{title}</span>
        <span className="rule" />
      </h2>
      {rows.map(([k, v]) => (
        <div className="diresrow" key={k}>
          <span>{k}</span>
          <span>{v}</span>
        </div>
      ))}
      {share && (
        <div className="resbox-act">
          <ShareButton url={share.url} title={share.title} text={share.text} />
        </div>
      )}
    </section>
  );
}

/** "Thứ hai, 21/09/2026 · 11/8 âm lịch, năm Bính Ngọ" kèm link trang lịch ngày nếu có. */
export function DateLine({ s }: { s: DateSummary }) {
  const d = s.date;
  const text = `${s.weekday}, ${String(d.day).padStart(2, "0")}/${String(d.month).padStart(2, "0")}/${d.year} · ${s.lunarLabel}`;
  return (
    <>
      {text}
      {s.href && (
        <>
          {" "}
          <Link href={s.href}>Xem lịch ngày ›</Link>
        </>
      )}
    </>
  );
}

