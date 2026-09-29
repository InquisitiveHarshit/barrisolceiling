import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 3600; // ISR 1 hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    await connectDB();
    const blogs = await Blog.find({ isPublished: true }, { slug: 1 }).lean();
    return blogs.map((b: any) => ({ slug: b.slug }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const blog = await Blog.findOne({ slug, isPublished: true }).lean();

  if (!blog) {
    return {
      title: "Blog Not Found | Barrisol Ceiling",
    };
  }

  const title = (blog as any).metaTitle || (blog as any).title;
  const description = (blog as any).metaDescription || (blog as any).shortDescription || "";
  const canonicalUrl = `https://barrisolceiling.com/blog-details/${slug}`;

  return {
    title: `${title} | Barrisol Ceiling`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: (blog as any).coverImage ? [{ url: (blog as any).coverImage }] : [],
    },
  };
}

const formatDate = (iso: string) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  await connectDB();

  const blogDoc = await Blog.findOne({ slug, isPublished: true }).lean();
  if (!blogDoc) {
    notFound();
  }
  const blog = JSON.parse(JSON.stringify(blogDoc));

  const recentDocs = await Blog.find({ isPublished: true, slug: { $ne: slug } })
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();
  const recent = JSON.parse(JSON.stringify(recentDocs));

  return (
    <>
      <style>{`
        /* hero bg — dark, textured */
        .bd-hero-bg {
          position:absolute; inset:0;
          background-image:url('/heroimage.webp');
          background-size:cover; background-position:center;
          filter: brightness(0.35) contrast(1.05);
        }

        /* article typography — dark theme */
        .bd-article-body h1,
        .bd-article-body h2 { font-size:1.5rem; font-weight:700; color:#E2E2E6; margin:2.4rem 0 .8rem; line-height:1.25; letter-spacing:-0.01em; }
        .bd-article-body h3 { font-size:1.15rem; font-weight:600; color:#C8C8CC; margin:1.8rem 0 .6rem; }
        .bd-article-body p  { font-size:1.05rem; color:#A0A6B0; line-height:1.95; margin:0 0 1.25rem; }
        .bd-article-body ul,
        .bd-article-body ol { padding-left:1.5rem; margin:0 0 1.25rem; color:#A0A6B0; line-height:1.9; font-size:1rem; }
        .bd-article-body li { margin-bottom:.45rem; }
        .bd-article-body blockquote {
          border-left:4px solid #A3338E;
          padding:14px 22px;
          margin:2rem 0;
          background:#16191f;
          font-style:italic;
          color:#8E94A0;
        }
        .bd-article-body a      { color:#A3338E; text-decoration:underline; }
        .bd-article-body strong { color:#E2E2E6; }
        .bd-article-body img    { max-width:100%; display:block; }

        /* sidebar recent post hover */
        .bd-recent-link { transition: background 0.15s; }
        .bd-recent-link:hover { background: rgba(255,255,255,0.04); }

        @media(max-width:768px){
          .bd-sidebar  { display:none !important; }
          .bd-layout   { flex-direction:column !important; }
          .bd-article-card { padding:20px !important; }
        }
      `}</style>

      <Navbar />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: 360,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "#0C0E12",
        }}
      >
        <div className="bd-hero-bg" />

        {/* brand accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#A3338E", zIndex: 20 }} />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            padding: "100px 32px 32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: 16,
              fontFamily: "Montserrat,sans-serif",
            }}
          >
            {blog?.category ? `Berrisol · ${blog.category}` : "Berrisol · Insights"}
          </p>

          <h1
            style={{
              fontSize: "clamp(1.6rem,4vw,2.8rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.15,
              maxWidth: 720,
              margin: "0 0 24px",
              fontFamily: "Playfair Display,serif",
              letterSpacing: "-0.01em",
            }}
          >
            {blog?.title}
          </h1>

          <div
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginBottom: 28 }}
          >
            {blog?.createdAt && (
              <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: "Montserrat,sans-serif" }}>
                <Calendar size={11} />
                {formatDate(blog.createdAt)}
              </span>
            )}
            {blog?.tags?.length > 0 && (
              <span style={{ width: 1, height: 12, background: "rgba(255,255,255,0.2)" }} />
            )}
            {blog?.tags?.map((tag: string) => (
              <span
                key={tag}
                style={{
                  fontSize: 10,
                  color: "#f0abda",
                  fontFamily: "Montserrat,sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Tag size={9} />
                {tag}
              </span>
            ))}
          </div>

          <div
            style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "Montserrat,sans-serif" }}
          >
            <Link href="/" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/blog" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Insights</Link>
          </div>
        </div>

        {/* CTA bottom-right */}
        <div
          style={{
            position: "relative",
            zIndex: 20,
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            padding: "0 32px 28px",
          }}
        >
          <a
            href="#contact"
            style={{
              background: "#A3338E",
              color: "#fff",
              fontWeight: 700,
              fontSize: 11,
              padding: "10px 20px",
              border: "2px solid #A3338E",
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: "Montserrat,sans-serif",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              boxShadow: "4px 4px 0px rgba(163,51,142,0.4)",
              transition: "all 0.15s",
              textDecoration: "none",
            }}
          >
            Book a Free Site Visit
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BODY
      ══════════════════════════════════════ */}
      <section style={{ background: "#0C0E12", padding: "56px 0 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div className="bd-layout" style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>

            {/* ── LEFT: Article ── */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* back link */}
              <Link
                href="/blog"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 600,
                  color: "#8E94A0",
                  textDecoration: "none",
                  marginBottom: 32,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                <ArrowLeft size={13} />
                Back to Insights
              </Link>

              {/* cover image */}
              {blog?.coverImage && (
                <div
                  style={{
                    width: "100%",
                    marginBottom: 32,
                    overflow: "hidden",
                    border: "2px solid rgba(255,255,255,0.1)",
                    boxShadow: "5px 5px 0px rgba(163,51,142,0.3)",
                  }}
                >
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", maxHeight: 480 }}
                  />
                </div>
              )}

              {/* article card */}
              <div
                className="bd-article-card"
                style={{
                  background: "#111317",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 2px 24px rgba(0,0,0,0.4)",
                  padding: "40px 44px 56px",
                }}
              >
                <div
                  className="bd-article-body"
                  dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
                />
              </div>
            </div>

            {/* ── RIGHT: Sidebar ── */}
            <div className="bd-sidebar" style={{ width: 288, flexShrink: 0 }}>

              {/* Recent posts */}
              <div
                style={{
                  background: "#111317",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "24px 20px",
                }}
              >
                {/* header */}
                <div
                  style={{
                    marginBottom: 18,
                    paddingBottom: 14,
                    borderBottom: "2px solid #A3338E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#E2E2E6",
                      margin: 0,
                      fontFamily: "Montserrat,sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Latest Posts
                  </h3>
                </div>

                {recent.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {recent.map((item: any, i: number) => (
                      <Link
                        key={item._id}
                        href={`/blog-details/${item.slug}`}
                        className="bd-recent-link"
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-start",
                          padding: "14px 8px",
                          borderBottom: i < recent.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                          borderRadius: 4,
                        }}
                      >
                        {/* thumbnail */}
                        <div
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 6,
                            overflow: "hidden",
                            flexShrink: 0,
                            background: "#1a1d22",
                          }}
                        >
                          {item.coverImage && (
                            <img src={item.coverImage} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              fontSize: 12,
                              fontWeight: 600,
                              color: "#C8C8CC",
                              margin: "0 0 5px",
                              lineHeight: 1.45,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical" as const,
                              overflow: "hidden",
                              fontFamily: "Montserrat,sans-serif",
                            }}
                          >
                            {item.title}
                          </p>
                          <span style={{ fontSize: 10, color: "#5E6472", fontFamily: "Montserrat,sans-serif", letterSpacing: "0.03em" }}>
                            {formatDate(item.createdAt)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 13, color: "#5E6472", margin: 0 }}>No recent posts.</p>
                )}
              </div>

              {/* CTA card */}
              <div
                style={{
                  marginTop: 20,
                  background: "#A3338E",
                  border: "2px solid rgba(255,255,255,0.1)",
                  boxShadow: "4px 4px 0px rgba(163,51,142,0.4)",
                  padding: "28px 24px",
                }}
              >
                <p
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 17,
                    margin: "0 0 6px",
                    fontFamily: "Playfair Display,serif",
                    lineHeight: 1.3,
                  }}
                >
                  Ready to upgrade your space?
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    fontSize: 12,
                    margin: "0 0 20px",
                    lineHeight: 1.65,
                    fontFamily: "Montserrat,sans-serif",
                  }}
                >
                  Free site visit · Custom quote · Expert installation.
                </p>
                <a
                  href="#contact"
                  style={{
                    width: "100%",
                    background: "#0C0E12",
                    color: "#E2E2E6",
                    fontWeight: 700,
                    fontSize: 11,
                    padding: "11px 16px",
                    border: "2px solid rgba(255,255,255,0.15)",
                    cursor: "pointer",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontFamily: "Montserrat,sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    boxShadow: "3px 3px 0px rgba(0,0,0,0.4)",
                    transition: "all 0.15s",
                    textDecoration: "none",
                  }}
                >
                  Book Free Site Visit <ArrowRight size={12} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div id="contact">
        <ContactForm />
      </div>
      <Footer />
    </>
  );
}
