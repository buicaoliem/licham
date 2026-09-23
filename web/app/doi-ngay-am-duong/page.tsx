import type { Metadata } from "next";
import { DoiNgayConverter } from "@/components/DoiNgayConverter";
import { DoiNgayTools } from "@/components/DoiNgayTools";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { LcFaq, LcRelated } from "@/components/lich/LichParts";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { dayHref } from "@/lib/calendar/urls";
import { getVietnamToday } from "@/lib/today";

export function generateMetadata(): Metadata {
  const year = getVietnamToday().year;
  return {
    title: `Đổi ngày âm dương ${year} — Tra cứu lịch âm | Lịch Âm`,
    description: `Đổi dương lịch ↔ âm lịch năm ${year}, kèm can chi, đếm ngày, đổi ngày giỗ. Tính tuổi đủ ngày sinh ở trang riêng.`,
    alternates: { canonical: "/doi-ngay-am-duong/" },
  };
}

const FAQ = [
  {
    q: "Âm lịch và dương lịch khác nhau thế nào?",
    a: "Dương lịch tính theo vòng quay của Trái Đất quanh Mặt Trời, mỗi năm cố định khoảng 365 ngày. Âm lịch tính theo chu kỳ Mặt Trăng, mỗi tháng khoảng 29–30 ngày, nên cùng một ngày âm lịch rơi vào ngày dương lịch khác nhau mỗi năm.",
  },
  {
    q: "Vì sao có tháng nhuận trong âm lịch?",
    a: "Một năm âm lịch bình thường ngắn hơn năm dương lịch khoảng 11 ngày. Để lịch âm không bị lệch quá xa khỏi các mùa trong năm, cứ vài năm người ta lại thêm một tháng nhuận vào năm đó.",
  },
  {
    q: "Tháng thiếu và tháng đủ là gì?",
    a: "Tháng đủ có 30 ngày, tháng thiếu chỉ có 29 ngày. Vì một tháng âm lịch được tính theo đúng chu kỳ Mặt Trăng nên tháng nào đủ, tháng nào thiếu thay đổi theo từng năm, không cố định như dương lịch.",
  },
  {
    q: "Vì sao ngày âm ở Việt Nam đôi khi lệch một ngày so với Trung Quốc?",
    a: "Lịch âm Việt Nam tính theo múi giờ UTC+7, còn lịch Trung Quốc tính theo múi giờ UTC+8. Những năm mà thời điểm sóc (đầu tháng âm) rơi sát nửa đêm, giờ khác nhau này có thể đẩy nó sang ngày dương lịch kế tiếp ở một trong hai nước, khiến ngày âm lịch của hai bên lệch nhau một ngày.",
  },
];

export default function DoiNgayPage() {
  const today = getVietnamToday();

  return (
    <ChShell activeMenu="Đổi ngày" className="ch-cc ch-doi">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Đổi ngày âm dương" }]}
        crumbJsonLd={false}
        title={`Đổi ngày âm dương ${today.year}`}
        lead={`Đổi qua lại giữa dương lịch và âm lịch năm ${today.year}, kèm can chi và thông tin ngày`}
      />

      <div className="ch-wrap ch-main ch-stack">
        <DoiNgayConverter initial={today} />

        <section aria-labelledby="dn-tools-h">
          <h2 className="ch-h2 dn-sec-h" id="dn-tools-h">
            Công cụ khác
          </h2>
          <DoiNgayTools initial={today} />
        </section>

        <LcFaq items={FAQ} />

        <LcRelated
          title="Có thể anh cần"
          links={[
            { label: "Tính tuổi dương và tuổi mụ", href: "/tinh-tuoi/" },
            { label: "Xem ngày tốt", href: "/xem-ngay-tot/" },
            { label: "Lịch hôm nay", href: dayHref(today) },
          ]}
        />
        <TraditionalDisclaimer compact />
      </div>
    </ChShell>
  );
}
