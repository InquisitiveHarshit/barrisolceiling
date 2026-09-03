"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  Image as ImageIcon,
  Briefcase,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";

const S = {
  page: {
    padding: "24px 28px",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    background: "#e8e8e8",
    minHeight: "100%",
  } as React.CSSProperties,
  pageTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "2px",
  } as React.CSSProperties,
  pageSubtitle: {
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "24px",
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#1a2340",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: "8px",
  } as React.CSSProperties,
  card: {
    background: "#ffffff",
    border: "1px solid #d1d5db",
    borderTop: "3px solid #1a2340",
  } as React.CSSProperties,
  statCard: {
    background: "#ffffff",
    border: "1px solid #d1d5db",
    borderLeft: "4px solid #1a2340",
    padding: "16px 18px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    textDecoration: "none",
  } as React.CSSProperties,
  statValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#111827",
    lineHeight: "1",
  } as React.CSSProperties,
  statLabel: {
    fontSize: "11px",
    color: "#6b7280",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginTop: "2px",
  } as React.CSSProperties,
  iconBox: {
    width: "38px",
    height: "38px",
    background: "#f3f4f6",
    border: "1px solid #d1d5db",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } as React.CSSProperties,
  tableWrapper: {
    background: "#ffffff",
    border: "1px solid #d1d5db",
    overflow: "hidden",
  } as React.CSSProperties,
  tableHeader: {
    background: "#f3f4f6",
    borderBottom: "2px solid #d1d5db",
  } as React.CSSProperties,
  th: {
    padding: "9px 14px",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "#374151",
    textAlign: "left" as const,
  } as React.CSSProperties,
  td: {
    padding: "9px 14px",
    fontSize: "13px",
    color: "#374151",
    borderBottom: "1px solid #e5e7eb",
  } as React.CSSProperties,
  tdBold: {
    padding: "9px 14px",
    fontSize: "13px",
    color: "#111827",
    fontWeight: "600",
    borderBottom: "1px solid #e5e7eb",
    maxWidth: "260px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,
  badge: (published: boolean): React.CSSProperties => ({
    display: "inline-block",
    padding: "2px 8px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    border: `1px solid ${published ? "#86efac" : "#fde68a"}`,
    background: published ? "#f0fdf4" : "#fffbeb",
    color: published ? "#166534" : "#92400e",
  }),
  btnPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "6px 12px",
    background: "#1a2340",
    color: "#ffffff",
    border: "none",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    textDecoration: "none",
    fontFamily: "Georgia, serif",
  } as React.CSSProperties,
  btnIcon: (color: string): React.CSSProperties => ({
    padding: "4px 6px",
    background: "transparent",
    border: `1px solid ${color}`,
    color: color,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  sectionRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "8px",
  } as React.CSSProperties,
  divider: {
    height: "1px",
    background: "#d1d5db",
    margin: "28px 0",
  } as React.CSSProperties,
  viewAll: {
    display: "block",
    padding: "8px 14px",
    fontSize: "12px",
    color: "#1a2340",
    borderTop: "1px solid #e5e7eb",
    background: "#f9fafb",
    textDecoration: "none",
  } as React.CSSProperties,
};

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [galleryCount, setGalleryCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [blogsRes, servicesRes, leadsRes, galleryRes] = await Promise.all([
        fetch("/api/blogs?published=false"),
        fetch("/api/services?published=false"),
        fetch("/api/leads"),
        fetch("/api/gallery"),
      ]);
      const [blogsData, servicesData, leadsData, galleryData] =
        await Promise.all([
          blogsRes.json(),
          servicesRes.json(),
          leadsRes.json(),
          galleryRes.json(),
        ]);
      if (blogsData.success) setBlogs(blogsData.data);
      if (servicesData.success) setServices(servicesData.data);
      if (leadsData.success) setLeads(leadsData.leads);
      if (galleryData.success) setGalleryCount(galleryData.images.length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (slug: string) => {
    if (!confirm("Delete this blog post?")) return;
    const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) setBlogs((prev) => prev.filter((b) => b.slug !== slug));
    else alert(data.message || "Failed to delete");
  };

  const deleteService = async (slug: string) => {
    if (!confirm("Delete this service?")) return;
    const res = await fetch(`/api/services/${slug}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) setServices((prev) => prev.filter((s) => s.slug !== slug));
    else alert(data.message || "Failed to delete");
  };

  const metrics = [
    { title: "Contact Leads", value: leads.length, icon: Users, href: "/admin/leads" },
    { title: "Blog Posts", value: blogs.length, icon: FileText, href: "/admin/blogs" },
    { title: "Services", value: services.length, icon: Briefcase, href: "/admin/services" },
    { title: "Gallery Images", value: galleryCount, icon: ImageIcon, href: "/admin/gallery" },
  ];

  if (loading) {
    return (
      <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#6b7280", fontSize: "13px" }}>Loading data…</p>
      </div>
    );
  }

  return (
    <div style={S.page}>
      {/* Page heading */}
      <h2 style={S.pageTitle}>Dashboard Overview</h2>
      <p style={S.pageSubtitle}>Summary of all site content and enquiries.</p>

      {/* ── Stat boxes ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Link key={m.title} href={m.href} style={S.statCard}>
              <div style={S.iconBox}>
                <Icon size={18} color="#1a2340" />
              </div>
              <div>
                <div style={S.statValue}>{m.value}</div>
                <div style={S.statLabel}>{m.title}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Blogs table ── */}
      <div style={S.sectionRow}>
        <p style={S.sectionTitle}>Blogs</p>
        <Link href="/admin/blogs/create" style={S.btnPrimary}>
          <Plus size={12} /> New Blog
        </Link>
      </div>
      <div style={S.tableWrapper}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={S.tableHeader}>
            <tr>
              <th style={S.th}>Title</th>
              <th style={{ ...S.th, display: "none" }} className="hidden md:table-cell">Status</th>
              <th style={{ ...S.th, display: "none" }} className="hidden md:table-cell">Date</th>
              <th style={{ ...S.th, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.slice(0, 8).map((blog) => (
              <tr key={blog._id}>
                <td style={S.tdBold}>{blog.title}</td>
                <td style={S.td} className="hidden md:table-cell">
                  <span style={S.badge(blog.isPublished)}>
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td style={S.td} className="hidden md:table-cell">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td style={{ ...S.td, textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: "6px" }}>
                    <Link
                      href={`/admin/blogs/${blog.slug || blog._id}`}
                      style={S.btnIcon("#1d4ed8")}
                      title="Edit"
                    >
                      <Edit size={13} />
                    </Link>
                    <button
                      onClick={() => deleteBlog(blog.slug || blog._id)}
                      style={S.btnIcon("#dc2626")}
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    ...S.td,
                    textAlign: "center",
                    padding: "28px",
                    color: "#9ca3af",
                    fontStyle: "italic",
                  }}
                >
                  No blog posts yet.{" "}
                  <Link href="/admin/blogs/create" style={{ color: "#1a2340" }}>
                    Create one →
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {blogs.length > 8 && (
          <Link href="/admin/blogs" style={S.viewAll}>
            View all {blogs.length} blogs →
          </Link>
        )}
      </div>

      <div style={S.divider} />

      {/* ── Services table ── */}
      <div style={S.sectionRow}>
        <p style={S.sectionTitle}>Services</p>
        <Link href="/admin/services/create" style={S.btnPrimary}>
          <Plus size={12} /> New Service
        </Link>
      </div>
      <div style={S.tableWrapper}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={S.tableHeader}>
            <tr>
              <th style={S.th}>Title</th>
              <th style={S.th} className="hidden md:table-cell">Category</th>
              <th style={S.th} className="hidden md:table-cell">Status</th>
              <th style={S.th} className="hidden md:table-cell">Date</th>
              <th style={{ ...S.th, textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.slice(0, 8).map((service) => (
              <tr key={service._id}>
                <td style={S.tdBold}>{service.title}</td>
                <td style={S.td} className="hidden md:table-cell">
                  {service.category || "—"}
                </td>
                <td style={S.td} className="hidden md:table-cell">
                  <span style={S.badge(service.isPublished)}>
                    {service.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td style={S.td} className="hidden md:table-cell">
                  {new Date(service.createdAt).toLocaleDateString()}
                </td>
                <td style={{ ...S.td, textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: "6px" }}>
                    <Link
                      href={`/admin/services/${service.slug || service._id}`}
                      style={S.btnIcon("#1d4ed8")}
                      title="Edit"
                    >
                      <Edit size={13} />
                    </Link>
                    <button
                      onClick={() => deleteService(service.slug || service._id)}
                      style={S.btnIcon("#dc2626")}
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    ...S.td,
                    textAlign: "center",
                    padding: "28px",
                    color: "#9ca3af",
                    fontStyle: "italic",
                  }}
                >
                  No services yet.{" "}
                  <Link href="/admin/services/create" style={{ color: "#1a2340" }}>
                    Create one →
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {services.length > 8 && (
          <Link href="/admin/services" style={S.viewAll}>
            View all {services.length} services →
          </Link>
        )}
      </div>
    </div>
  );
}
