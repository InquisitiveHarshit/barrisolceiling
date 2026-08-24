import Gallery from "@/components/Gallery";
import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Gallery | Borocelling",
  description: "View our portfolio of premium stretch ceiling installations across Delhi NCR.",
};

export default function GalleryPage() {
  return (
    <main className="pt-20">
      <Navbar />
      <Gallery showViewAll={false} />
      <ContactForm />
      <Footer />
    </main>
  );
}
