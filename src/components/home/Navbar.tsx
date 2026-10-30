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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const isTransparent = isHome && !isScrolled && !isMobileMenuOpen;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsMobileMenuOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: "Buy", path: "/buy" },
    { name: "Rent", path: "/rent" },
    { name: "Land", path: "/land" },
    { name: "How it works", path: "/how-it-works" },
    { name: "Safety", path: "/safety" },
    { name: "Contact", path: "/contact" },
  ];

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
        <nav className="hidden md:flex items-center justify-center gap-8 shrink-0" aria-label="Main Navigation">
          {navLinks.map((link) => (
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
          <button 
            type="button"
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg text-ivory-50 hover:bg-brand-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-nav-menu" 
          className="md:hidden border-t border-brand-800/80 bg-brand-900/98 backdrop-blur-xl shadow-2xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="page-container py-5 flex flex-col gap-4">
            {/* Mobile Search in menu for smaller screens */}
            <form onSubmit={handleSearch} className="sm:hidden relative w-full">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties..." 
                className="w-full rounded-full border border-brand-700 bg-brand-800/80 py-2.5 pl-4 pr-10 text-sm text-ivory-50 placeholder:text-ivory-50/70 focus:outline-none focus:ring-1 focus:ring-gold-500 transition-all"
              />
              <button 
                type="submit" 
                aria-label="Search" 
                className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-gold-500 text-brand-950 transition-colors hover:bg-gold-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
            </form>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive 
                        ? "bg-gold-500/15 text-gold-400 font-semibold" 
                        : "text-ivory-50 hover:bg-brand-800/70 hover:text-gold-300 active:bg-brand-800"
                    }`}
                  >
                    <span>{link.name}</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="18" 
                      height="18" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className={isActive ? "text-gold-400" : "text-ivory-50/40"}
                    >
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
