"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-primary w-full pt-20 pb-10 px-5 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-luminary-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src="/logo.png" alt="Berrisol & Illusion Decors" className="h-10 w-auto mb-4 object-contain" />
            <p className="font-body-md text-sm text-secondary-fixed-dim leading-relaxed">
              Premium stretch ceiling and false ceiling contractors in Delhi,
              delivering modern designs with European-grade materials.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-label-caps text-label-caps text-luminary-white mb-5">
              Services
            </h4>
            <ul className="space-y-3 font-body-md text-sm">
              {["Stretch Ceiling Lights", "3D Ceilings", "Acoustic Solutions", "Custom Designs"].map((s) => (
                <li key={s}>
                  <a className="text-secondary-fixed-dim hover:text-luminary-white transition-colors" href="#">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-label-caps text-label-caps text-luminary-white mb-5">
              Company
            </h4>
            <ul className="space-y-3 font-body-md text-sm">
              {["About Us", "Our Gallery", "Blog", "Privacy Policy", "Terms of Service"].map((s) => (
                <li key={s}>
                  <a className="text-secondary-fixed-dim hover:text-luminary-white transition-colors" href="#">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-label-caps text-label-caps text-luminary-white mb-5">
              Contact
            </h4>
            <address className="not-italic font-body-md text-sm text-secondary-fixed-dim space-y-3">
              <p>C-46 2nd Floor, DDA Sheds<br />Okhla Phase 1, New Delhi 110020</p>
              <a className="hover:text-luminary-white transition-colors block" href="tel:+919540593079">
                +91 9540593079
              </a>
              <a className="hover:text-luminary-white transition-colors block" href="mailto:info@barrisolceiling.com">
                info@barrisolceiling.com
              </a>
            </address>
            <div className="flex gap-3 mt-6">
              {[
                { label: "Instagram", href: "https://www.instagram.com/berrisol_illusion_official" },
                { label: "LinkedIn", href: "https://www.linkedin.com/company/berrisol-illusion-decors/" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", duration: 0.15, bounce: 0 }}
                  className="font-label-caps text-label-caps text-[10px] text-secondary-fixed-dim border border-luminary-white/10 px-3 py-1.5 hover:border-brand-vibrancy hover:text-brand-vibrancy transition-colors"
                >
                  {social.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label-caps text-label-caps text-[10px] text-on-secondary-container">
            &copy; {new Date().getFullYear()} Berrisol &amp; Illusion Decors. All rights reserved.
          </p>
          <p className="font-label-caps text-label-caps text-[10px] text-on-secondary-container">
            Premium Stretch Ceilings - Delhi, India
          </p>
        </div>
      </div>
    </footer>
  );
}
