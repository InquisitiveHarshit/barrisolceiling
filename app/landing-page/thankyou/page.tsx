import type { Metadata } from "next";
import LandingNav from "@/components/landing/LandingNav";
import LandingHero from "@/components/landing/LandingHero";
import LandingQuoteSection from "@/components/landing/LandingQuoteSection";
import LandingAbout from "@/components/landing/LandingAbout";
import LandingServices from "@/components/landing/LandingServices";
import LandingIndustries from "@/components/landing/LandingIndustries";
import LandingWhyChooseUs from "@/components/landing/LandingWhyChooseUs";
import LandingClients from "@/components/landing/LandingClients";
import LandingGallery from "@/components/landing/LandingGallery";
import LandingBlogs from "@/components/landing/LandingBlogs";
import LandingTestimonials from "@/components/landing/LandingTestimonials";
import LandingFaq from "@/components/landing/LandingFaq";
import LandingFooter from "@/components/landing/LandingFooter";
import ConversionFirer from "@/components/landing/ConversionFirer";
import connectDB from "@/lib/db";
import HomePageSettings from "@/models/HomePageSettings";
import Service from "@/models/Service";
import Blog from "@/models/Blog";

export const metadata: Metadata = {
  title: "Thank You | Barrisol Stretch Ceilings",
  description: "Thank you for your inquiry. Our team will reach out to you shortly.",
  robots: { index: false, follow: false },
};

export const revalidate = 3600;

export default async function LandingThankYouPage() {
  await connectDB();

  const [settingsRaw, servicesRaw, blogsRaw] = await Promise.all([
    HomePageSettings.findOne({}).lean(),
    Service.find({ isPublished: true }).sort({ createdAt: -1 }).limit(3).lean(),
    Blog.find({ isPublished: true }).sort({ createdAt: -1 }).limit(3).lean(),
  ]);

  const faqs = settingsRaw && (settingsRaw as any).faqs
    ? JSON.parse(JSON.stringify((settingsRaw as any).faqs))
    : [];

  const services = JSON.parse(JSON.stringify(servicesRaw));
  const blogs = JSON.parse(JSON.stringify(blogsRaw));

  return (
    <main className="bg-white text-gray-900 min-h-screen selection:bg-[#A82F9D]/20 selection:text-[#A82F9D] animate-page-slide-in">
      {/* Fires GA4 generate_lead + Google Ads conversion the moment this page loads */}
      <ConversionFirer />
      <LandingNav />

      {/* Hero section with the thank you card in place of the form */}
      <LandingHero showThankYou />

      <LandingQuoteSection />
      <LandingAbout />
      <LandingServices services={services} />
      <LandingIndustries />
      <LandingWhyChooseUs />
      <LandingClients />
      <LandingGallery />
      <LandingBlogs posts={blogs} />
      <LandingTestimonials />
      <LandingFaq faqs={faqs} />
      <LandingFooter />
    </main>
  );
}
