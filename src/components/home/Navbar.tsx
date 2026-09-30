"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const isHome = pathname === "/";

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = isHome && !isScrolled;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isTransparent 
        ? "bg-transparent border-transparent" 
        : "bg-brand-900 border-b border-brand-800 shadow-sm"
    }`}>
      <div className="page-container flex h-20 items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex flex-1 items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/logo.JPG" 
              alt="LAKLAND REALITY" 
              width={48} 
              height={48} 
              className="rounded object-cover transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-heading font-bold text-ivory-50 tracking-tight hidden lg:block">
              LAKLAND REALITY
            </span>
          </Link>
        </div>

        {/* Center Section: Navigation */}
        <nav className="hidden md:flex items-center justify-center gap-8 shrink-0">
          {[
            { name: "Buy", path: "/buy" },
            { name: "Rent", path: "/rent" },
            { name: "Land", path: "/land" },
            { name: "How it works", path: "/how-it-works" },
            { name: "Safety", path: "/safety" },
            { name: "Contact", path: "/contact" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`text-sm font-medium transition-colors ${
                pathname === link.path ? "text-gold-400" : "text-ivory-50 hover:text-gold-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Section: Actions */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <form onSubmit={handleSearch} className="hidden sm:flex relative w-full max-w-[280px]">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search properties..." 
              className={`w-full rounded-full border py-2.5 pl-4 pr-10 text-sm text-ivory-50 placeholder:text-ivory-50/70 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all ${
                isTransparent ? "bg-black/20 border-white/20 backdrop-blur-md" : "bg-brand-800/50 border-brand-700"
              }`}
            />
            <button type="submit" aria-label="Search" className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-gold-500 text-brand-950 transition-colors hover:bg-gold-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button aria-label="Toggle mobile menu" className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-ivory-50 hover:bg-brand-800 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
