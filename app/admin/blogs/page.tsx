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
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetchBlogs();
  }, [router]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs?published=false");
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

  const deleteBlog = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`/api/blogs/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        fetchBlogs();
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  if (loading) {
    return <div className="p-10 pt-32 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-surface-bright pt-32 px-5 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="font-headline-lg text-3xl text-[#202124]">Manage Blogs</h1>
          <Link
            href="/admin/blogs/create"
            className="flex items-center gap-2 bg-brand-vibrancy text-white px-5 py-2.5 rounded-lg hover:bg-brand-vibrancy/90 transition-colors font-label-caps"
          >
            <Plus size={16} />
            Create New
          </Link>
        </div>

        <div className="bg-luminary-white rounded-2xl shadow-sm border border-outline/10 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low border-b border-outline/10 text-sm font-label-caps text-on-surface-variant">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline/10">
              {blogs.map((blog: any) => (
                <tr key={blog._id} className="hover:bg-surface-container-lowest/50">
                  <td className="px-6 py-4 font-headline-md text-[#202124]">
                    {blog.title}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-label-caps ${
                        blog.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-3">
                    <Link
                      href={`/admin/blogs/${blog.slug || blog._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => deleteBlog(blog.slug || blog._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-on-surface-variant">
                    No blogs found. Create one to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
