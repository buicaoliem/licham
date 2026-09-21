import Link from "next/link";
import { VIEC_LIST } from "@/lib/xem-ngay-tot";

const HOT_SLUGS = new Set(["cuoi-hoi", "khai-truong"]);

export function OccasionChips() {
  return (
    <>
      <h2 className="hh" style={{ marginTop: 30 }}>
        Chọn ngày cho việc lớn
      </h2>
      <div className="chips">
        {VIEC_LIST.map((v) => (
          <Link key={v.slug} href={`/xem-ngay-tot/${v.slug}/`} className={HOT_SLUGS.has(v.slug) ? "chip hot" : "chip"}>
            Xem ngày {v.label}
          </Link>
        ))}
      </div>
    </>
  );
}
