import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us | Stretch Ceilings Delhi & Pan India",
  description: "Contact Barrisol Ceiling, Delhi for Stretch Ceilings quotes and site visits. We serve all major cities across India. Call or message us today!",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen flex items-center">
        <div className="w-full">
          <ContactForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
