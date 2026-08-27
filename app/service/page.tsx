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
    <main className="bg-surface-container-low min-h-screen pt-20">
      <Navbar />

      <section className="py-section-gap px-5 md:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-label-caps text-label-caps text-brand-vibrancy tracking-[0.2em] mb-4 block"
            >
              WHAT WE OFFER
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-headline-lg text-4xl md:text-5xl text-[#202124] mb-6"
            >
              Our Services
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="h-px bg-brand-vibrancy/50 mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-body-md text-on-surface-variant max-w-2xl"
            >
              Tailor-made stretch ceiling and lighting solutions designed for every interior space.
            </motion.p>
          </div>

          {/* Services Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map((i) => (
                <div key={i} className="bg-luminary-white rounded-2xl overflow-hidden flex flex-col shadow-sm border border-outline/10 animate-pulse">
                  <div className="h-[220px] bg-surface-container" />
                  <div className="p-7 flex flex-col gap-3">
                    <div className="h-3 rounded bg-surface-container w-1/3" />
                    <div className="h-5 rounded bg-surface-container w-3/4" />
                    <div className="h-3 rounded bg-surface-container w-full" />
                    <div className="h-3 rounded bg-surface-container w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, i) => (
                <motion.div
                  key={service._id || service.title}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className="bg-luminary-white rounded-2xl group hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-md border border-outline/10"
                >
                  <div className="h-[220px] overflow-hidden">
                    <img
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={service.coverImage || "/heroimage.webp"}
                    />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <span className="font-label-caps text-label-caps text-brand-vibrancy mb-4 block">
                      {service.category}
                    </span>
                    <h3 className="font-headline-md text-xl text-[#202124] mb-3 leading-snug">
                      {service.title}
                    </h3>
                    <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed flex-1">
                      {service.shortDescription}
                    </p>
                    <Link
                      href={`/service-detail/${service.slug}`}
                      className="font-label-caps text-label-caps text-brand-vibrancy inline-flex items-center gap-2 hover:gap-3 transition-all mt-auto"
                    >
                      LEARN MORE
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              ))}
              {services.length === 0 && (
                <div className="col-span-3 text-center py-20 text-on-surface-variant">
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
