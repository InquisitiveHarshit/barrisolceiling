"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const REASONS = [
  {
    num: "01",
    title: "A Decade of Precision",
    body: "10+ years of flawless stretch ceiling installations across Delhi NCR — every membrane, every profile, executed to the millimetre.",
  },
  {
    num: "02",
    title: "European-Grade Materials",
    body: "Premium PVC and woven fabric sourced from certified European manufacturers. UV-stable, waterproof, Class-M1 fire rated.",
  },
  {
    num: "03",
    title: "Zero-Surprise Quotations",
    body: "Transparent line-item proposals with no hidden charges. You approve every figure before a single anchor is drilled.",
  },
  {
    num: "04",
    title: "On-Time, Every Time",
    body: "Our project management system tracks every milestone. On average we deliver 2 days ahead of agreed timelines.",
  },
];

const STATS = [
  { value: "1000+", label: "Installations Completed" },
  { value: "10+",   label: "Years in Operation"      },
  { value: "98%",   label: "Client Satisfaction Rate"},
  { value: "3 Day", label: "Avg. Project Turnaround" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] as const } },
};
const stagger = (delay = 0) => ({
  hidden: { opacity: 0, x: -20 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] as const, delay } },
});

export default function LandingWhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-black/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-black/10 mb-12"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A82F9D] font-semibold block mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Why Choose Us for Stretch Ceiling Installation
            </h2>
          </div>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed shrink-0">
            We build long-term relationships through transparency, craftsmanship, and European engineering standards.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-16 items-start">

          {/* LEFT — Numbered list */}
          <div className="space-y-0 divide-y divide-black/10">
            {REASONS.map((r, i) => (
              <motion.div
                key={r.num}
                variants={stagger(i * 0.1)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="group grid grid-cols-[56px_1fr] gap-6 py-9"
              >
                <span className="font-mono text-4xl font-black leading-none select-none text-[#A82F9D]/30 group-hover:text-[#A82F9D] transition-colors">
                  {r.num}
                </span>
                <div className="flex flex-col gap-2.5">
                  <div className="relative h-px w-full bg-black/5 overflow-hidden mb-1">
                    <div className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-500 ease-out bg-gradient-to-r from-[#A82F9D] to-transparent" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#A82F9D] transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-lg">{r.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT — Stats + CTA card */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">

            {/* 2×2 Stats */}
            <div className="grid grid-cols-2 gap-px bg-black/10 border border-black/10">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="bg-white px-6 py-7 flex flex-col gap-1.5 hover:bg-gray-50 transition-colors"
                >
                  <span className="text-3xl lg:text-4xl font-bold text-[#A82F9D] leading-none">
                    {s.value}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400 leading-snug">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              transition={{ delay: 0.55 }}
              className="border border-[#A82F9D]/20 bg-[#A82F9D]/5 px-8 py-9"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
                Ready to Transform Your Space?
              </h3>
              <p className="text-sm text-gray-500 mb-7 leading-relaxed">
                Get a complimentary on-site spatial survey and membrane sample — zero commitment.
              </p>
              <a
                href="#contact"
                className="group/btn inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest font-semibold text-[#A82F9D] hover:text-gray-900 transition-colors"
              >
                <span>Book Free Site Visit</span>
                <span className="inline-flex items-center justify-center w-8 h-8 border border-[#A82F9D]/40 group-hover/btn:border-gray-900 group-hover/btn:bg-gray-900/5 transition-all">
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
