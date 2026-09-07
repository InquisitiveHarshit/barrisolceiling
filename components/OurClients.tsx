"use client";
import React, { useRef } from "react";
import { motion, useInView, useAnimationFrame, useMotionValue } from "framer-motion";

/* ─── Client data ──────────────────────────────────────────────── */
const CLIENTS = [
  { name: "Concept Kitchen",                 src: "https://res.cloudinary.com/fifvpxxi/image/upload/v1788772755/borocelling/clients/IMG-20250812-WA0038.jpg" },
  { name: "F Lounge",                        src: "https://res.cloudinary.com/fifvpxxi/image/upload/v1788772756/borocelling/clients/IMG-20250812-WA0039.jpg" },
  { name: "Army College of Medical Sciences", src: "https://res.cloudinary.com/fifvpxxi/image/upload/v1788772756/borocelling/clients/IMG-20250812-WA0040.jpg" },
  { name: "FashionTV",                       src: "https://res.cloudinary.com/fifvpxxi/image/upload/v1788772757/borocelling/clients/IMG-20250812-WA0041.jpg" },
  { name: "Madame",                          src: "https://res.cloudinary.com/fifvpxxi/image/upload/v1788772758/borocelling/clients/IMG-20250812-WA0042.jpg" },
  { name: "Concept Kitchen 2",               src: "https://res.cloudinary.com/fifvpxxi/image/upload/v1788772759/borocelling/clients/IMG-20250812-WA0043.jpg" },
  { name: "Partner",                         src: "https://res.cloudinary.com/fifvpxxi/image/upload/v1788772753/borocelling/clients/01123333.jpg" },
];

/* Duplicate for seamless infinite loop */
const TRACK = [...CLIENTS, ...CLIENTS, ...CLIENTS];

/* ─── Continuous Ticker Component ───────────────────────────────── */
function LogoTicker() {
  const x = useMotionValue(0);
  const SPEED = 35; // px/s
  const ITEM_W = 268; // 240px card + 28px gap
  const TOTAL = CLIENTS.length * ITEM_W;
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    x.set((x.get() - (SPEED * delta) / 1000) % -TOTAL);
  });

  return (
    <div
      className="relative overflow-hidden py-4 bg-[#07090E] border-y border-white/10"
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* Soft gradient fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10 bg-gradient-to-r from-[#07090E] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10 bg-gradient-to-l from-[#07090E] to-transparent" />

      <motion.div
        style={{ x }}
        className="flex gap-7 will-change-transform items-center justify-start"
      >
        {TRACK.map((client, idx) => (
          <div
            key={idx}
            className="group flex-shrink-0 flex items-center justify-center
                       w-[240px] h-[150px] p-2 bg-white
                       border border-zinc-300 shadow-md
                       transition-transform duration-300 overflow-hidden cursor-default"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={client.src}
              alt={client.name}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Main OurClients Section Component ─────────────────────────── */
export default function OurClients() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-[#07090E] text-[#E2E2E6] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Subtle Eyebrow matching reference design */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] font-semibold text-white/80 block">
            TRUSTED BY INDUSTRY LEADERS
          </span>
        </motion.div>
      </div>

      {/* Floating Logo Ticker */}
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
