"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const WA_NUMBER = "919540593079";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=Hello%2C%20I%27m%20interested%20in%20your%20stretch%20ceiling%20services.`;

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes wa-ping {
          0%   { transform: scale(1);    opacity: 0.7; }
          70%  { transform: scale(1.55); opacity: 0;   }
          100% { transform: scale(1.55); opacity: 0;   }
        }
        .wa-ping { animation: wa-ping 2s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 24 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3"
          >
            {/* Tooltip label */}
            <AnimatePresence>
              {hovered && (
                <motion.span
                  key="tooltip"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.18 }}
                  className="whitespace-nowrap bg-[#111317] border border-white/10 text-white text-xs font-mono tracking-wide px-3 py-2 rounded-sm shadow-xl pointer-events-none"
                >
                  Chat on WhatsApp
                </motion.span>
              )}
            </AnimatePresence>

            {/* Button */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with us on WhatsApp"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="relative flex items-center justify-center w-14 h-14 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
            >
              {/* Pulse ring */}
              <span
                aria-hidden
                className="wa-ping absolute inset-0 rounded-full bg-[#25D366]"
              />
              {/* Button face */}
              <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-[0_6px_32px_-4px_rgba(37,211,102,0.55)] hover:bg-[#20bb5a] transition-colors duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="white"
                  className="w-7 h-7"
                  aria-hidden="true"
                >
                  <path d="M16 2.9A13.1 13.1 0 0 0 3.3 20.2L2 30l10.1-2.6A13.1 13.1 0 1 0 16 2.9zm0 23.9a10.8 10.8 0 0 1-5.5-1.5l-.4-.2-6 1.6 1.6-5.8-.3-.4A10.8 10.8 0 1 1 16 26.8zm5.9-8.1c-.3-.2-1.8-.9-2.1-1s-.5-.1-.7.1-.8 1-1 1.2-.4.2-.7 0a8.6 8.6 0 0 1-2.5-1.6 9.4 9.4 0 0 1-1.7-2.2c-.2-.3 0-.5.1-.7l.5-.6.3-.5v-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.3 3.4c.2.2 2.5 3.8 6 5.3a20.7 20.7 0 0 0 2 .7 4.8 4.8 0 0 0 2.2.1 3.4 3.4 0 0 0 2.2-1.6 2.7 2.7 0 0 0 .2-1.6c-.1-.2-.4-.3-.6-.4z" />
                </svg>
              </span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
