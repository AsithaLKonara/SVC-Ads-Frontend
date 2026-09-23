"use client";

import React, { useState } from "react";
import { Category } from "@/services/categoryService";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function FilterSidebar({ onClose, categories = [], locations = [] }: { onClose?: () => void, categories?: Category[], locations?: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const currentCategory = searchParams.get('category') || '';
  const currentLocations = searchParams.getAll('district');
  const currentConditions = searchParams.getAll('condition');
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  
  // Simple toggle states for accordion
  const [openSection, setOpenSection] = useState<string>("category");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    
    // Reset page on category change
    params.delete('page');
    
    // Check if we are on a specific category route rather than /search or /ads
    if (pathname.startsWith('/') && pathname !== '/ads' && pathname !== '/search' && pathname !== '/') {
        // If we are on /[category], we should probably navigate there directly instead of setting query param
        router.push(`/${slug}`);
    } else {
        router.push(`${pathname}?${params.toString()}`);
    }
  };

  const handleArrayFilterChange = (key: string, value: string, isChecked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(key);
    
    params.delete(key);
    
    if (isChecked) {
      currentValues.push(value);
    } else {
      const index = currentValues.indexOf(value);
      if (index > -1) currentValues.splice(index, 1);
    }
    
    currentValues.forEach(v => params.append(key, v));
    params.delete('page'); // Reset pagination
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePriceChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      {/* Mobile Header (Hidden on Desktop) */}
      <div className="flex items-center justify-between border-b border-border p-4 lg:hidden">
        <h2 className="font-heading text-lg font-bold text-foreground">Filters</h2>
        {onClose && (
          <button onClick={onClose} className="rounded-full p-2 hover:bg-card text-foreground/70">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            <span className="sr-only">Close filters</span>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-0">
        
        {/* Category Accordion */}
        <div className="border-b border-border/50 py-4 lg:pt-0">
          <button
            onClick={() => toggleSection("category")}
            className="flex w-full items-center justify-between font-heading text-sm font-semibold text-foreground hover:text-brand-600"
          >
            Category
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${openSection === "category" ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
          </button>
          
          {openSection === "category" && (
            <div className="mt-4 flex flex-col gap-2">
              {/* All Categories Option */}
              <label className="flex items-center gap-3 group cursor-pointer">
                <div className="relative flex h-5 w-5 items-center justify-center rounded border border-border bg-card group-hover:border-brand-500 transition-colors">
                  <input 
                    type="radio" 
                    name="category" 
                    value="" 
                    checked={!currentCategory && pathname === '/ads'}
                    onChange={() => handleCategoryChange('')} 
                    className="peer sr-only" 
                  />
                  <div className="h-2.5 w-2.5 rounded-sm bg-brand-500 opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-sm text-foreground/80 group-hover:text-foreground">All Categories</span>
              </label>

              {categories.filter(c => !c.parentId).map((cat) => {
                // Check if current route is exactly this category
                const isSelected = currentCategory === cat.slug || pathname.includes(`/${cat.slug}`);
                
                return (
                  <label key={cat.id} className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative flex h-5 w-5 items-center justify-center rounded border border-border bg-card group-hover:border-brand-500 transition-colors">
                      <input 
                        type="radio" 
                        name="category" 
                        value={cat.slug} 
                        checked={isSelected}
                        onChange={() => handleCategoryChange(cat.slug)}
                        className="peer sr-only" 
                      />
                      <div className="h-2.5 w-2.5 rounded-sm bg-brand-500 opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm text-foreground/80 group-hover:text-foreground">{cat.name}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Location Accordion */}
        <div className="border-b border-border/50 py-4">
          <button
            onClick={() => toggleSection("location")}
            className="flex w-full items-center justify-between font-heading text-sm font-semibold text-foreground hover:text-brand-600"
          >
            Location
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${openSection === "location" ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
          </button>
          
          {openSection === "location" && (
            <div className="mt-4 flex flex-col gap-2">
              <label className="flex items-center gap-3 group cursor-pointer">
                <div className="relative flex h-5 w-5 items-center justify-center rounded border border-border bg-card group-hover:border-brand-500 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={currentLocations.length === 0}
                    onChange={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.delete('district');
                      params.delete('page');
                      router.push(`${pathname}?${params.toString()}`);
                    }}
                    className="peer sr-only" 
                  />
                  <svg className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 peer-checked:bg-brand-500 rounded-sm absolute inset-0 m-auto pointer-events-none transition-all" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span className="text-sm text-foreground/80 group-hover:text-foreground">All Locations</span>
              </label>

              {locations.length > 0 && locations.map((loc) => (
                  <label key={loc} className="flex items-center gap-3 group cursor-pointer">
                    <div className="relative flex h-5 w-5 items-center justify-center rounded border border-border bg-card group-hover:border-brand-500 transition-colors">
                      <input 
                        type="checkbox" 
                        value={loc} 
                        checked={currentLocations.includes(loc)}
                        onChange={(e) => handleArrayFilterChange('district', loc, e.target.checked)}
                        className="peer sr-only" 
                      />
                      <svg className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 peer-checked:bg-brand-500 rounded-sm absolute inset-0 m-auto pointer-events-none transition-all" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span className="text-sm text-foreground/80 group-hover:text-foreground">{loc}</span>
                  </label>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div className="border-b border-border/50 py-4">
          <button
            onClick={() => toggleSection("price")}
            className="flex w-full items-center justify-between font-heading text-sm font-semibold text-foreground hover:text-brand-600"
          >
            Price Range
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${openSection === "price" ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
          </button>
          
          {openSection === "price" && (
            <div className="mt-4 flex items-center gap-2">
              <input 
                type="number" 
                placeholder="Min" 
                defaultValue={minPrice}
                onBlur={(e) => handlePriceChange('minPrice', e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-foreground"
              />
              <span className="text-foreground/50">-</span>
              <input 
                type="number" 
                placeholder="Max" 
                defaultValue={maxPrice}
                onBlur={(e) => handlePriceChange('maxPrice', e.target.value)}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-foreground"
              />
            </div>
          )}
        </div>

        {/* Condition */}
        <div className="py-4">
          <h3 className="mb-4 font-heading text-sm font-semibold text-foreground">Condition</h3>
          <div className="flex flex-col gap-2">
            {["New", "Used", "Like New", "Refurbished"].map((cond) => (
              <label key={cond} className="flex items-center gap-3 group cursor-pointer">
                <div className="relative flex h-5 w-5 items-center justify-center rounded border border-border bg-card group-hover:border-brand-500 transition-colors">
                  <input 
                    type="checkbox" 
                    value={cond} 
                    checked={currentConditions.includes(cond)}
                    onChange={(e) => handleArrayFilterChange('condition', cond, e.target.checked)}
                    className="peer sr-only" 
                  />
                  <svg className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 peer-checked:bg-brand-500 rounded-sm absolute inset-0 m-auto pointer-events-none transition-all" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span className="text-sm text-foreground/80 group-hover:text-foreground">{cond}</span>
              </label>
            ))}
          </div>
        </div>

      </div>

      {/* Mobile Footer Actions (Hidden on Desktop) */}
      <div className="border-t border-border/50 p-4 lg:hidden">
        <button onClick={onClose} className="w-full rounded-xl bg-brand-500 py-3 font-semibold text-white shadow hover:bg-brand-600 active:scale-95 transition-all">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
