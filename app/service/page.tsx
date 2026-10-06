import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import { Metadata } from "next";
import FaqSection from "@/components/FaqSection";


export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Stretch Ceiling Services | Pan India Installation",
  description: "Explore our Stretch Ceilings services: printed, translucent, glossy and acoustic ceilings. Professional installation across India from our Delhi office.",
  alternates: { canonical: "/service" },
};

export default async function ServicesPage() {
  await connectDB();
  const servicesRaw = await Service.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .lean();

  const services = JSON.parse(JSON.stringify(servicesRaw));

  // Aggregate FAQs from all services into one list
  const allFaqs = services.flatMap((s: any) => s.faqs ?? []);

  return (
    <main className="bg-[#0C0E12] min-h-screen">
      <Navbar />

      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A62681] font-semibold mb-4 block">
              WHAT WE OFFER
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6">
              Our Services
            </h1>
            <div className="h-px w-[60px] bg-[#A62681]/50 mb-6" />
            <p className="text-sm sm:text-base text-[#8E94A0] max-w-2xl font-light leading-relaxed px-4">
              Tailor-made stretch ceiling and lighting solutions designed for every interior space.
            </p>
          </div>

          {/* Services Grid */}
          {services.length === 0 ? (
            <div className="text-center py-20 text-[#8E94A0] font-mono text-sm">
              No services published yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {services.map((service: any) => (
                <Link
                  key={service._id}
                  href={`/service-detail/${service.slug}`}
                  className="block group"
                >
                  <div className="bg-[#111317] border border-white/5 group-hover:border-[#A62681]/40 transition-all duration-300 overflow-hidden flex flex-col group-hover:-translate-y-1 group-hover:shadow-[0_8px_32px_-8px_rgba(166,38,129,0.25)] rounded-xs h-full">
                    <div className="h-[200px] sm:h-[220px] overflow-hidden">
                      <img
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                        src={service.coverImage || "/heroimage.webp"}
                      />
                    </div>
                    <div className="p-5 sm:p-7 flex flex-col flex-1">
                      {service.category && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A62681] mb-3 block">
                          {service.category}
                        </span>
                      )}
                      <h2 className="font-serif text-lg sm:text-xl text-white mb-3 leading-snug group-hover:text-[#E4B5FF] transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-sm text-[#8E94A0] mb-6 leading-relaxed flex-1 font-light">
                        {service.shortDescription}
                      </p>
                      <div className="font-mono text-xs uppercase tracking-wider text-[#A62681] inline-flex items-center gap-2 group-hover:gap-3 transition-all mt-auto group-hover:text-[#E4B5FF]">
                        LEARN MORE
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <FaqSection
        faqs={allFaqs}
        theme="dark"
        heading="Frequently Asked Questions"
        subheading="Got Questions?"
        pageUrl="https://barrisoindia.com/service"
      />
      <ContactForm />
      <Footer />
    </main>
  );
}
