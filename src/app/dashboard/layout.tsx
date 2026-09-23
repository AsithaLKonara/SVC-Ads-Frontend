"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Tag,
  FolderTree,
  LogOut,
  Bell,
  Search,
  MapPin,
  AlertOctagon,
  LineChart,
  Menu,
  X,
  ShieldAlert,
} from "lucide-react";

type User = {
  name: string;
  role: string;
};

// Helper — only run window checks on the client
const isMobile = () =>
  typeof window !== "undefined" && window.innerWidth < 1024;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ─────────────────────────────────────────────────────────────────────────
  // SIDEBAR STATE — single source of truth.
  //
  // We always start as `true` (open) for SSR/hydration consistency.
  // After hydration a one-time effect corrects the initial value on mobile
  // screens without causing a hydration mismatch.
  // ─────────────────────────────────────────────────────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // After hydration: close immediately on mobile so the sidebar isn't
  // blocking the screen on first load. This runs exactly once.
  useEffect(() => {
    if (isMobile()) {
      setSidebarOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // AUTH — load user from localStorage
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (!userData) {
        router.replace("/login");
        return;
      }
      setUser(JSON.parse(userData));
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.replace("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // ─────────────────────────────────────────────────────────────────────────
  // ROUTE CHANGE — only close on mobile; desktop keeps its own state
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isMobile()) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  // ─────────────────────────────────────────────────────────────────────────
  // LOGOUT
  // ─────────────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.replace("/login");
  };

  // ─────────────────────────────────────────────────────────────────────────
  // LOADING GUARD
  // ─────────────────────────────────────────────────────────────────────────
  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-brand-600" />
          <p className="text-sm font-medium text-slate-500">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  const isAdmin = user.role === "ADMIN";

  // Helper used by nav links — close only on mobile
  const closeOnMobile = () => {
    if (isMobile()) setSidebarOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-slate-50">
      {/* ===================================================================
          MOBILE OVERLAY
          Renders only when sidebar is open.
          Hidden on lg+ via lg:hidden so it never blocks desktop clicks.
          z-40 keeps it below the sidebar (z-50) and above content (z-30).
          =================================================================== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ===================================================================
          SIDEBAR
          Always mounted — CSS transforms handle show/hide so transitions
          animate in both directions. Never return null for the sidebar.

          translate-x-0       → visible (open)
          -translate-x-full   → offscreen left (closed)

          Both class strings are complete literals so Tailwind v4 JIT
          includes both rules in the compiled CSS bundle.
          =================================================================== */}
      <aside
        className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-slate-200 transition-[transform] duration-300 ease-in-out"
        style={{ transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)" }}
        aria-label="Sidebar navigation"
      >
        {/* Sidebar header ------------------------------------------------- */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2"
            onClick={closeOnMobile}
          >
            <div className="relative h-8 w-8 shrink-0">
              <Image
                src="/logo.JPG"
                alt="LAKLAND REALITY"
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Admin Portal
            </span>
          </Link>

          {/* X button — visible on mobile only */}
          <button
            type="button"
            aria-label="Close sidebar"
            className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation ----------------------------------------------------- */}
        <nav className="flex-1 overflow-y-auto p-4" aria-label="Main navigation">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Overview
          </div>

          <Link
            href="/dashboard"
            onClick={closeOnMobile}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === "/dashboard"
                ? "bg-brand-50 text-brand-700"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          {isAdmin && (
            <Link
              href="/dashboard/analytics"
              onClick={closeOnMobile}
              className={`mt-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                pathname === "/dashboard/analytics"
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <LineChart size={18} />
              Analytics
            </Link>
          )}

          <div className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Management
          </div>

          <Link
            href="/dashboard/ads"
            onClick={closeOnMobile}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname.startsWith("/dashboard/ads")
                ? "bg-brand-50 text-brand-700"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Tag size={18} />
            Advertisements
          </Link>

          <Link
            href="/dashboard/categories"
            onClick={closeOnMobile}
            className={`mt-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname.startsWith("/dashboard/categories")
                ? "bg-brand-50 text-brand-700"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <FolderTree size={18} />
            Categories
          </Link>

          <Link
            href="/dashboard/locations"
            onClick={closeOnMobile}
            className={`mt-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
              pathname.startsWith("/dashboard/locations")
                ? "bg-brand-50 text-brand-700"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <MapPin size={18} />
            Locations
          </Link>

          {isAdmin && (
            <Link
              href="/dashboard/users"
              onClick={closeOnMobile}
              className={`mt-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                pathname.startsWith("/dashboard/users")
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Users size={18} />
              Users
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/dashboard/reports"
              onClick={closeOnMobile}
              className={`mt-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                pathname.startsWith("/dashboard/reports")
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              <AlertOctagon size={18} />
              Reports
            </Link>
          )}

          {isAdmin && (
            <>
              <div className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Security
              </div>
              <Link
                href="/dashboard/audit-logs"
                onClick={closeOnMobile}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  pathname.startsWith("/dashboard/audit-logs")
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <ShieldAlert size={18} />
                Audit Logs
              </Link>
            </>
          )}
        </nav>

        {/* Sidebar footer ------------------------------------------------- */}
        <div className="shrink-0 border-t border-slate-200 bg-white p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ===================================================================
          MAIN CONTENT
          On lg+ screens, add left margin matching sidebar width.
          Both "lg:ml-64" and "lg:ml-0" are complete literal strings so
          Tailwind v4 JIT compiles both rules into the CSS bundle.

          On mobile there is no margin — the sidebar overlaps as a drawer.
          =================================================================== */}
      <div
        className="flex min-h-screen flex-col transition-[margin-left] duration-300 ease-in-out"
        style={{ marginLeft: sidebarOpen ? "var(--sidebar-margin, 0px)" : "0px" }}
        ref={(el) => {
          if (!el) return;
          const update = () => {
            el.style.marginLeft =
              sidebarOpen && window.innerWidth >= 1024 ? "256px" : "0px";
          };
          update();
          window.addEventListener("resize", update);
          return () => window.removeEventListener("resize", update);
        }}
      >
        {/* Header --------------------------------------------------------- */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            {/* Single toggle button — works on mobile and desktop */}
            <button
              type="button"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              onClick={() => setSidebarOpen((prev) => !prev)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Search */}
            <div className="hidden w-full max-w-md items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 sm:flex focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
              <Search size={16} className="shrink-0 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID, user, or title..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="ml-4 flex shrink-0 items-center gap-4">
            <button
              type="button"
              aria-label="Notifications"
              className="relative rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <Bell size={20} />
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                3
              </span>
            </button>

            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100">
              <span className="text-sm font-bold text-slate-600">
                {user.name?.charAt(0)?.toUpperCase() ?? "A"}
              </span>
            </div>
          </div>
        </header>

        {/* Page content --------------------------------------------------- */}
        <main className="w-full flex-1 overflow-auto p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
