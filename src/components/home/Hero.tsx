"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Category } from "@/services/categoryService";
import MarketplaceHighlights from "./MarketplaceHighlights";

import { getDistricts } from "sri-lanka-postal-locations";

const districts = getDistricts().map(d => d.name_en).sort((a, b) => a.localeCompare(b));

export default function Hero({ categories = [] }: { categories?: Category[] }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const heroImages = [
    "/images/hero/house-wallpaper-1920x1080-coastal-marine-26026.jpg",
    "/images/hero/modern-house-wallpaper-1920x1080-coastal-living-tranquil-waters-25569.jpg",
    "/images/hero/modern-house-wallpaper-1920x1080-infinity-pool-evening-light-25547.jpg",
    "/images/hero/modern-house-wallpaper-1920x1080-open-concept-clean-lines-25699.jpg"
  ];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append("q", searchQuery.trim());
    if (category) params.append("category", category);
    if (location) params.append("district", location);
    
    if (params.toString()) {
      router.push(`/search?${params.toString()}`);
    }
  };

  return (
    <section className="relative flex min-h-[600px] sm:min-h-[680px] lg:min-h-[760px] w-full flex-col justify-between overflow-hidden -mt-20 pt-28 sm:pt-36 md:pt-44">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0 bg-gray-900">
        {heroImages.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Sri Lankan marketplace ${index + 1}`}
            fill
            priority={index === 0}
            className={`object-cover object-center transition-all ease-out duration-[7000ms] ${
              index === currentImageIndex ? "opacity-100 scale-110" : "opacity-0 scale-100"
            }`}
          />
        ))}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6 lg:px-8 my-auto">
        <span className="mb-3 sm:mb-4 inline-flex tracking-widest uppercase text-gold-500 font-semibold text-xs sm:text-sm">
          Find your place in Sri Lanka
        </span>
        <h1 className="mb-4 sm:mb-6 font-heading text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Your Property. <br className="hidden sm:inline" />
          <span className="text-gold-400">Your Future.</span>
        </h1>
        <p className="mb-8 sm:mb-10 max-w-2xl text-base sm:text-xl text-white drop-shadow-md font-medium tracking-wide">
          Discover land, homes and investment opportunities across Sri Lanka.
        </p>

        {/* Unified Search Box */}
        <div className="w-full max-w-4xl">
          <form onSubmit={handleSearch} className="flex w-full flex-col gap-2 rounded-2xl bg-card p-2.5 sm:p-2 shadow-2xl sm:flex-row sm:items-center animate-in slide-in-from-bottom-8 duration-700 delay-300">
            {/* Search Input */}
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-foreground/40 group-focus-within:text-brand-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <input 
                type="text"
                aria-label="Search what you are looking for"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-transparent py-3 pl-12 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground/50 hover:bg-foreground/5 focus:bg-transparent focus-visible:ring-2 focus-visible:ring-brand-500" 
                placeholder="What are you looking for?" 
              />
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />
            <div className="h-px w-full bg-border/40 sm:hidden" />

            {/* Category Selector */}
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-foreground/40 group-focus-within:text-brand-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
              </div>
              <select 
                aria-label="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-xl bg-transparent py-3 pl-12 pr-10 text-sm text-foreground outline-none transition-all cursor-pointer hover:bg-foreground/5 focus:bg-transparent focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <option value="" className="bg-background">All Categories</option>
                {categories.filter(c => !c.parentId).map(cat => (
                  <option key={cat.id} value={cat.slug} className="bg-background">{cat.name}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-foreground/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />
            <div className="h-px w-full bg-border/40 sm:hidden" />

            {/* Location Selector */}
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-foreground/40 group-focus-within:text-brand-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <select 
                aria-label="Select location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full appearance-none rounded-xl bg-transparent py-3 pl-12 pr-10 text-sm text-foreground outline-none transition-all cursor-pointer hover:bg-foreground/5 focus:bg-transparent focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <option value="" className="bg-background">Entire Sri Lanka</option>
                {districts.map(dist => (
                  <option key={dist} value={dist.toLowerCase()} className="bg-background">{dist}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-foreground/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <button type="submit" className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gold-500 px-8 py-3 text-sm font-semibold text-brand-950 shadow-md hover:bg-gold-400 transition-all hover:shadow-lg hover:-translate-y-0.5">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="relative z-10 w-full mt-10 sm:mt-14 lg:mt-auto">
        <MarketplaceHighlights />
      </div>
    </section>
  );
}
