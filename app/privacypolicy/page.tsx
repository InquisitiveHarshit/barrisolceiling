import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Barrisol Ceiling Delhi",
  description: "Read the Privacy Policy of Barrisol Ceiling to learn how we collect, use and protect your personal information when you use our website.",
  alternates: { canonical: "/privacypolicy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#0C0E12] min-h-screen">
      <Navbar />

      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A62681] font-semibold mb-4 block">
              OUR COMMITMENT
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              Privacy Policy
            </h1>
            <div className="h-px w-[60px] bg-[#A62681]/50 mb-6" />
            <p className="text-sm sm:text-base text-[#8E94A0] max-w-2xl font-light leading-relaxed px-4">
              Your Data, Our Responsibility
            </p>
          </div>

          {/* Content */}
          <div className="bg-[#111317] border border-white/5 rounded-xs p-8 sm:p-12 text-[#8E94A0] font-light leading-relaxed space-y-6 text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]">
            <p>
              Your privacy is not just a policy — it's our promise. We are fully committed to protecting the personal data you share with us. Whether you're filling out a form, making an inquiry, placing an order, or simply browsing our website, we ensure your information is collected, stored, and used responsibly and securely.
            </p>

            <p>
              We only collect the necessary details required to provide you with the best service experience — such as your name, contact number, email, and address. This data is used strictly for communication, order processing, support, and service improvement. We <strong className="text-white font-normal">do not sell, rent, or share</strong> your data with any third parties without your consent.
            </p>

            <p>
              All our systems are secured with updated encryption and access controls to prevent unauthorized use. You have full rights to review, update, or delete your data at any time by contacting us.
            </p>

            <p className="text-lg text-white mt-8 italic border-l-2 border-[#A62681]/50 pl-4 py-1">
              Your trust is important to us — and we're committed to earning and keeping it.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

