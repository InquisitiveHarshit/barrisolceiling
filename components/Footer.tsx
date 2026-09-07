"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0C0E12] py-16 text-[#8E94A0] font-body text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
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

          {/* Contact & Socials */}
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
            <div className="flex items-center gap-2.5 mt-4 flex-wrap">
              {[
                {
                  label: "Instagram",
                  href: "https://www.instagram.com/berrisol_illusion_official?igsh=MXh6aXU2dXh1YTZnZA%3D%3D",
                  icon: InstagramIcon,
                },
                {
                  label: "Facebook",
                  href: "https://www.facebook.com/people/Illusion-Decors/100082809297514/?mibextid=wwXIfr&rdid=nVXTuPsmdZf2MvCf&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1PdZy24Daa%2F%3Fmibextid%3DwwXIfr",
                  icon: FacebookIcon,
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/berrisol-illusion-decors/",
                  icon: LinkedinIcon,
                },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 font-mono text-xs text-[#D8DCE3] border border-white/15 px-3 py-2 hover:border-[#A62681] hover:text-[#E4B5FF] hover:bg-[#A62681]/10 transition-all duration-300 rounded-xs"
                  >
                    <Icon className="w-4 h-4 text-[#A62681]" />
                    <span>{s.label}</span>
                  </motion.a>
                );
              })}
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
