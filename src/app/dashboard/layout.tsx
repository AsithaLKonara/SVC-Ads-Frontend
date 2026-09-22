import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  LineChart
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative h-8 w-8">
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
        </div>

        <nav className="flex flex-col gap-1 p-4">
          <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Overview
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-md bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link
            href="/dashboard/analytics"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <LineChart size={18} />
            Analytics
          </Link>
          
          <div className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Management
          </div>
          <Link
            href="/dashboard/ads"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <Tag size={18} />
            Advertisements
          </Link>
          <Link
            href="/dashboard/categories"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <FolderTree size={18} />
            Categories
          </Link>
          <Link
            href="/dashboard/locations"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <MapPin size={18} />
            Locations
          </Link>
          <Link
            href="/dashboard/users"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <Users size={18} />
            Users
          </Link>
          <Link
            href="/dashboard/reports"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            <AlertOctagon size={18} />
            Reports
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-slate-200 p-4">
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="ml-64 flex flex-1 flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
          <div className="flex w-full max-w-md items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500">
            <Search size={16} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by ID, user, or title..." 
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative text-slate-500 hover:text-slate-700">
              <Bell size={20} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                3
              </span>
            </button>
            <div className="h-8 w-8 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
              {/* Avatar placeholder */}
              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-600">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
