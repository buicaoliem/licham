import Link from "next/link";
import { formatSolarShort, type UpcomingOccasion } from "@/lib/upcoming-occasions";
import { vanKhanBySlug } from "@/lib/van-khan";

const VAN_KHAN_SLUGS = ["mung-mot-ngay-ram", "gia-tien-ngay-gio", "than-tai-tho-dia", "ram-thang-tam"] as const;

const TU_VI = [
  "Tử vi hôm nay 12 con giáp",
  "Lập lá số tử vi trọn đời",
  "Xem tuổi xung khắc",
  "Xem tuổi làm nhà năm 2027",
] as const;

export function LinkColumns({ upcomingOccasions }: { upcomingOccasions: UpcomingOccasion[] }) {
  return (
    <div className="cols3" style={{ marginTop: 26 }}>
      <div className="box">
        <div className="box-h">
          <span className="rule" />
          <span className="t">Ngày quan trọng sắp tới</span>
          <span className="rule" />
        </div>
        <ul className="lst">
          {upcomingOccasions.map((occasion) => (
            <li key={occasion.label}>
              <span>{occasion.label}</span>
              <span>{formatSolarShort(occasion.solarDate)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="box">
        <div className="box-h">
          <span className="rule" />
          <span className="t">Văn khấn hay tra</span>
          <span className="rule" />
        </div>
        <ul className="lst">
          {VAN_KHAN_SLUGS.map((slug) => {
            const bai = vanKhanBySlug(slug);
            if (!bai) return null;
            return (
              <li key={slug}>
                <Link href={`/van-khan/${slug}`}>{bai.ten}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="box">
        <div className="box-h">
          <span className="rule" />
          <span className="t">Tử vi</span>
          <span className="rule" />
        </div>
        <ul className="lst">
          {TU_VI.map((item) => (
            <li key={item}>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
