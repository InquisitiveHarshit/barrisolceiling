"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, CheckCircle2, Shield, Ruler, Sparkles } from "lucide-react";
import { trackPhoneClick } from "@/lib/gtag";

export default function CtaBanner() {
  return (
    <section className="py-12 sm:py-20 bg-[#0C0E12] text-[#E2E2E6] border-b border-white/10 relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div 
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(166,38,129,0.18),rgba(255,255,255,0))]" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="relative rounded-2xl border border-white/15 bg-gradient-to-b from-white/[0.06] to-white/[0.01] backdrop-blur-md p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          
          {/* Subtle decorative glow orb inside container */}
          <div 
            aria-hidden
            className="pointer-events-none absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-[#A62681]/20 blur-[100px]" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E4B5FF] font-semibold block mb-3">
                  Complimentary Consultation &amp; Laser Measurement
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-serif font-normal leading-tight">
                  Get a Free Site Survey for Your Stretch Ceiling
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[#8E94A0] font-light leading-relaxed max-w-xl">
                Invite our senior stretch ceiling engineers for an on-site technical inspection. We review your architectural drawings, demonstrate tactile membrane finishes, and provide an exact line-item quotation with zero obligation.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  { icon: Ruler, text: "Sub-millimetre laser room scan" },
                  { icon: Sparkles, text: "Physical membrane & lighting samples" },
                  { icon: Shield, text: "10-year manufacturer warranty" },
                  { icon: CheckCircle2, text: "Zero hidden charges quotation" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#A62681]/15 border border-[#A62681]/30 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-[#E4B5FF]" />
                      </div>
                      <span className="text-xs sm:text-sm text-[#D8DCE3] font-light">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end">
              <div className="w-full max-w-md p-6 sm:p-8 rounded-xl bg-[#07090E]/80 border border-white/10 shadow-xl space-y-5">
                <div className="space-y-1">
                  <p className="font-mono text-xs text-[#E4B5FF] uppercase tracking-wider font-semibold">
                    Fast Response • Pan-India Coverage
                  </p>
                  <p className="text-xs text-[#8E94A0] font-light">
                    Available for residences, retail showrooms, corporate offices &amp; hospitality.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <Link
                    href="#contact"
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#6A2C91] to-[#A62681] hover:from-[#7B33A6] hover:to-[#B82B90] text-white font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-lg hover:shadow-[#A62681]/25 hover:translate-y-[-1px]"
                  >
                    <span>Schedule Free Survey</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="tel:+919540593079"
                    onClick={() => trackPhoneClick("CtaBanner")}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 border border-white/20 hover:border-white/40 hover:bg-white/5 text-white font-mono text-xs uppercase tracking-widest font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E4B5FF]" />
                    <span>Call +91 9540593079</span>
                  </a>
                </div>

                <p className="text-[11px] text-center text-[#8E94A0] font-mono">
                  Site surveys usually scheduled within 24 to 48 hours.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

