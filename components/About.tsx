"use client";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function About() {
  return (
    <section id="about" className="py-section-gap">
      <div className="w-full px-5 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image — leads the section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="relative h-[400px] md:h-[480px] lg:h-[560px] w-full overflow-hidden"
        >
          <img
            alt="Professional installing a premium stretch ceiling"
            className="w-full h-full object-cover"
            src="/hero-stretch-ceiling.jpg"
          />
          {/* Accent block */}
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-brand-gradient text-luminary-white px-5 py-4 md:px-6 md:py-5 max-w-[160px] md:max-w-[200px]">
            <p className="font-display-lg-mobile text-2xl md:text-3xl font-bold mb-1">10+</p>
            <p className="font-label-caps text-label-caps text-[9px] md:text-[10px] text-primary-fixed-dim">
              Years of Industry Experience
            </p>
          </div>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="font-headline-lg text-3xl md:text-4xl lg:text-5xl text-[#202124] leading-tight"
          >
            Leading Stretch Ceiling Experts in Delhi
          </motion.h2>

          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="font-body-md text-body-md text-on-surface-variant leading-relaxed"
          >
            We are one of the most trusted false ceiling contractors in Delhi, specializing
            in advanced stretch ceiling and modern ceiling solutions for residential and
            commercial spaces. Our strong portfolio and decade of experience speak for
            the quality we deliver.
          </motion.p>

          <motion.ul
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="space-y-4"
          >
            {[
              "1000+ successful installations across Delhi NCR",
              "Premium European PVC & fabric materials",
              "Custom design support with free site visits",
            ].map((item) => (
              <li key={item} className="flex items-start gap-4">
                <span className="mt-1 w-5 h-5 bg-brand-vibrancy/10 border border-brand-vibrancy/30 flex-shrink-0 flex items-center justify-center">
                  <Check size={14} className="text-brand-vibrancy" strokeWidth={3} />
                </span>
                <span className="font-body-md text-body-md text-[#202124]">{item}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97, y: 1 }}
              className="border border-primary text-primary px-8 py-4 font-label-caps text-label-caps hover:bg-primary hover:text-luminary-white transition-all duration-300"
            >
              Learn More About Us
            </motion.button>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
}
