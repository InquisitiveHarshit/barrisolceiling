"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Phone, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroImage {
  _id: string;
  url: string;
  title?: string;
  location?: string;
}

const FALLBACK: HeroImage[] = [];

export default function Hero() {
  const [images, setImages]     = useState<HeroImage[]>(FALLBACK);
  const [current, setCurrent]   = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Fetch hero-selected images from admin ── */
  useEffect(() => {
    fetch("/api/gallery/hero")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.images?.length > 0) {
          setImages(d.images);
        }
        // if nothing is marked for hero, keep the FALLBACK local images
      })
      .catch(() => {});
  }, []);

  /* ── Auto-scroll every 4s, pause on hover ── */
  useEffect(() => {
    if (images.length <= 1) return;
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % images.length);
      }, 4000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [images.length, isHovered]);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const img = images[current];

  return (
    <section
      id="overview"
      className="relative min-h-[92dvh] flex items-center bg-[#0C0E12] text-[#E2E2E6] overflow-hidden border-b border-white/10 pt-20 pb-16 lg:py-0"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(120,120,120,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(120,120,120,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#7B2CBF]/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#A62681]/15 rounded-full blur-[128px] pointer-events-none" />

      <div className="relative z-10 max-w-[94rem] w-full mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Copy ── */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#E4B5FF] font-mono w-fit mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#A62681] animate-pulse" />
              <span>Architectural Tension Membrane Atelier • Delhi NCR</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.1] tracking-tight mb-6 font-serif">
              Bespoke Stretch Ceilings &amp; Architectural Lighting
            </h1>

            <p className="text-base sm:text-lg text-[#8E94A0] leading-relaxed max-w-xl font-light mb-8">
              Crafting monolithic, shadowless light fields and acoustic stretch
              membranes for luxury residences and commercial spaces across Delhi NCR.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="#consultation"
                className="px-6 sm:px-7 py-3.5 bg-gradient-to-r from-[#6A2C91] to-[#A62681] hover:from-[#7B2CBF] hover:to-[#B52C94] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all flex items-center gap-2.5 shadow-[0_0_24px_rgba(166,38,129,0.35)] hover:shadow-[0_0_32px_rgba(157,78,221,0.5)] rounded-xs"
              >
                <span>Commission Site Survey</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919540593079"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-7 py-3.5 border border-white/15 hover:border-[#9D4EDD] bg-white/[0.03] text-[#D8DCE3] hover:text-white text-xs uppercase tracking-[0.18em] font-mono transition-all flex items-center gap-2 rounded-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#9D4EDD]" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-white/10 font-mono">
              <div>
                <div className="text-2xl sm:text-3xl text-white font-light">10+</div>
                <div className="text-[10px] uppercase tracking-wider text-[#8E94A0] mt-1">Years Practice</div>
              </div>
              <div className="border-l border-white/10 pl-4 sm:pl-6">
                <div className="text-2xl sm:text-3xl text-white font-light">1000+</div>
                <div className="text-[10px] uppercase tracking-wider text-[#8E94A0] mt-1">Installations</div>
              </div>
              <div className="border-l border-white/10 pl-4 sm:pl-6">
                <div className="text-2xl sm:text-3xl text-white font-light">100%</div>
                <div className="text-[10px] uppercase tracking-wider text-[#8E94A0] mt-1">Flatness</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Auto-scroll carousel ── */}
          <div className="lg:col-span-6">
            <div
              className="relative border border-white/15 bg-[#111317] p-2 sm:p-3 shadow-2xl rounded-xs"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Image frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0C0E12] rounded-xs">
                {images.map((im, i) => (
                  <img
                    key={im._id}
                    src={im.url}
                    alt={im.title || "Stretch ceiling project"}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 brightness-95"
                    style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
                  />
                ))}

                {/* Image counter */}
                <div className="absolute top-4 left-4 z-10 bg-[#0C0E12]/80 backdrop-blur px-2.5 py-1 font-mono text-[10px] text-[#8E94A0] border border-white/10">
                  {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </div>

                {/* Location tag */}
                {img.location && (
                  <div className="absolute bottom-4 left-4 z-10 bg-[#0C0E12]/85 backdrop-blur border border-white/15 px-3 py-1.5 flex items-center gap-2 font-mono text-[10px] text-[#D8DCE3]">
                    <span className="w-2 h-2 rounded-full bg-[#A62681] animate-ping" />
                    <span>{img.location}</span>
                  </div>
                )}

                {/* Prev / Next arrows — show only if >1 image */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-[#0C0E12]/70 border border-white/15 hover:border-[#A62681] hover:bg-[#A62681]/20 transition-all backdrop-blur"
                    >
                      <ChevronLeft className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={next}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-[#0C0E12]/70 border border-white/15 hover:border-[#A62681] hover:bg-[#A62681]/20 transition-all backdrop-blur"
                    >
                      <ChevronRight className="w-4 h-4 text-white" />
                    </button>
                  </>
                )}
              </div>

              {/* Dot indicators + title row */}
              <div className="mt-3 px-1 flex items-center justify-between gap-4">
                {/* Title */}
                <p className="font-mono text-[11px] text-[#8E94A0] truncate">
                  {img.title || "Gallery Image"}
                </p>

                {/* Dots */}
                {images.length > 1 && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to image ${i + 1}`}
                        className="transition-all duration-300"
                        style={{
                          width: i === current ? "20px" : "6px",
                          height: "6px",
                          borderRadius: "3px",
                          background: i === current ? "#A62681" : "rgba(255,255,255,0.2)",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Progress bar */}
              {images.length > 1 && (
                <div className="mt-2 h-px bg-white/5 overflow-hidden rounded-full">
                  <div
                    key={current}
                    className="h-full bg-gradient-to-r from-[#6A2C91] to-[#A62681]"
                    style={{
                      animation: isHovered ? "none" : "hero-progress 4s linear forwards",
                      width: isHovered ? `${((current + 1) / images.length) * 100}%` : undefined,
                    }}
                  />
                </div>
              )}

              <style>{`
                @keyframes hero-progress {
                  from { width: 0% }
                  to   { width: 100% }
                }
              `}</style>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
