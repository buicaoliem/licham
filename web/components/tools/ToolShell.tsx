import Link from "next/link";
import type { ReactNode } from "react";
import { ShareButton } from "@/components/ShareButton";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { Icon, type IconName } from "@/components/heritage/Icon";
import type { DateSummary } from "@/lib/calendar/date-info";
import { monthHref } from "@/lib/calendar/urls";
import { TOOLS, type ToolDef } from "@/lib/tools/tools";
import { getVietnamToday } from "@/lib/today";

/** Icon minh họa cho từng công cụ (chỉ trang trí). */
export const TOOL_ICON: Record<string, IconName> = {
  "dem-ngay": "calendar",
  "ngay-sau": "calPlus",
  "ngay-truoc": "calMinus",
  "con-bao-nhieu-ngay": "hourglass",
  "da-bao-nhieu-ngay": "history",
  "tuoi-theo-ngay-sinh": "cake",
};

export function ToolShell({ tool, children, notes }: { tool: ToolDef; children: ReactNode; notes?: string[] }) {
  const today = getVietnamToday();
  const related = [
    ...TOOLS.filter((t) => t.slug !== tool.slug).map((t) => ({ label: t.name, href: t.href, icon: TOOL_ICON[t.slug] ?? "calendar" })),
    { label: `Lịch tháng ${today.month} năm ${today.year}`, href: monthHref(today.month, today.year), icon: "calendar" as IconName },
    { label: "Đổi ngày âm dương", href: "/doi-ngay-am-duong/", icon: "swap" as IconName },
  ];
  return (
    <ChShell activeMenu="Đổi ngày">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Công cụ", href: "/cong-cu/" }, { label: tool.name }]}
        title={tool.h1}
        lead={tool.intro}
      />
      <div className="ch-wrap ch-main ch-stack">
        {children}
        <div className="tool-bottom">
          {notes && notes.length > 0 && (
            <section className="ch-card">
              <h2 className="ch-h2 ch-card-h">Cách tính</h2>
              <ol className="ch-steps">
                {notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ol>
            </section>
          )}
          <section className="ch-card">
            <h2 className="ch-h2 ch-card-h">Có thể bạn quan tâm</h2>
            <div className="ch-grid c2">
              {related.map((l) => (
                <Link className="ch-rowcard" href={l.href} key={l.href}>
                  <Icon name={l.icon} size={20} />
                  <span>{l.label}</span>
                  <Icon name="chevron" size={16} className="arr" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ChShell>
  );
}

export function ToolForm({
  tool,
  title,
  submitLabel = "Tính",
  children,
}: {
  tool: ToolDef;
  title: string;
  submitLabel?: string;
  children: ReactNode;
}) {
  return (
    <form method="get" action={tool.href} className="ch-card tool-form">
      <h2 className="ch-h2 ch-card-h">{title}</h2>
      <div className="ch-formrow">
        {children}
        <button type="submit" className="ch-btn pri lg">
          {submitLabel}
          <Icon name="arrow" size={18} />
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
    <div className="dierr" role="alert">
      {children}
    </div>
  );
}

/** Ô số liệu nổi bật trong khối kết quả: giá trị lớn, nhãn, ghi chú nhỏ. */
export interface ResultStat {
  value: string;
  label: string;
  hint?: string;
  /** Giá trị dạng chữ dài (vd. "1 năm 2 tháng") hiển thị cỡ nhỏ hơn. */
  small?: boolean;
}

export function ResultBox({
  title,
  rows,
  stats,
  share,
}: {
  title: string;
  rows: [string, ReactNode][];
  stats?: ResultStat[];
  share?: { url: string; title: string; text: string } | null;
}) {
  return (
    <section className="ch-card" aria-live="polite">
      <div className="ch-card-h">
        <h2 className="ch-h2">Kết quả</h2>
        <p className="ch-sub">{title}</p>
      </div>
      {stats && stats.length > 0 && (
        <div className="ch-stats" style={{ marginBottom: rows.length ? 18 : 0 }}>
          {stats.map((s) => (
            <div className="ch-stat" key={s.label}>
              <div className={s.small ? "v sm" : "v"}>{s.value}</div>
              <div className="k">{s.label}</div>
              {s.hint && <div className="h">{s.hint}</div>}
            </div>
          ))}
        </div>
      )}
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
