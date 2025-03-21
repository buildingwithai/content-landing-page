import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GTMLABS",
  description: "Tech-Enabled Fractional Product Marketing Platform",
  icons: {
    icon: [{ url: "/GTM LABS LOGO (1).png", sizes: "any" }],
    shortcut: "/GTM LABS LOGO (1).png?v=1",
    apple: "/GTM LABS LOGO (1).png?v=1",
  },
  other: {
    "msapplication-TileColor": "#ffffff",
    "theme-color": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/GTM LABS LOGO (1).png?v=2" sizes="any" />
        <link
          rel="shortcut icon"
          type="image/png"
          href="/GTM LABS LOGO (1).png?v=2"
        />
        <link rel="apple-touch-icon" href="/GTM LABS LOGO (1).png?v=2" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <Script src="https://api.tempolabs.ai/proxy-asset?url=https://storage.googleapis.com/tempo-public-assets/error-handling.js" />
        <Script src="/clear-cache.js" />
      </head>
      <body className={inter.className}>
        {children}
        <TempoInit />
      </body>
    </html>
  );
}
