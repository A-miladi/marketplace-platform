import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";

import { Inter } from "next/font/google";

import NextTopLoader from "nextjs-toploader";

import { NotificationPermission } from "@/components/NotificationPermission";
import Toast from "@/components/Toast";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Uniq Alpha",
  description: "Uniq Alpha is a platform for buying and selling machine tools.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-128x128.png", sizes: "128x128", type: "image/png" },
    ],
  },
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={inter.className}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <link rel="apple-touch-icon" href="/icons/icon-128x128.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Uniq Alpha" />
      </head>
      <body className="overflow-x-hidden">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NextTopLoader color="#0064D3" />
          <NotificationPermission />
          {children}
          <Toast />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
