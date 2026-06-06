import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
