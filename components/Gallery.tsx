"use client";
import { ArrowRight } from "lucide-react";

interface GalleryProps {
  showViewAll?: boolean;
}

export default function Gallery({ showViewAll = true }: GalleryProps) {
  return (
    <section id="gallery" className="py-section-gap px-5 md:px-16 max-w-container-max mx-auto">
      <div className="flex justify-between items-end mb-12">
        <h2 className="font-headline-lg text-3xl md:text-5xl text-[#202124]">
          Craftsmanship Portfolio
        </h2>
        {showViewAll && (
          <a
            href="/gallery"
            className="hidden md:inline-flex items-center gap-2 font-label-caps text-label-caps text-brand-vibrancy hover:text-brand-vibrancy/80 transition-colors active:scale-95"
          >
            View All
            <ArrowRight size={14} />
          </a>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px] lg:h-[720px]">
        {/* Large hero tile */}
        <a href="#" className="md:col-span-2 md:row-span-2 relative group overflow-hidden min-h-[320px] rounded-2xl active:scale-[0.98] transition-all duration-300">
          <img
            alt="Translucent stretch ceiling in luxury hotel lobby"
            className="w-full h-full object-cover absolute inset-0 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            src="/heroimage.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-400" />
          <div className="absolute bottom-0 left-0 p-8 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
            <p className="font-headline-md text-2xl text-luminary-white mb-1">
              Translucent Ceiling
            </p>
            <p className="font-body-md text-luminary-white/70 text-sm">Gurgaon, India</p>
          </div>
        </a>

        {/* Top right tile */}
        <a href="#" className="md:col-span-2 relative group overflow-hidden min-h-[200px] rounded-2xl active:scale-[0.98] transition-all duration-300">
          <img
            alt="Printed stretch ceiling in luxury bedroom"
            className="w-full h-full object-cover absolute inset-0 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            src="/hero-stretch-ceiling.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-400" />
          <div className="absolute bottom-0 left-0 p-6 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
            <p className="font-headline-md text-xl text-luminary-white mb-1">
              Printed Stretch Ceiling
            </p>
            <p className="font-body-md text-luminary-white/70 text-sm">Delhi, India</p>
          </div>
        </a>

        {/* Bottom middle tile */}
        <a href="#" className="md:col-span-1 relative group overflow-hidden min-h-[200px] rounded-2xl active:scale-[0.98] transition-all duration-300">
          <img
            alt="Glossy finish stretch ceiling"
            className="w-full h-full object-cover absolute inset-0 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            src="/heroimage.webp"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-400" />
          <div className="absolute bottom-0 left-0 p-6 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
            <p className="font-headline-md text-xl text-luminary-white mb-1">
              Glossy Finish
            </p>
            <p className="font-body-md text-luminary-white/70 text-sm">Noida, India</p>
          </div>
        </a>

        {/* Bottom right tile - replacing stat tile */}
        <a href="#" className="md:col-span-1 relative group overflow-hidden min-h-[200px] rounded-2xl active:scale-[0.98] transition-all duration-300">
          <img
            alt="3D stretch ceiling"
            className="w-full h-full object-cover absolute inset-0 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            src="/hero-stretch-ceiling.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-400" />
          <div className="absolute bottom-0 left-0 p-6 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
            <p className="font-headline-md text-xl text-luminary-white mb-1">
              3D Design
            </p>
            <p className="font-body-md text-luminary-white/70 text-sm">Faridabad, India</p>
          </div>
        </a>
      </div>
    </section>
  );
}
