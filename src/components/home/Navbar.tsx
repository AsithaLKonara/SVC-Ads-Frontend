"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/logo.JPG" 
            alt="LAKLAND REALITY" 
            width={40} 
            height={40} 
            className="rounded-lg object-cover"
          />
          <span className="text-xl font-heading font-bold text-foreground tracking-tight hidden sm:block">
            LAKLAND REALITY
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/ads"
            className="text-sm font-medium text-foreground/80 hover:text-brand-600 transition-colors"
          >
            Browse
          </Link>
          <Link
            href="/categories"
            className="text-sm font-medium text-foreground/80 hover:text-brand-600 transition-colors"
          >
            Categories
          </Link>
        </nav>

        {/* Search Bar (Hidden on Mobile) */}
        <div className="hidden flex-1 max-w-xl mx-8 lg:block">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-foreground/40 group-focus-within:text-brand-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-full border border-border bg-background p-2.5 pl-10 text-sm text-foreground outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20" 
              placeholder="Search for anything (e.g. iPhone, Toyota, House)..." 
            />
            <button type="submit" className="absolute inset-y-1.5 right-1.5 rounded-full bg-brand-500 px-4 text-xs font-bold text-white shadow hover:bg-brand-600 transition-colors">
              Search
            </button>
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu Button */}
          <button className="md:hidden flex items-center justify-center rounded-full p-2 text-foreground/70 hover:bg-black/5 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
}
