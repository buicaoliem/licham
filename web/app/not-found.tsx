import type { Metadata } from "next";
import Link from "next/link";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { Icon } from "@/components/heritage/Icon";

export const metadata: Metadata = {
  title: "Không tìm thấy trang | Lịch Âm",
};

/** Trang 404 chung: giữ đầu trang, chân trang của site và dẫn về các mục chính. */
export default function NotFound() {
  const links = [
    { href: "/", label: "Lịch âm hôm nay" },
    { href: "/doi-ngay-am-duong/", label: "Đổi ngày âm dương" },
    { href: "/xem-ngay-tot/", label: "Xem ngày tốt" },
    { href: "/van-khan/", label: "Văn khấn" },
    { href: "/le/", label: "Ngày lễ" },
    { href: "/tuoi/", label: "Xem tuổi" },
  ];
  return (
    <ChShell activeMenu={null} className="ch-page">
      <ChHero
        eyebrow="Lỗi 404"
        title="Không tìm thấy trang"
        lead="Đường dẫn không tồn tại hoặc ngày tháng nằm ngoài khoảng lịch licham.app hỗ trợ. Bạn có thể quay về các mục chính dưới đây."
      />
      <div className="ch-wrap ch-main ch-stack ch-page-body">
        <nav className="ch-card nf-links" aria-label="Các mục chính">
          <ul className="ch-linklist">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>
                  {l.label}
                  <Icon name="chevron" size={15} className="arr" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </ChShell>
  );
}
