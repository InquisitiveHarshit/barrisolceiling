"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  coverImage?: string;
  createdAt: string;
  tags?: string[];
}

export default function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blogs?limit=3")
      .then((r) => r.json())
      .then((d) => { if (d.success) setPosts(d.data.slice(0, 3)); })
      .catch(() => {});
  }, []);

  const formatDate = (iso: string) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  return (
    <section
      id="blogs"
      className="py-16 sm:py-24 bg-[#0C0E12] text-[#E2E2E6] border-b border-white/10"
    >
      <div className="max-w-[94rem] mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-white/10 mb-10 sm:mb-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A62681] font-semibold block mb-3">
              Editorial Insights
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-serif font-normal">
              Latest Spatial &amp; Lighting Dispatch
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#A62681] uppercase tracking-wider hover:text-white transition-colors font-semibold shrink-0"
          >
            <span>All Articles</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.length === 0
            ? [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[#111317] border border-white/10 rounded-xs overflow-hidden animate-pulse"
                >
                  <div className="h-[200px] sm:h-[220px] bg-white/5" />
                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="h-3 bg-white/5 rounded w-1/3" />
                    <div className="h-5 bg-white/5 rounded w-4/5" />
                    <div className="h-5 bg-white/5 rounded w-2/3" />
                  </div>
                </div>
              ))
            : posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog-details/${post.slug}`}
                  className="group flex flex-col bg-[#111317] border border-white/10 hover:border-[#A62681]/50 rounded-xs transition-colors overflow-hidden shadow-xl"
                >
                  <div className="relative h-[200px] sm:h-[220px] overflow-hidden bg-[#0C0E12]">
                    {post.coverImage ? (
                      <img
                        alt={post.title}
                        src={post.coverImage}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[#8E94A0]">
                        NO COVER IMAGE
                      </div>
                    )}
                  </div>

                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#8E94A0] block mb-3">
                        {formatDate(post.createdAt)}
                      </span>
                      <h3 className="text-lg sm:text-xl text-white font-serif group-hover:text-[#E4B5FF] transition-colors leading-snug line-clamp-2 mb-6">
                        {post.title}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-2 font-mono text-xs text-[#A62681] uppercase tracking-wider group-hover:text-[#E4B5FF] transition-colors font-semibold">
                      <span>Read Dispatch</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
