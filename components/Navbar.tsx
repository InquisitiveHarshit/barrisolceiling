"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import LeadModal from "./LeadModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Lock body scroll for mobile menu (modal handles its own lock)
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
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" }
  ];

  const openModal = () => {
    setIsOpen(false);          // close mobile menu if open
    setModalOpen(true);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 md:px-16 h-20 bg-luminary-white/90 backdrop-blur-md border-b border-outline/10"
      >
        <Link href="/" className="flex items-center gap-3 relative z-50">
          <img
            alt="Berrisol & Illusion Decors Logo"
            className="h-12 md:h-14 w-auto object-contain"
            src="/logo.png"
          />
          <span className="font-headline-md text-lg md:text-xl tracking-tight text-primary font-semibold">
            BERRISOL &amp; ILLUSION
          </span>
        </Link>

        {/* Desktop Nav */}
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

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-primary relative z-50"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-luminary-white pt-24 px-5 flex flex-col h-[100dvh]"
          >
            <ul className="flex flex-col gap-6 font-display-md text-2xl text-primary mt-8">
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
                    className="block py-2"
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
