"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, [router]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs?published=false");
      const data = await res.json();
      if (data.success) setBlogs(data.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/blogs/${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchBlogs();
      else alert(data.message || "Failed to delete");
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  const badge = (published: boolean): React.CSSProperties => ({
    display: "inline-block",
    padding: "2px 8px",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    border: `1px solid ${published ? "#86efac" : "#fde68a"}`,
    background: published ? "#f0fdf4" : "#fffbeb",
    color: published ? "#166534" : "#92400e",
  });

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          fontFamily: "Georgia, serif",
          color: "#6b7280",
          fontSize: "13px",
        }}
      >
        Loading…
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "24px 28px",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: "#e8e8e8",
        minHeight: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "2px",
            }}
          >
            Manage Blogs
          </h1>
          <p style={{ fontSize: "12px", color: "#6b7280" }}>
            {blogs.length} post{blogs.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/blogs/create"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            padding: "7px 14px",
            background: "#1a2340",
            color: "#ffffff",
            border: "none",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            textDecoration: "none",
            fontFamily: "Georgia, serif",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#243050")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#1a2340")
          }
        >
          <Plus size={13} /> New Blog
        </Link>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #d1d5db",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead
            style={{
              background: "#f3f4f6",
              borderBottom: "2px solid #d1d5db",
            }}
          >
            <tr>
              <th
                style={{
                  padding: "10px 14px",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#374151",
                  textAlign: "left",
                }}
              >
                Title
              </th>
              <th
                style={{
                  padding: "10px 14px",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#374151",
                  textAlign: "left",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: "10px 14px",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#374151",
                  textAlign: "left",
                }}
              >
                Date
              </th>
              <th
                style={{
                  padding: "10px 14px",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#374151",
                  textAlign: "right",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog: any) => (
              <tr
                key={blog._id}
                style={{ borderBottom: "1px solid #e5e7eb" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#f9fafb")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "#ffffff")
                }
              >
                <td
                  style={{
                    padding: "10px 14px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#111827",
                    maxWidth: "340px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {blog.title}
                </td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={badge(blog.isPublished)}>
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td
                  style={{
                    padding: "10px 14px",
                    fontSize: "12px",
                    color: "#6b7280",
                  }}
                >
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td
                  style={{
                    padding: "10px 14px",
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      gap: "6px",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      href={`/admin/blogs/${blog.slug || blog._id}`}
                      title="Edit"
                      style={{
                        padding: "4px 6px",
                        border: "1px solid #1d4ed8",
                        color: "#1d4ed8",
                        display: "inline-flex",
                        alignItems: "center",
                        background: "transparent",
                        textDecoration: "none",
                      }}
                    >
                      <Edit size={13} />
                    </Link>
                    <button
                      onClick={() => deleteBlog(blog.slug || blog._id)}
                      title="Delete"
                      style={{
                        padding: "4px 6px",
                        border: "1px solid #dc2626",
                        color: "#dc2626",
                        display: "inline-flex",
                        alignItems: "center",
                        background: "transparent",
                        cursor: "pointer",
                      }}
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
                    padding: "36px",
                    textAlign: "center",
                    fontSize: "13px",
                    color: "#9ca3af",
                    fontStyle: "italic",
                  }}
                >
                  No blogs found.{" "}
                  <Link
                    href="/admin/blogs/create"
                    style={{ color: "#1a2340" }}
                  >
                    Create one →
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
