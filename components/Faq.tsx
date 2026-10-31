"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import Link from "next/link";

export interface FaqItem {
  question: string;
  answer: string;
  _id?: string;
}

const DEFAULT_HOME_FAQS: FaqItem[] = [
  {
    question: "What is a stretch ceiling and how is it installed in a home?",
    answer:
      "A stretch ceiling is a lightweight, high-tensile European membrane suspended beneath your existing ceiling using precision perimeter aluminium tracks. The membrane is gently heated and tensioned into place, creating a flawlessly smooth, crack-free surface without plastering, sanding, or paint fumes. An entire residential room is typically completed in just 1 to 2 days.",
  },
  {
    question: "How much does a stretch ceiling cost per square foot in India?",
    answer:
      "Stretch ceiling prices in India generally range from ₹180 to ₹650+ per square foot depending on the membrane type (glossy lacquer, translucent backlit, acoustic, or printed), room perimeter geometry, and optional lighting systems such as starlight fiber optics or tunable white LED backlighting. Contact us for a free site survey and exact line-item quotation.",
  },
  {
    question: "Can stretch ceilings handle water leakage from upper floors?",
    answer:
      "Yes, stretch ceilings are completely waterproof. In the event of an upstairs plumbing leak, the flexible membrane acts as a protective barrier holding up to 100 litres of water per square metre without tearing. Once the leak is fixed, our team safely drains the trapped water and reheats the membrane to return it to its original pristine tension.",
  },
  {
    question: "How long do stretch ceilings last and what maintenance is required?",
    answer:
      "Stretch ceilings have an operational lifespan of 20+ years and come backed by our 10-year warranty against sagging, peeling, or discoloration. Unlike conventional POP or drywall that cracks and requires periodic repainting, stretch ceilings are anti-static, dust-repellent, and can simply be wiped clean with a microfiber cloth and mild soap solution.",
  },
  {
    question: "Can ceiling fans, chandeliers, and AC vents be installed with stretch ceilings?",
    answer:
      "Yes. Every household fixture—including heavy crystal chandeliers, ceiling fans, recessed downlights, magnetic track lights, smoke detectors, and HVAC linear diffusers—is secured onto specialized structural backing rings installed behind the membrane before tensioning. All penetrations are reinforced with heat-welded polycarbonate rings.",
  },
  {
    question: "Are stretch ceilings safe and fire-certified for bedrooms and living rooms?",
    answer:
      "Yes. All Berrisol membranes are certified European BS EN 14716 and DIN 4102-B1 fire retardant (Class 1 / Class M1 self-extinguishing). They emit zero toxic VOCs (A+ rating), are 100% moisture-proof, and resist mold, mildew, and bacteria—making them safe for bedrooms, children's nurseries, and home theaters.",
  },
  {
    question: "How does a Starlight or Backlit stretch ceiling work in a home?",
    answer:
      "Backlit ceilings feature uniform LED matrix lighting positioned above a translucent membrane, diffusing uniform shadow-free light across the room with dimming and tunable white controls. For Starlight ceilings, individual optical fiber filaments are embedded into acoustic or dark lacquer membranes, creating realistic constellations, twinkling effects, and shooting stars.",
  },
];

export default function Faq({ faqs }: { faqs?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const displayFaqs = faqs && faqs.length > 0 ? faqs : DEFAULT_HOME_FAQS;

  // JSON-LD structured data for FAQPage SEO
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: displayFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      <section
        id="faq"
        className="py-10 sm:py-20 lg:py-24 bg-[#0C0E12] text-[#E2E2E6] border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A62681] dark:text-[#E4B5FF] font-semibold block mb-3">
              Home Section FAQs
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-serif font-normal mb-4">
              Stretch Ceiling FAQs for Home
            </h2>
            <p className="text-sm sm:text-base text-[#8E94A0] font-light max-w-xl mx-auto leading-relaxed">
              Find clear answers on costs, installation timelines, durability, and lighting options for residential stretch ceiling projects.
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-3.5">
            {displayFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq._id || index}
                  className={`border transition-colors duration-200 ${
                    isOpen
                      ? "border-[#A62681]/50 bg-white/[0.04]"
                      : "border-white/10 bg-[#07090E] hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
                    aria-expanded={isOpen}
                  >
                    <span className="font-sans text-sm sm:text-base font-normal text-white leading-snug">
                      {faq.question}
                    </span>
                    <span className="shrink-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#E4B5FF] transition-colors">
                      {isOpen ? (
                        <Minus size={15} strokeWidth={2} />
                      ) : (
                        <Plus size={15} strokeWidth={2} />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#8E94A0] font-light leading-relaxed border-t border-white/10 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Help callout */}
          <div className="mt-12 text-center pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-full bg-[#A62681]/15 border border-[#A62681]/30 flex items-center justify-center shrink-0">
                <HelpCircle className="w-4 h-4 text-[#E4B5FF]" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-white font-medium">Have a specific question about your home ceiling?</p>
                <p className="text-[11px] text-[#8E94A0] font-light">Speak with our technical engineering team directly.</p>
              </div>
            </div>

            <Link
              href="#contact"
              className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-wider rounded transition-colors shrink-0"
            >
              Ask an Expert
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
