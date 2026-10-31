import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Service {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  shortDescription?: string;
  coverImage?: string;
  tags?: string[];
}

interface LandingServicesProps {
  services: Service[];
}

const padIdx = (n: number) => String(n + 1).padStart(2, "0");

export default function LandingServices({ services }: LandingServicesProps) {
  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-black/10 mb-2">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A82F9D] font-semibold block mb-3">
              Our Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Our Services
            </h2>
          </div>
          <Link
            href="/service"
            className="group/cta inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest font-semibold text-gray-900 hover:text-[#A82F9D] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Explore All Services</span>
            <span className="inline-flex items-center justify-center w-9 h-9 border border-black/20 group-hover/cta:border-[#A82F9D] group-hover/cta:bg-[#A82F9D]/5 transition-all">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* Service rows */}
        <div className="divide-y divide-black/10">
          {services.map((service, idx) => (
            <Link key={service._id} href={`/service-detail/${service.slug}`} className="block group">
              <article className="py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">

                {/* Index number */}
                <div className="lg:col-span-1 flex lg:flex-col items-center lg:items-start gap-3">
                  <span className="font-mono text-5xl sm:text-6xl font-black leading-none text-[#A82F9D]/20 group-hover:text-[#A82F9D]/50 transition-colors">
                    {padIdx(idx)}
                  </span>
                </div>

                {/* Text */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                  {service.category && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-400">
                      {service.category}
                    </span>
                  )}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-[#A82F9D] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  {service.shortDescription && (
                    <p className="text-sm text-gray-500 leading-relaxed">{service.shortDescription}</p>
                  )}
                  {service.tags && service.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {service.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-black/15 bg-gray-50 text-gray-600 group-hover:border-[#A82F9D]/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider pt-2 w-fit font-semibold text-[#A82F9D]">
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Image */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-[16/10] max-h-64 overflow-hidden border border-black/15 bg-gray-100 group-hover:border-[#A82F9D]/40 transition-colors shadow-sm">
                    <Image
                      src={service.coverImage || "/heroimage.webp"}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                </div>
              </article>
            </Link>
          ))}
          {services.length === 0 && (
            <div className="py-20 text-center text-sm text-gray-400 italic">No services published yet.</div>
          )}
        </div>
      </div>
    </section>
  );
}
