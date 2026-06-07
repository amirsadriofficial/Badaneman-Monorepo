import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const yekanBakh = localFont({
  src: "../fonts/YekanBakh-VF.woff2",
  variable: "--font-yekan-bakh",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "بدن‌من | باشگاه بدنسازی",
    template: "%s | بدن‌من",
  },
  description: "باشگاه بدنسازی و فیتنس — عضویت، رزرو ماساژ و سولاریوم، فروشگاه مکمل",
  manifest: "/manifest.json",
  openGraph: {
    locale: "fa_IR",
    type: "website",
    siteName: "بدن‌من",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" data-theme="dark" className={`${yekanBakh.variable} h-full antialiased`} suppressHydrationWarning>
      <body className={`${yekanBakh.className} min-h-full bg-background text-foreground`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
