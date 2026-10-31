"use client";
import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
  _id?: string;
}

const DEFAULT_FAQS: FaqItem[] = [
  { question: "What is a stretch ceiling and how is it installed in a home?", answer: "A stretch ceiling is a lightweight, high-tensile European membrane suspended beneath your existing ceiling using precision perimeter aluminium tracks. The membrane is gently heated and tensioned into place, creating a flawlessly smooth, crack-free surface without plastering, sanding, or paint fumes. An entire residential room is typically completed in just 1 to 2 days." },
  { question: "How much does a stretch ceiling cost per square foot in India?", answer: "Stretch ceiling prices in India generally range from ₹180 to ₹650+ per square foot depending on the membrane type (glossy lacquer, translucent backlit, acoustic, or printed), room perimeter geometry, and optional lighting systems. Contact us for a free site survey and exact line-item quotation." },
  { question: "Can stretch ceilings handle water leakage from upper floors?", answer: "Yes, stretch ceilings are completely waterproof. In the event of an upstairs plumbing leak, the flexible membrane acts as a protective barrier holding up to 100 litres of water per square metre without tearing. Once the leak is fixed, our team safely drains the trapped water and reheats the membrane to return it to its original pristine tension." },
  { question: "How long do stretch ceilings last and what maintenance is required?", answer: "Stretch ceilings have an operational lifespan of 20+ years and come backed by our 10-year warranty against sagging, peeling, or discoloration. They are anti-static, dust-repellent, and can simply be wiped clean with a microfiber cloth and mild soap solution." },
  { question: "Can ceiling fans, chandeliers, and AC vents be installed with stretch ceilings?", answer: "Yes. Every household fixture — including heavy crystal chandeliers, ceiling fans, recessed downlights, and HVAC linear diffusers — is secured onto specialized structural backing rings installed behind the membrane before tensioning." },
];

export default function LandingFaq({ faqs }: { faqs?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const displayFaqs = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-black/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A82F9D] font-semibold block mb-3">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Stretch Ceiling FAQs
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Find clear answers on costs, installation timelines, durability, and lighting options.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {displayFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq._id || index}
                className={`border transition-colors duration-200 ${isOpen
                    ? "border-[#A82F9D]/40 bg-[#A82F9D]/5"
                    : "border-black/10 bg-gray-50 hover:border-black/20"
                  }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-semibold text-gray-900 leading-snug">
                    {faq.question}
                  </span>
                  <span className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${isOpen ? "border-[#A82F9D]/40 text-[#A82F9D] bg-[#A82F9D]/10" : "border-black/15 text-gray-500"
                    }`}>
                    {isOpen ? <Minus size={15} strokeWidth={2} /> : <Plus size={15} strokeWidth={2} />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-gray-600 leading-relaxed border-t border-black/10 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <div className="mt-12 text-center pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-9 h-9 rounded-full bg-[#A82F9D]/10 border border-[#A82F9D]/20 flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4 text-[#A82F9D]" />
            </div>
            <div>
              <p className="text-sm text-gray-900 font-semibold">Have a specific question about your home ceiling?</p>
              <p className="text-xs text-gray-500">Speak with our technical engineering team directly.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 bg-[#A82F9D] hover:bg-[#8f2284] border border-[#A82F9D] text-white font-mono text-xs uppercase tracking-wider transition-colors shrink-0"
          >
            Ask an Expert
          </a>
        </div>

      </div>
    </section>
  );
}
