import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import type { Viewport } from "next";

export const metadata: Metadata = {
  title: "UFMIAU",
  description: "Hub de Informações da Universidade Federal de Catalão",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "UFMIAU",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#1d4ed8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import BottomNav from "@/components/BottomNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 font-sans sm:bg-zinc-200 sm:dark:bg-black items-center justify-center">
        <main className="flex-1 w-full relative bg-zinc-50 dark:bg-zinc-950 sm:max-w-md sm:shadow-2xl sm:border-x sm:border-zinc-200 sm:dark:border-zinc-800 min-h-[100dvh]">
          {children}
          <BottomNav />
        </main>
      </body>
    </html>
  );
}
