"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("admin_token", data.token);
        router.push("/admin/blogs");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low px-4 pt-20">
      <div className="bg-luminary-white p-8 rounded-2xl shadow-sm border border-outline/10 w-full max-w-md">
        <h1 className="font-headline-lg text-2xl text-center mb-6 text-[#202124]">
          Admin Login
        </h1>
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-label-caps text-on-surface-variant mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-outline/20 rounded-lg focus:outline-none focus:border-brand-vibrancy transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-label-caps text-on-surface-variant mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-outline/20 rounded-lg focus:outline-none focus:border-brand-vibrancy transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brand-vibrancy text-white font-label-caps py-3 rounded-lg hover:bg-brand-vibrancy/90 transition-colors mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
