import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { CompareTray } from "@/features/compare/components/CompareTray";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mattsnoop — Property cost & decision intelligence",
  description: "Compare the real cost of renting or buying a home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} font-sans antialiased`}>
      <body className="min-h-screen bg-stone-50 text-stone-900">
        <Header />
        {children}
        <CompareTray />
      </body>
    </html>
  );
}
