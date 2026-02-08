import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "RNDR Realm - Creative Studio Blog",
    template: "%s | RNDR Realm",
  },
  description:
    "Insights on design, motion, and React development from RNDR Realm creative studio",
  keywords: [
    "motion design",
    "react development",
    "creative studio",
    "web development",
    "UI/UX",
    "interactive components",
  ],
  authors: [{ name: "RNDR Realm" }],
  creator: "RNDR Realm",
  publisher: "RNDR Realm",
  metadataBase: new URL("https://rndr-blog.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "RNDR Realm",
    title: "RNDR Realm - Creative Studio Blog",
    description:
      "Insights on design, motion, and React development from RNDR Realm creative studio",
    images: [
      {
        url: "/og2.png",
        width: 1200,
        height: 630,
        alt: "RNDR Realm - Creative Studio Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RNDR Realm - Creative Studio Blog",
    description:
      "Insights on design, motion, and React development from RNDR Realm creative studio",
    creator: "@rndr_realm",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RNDR Realm Blog RSS Feed"
          href="/feed.xml"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <NuqsAdapter>
          <>{children}</>
        </NuqsAdapter>
      </body>
    </html>
  );
}
