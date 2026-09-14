"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  ShieldCheck,
  UserPlus,
  Trash2,
  Key,
  User,
  Eye,
  EyeOff,
  Copy,
  Check,
} from "lucide-react";
import { format } from "date-fns";

interface AdminUser {
  _id: string;
  username: string;
  rawPassword?: string;
  isSystem?: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showFormPassword, setShowFormPassword] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<{ [id: string]: boolean }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/admin-users");
      const data = await res.json();
      if (data.admins) {
        setAdmins(data.admins);
      }
    } catch (err) {
      console.error("Failed to fetch admins:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create admin");
      }

      setSuccess(`Admin "${data.admin.username}" created successfully!`);
      setUsername("");
      setPassword("");
      fetchAdmins();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAdmin = async (id: string, adminUsername: string) => {
    if (!confirm(`Are you sure you want to delete admin "${adminUsername}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin-users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete admin");
      }
      setAdmins((prev) => prev.filter((a) => a._id !== id));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <header className="mb-8">
        <h2 className="text-2xl font-medium tracking-tight text-zinc-900 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-indigo-600" />
          Admin Management
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          Create, view, and manage administrator accounts and passwords.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Create Admin Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-medium text-zinc-900 mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-indigo-600" />
              Add New Admin
            </h3>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-lg">
                {success}
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. barrisol admin"
                    className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
                  <input
                    type={showFormPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-10 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowFormPassword(!showFormPassword)}
                    className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600"
                    title={showFormPassword ? "Hide Password" : "Show Password"}
                  >
                    {showFormPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create Admin
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Existing Admins List */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-medium text-zinc-900 mb-4">
              Registered Admins & Credentials
            </h3>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
              </div>
            ) : admins.length === 0 ? (
              <div className="text-center py-10 bg-zinc-50 border border-dashed border-zinc-200 rounded-xl">
                <ShieldCheck className="w-8 h-8 mx-auto text-zinc-400 mb-2" />
                <p className="text-zinc-500 font-medium text-sm">
                  No admins found.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-medium">
                    <tr>
                      <th className="px-4 py-3">Username</th>
                      <th className="px-4 py-3">Password</th>
                      <th className="px-4 py-3">Created</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {admins.map((admin) => {
                      const isPasswordVisible = visiblePasswords[admin._id];
                      const passText = admin.rawPassword || "••••••••";

                      return (
                        <tr key={admin._id} className="hover:bg-zinc-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-zinc-900 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                              {admin.username.charAt(0).toUpperCase()}
                            </div>
                            <span>{admin.username}</span>
                          </td>

                          {/* Password Field */}
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-md max-w-fit">
                              <span>
                                {isPasswordVisible ? passText : "••••••••"}
                              </span>
                              <button
                                type="button"
                                onClick={() => togglePasswordVisibility(admin._id)}
                                className="text-zinc-400 hover:text-zinc-600 ml-1"
                                title={isPasswordVisible ? "Hide" : "Show"}
                              >
                                {isPasswordVisible ? (
                                  <EyeOff className="w-3.5 h-3.5" />
                                ) : (
                                  <Eye className="w-3.5 h-3.5" />
                                )}
                              </button>
                              {admin.rawPassword && (
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(admin.rawPassword!, admin._id)}
                                  className="text-zinc-400 hover:text-indigo-600"
                                  title="Copy Password"
                                >
                                  {copiedId === admin._id ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              )}
                            </div>
                          </td>

                          {/* Created date */}
                          <td className="px-4 py-3 text-zinc-500 text-xs whitespace-nowrap">
                            {admin.createdAt
                              ? format(new Date(admin.createdAt), "MMM d, yyyy")
                              : "N/A"}
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => handleDeleteAdmin(admin._id, admin.username)}
                              disabled={deletingId === admin._id}
                              className="p-1.5 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Admin"
                            >
                              {deletingId === admin._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
