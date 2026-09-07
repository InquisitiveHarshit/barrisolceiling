"use client";
import React, { useRef } from "react";
import { motion, useInView, useAnimationFrame, useMotionValue } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Berrisol ceiling transformed our living room. Elegant and premium finish!",
    name: "Rohit Sharma",
    location: "Delhi",
    rating: 5,
    scope: "Living Room Stretch Ceiling",
  },
  {
    quote: "Quick installation and top-notch quality. Totally worth it!",
    name: "Anjali Verma",
    location: "Lucknow",
    rating: 4,
    scope: "Interior Stretch Ceiling",
  },
  {
    quote: "Loved the glossy look! Berrisol stretch ceiling made my home shine.",
    name: "Mohit Singh",
    location: "Patna",
    rating: 5,
    scope: "Glossy Mirror Lacquer",
  },
  {
    quote: "Excellent service and finishing. Highly recommend Berrisol ceilings!",
    name: "Sneha Rathi",
    location: "Jaipur",
    rating: 4,
    scope: "Residential Ceiling Solution",
  },
  {
    quote: "The stretch ceiling design added a modern touch to our office. Loved it!",
    name: "Vikas Mehra",
    location: "Noida",
    rating: 5,
    scope: "Commercial Office Lighting",
  },
  {
    quote: "Team was professional and quick. The ceiling looks amazing at night with lighting.",
    name: "Pooja Thakur",
    location: "Chandigarh",
    rating: 5,
    scope: "Backlit Translucent Ceiling",
  },
];

/* Double array for infinite linear track */
const TRACK = [...testimonials, ...testimonials];

function LinearTestimonialTicker() {
  const x = useMotionValue(0);
  const SPEED = 30; // px/s
  const ITEM_W = 384; // 360px card + 24px gap
  const TOTAL = testimonials.length * ITEM_W;
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    x.set((x.get() - (SPEED * delta) / 1000) % -TOTAL);
  });

  return (
    <div
      className="relative overflow-hidden py-4"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* Soft gradient fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-slate-50 dark:from-[#0C0E12] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-slate-50 dark:from-[#0C0E12] to-transparent" />

      <motion.div
        style={{ x }}
        className="flex gap-6 will-change-transform items-stretch"
      >
        {TRACK.map((t, i) => (
          <div
            key={i}
            className="w-[360px] sm:w-[380px] flex-shrink-0 p-7 border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#111317] rounded-xs flex flex-col justify-between shadow-xl hover:border-[#A62681]/50 transition-colors cursor-default"
          >
            <div>
              {/* Rating Stars */}
              <div className="flex text-[#A62681] dark:text-[#E4B5FF] mb-4 gap-1">
                {Array.from({ length: 5 }, (_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className={idx < Math.floor(t.rating) ? "fill-[#A62681] dark:fill-[#E4B5FF] text-[#A62681] dark:text-[#E4B5FF]" : "text-zinc-300 dark:text-white/20"}
                  />
                ))}
              </div>

              <p className="text-sm text-zinc-700 dark:text-[#D8DCE3] italic font-light leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="border-t border-zinc-200 dark:border-white/10 pt-4 flex flex-col">
              <span className="font-semibold text-zinc-900 dark:text-white text-sm">{t.name}</span>
              <span className="font-mono text-xs text-[#A62681] dark:text-[#E4B5FF] font-medium mt-0.5">{t.location}</span>
              <span className="font-mono text-[10px] text-zinc-500 dark:text-[#8E94A0] mt-1">{t.scope}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 bg-slate-50 dark:bg-[#0C0E12] text-zinc-900 dark:text-[#E2E2E6] border-b border-zinc-200 dark:border-white/10 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Split Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 pb-8 border-b border-zinc-200 dark:border-white/10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A62681] dark:text-[#E4B5FF] font-semibold block mb-3">
              Architectural Dialogue
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-zinc-900 dark:text-white font-serif font-normal">
              Endorsements &amp; Testimonials
            </h2>
          </div>
          <p className="text-sm text-zinc-600 dark:text-[#8E94A0] max-w-xs font-light">
            Trusted by homeowners, principal architects, and corporate enterprises across Northern India.
          </p>
        </div>
      </div>

      {/* Linear Continuous Motion Ticker */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <LinearTestimonialTicker />
      </motion.div>
    </section>
  );
}
