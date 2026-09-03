"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#fafafa] dark:bg-[#0C0E12] text-zinc-900 dark:text-[#E2E2E6] border-b border-zinc-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-[94rem] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image — leads the section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="relative h-[400px] md:h-[480px] lg:h-[540px] w-full overflow-hidden rounded-xs border border-zinc-200 dark:border-white/10 shadow-2xl"
          >
            <Image
              alt="Professional installing a premium stretch ceiling"
              fill
              className="object-cover filter brightness-95"
              src="/hero-stretch-ceiling.jpg"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Accent badge */}
            <div className="absolute bottom-6 left-6 bg-gradient-to-r from-[#6A2C91] to-[#A62681] text-white px-5 py-4 rounded-xs shadow-xl backdrop-blur-md">
              <p className="font-mono text-3xl font-light mb-0.5">10+</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/80">
                Years of Excellence
              </p>
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-6">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A62681] dark:text-[#E4B5FF] font-semibold block mb-3">
                Delhi NCR Atelier
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-zinc-900 dark:text-white font-serif font-normal leading-tight">
                Leading Stretch Ceiling Experts in Delhi
              </h2>
            </motion.div>

            <motion.p
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="text-base text-zinc-600 dark:text-[#8E94A0] leading-relaxed font-light"
            >
              We are premier false ceiling contractors in Delhi NCR, specializing
              in European stretch membranes and custom technical lighting solutions for luxury residential and commercial spaces.
            </motion.p>

            <motion.ul
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="space-y-3.5 pt-2"
            >
              {[
                "1000+ successful installations across Delhi, Gurugram & Noida",
                "European BS EN 14716 & DIN 4102-B1 fire certified membranes",
                "Custom photometric design support with on-site laser survey",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-1 w-5 h-5 rounded-full bg-[#A62681]/10 dark:bg-[#A62681]/20 border border-[#A62681]/40 flex-shrink-0 flex items-center justify-center">
                    <Check size={12} className="text-[#A62681] dark:text-[#E4B5FF]" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-zinc-800 dark:text-[#D8DCE3] font-light">{item}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="pt-4"
            >
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-zinc-300 dark:border-white/15 text-zinc-900 dark:text-white hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 text-xs font-mono uppercase tracking-[0.15em] transition-all rounded-xs font-semibold"
              >
                Learn More About Us
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
