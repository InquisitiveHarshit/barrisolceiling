import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import FaqSection from "@/components/FaqSection";


export const revalidate = 3600; // ISR 1 hour

export const metadata = {
  title: "Stretch Ceilings Blog | Tips, Trends & Ideas",
  description: "Read expert tips, cost guides and latest design trends on Stretch Ceilings. Learn how to choose the right ceiling for your home or office.",
  alternates: { canonical: "/blog" },
};

export default async function BlogsPage() {
  await connectDB();
  const blogsData = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).lean();
  const blogs = JSON.parse(JSON.stringify(blogsData));

  // Aggregate FAQs from all blog posts
  const allFaqs = blogs.flatMap((b: any) => b.faqs ?? []);

  return (
    <main className="bg-surface-bright min-h-screen">
      <Navbar />
      
      <section className="py-section-gap px-5 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-12 border-b border-outline/10 pb-6">
            <div>
              <span className="font-label-caps text-label-caps text-brand-vibrancy tracking-[0.2em] mb-4 block">
                INSIGHTS
              </span>
              <h1 className="font-headline-lg text-3xl md:text-4xl text-[#202124]">
                Latest from the Blog
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((post: any) => (
              <Link
                key={post._id}
                href={`/blog-details/${post.slug}`}
                className="bg-luminary-white rounded-2xl group hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-md border border-outline/10 cursor-pointer"
              >
                <div className="h-[220px] overflow-hidden">
                  <img
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 bg-surface-container"
                    src={post.coverImage || "/heroimage.webp"}
                  />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-2 text-on-surface-variant">
                    <span className="font-label-caps text-label-caps text-[10px]">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span className="w-1 h-1 bg-outline/20 rounded-full" />
                    <span className="font-label-caps text-label-caps text-[10px]">
                      5 min read
                    </span>
                  </div>
                  {post.category && (
                    <span className="font-label-caps text-label-caps text-brand-vibrancy mb-2 block">
                      {post.category}
                    </span>
                  )}
                  <h2 className="font-headline-md text-xl text-[#202124] mb-3 leading-snug group-hover:text-[#A62681] transition-colors">
                    {post.title}
                  </h2>
                  <div className="font-label-caps text-label-caps text-brand-vibrancy inline-flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                    READ MORE
                    <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
            
            {blogs.length === 0 && (
              <div className="col-span-3 text-center py-20 text-on-surface-variant">
                No blog posts published yet.
              </div>
            )}
          </div>
        </div>
      </section>

      <FaqSection
        faqs={allFaqs}
        theme="light"
        heading="Frequently Asked Questions"
        subheading="Got Questions?"
        pageUrl="https://barrisoindia.com/blog"
      />
      <ContactForm />
      <Footer />
    </main>
  );
}
