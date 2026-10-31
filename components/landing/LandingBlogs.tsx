import React from "react";
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

interface LandingBlogsProps {
  posts: BlogPost[];
}

const formatDate = (iso: string) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
};

export default function LandingBlogs({ posts }: LandingBlogsProps) {
  return (
    <section id="blogs" className="py-16 sm:py-20 lg:py-24 bg-gray-50 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-black/10 mb-10 sm:mb-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A82F9D] font-semibold block mb-3">
              Editorial Insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Blogs
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[#A82F9D] uppercase tracking-wider hover:text-gray-900 transition-colors font-semibold shrink-0"
          >
            <span>All Articles</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.length === 0 ? (
            <div className="col-span-3 text-center py-12 text-gray-400 font-mono text-sm">
              No blog posts published yet.
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog-details/${post.slug}`}
                className="group flex flex-col bg-white border border-black/10 hover:border-[#A82F9D]/40 transition-colors overflow-hidden shadow-sm hover:shadow-md"
              >
                <div className="relative h-[200px] sm:h-[220px] overflow-hidden bg-gray-100">
                  {post.coverImage ? (
                    <img
                      alt={post.title}
                      src={post.coverImage}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-gray-400">
                      NO COVER IMAGE
                    </div>
                  )}
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-gray-400 block mb-3">
                      {formatDate(post.createdAt)}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-[#A82F9D] transition-colors leading-snug line-clamp-2 mb-6">
                      {post.title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-2 font-mono text-xs text-[#A82F9D] uppercase tracking-wider group-hover:text-gray-900 transition-colors font-semibold">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
