"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

/* ─── helpers ─────────────────────────────────────── */
const formatDate = (iso: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const PARTICLES = [
  { s: 5, l: "8%", dl: "0s", du: "8s" },
  { s: 3, l: "22%", dl: "1.8s", du: "10s" },
  { s: 6, l: "48%", dl: "0.4s", du: "7s" },
  { s: 4, l: "70%", dl: "2.2s", du: "9s" },
  { s: 3, l: "88%", dl: "1.1s", du: "11s" },
];

/* ─── Skeleton components ──────────────────────────── */
function Shimmer() {
  return (
    <span
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.65) 50%,transparent 100%)",
        animation: "shimmer 1.4s infinite",
      }}
    />
  );
}

function ArticleSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          width: "100%",
          height: 340,
          borderRadius: 20,
          background: "#f3edf7",
          position: "relative",
          overflow: "hidden",
          marginBottom: 28,
          boxShadow: "0 10px 40px rgba(163,51,142,0.10)",
        }}
      >
        <Shimmer />
      </div>
      <div
        style={{
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 4px 32px rgba(163,51,142,0.08)",
          border: "1px solid rgba(163,51,142,0.10)",
          padding: "36px 40px 48px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
          <div
            key={i}
            style={{
              height: i === 0 ? 22 : 14,
              borderRadius: 6,
              background: "#f3edf7",
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
            padding: "12px 8px",
            borderBottom:
              i < 3 ? "1px solid rgba(163,51,142,0.10)" : "none",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "#f3edf7",
              flexShrink: 0,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Shimmer />
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              paddingTop: 4,
            }}
          >
            {["90%", "65%", "45%"].map((w, j) => (
              <div
                key={j}
                style={{
                  height: j === 2 ? 10 : 12,
                  borderRadius: 6,
                  background: "#f3edf7",
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

  const [blog, setBlog] = useState<any>(null);       // null = loading
  const [recent, setRecent] = useState<any>(null);   // null = loading
  const [heroReady, setHeroReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setHeroReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!slug) return;

    // Fetch this blog
    fetch(`/api/blogs/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setBlog(d.data);
        else { setBlog({}); setError(d.message || "Blog not found"); }
      })
      .catch(() => { setBlog({}); setError("Failed to load blog"); });

    // Fetch recent (for sidebar)
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
      const top =
        contactRef.current.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  /* ─── Error state ─── */
  if (error) {
    return (
      <main className="bg-surface-bright min-h-screen pt-32">
        <Navbar />
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h1 className="font-headline-lg text-4xl text-[#202124] mb-4">Oops!</h1>
          <p className="text-on-surface-variant mb-6">{error}</p>
          <Link href="/blogs" className="text-brand-vibrancy hover:underline font-label-caps">
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
        @keyframes float { 0%{transform:translateY(0) scale(1);opacity:.5} 100%{transform:translateY(-120px) scale(0);opacity:0} }
        .bd-hero-bg {
          position:absolute; inset:0;
          background-image:url('/heroimage.webp');
          background-size:cover; background-position:center;
          transition:transform 8s ease;
        }
        .bd-particle { position:absolute; border-radius:50%; background:rgba(163,51,142,0.30); animation:float linear infinite; pointer-events:none; z-index:2; }
        .bd-recent-link { transition:background .2s; }
        .bd-recent-link:hover { background:rgba(163,51,142,0.06) !important; }
        .bd-article-body h1,.bd-article-body h2 { font-size:1.45rem; font-weight:700; color:#202124; margin:2rem 0 .75rem; line-height:1.3; }
        .bd-article-body h3 { font-size:1.15rem; font-weight:700; color:#202124; margin:1.5rem 0 .6rem; }
        .bd-article-body p { font-size:1.02rem; color:#46474a; line-height:1.9; margin:0 0 1.1rem; }
        .bd-article-body ul,.bd-article-body ol { padding-left:1.5rem; margin:0 0 1.1rem; color:#46474a; line-height:1.85; font-size:1rem; }
        .bd-article-body li { margin-bottom:.4rem; }
        .bd-article-body blockquote { border-left:4px solid #A3338E; padding:14px 22px; margin:1.5rem 0; background:rgba(163,51,142,0.06); border-radius:0 14px 14px 0; font-style:italic; color:#46474a; }
        .bd-article-body a { color:#A3338E; text-decoration:underline; }
        .bd-article-body strong { color:#202124; }
        .bd-article-body img { max-width:100%; border-radius:12px; }
        @media(max-width:768px){
          .bd-sidebar { display:none !important; }
          .bd-layout { flex-direction:column !important; }
          .bd-article-card { padding:20px !important; border-radius:16px !important; }
        }
      `}</style>

      <Navbar />

      {/* ═══ HERO ═══ */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: 340,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="bd-hero-bg" />
        {/* Overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.72) 55%,rgba(0,0,0,0.20) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 55%)",
          }}
        />
        {/* Particles */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="bd-particle"
            style={{
              width: p.s,
              height: p.s,
              left: p.l,
              bottom: -10,
              animationDelay: p.dl,
              animationDuration: p.du,
            }}
          />
        ))}

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1200,
            margin: "0 auto",
            width: "100%",
            padding: "96px 32px 28px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Eyebrow */}
          <motion.p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.55)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: 14,
              fontFamily: "Montserrat,sans-serif",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 12 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {blog?.category ? `Berrisol & Illusion · ${blog.category}` : "Berrisol & Illusion · Insights"}
          </motion.p>

          {/* Title */}
          <motion.h1
            style={{
              fontSize: "clamp(1.4rem,3.5vw,2.4rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.2,
              textShadow: "0 2px 28px rgba(0,0,0,0.6)",
              maxWidth: 760,
              margin: "0 0 18px",
              fontFamily: "Playfair Display,serif",
            }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 22 }}
            transition={{ duration: 0.75, delay: 0.2 }}
          >
            {blog === null ? (
              <span
                style={{
                  display: "inline-block",
                  width: "60%",
                  height: "1em",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.18)",
                  position: "relative",
                  overflow: "hidden",
                  verticalAlign: "middle",
                }}
              >
                <Shimmer />
              </span>
            ) : (
              blog?.title || "Blog Article"
            )}
          </motion.h1>

          {/* Meta row */}
          <motion.div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 10,
              marginBottom: 22,
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 14 }}
            transition={{ duration: 0.65, delay: 0.35 }}
          >
            {blog?.createdAt && (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  color: "rgba(255,255,255,0.65)",
                  background: "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 20,
                  padding: "5px 12px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  fontFamily: "Montserrat,sans-serif",
                }}
              >
                <Calendar size={11} />
                {formatDate(blog.createdAt)}
              </span>
            )}
            {blog?.tags?.map((tag: string) => (
              <span
                key={tag}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 11,
                  color: "#f0abda",
                  background: "rgba(163,51,142,0.35)",
                  backdropFilter: "blur(8px)",
                  borderRadius: 20,
                  padding: "5px 12px",
                  border: "1px solid rgba(163,51,142,0.35)",
                  fontFamily: "Montserrat,sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 600,
                }}
              >
                <Tag size={9} />
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Breadcrumb */}
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "rgba(255,255,255,0.40)",
              fontFamily: "Montserrat,sans-serif",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: heroReady ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link
              href="/"
              style={{ color: "rgba(255,255,255,0.40)", textDecoration: "none" }}
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/blogs"
              style={{ color: "rgba(255,255,255,0.40)", textDecoration: "none" }}
            >
              Insights
            </Link>
          </motion.div>
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
            padding: "8px 32px 24px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 6 }}
            transition={{ duration: 0.7, delay: 1.0 }}
          >
            <div
              style={{
                background: "linear-gradient(135deg,#A3338E,#7a2169)",
                borderRadius: 14,
                padding: "10px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                boxShadow: "0 8px 28px rgba(163,51,142,0.45)",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.92)",
                  fontSize: 12,
                  fontWeight: 500,
                  margin: 0,
                  whiteSpace: "nowrap",
                  fontFamily: "Montserrat,sans-serif",
                }}
              >
                Transform your space today?
              </p>
              <button
                onClick={scrollToContact}
                style={{
                  background: "#fff",
                  color: "#A3338E",
                  fontWeight: 700,
                  fontSize: 12,
                  padding: "7px 14px",
                  borderRadius: 50,
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  width: "100%",
                  fontFamily: "Montserrat,sans-serif",
                }}
              >
                Book a Free Site Visit
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ BODY ═══ */}
      <section
        style={{
          background:
            "linear-gradient(to bottom,#f9e8f5 0%,#fdf4fb 12%,#ffffff 22%)",
          padding: "48px 0 72px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div
            className="bd-layout"
            style={{ display: "flex", gap: 32, alignItems: "flex-start" }}
          >
            {/* ── LEFT: Article ── */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <Link
                href="/blogs"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  fontFamily: "Montserrat,sans-serif",
                  fontWeight: 600,
                  color: "#46474a",
                  textDecoration: "none",
                  marginBottom: 28,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                <ArrowLeft size={15} />
                Back to Insights
              </Link>

              {blog === null ? (
                <ArticleSkeleton />
              ) : (
                <>
                  {blog?.coverImage && (
                    <div
                      style={{
                        width: "100%",
                        marginBottom: 28,
                        borderRadius: 20,
                        overflow: "hidden",
                        boxShadow: "0 10px 40px rgba(163,51,142,0.15)",
                      }}
                    >
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          objectFit: "cover",
                          maxHeight: 480,
                        }}
                      />
                    </div>
                  )}

                  <div
                    className="bd-article-card"
                    style={{
                      background: "#fff",
                      borderRadius: 24,
                      boxShadow: "0 4px 32px rgba(163,51,142,0.08)",
                      border: "1px solid rgba(163,51,142,0.10)",
                      padding: "36px 40px 52px",
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
            <div className="bd-sidebar" style={{ width: 300, flexShrink: 0 }}>
              {/* Recent Posts */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: "0 4px 24px rgba(163,51,142,0.09)",
                  border: "1px solid rgba(163,51,142,0.12)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      width: 4,
                      height: 22,
                      borderRadius: 4,
                      background:
                        "linear-gradient(180deg,#A3338E,#7a2169)",
                    }}
                  />
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      color: "#202124",
                      margin: 0,
                      fontFamily: "Playfair Display,serif",
                    }}
                  >
                    Latest Posts
                  </h3>
                </div>

                {recent === null ? (
                  <SidebarRecentSkeleton />
                ) : recent.length > 0 ? (
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 0 }}
                  >
                    {recent.map((item: any, i: number) => (
                      <Link
                        key={item._id}
                        href={`/blog-details/${item.slug}`}
                        className="bd-recent-link"
                        style={{
                          display: "flex",
                          gap: 12,
                          alignItems: "flex-start",
                          padding: "12px 8px",
                          borderRadius: 12,
                          textDecoration: "none",
                          color: "inherit",
                          borderBottom:
                            i < recent.length - 1
                              ? "1px solid rgba(163,51,142,0.10)"
                              : "none",
                        }}
                      >
                        <div
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: 12,
                            overflow: "hidden",
                            flexShrink: 0,
                            boxShadow: "0 4px 14px rgba(163,51,142,0.12)",
                            background: "#f3edf7",
                          }}
                        >
                          {item.coverImage && (
                            <img
                              src={item.coverImage}
                              alt={item.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p
                            style={{
                              fontSize: 12,
                              fontWeight: 700,
                              color: "#202124",
                              margin: "0 0 4px",
                              lineHeight: 1.4,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical" as const,
                              overflow: "hidden",
                              fontFamily: "Montserrat,sans-serif",
                            }}
                          >
                            {item.title}
                          </p>
                          <span
                            style={{
                              fontSize: 10,
                              color: "#9e9e9e",
                              letterSpacing: "0.03em",
                              fontFamily: "Montserrat,sans-serif",
                            }}
                          >
                            {formatDate(item.createdAt)}
                          </span>
                          <div
                            style={{
                              width: 20,
                              height: 2,
                              borderRadius: 2,
                              background:
                                "linear-gradient(90deg,#f0abda,#A3338E)",
                              marginTop: 6,
                            }}
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 13, color: "#9e9e9e", margin: 0 }}>
                    No recent posts.
                  </p>
                )}
              </div>

              {/* CTA card */}
              <div
                style={{
                  marginTop: 24,
                  background:
                    "linear-gradient(135deg,#A3338E 0%,#7a2169 100%)",
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: "0 8px 32px rgba(163,51,142,0.28)",
                }}
              >
                <p
                  style={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 16,
                    margin: "0 0 8px",
                    fontFamily: "Playfair Display,serif",
                  }}
                >
                  Ready to upgrade your space?
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.78)",
                    fontSize: 13,
                    margin: "0 0 18px",
                    lineHeight: 1.6,
                    fontFamily: "Montserrat,sans-serif",
                  }}
                >
                  Get a free site visit and custom quote from our experts.
                </p>
                <button
                  onClick={scrollToContact}
                  style={{
                    width: "100%",
                    background: "#fff",
                    color: "#A3338E",
                    fontWeight: 700,
                    fontSize: 12,
                    padding: "10px 16px",
                    borderRadius: 50,
                    border: "none",
                    cursor: "pointer",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    fontFamily: "Montserrat,sans-serif",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  Book Free Site Visit <ArrowRight size={13} />
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
