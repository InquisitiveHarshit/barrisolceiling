"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Stretch Ceiling Trends for 2024",
    excerpt:
      "Discover the latest innovations in modern stretch ceilings, from translucent designs to dramatic 3D architectural forms.",
    image: "/heroimage.webp",
    date: "Aug 15, 2024",
    readTime: "4 min read",
  },
  {
    id: 2,
    title: "Why Acoustic Ceilings Transform Offices",
    excerpt:
      "How acoustic stretch ceilings can dramatically improve sound quality, reduce echoes, and boost productivity in workspaces.",
    image: "/hero-stretch-ceiling.jpg",
    date: "Jul 28, 2024",
    readTime: "5 min read",
  },
  {
    id: 3,
    title: "Choosing the Right Ceiling Lighting",
    excerpt:
      "A practical guide on blending stretch ceilings with LED lighting for the perfect ambient atmosphere in any room.",
    image: "/heroimage.webp",
    date: "Jul 10, 2024",
    readTime: "3 min read",
  },
];

export default function Blogs() {
  return (
    <section id="blogs" className="py-section-gap px-5 md:px-16 bg-surface-bright">
      <div className="max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="font-headline-lg text-3xl md:text-4xl text-[#202124]">
            Latest from the Blog
          </h2>
          <a
            className="hidden md:inline-flex items-center gap-2 font-label-caps text-label-caps text-brand-vibrancy group"
            href="/blogs"
          >
            Read All Posts
            <motion.span whileHover={{ x: 4 }} transition={{ type: "spring", duration: 0.2, bounce: 0 }}>
              <ArrowRight size={14} />
            </motion.span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", duration: 0.15, bounce: 0 }}
              className="bg-luminary-white ambient-glow group hover:-translate-y-1.5 transition-transform duration-300 overflow-hidden cursor-pointer"
            >
              <div className="h-[220px] overflow-hidden">
                <img
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={post.image}
                />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-3 mb-4 text-on-surface-variant">
                  <span className="font-label-caps text-label-caps text-[10px]">{post.date}</span>
                  <span className="w-1 h-1 bg-outline-variant rounded-full" />
                  <span className="font-label-caps text-label-caps text-[10px]">{post.readTime}</span>
                </div>
                <h3 className="font-headline-md text-xl text-[#202124] mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant mb-5 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <a
                  className="font-label-caps text-label-caps text-brand-vibrancy inline-flex items-center gap-2 group/link"
                  href="#"
                >
                  Read More
                  <motion.span
                    className="inline-flex"
                    animate={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", duration: 0.2, bounce: 0 }}
                  >
                    <ArrowRight size={14} />
                  </motion.span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
