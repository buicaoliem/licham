/**
 * Sinh bảng đối chiếu cho người không rành lập trình, để so tay với các
 * website lịch âm khác. Chạy: `pnpm run check:compare` (từ thư mục core)
 * hoặc `pnpm run check:compare` ở gốc repo.
 *
 * Cột "hoàng đạo hay hắc đạo" của ngày lấy theo phân loại 12 trực, dựa trên
 * bảng trực trong nguồn xonevn-ai/lunar-calendar (lib/core/constants.dart,
 * MIT — Copyright (c) 2025 Thigio.com): Trừ, Định, Chấp, Thành, Khai, Bế là
 * hoàng đạo; Kiến, Mãn, Bình, Phá, Nguy, Thu là hắc đạo.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { type DayInfo, type SolarDate, getDayInfo } from "../src/index.ts";

const TRUC_HOANG_DAO = new Set(["Trừ", "Định", "Chấp", "Thành", "Khai", "Bế"]);

const WEEKDAYS = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function fmtSolar(d: SolarDate & { dayOfWeek: number }): string {
  return `${pad2(d.day)}/${pad2(d.month)}/${d.year} (${WEEKDAYS[d.dayOfWeek]})`;
}

function fmtLunar(l: DayInfo["lunar"]): string {
  const leap = l.isLeapMonth ? " (nhuận)" : "";
  return `${pad2(l.day)}/${pad2(l.month)}/${l.year}${leap} — tháng ${l.monthLength === 30 ? "đủ" : "thiếu"}`;
}

function fmtSaoList(entries: { name: string }[]): string {
  return entries.length > 0 ? entries.map((e) => e.name).join(", ") : "(không có sao nào ứng)";
}

function fmtGioHoangDao(info: DayInfo): string {
  return info.hours
    .filter((h) => h.isHoangDao)
    .map((h) => `${h.start}-${h.end}`)
    .join(", ");
}

function today(): SolarDate {
  const now = new Date();
  return { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() };
}

function addDays(d: SolarDate, delta: number): SolarDate {
  const base = new Date(Date.UTC(d.year, d.month - 1, d.day));
  base.setUTCDate(base.getUTCDate() + delta);
  return { day: base.getUTCDate(), month: base.getUTCMonth() + 1, year: base.getUTCFullYear() };
}

function renderDay(label: string, date: SolarDate): string {
  const info = getDayInfo(date);
  const trucType = TRUC_HOANG_DAO.has(info.truc.name) ? "Hoàng đạo" : "Hắc đạo";

  const rows: [string, string][] = [
    ["Ngày dương", fmtSolar(info.solar)],
    ["Ngày âm", fmtLunar(info.lunar)],
    ["Can chi ngày", `${info.canChi.day.name} (${info.canChi.day.napAm.name}, hành ${info.canChi.day.napAm.element})`],
    ["Hoàng đạo hay hắc đạo", `${trucType} (trực ${info.truc.name})`],
    ["Trực", info.truc.name],
    ["Tiết khí", info.solarTerm.name],
    ["Ngũ hành (nạp âm ngày)", `${info.canChi.day.napAm.name} — hành ${info.canChi.day.napAm.element}`],
    ["Giờ hoàng đạo", fmtGioHoangDao(info)],
    ["Sao tốt", info.saoTot === null ? "chưa có dữ liệu" : fmtSaoList(info.saoTot)],
    ["Sao xấu", info.saoXau === null ? "chưa có dữ liệu" : fmtSaoList(info.saoXau)],
    [
      "Khổng Minh (lục diệu)",
      info.khongMinh === null ? "chưa có dữ liệu" : `${info.khongMinh.name} (${info.khongMinh.isGood ? "tốt" : "xấu"})`,
    ],
  ];

  const header = `### ${label}\n\n| Mục | Giá trị |\n|---|---|\n`;
  const body = rows.map(([k, v]) => `| ${k} | ${v} |`).join("\n");
  return `${header}${body}\n`;
}

function buildDates(): { label: string; date: SolarDate }[] {
  const t = today();
  const consecutive = Array.from({ length: 10 }, (_, i) => {
    const d = addDays(t, i - 4); // 4 ngày trước hôm nay đến 5 ngày sau
    return { label: `Ngày liên tiếp ${i + 1}: ${pad2(d.day)}/${pad2(d.month)}/${d.year}`, date: d };
  });

  const spread = Array.from({ length: 10 }, (_, i) => {
    const year = 2020 + i;
    const date: SolarDate = { day: 8, month: 3, year };
    return { label: `Ngày rải trong 2020–2030 (${i + 1}/10): 08/03/${year}`, date };
  });

  return [...consecutive, ...spread];
}

function main(): void {
  const dates = buildDates();
  const sections = dates.map(({ label, date }) => renderDay(label, date));

  const content = `# Bảng đối chiếu lịch âm — Liêm dùng để so tay với website khác

Sinh tự động ngày ${pad2(today().day)}/${pad2(today().month)}/${today().year}. Mỗi mục dưới đây là một ngày, với các
thông tin liệt kê thành bảng để dễ so sánh. Các dòng ghi "chưa có dữ liệu" là những mục Liêm
sẽ cấp bảng bổ sung sau (nhị thập bát tú, Hỷ Thần/Tài Thần, Lý Thuần Phong theo giờ, tuổi xung).

---

${sections.join("\n---\n\n")}`;

  const outPath = fileURLToPath(new URL("../../compare.md", import.meta.url));
  writeFileSync(outPath, content, "utf-8");
  console.log(`Đã ghi bảng đối chiếu vào ${outPath}`);
}

main();
