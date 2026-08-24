"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        if (data.success) {
          setBlogs(data.data);
        }
      } catch (error) {
        console.error("Error fetching blogs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <main className="bg-surface-bright min-h-screen pt-20">
      <Navbar />
      
      <section className="py-section-gap px-5 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 border-b border-outline/10 pb-6">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-label-caps text-label-caps text-brand-vibrancy tracking-[0.2em] mb-4 block"
              >
                INSIGHTS
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-headline-lg text-3xl md:text-4xl text-[#202124]"
              >
                Latest from the Blog
              </motion.h2>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-on-surface-variant">Loading blogs...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map((post, i) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + (i * 0.15),
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                  className="bg-luminary-white rounded-2xl group hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-md border border-outline/10"
                >
                  <div className="h-[220px] overflow-hidden">
                    <img
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-surface-container"
                      src={post.coverImage || "/heroimage.webp"}
                    />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4 text-on-surface-variant">
                      <span className="font-label-caps text-label-caps text-[10px]">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                      <span className="w-1 h-1 bg-outline/20 rounded-full" />
                      <span className="font-label-caps text-label-caps text-[10px]">
                        5 min read
                      </span>
                    </div>
                    <h3 className="font-headline-md text-xl text-[#202124] mb-3 leading-snug">
                      {post.title}
                    </h3>
                    <p className="font-body-md text-sm text-on-surface-variant mb-6 leading-relaxed line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="font-label-caps text-label-caps text-brand-vibrancy inline-flex items-center gap-2 hover:gap-3 transition-all mt-auto"
                    >
                      READ MORE
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.article>
              ))}
              
              {blogs.length === 0 && (
                <div className="col-span-3 text-center py-20 text-on-surface-variant">
                  No blog posts published yet.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <ContactForm />
      <Footer />
    </main>
  );
}
