"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { type SolarDate, vietnamDateOf } from "@licham/core";
import { upcomingInDays } from "@/lib/van-hoa/upcoming";
import { pad2 } from "@/lib/format";
import s from "./van-hoa.module.css";

/** Tính ở client sau khi hydrate (giống HomNay) để tránh lệch ngày giữa bản dựng tĩnh và giờ Việt Nam thật. */
export function Upcoming() {
  const [today, setToday] = useState<SolarDate | null>(null);
  useEffect(() => {
    setToday(vietnamDateOf(new Date()));
  }, []);

  if (!today) return null;
  const items = upcomingInDays(today, 30);
  if (items.length === 0) return null;

  return (
    <ul className={s.newList}>
      {items.map((it) => (
        <li key={`${it.kind}-${it.slug}`} className={s.newItem}>
          <div className={s.newBody}>
            <p className={s.note}>
              {pad2(it.date.day)}/{pad2(it.date.month)} · {it.daysUntil === 0 ? "Hôm nay" : `còn ${it.daysUntil} ngày`}
            </p>
            <h3 className={s.h3}>{it.name}</h3>
            <p className={s.topicDesc}>{it.desc}</p>
            <p className={s.more}>
              <Link href={it.href}>Xem thêm</Link>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
