"use client";

import React, { useState } from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import FilterSidebar from "@/components/browse/FilterSidebar";
import AdCard from "@/components/ui/AdCard";
import Link from "next/link";

// Mock Data for Ads Page
const mockAds = Array.from({ length: 12 }).map((_, i) => ({
  id: `ad-${i}`,
  title: [
    "Toyota Aqua S Grade 2014",
    "Luxury 2BR Apartment in Havelock City",
    "Apple iPhone 14 Pro Max 256GB",
    "Honda Vezel Z Sensing 2016",
    "Professional Plumbing Services",
    "Teak Dining Table with 6 Chairs"
  ][i % 6],
  price: ["7,800,000", "45,000,000", "320,000", "9,500,000", "2,500", "125,000"][i % 6],
  location: ["Colombo 6", "Havelock Town", "Kandy City", "Nugegoda", "Dehiwala", "Moratuwa"][i % 6],
  image: [
    "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1617806118233-18e1c0945594?auto=format&fit=crop&w=800&q=80"
  ][i % 6],
  postedTime: `${(i % 5) + 1} hours ago`,
  condition: ["Used", "New", "Like New", "Used", "Service", "Like New"][i % 6],
  isFeatured: i < 2,
}));

export default function AdsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      {/* Secondary Bar / Breadcrumb */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-foreground/60 font-medium">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">All Ads</span>
          </nav>
          
          <button 
            className="flex items-center gap-2 rounded-lg bg-card border border-border px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-card/80 lg:hidden transition-colors"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Filters
          </button>
        </div>
      </div>

      <main className="container mx-auto flex max-w-7xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24 pb-8">
            <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Refine Search</h2>
            <FilterSidebar />
          </div>
        </aside>

        {/* Mobile Slide-Over Filter Drawer */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
              onClick={() => setIsMobileFiltersOpen(false)}
            />
            {/* Drawer */}
            <div className="absolute inset-y-0 left-0 w-[280px] sm:w-[320px] bg-background shadow-2xl overflow-hidden animate-in slide-in-from-left duration-300">
              <FilterSidebar onClose={() => setIsMobileFiltersOpen(false)} />
            </div>
          </div>
        )}

        {/* Results Area */}
        <div className="flex-1 min-w-0">
          
          {/* Page Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-2">
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">All Ads</h1>
              <p className="text-sm text-foreground/60">Showing 1 - 12 of 12,450 results</p>
            </div>

            <div className="flex items-center gap-4">
              <select className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500">
                <option value="newest">Sort by: Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="relevance">Relevance</option>
              </select>

              <div className="hidden items-center gap-1 rounded-lg border border-border bg-card p-1 sm:flex">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded p-1.5 transition-colors ${viewMode === "grid" ? "bg-background text-brand-500 shadow-sm" : "text-foreground/40 hover:text-foreground/80"}`}
                  aria-label="Grid view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded p-1.5 transition-colors ${viewMode === "list" ? "bg-background text-brand-500 shadow-sm" : "text-foreground/40 hover:text-foreground/80"}`}
                  aria-label="List view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Grid/List */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "flex flex-col gap-4"}>
            {mockAds.map((ad) => (
              <AdCard key={ad.id} {...ad} viewMode={viewMode} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground/50 hover:bg-background transition-colors disabled:opacity-50" disabled>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-white shadow-sm font-semibold">1</button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground/80 hover:bg-background transition-colors font-semibold">2</button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground/80 hover:bg-background transition-colors font-semibold">3</button>
            <span className="flex h-10 w-10 items-center justify-center text-foreground/40">...</span>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground/80 hover:bg-background transition-colors font-semibold">12</button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground/80 hover:bg-background transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
