"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { parseKey, vnTodayKey } from "@/lib/calendar/vn-today";

function plusOne(key: string): string {
  const { day, month, year } = parseKey(key);
  const d = new Date(Date.UTC(year, month - 1, day + 1));
  return d.toISOString().slice(0, 10);
}

/**
 * /hom-nay/ và /ngay-mai/ là trang ISR (dựng lại mỗi phút): ngay sau 00:00 giờ Việt Nam, lượt xem đầu tiên có thể
 * nhận bản của ngày cũ. Khi ngày trên trang khác ngày thật, hiện thông báo kèm liên kết tới trang ngày đúng
 * và xin bản mới một lần.
 */
export function DayFreshness({ kind, renderedKey }: { kind: "hom-nay" | "ngay-mai"; renderedKey: string }) {
  const router = useRouter();
  const [expected, setExpected] = useState<string | null>(null);

  useEffect(() => {
    const t = vnTodayKey();
    const want = kind === "hom-nay" ? t : plusOne(t);
    if (want === renderedKey) return;
    setExpected(want);
    router.refresh();
  }, [kind, renderedKey, router]);

  if (!expected) return null;
  const { day, month, year } = parseKey(expected);
  const label = `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
  return (
    <p className="lc-stale" role="status">
      Đã sang ngày mới theo giờ Việt Nam.{" "}
      <Link href={`/ngay/${expected}/`}>
        Xem lịch {kind === "hom-nay" ? "hôm nay" : "ngày mai"} {label}
      </Link>
    </p>
  );
}
