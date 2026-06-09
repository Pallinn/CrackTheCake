import type { Metadata } from "next";
import "./globals.css";
import LofiPlayer from "@/components/LofiPlayer";

export const metadata: Metadata = {
  title: "Crack the Cake — Discover Your Personality",
  description: "Answer a few simple questions and discover your unique personality type.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Playpen+Sans+Thai:wght@400;500;600;700;800&family=Playpen+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      </head>
      <body className="min-h-full">
        {children}
        <LofiPlayer/>
      </body>
    </html>
  );
}
