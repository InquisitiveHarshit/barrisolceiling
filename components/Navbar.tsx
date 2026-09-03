"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import LeadModal from "./LeadModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll for mobile menu / modal
  useEffect(() => {
    document.body.style.overflow = isOpen || modalOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen, modalOpen]);

  const navLinks = [
    { name: "Home",     path: "/" },
    { name: "About",    path: "/about" },
    { name: "Services", path: "/service" },
    { name: "Gallery",  path: "/gallery" },
    { name: "Blogs",    path: "/blog" },
    { name: "Contact",  path: "/contact" },
  ];

  const openModal = () => {
    setIsOpen(false);
    setModalOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#0C0E12]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[94rem] mx-auto px-4 sm:px-8 h-20 sm:h-24 flex items-center justify-between gap-4">

          {/* Logo & brand */}
          <Link className="flex items-center gap-3 group shrink-0" href="/">
            <div className="p-1.5 bg-white rounded flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(123,44,191,0.2)]">
              <img
                alt="Berrisol & Illusion Decors Logo"
                className="h-8 sm:h-10 w-auto object-contain"
                src="/logo.png"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span
                className="text-lg sm:text-xl tracking-[0.18em] text-white font-medium uppercase leading-tight group-hover:text-[#A62681] transition-colors"
                style={{ fontFamily: "Cinzel, serif" }}
              >
                Berrisol
              </span>
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#A62681] font-semibold">
                &amp; Illusion Decors
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-mono text-xs uppercase tracking-[0.15em] text-[#8E94A0]">
            {navLinks.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={
                    isActive
                      ? "text-white border-b-2 border-[#A62681] pb-1 font-semibold"
                      : "hover:text-[#E4B5FF] transition-colors"
                  }
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={openModal}
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#6A2C91] to-[#A62681] hover:from-[#7B2CBF] hover:to-[#B52C94] text-white text-xs uppercase tracking-[0.15em] font-semibold transition-all shadow-[0_0_18px_rgba(166,38,129,0.4)] hover:shadow-[0_0_24px_rgba(157,78,221,0.6)] rounded-xs whitespace-nowrap"
            >
              <span>Book Site Survey</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white bg-white/10 rounded-lg relative z-50"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0C0E12] pt-20 px-6 flex flex-col h-[100dvh] overflow-y-auto"
          >
            <ul className="flex flex-col gap-5 font-mono text-lg uppercase tracking-widest text-[#8E94A0] mt-6">
              {navLinks.map((item, i) => {
                const isActive = pathname === item.path;
                return (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                  >
                    <Link
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 border-b border-white/5 transition-colors ${
                        isActive
                          ? "text-white font-bold border-[#A62681]/40"
                          : "hover:text-[#E4B5FF]"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-auto mb-10 w-full pt-6"
            >
              <button
                onClick={openModal}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#6A2C91] to-[#A62681] text-white px-6 py-4 font-mono text-sm uppercase tracking-[0.15em] font-semibold shadow-[0_0_18px_rgba(166,38,129,0.4)] rounded-xs"
              >
                <span>Book Site Survey</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
