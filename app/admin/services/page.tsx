"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchServices();
  }, [router]);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services?published=false");
      const data = await res.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error("Error fetching services", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`/api/services/${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchServices();
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting service", error);
    }
  };

  if (loading) {
    return <div className="p-10 pt-32 text-center">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-zinc-900">
            Manage Services
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Create, edit, and manage your service pages.
          </p>
        </div>
        <Link
          href="/admin/services/create"
          className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
        >
          <Plus size={16} />
          Create New
        </Link>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-medium">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {services.map((service: any) => (
              <tr key={service._id} className="hover:bg-zinc-50 transition-colors">
                <td className="px-6 py-4 font-medium text-zinc-900">
                  {service.title}
                </td>
                <td className="px-6 py-4 text-zinc-600">
                  {service.category || "—"}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      service.isPublished
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {service.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-500">
                  {new Date(service.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <Link
                    href={`/admin/services/${service.slug || service._id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => deleteService(service.slug || service._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-zinc-400">
                  No services yet. Create one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
