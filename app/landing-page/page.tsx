import type { Metadata } from "next";
import LandingNav from "@/components/landing/LandingNav";
import LandingHero from "@/components/landing/LandingHero";
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
import connectDB from "@/lib/db";
import HomePageSettings from "@/models/HomePageSettings";
import Service from "@/models/Service";
import Blog from "@/models/Blog";

// Do NOT index this page
export const metadata: Metadata = {
  title: "Stretch Ceiling Solutions for Architects & Interior Designers | Barrisol",
  description:
    "Bring your creative vision to life with Barrisol's innovative stretch ceiling solutions. Book a free site survey today.",
  robots: { index: false, follow: false },
};

export const revalidate = 3600;

export default async function LandingPage() {
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
  const blogs    = JSON.parse(JSON.stringify(blogsRaw));

  return (
    <main className="bg-white text-gray-900 min-h-screen selection:bg-[#A82F9D]/20 selection:text-[#A82F9D]">
      {/* Light-theme nav */}
      <LandingNav />

      {/* Light-theme hero with embedded contact form */}
      <LandingHero />

      {/* Light-theme & #A82F9D matching sections for landing page only */}
      <LandingAbout />
      <LandingServices services={services} />
      <LandingIndustries />
      <LandingWhyChooseUs />
      <LandingClients />
      <LandingGallery />
      <LandingBlogs posts={blogs} />
      <LandingTestimonials />
      <LandingFaq faqs={faqs} />

      {/* Light-theme footer */}
      <LandingFooter />
    </main>
  );
}
