import type { Metadata, Viewport } from "next";
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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ReadRush — Read at the speed of focus",
    template: "%s · ReadRush",
  },
  description:
    "A focus-first RSVP reader that helps you move through any text one word at a time, at your own pace.",
  applicationName: "ReadRush",
  keywords: ["speed reading", "RSVP reader", "focus reader", "reading tool", "productivity"],
  authors: [{ name: "ReadRush" }],
  creator: "ReadRush",
  publisher: "ReadRush",
  category: "productivity",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "ReadRush",
    title: "ReadRush — Read at the speed of focus",
    description: "Turn any text into a calm, focused, one-word-at-a-time reading flow.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ReadRush — Read at the speed of focus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReadRush — Read at the speed of focus",
    description: "Turn any text into a calm, focused, one-word-at-a-time reading flow.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fc" },
    { media: "(prefers-color-scheme: dark)", color: "#090b10" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ReadRush",
              description: "A focus-first RSVP speed-reading tool.",
              applicationCategory: "ProductivityApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
