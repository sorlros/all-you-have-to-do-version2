import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Head from "next/head";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { ClientOnly } from "@/components/provider/client-only";
import TimerModal from "@/components/modal/timer-modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "All you have to do",
  description: "Manage your schedule and to-do",
  icons: [
    {
      url: "/images/logo.png",
      href: "/images/logo.png",
    },
  ],
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ko">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/public/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/public/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/public/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/public/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/public/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/public/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/public/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/public/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/public/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/public/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/public/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/public/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/public/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <body className={inter.className}>
        <ClientOnly>
          <Toaster />
          <TimerModal />
          <main className="bg-slate-100 w-full h-full">{children}</main>
        </ClientOnly>
      </body>
    </html>
  );
};

export default Layout;
