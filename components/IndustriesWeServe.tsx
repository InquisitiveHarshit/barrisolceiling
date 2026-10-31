"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Home,
    Hotel,
    Building2,
    ShoppingBag,
    ShieldCheck,
    Film,
  UtensilsCrossed,
    School,
    Dumbbell,
    Landmark,
  } from "lucide-react";

const INDUSTRIES = [
  { icon: Home, label: "Luxury Residences" },
  { icon: Hotel, label: "Hotels & Resorts" },
  { icon: Building2, label: "Corporate Offices" },
  { icon: ShoppingBag, label: "Retail & Showrooms" },
  { icon: ShieldCheck, label: "Healthcare & Clinics" },
  { icon: Film, label: "Cinemas & Auditoriums" },
  { icon: UtensilsCrossed, label: "Restaurants & Cafes" },
  { icon: School, label: "Schools & Institutes" },
  { icon: Dumbbell, label: "Gyms & Wellness" },
  { icon: Landmark, label: "Banks & Institutions" },
];

export default function IndustriesWeServe() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="industries"
      className="py-10 sm:py-20 lg:py-24 bg-[#07090E] text-[#E2E2E6] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

          {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 sm:pb-12 border-b border-white/10 mb-12">
              <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A62681] font-semibold block mb-3">
                    Sectors &amp; Applications
                  </span>
                    <h2 className="text-3xl sm:text-4xl text-white font-serif font-normal">
                      Industries We Serve
                    </h2>
                  </div>
                    <p className="text-sm text-[#8E94A0] max-w-sm font-light leading-relaxed">
                      Delivering precision stretch ceiling solutions across every sector — residential to commercial.
                    </p>
                  </div>

                    {/* Icon Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 divide-x divide-y divide-white/10 border border-white/10">
                      {INDUSTRIES.map((ind, idx) => {
                        const Icon = ind.icon;
                        const isActive = active === idx;
                        return (
                          <motion.div
                            key={ind.label}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.04 }}
                            onMouseEnter={() => setActive(idx)}
                            onMouseLeave={() => setActive(null)}
                            className={`group flex flex-col items-center justify-center gap-4 py-10 px-6 cursor-default transition-all duration-200 ${isActive
                                ? "bg-[#A62681]/10 border-[#A62681]"
                                : "bg-transparent hover:bg-white/[0.02]"
                              }`}
                            style={
                              isActive
                                ? { boxShadow: "inset 0 0 0 1px #A62681" }
                                : undefined
                            }
                          >
                            <Icon
                              className={`w-8 h-8 transition-colors duration-200 ${isActive ? "text-[#E4B5FF]" : "text-[#8E94A0] group-hover:text-[#C77DFF]"
                                }`}
                              strokeWidth={1.5}
                            />
                            <span
                              className={`font-mono text-[11px] uppercase tracking-[0.18em] text-center leading-tight transition-colors duration-200 ${isActive ? "text-[#E4B5FF] font-semibold" : "text-[#8E94A0] group-hover:text-white"
                                }`}
                            >
                              {ind.label}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>

                  </div>
                </section>
                );
}
