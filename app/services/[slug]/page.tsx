"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

/* ─── Particles ───────────────────────────────────── */
const PARTICLES = [
  { s: 5, l: "8%",  dl: "0s",   du: "8s"  },
  { s: 3, l: "22%", dl: "1.8s", du: "10s" },
  { s: 6, l: "48%", dl: "0.4s", du: "7s"  },
  { s: 4, l: "70%", dl: "2.2s", du: "9s"  },
  { s: 3, l: "88%", dl: "1.1s", du: "11s" },
];

/* ─── Skeleton shimmer ─────────────────────────────── */
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

function ServiceSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          width: "100%",
          height: 380,
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
          padding: "36px 40px 48px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "0 4px 32px rgba(163,51,142,0.08)",
          border: "1px solid rgba(163,51,142,0.10)",
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

function SidebarServicesSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 14px",
            borderRadius: 12,
            background: "#f3edf7",
            position: "relative",
            overflow: "hidden",
            height: 48,
          }}
        >
          <Shimmer />
        </div>
      ))}
    </div>
  );
}

/* ─── Main Page ────────────────────────────────────── */
export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const contactRef = useRef<HTMLDivElement>(null);

  const [service, setService] = useState<any>(null);    // null = loading
  const [allServices, setAllServices] = useState<any>(null);
  const [heroReady, setHeroReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setHeroReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/services/${slug}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setService(d.data);
        else { setService({}); setError(d.message || "Service not found"); }
      })
      .catch(() => { setService({}); setError("Failed to load service"); });

    fetch("/api/services")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setAllServices(d.data);
        else setAllServices([]);
      })
      .catch(() => setAllServices([]));
  }, [slug]);

  const scrollToContact = () => {
    if (contactRef.current) {
      const top =
        contactRef.current.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  if (error) {
    return (
      <main className="bg-surface-bright min-h-screen pt-32">
        <Navbar />
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h1 className="font-headline-lg text-4xl text-[#202124] mb-4">Oops!</h1>
          <p className="text-on-surface-variant mb-6">{error}</p>
          <Link href="/services" className="text-brand-vibrancy hover:underline font-label-caps">
            ← Back to Services
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <style>{`
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        @keyframes float { 0%{transform:translateY(0) scale(1);opacity:.5} 100%{transform:translateY(-120px) scale(0);opacity:0} }
        .sd-hero-bg {
          position:absolute; inset:0;
          background-image:url('/heroimage.webp');
          background-size:cover; background-position:center;
          transition:transform 8s ease;
        }
        .sd-particle { position:absolute; border-radius:50%; background:rgba(163,51,142,0.30); animation:float linear infinite; pointer-events:none; z-index:2; }
        .sd-service-link { transition:background .2s, border-color .2s; }
        .sd-service-link:hover { background:rgba(163,51,142,0.08) !important; border-color:rgba(163,51,142,0.25) !important; }
        .sd-article-body h1,.sd-article-body h2 { font-size:1.45rem; font-weight:700; color:#202124; margin:2rem 0 .75rem; line-height:1.3; }
        .sd-article-body h3 { font-size:1.15rem; font-weight:700; color:#202124; margin:1.5rem 0 .6rem; }
        .sd-article-body p { font-size:1.02rem; color:#46474a; line-height:1.9; margin:0 0 1.1rem; }
        .sd-article-body ul,.sd-article-body ol { padding-left:1.5rem; margin:0 0 1.1rem; color:#46474a; line-height:1.85; font-size:1rem; }
        .sd-article-body li { margin-bottom:.4rem; }
        .sd-article-body blockquote { border-left:4px solid #A3338E; padding:14px 22px; margin:1.5rem 0; background:rgba(163,51,142,0.06); border-radius:0 14px 14px 0; font-style:italic; color:#46474a; }
        .sd-article-body a { color:#A3338E; text-decoration:underline; }
        .sd-article-body strong { color:#202124; }
        .sd-article-body img { max-width:100%; border-radius:12px; }
        @media(max-width:768px){
          .sd-sidebar { display:none !important; }
          .sd-layout { flex-direction:column !important; }
          .sd-article-card { padding:20px !important; border-radius:16px !important; }
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
        {/* Background — use service's cover image if available */}
        {service?.coverImage ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${service.coverImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ) : (
          <div className="sd-hero-bg" />
        )}
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
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="sd-particle"
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
            Berrisol & Illusion · Our Services
          </motion.p>

          {service?.category && (
            <motion.span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                color: "#f0abda",
                background: "rgba(163,51,142,0.35)",
                backdropFilter: "blur(8px)",
                borderRadius: 20,
                padding: "5px 14px",
                border: "1px solid rgba(163,51,142,0.35)",
                fontFamily: "Montserrat,sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontWeight: 700,
                marginBottom: 14,
                width: "fit-content",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 8 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Tag size={9} />
              {service.category}
            </motion.span>
          )}

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
            {service === null ? (
              <span
                style={{
                  display: "inline-block",
                  width: "55%",
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
              service?.title || "Service"
            )}
          </motion.h1>

          {service?.shortDescription && (
            <motion.p
              style={{
                maxWidth: 580,
                fontSize: "clamp(0.9rem,1.4vw,1.05rem)",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.7,
                margin: "0 0 18px",
                fontFamily: "Montserrat,sans-serif",
              }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: heroReady ? 1 : 0, y: heroReady ? 0 : 14 }}
              transition={{ duration: 0.65, delay: 0.3 }}
            >
              {service.shortDescription}
            </motion.p>
          )}

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
            <Link href="/" style={{ color: "rgba(255,255,255,0.40)", textDecoration: "none" }}>
              Home
            </Link>
            <span>/</span>
            <Link href="/services" style={{ color: "rgba(255,255,255,0.40)", textDecoration: "none" }}>
              Services
            </Link>
          </motion.div>
        </div>

        {/* CTA */}
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
                Interested in this service?
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
            className="sd-layout"
            style={{ display: "flex", gap: 32, alignItems: "flex-start" }}
          >
            {/* ── LEFT: Content ── */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <Link
                href="/services"
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
                Back to Services
              </Link>

              {service === null ? (
                <ServiceSkeleton />
              ) : (
                <>
                  {service?.coverImage && (
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
                        src={service.coverImage}
                        alt={service.title}
                        style={{
                          width: "100%",
                          display: "block",
                          objectFit: "cover",
                          maxHeight: 480,
                        }}
                      />
                    </div>
                  )}

                  <div
                    className="sd-article-card"
                    style={{
                      background: "#fff",
                      borderRadius: 24,
                      boxShadow: "0 4px 32px rgba(163,51,142,0.08)",
                      border: "1px solid rgba(163,51,142,0.10)",
                      padding: "36px 40px 52px",
                    }}
                  >
                    {/* Short description lead */}
                    {service?.shortDescription && (
                      <p
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          color: "#A3338E",
                          marginBottom: 24,
                          lineHeight: 1.7,
                          fontFamily: "Montserrat,sans-serif",
                          borderLeft: "3px solid #A3338E",
                          paddingLeft: 16,
                        }}
                      >
                        {service.shortDescription}
                      </p>
                    )}

                    {/* Rich content */}
                    {service?.content ? (
                      <div
                        className="sd-article-body"
                        dangerouslySetInnerHTML={{ __html: service.content }}
                      />
                    ) : (
                      <p
                        style={{
                          color: "#9e9e9e",
                          fontFamily: "Montserrat,sans-serif",
                          fontSize: 14,
                        }}
                      >
                        Detailed content coming soon. Contact us to learn more.
                      </p>
                    )}

                    {/* Tags */}
                    {service?.tags && service.tags.length > 0 && (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 8,
                          marginTop: 32,
                          paddingTop: 24,
                          borderTop: "1px solid rgba(163,51,142,0.10)",
                        }}
                      >
                        {service.tags.map((tag: string) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: "#A3338E",
                              background: "rgba(163,51,142,0.08)",
                              border: "1px solid rgba(163,51,142,0.18)",
                              borderRadius: 20,
                              padding: "4px 12px",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              fontFamily: "Montserrat,sans-serif",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* ── RIGHT: Sidebar ── */}
            <div className="sd-sidebar" style={{ width: 300, flexShrink: 0 }}>
              {/* Other Services */}
              <div
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: 24,
                  boxShadow: "0 4px 24px rgba(163,51,142,0.09)",
                  border: "1px solid rgba(163,51,142,0.12)",
                  marginBottom: 24,
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
                      background: "linear-gradient(180deg,#A3338E,#7a2169)",
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
                    Other Services
                  </h3>
                </div>

                {allServices === null ? (
                  <SidebarServicesSkeleton />
                ) : allServices.filter((s: any) => s.slug !== slug).length > 0 ? (
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    {allServices
                      .filter((s: any) => s.slug !== slug)
                      .map((s: any) => (
                        <Link
                          key={s._id}
                          href={`/services/${s.slug}`}
                          className="sd-service-link"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 14px",
                            borderRadius: 12,
                            background:
                              "linear-gradient(135deg,rgba(163,51,142,0.05),rgba(122,33,105,0.03))",
                            border: "1px solid rgba(163,51,142,0.10)",
                            textDecoration: "none",
                            color: "#202124",
                            fontSize: 13,
                            fontWeight: 600,
                            fontFamily: "Montserrat,sans-serif",
                          }}
                        >
                          <span
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 8,
                              background:
                                "linear-gradient(135deg,rgba(163,51,142,0.12),rgba(122,33,105,0.08))",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <CheckCircle size={13} color="#A3338E" />
                          </span>
                          {s.title}
                        </Link>
                      ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 13, color: "#9e9e9e", margin: 0 }}>
                    No other services yet.
                  </p>
                )}
              </div>

              {/* CTA card */}
              <div
                style={{
                  background: "linear-gradient(135deg,#A3338E 0%,#7a2169 100%)",
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
                  Ready to get started?
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
                  Our experts will visit your space and design the perfect
                  ceiling solution.
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
