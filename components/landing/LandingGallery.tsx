"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { toBarrisolUrl } from "@/lib/media";

interface GalleryImage {
  _id: string;
  url: string;
  title?: string;
  alt?: string;
  location?: string;
}

const FALLBACK: GalleryImage[] = [
  { _id: "f1", url: "/heroimage.webp", title: "Translucent Ceiling", location: "Gurugram, India" },
  { _id: "f2", url: "/hero-stretch-ceiling.webp", title: "Printed Stretch Ceiling", location: "Delhi, India" },
  { _id: "f3", url: "/heroimage.webp", title: "Glossy Finish", location: "Noida, India" },
];

export default function LandingGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.images?.length > 0) setImages(data.images.slice(0, 3));
        else setImages(FALLBACK);
      })
      .catch(() => setImages(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const displayImages = images.length > 0 ? images : FALLBACK;

  return (
    <section id="portfolio" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12 pb-8 border-b border-black/10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A82F9D] font-semibold block mb-3">
              Spatial Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Gallery
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#A82F9D] uppercase tracking-wider hover:text-gray-900 transition-colors font-semibold shrink-0"
          >
            <span>Full Archive</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 aspect-[16/10] bg-gray-100 animate-pulse" />
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="aspect-[16/10] bg-gray-100 animate-pulse" />
              <div className="aspect-[16/10] bg-gray-100 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Main large image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 flex flex-col border border-black/15 hover:border-[#A82F9D]/50 bg-gray-50 transition-colors group shadow-sm"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <Image
                  src={toBarrisolUrl(displayImages[0]?.url) || "/heroimage.webp"}
                  alt={displayImages[0]?.alt || displayImages[0]?.title || "Stretch ceiling project"}
                  title={displayImages[0]?.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 font-mono text-[10px] text-gray-700 border border-black/10 uppercase backdrop-blur-sm">
                  {displayImages[0]?.location || "Gurugram, Delhi NCR"}
                </div>
              </div>
              <div className="px-4 py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <h3 className="text-lg text-gray-900 font-bold group-hover:text-[#A82F9D] transition-colors leading-snug">
                  {displayImages[0]?.title || "Premium Stretch Ceiling Installation"}
                </h3>
              </div>
            </motion.div>

            {/* Side images */}
            <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8">
              {displayImages.slice(1, 3).map((img, idx) => (
                <motion.div
                  key={img._id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: (idx + 1) * 0.15 }}
                  className="flex flex-col border border-black/15 hover:border-[#A82F9D]/50 bg-gray-50 transition-colors group shadow-sm"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={toBarrisolUrl(img.url)}
                      alt={img.alt || img.title || "Stretch ceiling"}
                      title={img.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-3">
                    <div className="font-mono text-[10px] text-[#A82F9D] uppercase tracking-wider font-semibold">
                      {img.location || "Delhi NCR"}
                    </div>
                    <h4 className="text-sm text-gray-900 font-semibold mt-1 group-hover:text-[#A82F9D] transition-colors">
                      {img.title || "Custom Tensioned Membrane"}
                    </h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* View more */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-white hover:bg-[#A82F9D] hover:text-white text-gray-900 border border-black/20 hover:border-[#A82F9D] font-mono text-xs uppercase tracking-widest transition-all group shadow-sm hover:shadow"
          >
            <span>View More Projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
