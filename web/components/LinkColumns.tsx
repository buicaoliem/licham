import Link from "next/link";
import { formatSolarShort, type UpcomingOccasion } from "@/lib/upcoming-occasions";
import { vanKhanBySlug } from "@/lib/van-khan";

const VAN_KHAN_SLUGS = ["mung-mot-ngay-ram", "gia-tien-ngay-gio", "than-tai-tho-dia", "ram-thang-tam"] as const;

const TU_VI = [
  { href: "/tu-vi", label: "Tử vi hôm nay 12 con giáp" },
  { href: "/tinh-tuoi", label: "Tính tuổi dương và tuổi mụ" },
  { href: "/ten", label: "Đặt tên con theo chữ Hán" },
  { href: "/phong-thuy/xem-tuoi-xay-nha", label: "Xem tuổi làm nhà" },
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
              <Link href={occasion.href}>{occasion.label}</Link>
              <span>{formatSolarShort(occasion.solar)}</span>
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
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
