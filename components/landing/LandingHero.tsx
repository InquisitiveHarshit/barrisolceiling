import Image from "next/image";
import LandingContactForm from "./LandingContactForm";

const stats = [
  { value: "1,000+", label: "Projects Delivered" },
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Design Finishes" },
  { value: "100%", label: "Warranty Assured" },
];

export default function LandingHero() {
  return (
      <section className="relative overflow-hidden border-b border-black/10 min-h-[640px] flex items-center bg-gray-50">
        {/* ── Complete Background Image ── */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/Berrisol.webp"
            alt="Berrisol Stretch Ceiling Interior"
            fill
            priority
            className="object-cover object-right md:object-center"
            sizes="100vw"
          />
          {/* Soft, clean directional tint so ceiling is crisp and text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent pointer-events-none" />
        </div>

            {/* ── Hero Content (NO LOGO in Hero) ── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

                  {/* Left Column: Exactly matches uploaded image */}
                  <div className="lg:col-span-7 flex flex-col gap-6">

                    {/* Main Heading matching the uploaded image */}
                    <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-gray-950 leading-[1.12] tracking-tight">
                      Transform Your<br />
                      Spaces with Premium<br />
                      <span className="text-[#A82F9D]">Stretch Ceiling Solutions</span>
                    </h1>

                    {/* Subtitle matching the uploaded image */}
                    <p className="text-base sm:text-lg text-gray-800 leading-relaxed max-w-xl font-normal">
                      Discover innovative ceiling solutions for homes, offices, commercial spaces and architectural projects.
                    </p>

                    {/* CTA matching the uploaded image text */}
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 bg-[#A82F9D] hover:bg-[#8f2284] text-white px-7 py-3.5 text-sm font-semibold transition-colors self-start shadow-sm hover:shadow rounded-xs"
                    >
                      Explore Solutions →
                    </a>

            {/* Stats row */ }
                        < div className = "grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-black/15 max-w-xl" >
                        {
                          stats.map((s) => (
                            <div key={s.label} className="flex flex-col bg-white/80 p-2.5 border border-black/10 shadow-xs rounded-xs">
                              <span className="text-2xl font-bold text-[#A82F9D]">{s.value}</span>
                              <span className="text-xs text-gray-600 font-medium leading-tight mt-0.5">{s.label}</span>
                            </div>
                          ))
                        }
                  </div>

                </div>

                {/* Right Column: Embedded Contact Form Card (5 cols) */}
                <div
                  id="contact"
                  className="lg:col-span-5 bg-white border border-black/15 p-6 sm:p-8 shadow-xl rounded-xs"
                >
                  <div className="mb-6 pb-4 border-b border-black/10">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#A82F9D] font-semibold mb-1">
                      Free Consultation
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Book a Free Site Survey
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Our architectural lighting engineer visits your site — no obligation.
                    </p>
                  </div>
                  <LandingContactForm />
                </div>

        </div>
      </div>
    </section>
  );
}
