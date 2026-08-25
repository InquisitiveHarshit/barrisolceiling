"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  FileText,
  LogOut,
  Briefcase,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }

    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/admin/login");
    } else {
      setChecking(false);
    }
  }, [pathname, router]);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Show nothing while checking auth to avoid flash of protected content
  if (checking) {
    return null;
  }

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Leads", href: "/admin/leads", icon: Users },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  ];

  return (
    <div className="flex min-h-[100dvh] bg-zinc-50">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white border-r border-zinc-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-zinc-100">
          <Link href="/admin">
            <h1 className="text-xl font-medium tracking-tight text-zinc-900">
              Admin Panel
            </h1>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1 mt-4">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href + "/"));
            const Icon = link.icon;
            return (
              <Link key={link.name} href={link.href}>
                <motion.div
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.96 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-zinc-100 text-zinc-900"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </motion.div>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-zinc-200">
          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              router.push("/admin/login");
            }}
          >
            <motion.div
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  );
}
