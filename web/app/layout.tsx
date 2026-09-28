import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Be_Vietnam_Pro, Lora, Playfair_Display } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";
import "./heritage.css";

// GTM-NGTZWRQ8 / G-92MMB5JH1P / yp727217qu là ID thật của licham.app — không đổi sang site khác.
const GTM_ID = "GTM-NGTZWRQ8";
const GA_MEASUREMENT_ID = "G-92MMB5JH1P";
const CLARITY_PROJECT_ID = "yp727217qu";

// Chỉ bật tracking trên bản production thật (không chạy ở dev, preview, hay build không phải của Vercel production).
// RootLayout là Server Component nên đọc process.env.VERCEL_ENV trực tiếp (không cần tiền tố NEXT_PUBLIC_) —
// giá trị chỉ quyết định có render script hay không, không bị đưa vào bundle client.
const IS_PRODUCTION_TRACKING_ENABLED =
  process.env.NODE_ENV === "production" && (process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true);

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin", "vietnamese"],
  weight: ["700", "800"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  // nghiêng: bài văn khấn và trích dẫn trong giao diện Contemporary Heritage
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "licham.app — Lịch âm hôm nay, lịch vạn niên",
  description: "Lịch âm dương, giờ hoàng đạo, ngày tốt xấu — miễn phí, không quảng cáo.",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon.ico" }],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#c0272d",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${playfairDisplay.variable} ${lora.variable}`}>
      {IS_PRODUCTION_TRACKING_ENABLED && (
        // Google Tag Manager — Next.js chèn Script này vào <head> khi build, theo đúng cách Next.js khuyến nghị cho GTM.
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
      <body>
        {IS_PRODUCTION_TRACKING_ENABLED && (
          <>
            {/* Google Tag Manager (noscript) */}
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              />
            </noscript>

            {/* GA4 cài trực tiếp vì chưa có quyền cấu hình tag trong GTM UI — nếu sau này thêm GA4 làm tag trong GTM thì xoá khối này để tránh đếm trùng. */}
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_MEASUREMENT_ID}');`}
            </Script>

            {/* Microsoft Clarity cài trực tiếp vì chưa có quyền cấu hình tag trong GTM UI — nếu sau này thêm Clarity làm tag trong GTM thì xoá khối này để tránh đếm trùng. */}
            <Script id="clarity-init" strategy="afterInteractive">
              {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_PROJECT_ID}");`}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
