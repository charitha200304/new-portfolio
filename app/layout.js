import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://charithachiranjeewa.dev";
const SITE_NAME = "Charitha Chiranjeewa | Full-Stack Developer Portfolio";
const SITE_DESCRIPTION =
  "Full-Stack Developer specializing in Spring Boot, NestJS, React, and React Native. Building secure, scalable enterprise-grade web and mobile experiences from Malabe, Sri Lanka.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | Charitha Chiranjeewa",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Charitha Chiranjeewa",
    "Full-Stack Developer",
    "Spring Boot developer",
    "NestJS developer",
    "React developer Sri Lanka",
    "React Native developer",
    "Next.js portfolio",
  ],
  authors: [{ name: "Charitha Chiranjeewa", url: SITE_URL }],
  creator: "Charitha Chiranjeewa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Charitha Chiranjeewa — Full-Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  category: "technology",
};

export const viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-zinc-950 font-sans antialiased selection:bg-indigo-500/30">
        {children}
      </body>
    </html>
  );
}
