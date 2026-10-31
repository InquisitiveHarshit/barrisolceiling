"use client";
import Link from "next/link";
import Image from "next/image";

export default function LandingNav() {
  return (
    <header className="w-full bg-white border-b border-black/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">

        {/* Company Brand & Name */}
        <Link href="/" className="flex items-center gap-3.5 group shrink-0">
          <div className="p-1.5 bg-white rounded border border-black/15 shadow-sm flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Berrisol & Illusion Decors Logo"
              width={42}
              height={42}
              className="h-8 sm:h-10 w-auto object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span
              className="text-lg sm:text-xl tracking-[0.16em] text-gray-900 font-semibold uppercase leading-tight group-hover:text-[#A82F9D] transition-colors"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Berrisol
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-[#A82F9D] font-bold">
              &amp; Illusion Decors
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Our Services", href: "/service" },
            { label: "About Us", href: "/about" },
            { label: "Our Blog", href: "/blog" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-[#A82F9D] transition-colors tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="text-sm font-semibold text-white bg-[#A82F9D] hover:bg-[#8f2284] px-5 py-2.5 border border-[#A82F9D] transition-colors shadow-sm hover:shadow"
          >
            Contact Us
        </Link>
      </nav>

      {/* Mobile CTA */}
        <Link
        href="/contact"
        className="md:hidden text-xs font-semibold text-white bg-[#A82F9D] px-3.5 py-2 border border-[#A82F9D]"
      >
        Contact Us
    </Link>
      </div >
    </header >
  );
}
