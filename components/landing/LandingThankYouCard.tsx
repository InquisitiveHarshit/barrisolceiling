"use client";
import { CheckCircle, Phone } from "lucide-react";
import Link from "next/link";

export default function LandingThankYouCard() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center gap-5 bg-white">
      {/* Icon */}
      <div className="w-16 h-16 rounded-full bg-[#A82F9D]/10 flex items-center justify-center flex-shrink-0">
        <CheckCircle className="text-[#A82F9D]" size={36} strokeWidth={1.5} />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-[#A82F9D] font-semibold">
          Inquiry Received
        </p>
        <h2 className="text-2xl font-bold text-gray-900 leading-snug">
          Thank You! We'll Be<br />in Touch Shortly.
        </h2>
        <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">
          Our senior architectural lighting engineer has received your request and will contact you shortly to schedule your free on-site survey.
        </p>
      </div>

      {/* Quick actions */}
      <div className="w-full border-t border-black/10 pt-5 flex flex-col gap-3 max-w-xs mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-600 font-mono justify-center">
          <Phone size={14} className="text-[#A82F9D] flex-shrink-0" />
          <span>Need immediate assistance? Call us directly:&nbsp;
            <a href="tel:+919540593079" className="text-[#A82F9D] font-semibold hover:underline">
              +91 95405 93079
            </a>
          </span>
        </div>
      </div>

      {/* Back to main landing page link */}
      <Link
        href="/landing-page"
        className="text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-[#A82F9D] transition-colors underline underline-offset-4 mt-1"
      >
        ← Back to main page
      </Link>
    </div>
  );
}
