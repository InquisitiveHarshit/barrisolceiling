"use client";
import { ArrowRight, CheckCircle2, Shield, Gem, Compass, PenTool, Clock } from "lucide-react";
import Link from "next/link";

export default function AboutContent() {
  return (
    <div className="pb-24 bg-[#0C0E12] text-[#E2E2E6]">

      {/* 1. HERO */}
      <section className="relative px-5 md:px-16 max-w-7xl mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
          <div>
            <h1 className="font-display-lg text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-[1.05] tracking-tight">
              Leading{" "}
              <em className="text-[#d946ef] not-italic">Experts</em>{" "}
              in Modern Interiors.
            </h1>
            <p className="font-body-lg text-lg md:text-xl text-[#8E94A0] max-w-xl leading-relaxed mb-10">
              We are one of the most trusted false ceiling contractors in Delhi,
              specializing in advanced stretch ceiling solutions for residential
              and commercial spaces. From luxury homes to large commercial
              projects, we redefine interiors.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4 border-t border-white/10">
              <div>
                <p className="font-headline-md text-2xl text-white">10+</p>
                <p className="font-label-caps text-label-caps text-[#8E94A0] text-xs mt-1">
                  Years Experience
                </p>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <div>
                <p className="font-headline-md text-2xl text-white">1000+</p>
                <p className="font-label-caps text-label-caps text-[#8E94A0] text-xs mt-1">
                  Installations
                </p>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] md:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
            <img
              src="/heroimage.webp"
              alt="Premium Stretch Ceiling Installation"
              className="w-full h-full object-cover brightness-90"
            />
          </div>
        </div>
      </section>

      {/* 2. EXPERTISE BENTO GRID */}
      <section className="px-5 md:px-16 max-w-7xl mx-auto py-16 bg-[#111317] rounded-3xl my-12 ring-1 ring-white/5">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-headline-lg text-4xl text-white mb-4">Our Expertise</h2>
          <p className="font-body-md text-[#8E94A0] text-lg">
            Delivering innovative ceiling solutions with quality and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 — Core Services */}
          <div className="md:col-span-2 bg-[#1a1d24] rounded-2xl p-8 md:p-12 ring-1 ring-white/5 hover:ring-[#A62681]/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white"
              style={{ background: "linear-gradient(135deg,#A62681,#6A2C91)" }}>
              <Gem size={24} />
            </div>
            <h3 className="font-headline-md text-2xl text-white mb-4">Core Services</h3>
            <ul className="font-body-md text-[#8E94A0] space-y-3 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#d946ef] flex-shrink-0" />
                Stretch Ceiling Installation
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#d946ef] flex-shrink-0" />
                PVC &amp; Fabric Ceiling Solutions
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#d946ef] flex-shrink-0" />
                3D &amp; Printed Ceiling Designs
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-[#d946ef] flex-shrink-0" />
                Backlit &amp; LED Ceiling Systems
              </li>
            </ul>
            <Link
              href="/service"
              className="inline-flex items-center gap-2 font-label-caps text-label-caps text-[#d946ef] hover:text-white transition-colors active:scale-95"
            >
              Explore Services <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            {/* Card 2 — Vision */}
            <div className="flex-1 bg-[#1a1d24] rounded-2xl p-8 ring-1 ring-white/5 hover:ring-[#A62681]/30 transition-all duration-300">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-4 text-[#d946ef]">
                <Compass size={20} />
              </div>
              <h3 className="font-headline-md text-xl text-white mb-3">Our Vision</h3>
              <p className="font-body-md text-[#8E94A0] text-sm leading-relaxed">
                To become the leading name in Delhi by delivering innovative,
                high-quality ceiling solutions that exceed expectations.
              </p>
            </div>

            {/* Card 3 — Mission */}
            <div className="flex-1 rounded-2xl p-8 ring-1 ring-[#A62681]/30 hover:ring-[#A62681]/60 transition-all duration-300"
              style={{ background: "linear-gradient(135deg,#1a1230 0%,#2a1040 100%)" }}>
              <h3 className="font-headline-md text-xl text-white mb-4">Our Mission</h3>
              <ul className="font-body-md text-[#c4b5d4] space-y-2 text-sm">
                <li className="flex items-center gap-2"><span className="text-[#d946ef]">▸</span> Premium solutions</li>
                <li className="flex items-center gap-2"><span className="text-[#d946ef]">▸</span> High-quality standards</li>
                <li className="flex items-center gap-2"><span className="text-[#d946ef]">▸</span> Timely delivery</li>
                <li className="flex items-center gap-2"><span className="text-[#d946ef]">▸</span> Continuous innovation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST FACTORS */}
      <section className="px-5 md:px-16 max-w-7xl mx-auto py-16">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-headline-lg text-4xl text-white mb-4">Why Clients Trust Us</h2>
          <p className="font-body-md text-[#8E94A0] text-lg">
            Building long-term relationships through transparency and unmatched quality.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Shield, title: "Experienced Team" },
            { icon: PenTool, title: "Custom Design" },
            { icon: Gem, title: "Advanced Materials" },
            { icon: Clock, title: "Timely Completion" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-[#111317] ring-1 ring-white/5 hover:ring-[#A62681]/40 rounded-2xl p-6 md:p-8 text-center hover:bg-[#1a1d24] transition-all duration-300 active:scale-[0.98]"
            >
              <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4 text-[#d946ef]"
                style={{ background: "rgba(166,38,129,0.12)" }}>
                <item.icon size={24} />
              </div>
              <h4 className="font-headline-md text-lg text-white">{item.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 4. COMMITMENT SPLIT */}
      <section className="px-5 md:px-16 max-w-7xl mx-auto py-16">
        <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row ring-1 ring-white/10"
          style={{ background: "linear-gradient(135deg,#1a1230 0%,#0f0a1a 100%)" }}>
          <div className="p-10 md:p-16 lg:p-24 flex-1 flex flex-col justify-center">
            <h2 className="font-display-lg text-3xl md:text-5xl text-white mb-6 leading-tight">
              Transforming Spaces with Excellence.
            </h2>
            <p className="font-body-lg text-[#8E94A0] mb-10 max-w-md leading-relaxed">
              Whether it's a modern home or a commercial project, our goal is to
              deliver excellence in every detail. Let's create something
              extraordinary together.
            </p>
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#0C0E12] px-8 py-4 font-label-caps text-label-caps border-2 border-white shadow-[4px_4px_0px_rgba(166,38,129,0.5)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px]"
              >
                Get Free Consultation <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="flex-1 min-h-[400px] relative">
            <img
              src="/heroimage.webp"
              alt="Installation Excellence"
              className="absolute inset-0 w-full h-full object-cover brightness-75"
            />
            {/* subtle gradient overlay so it blends with the dark card */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1230]/60 to-transparent" />
          </div>
        </div>
      </section>

    </div>
  );
}
