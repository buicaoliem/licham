import type { Metadata } from "next";
import { DateField, DateLine, ResultBox, ToolError, ToolForm, ToolShell } from "@/components/tools/ToolShell";
import { describeDate } from "@/lib/calendar/date-info";
import { calendarSpan, daysBetween, formatDmy, parseIsoDate, spanLabel, splitWeeks, toIso, weekdaysBetween } from "@/lib/tools/date-math";
import { type SearchParams, first } from "@/lib/tools/params";
import { toolShare } from "@/lib/tools/share";
import { generateToolMetadata, toolBySlug } from "@/lib/tools/tools";
import { getVietnamToday } from "@/lib/today";

const tool = toolBySlug("dem-ngay");

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  return generateToolMetadata(tool, await searchParams);
}

export default async function DemNgayPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const today = getVietnamToday();
  const rawFrom = first(sp, "tu");
  const rawTo = first(sp, "den");
  const submitted = rawFrom !== undefined || rawTo !== undefined;
  const from = parseIsoDate(rawFrom);
  const to = parseIsoDate(rawTo);

  let body = null;
  if (submitted) {
    if (!from || !to) {
      body = <ToolError>Ngày không hợp lệ. Hãy nhập cả hai ngày dương lịch trong khoảng năm 1900–2100.</ToolError>;
    } else {
      const total = daysBetween(from, to);
      const abs = Math.abs(total);
      const w = splitWeeks(total);
      body = (
        <ResultBox
          title={`Từ ${formatDmy(from)} đến ${formatDmy(to)}`}
          share={toolShare(tool, sp, `Từ ${formatDmy(from)} đến ${formatDmy(to)} là ${abs.toLocaleString("vi-VN")} ngày.`)}
          rows={[
            ["Tổng số ngày", `${abs.toLocaleString("vi-VN")} ngày${total < 0 ? " (ngày kết thúc trước ngày bắt đầu)" : ""}`],
            ["Tính cả hai đầu", `${(abs + 1).toLocaleString("vi-VN")} ngày`],
            ["Số tuần", `${w.weeks.toLocaleString("vi-VN")} tuần${w.days ? ` ${w.days} ngày` : ""}`],
            ["Theo lịch", spanLabel(calendarSpan(from, to))],
            ["Ngày làm việc", `${weekdaysBetween(from, to).toLocaleString("vi-VN")} ngày (thứ Hai–thứ Sáu, chưa trừ ngày lễ)`],
            ["Ngày bắt đầu", <DateLine key="a" s={describeDate(from)} />],
            ["Ngày kết thúc", <DateLine key="b" s={describeDate(to)} />],
          ]}
        />
      );
    }
  }

  return (
    <ToolShell
      tool={tool}
      notes={[
        "Tổng số ngày là hiệu hai ngày, không tính ngày bắt đầu; dòng “tính cả hai đầu” cộng thêm 1.",
        "Số tháng và năm tính theo lịch dương (cộng dần từng tháng), nên không quy đổi cố định 30 ngày.",
        "Ngày làm việc đếm từ thứ Hai đến thứ Sáu trong khoảng sau ngày bắt đầu tới hết ngày kết thúc, chưa trừ ngày lễ và ngày nghỉ bù.",
      ]}
    >
      <ToolForm tool={tool} title="Chọn hai ngày">
        <DateField id="tu" name="tu" label="Từ ngày" value={from ? toIso(from) : toIso({ ...today, month: 1, day: 1 })} />
        <DateField id="den" name="den" label="Đến ngày" value={to ? toIso(to) : toIso(today)} />
      </ToolForm>
      {body}
    </ToolShell>
  );
}
