"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

/* ─── helpers ──────────────────────────────────────── */
const formatDate = (iso: string) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* ─── Shimmer ──────────────────────────────────────── */
function Shimmer() {
  return (
    <span
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.7) 50%,transparent 100%)",
        animation: "shimmer 1.4s infinite",
      }}
    />
  );
}

/* ─── Article Skeleton ─────────────────────────────── */
function ArticleSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* cover image skeleton — brutalist border */}
      <div
        style={{
          width: "100%",
          height: 320,
          background: "#f0f0f0",
          position: "relative",
          overflow: "hidden",
          marginBottom: 32,
          border: "2px solid #202124",
          boxShadow: "5px 5px 0px #202124",
        }}
      >
        <Shimmer />
      </div>
      {/* content skeleton — clean / minimal */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e8e8e8",
          padding: "36px 40px 48px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {[100, 78, 92, 65, 85, 55, 88].map((w, i) => (
          <div
            key={i}
            style={{
              height: i === 0 ? 20 : 13,
              background: "#f0f0f0",
              borderRadius: 4,
              width: `${w}%`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Shimmer />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Sidebar Skeleton ─────────────────────────────── */
function SidebarRecentSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            padding: "14px 0",
            borderBottom: i < 3 ? "1px solid #f0f0f0" : "none",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              background: "#f0f0f0",
              borderRadius: 6,
              flexShrink: 0,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Shimmer />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7, paddingTop: 4 }}>
            {["88%", "60%", "40%"].map((w, j) => (
              <div
                key={j}
                style={{
                  height: j === 2 ? 9 : 11,
                  borderRadius: 4,
                  background: "#f0f0f0",
                  width: w,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Shimmer />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Main Page ────────────────────────────────────── */
export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const contactRef = useRef<HTMLDivElement>(null);

  const [blog, setBlog] = useState<any>(null);
  const [recent, setRecent] = useState<any>(null);
  const [heroReady, setHeroReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setHeroReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/blogs/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setBlog(d.data);
        else { setBlog({}); setError(d.message || "Blog not found"); }
      })
      .catch(() => { setBlog({}); setError("Failed to load blog"); });

    fetch("/api/blogs")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setRecent(d.data.slice(0, 4));
        else setRecent([]);
      })
      .catch(() => setRecent([]));
  }, [slug]);

  const scrollToContact = () => {
    if (contactRef.current) {
      const top = contactRef.current.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  /* ─── Error ─── */
  if (error) {
    return (
      <main className="bg-surface-bright min-h-screen pt-32">
        <Navbar />
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h1 className="font-headline-lg text-4xl text-[#202124] mb-4">Oops!</h1>
          <p className="text-on-surface-variant mb-6">{error}</p>
          <Link href="/blog" className="text-brand-vibrancy hover:underline font-label-caps">
            ← Back to Insights
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      {blog && (
        <>
          <title>{blog.metaTitle || blog.title}</title>
          {blog.metaDescription && <meta name="description" content={blog.metaDescription} />}
        </>
      )}

      <style>{`
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }

        /* hero bg — dark, textured */
        .bd-hero-bg {
          position:absolute; inset:0;
          background-image:url('/heroimage.webp');
          background-size:cover; background-position:center;
          filter: brightness(0.35) contrast(1.05);
        }

        /* article typography — minimalist, generous spacing */
        .bd-article-body h1,
        .bd-article-body h2 { font-size:1.5rem; font-weight:700; color:#111; margin:2.4rem 0 .8rem; line-height:1.25; letter-spacing:-0.01em; }
        .bd-article-body h3 { font-size:1.15rem; font-weight:600; color:#202124; margin:1.8rem 0 .6rem; }
        .bd-article-body p  { font-size:1.05rem; color:#444; line-height:1.95; margin:0 0 1.25rem; }
        .bd-article-body ul,
        .bd-article-body ol { padding-left:1.5rem; margin:0 0 1.25rem; color:#444; line-height:1.9; font-size:1rem; }
        .bd-article-body li { margin-bottom:.45rem; }
        /* blockquote: brutalist left bar, minimal bg */
        .bd-article-body blockquote {
          border-left:4px solid #202124;
          padding:14px 22px;
          margin:2rem 0;
          background:#fafafa;
          font-style:italic;
          color:#555;
        }
        .bd-article-body a      { color:#A3338E; text-decoration:underline; }
        .bd-article-body strong { color:#111; }
        .bd-article-body img    { max-width:100%; display:block; }

        /* sidebar recent post hover — minimal */
        .bd-recent-link { transition: background 0.15s; }
        .bd-recent-link:hover { background: #fafafa; }

        @media(max-width:768px){
          .bd-sidebar  { display:none !important; }
          .bd-layout   { flex-direction:column !important; }
          .bd-article-card { padding:20px !important; }
        }
      `}</style>

      <Navbar />

      {/* ══════════════════════════════════════
          HERO  — brutalist structure, minimal typography
      ══════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: 360,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "#111",
        }}
      >
        <div className="bd-hero-bg" />

        {/* thin brand accent line at top */}
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
          {/* eyebrow — minimal, very quiet */}
          <motion.p
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginBottom: 16,
              fontFamily: "Montserrat,sans-serif",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: heroReady ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {blog?.category ? `Berrisol · ${blog.category}` : "Berrisol · Insights"}
          </motion.p>

          {/* title — large, serif, no text-shadow (minimalist) */}
          <motion.h1
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {blog === null ? (
              <span style={{ display: "inline-block", width: "60%", height: "1em", background: "rgba(255,255,255,0.15)", position: "relative", overflow: "hidden", verticalAlign: "middle" }}>
                <Shimmer />
              </span>
            ) : (
              blog?.title || "Blog Article"
            )}
          </motion.h1>

          {/* meta — minimal plain text, no pill borders */}
          <motion.div
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginBottom: 28 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: heroReady ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
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
          </motion.div>

          {/* breadcrumb */}
          <motion.div
            style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "Montserrat,sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: heroReady ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <Link href="/" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Home</Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/blog" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Insights</Link>
          </motion.div>
        </div>

        {/* CTA bottom-right — brutalist button only */}
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
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 6 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <button
              onClick={scrollToContact}
              style={{
                background: "#fff",
                color: "#202124",
                fontWeight: 700,
                fontSize: 11,
                padding: "10px 20px",
                border: "2px solid #fff",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "Montserrat,sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                boxShadow: "4px 4px 0px rgba(255,255,255,0.4)",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(4px, 4px)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = "4px 4px 0px rgba(255,255,255,0.4)";
              }}
            >
              Book a Free Site Visit
            </button>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BODY  — minimalist layout, clean whitespace
      ══════════════════════════════════════ */}
      <section style={{ background: "#fafafa", padding: "56px 0 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div className="bd-layout" style={{ display: "flex", gap: 48, alignItems: "flex-start" }}>

            {/* ── LEFT: Article ── */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* back link — minimal */}
              <Link
                href="/blog"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 600,
                  color: "#888",
                  textDecoration: "none",
                  marginBottom: 32,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                <ArrowLeft size={13} />
                Back to Insights
              </Link>

              {blog === null ? (
                <ArticleSkeleton />
              ) : (
                <>
                  {/* cover image — brutalist border + shadow */}
                  {blog?.coverImage && (
                    <div
                      style={{
                        width: "100%",
                        marginBottom: 32,
                        overflow: "hidden",
                        border: "2px solid #202124",
                        boxShadow: "5px 5px 0px #202124",
                      }}
                    >
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", maxHeight: 480 }}
                      />
                    </div>
                  )}

                  {/* article card — minimalist: white, thin border, ample padding */}
                  <div
                    className="bd-article-card"
                    style={{
                      background: "#fff",
                      border: "1px solid #e8e8e8",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                      padding: "40px 44px 56px",
                    }}
                  >
                    <div
                      className="bd-article-body"
                      dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* ── RIGHT: Sidebar ── */}
            <div className="bd-sidebar" style={{ width: 288, flexShrink: 0 }}>

              {/* Recent posts — minimalist card */}
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e8e8e8",
                  padding: "24px 20px",
                }}
              >
                {/* header — brutalist rule */}
                <div
                  style={{
                    marginBottom: 18,
                    paddingBottom: 14,
                    borderBottom: "2px solid #202124",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#202124",
                      margin: 0,
                      fontFamily: "Montserrat,sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Latest Posts
                  </h3>
                </div>

                {recent === null ? (
                  <SidebarRecentSkeleton />
                ) : recent.length > 0 ? (
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
                          borderBottom: i < recent.length - 1 ? "1px solid #f0f0f0" : "none",
                          borderRadius: 4,
                        }}
                      >
                        {/* thumbnail — rounded (minimalist) */}
                        <div
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 6,
                            overflow: "hidden",
                            flexShrink: 0,
                            background: "#f0f0f0",
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
                              color: "#202124",
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
                          <span style={{ fontSize: 10, color: "#aaa", fontFamily: "Montserrat,sans-serif", letterSpacing: "0.03em" }}>
                            {formatDate(item.createdAt)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 13, color: "#aaa", margin: 0 }}>No recent posts.</p>
                )}
              </div>

              {/* CTA card — brutalist fill + hard shadow, minimal copy */}
              <div
                style={{
                  marginTop: 20,
                  background: "#A3338E",
                  border: "2px solid #202124",
                  boxShadow: "4px 4px 0px #202124",
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
                <button
                  onClick={scrollToContact}
                  style={{
                    width: "100%",
                    background: "#fff",
                    color: "#202124",
                    fontWeight: 700,
                    fontSize: 11,
                    padding: "11px 16px",
                    border: "2px solid #202124",
                    cursor: "pointer",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontFamily: "Montserrat,sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    boxShadow: "3px 3px 0px #202124",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(3px, 3px)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(0, 0)";
                    e.currentTarget.style.boxShadow = "3px 3px 0px #202124";
                  }}
                >
                  Book Free Site Visit <ArrowRight size={12} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div ref={contactRef}>
        <ContactForm />
      </div>
      <Footer />
    </>
  );
}
