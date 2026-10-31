import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ServicesSSR from "@/components/ServicesSSR";
import IndustriesWeServe from "@/components/IndustriesWeServe";
import WhyChooseUs from "@/components/WhyChooseUs";
import CtaBanner from "@/components/CtaBanner";
import OurClients from "@/components/OurClients";
import Gallery from "@/components/Gallery";
import BlogsSSR from "@/components/BlogsSSR";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import HomePageSettings from "@/models/HomePageSettings";
import Service from "@/models/Service";
import Blog from "@/models/Blog";
import { Metadata } from "next";

export const revalidate = 3600; // ISR: regenerate page every hour

export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const settings = await HomePageSettings.findOne({}).lean();

  if (settings) {
    return {
      title: (settings as any).metaTitle || "Berrisol & Illusion Decors | Premium Stretch Ceilings",
      description: (settings as any).metaDescription || "Transform your space with innovative stretch ceiling solutions designed for elegance, durability, and flawless finishes.",
      alternates: { canonical: "/" },
    };
  }

  return {
    title: "Berrisol & Illusion Decors | Premium Stretch Ceilings",
    description: "Transform your space with innovative stretch ceiling solutions designed for elegance, durability, and flawless finishes.",
    alternates: { canonical: "/" },
  };
}

export default async function Home() {
  await connectDB();

  // Fetch all data server-side in parallel
  const [settingsRaw, servicesRaw, blogsRaw] = await Promise.all([
    HomePageSettings.findOne({}).lean(),
    Service.find({ isPublished: true }).sort({ createdAt: -1 }).limit(3).lean(),
    Blog.find({ isPublished: true }).sort({ createdAt: -1 }).limit(3).lean(),
  ]);

  const faqs = settingsRaw && (settingsRaw as any).faqs
    ? JSON.parse(JSON.stringify((settingsRaw as any).faqs))
    : [];

  const rawSchema = settingsRaw && (settingsRaw as any).schemaMarkup
    ? String((settingsRaw as any).schemaMarkup).trim()
    : "";

  // Strip wrapping <script> tags if user pasted full HTML snippet
  const cleanSchema = rawSchema.startsWith("<script")
    ? rawSchema.replace(/^<script[^>]*>/i, "").replace(/<\/script>$/i, "").trim()
    : rawSchema;

  // Serialize for client components (removes Mongoose internals)
  const services = JSON.parse(JSON.stringify(servicesRaw));
  const blogs = JSON.parse(JSON.stringify(blogsRaw));

  return (
    <main>
      {cleanSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: cleanSchema }}
        />
      )}
      <Navbar />
      <Hero />
      <About />
      <ServicesSSR services={services} />
      <IndustriesWeServe />
      <WhyChooseUs />
      <CtaBanner />
      <OurClients />
      <Gallery />
      <BlogsSSR posts={blogs} />
      <Testimonials />
      <Faq faqs={faqs} />
      <ContactForm />
      <Footer />
    </main>
  );
}
