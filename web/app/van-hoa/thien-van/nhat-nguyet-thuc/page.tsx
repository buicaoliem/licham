import type { Metadata } from "next";
import { ChShell } from "@/components/heritage/ChShell";
import { EclipseHub } from "@/components/van-hoa/eclipse/EclipsePages";
import { VAN_HOA_PUBLIC } from "@/lib/van-hoa/config";
import { ECLIPSE_LIST_PATH } from "@/lib/van-hoa/eclipses";

// Dựng lại mỗi ngày để phần "Sắp diễn ra" / "Đã diễn ra" và số ngày còn lại luôn đúng theo ngày hiện tại (giờ Việt Nam).
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Nhật thực & nguyệt thực | Lịch Âm",
  description: "Lịch nhật thực và nguyệt thực tính bằng thiên văn, kèm khả năng quan sát ở Việt Nam.",
  alternates: { canonical: ECLIPSE_LIST_PATH },
  robots: VAN_HOA_PUBLIC ? { index: true, follow: true } : { index: false, follow: false },
};

export default function Page() {
  return (
    <ChShell activeMenu={null} className="ch-page">
      <EclipseHub />
    </ChShell>
  );
}
