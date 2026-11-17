import Gallery from "@/components/Gallery";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import { GalleryImage } from "@/models/GalleryImage";

export const revalidate = 3600; // ISR 1 hour

export const metadata = {
  title: "Stretch Ceilings Gallery | Design Ideas & Projects",
  description: "Browse our Stretch Ceilings gallery for living rooms, bedrooms, offices and showrooms. Get design inspiration from our completed projects across India.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  let images = [];
  try {
    await connectDB();
    const docs = await GalleryImage.find().sort({ createdAt: -1 }).lean();
    docs.sort((a: any, b: any) => {
      const orderA = typeof a.order === "number" && a.order > 0 ? a.order : 999999;
      const orderB = typeof b.order === "number" && b.order > 0 ? b.order : 999999;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    images = JSON.parse(JSON.stringify(docs));
  } catch (e) {
    images = [];
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <Gallery showViewAll={false} initialImages={images} />
      <ContactForm />
      <Footer />
    </main>
  );
}
