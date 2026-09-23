import { type CalendarDay, SOURCE_LABEL } from "@/lib/calendar/calendar-day";

export function SourceNote({ day }: { day: CalendarDay }) {
  const m = day.sourceMetadata;
  return (
    <p className="lc-note lc-source">
      <b>{SOURCE_LABEL.astronomical}:</b> {m.astronomical.join(", ")} (giờ {m.timeZone}). <b>{SOURCE_LABEL.traditional}:</b>{" "}
      {m.traditional.join(", ")}. <b>{SOURCE_LABEL.editorial}:</b> {m.editorial.join(", ")}.
    </p>
  );
}
