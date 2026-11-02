"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import LandingContactForm from "./LandingContactForm";

export const openLandingModal = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-landing-modal"));
  }
};

export default function LandingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. Listen for manual trigger from buttons (e.g. "GET QUOTE →")
    const handleManualOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-landing-modal", handleManualOpen);

    // If dismissed in this page view, do not auto-open again in loop
    if (hasDismissed) {
      return () => {
        window.removeEventListener("open-landing-modal", handleManualOpen);
      };
    }

    // 2. Automatically open 7 seconds after page load
    timerRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 7000);

    return () => {
      window.removeEventListener("open-landing-modal", handleManualOpen);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [hasDismissed]);

  const handleClose = () => {
    setIsOpen(false);
    setHasDismissed(true);
  };

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="landing-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs"
          onClick={handleClose}
        >
          <motion.div
            key="landing-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white border border-black/15 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90dvh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-gray-900 transition-colors border border-black/10 hover:border-black/30 bg-gray-50"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-5 pb-4 border-b border-black/10 pr-8">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#A82F9D] font-semibold mb-1">
                Special Consultation
              </p>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                Book a Free Site Survey
              </h2>
              <p className="text-xs text-gray-600 mt-1">
                Our lighting engineers will audit your space and provide physical membrane lookbooks with zero obligation.
              </p>
            </div>

            {/* Form */}
            <LandingContactForm
              formTrackingName="landing_popup_modal"
              onSuccess={() => {
                setHasDismissed(true);
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
