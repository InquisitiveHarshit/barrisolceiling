"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { trackPhoneClick } from "@/lib/gtag";

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

export default function LandingFooter() {
  const [services, setServices] = useState<{ title: string; slug: string }[]>([]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setServices(
            d.data.slice(0, 5).map((s: any) => ({ title: s.title, slug: s.slug }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="border-t border-black/10 bg-white py-16 text-gray-600 font-body text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-14 border-b border-black/10">

          {/* Identity */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-removebg-preview.png"
                alt="Barrisol Stretch Ceilings"
                width={130}
                height={42}
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-sm">
              Premier manufacturer and installer of European tension membranes, acoustic micro-perforation, and architectural stretch ceilings, serving clients Pan India.
            </p>
            <div className="font-mono text-[11px] text-[#A82F9D] font-medium mt-2">
              10+ Years Practice • 1000+ Executed Projects • 10-Year Warranty
            </div>
          </div>

          {/* Systems */}
          <div className="lg:col-span-3 flex flex-col gap-3 font-mono text-xs">
            <div className="text-gray-900 uppercase tracking-widest font-semibold text-xs mb-2">Systems</div>
            {services.length > 0
              ? services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/service-detail/${s.slug}`}
                  className="hover:text-[#A82F9D] transition-colors"
                >
                  {s.title}
                </Link>
              ))
              : Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="h-3 w-40 bg-gray-100 rounded animate-pulse" />
              ))}
            <Link
              href="/service"
              className="hover:text-[#A82F9D] transition-colors text-gray-400 mt-1"
            >
              View All Services →
            </Link>
          </div>

          {/* Contact & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-3 font-mono text-xs">
            <div className="text-gray-900 uppercase tracking-widest font-semibold text-xs mb-2">Reach the Studio</div>
            <p className="text-gray-700">C-46 2nd Floor, DDA Sheds, Okhla Phase 1, New Delhi 110020</p>
            <p>
              Direct:{" "}
              <a
                href="tel:+919540593079"
                onClick={() => trackPhoneClick("LandingFooter")}
                className="text-[#A82F9D] hover:text-gray-900 transition-colors font-semibold"
              >
                +91 9540593079
              </a>
            </p>
            <p>
              Email:{" "}
              <a href="mailto:info@barrisolceiling.com" className="text-[#A82F9D] hover:text-gray-900 transition-colors font-semibold">
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
                    className="flex items-center gap-2 font-mono text-xs text-gray-700 border border-black/15 px-3 py-2 hover:border-[#A82F9D] hover:text-[#A82F9D] hover:bg-[#A82F9D]/5 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 text-[#A82F9D]" />
                    <span>{s.label}</span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-gray-400">
          <div>© {new Date().getFullYear()} Berrisol &amp; Illusion Decors. All rights reserved.</div>
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <Link href="/privacypolicy" className="hover:text-[#A82F9D] transition-colors">Privacy Policy</Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/termscondition" className="hover:text-[#A82F9D] transition-colors">Terms &amp; Conditions</Link>
            <span className="hidden sm:inline">•</span>
            <span>BS EN 14716 Compliant</span>
            <span className="hidden sm:inline">•</span>
            <span>DIN 4102-B1 Fire Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

