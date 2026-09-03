"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface GalleryImage {
  _id: string;
  url: string;
  title?: string;
  location?: string;
}

interface GalleryProps {
  showViewAll?: boolean;
}

const FALLBACK: GalleryImage[] = [
  { _id: "f1", url: "/heroimage.webp",           title: "Translucent Ceiling",     location: "Gurugram, India" },
  { _id: "f2", url: "/hero-stretch-ceiling.jpg", title: "Printed Stretch Ceiling", location: "Delhi, India" },
  { _id: "f3", url: "/heroimage.webp",           title: "Glossy Finish",           location: "Noida, India" },
  { _id: "f4", url: "/hero-stretch-ceiling.jpg", title: "3D Design",               location: "Faridabad, India" },
];

export default function Gallery({ showViewAll = true }: GalleryProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.images?.length > 0) setImages(data.images);
        else setImages(FALLBACK);
      })
      .catch(() => setImages(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const displayImages = showViewAll ? images.slice(0, 4) : images;

  return (
    <section
      id="portfolio"
      className="py-16 sm:py-24 border-b border-white/10 bg-[#0C0E12] text-[#E2E2E6]"
    >
      <div className="max-w-[94rem] mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12 pb-8 border-b border-white/10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A62681] font-semibold block mb-3">
              Spatial Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-serif font-normal">
              {showViewAll ? "Curated Spatial Commissions" : "Craftsmanship Portfolio"}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-[#8E94A0]">Delhi NCR Execution Archive</span>
            {showViewAll && (
              <Link
                href="/gallery"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[#A62681] uppercase tracking-wider hover:text-white transition-colors font-semibold shrink-0"
              >
                <span>Full Archive</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          /* Skeleton */
          showViewAll ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
              <div className="lg:col-span-8 aspect-[16/10] bg-white/5 animate-pulse rounded-xs" />
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="aspect-[16/10] bg-white/5 animate-pulse rounded-xs" />
                <div className="aspect-[16/10] bg-white/5 animate-pulse rounded-xs" />
              </div>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {[180,260,140,300,220,160,280,200,240,170,310,190].map((h, i) => (
                <div key={i} className="break-inside-avoid bg-white/5 animate-pulse" style={{ height: `${h}px` }} />
              ))}
            </div>
          )
        ) : showViewAll ? (
          /* ── Homepage featured layout ── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Main */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 flex flex-col gap-3 border border-white/10 hover:border-[#A62681]/50 p-3 bg-[#111317] rounded-xs transition-colors group shadow-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0C0E12] rounded-xs">
                <Image
                  src={displayImages[0]?.url || "/heroimage.webp"}
                  alt={displayImages[0]?.title || "Stretch ceiling commission"}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-90 group-hover:brightness-100"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute bottom-4 left-4 bg-[#0C0E12]/90 px-3 py-1 font-mono text-[10px] text-white border border-white/10 uppercase backdrop-blur-sm">
                  {displayImages[0]?.location || "Gurugram, Delhi NCR"}
                </div>
              </div>
              <div className="p-3 sm:p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl text-white font-serif group-hover:text-[#E4B5FF] transition-colors leading-snug">
                    {displayImages[0]?.title || "Private Celestial Salon with Fiber-Optic Integration"}
                  </h3>
                  <p className="text-xs text-[#8E94A0] mt-1 font-light">
                    High-definition UV tension membrane with micro-calibrated starlight LEDs.
                  </p>
                </div>
                <div className="font-mono text-xs text-[#A62681] shrink-0 border border-[#A62681]/40 px-3 py-1 bg-[#A62681]/10 rounded-xs whitespace-nowrap">
                  Area: 72 sq. meters
                </div>
              </div>
            </motion.div>

            {/* Side stack */}
            <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8">
              {displayImages.slice(1, 3).map((img, idx) => (
                <motion.div
                  key={img._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: (idx + 1) * 0.15 }}
                  className="flex flex-col gap-2 border border-white/10 hover:border-[#A62681]/50 p-3 bg-[#111317] rounded-xs transition-colors group shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0C0E12] rounded-xs">
                    <Image
                      src={img.url}
                      alt={img.title || "Stretch ceiling"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-1 sm:p-2">
                    <div className="font-mono text-[10px] text-[#A62681] uppercase tracking-wider font-semibold">
                      {img.location || "Delhi NCR"}
                    </div>
                    <h4 className="text-sm sm:text-base text-white mt-1 font-serif group-hover:text-[#E4B5FF] transition-colors">
                      {img.title || "Custom Tensioned Membrane"}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* ── Full masonry gallery page ── */
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {displayImages.map((img, i) => (
              <motion.div
                key={img._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.06 }}
                className="break-inside-avoid relative group overflow-hidden border border-white/10 bg-[#111317] shadow-md hover:shadow-xl hover:border-[#A62681]/30 transition-all duration-300"
              >
                <img
                  src={img.url}
                  alt={img.title || "Gallery image"}
                  className="w-full h-auto block group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                  {img.title && (
                    <p className="font-serif text-sm sm:text-base text-white leading-snug">{img.title}</p>
                  )}
                  {img.location && (
                    <p className="font-mono text-[10px] text-white/60 uppercase tracking-wider mt-1">{img.location}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
