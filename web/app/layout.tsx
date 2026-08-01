import type { Metadata } from "next";
import Link from "next/link";
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
  title: "SkyFeed - Aviation News Hub",
  description: "Real-time aviation news aggregated from trusted sources worldwide",
  keywords: ["aviation", "news", "general aviation", "pilots", "flying"],
};

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
      <body className="min-h-full flex flex-col">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-slate-950/95 backdrop-blur border-b border-slate-700/50 z-50">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <span className="text-2xl">✈️</span>
              <span className="font-bold text-white text-lg">SkyFeed</span>
            </Link>

            {/* Menu */}
            <div className="flex items-center gap-8">
              <Link href="/" className="text-slate-300 hover:text-white transition font-medium text-sm">
                News
              </Link>
              <Link href="/airports" className="text-slate-300 hover:text-white transition font-medium text-sm">
                Airports
              </Link>
              <Link href="/resources" className="text-slate-300 hover:text-white transition font-medium text-sm">
                Resources
              </Link>
              <Link href="/marketplace" className="text-slate-300 hover:text-white transition font-medium text-sm">
                Marketplace
              </Link>
            </div>
          </div>
        </nav>

        {/* Main content with padding for fixed nav */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
