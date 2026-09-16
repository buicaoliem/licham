import type { UpcomingOccasion } from "@/lib/upcoming-occasions";

export function UpcomingCard({ occasions }: { occasions: UpcomingOccasion[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="mx-auto max-w-[720px] rounded-[14px] border border-line p-5">
        <h3 className="text-center text-base font-semibold text-ink">Ngày quan trọng sắp tới</h3>
        <ul className="mt-4 space-y-2.5 text-sm">
          {occasions.map((occasion) => (
            <li key={occasion.label} className="flex items-center justify-between">
              <span className="text-ink-3">{occasion.label}</span>
              <span className="font-semibold text-ink">{occasion.solarDate}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
