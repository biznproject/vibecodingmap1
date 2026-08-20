import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ScenarioProvider } from "@/contexts/ScenarioContext";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIBECODINGMAP | Web Director Center",
  description: "Beyond coding gravity, into the art of web orchestration.",
  // --- 이 부분을 추가하세요 ---
  icons: {
    icon: "/icon_2.png", // public 폴더에 넣은 새로운 파일명
  },
  // --------------------------
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3734984765007043"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}
      >
        {/* 전역 상태 공급자 */}
        <ScenarioProvider>
          {/* Global Navigation */}
          <SiteNavbar />

          {/* 최외곽 프레임: 
             바우하우스의 '프레임' 철학을 담아 전체 화면에 8px 테두리를 두르고
             내부 콘텐츠가 flex 구조를 갖도록 설정합니다.
          */}
          <div className="flex flex-col min-h-screen border-[8px] border-black bg-background relative overflow-x-hidden pt-[8px]">
            {/* 배경 그리드 (z-index 조절로 콘텐츠 방해 금지) */}
            <div className="absolute inset-0 bauhaus-grid opacity-50 pointer-events-none" />

            {/* 실제 페이지 콘텐츠 */}
            <main className="flex-1 flex flex-col relative z-10 overflow-x-hidden">
              {children}
            </main>

            {/* Global Footer */}
            <SiteFooter />
          </div>
        </ScenarioProvider>
      </body>
    </html>
  );
}