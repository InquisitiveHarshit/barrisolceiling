"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Berrisol completely altered how we handle lighting in double-height living rooms. The backlit membrane delivered museum-grade diffusion.",
    name: "Rohit Sharma",
    role: "Homeowner",
    location: "Shanti Niketan, Delhi",
    rating: 5,
    scope: "140m² Translucent Ceiling",
  },
  {
    quote: "Their technical installation crew is remarkably disciplined. The ceiling was completed in 36 hours with zero mess on our marble flooring.",
    name: "Ar. Anjali Verma",
    role: "Principal Architect",
    location: "Delhi NCR",
    rating: 5,
    scope: "Multi-Zone Acoustic & Lacquer",
  },
  {
    quote: "The 3D parametric acoustic membrane transformed our boardroom acoustics. Echo was instantly eliminated, and clients constantly compliment it.",
    name: "Vikas Mehra",
    role: "Managing Director",
    location: "Noida Hub",
    rating: 5,
    scope: "3D Acoustic Membrane",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0C0E12] text-zinc-900 dark:text-[#E2E2E6] border-b border-zinc-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-[94rem] mx-auto px-4 sm:px-8">
        
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#111317] rounded-xs flex flex-col justify-between shadow-xl hover:border-[#A62681]/50 transition-colors"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex text-[#A62681] dark:text-[#E4B5FF] mb-5 gap-1">
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
                <span className="font-mono text-xs text-[#A62681] dark:text-[#E4B5FF] font-medium mt-0.5">{t.role} &middot; {t.location}</span>
                <span className="font-mono text-[10px] text-zinc-500 dark:text-[#8E94A0] mt-1">{t.scope}</span>
              </div>
            </motion.blockquote>
          ))}
        </div>

      </div>
    </section>
  );
}
