"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function DashboardStats({ metrics }: { metrics: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <Link href={metric.href}>
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 group hover:border-zinc-300 hover:shadow-sm transition-all h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-zinc-100 rounded-lg">
                  {metric.icon}
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 transition-colors" />
              </div>
              <div className="mt-auto">
                <h3 className="text-3xl font-medium tracking-tight text-zinc-900">
                  {metric.value}
                </h3>
                <p className="text-sm text-zinc-500 mt-1 font-medium">
                  {metric.title}
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
