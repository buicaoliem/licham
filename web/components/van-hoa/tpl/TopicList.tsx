"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/heritage/Icon";
import { normalizeVi } from "@/lib/van-hoa/logic";
import type { ItemLabel } from "@/lib/van-hoa/types";
import s from "../van-hoa.module.css";
import t from "./tpl.module.css";
import { Drafting, ItemBadge, Pic, SectionTitle } from "./Shared";

export interface TopicItem {
  href: string;
  title: string;
  summary: string;
  group: string;
  label?: ItemLabel;
  image?: string;
  imageAlt?: string;
  /** Chữ bổ sung để tìm kiếm (tên khác, nơi thờ…). */
  search?: string;
}

/** Danh sách theo nhóm: tìm kiếm + chip nhóm chạy phía trình duyệt ("Tất cả" luôn đứng đầu). */
export function TopicList({ items, groups, placeholder }: { items: readonly TopicItem[]; groups: readonly { key: string; title: string }[]; placeholder: string }) {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("all");
  const haystack = useMemo(() => new Map(items.map((n) => [n.href, normalizeVi(`${n.title} ${n.summary} ${n.search ?? ""} ${groups.find((g) => g.key === n.group)?.title ?? ""}`)])), [items, groups]);
  if (items.length === 0) return <Drafting />;
  const needle = normalizeVi(q.trim());
  const shown = items.filter((n) => (group === "all" || n.group === group) && (!needle || haystack.get(n.href)?.includes(needle)));
  const present = groups.filter((g) => shown.some((n) => n.group === g.key));
  return (
    <>
      <label className={t.search}>
        <Icon name="search" size={20} />
        <span style={{ position: "absolute", left: -9999 }}>{placeholder}</span>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} enterKeyHint="search" />
      </label>
      <ul className={t.chips} aria-label="Lọc theo nhóm">
        {[{ key: "all", title: "Tất cả" }, ...groups].map((g) => (
          <li key={g.key}>
            <button type="button" className={`${t.chip} ${group === g.key ? t.chipOn : ""}`} aria-pressed={group === g.key} onClick={() => setGroup(g.key)}>
              {g.title}
            </button>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className={t.empty}>Không tìm thấy kết quả phù hợp.</p>}
      {present.map((g) => (
        <section key={g.key} aria-labelledby={`nhom-${g.key}`}>
          <SectionTitle id={`nhom-${g.key}`}>{g.title}</SectionTitle>
          <ul className={t.cards}>
            {shown
              .filter((n) => n.group === g.key)
              .map((n) => (
                <li key={n.href} className={t.cardItem}>
                  <Pic src={n.image} alt={n.imageAlt} className={t.cardImg} width={112} height={160} />
                  <div className={t.cardBody}>
                    {n.label && <ItemBadge label={n.label} />}
                    <h3 className={t.cardName}>{n.title}</h3>
                    <p className={s.muted} style={{ color: "var(--vh-ink)" }}>
                      {n.summary}
                    </p>
                    <p className={t.moreR}>
                      <Link href={n.href}>Xem chi tiết</Link>
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </>
  );
}
