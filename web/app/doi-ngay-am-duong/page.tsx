import type { Metadata } from "next";
import { getDayInfo } from "@licham/core";
import { DoiNgayConverter } from "@/components/DoiNgayConverter";
import { DoiNgayTools } from "@/components/DoiNgayTools";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getVietnamToday } from "@/lib/today";

export const metadata: Metadata = {
  title: "Đổi ngày âm dương — Tra cứu lịch âm chính xác | LịchÂm",
  description: "Đổi qua lại giữa dương lịch và âm lịch, kèm can chi, đếm ngày, đổi ngày giỗ và tính tuổi — miễn phí, không quảng cáo.",
};

export default function DoiNgayPage() {
  const today = getVietnamToday();
  const info = getDayInfo(today);

  return (
    <div className="outer">
      <div className="site">
        <Header activeMenu="Đổi ngày" />

        <div className="band">
          <div className="bg bg-lam" />
          <div className="band-in">
            <h1>Đổi ngày âm dương</h1>
            <p>Đổi qua lại giữa dương lịch và âm lịch, kèm can chi và thông tin ngày</p>
          </div>
        </div>

        <div className="body">
          <DoiNgayConverter />

          <h2 className="hh" style={{ marginTop: 32 }}>
            Công cụ khác
          </h2>
          <DoiNgayTools />

          <div style={{ marginTop: 32 }}>
            <h2 className="hh">Câu hỏi thường gặp</h2>
            <div className="box faqs">
              <div className="faq">
                <b>Âm lịch và dương lịch khác nhau thế nào?</b>
                <p>
                  Dương lịch tính theo vòng quay của Trái Đất quanh Mặt Trời, mỗi năm cố định khoảng 365 ngày. Âm lịch tính
                  theo chu kỳ Mặt Trăng, mỗi tháng khoảng 29–30 ngày, nên cùng một ngày âm lịch rơi vào ngày dương lịch
                  khác nhau mỗi năm.
                </p>
              </div>
              <div className="faq">
                <b>Vì sao có tháng nhuận trong âm lịch?</b>
                <p>
                  Một năm âm lịch bình thường ngắn hơn năm dương lịch khoảng 11 ngày. Để lịch âm không bị lệch quá xa
                  khỏi các mùa trong năm, cứ vài năm người ta lại thêm một tháng nhuận vào năm đó.
                </p>
              </div>
              <div className="faq">
                <b>Tháng thiếu và tháng đủ là gì?</b>
                <p>
                  Tháng đủ có 30 ngày, tháng thiếu chỉ có 29 ngày. Vì một tháng âm lịch được tính theo đúng chu kỳ Mặt
                  Trăng nên tháng nào đủ, tháng nào thiếu thay đổi theo từng năm, không cố định như dương lịch.
                </p>
              </div>
              <div className="faq">
                <b>Vì sao ngày âm ở Việt Nam đôi khi lệch một ngày so với Trung Quốc?</b>
                <p>
                  Lịch âm Việt Nam tính theo múi giờ UTC+7, còn lịch Trung Quốc tính theo múi giờ UTC+8. Những năm mà
                  thời điểm sóc (đầu tháng âm) rơi sát nửa đêm, giờ khác nhau này có thể đẩy nó sang ngày dương lịch kế
                  tiếp ở một trong hai nước, khiến ngày âm lịch của hai bên lệch nhau một ngày.
                </p>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
