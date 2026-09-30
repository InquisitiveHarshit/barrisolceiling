import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms & Conditions | Barrisol Ceiling Delhi",
  description: "Read the Terms & Conditions of Barrisol Ceiling covering our Stretch Ceilings services, website usage, orders and customer responsibilities.",
  alternates: { canonical: "/termscondition" },
};

export default function TermsConditionsPage() {
  return (
    <main className="bg-[#0C0E12] min-h-screen">
      <Navbar />

      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A62681] font-semibold mb-4 block">
              LEGAL INFORMATION
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              Terms & Conditions
            </h1>
            <div className="h-px w-[60px] bg-[#A62681]/50 mb-6" />
            <p className="text-sm sm:text-base text-[#8E94A0] max-w-2xl font-light leading-relaxed px-4">
              Use of Our Website and Services
            </p>
          </div>

          {/* Content */}
          <div className="bg-[#111317] border border-white/5 rounded-xs p-8 sm:p-12 text-[#8E94A0] font-light leading-relaxed space-y-6 text-sm sm:text-base shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]">
            <p>
              By using our website and services, you agree to be bound by the following terms and conditions. These terms govern your use of our platform, including browsing content, submitting inquiries, placing service requests, or engaging with any interactive features.
            </p>

            <p>
              All content, images, logos, and text on this website are the intellectual property of <strong className="text-white font-normal">Berrisol</strong> and cannot be copied, distributed, or reproduced without prior written permission. Users must not misuse the site in any way that may cause harm, disruption, or unlawful activity.
            </p>

            <p>
              We reserve the right to update or modify these terms at any time without prior notice. It is your responsibility to review them periodically. Continued use of our services indicates your acceptance of any changes.
            </p>

            <p>
              All services, pricing, and availability mentioned are subject to change based on market or project conditions. We are not responsible for any technical errors or third-party disruptions that affect access to the site.
            </p>

            <p className="border-t border-white/5 pt-6 mt-8">
              If you disagree with any part of these terms, we recommend discontinuing the use of our website.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

