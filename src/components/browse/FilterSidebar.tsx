"use client";

import React, { useState, useMemo } from "react";
import { Category } from "@/services/categoryService";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { getDistricts } from "sri-lanka-postal-locations";

const ALL_DISTRICTS = getDistricts().map(d => d.name_en).sort((a, b) => a.localeCompare(b));

const PROPERTY_STATUS_OPTIONS = [
  "Bare Land",
  "Ready to Build",
  "Commercial Plot",
  "Agricultural / Estate",
  "Brand New",
  "Renovated / Existing",
  "Fully Furnished",
  "Semi-Furnished",
  "Under Construction"
];

const PRICE_PRESETS = [
  { label: "< 5M", min: "", max: "5000000" },
  { label: "5M - 15M", min: "5000000", max: "15000000" },
  { label: "15M - 30M", min: "15000000", max: "30000000" },
  { label: "30M - 50M", min: "30000000", max: "50000000" },
  { label: "50M+", min: "50000000", max: "" },
];

export default function FilterSidebar({ 
  onClose, 
  categories = [], 
  locations = [] 
}: { 
  onClose?: () => void; 
  categories?: Category[]; 
  locations?: string[]; 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const currentCategory = searchParams.get('category') || '';
  const currentLocations = searchParams.getAll('district');
  const currentConditions = searchParams.getAll('condition');
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  
  // Sections open by default: category, location, price, condition
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    location: true,
    price: true,
    condition: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Available locations: combination of passed locations (with ads) and fallback full Sri Lanka districts
  const availableLocations = useMemo(() => {
    if (locations && locations.length > 0) {
      // Merge unique
      const set = new Set([...locations, ...ALL_DISTRICTS]);
      return Array.from(set);
    }
    return ALL_DISTRICTS;
  }, [locations]);

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    
    // Reset page on category change
    params.delete('page');
    
    if (!slug) {
      router.push('/ads');
      return;
    }
    
    if (pathname.startsWith('/') && pathname !== '/ads' && pathname !== '/search' && pathname !== '/') {
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

  const applyPricePreset = (min: string, max: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (min) {
      params.set('minPrice', min);
    } else {
      params.delete('minPrice');
    }
    if (max) {
      params.set('maxPrice', max);
    } else {
      params.delete('maxPrice');
    }
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeFiltersCount = 
    (currentCategory ? 1 : 0) +
    currentLocations.length +
    currentConditions.length +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0);

  return (
    <div className="flex h-full flex-col bg-background text-foreground">
      {/* Mobile Header (Hidden on Desktop) */}
      <div className="flex items-center justify-between border-b border-border p-4 lg:hidden">
        <div className="flex items-center gap-2">
          <h2 className="font-heading text-lg font-bold text-foreground">Filters</h2>
          {activeFiltersCount > 0 && (
            <span className="rounded-full bg-brand-500/10 px-2 py-0.5 text-xs font-semibold text-brand-600">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {onClose && (
          <button onClick={onClose} className="rounded-full p-2 hover:bg-card text-foreground/70" aria-label="Close filters">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-0 space-y-1">
        
        {/* Category Accordion */}
        <div className="border-b border-border/50 py-4 lg:pt-0">
          <button
            type="button"
            onClick={() => toggleSection("category")}
            className="flex w-full items-center justify-between font-heading text-sm font-semibold text-foreground hover:text-brand-600 transition-colors"
          >
            <span>Category</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openSections.category ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
          </button>
          
          {openSections.category && (
            <div className="mt-3 flex flex-col gap-2">
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
                const isSelected = currentCategory === cat.slug || pathname.includes(`/${cat.slug}`);
                const hasChildren = cat.children && cat.children.length > 0;
                
                return (
                  <div key={cat.id} className="flex flex-col gap-1">
                    <label className="flex items-center gap-3 group cursor-pointer">
                      <div className="relative flex h-5 w-5 items-center justify-center rounded border border-border bg-card group-hover:border-brand-500 transition-colors">
                        <input 
                          type="radio" 
                          name="category" 
                          value={cat.slug} 
                          checked={isSelected && (!pathname.includes(`/${cat.slug}/`) || !currentCategory)}
                          onChange={() => handleCategoryChange(cat.slug)}
                          className="peer sr-only" 
                        />
                        <div className="h-2.5 w-2.5 rounded-sm bg-brand-500 opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-sm text-foreground/80 group-hover:text-foreground font-medium">{cat.name}</span>
                    </label>

                    {isSelected && hasChildren && (
                      <div className="ml-6 flex flex-col gap-1.5 border-l-2 border-brand-200/60 pl-3 pt-1 pb-1">
                        {cat.children!.map((sub) => {
                          const isSubSelected = pathname.endsWith(`/${sub.slug}`) || currentCategory === sub.slug;
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.delete('page');
                                router.push(`/${cat.slug}/${sub.slug}`);
                              }}
                              className={`text-left text-xs transition-colors hover:text-brand-600 ${
                                isSubSelected ? "text-brand-600 font-bold" : "text-foreground/70"
                              }`}
                            >
                              • {sub.name}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Location Accordion */}
        <div className="border-b border-border/50 py-4">
          <button
            type="button"
            onClick={() => toggleSection("location")}
            className="flex w-full items-center justify-between font-heading text-sm font-semibold text-foreground hover:text-brand-600 transition-colors"
          >
            <span>District / Location</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openSections.location ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
          </button>
          
          {openSections.location && (
            <div className="mt-3 flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
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
                <span className="text-sm font-medium text-foreground/90">All Districts</span>
              </label>

              {availableLocations.map((loc) => (
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

        {/* Price Range Accordion */}
        <div className="border-b border-border/50 py-4">
          <button
            type="button"
            onClick={() => toggleSection("price")}
            className="flex w-full items-center justify-between font-heading text-sm font-semibold text-foreground hover:text-brand-600 transition-colors"
          >
            <span>Price (LKR)</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openSections.price ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
          </button>
          
          {openSections.price && (
            <div className="mt-3 space-y-3">
              {/* Quick price presets */}
              <div className="flex flex-wrap gap-1.5">
                {PRICE_PRESETS.map((preset) => {
                  const isActive = minPrice === preset.min && maxPrice === preset.max;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => applyPricePreset(preset.min, preset.max)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                        isActive
                          ? "bg-brand-500 text-white border-brand-500 shadow-xs"
                          : "bg-card border-border text-foreground/80 hover:border-brand-400 hover:text-brand-600"
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min LKR" 
                  defaultValue={minPrice}
                  onBlur={(e) => handlePriceChange('minPrice', e.target.value)}
                  className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-xs outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-foreground"
                />
                <span className="text-foreground/40 text-xs">-</span>
                <input 
                  type="number" 
                  placeholder="Max LKR" 
                  defaultValue={maxPrice}
                  onBlur={(e) => handlePriceChange('maxPrice', e.target.value)}
                  className="w-full rounded-lg border border-border bg-card px-3 py-1.5 text-xs outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-foreground"
                />
              </div>
            </div>
          )}
        </div>

        {/* Property & Land Status Accordion */}
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection("condition")}
            className="flex w-full items-center justify-between font-heading text-sm font-semibold text-foreground hover:text-brand-600 transition-colors"
          >
            <span>Property &amp; Land Status</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-200 ${openSections.condition ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6"/></svg>
          </button>

          {openSections.condition && (
            <div className="mt-3 flex flex-col gap-2">
              {PROPERTY_STATUS_OPTIONS.map((status) => (
                <label key={status} className="flex items-center gap-3 group cursor-pointer">
                  <div className="relative flex h-5 w-5 items-center justify-center rounded border border-border bg-card group-hover:border-brand-500 transition-colors">
                    <input 
                      type="checkbox" 
                      value={status} 
                      checked={currentConditions.includes(status)}
                      onChange={(e) => handleArrayFilterChange('condition', status, e.target.checked)}
                      className="peer sr-only" 
                    />
                    <svg className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 peer-checked:bg-brand-500 rounded-sm absolute inset-0 m-auto pointer-events-none transition-all" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span className="text-sm text-foreground/80 group-hover:text-foreground">{status}</span>
                </label>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Footer Actions (Hidden on Desktop) */}
      <div className="border-t border-border/50 p-4 lg:hidden flex gap-2">
        <button 
          type="button"
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            const q = params.get('q');
            const newParams = new URLSearchParams();
            if (q) newParams.set('q', q);
            router.push(`${pathname}?${newParams.toString()}`);
            if (onClose) onClose();
          }} 
          className="w-1/3 rounded-xl border border-border bg-card py-3 font-semibold text-foreground shadow-sm hover:bg-foreground/5 active:scale-95 transition-all text-sm"
        >
          Reset
        </button>
        <button 
          type="button"
          onClick={onClose} 
          className="flex-1 rounded-xl bg-brand-500 py-3 font-semibold text-white shadow hover:bg-brand-600 active:scale-95 transition-all text-sm"
        >
          Apply Filters
        </button>
      </div>

      {/* Desktop Reset Button */}
      <div className="hidden lg:block border-t border-border/50 p-4 mt-auto">
        <button 
          type="button"
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            const q = params.get('q');
            const newParams = new URLSearchParams();
            if (q) newParams.set('q', q);
            router.push(`${pathname}?${newParams.toString()}`);
          }} 
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-2 text-sm font-semibold text-foreground shadow-sm hover:bg-foreground/5 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Reset All Filters
        </button>
      </div>
    </div>
  );
}
