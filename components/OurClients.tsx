"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimationFrame, useMotionValue } from "framer-motion";

/* ─── Client data ──────────────────────────────────────────────── */
const CLIENTS = [
  { name: "Concept Kitchen",                  src: "https://res.cloudinary.com/fifvpxxi/image/upload/v1788772755/borocelling/clients/IMG-20250812-WA0038.jpg" },
  { name: "F Lounge",                         src: "https://res.cloudinary.com/fifvpxxi/image/upload/v1788772756/borocelling/clients/IMG-20250812-WA0039.jpg" },
  { name: "Army College of Medical Sciences", src: "https://res.cloudinary.com/fifvpxxi/image/upload/v1788772756/borocelling/clients/IMG-20250812-WA0040.jpg" },
  { name: "FashionTV",                        src: "https://res.cloudinary.com/fifvpxxi/image/upload/v1788772757/borocelling/clients/IMG-20250812-WA0041.jpg" },
  { name: "Madame",                           src: "https://res.cloudinary.com/fifvpxxi/image/upload/v1788772758/borocelling/clients/IMG-20250812-WA0042.jpg" },
  { name: "Concept Kitchen 2",                src: "https://res.cloudinary.com/fifvpxxi/image/upload/v1788772759/borocelling/clients/IMG-20250812-WA0043.jpg" },
  { name: "Partner",                          src: "https://res.cloudinary.com/fifvpxxi/image/upload/v1788772753/borocelling/clients/01123333.jpg" },
];

/* 3× duplication for seamless infinite loop */
const TRACK = [...CLIENTS, ...CLIENTS, ...CLIENTS];

/* ─── Responsive card dimensions ───────────────────────────────── */
function useCardDims() {
  const [dims, setDims] = useState({ cardW: 220, cardH: 150, gap: 32 });
  useEffect(() => {
    function calc() {
      const w = window.innerWidth;
      if (w < 480)      setDims({ cardW: 140, cardH: 96,  gap: 16 });
      else if (w < 768) setDims({ cardW: 170, cardH: 116, gap: 20 });
      else              setDims({ cardW: 220, cardH: 150, gap: 32 });
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return dims;
}

/* ─── Continuous Ticker ─────────────────────────────────────────── */
function LogoTicker() {
  const x      = useMotionValue(0);
  const paused = useRef(false);
  const dims   = useCardDims();

  const SPEED  = 35; // px/s
  const ITEM_W = dims.cardW + dims.gap;
  const TOTAL  = CLIENTS.length * ITEM_W;

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    x.set((x.get() - (SPEED * delta) / 1000) % -TOTAL);
  });

  return (
    <div
      className="relative overflow-hidden bg-[#07090E]"
      style={{ paddingTop: dims.gap, paddingBottom: dims.gap }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* Soft fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 bg-gradient-to-r from-[#07090E] to-transparent"
           style={{ width: dims.cardW * 0.6 }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 bg-gradient-to-l from-[#07090E] to-transparent"
           style={{ width: dims.cardW * 0.6 }} />

      <motion.div
        style={{ x, display: "flex", alignItems: "center" }}
        className="will-change-transform"
      >
        {TRACK.map((client, idx) => (
          <div
            key={idx}
            style={{
              width:       dims.cardW,
              height:      dims.cardH,
              marginRight: dims.gap,
              flexShrink:  0,
              padding:     dims.cardW * 0.1,
            }}
            className="group flex items-center justify-center
                       bg-white border border-white/10 shadow-lg rounded-xl
                       overflow-hidden cursor-default transition-transform duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={client.src}
              alt={client.name}
              className="max-w-full max-h-full w-auto h-auto object-contain
                         transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────── */
export default function OurClients() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-20 bg-[#07090E] text-[#E2E2E6] overflow-hidden border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E4B5FF] font-semibold block mb-3">
            TRUSTED BY INDUSTRY LEADERS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-serif font-normal">
            Our Clients
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <LogoTicker />
      </motion.div>
    </section>
  );
}
