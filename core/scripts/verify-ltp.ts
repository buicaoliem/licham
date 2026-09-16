/**
 * In bảng Lý Thuần Phong của 12 khung giờ, cho 6 ngày mẫu, để Liêm so tay với
 * lichvannien.net hoặc xemlicham.com — bảng này CHƯA được đối chiếu với ngày
 * thật (xem ghi chú trong core/src/tables/ly-thuan-phong.ts).
 * Chạy: `pnpm run verify:ltp` (từ gốc repo hoặc từ thư mục core).
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { type DayInfo, type SolarDate, getDayInfo } from "../src/index.ts";

const WEEKDAYS = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function fmtSolar(d: SolarDate & { dayOfWeek: number }): string {
  return `${pad2(d.day)}/${pad2(d.month)}/${d.year} (${WEEKDAYS[d.dayOfWeek]})`;
}

function fmtLunar(l: DayInfo["lunar"]): string {
  const leap = l.isLeapMonth ? " (nhuận)" : "";
  return `${pad2(l.day)}/${pad2(l.month)}/${l.year}${leap}`;
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

  const header = `### ${label}

| Mục | Giá trị |
|---|---|
| Ngày dương | ${fmtSolar(info.solar)} |
| Ngày âm | ${fmtLunar(info.lunar)} |
| Can chi ngày | ${info.canChi.day.name} |

**Lý Thuần Phong theo 12 khung giờ:**

| Khung giờ | Trạng thái | Tốt/Xấu |
|---|---|---|
`;

  const rows = (info.lyThuanPhong ?? [])
    .map((h) => {
      const hour = info.hours[h.chiIndex]!;
      return `| ${hour.start}-${hour.end} | ${h.name} | ${h.isGood ? "Tốt" : "Xấu"} |`;
    })
    .join("\n");

  return `${header}${rows}\n`;
}

function buildDates(): { label: string; date: SolarDate }[] {
  const t = today();
  const consecutive = Array.from({ length: 3 }, (_, i) => {
    const d = addDays(t, i);
    return { label: `Ngày liên tiếp ${i + 1}: ${pad2(d.day)}/${pad2(d.month)}/${d.year}`, date: d };
  });

  const spreadDates: SolarDate[] = [
    { day: 10, month: 5, year: 2020 },
    { day: 22, month: 11, year: 2022 },
    { day: 1, month: 6, year: 2026 },
  ];
  const spread = spreadDates.map((date, i) => ({
    label: `Ngày rải trong 2020–2026 (${i + 1}/3): ${pad2(date.day)}/${pad2(date.month)}/${date.year}`,
    date,
  }));

  return [...consecutive, ...spread];
}

function main(): void {
  const dates = buildDates();
  const sections = dates.map(({ label, date }) => renderDay(label, date));

  const content = `# Bảng Lý Thuần Phong theo giờ — Liêm dùng để so tay với website khác

Sinh tự động ngày ${pad2(today().day)}/${pad2(today().month)}/${today().year}.

LƯU Ý: công thức tính bảng này lấy từ 5 nguồn độc lập trùng khớp nhau, nhưng
CHƯA được đối chiếu với ngày thật (khác với bảng Hỷ Thần/Tài Thần đã kiểm).
Liêm so từng dòng dưới đây với lichvannien.net hoặc xemlicham.com để xác nhận.

---

${sections.join("\n---\n\n")}`;

  const outPath = fileURLToPath(new URL("../../verify-ltp.md", import.meta.url));
  writeFileSync(outPath, content, "utf-8");
  console.log(`Đã ghi bảng Lý Thuần Phong vào ${outPath}`);
}

main();
