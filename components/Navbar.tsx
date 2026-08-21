"use client";

import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-inner">
        {/* Logo */}
        <Link href="/" className="navbar-logo-box" aria-label="Home">
          <Image
            src="/logo.png"
            alt="Borocelling Logo"
            width={64}
            height={64}
            className="navbar-logo-img"
          />
        </Link>

        {/* Nav Links */}
        <nav className="navbar-links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className="navbar-link">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="navbar-cta">
          <Link href="/contact" className="btn-ghost">
            Contact Us
          </Link>
          <Link href="/quote" className="btn-solid">
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
