"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/heritage/Icon";
import { normalizeVi } from "@/lib/van-hoa/logic";
import { NHAN_VAT_GROUPS, type NhanVat } from "@/lib/van-hoa/types";
import s from "../van-hoa.module.css";
import t from "./tpl.module.css";
import { Drafting, ItemBadge, Pic, SectionTitle } from "./Shared";

/** Tìm kiếm + chip nhóm chạy phía trình duyệt; nội dung vẫn có sẵn trong HTML khi chưa có JS. */
export function NhanVatList({ items }: { items: readonly NhanVat[] }) {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<string>("all");

  const haystack = useMemo(
    () =>
      new Map(
        items.map((n) => [
          n.slug,
          normalizeVi([n.name, ...(n.otherNames ?? []), n.summary, ...(n.places ?? []).map((p) => `${p.name} ${p.address}`), NHAN_VAT_GROUPS.find((g) => g.key === n.group)?.title ?? ""].join(" ")),
        ]),
      ),
    [items],
  );
  const needle = normalizeVi(q.trim());
  const shown = items.filter((n) => (group === "all" || n.group === group) && (!needle || haystack.get(n.slug)?.includes(needle)));
  const groups = NHAN_VAT_GROUPS.filter((g) => shown.some((n) => n.group === g.key));

  if (items.length === 0) return <Drafting />;
  return (
    <>
      <label className={t.search}>
        <Icon name="search" size={20} />
        <span style={{ position: "absolute", left: -9999 }}>Tìm nhân vật, nơi thờ, nhóm</span>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Tìm nhân vật, nơi thờ, nhóm…" enterKeyHint="search" />
      </label>
      <ul className={t.chips} aria-label="Lọc theo nhóm">
        {[{ key: "all", title: "Tất cả" }, ...NHAN_VAT_GROUPS].map((g) => (
          <li key={g.key}>
            <button type="button" className={`${t.chip} ${group === g.key ? t.chipOn : ""}`} aria-pressed={group === g.key} onClick={() => setGroup(g.key)}>
              {g.title}
            </button>
          </li>
        ))}
      </ul>
      {shown.length === 0 && <p className={t.empty}>Không tìm thấy nhân vật phù hợp.</p>}
      {groups.map((g) => (
        <section key={g.key} aria-labelledby={`nhom-${g.key}`}>
          <SectionTitle id={`nhom-${g.key}`}>{g.title}</SectionTitle>
          <ul className={t.cards}>
            {shown
              .filter((n) => n.group === g.key)
              .map((n) => (
                <li key={n.slug} className={t.cardItem}>
                  <Pic src={n.image} alt={n.imageAlt} className={t.cardImg} width={112} height={160} />
                  <div className={t.cardBody}>
                    <ItemBadge label={n.label} />
                    <h3 className={t.cardName}>{n.name}</h3>
                    <p className={s.muted} style={{ color: "var(--vh-ink)" }}>
                      {n.summary}
                    </p>
                    <p className={t.moreR}>
                      <Link href={`/van-hoa/nhan-vat/${n.slug}/`}>Xem chi tiết</Link>
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
