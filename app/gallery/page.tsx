import Gallery from "@/components/Gallery";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import { GalleryImage } from "@/models/GalleryImage";

export const revalidate = 3600; // ISR 1 hour

export const metadata = {
  title: "Gallery | Borocelling",
  description: "View our portfolio of premium stretch ceiling installations across India.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage() {
  let images = [];
  try {
    await connectDB();
    const docs = await GalleryImage.find().sort({ createdAt: -1 }).lean();
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
