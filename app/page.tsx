import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        {/* Left — Content */}
        <div className="hero-content">
          {/* Eyebrow */}
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-line" aria-hidden="true" />
            <span className="hero-eyebrow-text">Premium Stretch Ceiling</span>
          </div>

          {/* Heading */}
          <h1 className="hero-heading">
            Premium Stretch Ceilings for Modern &amp; Luxury Interiors
          </h1>

          {/* Sub-description */}
          <p className="hero-subtext">
            Transform your space with innovative stretch ceiling solutions
            designed for elegance, durability, and flawless finishes. From
            residential to commercial projects, we bring creativity to every
            ceiling.
          </p>

          {/* Actions */}
          <div className="hero-actions">
            <Link href="/quote" className="hero-btn-primary">
              Get a Free Quote
            </Link>
            <Link href="/projects" className="hero-btn-secondary">
              View Projects
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-value">500+</span>
              <span className="hero-stat-label">Projects Done</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">12+</span>
              <span className="hero-stat-label">Years Experience</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-value">98%</span>
              <span className="hero-stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Right — Wireframe graphic with hero image */}
        <div className="hero-graphic">
          <div className="hero-graphic-container">
            {/* Outer dashed orbit circle */}
            <div className="hero-graphic-orbit" aria-hidden="true" />

            {/* Square container */}
            <div className="hero-graphic-square" aria-hidden="true" />

            {/* Corner accents */}
            <div className="hero-graphic-corner hero-graphic-corner--tl" aria-hidden="true" />
            <div className="hero-graphic-corner hero-graphic-corner--tr" aria-hidden="true" />
            <div className="hero-graphic-corner hero-graphic-corner--bl" aria-hidden="true" />
            <div className="hero-graphic-corner hero-graphic-corner--br" aria-hidden="true" />

            {/* Luminosity-blended image */}
            <div className="hero-graphic-image">
              <Image
                src="/heroimage.webp"
                alt="Premium stretch ceiling installation"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
