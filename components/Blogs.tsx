"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
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
      .then((d) => {
        if (d.success) setPosts(d.data.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  const formatDate = (iso: string) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section id="blogs" className="py-section-gap bg-surface-bright">
      <div className="w-full px-5 md:px-16">

        {/* Header */}
        <div className="flex justify-between items-end mb-12 border-b-2 border-[#202124] pb-6">
          <div>
            <p className="font-label-caps text-label-caps text-brand-vibrancy mb-2 tracking-[0.2em]">INSIGHTS</p>
            <h2 className="font-headline-lg text-3xl md:text-4xl text-[#202124]">
              Latest from the Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 font-label-caps text-label-caps text-[#202124] border-2 border-[#202124] px-4 py-2 shadow-[3px_3px_0px_#202124] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all duration-150"
          >
            All Posts
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.length === 0
            ? // Skeleton placeholders while loading
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-luminary-white border-2 border-[#e0e0e0] overflow-hidden animate-pulse"
                >
                  <div className="h-[220px] bg-gray-100" />
                  <div className="p-7 space-y-3">
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                    <div className="h-5 bg-gray-100 rounded w-4/5" />
                    <div className="h-5 bg-gray-100 rounded w-2/3" />
                    <div className="h-4 bg-gray-100 rounded w-1/4 mt-4" />
                  </div>
                </div>
              ))
            : posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog-details/${post.slug}`}
                  className="group block bg-luminary-white border-2 border-[#202124] shadow-[5px_5px_0px_#202124] hover:translate-x-[5px] hover:translate-y-[5px] hover:shadow-none transition-all duration-150 overflow-hidden"
                >
                  {/* Image */}
                  <div className="h-[220px] overflow-hidden border-b-2 border-[#202124]">
                    {post.coverImage ? (
                      <img
                        alt={post.title}
                        src={post.coverImage}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xs text-gray-400 font-label-caps tracking-widest">NO IMAGE</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col">
                    <span className="font-label-caps text-[10px] text-on-surface-variant mb-4">
                      {formatDate(post.createdAt)}
                    </span>
                    <h3 className="font-headline-md text-xl text-[#202124] mb-5 leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <span className="mt-auto font-label-caps text-label-caps text-[#202124] inline-flex items-center gap-2 border-b-2 border-[#202124] pb-0.5 w-fit group-hover:gap-4 transition-all duration-150">
                      Read More
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
