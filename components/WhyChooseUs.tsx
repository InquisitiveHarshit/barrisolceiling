"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────── */
const REASONS = [
  {
    num: "01",
    title: "A Decade of Precision",
    body: "10+ years of flawless stretch ceiling installations across Delhi NCR — every membrane, every profile, executed to the millimetre.",
    accent: "#C77DFF",
  },
  {
    num: "02",
    title: "European-Grade Materials",
    body: "Premium PVC and woven fabric sourced from certified European manufacturers. UV-stable, waterproof, Class-M1 fire rated.",
    accent: "#9D4EDD",
  },
  {
    num: "03",
    title: "Zero-Surprise Quotations",
    body: "Transparent line-item proposals with no hidden charges. You approve every figure before a single anchor is drilled.",
    accent: "#E4B5FF",
  },
  {
    num: "04",
    title: "On-Time, Every Time",
    body: "Our project management system tracks every milestone. On average we deliver 2 days ahead of agreed timelines.",
    accent: "#C77DFF",
  },
];

const STATS = [
  { value: "1000+", label: "Installations Completed" },
  { value: "10+",   label: "Years in Operation" },
  { value: "98%",   label: "Client Satisfaction Rate" },
  { value: "3 Day", label: "Avg. Project Turnaround" },
];

/* ─── Animation variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] as const } },
};
const stagger = (delay = 0) => ({
  hidden: { opacity: 0, x: -20 },
  show:   { opacity: 1, x: 0,  transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] as const, delay } },
});
const lineGrow = {
  hidden: { scaleX: 0, originX: 0 },
  show:   { scaleX: 1, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] as const, delay: 0.15 } },
};

/* ─── Component ──────────────────────────────────────────────────── */
export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.12 });

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="py-24 lg:py-32 bg-[#0C0E12] text-[#E2E2E6] border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* ── Section eyebrow ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 border-b border-white/10 mb-12"
        >
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A62681] font-semibold">
                Why Choose Us
              </span>
              <motion.span
                variants={lineGrow}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="block h-px w-16 bg-gradient-to-r from-[#A62681] to-transparent"
              />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-serif font-normal">
              Why Clients Trust Us
            </h2>
          </div>
          <p className="text-sm text-[#8E94A0] max-w-xs font-light leading-relaxed shrink-0">
            We build long-term relationships through transparency, craftsmanship, and European engineering standards.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 lg:gap-24 items-start">

          {/* LEFT — Numbered editorial list */}
          <div className="space-y-0 divide-y divide-white/[0.07]">
            {REASONS.map((r, i) => (
              <motion.div
                key={r.num}
                variants={stagger(i * 0.1)}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="group grid grid-cols-[56px_1fr] gap-6 py-9 cursor-default"
              >
                {/* Big index */}
                <span
                  className="font-mono text-4xl font-black leading-none select-none text-[#C77DFF] group-hover:text-[#E4B5FF] transition-colors duration-300 drop-shadow-[0_0_12px_rgba(199,125,255,0.4)]"
                >
                  {r.num}
                </span>

                <div className="flex flex-col gap-2.5">
                  {/* Accent bar — grows on hover */}
                  <div className="relative h-px w-full bg-white/[0.06] overflow-hidden mb-1">
                    <div
                      className="absolute inset-y-0 left-0 w-0 group-hover:w-full transition-all duration-500 ease-out"
                      style={{ background: `linear-gradient(90deg, ${r.accent}, transparent)` }}
                    />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-serif text-white group-hover:text-[#E4B5FF] transition-colors duration-300">
                    {r.title}
                  </h3>
                  <p className="text-sm text-[#8E94A0] leading-relaxed font-light max-w-lg">
                    {r.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT — Stat grid + CTA card */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">

            {/* Stats 2×2 */}
            <div className="grid grid-cols-2 gap-px bg-white/[0.07] border border-white/[0.07]">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "show" : "hidden"}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="bg-[#0C0E12] px-6 py-7 flex flex-col gap-1.5 group hover:bg-[#111317] transition-colors duration-300"
                >
                  <span
                    className="text-3xl lg:text-4xl font-serif font-normal leading-none"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #A62681 0%, #d946ef 60%, #A62681 100%)",
                      backgroundSize: "200% auto",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8E94A0] leading-snug">
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
              className="relative overflow-hidden border border-[#A62681]/30 bg-[#0d0810] px-8 py-9"
            >
              {/* Corner accent */}
              <span
                aria-hidden
                className="absolute top-0 right-0 w-24 h-24 opacity-20"
                style={{
                  background: "radial-gradient(circle at top right, #A62681, transparent 70%)",
                }}
              />

              <h3 className="text-xl font-serif text-white mb-2 leading-snug">
                Ready to Transform Your Space?
              </h3>
              <p className="text-sm text-[#8E94A0] font-light mb-7 leading-relaxed">
                Get a complimentary on-site spatial survey and membrane sample — zero commitment.
              </p>
              <Link
                href="#consultation"
                className="group/btn inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest font-semibold text-[#A62681] hover:text-white transition-colors duration-300"
              >
                <span>Book Free Site Visit</span>
                <span className="inline-flex items-center justify-center w-8 h-8 border border-[#A62681]/40 group-hover/btn:border-[#A62681] group-hover/btn:bg-[#A62681]/10 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                </span>
              </Link>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}


