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

export const metadata: Metadata = {
  title: "Unified CRM/ERP Platform",
  description: "Multi-tenant CRM and ERP platform with comprehensive business management tools",
  applicationName: "Unified CRM/ERP Platform",
  openGraph: {
    type: "website",
    siteName: "Unified CRM/ERP Platform",
    title: "Unified CRM/ERP Platform",
    description: "Multi-tenant CRM and ERP platform with comprehensive business management tools",
  },
  twitter: {
    card: "summary",
    title: "Unified CRM/ERP Platform",
    description: "Multi-tenant CRM and ERP platform with comprehensive business management tools",
  },
};

// theme-color drives the mobile browser toolbar/status-bar tint. The dashboard's top
// surface is gray-50 in light mode and gray-900 in dark mode (Dashboard.tsx:
// `bg-gray-50 dark:bg-gray-900`), so matching the UA chrome to each keeps the phone
// toolbar from clashing with the page instead of defaulting to a mismatched white/black.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
