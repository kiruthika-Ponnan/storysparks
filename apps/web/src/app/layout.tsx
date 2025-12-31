import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

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
    default: "StorySparks | AI video ads for local businesses",
    template: "%s | StorySparks",
  },
  description:
    "StorySparks helps local businesses generate scripts, voiceovers, and ready-to-run video ads in minutes.",
  metadataBase: new URL("https://storysparks.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-black antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
