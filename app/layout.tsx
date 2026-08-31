import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("light", "font-sans", geist.variable)}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18383636220"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'AW-18383636220');
          `}
        </Script>
      </head>
      <body className={`${montserrat.variable} ${playfair.variable} font-body-md text-body-md antialiased overflow-x-hidden selection:bg-brand-vibrancy selection:text-luminary-white min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
