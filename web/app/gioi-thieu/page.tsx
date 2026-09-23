import type { Metadata } from "next";
import Link from "next/link";
import { ChHero, ChShell } from "@/components/heritage/ChShell";

export const metadata: Metadata = {
  title: "Giới thiệu | Lịch Âm",
  description: "licham.app là trang lịch âm dương miễn phí, không quảng cáo, không cần đăng ký tài khoản.",
  alternates: { canonical: "/gioi-thieu/" },
};

export default function GioiThieuPage() {
  return (
    <ChShell activeMenu={null} className="ch-page">
      <ChHero
        crumbs={[{ label: "Trang chủ", href: "/" }, { label: "Giới thiệu" }]}
        crumbJsonLd={false}
        title="Giới thiệu"
      />

      <div className="ch-wrap ch-main ch-stack ch-page-body">
        <article className="ch-card ch-prose">
          <p>
            Licham.app là trang lịch âm dương miễn phí, không quảng cáo và không yêu cầu đăng ký tài khoản. Chúng tôi
            muốn tra cứu lịch âm, lịch dương và các thông tin liên quan trở nên nhanh, gọn và dễ dùng cho bất kỳ ai.
          </p>
          <p>
            Trên trang có lịch theo ngày và theo tháng (2022–2031), đổi ngày âm dương, xem ngày tốt theo việc, văn khấn,
            tử vi hôm nay và tử vi theo tuổi–năm, tính tuổi dương/tuổi mụ, năm sinh, đặt tên theo chữ Hán (từ điển hữu
            hạn, không ghép họ), cùng ngày lễ và ngày giỗ.
          </p>
          <p>
            Lịch được tính bằng thuật toán thiên văn riêng cho múi giờ Việt Nam (GMT+7), áp dụng cho khoảng thời gian từ
            năm 1900 đến năm 2100, và có bộ kiểm chứng tự động để đảm bảo kết quả chính xác.
          </p>
          <p>
            Cần nói rõ: phần đổi ngày âm lịch – dương lịch được tính chính xác theo thuật toán thiên văn. Còn các nội
            dung như sao tốt xấu, giờ hoàng đạo hay tử vi là tri thức dân gian được lưu truyền, mang tính tham khảo,
            không phải là khoa học.
          </p>
        </article>
        <div className="chips">
          <Link className="chip" href="/tinh-tuoi/">
            Tính tuổi
          </Link>
          <Link className="chip" href="/ten/">
            Đặt tên
          </Link>
          <Link className="chip" href="/tu-vi/">
            Tử vi
          </Link>
          <Link className="chip" href="/xem-ngay-tot/">
            Ngày tốt
          </Link>
          <Link className="chip" href="/countdown/tet/">
            Đếm ngược Tết
          </Link>
        </div>
      </div>
    </ChShell>
  );
}
