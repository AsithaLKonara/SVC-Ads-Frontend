"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.append("q", searchQuery.trim());
    if (category) params.append("category", category);
    if (location) params.append("location", location);
    
    if (params.toString()) {
      router.push(`/search?${params.toString()}`);
    }
  };

  return (
    <section className="relative flex min-h-[600px] w-full flex-col items-center justify-center overflow-hidden py-24 md:min-h-[700px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Sri Lankan marketplace"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      </div>

      <div className="container relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <span className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-md">
          Sri Lanka's Premium Marketplace
        </span>
        <h1 className="mb-6 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Find what you need. <br className="hidden sm:inline" />
          <span className="text-brand-400">Sell what you don't.</span>
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-white/80 sm:text-xl">
          The safest, most trusted platform to buy and sell vehicles, properties, electronics, and more across Sri Lanka.
        </p>

        {/* Unified Search Box */}
        <div className="w-full max-w-4xl">
          <form onSubmit={handleSearch} className="flex w-full flex-col gap-2 rounded-2xl bg-card p-2 shadow-2xl sm:flex-row sm:items-center animate-in slide-in-from-bottom-8 duration-700 delay-300">
            {/* Search Input */}
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-foreground/40 group-focus-within:text-brand-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-transparent py-3 pl-12 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-foreground/50 hover:bg-foreground/5 focus:bg-transparent" 
                placeholder="What are you looking for?" 
              />
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />

            {/* Category Selector */}
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-foreground/40 group-focus-within:text-brand-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
              </div>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-xl bg-transparent py-3 pl-12 pr-10 text-sm text-foreground outline-none transition-all cursor-pointer hover:bg-foreground/5 focus:bg-transparent"
              >
                <option value="" className="bg-background">All Categories</option>
                <option value="vehicles" className="bg-background">Vehicles</option>
                <option value="properties" className="bg-background">Properties</option>
                <option value="electronics" className="bg-background">Electronics</option>
                <option value="furniture" className="bg-background">Home & Furniture</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-foreground/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <div className="hidden h-8 w-px bg-border sm:block" />

            {/* Location Selector */}
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-foreground/40 group-focus-within:text-brand-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full appearance-none rounded-xl bg-transparent py-3 pl-12 pr-10 text-sm text-foreground outline-none transition-all cursor-pointer hover:bg-foreground/5 focus:bg-transparent"
              >
                <option value="" className="bg-background">Entire Sri Lanka</option>
                <option value="colombo" className="bg-background">Colombo</option>
                <option value="kandy" className="bg-background">Kandy</option>
                <option value="galle" className="bg-background">Galle</option>
                <option value="kurunegala" className="bg-background">Kurunegala</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-foreground/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <button type="submit" className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-brand-600 transition-all hover:shadow-lg hover:-translate-y-0.5 sm:w-auto">
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
