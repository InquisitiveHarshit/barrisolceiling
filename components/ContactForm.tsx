"use client";
import { motion } from "framer-motion";
import { MapPin, PenTool, Zap, Phone, Mail } from "lucide-react";

export default function ContactForm() {
  return (
    <section id="contact" className="py-section-gap px-5 md:px-16 bg-surface-container-low">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: value props */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-headline-lg text-3xl md:text-4xl lg:text-5xl text-[#202124] mb-6 leading-tight">
            Get a Free Consultation
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-md">
            Upgrade your interiors with Delhi&apos;s finest stretch ceiling experts.
            Contact us today for a free site visit and custom quote.
          </p>

          <ul className="space-y-5">
            {[
              { icon: MapPin, label: "Free Site Visit" },
              { icon: PenTool, label: "Custom Design Support" },
              { icon: Zap, label: "Quick Professional Installation" },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-vibrancy/10 border border-brand-vibrancy/20 flex items-center justify-center flex-shrink-0">
                  {(() => {
                    const Icon = item.icon;
                    return <Icon className="text-brand-vibrancy" size={18} />;
                  })()}
                </div>
                <span className="font-body-md text-body-md text-[#202124]">{item.label}</span>
              </li>
            ))}
          </ul>

          {/* Contact info */}
          <div className="mt-12 pt-8 border-t border-outline/10">
            <a
              href="tel:+919540593079"
              className="flex items-center gap-3 font-body-lg text-brand-vibrancy hover:text-brand-vibrancy-dark transition-colors mb-3"
            >
              <Phone size={20} className="fill-brand-vibrancy" />
              +91 9540593079
            </a>
            <a
              href="mailto:info@barrisolceiling.com"
              className="flex items-center gap-3 font-body-md text-on-surface-variant hover:text-brand-vibrancy transition-colors"
            >
              <Mail size={20} className="fill-on-surface-variant" />
              info@barrisolceiling.com
            </a>
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="bg-luminary-white p-10 shadow-lg"
        >
          <h3 className="font-headline-md text-headline-md mb-8 text-[#202124]">
            Submit Enquiry
          </h3>
          <form className="space-y-7">
            {[
              { id: "name", label: "Full Name", type: "text" },
              { id: "email", label: "Email Address", type: "email" },
              { id: "phone", label: "Phone Number", type: "tel" },
            ].map((field) => (
              <div key={field.id} className="relative">
                <input
                  className="block w-full px-0 py-3 bg-transparent border-0 border-b border-outline/30 focus:outline-none focus:border-brand-vibrancy peer text-body-md text-[#202124] transition-colors"
                  id={field.id}
                  placeholder=" "
                  type={field.type}
                />
                <label
                  className="absolute font-label-caps text-label-caps text-on-surface-variant duration-300 transform -translate-y-5 scale-75 top-3 origin-[0] peer-focus:text-brand-vibrancy peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 transition-all"
                  htmlFor={field.id}
                >
                  {field.label}
                </label>
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.96, y: 1 }}
              transition={{ type: "spring", duration: 0.15, bounce: 0 }}
              className="w-full bg-brand-gradient text-luminary-white px-6 py-4 font-label-caps text-label-caps mt-4 shadow-sm hover:shadow-md transition-shadow"
              type="submit"
            >
              Submit Enquiry
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
