import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";

export const metadata = {
  title: "About Us | Borocelling",
  description: "Leading Stretch Ceiling Experts Delivering Premium Modern Interior Solutions in Delhi.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-[#0C0E12]">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
