"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  FileText,
  LogOut,
  Briefcase,
  ChevronRight,
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
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.replace("/admin/login");
        } else {
          setChecking(false);
        }
      } catch {
        router.replace("/admin/login");
      }
    };
    checkAuth();
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (checking) return null;

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Leads", href: "/admin/leads", icon: Users },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Services", href: "/admin/services", icon: Briefcase },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  ];

  return (
    <div
      style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      className="flex min-h-screen bg-[#e8e8e8]"
    >
      {/* ── Sidebar ── */}
      <aside
        className="w-56 flex-shrink-0 hidden md:flex flex-col"
        style={{ background: "#1a2340", borderRight: "2px solid #111827" }}
      >
        {/* Brand */}
        <div
          className="px-5 py-4"
          style={{ borderBottom: "1px solid #2d3a5a" }}
        >
          <Link href="/admin">
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "#9aa5be", fontFamily: "Georgia, serif" }}
            >
              Control Panel
            </p>
            <p
              className="text-base font-bold mt-0.5"
              style={{ color: "#ffffff", fontFamily: "Georgia, serif" }}
            >
              Admin
            </p>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" &&
                pathname.startsWith(link.href + "/"));
            const Icon = link.icon;
            return (
              <Link key={link.name} href={link.href}>
                <div
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors"
                  style={{
                    fontFamily: "Georgia, serif",
                    background: isActive ? "#2d3a5a" : "transparent",
                    color: isActive ? "#ffffff" : "#9aa5be",
                    borderLeft: isActive
                      ? "3px solid #f59e0b"
                      : "3px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background =
                        "#243050";
                      (e.currentTarget as HTMLElement).style.color = "#cbd5e1";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLElement).style.color = "#9aa5be";
                    }
                  }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{link.name}</span>
                  {isActive && (
                    <ChevronRight className="w-3 h-3 ml-auto opacity-60" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ borderTop: "1px solid #2d3a5a" }} className="p-3">
          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              router.push("/admin/login");
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors"
            style={{ color: "#9aa5be", fontFamily: "Georgia, serif" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#f87171";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#9aa5be";
            }}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="flex items-center justify-between px-6 py-3"
          style={{
            background: "#ffffff",
            borderBottom: "2px solid #d1d5db",
            fontFamily: "Georgia, serif",
          }}
        >
          <nav className="flex items-center gap-1 text-xs" style={{ color: "#6b7280" }}>
            <Link href="/admin" className="hover:underline" style={{ color: "#4b5563" }}>
              Admin
            </Link>
            {pathname !== "/admin" && (
              <>
                <span className="mx-1">/</span>
                <span style={{ color: "#111827" }} className="capitalize">
                  {pathname.split("/").filter(Boolean).slice(1).join(" › ")}
                </span>
              </>
            )}
          </nav>
          <span className="text-xs" style={{ color: "#9ca3af", fontFamily: "Georgia, serif" }}>
            Barrisol Admin v1
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
