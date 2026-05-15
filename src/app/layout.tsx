import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const proximaNova = localFont({
  src: [
    { path: "../fonts/ProximaNova-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/ProximaNova-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/ProximaNova-Semibold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/ProximaNova-Extrabold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-proxima",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carpe Diem | Seize the Moment",
  description: "Premium tools and curated experiences designed for those who value time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${proximaNova.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

