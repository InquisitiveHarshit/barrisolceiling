"use client";
import { ArrowRight, CheckCircle2, Shield, Gem, Compass, PenTool, Clock } from "lucide-react";
import Link from "next/link";

export default function AboutContent() {
  return (
    <div className="pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative px-5 md:px-16 max-w-7xl mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
          <div>
            <h1 className="font-display-lg text-5xl md:text-6xl lg:text-7xl text-[#202124] mb-8 leading-[1.05] tracking-tight">
              Leading <em className="text-brand-vibrancy not-italic">Experts</em> in Modern Interiors.
            </h1>
            <p className="font-body-lg text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed mb-10">
              We are one of the most trusted false ceiling contractors in Delhi, specializing in advanced stretch ceiling solutions for residential and commercial spaces. From luxury homes to large commercial projects, we redefine interiors.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4 border-t border-outline/10">
              <div>
                <p className="font-headline-md text-2xl text-[#202124]">10+</p>
                <p className="font-label-caps text-label-caps text-on-surface-variant text-xs mt-1">Years Experience</p>
              </div>
              <div className="w-px h-10 bg-outline/10 hidden sm:block"></div>
              <div>
                <p className="font-headline-md text-2xl text-[#202124]">1000+</p>
                <p className="font-label-caps text-label-caps text-on-surface-variant text-xs mt-1">Installations</p>
              </div>
            </div>
          </div>
          
          <div className="relative aspect-[4/5] md:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="/heroimage.webp" 
              alt="Premium Stretch Ceiling Installation" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. EXPERTISE & VISION BENTO GRID */}
      <section className="px-5 md:px-16 max-w-7xl mx-auto py-16 bg-surface-container-low rounded-3xl my-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-headline-lg text-4xl text-[#202124] mb-4">Our Expertise</h2>
          <p className="font-body-md text-on-surface-variant text-lg">Delivering innovative ceiling solutions with quality and precision.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="md:col-span-2 bg-luminary-white rounded-2xl p-8 md:p-12 shadow-sm hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-brand-gradient rounded-xl flex items-center justify-center mb-6 text-luminary-white">
              <Gem size={24} />
            </div>
            <h3 className="font-headline-md text-2xl text-[#202124] mb-4">Core Services</h3>
            <ul className="font-body-md text-on-surface-variant space-y-3 mb-8">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-vibrancy" /> Stretch Ceiling Installation</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-vibrancy" /> PVC & Fabric Ceiling Solutions</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-vibrancy" /> 3D & Printed Ceiling Designs</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-brand-vibrancy" /> Backlit & LED Ceiling Systems</li>
            </ul>
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 font-label-caps text-label-caps text-brand-vibrancy active:scale-95 transition-transform"
            >
              Explore Services <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            {/* Card 2 */}
            <div className="flex-1 bg-luminary-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <div className="w-10 h-10 bg-surface-container-low rounded-xl flex items-center justify-center mb-4 text-[#202124]">
                <Compass size={20} />
              </div>
              <h3 className="font-headline-md text-xl text-[#202124] mb-3">Our Vision</h3>
              <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">
                To become the leading name in Delhi by delivering innovative, high-quality ceiling solutions that exceed expectations.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="flex-1 bg-[#202124] text-luminary-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
              <h3 className="font-headline-md text-xl mb-4">Our Mission</h3>
              <ul className="font-body-md text-luminary-white/80 space-y-2 text-sm">
                <li>• Premium solutions</li>
                <li>• High-quality standards</li>
                <li>• Timely delivery</li>
                <li>• Continuous innovation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST FACTORS */}
      <section className="px-5 md:px-16 max-w-7xl mx-auto py-16">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-headline-lg text-4xl text-[#202124] mb-4">Why Clients Trust Us</h2>
          <p className="font-body-md text-on-surface-variant text-lg">Building long-term relationships through transparency and unmatched quality.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: Shield, title: "Experienced Team" },
            { icon: PenTool, title: "Custom Design" },
            { icon: Gem, title: "Advanced Materials" },
            { icon: Clock, title: "Timely Completion" },
          ].map((item, i) => (
            <div key={i} className="bg-luminary-white border border-outline/10 rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-all duration-300 active:scale-[0.98]">
              <div className="w-12 h-12 mx-auto bg-brand-vibrancy/10 rounded-xl flex items-center justify-center mb-4 text-brand-vibrancy">
                <item.icon size={24} />
              </div>
              <h4 className="font-headline-md text-lg text-[#202124]">{item.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* 4. COMMITMENT SPLIT */}
      <section className="px-5 md:px-16 max-w-7xl mx-auto py-16">
        <div className="bg-[#202124] rounded-3xl overflow-hidden flex flex-col md:flex-row">
          <div className="p-10 md:p-16 lg:p-24 flex-1 flex flex-col justify-center">
            <h2 className="font-display-lg text-3xl md:text-5xl text-luminary-white mb-6">
              Transforming Spaces with Excellence.
            </h2>
            <p className="font-body-lg text-luminary-white/80 mb-10 max-w-md">
              Whether it’s a modern home or a commercial project, our goal is to deliver excellence in every detail. Let's create something extraordinary together.
            </p>
            <div>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-luminary-white text-[#202124] px-8 py-4 font-label-caps text-label-caps border-2 border-luminary-white shadow-[4px_4px_0px_rgba(255,255,255,0.3)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-150 active:translate-x-[4px] active:translate-y-[4px]">
                Get Free Consultation <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="flex-1 min-h-[400px] relative">
            <img 
              src="/heroimage.webp" 
              alt="Installation Excellence" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
