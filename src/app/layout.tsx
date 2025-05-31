import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Merriweather } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Matcha Journey: From Japan to America",
  description: "Explore the cultural journey of matcha powder from its Japanese origins to its commodification in American markets",
  keywords: ["matcha", "Japanese tea", "matcha visualization", "tea culture", "commodification", "cultural journey"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansJP.variable} ${merriweather.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
