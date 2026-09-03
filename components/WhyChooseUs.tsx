"use client";
import React from "react";
import { Shield, PenTool, Layers, Tags, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const trustItems = [
  { icon: Award, title: "10+ Years Experience", desc: "A decade of delivering flawless stretch ceiling installations across Delhi NCR." },
  { icon: PenTool, title: "Custom Design", desc: "Every project is designed from scratch to match your vision and space perfectly." },
  { icon: Layers, title: "Advanced Materials", desc: "We use premium European PVC and fabric — durable, waterproof, and stunning." },
  { icon: Tags, title: "Competitive Pricing", desc: "High-end results without the premium price tag. Transparent quotes, no surprises." },
  { icon: Clock, title: "Timely Delivery", desc: "We respect your schedule. Projects delivered on time, every time." },
  { icon: Shield, title: "1000+ Installations", desc: "Proven reliability across residential, commercial, and hospitality projects." },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white dark:bg-[#0C0E12] text-zinc-900 dark:text-[#E2E2E6] border-b border-zinc-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-[94rem] mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-200 dark:border-white/10 mb-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A62681] dark:text-[#E4B5FF] font-semibold block mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-zinc-900 dark:text-white font-serif font-normal">
              Why Clients Trust Us
            </h2>
          </div>
          <p className="text-sm text-zinc-600 dark:text-[#8E94A0] max-w-md font-light leading-relaxed">
            We believe in building long-term relationships through transparency, craftsmanship, and European engineering standard work.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-zinc-50 dark:bg-[#111317] border border-zinc-200 dark:border-white/10 rounded-xs p-8 hover:border-[#A62681]/60 dark:hover:border-[#6A2C91]/60 transition-colors shadow-lg"
              >
                <div className="w-11 h-11 bg-[#A62681]/10 dark:bg-[#A62681]/20 rounded-xs flex items-center justify-center mb-6 text-[#A62681] dark:text-[#E4B5FF] group-hover:bg-[#A62681] group-hover:text-white transition-colors">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl text-zinc-900 dark:text-white font-serif mb-3 group-hover:text-[#A62681] dark:group-hover:text-[#E4B5FF] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-[#8E94A0] leading-relaxed font-light">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 bg-gradient-to-r from-[#6A2C91] to-[#A62681] text-white rounded-xs px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-2xl text-white font-serif mb-2">Ready to Transform Your Space?</h3>
            <p className="text-white/80 text-sm font-light">Get an on-site spatial survey and membrane sample audit — no commitment required.</p>
          </div>
          <Link
            href="#consultation"
            className="shrink-0 inline-block bg-white text-zinc-900 px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] font-semibold hover:bg-zinc-100 transition-colors rounded-xs shadow-lg"
          >
            Book Free Site Visit
          </Link>
        </div>

      </div>
    </section>
  );
}
