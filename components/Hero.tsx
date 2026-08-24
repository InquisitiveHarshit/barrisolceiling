"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <>
      <section className="relative w-full min-h-[88dvh] flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center scale-105"
            style={{ backgroundImage: "url('/heroimage.webp')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/65 to-primary/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary/60" />
        </div>

        {/* Content: split layout */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-center">

          {/* LEFT — Hero copy */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-display-lg text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-luminary-white mb-6 leading-[1.05] tracking-tight"
            >
              Transform Your Space with{" "}
              <em className="text-brand-vibrancy not-italic font-bold">
                Elegant Ceilings
              </em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="font-body-lg text-lg text-primary-fixed-dim max-w-lg leading-relaxed mb-10"
            >
              Delhi&apos;s most trusted stretch ceiling experts. Seamless finishes,
              premium European materials, and flawless installation guaranteed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="flex items-center gap-4"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97, y: 1 }}
                  className="bg-brand-gradient text-luminary-white px-6 py-4 font-label-caps text-label-caps shadow-lg hover:shadow-brand-vibrancy/20 transition-all"
                >
                  Contact Us
                </motion.button>
              </Link>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97, y: 1 }}
                  className="bg-transparent border border-luminary-white/30 text-luminary-white px-6 py-4 font-label-caps text-label-caps hover:bg-luminary-white/10 transition-colors"
                >
                  Our Services
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT — Inline contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="bg-surface-container-low p-8 md:p-10 relative overflow-hidden"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
            }}
          >
            <div className="relative z-10">
              {/* Form header */}
              <div className="mb-8">
                <h2 className="font-headline-md text-2xl text-[#202124] mb-2">
                  Book a Free Site Visit
                </h2>
                <p className="font-body-md text-sm text-on-surface-variant">
                  Fill in your details and our team will reach out within 24 hours.
                </p>
              </div>

              <form className="space-y-4 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                  {/* Name */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="hero-name" className="font-label-caps text-label-caps text-on-surface-variant">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="hero-name"
                      placeholder="John Doe"
                      className="w-full bg-white border border-outline/30 px-4 py-3 text-[#202124] placeholder:text-outline focus:outline-none focus:border-brand-vibrancy transition-colors font-body-md text-body-md rounded-none shadow-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="hero-phone" className="font-label-caps text-label-caps text-on-surface-variant">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="hero-phone"
                      placeholder="+91 98765 43210"
                      className="w-full bg-white border border-outline/30 px-4 py-3 text-[#202124] placeholder:text-outline focus:outline-none focus:border-brand-vibrancy transition-colors font-body-md text-body-md rounded-none shadow-sm"
                    />
                  </div>
                </div>

                {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="hero-email" className="font-label-caps text-label-caps text-on-surface-variant">
                  Email Address
                </label>
                <input
                  type="email"
                  id="hero-email"
                  placeholder="john@example.com"
                  className="w-full bg-white border border-outline/30 px-4 py-3 text-[#202124] placeholder:text-outline focus:outline-none focus:border-brand-vibrancy transition-colors font-body-md text-body-md rounded-none shadow-sm"
                />
              </div>

                {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="hero-message" className="font-label-caps text-label-caps text-on-surface-variant">
                  Your Message (optional)
                </label>
                <textarea
                  id="hero-message"
                  rows={2}
                  placeholder="How can we help?"
                  className="w-full bg-white border border-outline/30 px-4 py-3 text-[#202124] placeholder:text-outline focus:outline-none focus:border-brand-vibrancy transition-colors font-body-md text-body-md resize-none rounded-none shadow-sm"
                />
              </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.97, y: 1 }}
                  type="submit"
                  className="w-full bg-brand-gradient text-luminary-white px-6 py-4 font-label-caps text-label-caps mt-2 shadow-lg hover:shadow-brand-vibrancy/20 transition-shadow inline-flex items-center justify-center gap-2"
                >
                  Book Free Site Visit
                  <ArrowRight size={16} />
                </motion.button>
              </form>

              {/* Trust note */}
              <p className="font-label-caps text-label-caps text-[10px] text-on-surface-variant text-center mt-6">
                No commitment required &middot; Response within 24 hours
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust strip — below hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="bg-primary border-t border-luminary-white/10"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-16 py-7 grid grid-cols-3 divide-x divide-luminary-white/10">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "1000+", label: "Installations" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center px-4">
              <p className="text-2xl md:text-3xl font-bold text-luminary-white mb-1 font-display-lg">
                {stat.value}
              </p>
              <p className="font-label-caps text-label-caps text-primary-fixed-dim text-[10px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
