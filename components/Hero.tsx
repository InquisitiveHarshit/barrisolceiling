"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/gtag";

interface HeroImage {
  _id: string;
  url: string;
  title?: string;
  location?: string;
  material?: string;
  materialSpec?: string;
  lightingCCT?: string;
  lightingDimming?: string;
  photometrics?: string;
  warranty?: string;
}

const DEFAULT_FALLBACK_IMAGES: HeroImage[] = [
  { _id: "fallback-1", url: "/hero-stretch-ceiling.jpg", title: "Luxury Translucent Stretch Ceiling", location: "India" },
  { _id: "fallback-2", url: "/heroimage.webp", title: "Modern Backlit Tension Membrane", location: "India" },
];

function HeroSkeleton() {
  return (
    <div className="relative border border-white/15 bg-[#111317] shadow-2xl rounded-xs animate-pulse">
      <div className="p-2 sm:p-3 pb-0">
        <div className="relative aspect-[4/3] w-full bg-[#1A1D26] rounded-xs flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#A62681] animate-spin" />
        </div>
      </div>
      <div className="border-t border-white/10 bg-[#0C0E12] p-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="h-10 bg-white/5 rounded-xs" />
          <div className="h-10 bg-white/5 rounded-xs" />
          <div className="h-10 bg-white/5 rounded-xs" />
          <div className="h-10 bg-white/5 rounded-xs" />
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [images, setImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Fetch hero-selected images from admin ── */
  useEffect(() => {
    fetch("/api/gallery/hero")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.images?.length > 0) {
          setImages(d.images);
        } else {
          setImages(DEFAULT_FALLBACK_IMAGES);
        }
      })
      .catch(() => {
        setImages(DEFAULT_FALLBACK_IMAGES);
      })
      .finally(() => {
        setLoading(false);
      });
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

  const img = images[current] ?? null;

  return (
    <section
      id="overview"
      className="relative min-h-[92dvh] flex items-center bg-[#0C0E12] text-[#E2E2E6] overflow-hidden border-b border-white/10 pt-14 pb-10 lg:py-0"
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

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ── LEFT: Copy ── */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#E4B5FF] font-mono w-fit mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#A62681] animate-pulse" />
              <span>Architectural Tension Membrane Atelier • India</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.1] tracking-tight mb-6 font-serif">
              Bespoke Stretch Ceilings &amp; Architectural Lighting
            </h1>

            <p className="text-base sm:text-lg text-[#8E94A0] leading-relaxed max-w-xl font-light mb-8">
              Crafting monolithic, shadowless light fields and acoustic stretch
              membranes for luxury residences and commercial spaces across India.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/contact"
                className="px-6 sm:px-7 py-3.5 bg-gradient-to-r from-[#6A2C91] to-[#A62681] hover:from-[#7B2CBF] hover:to-[#B52C94] text-white text-xs uppercase tracking-[0.18em] font-semibold transition-all flex items-center gap-2.5 shadow-[0_0_24px_rgba(166,38,129,0.35)] hover:shadow-[0_0_32px_rgba(157,78,221,0.5)] rounded-xs"
              >
                <span>Commission Site Survey</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919540593079"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("Hero WhatsApp Inquiry")}
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
            {loading ? (
              <HeroSkeleton />
            ) : img && (
              <div
                className="relative border border-white/15 bg-[#111317] shadow-2xl rounded-xs"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Image frame */}
                <div className="p-2 sm:p-3 pb-0">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0C0E12] rounded-xs" style={{ width: "calc(100% - 0px)" }}>
                    {images.map((im, i) => (
                      <img
                        key={im._id}
                        src={im.url}
                        alt={im.title || "Stretch ceiling project"}
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "low"}
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
                  </div>{/* end image frame */}
                </div>{/* end padding wrapper */}

                {/* ── Spec row ── */}
                <div className="mt-0 border-t border-white/[0.08] bg-gradient-to-b from-[#0e1015] to-[#0C0E12]">
                  <div className="grid grid-cols-2 sm:grid-cols-4">
                    {/* Project */}
                    <div className="px-4 py-4 border-r border-white/[0.07]">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7A8394] mb-2">Project</p>
                      <p className="font-mono text-[12px] font-semibold text-white leading-snug line-clamp-1">{img.title || "—"}</p>
                      <p className="font-mono text-[10px] text-[#5A6475] mt-1 uppercase tracking-wide line-clamp-1">{img.location || "—"}</p>
                    </div>
                    {/* Material */}
                    <div className="px-4 py-4 border-r border-white/[0.07]">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7A8394] mb-2">Material</p>
                      <p className="font-mono text-[12px] font-semibold text-white leading-snug line-clamp-1">{img.material || "—"}</p>
                      <p className="font-mono text-[10px] text-[#5A6475] mt-1 uppercase tracking-wide line-clamp-1">{img.materialSpec || "—"}</p>
                    </div>
                    {/* Lighting CCT */}
                    <div className="px-4 py-4 border-r border-white/[0.07] border-t border-t-white/[0.07] sm:border-t-0">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7A8394] mb-2">Lighting CCT</p>
                      <p className="font-mono text-[12px] font-semibold text-white leading-snug">{img.lightingCCT || "—"}</p>
                      <p className="font-mono text-[10px] text-[#5A6475] mt-1 uppercase tracking-wide opacity-0 select-none">·</p>
                    </div>
                    {/* Warranty */}
                    <div className="px-4 py-4 border-t border-t-white/[0.07] sm:border-t-0">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7A8394] mb-2">Warranty</p>
                      <p className="font-mono text-[12px] font-semibold text-white leading-snug">{img.warranty || "—"}</p>
                      <p className="font-mono text-[10px] text-[#5A6475] mt-1 uppercase tracking-wide opacity-0 select-none">·</p>
                    </div>
                  </div>

                  {/* Dots + progress */}
                  {images.length > 1 && (
                    <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.06]">
                      <div className="flex items-center gap-2">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Go to image ${i + 1}`}
                            className="transition-all duration-500 rounded-full"
                            style={{
                              width: i === current ? "22px" : "5px",
                              height: "3px",
                              borderRadius: "999px",
                              background: i === current
                                ? "linear-gradient(90deg,#6A2C91,#A62681)"
                                : "rgba(255,255,255,0.1)",
                            }}
                          />
                        ))}
                      </div>
                      <div className="flex-1 ml-5 h-[1px] bg-white/[0.04] overflow-hidden rounded-full">
                        <div
                          key={current}
                          className="h-full bg-gradient-to-r from-[#6A2C91] to-[#A62681]"
                          style={{
                            animation: isHovered ? "none" : "hero-progress 4s linear forwards",
                            width: isHovered ? `${((current + 1) / images.length) * 100}%` : undefined,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <style>{`
                @keyframes hero-progress {
                  from { width: 0% }
                  to   { width: 100% }
                }
              `}</style>
              </div>
            )}{/* end img && */}
          </div>

        </div>
      </div>
    </section>
  );
}
