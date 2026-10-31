import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export default function LandingAbout() {
  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gray-50 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Image */}
          <div className="relative h-[380px] md:h-[460px] w-full overflow-hidden border border-black/15 shadow-lg">
            <Image
              alt="Professional installing a premium stretch ceiling"
              fill
              className="object-cover"
              src="/hero-stretch-ceiling.webp"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A82F9D] font-semibold block mb-3">
                India Atelier
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Leading Stretch Ceiling Experts with 10+ Years Experience
              </h2>
            </div>

            <p className="text-base text-gray-600 leading-relaxed">
              We are premier stretch ceiling contractors in India, specializing in European stretch
              membranes and custom technical lighting solutions for luxury residential and commercial spaces.
            </p>

            <ul className="space-y-3.5 pt-2">
              {[
                "1000+ successful installations across India",
                "European BS EN 14716 & DIN 4102-B1 fire certified membranes",
                "Custom photometric design support with on-site laser survey",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-[#A82F9D]/10 border border-[#A82F9D]/30 flex-shrink-0 flex items-center justify-center">
                    <Check size={12} className="text-[#A82F9D]" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-black/20 text-gray-900 hover:border-[#A82F9D] hover:text-[#A82F9D] hover:bg-[#A82F9D]/5 text-xs font-mono uppercase tracking-[0.15em] transition-all font-semibold"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
