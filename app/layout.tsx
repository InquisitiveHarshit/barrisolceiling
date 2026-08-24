import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Berrisol & Illusion Decors | Premium Stretch Ceilings",
  description:
    "Transform your space with innovative stretch ceiling solutions designed for elegance, durability, and flawless finishes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className="font-body-md text-body-md antialiased overflow-x-hidden selection:bg-brand-vibrancy selection:text-luminary-white min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
