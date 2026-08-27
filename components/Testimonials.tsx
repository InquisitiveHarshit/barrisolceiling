"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Berrisol ceiling transformed our living room. The finish is flawless and the installation was immaculate.",
    name: "Rohit Sharma",
    role: "Homeowner",
    location: "Delhi",
    rating: 5,
  },
  {
    quote: "Quick installation and top-notch quality. The team was professional from start to finish. Totally worth it.",
    name: "Anjali Verma",
    role: "Interior Designer",
    location: "Lucknow",
    rating: 4.5,
  },
  {
    quote: "The 3D stretch ceiling design added a stunning modern touch to our corporate office. Our clients are always impressed.",
    name: "Vikas Mehra",
    role: "Business Owner",
    location: "Noida",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-section-gap bg-primary">
      <div className="w-full px-5 md:px-16">
        {/* Split header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-14">
          <h2 className="font-headline-lg text-3xl md:text-4xl text-luminary-white max-w-sm leading-tight">
            What Our Clients Say
          </h2>
          <p className="font-body-md text-primary-fixed-dim max-w-xs text-sm">
            Trusted by homeowners, architects, and businesses across Delhi NCR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", duration: 0.15, bounce: 0 }}
              className="p-8 border border-luminary-white/10 bg-luminary-white/5 backdrop-blur-sm hover:bg-luminary-white/8 transition-colors cursor-default"
            >
              {/* Stars */}
              <div className="flex text-brand-vibrancy mb-5 gap-0.5">
                {Array.from({ length: 5 }, (_, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.25, rotate: 5 }}
                    transition={{ type: "spring", duration: 0.2, bounce: 0.4 }}
                    className="inline-flex"
                  >
                    <Star
                      size={20}
                      className={idx < Math.floor(t.rating) ? "fill-brand-vibrancy text-brand-vibrancy" : "text-brand-vibrancy/30"}
                    />
                  </motion.span>
                ))}
              </div>

              <blockquote className="font-body-lg text-lg text-primary-fixed-dim italic mb-6 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="border-t border-luminary-white/10 pt-4">
                <p className="font-label-caps text-label-caps text-luminary-white">
                  {t.name}
                </p>
                <p className="font-body-md text-sm text-on-secondary-container mt-0.5">
                  {t.role} &middot; {t.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
