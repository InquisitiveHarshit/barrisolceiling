"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0C0E12] py-16 text-[#8E94A0] font-body text-xs">
      <div className="max-w-[94rem] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-14 border-b border-white/10">

          {/* Identity */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-white rounded flex items-center justify-center border border-white/20 shadow-md">
                <img alt="Berrisol Logo" className="h-8 w-auto object-contain" src="/logo.png" />
              </div>
              <span
                className="text-base text-white uppercase tracking-widest"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Berrisol &amp; Illusion Decors
              </span>
            </div>
            <p className="text-[#8E94A0] text-xs leading-relaxed max-w-sm font-light">
              Premier contractor and specifier of European tension membranes, acoustic
              micro-perforation, and architectural stretch ceilings in Delhi, Gurugram,
              Noida, and across Northern India.
            </p>
            <div className="font-mono text-[11px] text-[#A62681] font-medium mt-2">
              10+ Years Practice • 1000+ Executed Projects • 10-Year Warranty
            </div>
          </div>

          {/* Systems */}
          <div className="lg:col-span-3 flex flex-col gap-3 font-mono text-xs">
            <div className="text-white uppercase tracking-widest font-semibold text-xs mb-2">Systems</div>
            {[
              "Translucent Diffuser Ceilings",
              "Acoustic Absorption Membranes",
              "3D Vaults & Parametric Forms",
              "High-Gloss Mirror Lacquer",
              "Fiber-Optic Starry Canopies",
            ].map((s) => (
              <Link key={s} href="/service" className="hover:text-[#E4B5FF] transition-colors">
                {s}
              </Link>
            ))}
          </div>

          {/* Journey */}
          <div className="lg:col-span-2 flex flex-col gap-3 font-mono text-xs">
            <div className="text-white uppercase tracking-widest font-semibold text-xs mb-2">Atelier Journey</div>
            {[
              { label: "Atelier Overview", href: "/" },
              { label: "About Studio",     href: "/about" },
              { label: "Technical Standards", href: "/service" },
              { label: "Project Archive",  href: "/gallery" },
              { label: "Specifier Booking", href: "/contact" },
            ].map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-[#E4B5FF] transition-colors">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 flex flex-col gap-3 font-mono text-xs">
            <div className="text-white uppercase tracking-widest font-semibold text-xs mb-2">Atelier &amp; Works</div>
            <p className="text-[#D8DCE3]">C-46 2nd Floor, DDA Sheds, Okhla Phase 1, New Delhi 110020</p>
            <p>
              Direct:{" "}
              <a href="tel:+919540593079" className="text-[#A62681] hover:text-white transition-colors">
                +91 9540593079
              </a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:info@barrisolceiling.com" className="text-[#A62681] hover:text-white transition-colors">
                info@barrisolceiling.com
              </a>
            </p>
            <div className="flex gap-3 mt-4 flex-wrap">
              {[
                { label: "Instagram", href: "https://www.instagram.com/berrisol_illusion_official" },
                { label: "LinkedIn",  href: "https://www.linkedin.com/company/berrisol-illusion-decors/" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className="font-mono text-[10px] text-[#D8DCE3] border border-white/15 px-3 py-1.5 hover:border-[#A62681] hover:text-[#E4B5FF] transition-colors rounded-xs"
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#8E94A0]">
          <div>© {new Date().getFullYear()} Berrisol &amp; Illusion Decors. All rights reserved.</div>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <span>BS EN 14716 Compliant</span>
            <span>•</span>
            <span>DIN 4102-B1 Fire Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
