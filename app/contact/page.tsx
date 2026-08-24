import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us | Borocelling",
  description: "Get in touch for a free consultation on premium stretch ceiling installations.",
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
