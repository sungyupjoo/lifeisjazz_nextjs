import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { logo_black } from "@/public/assets";
import AuthSession from "@/components/AuthSession";

export const metadata: Metadata = {
  title: "Life is Jazz",
  description: "재즈를 감상하며 연주하고 즐기는 모임입니다",
  // keywords는 더 이상 SEO에 유용하지 않다고 하여 작성하지 않음(ex.구글)
  openGraph: {
    title: "Life is Jazz",
    description: "재즈를 감상하며 연주하고 즐기는 모임입니다",
    // TODO: 주소 옮긴 후 바꾸기
    url: "https://lifeisjazz-nextjs.vercel.app",
    siteName: "Life is Jazz",
    images: logo_black,
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: [{ url: logo_black }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Life is Jazz",
    description: "재즈를 감상하며 연주하고 즐기는 모임입니다",
    images: [logo_black],
  },
};

const pretendard = localFont({
  src: "../public/fonts/PretendardVariable.ttf",
  weight: "45 920",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <Script
        strategy="lazyOnload"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_JS_KEY}&autoload=false`}
      ></Script>
      <Script
        strategy="lazyOnload"
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js"
        integrity="sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01"
        crossOrigin="anonymous"
      ></Script>

      <AuthSession>
        <body className={pretendard.className}>{children}</body>
      </AuthSession>
    </html>
  );
}
