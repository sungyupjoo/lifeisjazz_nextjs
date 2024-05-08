import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Life is jazz",
  description: "",
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
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=d5fdd6e2dcb937e3fca752e4eaddb850&autoload=false"
      ></Script>
      <Script
        strategy="lazyOnload"
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.1/kakao.min.js"
        integrity="sha384-kDljxUXHaJ9xAb2AzRd59KxjrFjzHa5TAoFQ6GbYTCAG0bjM55XohjjDT7tDDC01"
        crossOrigin="anonymous"
      ></Script>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
