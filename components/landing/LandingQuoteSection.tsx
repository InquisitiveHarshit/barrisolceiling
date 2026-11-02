"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { toBarrisolUrl } from "@/lib/media";
import { openLandingModal } from "./LandingModal";

interface GalleryItem {
  _id: string;
  url: string;
  title?: string;
}

const FALLBACK_ITEMS: GalleryItem[] = [
  {
    _id: "g1",
    url: "/Berrisol.webp",
    title: "Waveform Translucent Backlit Stretch Ceiling",
  },
  {
    _id: "g2",
    url: "/hero-stretch-ceiling.webp",
    title: "Living Room Architectural Lighting: Modern Glare-Free Ceiling",
  },
  {
    _id: "g3",
    url: "/heroimage.webp",
    title: "Glossy Mirror Lacquer Stretch Ceiling with Perimeter Track",
  },
  {
    _id: "g4",
    url: "/Berrisol.webp",
    title: "Commercial Office Luminary Stretch Ceiling & Tunable CCT",
  },
  {
    _id: "g5",
    url: "/hero-stretch-ceiling.webp",
    title: "Starlight Fiber-Optic Celestial Ceiling for Home Theatres",
  },
  {
    _id: "g6",
    url: "/heroimage.webp",
    title: "Acoustic Micro-Perforated European Stretch Membrane",
  },
  {
    _id: "g7",
    url: "/Berrisol.webp",
    title: "Architectural 3D Organic Curves & Recessed Channel Illumination",
  },
];

export default function LandingQuoteSection() {
  const [items, setItems] = useState<GalleryItem[]>(FALLBACK_ITEMS);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.images) && data.images.length > 0) {
          const formatted = data.images.slice(0, 7).map((img: any, idx: number) => ({
            _id: img._id || `img-${idx}`,
            url: toBarrisolUrl(img.url) || "/heroimage.webp",
            title: img.title || "Custom European Stretch Ceiling Installation",
          }));
          // Ensure 6 to 7 items
          if (formatted.length < 6) {
            setItems([...formatted, ...FALLBACK_ITEMS.slice(formatted.length, 7)]);
          } else {
            setItems(formatted.slice(0, 7));
          }
        }
      })
      .catch(() => {});
  }, []);

  // Auto-scroll effect: advances every 3.2s, pauses on hover/interaction
  useEffect(() => {
    const interval = setInterval(() => {
      if (isHovered.current || !scrollRef.current) return;
      const el = scrollRef.current;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const step = 360;

      if (el.scrollLeft >= maxScroll - 10) {
        // Smoothly loop back to start
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [items]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const step = 360;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-14 sm:py-18 lg:py-20 bg-gray-50 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-black/10 mb-8">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A82F9D] font-semibold block mb-2">
              Spatial Portfolio &amp; Estimates
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Featured Projects &amp; Pricing
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous projects"
              className="w-10 h-10 rounded-full border border-black/20 bg-white hover:border-[#A82F9D] hover:text-[#A82F9D] transition-colors flex items-center justify-center shadow-xs text-gray-700"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next projects"
              className="w-10 h-10 rounded-full border border-black/20 bg-white hover:border-[#A82F9D] hover:text-[#A82F9D] transition-colors flex items-center justify-center shadow-xs text-gray-700"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Auto-Scrollable Carousel Container */}
        <div
          ref={scrollRef}
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
          onTouchStart={() => { isHovered.current = true; }}
          onTouchEnd={() => { isHovered.current = false; }}
          className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((item) => (
            <div
              key={item._id}
              className="w-[280px] sm:w-[330px] lg:w-[360px] shrink-0 snap-start bg-white border border-black/10 hover:border-[#A82F9D]/40 transition-all shadow-sm hover:shadow-md flex flex-col justify-between overflow-hidden group"
            >
              {/* Top: Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.url}
                  alt={item.title || "Stretch ceiling project"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 280px, 360px"
                />
              </div>

              {/* Bottom: Card Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#A82F9D] transition-colors leading-snug line-clamp-2 mb-6">
                    {item.title}
                  </h3>
                </div>

                {/* "Get a Quote" styled as an actual button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={openLandingModal}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#A82F9D] hover:bg-[#8f2284] text-white py-3 px-4 text-xs font-semibold uppercase tracking-widest border border-[#A82F9D] transition-all shadow-sm hover:shadow rounded-xs"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
