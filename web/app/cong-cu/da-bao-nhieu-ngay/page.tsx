import type { Metadata } from "next";
import Link from "next/link";
import { DateField, DateLine, ResultBox, ToolError, ToolForm, ToolShell } from "@/components/tools/ToolShell";
import { describeDate } from "@/lib/calendar/date-info";
import { calendarSpan, daysBetween, formatDmy, parseIsoDate, spanLabel, splitWeeks, toIso, weekdaysBetween } from "@/lib/tools/date-math";
import { type SearchParams, first } from "@/lib/tools/params";
import { toolShare } from "@/lib/tools/share";
import { generateToolMetadata, toolBySlug } from "@/lib/tools/tools";
import { getVietnamToday } from "@/lib/today";

const tool = toolBySlug("da-bao-nhieu-ngay");

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  return generateToolMetadata(tool, await searchParams);
}

export default async function DaBaoNhieuNgayPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const today = getVietnamToday();
  const rawFrom = first(sp, "tu");
  const from = parseIsoDate(rawFrom);

  let body = null;
  if (rawFrom !== undefined) {
    if (!from) {
      body = <ToolError>Ngày không hợp lệ. Hãy nhập ngày dương lịch trong khoảng năm 1900–2100.</ToolError>;
    } else {
      const passed = daysBetween(from, today);
      if (passed < 0) {
        body = (
          <ToolError>
            Ngày này ở tương lai. Hãy dùng <Link href="/cong-cu/con-bao-nhieu-ngay/">công cụ “Còn bao nhiêu ngày”</Link> để đếm ngược.
          </ToolError>
        );
      } else {
        const w = splitWeeks(passed);
        body = (
          <ResultBox
            title={`Kể từ ${formatDmy(from)} đến hôm nay`}
            share={toolShare(tool, sp, `Kể từ ${formatDmy(from)} đến ${formatDmy(today)} đã qua ${passed.toLocaleString("vi-VN")} ngày.`)}
            rows={[
              ["Đã qua", passed === 0 ? "Chính là hôm nay" : `${passed.toLocaleString("vi-VN")} ngày`],
              ["Số tuần", `${w.weeks.toLocaleString("vi-VN")} tuần${w.days ? ` ${w.days} ngày` : ""}`],
              ["Theo lịch", spanLabel(calendarSpan(from, today))],
              ["Ngày làm việc", `${weekdaysBetween(from, today).toLocaleString("vi-VN")} ngày (thứ Hai–thứ Sáu, chưa trừ ngày lễ)`],
              ["Ngày bắt đầu", <DateLine key="f" s={describeDate(from)} />],
              ["Hôm nay", <DateLine key="t" s={describeDate(today)} />],
            ]}
          />
        );
      }
    }
  }

  return (
    <ToolShell
      tool={tool}
      notes={[
        "Số ngày đã qua là hôm nay trừ ngày bắt đầu, không tính ngày bắt đầu; hôm nay theo giờ Việt Nam (UTC+7).",
        "Số năm, tháng theo lịch dương cộng dần từng tháng, không quy đổi cố định 30 ngày một tháng.",
      ]}
    >
      <ToolForm tool={tool} title="Chọn ngày bắt đầu">
        <DateField id="tu" name="tu" label="Kể từ ngày" value={from ? toIso(from) : "2000-01-01"} />
      </ToolForm>
      {body}
    </ToolShell>
  );
}
