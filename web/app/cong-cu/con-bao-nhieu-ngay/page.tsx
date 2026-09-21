import type { Metadata } from "next";
import Link from "next/link";
import { DateField, DateLine, ResultBox, SelectField, ToolError, ToolForm, ToolShell } from "@/components/tools/ToolShell";
import { describeDate } from "@/lib/calendar/date-info";
import { countdownSlugForLe } from "@/lib/countdown";
import { LE_LIST, leBySlug } from "@/lib/le";
import { nextOccurrence } from "@/lib/le-date-engine";
import { daysBetween, formatDmy, parseIsoDate, splitWeeks, toIso } from "@/lib/tools/date-math";
import { type SearchParams, first } from "@/lib/tools/params";
import { toolShare } from "@/lib/tools/share";
import { generateToolMetadata, toolBySlug } from "@/lib/tools/tools";
import { getVietnamToday } from "@/lib/today";

const tool = toolBySlug("con-bao-nhieu-ngay");
const DEFAULT_LE = "tet-nguyen-dan";

export async function generateMetadata({ searchParams }: { searchParams: Promise<SearchParams> }): Promise<Metadata> {
  return generateToolMetadata(tool, await searchParams);
}

export default async function ConBaoNhieuNgayPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const today = getVietnamToday();
  const rawDate = first(sp, "ngay");
  const rawLe = first(sp, "den");
  const submitted = rawDate !== undefined || rawLe !== undefined;
  const customDate = parseIsoDate(rawDate);
  const le = leBySlug(rawLe ?? DEFAULT_LE);

  let body = null;
  if (submitted) {
    if (rawDate !== undefined && !customDate) {
      body = <ToolError>Ngày không hợp lệ. Hãy nhập ngày dương lịch trong khoảng năm 1900–2100.</ToolError>;
    } else if (rawDate === undefined && !le) {
      body = <ToolError>Không tìm thấy ngày lễ đã chọn.</ToolError>;
    } else {
      const target = customDate ?? nextOccurrence(le!, today).solar;
      const left = daysBetween(today, target);
      const w = splitWeeks(left);
      const label = customDate ? formatDmy(customDate) : le!.ten;
      const cd = !customDate && le ? countdownSlugForLe(le.slug) : undefined;
      body = (
        <ResultBox
          title={customDate ? `Đến ngày ${label}` : `Đến ${label}`}
          share={toolShare(
            tool,
            sp,
            left === 0
              ? `Hôm nay ${formatDmy(today)} chính là ${customDate ? `ngày ${label}` : label}.`
              : `Tính đến ${formatDmy(today)}, ${left > 0 ? "còn" : "đã qua"} ${Math.abs(left).toLocaleString("vi-VN")} ngày ${left > 0 ? "nữa " : ""}đến ${customDate ? `ngày ${label}` : label}.`,
          )}
          rows={[
            [
              left >= 0 ? "Còn lại" : "Đã qua",
              left === 0 ? "Chính là hôm nay" : `${Math.abs(left).toLocaleString("vi-VN")} ngày (${w.weeks} tuần${w.days ? ` ${w.days} ngày` : ""})`,
            ],
            ["Ngày đích", <DateLine key="t" s={describeDate(target)} />],
            ["Hôm nay", <DateLine key="n" s={describeDate(today)} />],
            ...(le && !customDate
              ? ([["Về ngày lễ", <Link key="l" href={`/le/${le.slug}/`}>{le.ten} ›</Link>]] as [string, React.ReactNode][])
              : []),
            ...(cd ? ([["Đếm ngược chi tiết", <Link key="c" href={`/countdown/${cd}/`}>Trang đếm ngược ›</Link>]] as [string, React.ReactNode][]) : []),
            ...(left < 0 ? ([["Đã bao nhiêu ngày", <Link key="p" href="/cong-cu/da-bao-nhieu-ngay/">Tính số ngày đã qua ›</Link>]] as [string, React.ReactNode][]) : []),
          ]}
        />
      );
    }
  }

  return (
    <ToolShell
      tool={tool}
      notes={[
        "Hôm nay được xác định theo giờ Việt Nam (UTC+7), không theo múi giờ của máy chủ hay trình duyệt.",
        "Với ngày lễ âm lịch, công cụ lấy lần xuất hiện kế tiếp (kể cả hôm nay) từ lõi lịch nên đúng cả năm nhuận.",
        "Nếu nhập một ngày cụ thể thì ngày đó được ưu tiên hơn ngày lễ đã chọn.",
      ]}
    >
      <ToolForm tool={tool} title="Đếm ngược đến ngày lễ hoặc ngày bất kỳ">
        <SelectField
          id="den"
          name="den"
          label="Ngày lễ"
          value={le?.slug ?? DEFAULT_LE}
          options={LE_LIST.map((l) => ({ value: l.slug, label: l.ten }))}
        />
        <DateField
          id="ngay"
          name="ngay"
          label="Hoặc một ngày bất kỳ"
          value={customDate ? toIso(customDate) : ""}
          hint="Để trống nếu muốn dùng ngày lễ ở trên."
          required={false}
        />
      </ToolForm>
      {body}
    </ToolShell>
  );
}
