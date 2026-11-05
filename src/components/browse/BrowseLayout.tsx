"use client";

import React, { useState } from "react";
import FilterSidebar from "@/components/browse/FilterSidebar";
import AdCard from "@/components/ui/AdCard";
import Link from "next/link";
import { Category } from "@/services/categoryService";
import { Ad, PaginatedAds } from "@/services/adService";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getFirstImageThumbnail } from "@/utils/media";

// Real Estate Dynamic Category Content & FAQs
const CATEGORY_DATA: Record<string, { desc: string; subcategories: string[]; seoContent: { text: string; faqs: { q: string; a: string }[] } }> = {
  lands: {
    desc: "Discover commercially valuable lands, residential plots, and agricultural estates across Sri Lanka.",
    subcategories: ["Commercial Lands", "Residential Lands", "Agricultural Lands", "Beachfront Lands", "Industrial Plots", "Plantations"],
    seoContent: {
      text: "Sri Lanka's premier real estate platform connecting property owners, buyers, and investors with prime commercial and residential lands. Every listing features verified location details, road access, and clear deeds.",
      faqs: [
        { q: "What legal documents should I check before purchasing land in Sri Lanka?", a: "Ensure you verify the title deed (Sinnakkara or Bim Saviya), extracts of title from the Land Registry for the past 30 years, street line certificates, and approved survey plan." },
        { q: "Can I filter lands by district and perch price?", a: "Yes, use the advanced filters in the sidebar to narrow down options by district, price range, and land status." }
      ]
    }
  },
  properties: {
    desc: "Explore luxury houses, residential villas, and modern homes for sale across Sri Lanka.",
    subcategories: ["Houses", "Villas", "Bungalows", "Apartments", "Luxury Homes", "Colonial Properties"],
    seoContent: {
      text: "Find your dream home with Lakland Realty. Browse through extensive listings of houses, architectural villas, and residential developments in Colombo, Kandy, Galle, and across the island.",
      faqs: [
        { q: "How do I schedule a property inspection or site visit?", a: "You can contact the property owner or Lakland Realty agent directly through the phone number or inquiry form on the listing page." },
        { q: "What should I look for during a property viewing?", a: "Check structural integrity, water and electricity connections, deed validity, neighborhood infrastructure, and access road width." }
      ]
    }
  },
  commercial: {
    desc: "Prime commercial buildings, office spaces, warehouses, and retail outlets for sale and lease.",
    subcategories: ["Commercial Buildings", "Office Spaces", "Retail & Shops", "Warehouses & Storage", "Hotels & Resorts", "Factories"],
    seoContent: {
      text: "Expand your business with prime commercial real estate in high-growth commercial hubs across Sri Lanka. High-visibility locations with exceptional ROI.",
      faqs: [
        { q: "Are commercial properties suitable for foreign investment?", a: "Yes, foreign investors can purchase freehold condominiums above the 4th floor or lease commercial lands in accordance with Sri Lankan investment laws and BOI guidelines." },
        { q: "How can I evaluate commercial real estate yields?", a: "Evaluate rental yield, footfall, road frontage, zoning classification, and capital appreciation potential of the surrounding area." }
      ]
    }
  },
  rentals: {
    desc: "Find residential houses, luxury apartments, and commercial spaces available for rent and lease.",
    subcategories: ["Houses for Rent", "Apartments for Rent", "Commercial Spaces", "Short-term Rentals", "Annexes & Rooms"],
    seoContent: {
      text: "Browse verified rental listings across Sri Lanka. Find flexible lease agreements for luxury residences, family homes, and commercial premises.",
      faqs: [
        { q: "What are standard rental advance terms in Sri Lanka?", a: "Most landlords request a security deposit equivalent to 3 to 6 months of rent along with monthly rental payments." },
        { q: "What should be included in a tenancy agreement?", a: "A formal tenancy agreement drafted by an attorney should state the monthly rent, deposit, maintenance responsibilities, utility payments, and notice period." }
      ]
    }
  }
};

// Fallback dynamic generator
const getCategoryData = (slug: string) => {
  if (CATEGORY_DATA[slug]) return CATEGORY_DATA[slug];
  
  const name = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return {
    desc: `Browse the best property and land listings in ${name}. Connect with verified sellers and investors instantly.`,
    subcategories: [`All ${name}`, "Top Rated", "Newest", "Prime Investment"],
    seoContent: {
      text: `Looking for ${name}? You're in the right place. Browse verified property listings spanning across Sri Lanka.`,
      faqs: [
        { q: `How do I list a property in ${name}?`, a: "Click the 'Post Your Property' button or contact Lakland Realty to have your property featured to thousands of qualified buyers." }
      ]
    }
  };
};

interface BrowseLayoutProps {
  category?: string;
  subcategory?: string;
  searchQuery?: string;
  categories?: Category[];
  initialData?: PaginatedAds;
  locations?: string[];
}

export default function BrowseLayout({ 
  category, 
  subcategory, 
  searchQuery, 
  categories = [], 
  initialData, 
  locations = [] 
}: BrowseLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [catSearchInput, setCatSearchInput] = useState(searchParams.get('q') || '');

  // Format the title correctly
  const formatTitle = (str?: string) => {
    if (!str) return null;
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formattedCategory = formatTitle(category);
  const formattedSubcategory = formatTitle(subcategory);
  
  let pageTitle = "All Properties & Lands";
  if (searchQuery) {
    pageTitle = `Search: "${searchQuery}"`;
  } else if (formattedSubcategory) {
    pageTitle = `${formattedSubcategory} in ${formattedCategory}`;
  } else if (formattedCategory) {
    pageTitle = `${formattedCategory} Listings`;
  }
  
  const catData = category ? getCategoryData(category.toLowerCase()) : null;

  const ads = initialData?.data || [];
  const mappedAds = ads.map(ad => {
    const d = new Date(ad.createdAt);
    const postedTime = `${d.getUTCDate().toString().padStart(2, '0')}/${(d.getUTCMonth() + 1).toString().padStart(2, '0')}/${d.getUTCFullYear()}`;
    
    return {
      id: ad.id,
      slug: ad.slug,
      title: ad.title,
      price: ad.price.toLocaleString('en-US'),
      location: `${ad.city}, ${ad.district}`,
      image: getFirstImageThumbnail(ad.images),
      postedTime,
      condition: ad.condition || undefined,
      isFeatured: ad.isFeatured
    };
  });

  const handleCategorySearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (catSearchInput.trim()) {
      params.set('q', catSearchInput.trim());
    } else {
      params.delete('q');
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Secondary Bar / Breadcrumb */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-foreground/60 font-medium overflow-x-auto whitespace-nowrap hide-scrollbar">
            <Link href="/" className="hover:text-brand-500 transition-colors">Home</Link>
            
            {category ? (
              <>
                <span className="mx-2">/</span>
                <Link href={`/${category}`} className={`hover:text-brand-500 transition-colors ${!subcategory ? "text-foreground font-semibold" : ""}`}>
                  {formattedCategory}
                </Link>
                {subcategory && (
                  <>
                    <span className="mx-2">/</span>
                    <span className="text-foreground font-semibold">{formattedSubcategory}</span>
                  </>
                )}
              </>
            ) : (
              <>
                <span className="mx-2">/</span>
                <span className="text-foreground font-semibold">All Properties</span>
              </>
            )}
          </nav>
          
          <button 
            type="button"
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
                <form onSubmit={handleCategorySearchSubmit} className="flex max-w-xl items-center rounded-xl border border-border bg-background p-1.5 shadow-sm focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all">
                  <div className="pl-3 pr-2 text-foreground/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  </div>
                  <input 
                    type="text" 
                    value={catSearchInput}
                    onChange={(e) => setCatSearchInput(e.target.value)}
                    placeholder={`Search within ${formattedCategory}...`}
                    className="w-full bg-transparent px-2 py-2 text-sm outline-none text-foreground placeholder:text-foreground/40"
                  />
                  <button type="submit" className="rounded-lg bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-brand-600 transition-colors">
                    Search
                  </button>
                </form>
              </div>

              {/* Subcategories Strip */}
              {!subcategory && (
                <div>
                  <h3 className="mb-3 font-heading text-xs font-bold uppercase tracking-wider text-foreground/50">Explore Subcategories</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {(() => {
                      const matchedCat = categories.find(c => c.slug === category);
                      if (matchedCat && matchedCat.children && matchedCat.children.length > 0) {
                        return matchedCat.children.map(sub => (
                          <Link 
                            key={sub.id} 
                            href={`/${category}/${sub.slug}`}
                            className="rounded-full border border-border bg-background px-4 py-1.5 text-xs font-medium text-foreground hover:border-brand-500 hover:text-brand-500 transition-colors shadow-xs"
                          >
                            {sub.name}
                          </Link>
                        ));
                      }
                      return catData.subcategories.map(subName => (
                        <span 
                          key={subName} 
                          className="rounded-full border border-border/80 bg-background/80 px-3.5 py-1 text-xs font-medium text-foreground/70"
                        >
                          {subName}
                        </span>
                      ));
                    })()}
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
              <FilterSidebar categories={categories} locations={locations} />
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
                <FilterSidebar onClose={() => setIsMobileFiltersOpen(false)} categories={categories} locations={locations} />
              </div>
            </div>
          )}

          {/* Results Area */}
          <div className="flex-1 min-w-0">
            
            {/* Page Header (Generic or Search) */}
            {!category && (
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-2">
                <div>
                  <h1 className="font-heading text-2xl font-bold text-foreground">{pageTitle}</h1>
                  <p className="text-sm text-foreground/60">Showing {mappedAds.length} properties</p>
                </div>
                <SortAndToggle viewMode={viewMode} setViewMode={setViewMode} isSearch={!!searchQuery} />
              </div>
            )}

            {/* In Category mode, just show a minimal header since H1 is in Hero */}
            {category && (
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-2">
                <p className="text-sm font-semibold text-foreground/60">Showing {mappedAds.length} properties</p>
                <SortAndToggle viewMode={viewMode} setViewMode={setViewMode} isSearch={!!searchQuery} />
              </div>
            )}

            {/* Grid/List */}
            {mappedAds.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "flex flex-col gap-4"}>
                {mappedAds.map((ad) => (
                  <AdCard key={ad.id} {...ad} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
                <div className="mb-4 rounded-full bg-card p-4 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/40"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">No properties found</h3>
                <p className="mt-2 max-w-md text-sm text-foreground/60">We couldn't find any properties matching your current filters. Try adjusting your price range, district, or property status.</p>
              </div>
            )}

            {/* Category SEO Content & Real Estate FAQs */}
            {catData && catData.seoContent && (
              <div className="mt-16 rounded-2xl border border-border/70 bg-card p-6 sm:p-8 space-y-6">
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground mb-3">About {formattedCategory} in Sri Lanka</h2>
                  <p className="text-sm text-foreground/75 leading-relaxed">{catData.seoContent.text}</p>
                </div>

                {catData.seoContent.faqs && catData.seoContent.faqs.length > 0 && (
                  <div className="border-t border-border/50 pt-6">
                    <h3 className="font-heading text-base font-bold text-foreground mb-4">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      {catData.seoContent.faqs.map((faq, idx) => (
                        <div key={idx} className="rounded-xl bg-background/60 p-4 border border-border/50">
                          <h4 className="font-semibold text-sm text-foreground mb-1.5">{faq.q}</h4>
                          <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {initialData && initialData.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button 
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('page', String(initialData.page - 1));
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                  disabled={initialData.page <= 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground/50 hover:bg-background transition-colors disabled:opacity-50"
                  aria-label="Previous page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                
                {Array.from({ length: initialData.totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  if (pageNum === 1 || pageNum === initialData.totalPages || (pageNum >= initialData.page - 1 && pageNum <= initialData.page + 1)) {
                    return (
                      <button 
                        key={pageNum}
                        onClick={() => {
                          const params = new URLSearchParams(searchParams.toString());
                          params.set('page', String(pageNum));
                          router.push(`${pathname}?${params.toString()}`);
                        }}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          initialData.page === pageNum 
                            ? 'bg-brand-500 text-white shadow-sm font-semibold' 
                            : 'border border-border bg-card text-foreground/80 hover:bg-background transition-colors font-semibold'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (pageNum === initialData.page - 2 || pageNum === initialData.page + 2) {
                    return <span key={pageNum} className="flex h-10 w-10 items-center justify-center text-foreground/40">...</span>;
                  }
                  return null;
                })}

                <button 
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('page', String(initialData.page + 1));
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                  disabled={initialData.page >= initialData.totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground/80 hover:bg-background transition-colors disabled:opacity-50"
                  aria-label="Next page"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            )}

          </div>
        </div>

      </main>
    </div>
  );
}

// Extracted helper for layout cleanliness
function SortAndToggle({ viewMode, setViewMode, isSearch }: { viewMode: "grid" | "list", setViewMode: (mode: "grid"| "list") => void, isSearch?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const currentSort = searchParams.get('sort') || (isSearch ? 'relevance' : 'newest');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-4 shrink-0">
      <select 
        className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
        value={currentSort}
        onChange={handleSortChange}
      >
        {isSearch && <option value="relevance" className="bg-background">Sort by: Relevance</option>}
        <option value="newest" className="bg-background">Sort by: Newest</option>
        <option value="price-asc" className="bg-background">Price: Low to High</option>
        <option value="price-desc" className="bg-background">Price: High to Low</option>
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
  );
}
