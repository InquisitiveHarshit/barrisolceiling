"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import PageTransitionCurtain from "./PageTransitionCurtain";


interface LandingContactFormProps {
  formTrackingName?: string;
  onSuccess?: () => void;
}

const DEFAULT_AUTOMATED_MESSAGE =
  "I am interested in Stretch Ceiling installation and lighting consultation for my space.";

export default function LandingContactForm({
  formTrackingName = "landing_page_hero_form",
  onSuccess,
}: LandingContactFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    // Automated default message if user leaves the message box empty
    const messageToSend = form.message.trim() || DEFAULT_AUTOMATED_MESSAGE;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      message: messageToSend,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Something went wrong.");

      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      if (onSuccess) onSuccess();

      // Trigger full-screen slide transition up
      setIsTransitioning(true);

      // Smooth handoff to /landing-page/thankyou matching the slide duration
      setTimeout(() => {
        router.push("/landing-page/thankyou");
      }, 700);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <>
        {/* Full-screen cinematic slide-up curtain */}
        <PageTransitionCurtain active={isTransitioning} />

        <div className="flex flex-col items-center justify-center py-12 px-4 text-center gap-4 animate-in fade-in zoom-in-95 duration-500 ease-out">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-20 h-20 bg-[#A82F9D]/15 rounded-full animate-ping duration-1000 opacity-75" />
            <div className="relative w-16 h-16 rounded-full bg-[#A82F9D]/10 border border-[#A82F9D]/20 flex items-center justify-center shadow-inner">
              <CheckCircle className="text-[#A82F9D] animate-in zoom-in-75 duration-300" size={36} strokeWidth={2} />
            </div>
          </div>

          <div className="space-y-1.5 animate-in slide-in-from-bottom-2 duration-500">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#A82F9D] font-semibold">
              Inquiry Sent
            </p>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              Thank you! Redirecting...
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
              Taking you to the confirmation page...
            </p>
          </div>

          {/* Micro progress indicator */}
          <div className="w-28 h-1 bg-gray-100 rounded-full overflow-hidden mt-1">
            <div className="h-full bg-[#A82F9D] rounded-full animate-pulse transition-all duration-700 w-full" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageTransitionCurtain active={isTransitioning} />
      <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { id: "name", label: "Full Name *", type: "text" },
        { id: "email", label: "Email Address *", type: "email" },
        { id: "phone", label: "Phone Number *", type: "tel" },
      ].map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
            {field.label}
          </label>
          <input
            id={field.id}
            type={field.type}
            required
            value={form[field.id as keyof typeof form]}
            onChange={handleChange}
            disabled={status === "loading"}
            className="w-full px-3.5 py-2.5 bg-white border border-black/20 text-gray-900 text-sm focus:outline-none focus:border-[#A82F9D] transition-colors placeholder-gray-400"
            placeholder={field.label.replace(" *", "")}
          />
        </div>
      ))}

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
          Message / Requirement
        </label>
        <textarea
          id="message"
          rows={3}
          value={form.message}
          onChange={handleChange}
          disabled={status === "loading"}
          className="w-full px-3.5 py-2.5 bg-white border border-black/20 text-gray-900 text-sm focus:outline-none focus:border-[#A82F9D] transition-colors resize-none placeholder-gray-400"
          placeholder="Tell us about your project…"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#A82F9D] hover:bg-[#8f2284] text-white px-6 py-3.5 text-xs font-semibold uppercase tracking-widest border border-[#A82F9D] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow"
      >
        {status === "loading" ? (
          <><Loader2 size={18} className="animate-spin" /> Submitting…</>
        ) : (
          "Get Free Site Survey"
        )}
      </button>
    </form>
    </>
  );
}
