import type { Metadata } from "next";
import { TraditionalDisclaimer } from "@/components/TraditionalDisclaimer";
import { XayNhaForm } from "@/components/XayNhaForm";
import { ChHero, ChShell } from "@/components/heritage/ChShell";
import { XemTuoiLegend, XemTuoiRelated, XemTuoiSteps } from "@/components/heritage/KetHonParts";
import { getVietnamToday } from "@/lib/today";

export async function generateMetadata(): Promise<Metadata> {
  const year = getVietnamToday().year;
  return {
    title: `Xem tuổi xây nhà ${year}: Kim Lâu, Hoang Ốc, Tam tai | Lịch Âm`,
    description: `Xem tuổi làm nhà năm ${year} theo Kim Lâu, Hoang Ốc và Tam tai — tục dân gian, chỉ tham khảo.`,
    alternates: { canonical: "/phong-thuy/xem-tuoi-xay-nha/" },
  };
}

export default function XemTuoiXayNhaPage() {
  const year = getVietnamToday().year;

  return (
    <ChShell activeMenu="Xem tuổi" className="ch-tu ch-kh">
      <ChHero
        className="kh-hero"
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Xem tuổi", href: "/tuoi/" }, { label: `Tuổi xây nhà ${year}` }]}
        crumbJsonLd={false}
        title="Xem tuổi xây nhà: Kim Lâu, Hoang Ốc, Tam tai"
        lead="Ba phép dân gian hay dùng khi chọn năm động thổ. Mệnh nạp âm lấy theo năm can chi của gia chủ, không gán một hành cho cả con giáp. Không phải khảo sát hướng nhà thu phí."
      />

      <div className="ch-wrap ch-main ch-layout">
        <div className="ch-stack">
          <XayNhaForm year={year} />
          <TraditionalDisclaimer />
        </div>

        <aside className="ch-side">
          <XemTuoiSteps
            title="Cách đếm đang dùng"
            icon="book"
            steps={[
              { t: "Kim Lâu", d: "Tuổi mụ chia 9, dư 1–3–6–8 thì phạm." },
              {
                t: "Hoang Ốc",
                d: "(Tuổi mụ − 1) chia 6 lấy dư, vòng Nhất Cát → Lục Hoang Ốc — có bản đếm khác cho nam/nữ, trang này ghi rõ một vòng.",
              },
              { t: "Tam tai", d: "Bốn nhóm tam hợp, mỗi nhóm kỵ ba năm chi kế tiếp." },
            ]}
          />
          <XemTuoiLegend
            title="Đọc kết quả"
            lead="Mỗi phép xét riêng; trang không cộng thành điểm hay kết luận nên hay không nên xây."
            rows={[
              { cls: "g", label: "Không phạm", text: "Phép đó không kỵ với tuổi mụ / chi của gia chủ trong năm xây." },
              { cls: "g", label: "Hoang Ốc tốt", text: "Rơi vào Nhất Cát, Nhì Nghi hoặc Tứ Tấn Tài." },
              { cls: "r", label: "Hoang Ốc xấu", text: "Rơi vào Tam Địa Sát, Ngũ Thọ Tử hoặc Lục Hoang Ốc." },
              { cls: "r", label: "Phạm", text: "Kim Lâu hoặc Tam tai rơi vào năm xây." },
            ]}
          />
          <XemTuoiRelated
            links={[
              { label: "Ngày tốt động thổ", sub: "Chọn ngày khởi công trong năm", href: "/xem-ngay-tot/dong-tho/", icon: "sun" },
              { label: "Ngày tốt cất nóc", sub: "Chọn ngày đổ mái, cất nóc", href: "/xem-ngay-tot/cat-noc/", icon: "home" },
              { label: "Tính tuổi", sub: "Tuổi dương và tuổi mụ theo ngày sinh", href: "/tinh-tuoi/", icon: "cake" },
              { label: "Xem tuổi 12 con giáp", sub: "Tuổi hợp, tuổi kỵ, mệnh theo năm sinh", href: "/tuoi/", icon: "yinyang" },
            ]}
          />
        </aside>
      </div>
    </ChShell>
  );
}
