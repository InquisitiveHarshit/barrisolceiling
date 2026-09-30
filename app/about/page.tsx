import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";

export const metadata = {
  title: "About Us | Stretch Ceilings Company in Delhi",
  description: "Barrisol Ceiling is a trusted Stretch Ceilings company based in Delhi. Expert installation and quality materials, serving customers across India.",
  alternates: { canonical: "/about" },
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
