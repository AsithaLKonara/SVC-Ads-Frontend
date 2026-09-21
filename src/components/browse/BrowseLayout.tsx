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

// Dictionary for Dynamic Category Content
const CATEGORY_DATA: Record<string, { desc: string; subcategories: string[]; seoContent: { text: string; faqs: { q: string; a: string }[] } }> = {
  vehicles: {
    desc: "Find the best deals on cars, motorbikes, and vans in Sri Lanka.",
    subcategories: ["Cars", "Motorbikes", "Vans", "Three Wheelers", "Bicycles", "Heavy Duty"],
    seoContent: {
      text: "Sri Lanka's premier vehicle marketplace. Whether you're looking for a fuel-efficient hybrid for the city commute or a robust 4x4, our extensive listings connect you directly with sellers across the island.",
      faqs: [
        { q: "What should I check before buying a used car?", a: "Always check the vehicle's registration book (CR), service history, and have it inspected by a certified mechanic before finalizing." },
        { q: "Can I filter vehicles by mileage?", a: "Yes, use the advanced filters in the sidebar to narrow down options by mileage, year, and condition." }
      ]
    }
  },
  electronics: {
    desc: "Buy and sell mobile phones, laptops, and home appliances instantly.",
    subcategories: ["Mobile Phones", "Laptops", "Cameras", "TVs", "Audio", "Home Appliances"],
    seoContent: {
      text: "Discover the latest gadgets and electronics. From brand new smartphones to gently used gaming consoles, find verified sellers near your location.",
      faqs: [
        { q: "Is it safe to buy used electronics online?", a: "We recommend thoroughly testing devices in person during the meetup before handing over payment." }
      ]
    }
  }
};

// Fallback dynamic generator
const getCategoryData = (slug: string) => {
  if (CATEGORY_DATA[slug]) return CATEGORY_DATA[slug];
  
  const name = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    desc: `Browse the best listings in ${name}. Connect with sellers instantly.`,
    subcategories: [`All ${name}`, "Top Rated", "Newest", "Budget"],
    seoContent: {
      text: `Looking for ${name}? You're in the right place. Browse thousands of verified listings spanning across Sri Lanka.`,
      faqs: [
        { q: `How do I post an ad in ${name}?`, a: "Click the 'Post an Ad' button in the top right corner and select this category during the creation process." }
      ]
    }
  };
};

interface BrowseLayoutProps {
  category?: string;
  subcategory?: string;
}

export default function BrowseLayout({ category, subcategory }: BrowseLayoutProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Format the title correctly
  const formatTitle = (str?: string) => {
    if (!str) return null;
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formattedCategory = formatTitle(category);
  const formattedSubcategory = formatTitle(subcategory);
  const pageTitle = formattedSubcategory ? `${formattedSubcategory} in ${formattedCategory}` : formattedCategory ? `${formattedCategory} Ads` : "All Ads";
  
  const catData = category ? getCategoryData(category.toLowerCase()) : null;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />

      {/* Secondary Bar / Breadcrumb */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-foreground/60 font-medium overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            
            {category ? (
              <>
                <span className="mx-2">/</span>
                <Link href={`/${category}`} className={`hover:text-brand-500 transition-colors ${!subcategory ? "text-foreground" : ""}`}>
                  {formattedCategory}
                </Link>
                {subcategory && (
                  <>
                    <span className="mx-2">/</span>
                    <span className="text-foreground">{formattedSubcategory}</span>
                  </>
                )}
              </>
            ) : (
              <>
                <span className="mx-2">/</span>
                <span className="text-foreground">All Ads</span>
              </>
            )}
          </nav>
          
          <button 
            className="ml-4 shrink-0 flex items-center gap-2 rounded-lg bg-card border border-border px-3 py-1.5 text-sm font-semibold text-foreground hover:bg-card/80 lg:hidden transition-colors"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Filters
          </button>
        </div>
      </div>

      <main className="flex-1 pb-16">
        
        {/* CATEGORY SPECIFIC HEADER ELEMENTS */}
        {category && catData && (
          <div className="bg-card border-b border-border mb-8 pb-8">
            <div className="container mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
              
              {/* Category Hero */}
              <div className="mb-8 max-w-3xl">
                <h1 className="mb-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">{formattedCategory}</h1>
                <p className="mb-6 text-lg text-foreground/70">{catData.desc}</p>
                
                {/* Search within Category */}
                <div className="flex max-w-xl items-center rounded-xl border border-border bg-background p-1.5 shadow-sm focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all">
                  <div className="pl-3 pr-2 text-foreground/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder={`Search within ${formattedCategory}...`}
                    className="w-full bg-transparent px-2 py-2.5 text-sm outline-none text-foreground placeholder:text-foreground/40"
                  />
                  <button className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-brand-600 transition-colors">
                    Search
                  </button>
                </div>
              </div>

              {/* Subcategories Strip */}
              {!subcategory && (
                <div>
                  <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-foreground/50">Explore Subcategories</h3>
                  <div className="flex flex-wrap gap-3">
                    {catData.subcategories.map(sub => (
                      <Link 
                        key={sub} 
                        href={`/${category}/${sub.toLowerCase().replace(/ /g, '-')}`}
                        className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:border-brand-500 hover:text-brand-500 transition-colors shadow-sm"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* MAIN LAYOUT */}
        <div className={`container mx-auto flex max-w-7xl gap-8 px-4 sm:px-6 lg:px-8 ${!category ? "pt-8" : ""}`}>
          
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
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsMobileFiltersOpen(false)}
              />
              <div className="absolute inset-y-0 left-0 w-[280px] sm:w-[320px] bg-background shadow-2xl overflow-hidden animate-in slide-in-from-left duration-300">
                <FilterSidebar onClose={() => setIsMobileFiltersOpen(false)} />
              </div>
            </div>
          )}

          {/* Results Area */}
          <div className="flex-1 min-w-0">
            
            {/* Page Header (Generic) */}
            {!category && (
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-2">
                <div>
                  <h1 className="font-heading text-2xl font-bold text-foreground">{pageTitle}</h1>
                  <p className="text-sm text-foreground/60">Showing 1 - 12 of 12,450 results</p>
                </div>
                <SortAndToggle viewMode={viewMode} setViewMode={setViewMode} />
              </div>
            )}

            {/* In Category mode, just show a minimal header since H1 is in Hero */}
            {category && (
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-2">
                <p className="text-sm font-semibold text-foreground/60">Showing 1 - 12 of 3,240 results</p>
                <SortAndToggle viewMode={viewMode} setViewMode={setViewMode} />
              </div>
            )}

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
              <span className="flex h-10 w-10 items-center justify-center text-foreground/40">...</span>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground/80 hover:bg-background transition-colors font-semibold">12</button>
              <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground/80 hover:bg-background transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </div>

          </div>
        </div>

        {/* CATEGORY SEO CONTENT */}
        {category && catData && (
          <div className="container mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-card border border-border p-8 lg:p-12">
              <h2 className="mb-4 font-heading text-2xl font-bold text-foreground">About {formattedCategory} in Sri Lanka</h2>
              <p className="mb-8 text-foreground/70 leading-relaxed max-w-4xl">{catData.seoContent.text}</p>
              
              <h3 className="mb-6 font-heading text-xl font-bold text-foreground">Frequently Asked Questions</h3>
              <div className="grid gap-6 md:grid-cols-2 max-w-5xl">
                {catData.seoContent.faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl bg-background p-6 border border-border/50">
                    <h4 className="mb-2 font-bold text-foreground flex gap-2 items-start">
                      <span className="text-brand-500 mt-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg></span>
                      {faq.q}
                    </h4>
                    <p className="text-sm text-foreground/70 pl-6">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

// Extracted helper for layout cleanliness
function SortAndToggle({ viewMode, setViewMode }: { viewMode: "grid" | "list", setViewMode: (mode: "grid"| "list") => void }) {
  return (
    <div className="flex items-center gap-4 shrink-0">
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
  )
}

