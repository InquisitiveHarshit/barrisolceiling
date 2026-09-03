"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Service {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  shortDescription?: string;
  coverImage?: string;
  tags?: string[];
}

/* ── Shimmer skeleton card ── */
function SkeletonRow({ idx }: { idx: number }) {
  return (
    <div className="py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-zinc-200 dark:border-white/10">
      {/* number */}
      <div className="lg:col-span-1">
        <div className="w-14 h-14 rounded-sm bg-zinc-200 dark:bg-white/5 animate-pulse" />
      </div>
      {/* text */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-white/5 animate-pulse" />
        <div className="h-7 w-3/4 rounded bg-zinc-200 dark:bg-white/5 animate-pulse" />
        <div className="h-3 w-full rounded bg-zinc-200 dark:bg-white/5 animate-pulse" />
        <div className="h-3 w-5/6 rounded bg-zinc-200 dark:bg-white/5 animate-pulse" />
        <div className="flex gap-2 pt-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-6 w-20 rounded-sm bg-zinc-200 dark:bg-white/5 animate-pulse"
            />
          ))}
        </div>
      </div>
      {/* image */}
      <div className="lg:col-span-6">
        <div className="aspect-[16/9] rounded-sm bg-zinc-200 dark:bg-white/5 animate-pulse" />
      </div>
    </div>
  );
}

/* ── Shimmer text effect via CSS-in-JS ── */

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setServices((d.data as Service[]).slice(0, 3));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const padIdx = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <>
      {/* keyframes injected once */}
      <style>{`
        @keyframes services-shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .svc-img-overlay {
          background: linear-gradient(
            135deg,
            rgba(166,38,129,0) 30%,
            rgba(166,38,129,0.18) 100%
          );
          transition: opacity 0.5s ease;
          opacity: 0;
        }
        .group:hover .svc-img-overlay { opacity: 1; }
      `}</style>

      <section
        id="services"
        className="py-16 sm:py-24 bg-[#0C0E12] text-[#E2E2E6] border-b border-white/10 relative overflow-hidden"
      >
        <div className="max-w-[94rem] mx-auto px-4 sm:px-8 relative">

          {/* ── Section Header ── */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-white/10">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-serif font-normal">
                Architectural Systems &amp; Typologies
              </h2>
            </div>
            <p className="text-sm text-[#8E94A0] max-w-md font-light leading-relaxed">
              Engineered European polymers and micro-woven textiles manufactured
              for pristine geometric stability, acoustic performance, and diffuse
              illumination.
            </p>
          </div>

          {/* ── Service rows ── */}
          <div className="divide-y divide-white/10">
            {loading
              ? [0, 1, 2].map((i) => <SkeletonRow key={i} idx={i} />)
              : services.map((service, idx) => (
                  <motion.article
                    key={service._id}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.65,
                      delay: idx * 0.12,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center group"
                  >
                    {/* ── Big index number ── */}
                    <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-3">
                      <div className="relative select-none">
                        {/* Glow behind the number */}
                        <span
                          aria-hidden
                          className="absolute inset-0 blur-xl opacity-30 dark:opacity-40 font-mono font-black text-5xl sm:text-6xl leading-none"
                          style={{ color: "#A62681" }}
                        >
                          {padIdx(idx)}
                        </span>
                        <span
                          className="relative font-mono text-5xl sm:text-6xl font-black leading-none"
                          style={{
                            backgroundImage:
                              "linear-gradient(135deg, #A62681 0%, #d946ef 50%, #A62681 100%)",
                            backgroundSize: "200% auto",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            animation: `services-shimmer ${3.5 + idx * 0.8}s linear infinite`,
                          }}
                        >
                          {padIdx(idx)}
                        </span>
                      </div>
                      <div
                        className="hidden lg:block w-px h-12 mt-1"
                        style={{
                          background:
                            "linear-gradient(to bottom, #A62681, transparent)",
                          opacity: 0.4,
                        }}
                      />
                    </div>

                    {/* ── Text content ── */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                      {service.category && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8E94A0]">
                          {service.category}
                        </span>
                      )}

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-white group-hover:text-[#E4B5FF] transition-colors duration-300 leading-snug">
                        {service.title}
                      </h3>

                      {service.shortDescription && (
                        <p className="text-sm text-[#8E94A0] leading-relaxed font-light">
                          {service.shortDescription}
                        </p>
                      )}

                      {service.tags && service.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {service.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-white/10 bg-[#111317] text-[#D8DCE3] transition-colors duration-300 group-hover:border-[#A62681]/40"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`/service-detail/${service.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider pt-3 w-fit font-semibold text-[#A62681] transition-all duration-300 group/link"
                      >
                        <span className="group-hover/link:text-white transition-colors">
                          System Specifications
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>

                    {/* ── Image ── */}
                    <div className="lg:col-span-6">
                      <div className="relative aspect-[16/9] overflow-hidden border border-white/10 bg-[#111317] rounded-xs group-hover:border-[#A62681]/50 transition-colors duration-500 shadow-xl group-hover:shadow-[0_8px_40px_-8px_rgba(166,38,129,0.25)]">
                        <Image
                          src={service.coverImage || "/heroimage.webp"}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Purple gradient overlay on hover */}
                        <div className="svc-img-overlay absolute inset-0" />




                      </div>
                    </div>
                  </motion.article>
                ))}

            {!loading && services.length === 0 && (
              <div className="py-20 text-center text-sm text-zinc-400 dark:text-[#8E94A0] font-light italic">
                No services published yet.
              </div>
            )}
          </div>



        </div>
      </section>
    </>
  );
}
