"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LeadModal from "./LeadModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  // Detect when user scrolls slightly
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Lock body scroll for mobile menu
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else if (!modalOpen) {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, modalOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/service" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blogs", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const openModal = () => {
    setIsOpen(false);
    setModalOpen(true);
  };

  // Hero transparent state: homepage AND not yet scrolled past hero
  const isHeroNav = isHome && !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 h-20 transition-all duration-500 flex ${
          isHeroNav
            ? "bg-transparent pointer-events-none border-b border-transparent"
            : "bg-luminary-white/90 backdrop-blur-md border-b border-outline/10 justify-between items-center px-5 md:px-16"
        }`}
      >
        <AnimatePresence mode="wait">
          {isHeroNav ? (
            <motion.div
              key="hero-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex h-full"
            >
            {/* LEFT 55% on desktop, full width on mobile */}
            <div className="w-full lg:w-[55%] flex items-center justify-between px-5 md:px-16 h-full pointer-events-auto gap-4">
              <Link href="/" className="flex items-center relative z-50 shrink-0 bg-white/90 rounded-xl px-2 py-1 lg:bg-transparent lg:p-0">
                <img
                  alt="Berrisol & Illusion Decors Logo"
                  className="h-14 md:h-16 w-auto object-contain"
                  src="/logo.png"
                />
              </Link>

              {/* Desktop nav links */}
              <ul className="hidden lg:flex space-x-5 xl:space-x-6 items-center font-label-caps text-label-caps">
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.path}
                      className="inline-block text-on-surface-variant hover:text-brand-vibrancy transition-all duration-200 active:scale-95 relative group whitespace-nowrap text-[11px] xl:text-xs"
                    >
                      {item.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-vibrancy group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-white bg-white/20 rounded-lg relative z-50"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
              </button>
            </div>

            {/* RIGHT 45% — desktop only, image shows through */}
            <div className="hidden lg:block w-[45%]" />
            </motion.div>
          ) : (
            <motion.div
              key="standard-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-between items-center h-full"
            >
              {/* STANDARD — white fixed bar */}
              <Link href="/" className="flex items-center relative z-50">
              <img
                alt="Berrisol & Illusion Decors Logo"
                className="h-14 md:h-16 w-auto object-contain"
                src="/logo.png"
              />
            </Link>

            <ul className="hidden lg:flex space-x-8 items-center font-label-caps text-label-caps">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="inline-block text-on-surface-variant hover:text-brand-vibrancy transition-all duration-200 active:scale-95 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-vibrancy group-hover:w-full transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden lg:block">
              <motion.button
                onClick={openModal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97, y: 1 }}
                className="bg-brand-gradient text-luminary-white px-6 py-3 font-label-caps text-label-caps transition-all shadow-sm hover:shadow-md"
              >
                Book a Free Site Visit
              </motion.button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-primary bg-surface-container rounded-lg relative z-50"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#1a1a2e] pt-24 px-5 flex flex-col h-[100dvh]"
          >
            <ul className="flex flex-col gap-6 font-display-md text-2xl text-white mt-8">
              {navLinks.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-white hover:text-brand-vibrancy transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-auto mb-10 w-full"
            >
              <button
                onClick={openModal}
                className="w-full bg-brand-gradient text-luminary-white px-6 py-4 font-label-caps text-label-caps transition-all shadow-sm"
              >
                Book a Free Site Visit
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lead Capture Modal */}
      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
