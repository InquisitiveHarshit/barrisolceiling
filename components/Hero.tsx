"use client";
import Link from "next/link";
import Image from "next/image";
import { HexagonPattern } from "@/components/ui/hexagon-pattern";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";

export default function Hero() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-white">

        {/* ── Desktop layout: split left/right ── */}
        <div className="hidden lg:grid lg:grid-cols-[55%_45%] min-h-[90dvh]">

          {/* LEFT — hexagon bg + copy */}
          <div className="relative flex items-center pt-24 pb-16">
            {/* Hex pattern only on the left panel */}
            <div className="absolute inset-0 bg-white">
              <HexagonPattern
                className="fill-brand-vibrancy/[0.03] stroke-brand-vibrancy/15"
                radius={32}
                gap={4}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_40%_50%,white_35%,transparent_100%)]" />
            </div>

            <div className="relative z-10 max-w-7xl w-full mx-auto px-5 md:px-16">
              <h1 className="font-display-lg text-5xl xl:text-7xl text-[#202124] mb-6 leading-[1.1] tracking-tight">
                Transform Your Space with{" "}
                <br />
                <div className="mt-2">
                  <DiaTextReveal
                    className="text-5xl xl:text-7xl font-bold tracking-tight"
                    text="Elegant Ceilings"
                    textColor="#800080"
                    colors={["#3b82f6", "#8b5cf6", "#a855f7"]}
                  />
                </div>
              </h1>

              <p className="font-body-lg text-lg text-on-surface-variant max-w-lg leading-relaxed mb-10">
                Delhi&apos;s most trusted stretch ceiling experts. Seamless
                finishes, premium European materials, and flawless installation
                guaranteed.
              </p>

              <div className="flex flex-wrap items-center gap-5">
                <Link href="/contact">
                  <ShimmerButton className="shadow-2xl h-14 px-8">
                    <span className="text-sm font-medium tracking-tight text-white lg:text-base font-label-caps uppercase">
                      Book Free Site Visit
                    </span>
                  </ShimmerButton>
                </Link>
                <Link href="/service">
                  <button className="bg-transparent border-2 border-[#202124] text-zinc-900 px-8 h-14 font-label-caps text-xs tracking-[0.18em] uppercase shadow-[4px_4px_0px_#202124] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-150">
                    Our Services
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT — full-bleed image */}
          <div className="relative">
            <Image
              src="/hero-stretch-ceiling.jpg"
              alt="Premium stretch ceiling installation"
              fill
              priority
              fetchPriority="high"
              quality={90}
              className="object-cover"
              sizes="45vw"
            />
          </div>
        </div>

        {/* ── Mobile layout: compact, centered ── */}
        <div className="lg:hidden flex flex-col">

          {/* Image banner (top) */}
          <div className="relative w-full h-56 sm:h-72">
            <Image
              src="/hero-stretch-ceiling.jpg"
              alt="Premium stretch ceiling installation"
              fill
              priority
              quality={85}
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Copy (below image) */}
          <div className="relative px-5 pt-6 pb-12 text-center bg-white">
            <HexagonPattern
              className="absolute inset-0 fill-brand-vibrancy/[0.03] stroke-brand-vibrancy/15 pointer-events-none"
              radius={28}
              gap={4}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,white_30%,transparent_100%)] pointer-events-none" />

            <div className="relative z-10">
              <h1 className="font-display-lg text-3xl sm:text-4xl text-[#202124] mb-4 leading-[1.15] tracking-tight">
                Transform Your Space with{" "}
                <div className="mt-1">
                  <DiaTextReveal
                    className="text-3xl sm:text-4xl font-bold tracking-tight"
                    text="Elegant Ceilings"
                    textColor="#800080"
                    colors={["#3b82f6", "#8b5cf6", "#a855f7"]}
                  />
                </div>
              </h1>

              <p className="font-body-lg text-base text-on-surface-variant leading-relaxed mb-8 max-w-md mx-auto">
                Delhi&apos;s most trusted stretch ceiling experts. Seamless
                finishes, premium European materials, and flawless installation
                guaranteed.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <ShimmerButton className="shadow-xl h-12 px-6 w-full sm:w-auto">
                    <span className="text-sm font-medium tracking-tight text-white font-label-caps uppercase">
                      Book Free Site Visit
                    </span>
                  </ShimmerButton>
                </Link>
                <Link href="/service" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto bg-transparent border-2 border-[#202124] text-zinc-900 px-6 h-12 font-label-caps text-xs tracking-[0.18em] uppercase shadow-[4px_4px_0px_#202124] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-150">
                    Our Services
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ──────────────────────────────────────────────── */}
      <div className="bg-surface-container-low border-t border-black/10">
        <div className="max-w-7xl mx-auto px-5 md:px-16 py-6 grid grid-cols-3 divide-x divide-black/10">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "1000+", label: "Installations" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center px-4">
              <p className="text-2xl md:text-3xl font-bold text-[#202124] mb-1 font-display-lg">
                {stat.value}
              </p>
              <p className="font-label-caps text-label-caps text-on-surface-variant text-[10px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
