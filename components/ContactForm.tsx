"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, PenTool, Zap, Phone, Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ContactFormProps {
  compact?: boolean;
}

export default function ContactForm({ compact = false }: ContactFormProps) {
  const [form, setForm]       = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res  = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Something went wrong.");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to submit. Please try again.");
    }
  };

  const fields = [
    { id: "name",  label: "Full Name",     type: "text",  required: true  },
    { id: "email", label: "Email Address", type: "email", required: true  },
    { id: "phone", label: "Phone Number",  type: "tel",   required: false },
  ];

  const formBlock = (
    <div className={compact ? "" : "bg-[#111317] border border-white/10 p-6 sm:p-10 shadow-2xl rounded-xs"}>
      <h3 className="text-2xl sm:text-3xl text-white font-serif mb-8 font-normal">
        {compact ? "Book a Free Site Visit" : "Commissioning Inquiry Dossier"}
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
            <CheckCircle className="text-[#A62681]" size={48} strokeWidth={1.5} />
            <p className="text-xl text-white font-serif">Thank you!</p>
            <p className="text-sm text-[#8E94A0] max-w-xs font-light">
              We've received your inquiry. Our senior architectural lighting engineer will contact you shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-4 text-[#A62681] font-mono text-xs uppercase tracking-wider underline underline-offset-2 hover:opacity-75 transition-opacity"
            >
              Submit another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {fields.map((field) => (
              <div key={field.id} className="relative">
                <input
                  className="block w-full px-0 py-3 bg-transparent border-0 border-b border-white/20 focus:outline-none focus:border-[#A62681] peer text-sm text-white transition-colors"
                  id={field.id}
                  placeholder=" "
                  type={field.type}
                  required={field.required}
                  value={form[field.id as keyof typeof form]}
                  onChange={handleChange}
                  disabled={status === "loading"}
                />
                <label
                  className="absolute font-mono text-xs uppercase tracking-wider text-[#8E94A0] duration-300 transform -translate-y-5 scale-75 top-3 origin-[0] peer-focus:text-[#A62681] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 transition-all pointer-events-none"
                  htmlFor={field.id}
                >
                  {field.label}{field.required && " *"}
                </label>
              </div>
            ))}

            <div className="relative">
              <textarea
                id="message"
                rows={3}
                placeholder=" "
                value={form.message}
                onChange={handleChange}
                disabled={status === "loading"}
                className="block w-full px-0 py-3 bg-transparent border-0 border-b border-white/20 focus:outline-none focus:border-[#A62681] peer text-sm text-white transition-colors resize-none"
              />
              <label
                htmlFor="message"
                className="absolute font-mono text-xs uppercase tracking-wider text-[#8E94A0] duration-300 transform -translate-y-5 scale-75 top-3 origin-[0] peer-focus:text-[#A62681] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 transition-all pointer-events-none"
              >
                Message (optional)
              </label>
            </div>

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm font-mono"
              >
                <AlertCircle size={16} />
                {errorMsg}
              </motion.div>
            )}

            <button
              className="w-full bg-gradient-to-r from-[#6A2C91] to-[#A62681] hover:from-[#7B2CBF] hover:to-[#B52C94] text-white px-6 py-4 font-mono text-xs uppercase tracking-[0.2em] font-semibold mt-4 transition-all shadow-[0_0_20px_rgba(166,38,129,0.35)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed rounded-xs"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <><Loader2 size={18} className="animate-spin" /> Submitting Request…</>
              ) : compact ? "Book Free Site Visit" : "Submit Technical Request"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );

  if (compact) return formBlock;

  return (
    <section
      id="consultation"
      className="py-16 sm:py-24 px-4 sm:px-8 bg-[#0C0E12] border-b border-white/10"
    >
      <div className="max-w-[94rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start">

        {/* Left */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A62681] font-semibold">
            Specifier Engagement
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-serif font-normal leading-tight">
            Request Technical Site Survey &amp; Lighting Consultation
          </h2>
          <p className="text-sm text-[#8E94A0] leading-relaxed font-light">
            We consult directly with private homeowners, principal architects, interior designers,
            and MEP contractors across Delhi NCR. Schedule an on-site spatial audit and membrane
            sample inspection.
          </p>

          <ul className="space-y-4 pt-4 border-t border-white/10">
            {[
              { icon: MapPin,   label: "On-site laser spatial measurement & plenum audit" },
              { icon: PenTool,  label: "Physical material lookbook: Lacquer, Translucent, Micro-perf" },
              { icon: Zap,      label: "LED lux calculations & circadian CCT layout" },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#A62681]/20 flex items-center justify-center flex-shrink-0 text-[#A62681]">
                  <item.icon size={16} />
                </div>
                <span className="text-xs font-mono text-[#D8DCE3]">{item.label}</span>
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3 font-mono text-xs">
            <a href="tel:+919540593079" className="flex items-center gap-2 text-[#A62681] hover:text-white transition-colors">
              <Phone size={14} /> +91 9540593079
            </a>
            <a href="mailto:info@barrisolceiling.com" className="flex items-center gap-2 text-[#A62681] hover:text-white transition-colors">
              <Mail size={14} /> info@barrisolceiling.com
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-7">{formBlock}</div>
      </div>
    </section>
  );
}
