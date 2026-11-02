"use client";
import React, { useState } from "react";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { trackFormSubmission } from "@/lib/gtag";

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
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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

      trackFormSubmission(formTrackingName);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
        <CheckCircle className="text-[#A82F9D]" size={44} strokeWidth={1.5} />
        <p className="text-xl font-semibold text-gray-900">Thank you!</p>
        <p className="text-sm text-gray-500 max-w-xs">
          We&apos;ve received your inquiry. Our team will reach out shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-3 text-[#A82F9D] text-xs uppercase tracking-wider underline underline-offset-2 hover:opacity-75 transition-opacity"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
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
  );
}
