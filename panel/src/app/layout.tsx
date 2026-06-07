import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const yekanBakh = localFont({
  src: "../assets/fonts/YekanBakh-VF.woff2",
  variable: "--font-yekan-bakh",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "پنل مدیریت باشگاه",
  description: "سامانه مدیریت باشگاه ورزشی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${yekanBakh.variable} h-full antialiased`}>
      <body className={`${yekanBakh.className} min-h-full bg-zinc-50 text-zinc-900`}>
        {children}
      </body>
    </html>
  );
}
