import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng | LịchÂm",
  description: "Điều khoản sử dụng nội dung trên licham.app.",
  alternates: { canonical: "/dieu-khoan/" },
};

export default function DieuKhoanPage() {
  return (
    <div className="outer">
      <div className="site">
        <Header />

        <div className="band">
          <div className="bg bg-lam" />
          <div className="band-in">
            <h1>Điều khoản sử dụng</h1>
            <p>Những điều cần biết khi dùng nội dung của licham.app</p>
          </div>
        </div>

        <div className="body">
          <div className="prose">
            <ul className="dotlist">
              <li>Nội dung trên trang được cung cấp miễn phí cho mục đích tham khảo cá nhân.</li>
              <li>
                Các thông tin về phong thủy, ngày tốt xấu, tử vi mang tính tín ngưỡng dân gian, chỉ để tham khảo.
                Người dùng tự chịu trách nhiệm với các quyết định của mình; licham.app không chịu trách nhiệm cho bất
                kỳ thiệt hại nào phát sinh từ việc sử dụng thông tin trên trang.
              </li>
              <li>
                Không sao chép hàng loạt nội dung của trang để đăng lại trên trang khác. Khi trích dẫn, vui lòng ghi
                rõ nguồn licham.app.
              </li>
            </ul>

            <p style={{ marginTop: 18 }}>
              Mọi thắc mắc về điều khoản sử dụng, vui lòng liên hệ <a href="mailto:lienhe@licham.app">lienhe@licham.app</a>.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
