"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setServices(d.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-[#0C0E12] min-h-screen">
      <Navbar />

      <section className="py-16 sm:py-24 px-4 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A62681] font-semibold mb-4 block"
            >
              WHAT WE OFFER
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6"
            >
              Our Services
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="h-px bg-[#A62681]/50 mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-sm sm:text-base text-[#8E94A0] max-w-2xl font-light leading-relaxed px-4"
            >
              Tailor-made stretch ceiling and lighting solutions designed for every interior space.
            </motion.p>
          </div>

          {/* Services Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[#111317] rounded-xs overflow-hidden flex flex-col border border-white/5 animate-pulse"
                >
                  <div className="h-[200px] sm:h-[220px] bg-white/5" />
                  <div className="p-6 sm:p-7 flex flex-col gap-3">
                    <div className="h-3 rounded bg-white/5 w-1/3" />
                    <div className="h-5 rounded bg-white/5 w-3/4" />
                    <div className="h-3 rounded bg-white/5 w-full" />
                    <div className="h-3 rounded bg-white/5 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service._id || service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="bg-[#111317] border border-white/5 hover:border-[#A62681]/40 group transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-[0_8px_32px_-8px_rgba(166,38,129,0.25)] rounded-xs"
                >
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
                    <h3 className="font-serif text-lg sm:text-xl text-white mb-3 leading-snug group-hover:text-[#E4B5FF] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#8E94A0] mb-6 leading-relaxed flex-1 font-light">
                      {service.shortDescription}
                    </p>
                    <Link
                      href={`/service-detail/${service.slug}`}
                      className="font-mono text-xs uppercase tracking-wider text-[#A62681] inline-flex items-center gap-2 hover:gap-3 transition-all mt-auto group-hover:text-[#E4B5FF]"
                    >
                      LEARN MORE
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
              {services.length === 0 && (
                <div className="col-span-full text-center py-20 text-[#8E94A0] font-mono text-sm">
                  No services published yet.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <ContactForm />
      <Footer />
    </main>
  );
}
