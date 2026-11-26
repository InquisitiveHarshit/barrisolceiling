"use client";
import React from "react";
import { CheckCircle } from "lucide-react";

interface PageTransitionCurtainProps {
  active: boolean;
}

export default function PageTransitionCurtain({ active }: PageTransitionCurtainProps) {
  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-auto flex flex-col items-center justify-center bg-[#2e0b2b] text-white overflow-hidden animate-curtain-up"
      style={{
        boxShadow: "0 -20px 50px rgba(0,0,0,0.5)",
      }}
    >
      {/* Decorative Brand Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(168,47,157,0.35)_0%,_rgba(15,10,18,0.95)_100%)] pointer-events-none" />

      {/* Center Animated Badge & Text */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 gap-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full bg-[#A82F9D]/30 animate-ping duration-1000" />
          <div className="relative w-18 h-18 rounded-full bg-[#A82F9D]/20 border border-[#A82F9D]/50 flex items-center justify-center backdrop-blur-md">
            <CheckCircle className="text-[#f59be8]" size={40} strokeWidth={2} />
          </div>
        </div>

        <div className="space-y-2 max-w-sm">
          <span className="text-[11px] font-mono tracking-[0.28em] uppercase text-[#f59be8] font-bold">
            Request Received
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Thank you!
          </h2>
          <p className="text-sm text-gray-300 font-light">
            Preparing your inquiry confirmation...
          </p>
        </div>

        {/* Minimal progress loader */}
        <div className="w-36 h-1 bg-white/10 rounded-full overflow-hidden mt-3">
          <div className="h-full bg-gradient-to-r from-[#A82F9D] to-[#f59be8] rounded-full animate-curtain-up w-full" />
        </div>
      </div>
    </div>
  );
}
