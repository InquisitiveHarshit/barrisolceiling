"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, PenTool, Zap, Phone, Mail,
  CheckCircle, AlertCircle, Loader2
} from "lucide-react";

interface ContactFormProps {
  /** When true, renders a compact modal-friendly layout (no left column) */
  compact?: boolean;
}

export default function ContactForm({ compact = false }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong.");
      }
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to submit. Please try again.");
    }
  };

  const fields = [
    { id: "name",  label: "Full Name",      type: "text",  required: true },
    { id: "email", label: "Email Address",  type: "email", required: true },
    { id: "phone", label: "Phone Number",   type: "tel",   required: false },
  ];

  /* ─── Shared form block (inline, no nested component) ─── */
  const formBlock = (
    <div className={compact ? "" : "bg-luminary-white p-10 shadow-lg"}>
      <h3 className="font-headline-md text-headline-md mb-8 text-[#202124]">
        {compact ? "Book a Free Site Visit" : "Submit Enquiry"}
      </h3>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="flex flex-col items-center justify-center py-12 text-center gap-4"
          >
            <CheckCircle className="text-brand-vibrancy" size={48} strokeWidth={1.5} />
            <p className="font-headline-md text-xl text-[#202124]">Thank you!</p>
            <p className="font-body-md text-on-surface-variant max-w-xs">
              We&apos;ve received your enquiry and will contact you shortly for a
              free site visit.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 text-brand-vibrancy font-label-caps text-sm underline underline-offset-2 hover:opacity-75 transition-opacity"
            >
              Submit another
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-7"
            onSubmit={handleSubmit}
          >
            {fields.map((field) => (
              <div key={field.id} className="relative">
                <input
                  className="block w-full px-0 py-3 bg-transparent border-0 border-b border-outline/30 focus:outline-none focus:border-brand-vibrancy peer text-body-md text-[#202124] transition-colors"
                  id={field.id}
                  placeholder=" "
                  type={field.type}
                  required={field.required}
                  value={form[field.id as keyof typeof form]}
                  onChange={handleChange}
                  disabled={status === "loading"}
                />
                <label
                  className="absolute font-label-caps text-label-caps text-on-surface-variant duration-300 transform -translate-y-5 scale-75 top-3 origin-[0] peer-focus:text-brand-vibrancy peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 transition-all"
                  htmlFor={field.id}
                >
                  {field.label}
                  {field.required && " *"}
                </label>
              </div>
            ))}

            {/* Message */}
            <div className="relative">
              <textarea
                id="message"
                rows={3}
                placeholder=" "
                value={form.message}
                onChange={handleChange}
                disabled={status === "loading"}
                className="block w-full px-0 py-3 bg-transparent border-0 border-b border-outline/30 focus:outline-none focus:border-brand-vibrancy peer text-body-md text-[#202124] transition-colors resize-none"
              />
              <label
                htmlFor="message"
                className="absolute font-label-caps text-label-caps text-on-surface-variant duration-300 transform -translate-y-5 scale-75 top-3 origin-[0] peer-focus:text-brand-vibrancy peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 transition-all"
              >
                Message (optional)
              </label>
            </div>

            {/* Error */}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 text-sm font-body-md"
              >
                <AlertCircle size={16} />
                {errorMsg}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.96, y: 1 }}
              transition={{ type: "spring", duration: 0.15, bounce: 0 }}
              className="w-full bg-brand-gradient text-luminary-white px-6 py-4 font-label-caps text-label-caps mt-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting…
                </>
              ) : compact ? (
                "Book Free Site Visit"
              ) : (
                "Submit Enquiry"
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );

  /* ─── Compact layout (modal) ─── */
  if (compact) {
    return formBlock;
  }

  /* ─── Full page layout ─── */
  return (
    <section id="contact" className="py-section-gap px-5 md:px-16 bg-surface-container-low">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: value props */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
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
              { icon: MapPin,   label: "Free Site Visit" },
              { icon: PenTool,  label: "Custom Design Support" },
              { icon: Zap,      label: "Quick Professional Installation" },
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
        {formBlock}
      </div>
    </section>
  );
}
