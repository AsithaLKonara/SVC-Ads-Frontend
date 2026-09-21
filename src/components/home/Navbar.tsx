import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white font-bold text-xl">
            Y
          </div>
          <span className="text-xl font-heading font-bold text-foreground tracking-tight">
            Yaka.lk
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

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center justify-center rounded-full p-2 text-foreground/70 hover:bg-black/5 hover:text-foreground transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          
          <Link
            href="/login"
            className="hidden sm:inline-flex text-sm font-medium text-foreground/80 hover:text-brand-600 transition-colors"
          >
            Login
          </Link>

          <Link
            href="/post-ad"
            className="inline-flex h-10 items-center justify-center rounded-full bg-brand-500 px-6 text-sm font-medium text-white shadow-sm hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Post an Ad
          </Link>

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
