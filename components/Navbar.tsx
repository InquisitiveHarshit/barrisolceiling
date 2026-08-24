"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 md:px-16 h-20 bg-luminary-white/90 backdrop-blur-md border-b border-outline/10"
    >
      <div className="flex items-center gap-3">
        <img
          alt="Berrisol & Illusion Decors Logo"
          className="h-10 w-auto object-contain"
          src="/logo.png"
        />
        <span className="font-headline-md text-lg tracking-tight text-primary hidden lg:block font-semibold">
          BERRISOL & ILLUSION
        </span>
      </div>

      <ul className="hidden md:flex space-x-8 items-center font-label-caps text-label-caps">
        {[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Services", path: "/services" },
          { name: "Gallery", path: "/gallery" },
          { name: "Blogs", path: "/blogs" },
          { name: "Contact", path: "/contact" }
        ].map((item) => (
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

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97, y: 1 }}
        className="bg-brand-gradient text-luminary-white px-6 py-3 font-label-caps text-label-caps transition-all shadow-sm hover:shadow-md"
      >
        Book a Free Site Visit
      </motion.button>
    </motion.nav>
  );
}
