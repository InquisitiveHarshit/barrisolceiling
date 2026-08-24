"use client";
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
    <section className="py-section-gap px-5 md:px-16 max-w-container-max mx-auto">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 items-end mb-16">
        <div>
          <p className="font-label-caps text-label-caps text-brand-vibrancy mb-4">Why Choose Us</p>
          <h2 className="font-headline-lg text-4xl md:text-5xl text-[#202124] leading-tight">
            Why Clients Trust Us
          </h2>
        </div>
        <p className="font-body-lg text-on-surface-variant text-lg leading-relaxed lg:max-w-xl">
          We believe in building long-term relationships through transparency, craftsmanship, and quality work. Here's what sets us apart.
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trustItems.map((item, i) => (
          <motion.div
            key={i}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", duration: 0.15, bounce: 0 }}
            className="group bg-luminary-white border border-outline/10 rounded-2xl p-8 hover:shadow-xl transition-shadow duration-300 cursor-default"
          >
            <div className="w-11 h-11 bg-brand-vibrancy/10 rounded-xl flex items-center justify-center mb-6 text-brand-vibrancy group-hover:bg-brand-vibrancy group-hover:text-luminary-white transition-all duration-300">
              <item.icon size={22} />
            </div>
            <h3 className="font-headline-md text-xl text-[#202124] mb-3">{item.title}</h3>
            <p className="font-body-md text-on-surface-variant text-[15px] leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA strip */}
      <div className="mt-14 bg-[#202124] rounded-2xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-headline-md text-2xl text-luminary-white mb-1">Ready to Transform Your Space?</h3>
          <p className="font-body-md text-luminary-white/60 text-sm">Get a free site visit and consultation — no commitment required.</p>
        </div>
        <motion.div
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", duration: 0.15, bounce: 0 }}
          className="shrink-0"
        >
          <Link
            href="/contact"
            className="inline-block bg-luminary-white text-[#202124] px-8 py-4 rounded-full font-label-caps text-label-caps whitespace-nowrap"
          >
            Book Free Site Visit
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
