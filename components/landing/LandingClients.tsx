"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimationFrame, useMotionValue } from "framer-motion";

const CLIENTS = [
  { name: "Concept Kitchen",                  src: "/media/v1788772755/borocelling/clients/IMG-20250812-WA0038.jpg" },
  { name: "F Lounge",                         src: "/media/v1788772756/borocelling/clients/IMG-20250812-WA0039.jpg" },
  { name: "Army College of Medical Sciences", src: "/media/v1788772756/borocelling/clients/IMG-20250812-WA0040.jpg" },
  { name: "FashionTV",                        src: "/media/v1788772757/borocelling/clients/IMG-20250812-WA0041.jpg" },
  { name: "Madame",                           src: "/media/v1788772758/borocelling/clients/IMG-20250812-WA0042.jpg" },
  { name: "Concept Kitchen 2",                src: "/media/v1788772759/borocelling/clients/IMG-20250812-WA0043.jpg" },
  { name: "Partner",                          src: "/media/v1788772753/borocelling/clients/01123333.jpg" },
  { name: "Ankur Lighting",                   src: "/media/v1789022305/borocelling/clients/ankur-lighting.jpg" },
  { name: "Sir Ganga Ram Hospital",           src: "/media/v1789022306/borocelling/clients/sir-ganga-ram-hospital.jpg" },
  { name: "Geetanjali Salon",                 src: "/media/v1789022306/borocelling/clients/geetanjali-salon.png" },
  { name: "Rippl",                            src: "/media/v1789022307/borocelling/clients/rippl.png" },
  { name: "Mahindra",                         src: "/media/v1789022309/borocelling/clients/client-logo-1.jpg" },
  { name: "Payoneer",                         src: "/media/v1789022310/borocelling/clients/client-logo-2.jpg" },
  { name: "Looks Salon",                      src: "/media/v1789024713/borocelling/clients/looks-salon.png" },
];

const TRACK = [...CLIENTS, ...CLIENTS, ...CLIENTS];

function useCardDims() {
  const [dims, setDims] = useState({ cardW: 200, cardH: 130, gap: 28 });
  useEffect(() => {
    function calc() {
      const w = window.innerWidth;
      if (w < 480)      setDims({ cardW: 130, cardH: 88, gap: 14 });
      else if (w < 768) setDims({ cardW: 160, cardH: 108, gap: 20 });
      else              setDims({ cardW: 200, cardH: 130, gap: 28 });
    }
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return dims;
}

function LogoTicker() {
  const x      = useMotionValue(0);
  const paused = useRef(false);
  const dims   = useCardDims();
  const SPEED  = 35;
  const ITEM_W = dims.cardW + dims.gap;
  const TOTAL  = CLIENTS.length * ITEM_W;

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    x.set((x.get() - (SPEED * delta) / 1000) % -TOTAL);
  });

  return (
    <div
      className="relative overflow-hidden bg-gray-50"
      style={{ paddingTop: dims.gap, paddingBottom: dims.gap }}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 bg-gradient-to-r from-gray-50 to-transparent" style={{ width: dims.cardW * 0.6 }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 bg-gradient-to-l from-gray-50 to-transparent" style={{ width: dims.cardW * 0.6 }} />

      <motion.div style={{ x, display: "flex", alignItems: "center" }} className="will-change-transform">
        {TRACK.map((client, idx) => (
          <div
            key={idx}
            style={{ width: dims.cardW, height: dims.cardH, marginRight: dims.gap, flexShrink: 0, padding: dims.cardW * 0.1 }}
            className="group flex items-center justify-center bg-white border border-black/10 shadow-sm rounded-lg overflow-hidden cursor-default hover:border-[#A82F9D]/40 hover:shadow-md transition-all"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={client.src}
              alt={client.name}
              className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function LandingClients() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-gray-50 overflow-hidden border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A82F9D] font-semibold block mb-3">
            Trusted by Industry Leaders
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
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
