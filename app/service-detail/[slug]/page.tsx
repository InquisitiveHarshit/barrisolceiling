import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 3600; // ISR 1 hour

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    await connectDB();
    const services = await Service.find({ isPublished: true }, { slug: 1 }).lean();
    return services.map((s: any) => ({ slug: s.slug }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const service = await Service.findOne({ slug, isPublished: true }).lean();

  if (!service) {
    return {
      title: "Service Not Found | Barrisol Ceiling",
    };
  }

  const title = (service as any).metaTitle || (service as any).title;
  const description = (service as any).metaDescription || (service as any).shortDescription || "";
  const canonicalUrl = `https://barrisolceiling.com/service-detail/${slug}`;

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
      images: (service as any).coverImage ? [{ url: (service as any).coverImage }] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  await connectDB();

  const serviceDoc = await Service.findOne({ slug, isPublished: true }).lean();
  if (!serviceDoc) {
    notFound();
  }
  const service = JSON.parse(JSON.stringify(serviceDoc));

  const allServicesDocs = await Service.find({ isPublished: true })
    .select("title slug")
    .lean();
  const allServices = JSON.parse(JSON.stringify(allServicesDocs));

  return (
    <>
      <style>{`
        /* hero bg — dark, textured */
        .sd-hero-bg {
          position:absolute; inset:0;
          background-image:url('/heroimage.webp');
          background-size:cover; background-position:center;
          filter: brightness(0.35) contrast(1.05);
        }

        /* dark theme sidebar hover */
        .sd-service-link { transition: background 0.15s, border-color 0.15s; }
        .sd-service-link:hover { background: rgba(255,255,255,0.04) !important; border-color: rgba(255,255,255,0.15) !important; }

        /* article typography — matching blog detail dark theme */
        .sd-article-body h1,
        .sd-article-body h2 { font-size:1.5rem; font-weight:700; color:#E2E2E6; margin:2.4rem 0 .8rem; line-height:1.25; letter-spacing:-0.01em; }
        .sd-article-body h3 { font-size:1.15rem; font-weight:600; color:#C8C8CC; margin:1.8rem 0 .6rem; }
        .sd-article-body p  { font-size:1.05rem; color:#A0A6B0; line-height:1.95; margin:0 0 1.25rem; }
        .sd-article-body ul,
        .sd-article-body ol { padding-left:1.5rem; margin:0 0 1.25rem; color:#A0A6B0; line-height:1.9; font-size:1rem; }
        .sd-article-body li { margin-bottom:.45rem; }
        .sd-article-body blockquote {
          border-left:4px solid #A3338E;
          padding:14px 22px;
          margin:2rem 0;
          background:#16191f;
          font-style:italic;
          color:#8E94A0;
        }
        .sd-article-body a      { color:#A3338E; text-decoration:underline; }
        .sd-article-body strong { color:#E2E2E6; }
        .sd-article-body img    { max-width:100%; display:block; }

        @media(max-width:768px){
          .sd-sidebar { display:none !important; }
          .sd-layout { flex-direction:column !important; }
          .sd-article-card { padding:20px !important; }
        }
      `}</style>

      <Navbar />

      {/* ═══ HERO ═══ */}
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
        {/* Background — use service's cover image if available */}
        {service?.coverImage ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${service.coverImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.35) contrast(1.05)",
            }}
          />
        ) : (
          <div className="sd-hero-bg" />
        )}

        {/* brand accent line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#A3338E", zIndex: 20 }} />

        {/* Content */}
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
              marginBottom: 14,
              fontFamily: "Montserrat,sans-serif",
            }}
          >
            Berrisol & Illusion · Our Services
          </p>

          {service?.category && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 10,
                color: "#f0abda",
                fontFamily: "Montserrat,sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontWeight: 600,
                marginBottom: 14,
                width: "fit-content",
              }}
            >
              <Tag size={9} />
              {service.category}
            </span>
          )}

          <h1
            style={{
              fontSize: "clamp(1.6rem,4vw,2.8rem)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.15,
              maxWidth: 720,
              margin: "0 0 18px",
              fontFamily: "Playfair Display,serif",
              letterSpacing: "-0.01em",
            }}
          >
            {service?.title}
          </h1>

          {service?.shortDescription && (
            <p
              style={{
                maxWidth: 580,
                fontSize: "clamp(0.9rem,1.4vw,1.05rem)",
                color: "#A0A6B0",
                lineHeight: 1.7,
                margin: "0 0 18px",
                fontFamily: "Montserrat,sans-serif",
              }}
            >
              {service.shortDescription}
            </p>
          )}

          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              fontFamily: "Montserrat,sans-serif",
            }}
          >
            <Link href="/" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ opacity: 0.4 }}>/</span>
            <Link href="/service" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>
              Services
            </Link>
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

      {/* ═══ BODY ═══ */}
      <section
        style={{
          background: "#0C0E12",
          padding: "56px 0 80px",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div
            className="sd-layout"
            style={{ display: "flex", gap: 48, alignItems: "flex-start" }}
          >
            {/* ── LEFT: Content ── */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <Link
                href="/service"
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
                Back to Services
              </Link>

              {service?.coverImage && (
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
                  background: "#111317",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 2px 24px rgba(0,0,0,0.4)",
                  padding: "40px 44px 56px",
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
                      color: "#8E94A0",
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
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {service.tags.map((tag: string) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#f0abda",
                          background: "rgba(163,51,142,0.15)",
                          border: "1px solid rgba(163,51,142,0.3)",
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
            </div>

            {/* ── RIGHT: Sidebar ── */}
            <div className="sd-sidebar" style={{ width: 288, flexShrink: 0 }}>
              {/* Other Services */}
              <div
                style={{
                  background: "#111317",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "24px 20px",
                  marginBottom: 20,
                }}
              >
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
                    Other Services
                  </h3>
                </div>

                {allServices.filter((s: any) => s.slug !== slug).length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {allServices
                      .filter((s: any) => s.slug !== slug)
                      .map((s: any) => (
                        <Link
                          key={s._id}
                          href={`/service-detail/${s.slug}`}
                          className="sd-service-link"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 12px",
                            borderRadius: 4,
                            background: "rgba(255,255,255,0.02)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            textDecoration: "none",
                            color: "#C8C8CC",
                            fontSize: 13,
                            fontWeight: 500,
                            fontFamily: "Montserrat,sans-serif",
                          }}
                        >
                          <CheckCircle size={14} color="#A3338E" style={{ flexShrink: 0 }} />
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {s.title}
                          </span>
                        </Link>
                      ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 13, color: "#5E6472", margin: 0 }}>
                    No other services yet.
                  </p>
                )}
              </div>

              {/* CTA card */}
              <div
                style={{
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
                  Ready to get started?
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
                  Our experts will visit your space and design the perfect ceiling solution.
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
