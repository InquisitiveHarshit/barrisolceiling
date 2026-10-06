"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: FaqItem[];
  /** "dark" = service page dark bg, "light" = blog page light bg */
  theme?: "dark" | "light";
  heading?: string;
  subheading?: string;
  /** Canonical URL used in the schema @id */
  pageUrl?: string;
}

export default function FaqSection({
  faqs,
  theme = "dark",
  heading = "Frequently Asked Questions",
  subheading = "Everything you need to know",
  pageUrl = "",
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  const isDark = theme === "dark";

  // ── JSON-LD FAQPage schema ──────────────────────────────────────────────────
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl ? { "@id": pageUrl } : {}),
    mainEntity: faqs.map((faq) => ({
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
      {/* Inject FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      <section
        className={`py-10 sm:py-20 lg:py-24 ${
          isDark
            ? "bg-[#0C0E12] border-t border-white/10"
            : "bg-[#F7F7F9] border-t border-zinc-200"
        }`}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          {/* Header */}
          <div className="mb-10 sm:mb-14 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] font-semibold block mb-3 text-[#A62681]">
              {subheading}
            </span>
            <h2
              className={`font-serif text-3xl sm:text-4xl ${
                isDark ? "text-white" : "text-[#111317]"
              }`}
            >
              {heading}
            </h2>
          </div>

          {/* Accordion */}
          <div
            className={`flex flex-col divide-y ${
              isDark ? "divide-white/10" : "divide-zinc-200"
            }`}
          >
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className={`w-full flex items-start justify-between gap-4 py-5 text-left transition-colors group ${
                      isDark
                        ? "text-white hover:text-[#E4B5FF]"
                        : "text-[#111317] hover:text-[#A62681]"
                    }`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="font-sans text-base sm:text-lg font-medium leading-snug pr-2">
                      {faq.question}
                    </span>
                    <span
                      className={`shrink-0 mt-0.5 w-7 h-7 rounded-full flex items-center justify-center border transition-colors ${
                        isDark
                          ? isOpen
                            ? "bg-[#A62681] border-[#A62681] text-white"
                            : "border-white/20 text-white/50 group-hover:border-[#A62681]/60"
                          : isOpen
                          ? "bg-[#A62681] border-[#A62681] text-white"
                          : "border-zinc-300 text-zinc-400 group-hover:border-[#A62681]/60"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" />
                      ) : (
                        <Plus className="w-3.5 h-3.5" />
                      )}
                    </span>
                  </button>

                  {/* Answer — smooth height animation via max-height trick */}
                  <div
                    id={`faq-answer-${i}`}
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? "600px" : "0px" }}
                    aria-hidden={!isOpen}
                  >
                    <p
                      className={`pb-5 text-sm sm:text-base leading-relaxed font-light ${
                        isDark ? "text-[#8E94A0]" : "text-zinc-600"
                      }`}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
