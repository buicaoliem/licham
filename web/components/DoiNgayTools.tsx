"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { type SolarDate, isValidSolarDate, jdFromDate, lunarToSolar } from "@licham/core";
import { Icon } from "@/components/heritage/Icon";
import { parseKey, vnTodayKey } from "@/lib/calendar/vn-today";
import { pad2 } from "@/lib/format";

function toISO(d: SolarDate): string {
  return `${d.year}-${pad2(d.month)}-${pad2(d.day)}`;
}

function parseISO(s: string): SolarDate | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = { year: Number(m[1]), month: Number(m[2]), day: Number(m[3]) };
  return isValidSolarDate(d.day, d.month, d.year) ? d : null;
}

function ToolCard({ icon, title, children }: { icon: "calendar" | "flame" | "cake"; title: string; children: React.ReactNode }) {
  return (
    <section className="ch-card dn-tool">
      <h3 className="dn-tool-h">
        <span className="ic" aria-hidden="true">
          <Icon name={icon} size={18} />
        </span>
        {title}
      </h3>
      {children}
    </section>
  );
}

function DemNgay({ today }: { today: SolarDate }) {
  const [fromIso, setFromIso] = useState(() => toISO({ ...today, month: 1, day: 1 }));
  const [toIso, setToIso] = useState(() => toISO(today));
  const [touched, setTouched] = useState(false);

  // Trang tĩnh có thể mở vào ngày khác ngày dựng: đặt lại mặc định theo hôm nay giờ Việt Nam nếu chưa sửa ô nào.
  useEffect(() => {
    if (touched) return;
    setFromIso(toISO({ ...today, month: 1, day: 1 }));
    setToIso(toISO(today));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [today]);

  const from = parseISO(fromIso);
  const to = parseISO(toIso);
  const days = from && to ? jdFromDate(to.day, to.month, to.year) - jdFromDate(from.day, from.month, from.year) : null;

  return (
    <ToolCard icon="calendar" title="Đếm ngày">
      <div className="difld">
        <label htmlFor="dn-from">Từ ngày</label>
        <input
          id="dn-from"
          type="date"
          value={fromIso}
          onChange={(e) => {
            setTouched(true);
            setFromIso(e.target.value);
          }}
        />
      </div>
      <div className="difld">
        <label htmlFor="dn-to">Đến ngày</label>
        <input
          id="dn-to"
          type="date"
          value={toIso}
          onChange={(e) => {
            setTouched(true);
            setToIso(e.target.value);
          }}
        />
      </div>
      <div className="diresrow">
        <span>Cách nhau</span>
        <span>{days === null ? "—" : `${Math.abs(days)} ngày`}</span>
      </div>
    </ToolCard>
  );
}

function DoiNgayGio({ today }: { today: SolarDate }) {
  const [day, setDay] = useState(20);
  const [month, setMonth] = useState(12);

  const years: { year: number; label: string }[] = [];
  for (let y = today.year + 1; y <= today.year + 5; y++) {
    try {
      const solar = lunarToSolar(day, month, y, false);
      years.push({ year: y, label: `${pad2(solar.day)}/${pad2(solar.month)}` });
    } catch {
      years.push({ year: y, label: "—" });
    }
  }

  return (
    <ToolCard icon="flame" title="Đổi ngày giỗ sang dương">
      <div className="difld">
        <label htmlFor="gio-ngay">Ngày âm</label>
        <div className="dn-am">
          <input
            id="gio-ngay"
            type="number"
            inputMode="numeric"
            aria-label="Ngày âm"
            min={1}
            max={30}
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
          />
          <input
            type="number"
            inputMode="numeric"
            aria-label="Tháng âm"
            min={1}
            max={12}
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
          />
        </div>
      </div>
      {years.map((y) => (
        <div className="diresrow" key={y.year}>
          <span>Năm {y.year}</span>
          <span>{y.label}</span>
        </div>
      ))}
    </ToolCard>
  );
}

function TinhTuoi() {
  return (
    <ToolCard icon="cake" title="Tính tuổi">
      <p className="dn-tool-p">
        Tuổi dương, tuổi mụ, can chi và sinh nhật tới — nhập đủ ngày sinh (kể cả trước Tết) ở trang riêng. Ô năm sinh cũ
        không còn cộng tuổi mụ = tuổi dương + 1.
      </p>
      <Link className="ch-btn dn-tool-go" href="/tinh-tuoi/">
        Mở tính tuổi dương và tuổi mụ
        <Icon name="arrow" size={16} />
      </Link>
    </ToolCard>
  );
}

export function DoiNgayTools({ initial }: { initial: SolarDate }) {
  const [today, setToday] = useState(initial);
  useEffect(() => {
    const t = parseKey(vnTodayKey());
    if (toISO(t) !== toISO(initial)) setToday(t);
  }, [initial]);

  return (
    <div className="dn-tools">
      <DemNgay today={today} />
      <DoiNgayGio today={today} />
      <TinhTuoi />
    </div>
  );
}
