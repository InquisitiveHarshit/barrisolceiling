"use client";
import React, { useState } from "react";
import {
  Home, Hotel, Building2, ShoppingBag, ShieldCheck,
  Film, UtensilsCrossed, School, Dumbbell, Landmark,
} from "lucide-react";

const INDUSTRIES = [
  { icon: Home,           label: "Luxury Residences"      },
  { icon: Hotel,          label: "Hotels & Resorts"        },
  { icon: Building2,      label: "Corporate Offices"       },
  { icon: ShoppingBag,    label: "Retail & Showrooms"      },
  { icon: ShieldCheck,    label: "Healthcare & Clinics"    },
  { icon: Film,           label: "Cinemas & Auditoriums"   },
  { icon: UtensilsCrossed,label: "Restaurants & Cafes"     },
  { icon: School,         label: "Schools & Institutes"    },
  { icon: Dumbbell,       label: "Gyms & Wellness"         },
  { icon: Landmark,       label: "Banks & Institutions"    },
];

export default function LandingIndustries() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="industries" className="py-16 sm:py-20 lg:py-24 bg-gray-50 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 sm:pb-12 border-b border-black/10 mb-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A82F9D] font-semibold block mb-3">
              Sectors &amp; Applications
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Industries We Serve
            </h2>
          </div>
          <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
            Delivering precision stretch ceiling solutions across every sector — residential to commercial.
          </p>
        </div>

        {/* Icon Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 divide-x divide-y divide-black/10 border border-black/10">
          {INDUSTRIES.map((ind, idx) => {
            const Icon = ind.icon;
            const isActive = active === idx;
            return (
              <div
                key={ind.label}
                onMouseEnter={() => setActive(idx)}
                onMouseLeave={() => setActive(null)}
                className={`group flex flex-col items-center justify-center gap-4 py-10 px-6 cursor-default transition-all duration-200 ${
                  isActive
                    ? "bg-[#A82F9D]/5"
                    : "bg-white hover:bg-gray-50"
                }`}
                style={isActive ? { boxShadow: "inset 0 0 0 1px #A82F9D" } : undefined}
              >
                <Icon
                  className={`w-8 h-8 transition-colors duration-200 ${
                    isActive ? "text-[#A82F9D]" : "text-gray-400 group-hover:text-gray-600"
                  }`}
                  strokeWidth={1.5}
                />
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.18em] text-center leading-tight transition-colors duration-200 ${
                    isActive ? "text-[#A82F9D] font-semibold" : "text-gray-500 group-hover:text-gray-700"
                  }`}
                >
                  {ind.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
