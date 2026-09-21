import { DateField, DateLine, NumberField, ResultBox, ToolError, ToolForm, ToolShell } from "@/components/tools/ToolShell";
import { describeDate } from "@/lib/calendar/date-info";
import { addDays, formatDmy, parseIntParam, parseIsoDate, toIso } from "@/lib/tools/date-math";
import { type SearchParams, first } from "@/lib/tools/params";
import { toolShare } from "@/lib/tools/share";
import type { ToolDef } from "@/lib/tools/tools";
import { getVietnamToday } from "@/lib/today";

const MAX_OFFSET = 73000;

/** Dùng chung cho /ngay-sau (direction = 1) và /ngay-truoc (direction = -1). */
export function OffsetTool({ tool, direction, sp }: { tool: ToolDef; direction: 1 | -1; sp: SearchParams }) {
  const today = getVietnamToday();
  const rawFrom = first(sp, "tu");
  const rawN = first(sp, "so");
  const submitted = rawFrom !== undefined || rawN !== undefined;
  const from = parseIsoDate(rawFrom);
  const n = parseIntParam(rawN, 0, MAX_OFFSET);
  const word = direction === 1 ? "sau" : "trước";

  let body = null;
  if (submitted) {
    const result = from && n !== null ? addDays(from, direction * n) : null;
    if (!from || n === null) {
      body = <ToolError>Hãy nhập ngày bắt đầu hợp lệ và số ngày là số nguyên từ 0 đến {MAX_OFFSET.toLocaleString("vi-VN")}.</ToolError>;
    } else if (!result) {
      body = <ToolError>Kết quả nằm ngoài khoảng năm 1900–2100 mà lịch hỗ trợ.</ToolError>;
    } else {
      body = (
        <ResultBox
          title={`${n.toLocaleString("vi-VN")} ngày ${word} ${formatDmy(from)}`}
          share={toolShare(tool, sp, `${n.toLocaleString("vi-VN")} ngày ${word} ${formatDmy(from)} là ngày ${formatDmy(result)}.`)}
          rows={[
            ["Ngày kết quả", <DateLine key="r" s={describeDate(result)} />],
            ["Ngày bắt đầu", <DateLine key="f" s={describeDate(from)} />],
            ["Số tuần", `${Math.floor(n / 7).toLocaleString("vi-VN")} tuần${n % 7 ? ` ${n % 7} ngày` : ""}`],
          ]}
        />
      );
    }
  }

  return (
    <ToolShell
      tool={tool}
      notes={[
        `Ngày kết quả = ngày bắt đầu ${direction === 1 ? "cộng" : "trừ"} số ngày đã nhập; ngày bắt đầu không được tính vào số ngày.`,
        "Thứ và ngày âm lịch của kết quả lấy từ lõi lịch (múi giờ Việt Nam, UTC+7).",
      ]}
    >
      <ToolForm tool={tool} title="Nhập ngày bắt đầu và số ngày">
        <DateField id="tu" name="tu" label="Ngày bắt đầu" value={from ? toIso(from) : toIso(today)} />
        <NumberField id="so" name="so" label="Số ngày" value={n !== null ? String(n) : "100"} max={MAX_OFFSET} />
      </ToolForm>
      {body}
    </ToolShell>
  );
}
