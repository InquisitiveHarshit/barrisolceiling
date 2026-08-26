import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Berrisol & Illusion Decors | Premium Stretch Ceilings",
  description:
    "Transform your space with innovative stretch ceiling solutions designed for elegance, durability, and flawless finishes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className={`${montserrat.variable} ${playfair.variable} font-body-md text-body-md antialiased overflow-x-hidden selection:bg-brand-vibrancy selection:text-luminary-white min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
