"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  Image as ImageIcon,
  Briefcase,
  Plus,
  Edit,
  Trash2,
  ArrowUpRight,
  Loader2,
} from "lucide-react";

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
    const token = localStorage.getItem("admin_token");
    const res = await fetch(`/api/blogs/${slug}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setBlogs((prev) => prev.filter((b) => b.slug !== slug));
    else alert(data.message || "Failed to delete");
  };

  const deleteService = async (slug: string) => {
    if (!confirm("Delete this service?")) return;
    const token = localStorage.getItem("admin_token");
    const res = await fetch(`/api/services/${slug}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setServices((prev) => prev.filter((s) => s.slug !== slug));
    else alert(data.message || "Failed to delete");
  };

  const metrics = [
    { title: "Contact Leads", value: leads.length, icon: Users, href: "/admin/leads" },
    { title: "Blogs", value: blogs.length, icon: FileText, href: "/admin/blogs" },
    { title: "Services", value: services.length, icon: Briefcase, href: "/admin/services" },
    { title: "Gallery Images", value: galleryCount, icon: ImageIcon, href: "/admin/gallery" },
  ];

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-medium tracking-tight text-zinc-900">Overview</h2>
        <p className="text-sm text-zinc-500 mt-1">Manage everything from one place.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
            >
              <Link href={metric.href}>
                <div className="bg-white border border-zinc-200 rounded-2xl p-5 group hover:border-zinc-300 hover:shadow-sm transition-all h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-zinc-100 rounded-lg">
                      <Icon className="w-4 h-4 text-zinc-600" />
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-zinc-500 transition-colors" />
                  </div>
                  <p className="text-2xl font-medium tracking-tight text-zinc-900">{metric.value}</p>
                  <p className="text-xs text-zinc-500 mt-1 font-medium">{metric.title}</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Blogs Table */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-zinc-900">Blogs</h3>
          <Link
            href="/admin/blogs/create"
            className="flex items-center gap-1.5 text-xs font-medium bg-zinc-900 text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> New Blog
          </Link>
        </div>
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-medium text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3 hidden md:table-cell">Status</th>
                <th className="px-5 py-3 hidden md:table-cell">Date</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {blogs.slice(0, 8).map((blog) => (
                <tr key={blog._id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-zinc-900 truncate max-w-xs">
                    {blog.title}
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${blog.isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-zinc-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 flex justify-end gap-1.5">
                    <Link
                      href={`/admin/blogs/${blog.slug || blog._id}`}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={14} />
                    </Link>
                    <button
                      onClick={() => deleteBlog(blog.slug || blog._id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-zinc-400 text-sm">
                    No blogs yet.{" "}
                    <Link href="/admin/blogs/create" className="text-zinc-600 underline underline-offset-2">
                      Create one
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {blogs.length > 8 && (
            <div className="px-5 py-3 border-t border-zinc-100">
              <Link href="/admin/blogs" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
                View all {blogs.length} blogs →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Services Table */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-medium text-zinc-900">Services</h3>
          <Link
            href="/admin/services/create"
            className="flex items-center gap-1.5 text-xs font-medium bg-zinc-900 text-white px-3 py-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> New Service
          </Link>
        </div>
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-medium text-xs uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3 hidden md:table-cell">Category</th>
                <th className="px-5 py-3 hidden md:table-cell">Status</th>
                <th className="px-5 py-3 hidden md:table-cell">Date</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {services.slice(0, 8).map((service) => (
                <tr key={service._id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-zinc-900 truncate max-w-xs">
                    {service.title}
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-zinc-600">
                    {service.category || "—"}
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${service.isPublished ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {service.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell text-zinc-500">
                    {new Date(service.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 flex justify-end gap-1.5">
                    <Link
                      href={`/admin/services/${service.slug || service._id}`}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit size={14} />
                    </Link>
                    <button
                      onClick={() => deleteService(service.slug || service._id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-zinc-400 text-sm">
                    No services yet.{" "}
                    <Link href="/admin/services/create" className="text-zinc-600 underline underline-offset-2">
                      Create one
                    </Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {services.length > 8 && (
            <div className="px-5 py-3 border-t border-zinc-100">
              <Link href="/admin/services" className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
                View all {services.length} services →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
