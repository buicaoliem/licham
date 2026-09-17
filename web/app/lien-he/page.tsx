import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Liên hệ | LịchÂm",
  description: "Liên hệ với licham.app để báo lỗi, góp ý nội dung hoặc hợp tác.",
  alternates: { canonical: "/lien-he/" },
};

export default function LienHePage() {
  return (
    <div className="outer">
      <div className="site">
        <Header />

        <div className="band">
          <div className="bg bg-lam" />
          <div className="band-in">
            <h1>Liên hệ</h1>
            <p>Góp ý, báo lỗi hoặc đề nghị bổ sung nội dung cho licham.app</p>
          </div>
        </div>

        <div className="body">
          <div className="prose">
            <div className="box">
              <div className="box-h">
                <span className="rule" />
                <span className="t">Email</span>
                <span className="rule" />
              </div>
              <p style={{ textAlign: "center", fontSize: 18, fontWeight: 600 }}>
                <a href="mailto:lienhe@licham.app">lienhe@licham.app</a>
              </p>
            </div>

            <div className="box" style={{ marginTop: 18 }}>
              <div className="box-h">
                <span className="rule" />
                <span className="t">Gửi cho chúng tôi</span>
                <span className="rule" />
              </div>
              <ul className="dotlist">
                <li>Báo sai ngày tháng hoặc thông tin trên trang</li>
                <li>Đề nghị thêm bài văn khấn hoặc ngày lễ còn thiếu</li>
                <li>Báo lỗi hiển thị</li>
                <li>Hợp tác nội dung</li>
              </ul>
            </div>

            <div className="box" style={{ marginTop: 18 }}>
              <div className="box-h">
                <span className="rule" />
                <span className="t">Thông tin đơn vị</span>
                <span className="rule" />
              </div>
              <p style={{ textAlign: "center" }}>
                Công ty TNHH ISHI KOI FARM · Mã số thuế: 0601224050 · Địa chỉ: Số 185 đường Lộc Vượng, Phường Nam Định,
                Tỉnh Ninh Bình.
              </p>
            </div>

            <p style={{ textAlign: "center", fontSize: 13.5, color: "var(--ink-3)", marginTop: 18 }}>
              Chúng tôi phản hồi trong vòng vài ngày làm việc.
            </p>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
