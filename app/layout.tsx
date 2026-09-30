import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import WhatsAppButton from "@/components/WhatsAppButton";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://barrisolceiling.com"),
  title: "Berrisol & Illusion Decors | Premium Stretch Ceilings",
  description:
    "Transform your space with innovative stretch ceiling solutions designed for elegance, durability, and flawless finishes.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  verification: {
    google: "k1vOl6gSCn1EBAG3SE7CLN1l9xE3NPMwEsXMNvUorXo",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://barrisolceiling.com/#organization",
      name: "Berrisol & Illusion Decors",
      alternateName: ["Barrisol Ceiling", "Berrisol Ceiling"],
      url: "https://barrisolceiling.com",
      logo: {
        "@type": "ImageObject",
        url: "https://barrisolceiling.com/logo.png",
        width: 200,
        height: 60,
      },
      image: "https://barrisolceiling.com/hero-stretch-ceiling.jpg",
      description:
        "Premium stretch ceiling solutions for residential, commercial, and institutional spaces. Specialists in PVC and fabric stretch ceilings with LED lighting, 3D designs, printed and acoustic systems.",
      telephone: "+919540593079",
      email: "info@barrisolceiling.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Delhi",
        addressRegion: "Delhi",
        addressCountry: "IN",
      },
      areaServed: [
        { "@type": "City", name: "Delhi" },
        { "@type": "City", name: "Noida" },
        { "@type": "City", name: "Gurgaon" },
        { "@type": "City", name: "Ghaziabad" },
        { "@type": "City", name: "Bangalore" },
        { "@type": "City", name: "Lucknow" },
        { "@type": "Country", name: "India" },
      ],
      knowsAbout: [
        "Stretch Ceilings",
        "PVC Ceilings",
        "LED Ceiling Lighting",
        "3D Stretch Ceilings",
        "Acoustic Ceilings",
        "Printed Ceilings",
        "Interior Design",
      ],
      sameAs: [],
      priceRange: "₹₹₹",
    },
    {
      "@type": "WebSite",
      "@id": "https://barrisolceiling.com/#website",
      url: "https://barrisolceiling.com",
      name: "Berrisol & Illusion Decors",
      publisher: { "@id": "https://barrisolceiling.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://barrisolceiling.com/blog?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <head>
        <meta name="google-site-verification" content="k1vOl6gSCn1EBAG3SE7CLN1l9xE3NPMwEsXMNvUorXo" />
        {/* AI-readable site summary — lets Claude, ChatGPT, Perplexity etc. find content */}
        <link rel="alternate" type="text/plain" href="https://barrisolceiling.com/llms.txt" title="LLMs.txt" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ── Organization + LocalBusiness structured data ── */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F8JDH2R0ML"
          strategy="lazyOnload"
        />
        <Script id="google-analytics-gtag" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-F8JDH2R0ML');
            gtag('config', 'AW-18383636220');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18383636220"
          strategy="lazyOnload"
        />
      </head>
      <body className={`${montserrat.variable} ${playfair.variable} font-body-md text-body-md antialiased overflow-x-hidden selection:bg-brand-vibrancy selection:text-luminary-white min-h-full flex flex-col`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
