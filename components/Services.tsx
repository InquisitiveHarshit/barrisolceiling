"use client";
import { motion } from "framer-motion";
import { Sun, Box, VolumeX, ArrowRight } from "lucide-react";

const services = [
  {
    category: "LIGHTING",
    title: "Stretch Ceiling Lights",
    description:
      "Advanced LED technology integrated directly into stretch ceilings for smooth, even illumination across any room size. Perfect for living rooms, offices, and commercial spaces.",
    image: "/heroimage.webp",
    icon: Sun,
  },
  {
    category: "ARCHITECTURAL",
    title: "3D Stretch Ceilings",
    description:
      "Architectural ceiling solutions that create breathtaking depth and dimension, turning ordinary rooms into extraordinary spaces with custom contoured forms.",
    image: "/hero-stretch-ceiling.jpg",
    icon: Box,
  },
  {
    category: "PERFORMANCE",
    title: "Acoustic Solutions",
    description:
      "High-performance acoustic ceilings engineered to reduce noise, control echoes, and dramatically improve sound quality in any environment.",
    image: "/heroimage.webp",
    icon: VolumeX,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-section-gap px-5 md:px-16 bg-surface-container-low">
      <div className="max-w-container-max mx-auto">

        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-end">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-headline-lg text-3xl md:text-4xl lg:text-5xl text-[#202124] leading-tight"
          >
            Transforming Spaces with Elegant Designs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="font-body-md text-body-md text-on-surface-variant max-w-prose"
          >
            We provide premium stretch ceiling installations and custom lighting solutions,
            delivering seamless finishes and tailored ambient lighting for every project.
          </motion.p>
        </div>

        {/* Linear rows */}
        <div className="flex flex-col divide-y divide-outline/10">
          {services.map((service, i) => {
            const Icon = service.icon;
            const reversed = i % 2 !== 0;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-0 group ${reversed ? "md:[direction:rtl]" : ""}`}
              >
                {/* Image */}
                <div className="overflow-hidden h-[300px] md:h-[380px]" style={{ direction: "ltr" }}>
                  <img
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={service.image}
                  />
                </div>

                {/* Text */}
                <div
                  className="bg-luminary-white flex flex-col justify-center px-10 py-12"
                  style={{ direction: "ltr" }}
                >
                  <span className="font-label-caps text-[10px] tracking-wider text-brand-vibrancy mb-4 block">
                    {service.category}
                  </span>
                  <div className="flex items-center gap-3 mb-4">
                    <Icon size={20} className="text-brand-vibrancy" strokeWidth={2} />
                    <h3 className="font-headline-md text-2xl text-[#202124]">
                      {service.title}
                    </h3>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed max-w-md">
                    {service.description}
                  </p>
                  <a
                    className="font-label-caps text-label-caps text-brand-vibrancy inline-flex items-center gap-2 hover:gap-3 transition-all self-start"
                    href="/services"
                  >
                    Explore Service
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
