import type { Metadata } from "next";
import Link from "next/link";
import { DateField, DateLine, ResultBox, ToolError, ToolForm, ToolShell } from "@/components/tools/ToolShell";
import { describeDate } from "@/lib/calendar/date-info";
import { calendarSpan, daysBetween, formatDmy, parseIsoDate, spanLabel, splitWeeks, toIso } from "@/lib/tools/date-math";
import { type SearchParams, first } from "@/lib/tools/params";
import { generateToolMetadata, toolBySlug } from "@/lib/tools/tools";
import { nextBirthdayOn } from "@/lib/tinh-tuoi";
import { getVietnamToday } from "@/lib/today";

const tool = toolBySlug("tuoi-theo-ngay-sinh");

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  return generateToolMetadata(tool, await searchParams);
}

export default async function TuoiTheoNgaySinhPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const today = getVietnamToday();
  const rawBirth = first(sp, "sinh");
  const rawAsOf = first(sp, "den");
  const birth = parseIsoDate(rawBirth);
  const asOf = rawAsOf === undefined ? today : parseIsoDate(rawAsOf);
  const submitted = rawBirth !== undefined || rawAsOf !== undefined;

  let body = null;
  if (submitted) {
    if (!birth || !asOf) {
      body = <ToolError>Ngày không hợp lệ. Hãy nhập ngày dương lịch trong khoảng năm 1900–2100.</ToolError>;
    } else if (daysBetween(birth, asOf) < 0) {
      body = <ToolError>Ngày sinh không thể sau ngày tính tuổi.</ToolError>;
    } else {
      const span = calendarSpan(birth, asOf);
      const total = daysBetween(birth, asOf);
      const w = splitWeeks(total);
      const next = nextBirthdayOn(birth, asOf);
      const toNext = daysBetween(asOf, next);
      body = (
        <ResultBox
          title={`Sinh ngày ${formatDmy(birth)}`}
          rows={[
            ["Tuổi", `${span.years} tuổi (${spanLabel(span)})`],
            ["Tổng số ngày đã sống", `${total.toLocaleString("vi-VN")} ngày`],
            ["Số tuần", `${w.weeks.toLocaleString("vi-VN")} tuần${w.days ? ` ${w.days} ngày` : ""}`],
            ["Sinh nhật tiếp theo", toNext === 0 ? "Chính là hôm nay" : `${formatDmy(next)}, còn ${toNext} ngày`],
            ["Ngày sinh", <DateLine key="b" s={describeDate(birth)} />],
            ["Tính đến", rawAsOf === undefined ? "Hôm nay (giờ Việt Nam)" : <DateLine key="a" s={describeDate(asOf)} />],
            ["Con giáp, can chi, tuổi mụ", <Link key="t" href="/tinh-tuoi/">Xem ở trang Tính tuổi ›</Link>],
          ]}
        />
      );
    }
  }

  return (
    <ToolShell
      tool={tool}
      notes={[
        "Tuổi tính theo lịch dương: đủ một tuổi khi qua sinh nhật, số tháng và ngày lẻ tính từ sinh nhật gần nhất.",
        "Người sinh 29/2 mừng sinh nhật vào 28/2 ở năm không nhuận.",
        "Công cụ chỉ tính khoảng thời gian, không xem tuổi hay đoán vận. Muốn biết con giáp và tuổi mụ, dùng trang Tính tuổi.",
      ]}
    >
      <ToolForm tool={tool} title="Nhập ngày sinh">
        <DateField id="sinh" name="sinh" label="Ngày sinh" value={birth ? toIso(birth) : "1990-01-20"} />
      </ToolForm>
      {body}
    </ToolShell>
  );
}
