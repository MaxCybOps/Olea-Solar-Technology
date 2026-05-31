import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Olea Technologies — Powering Sustainable Future",
    template: "%s | Olea Technologies",
  },
  description:
    "Olea Technologies builds clean energy infrastructure that drives homes, businesses, and industries into the future — intelligently, sustainably, and at scale.",
  keywords: ["solar energy Nigeria", "clean energy Africa", "solar installation", "inverter", "batteries", "Olea Technologies"],
  authors: [{ name: "Olea Technologies" }],
  creator: "Olea Technologies",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://oleatechnologies.com"),
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Olea Technologies",
    title: "Olea Technologies — Powering Sustainable Future",
    description: "Africa's premium clean-energy infrastructure company.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olea Technologies — Powering Sustainable Future",
    description: "Africa's premium clean-energy infrastructure company.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
