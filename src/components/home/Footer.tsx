import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-gray-950 text-gray-400 py-16 border-t border-gray-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pexels-the-ghazi-2152398165-32570635.jpg"
          alt="Footer Background"
          fill
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/90 to-gray-950/80" />
      </div>
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 mb-12">
          
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="mb-6 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white font-bold text-xl">
                Y
              </div>
              <span className="text-2xl font-heading font-bold text-white tracking-tight">
                Yaka.lk
              </span>
            </Link>
            <p className="mb-6 max-w-sm text-sm">
              Sri Lanka's premier classifieds marketplace. Find what you need, sell what you don't. Fast, secure, and easy to use.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-gray-400 hover:bg-brand-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-gray-400 hover:bg-brand-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-gray-400 hover:bg-brand-500 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Marketplace</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/ads" className="text-sm hover:text-brand-400 transition-colors">Browse Ads</Link></li>
              <li><Link href="/categories" className="text-sm hover:text-brand-400 transition-colors">Categories</Link></li>
              <li><Link href="/locations" className="text-sm hover:text-brand-400 transition-colors">Locations</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Help</h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="/how-it-works" className="text-sm hover:text-brand-400 transition-colors">How It Works</Link></li>
              <li><Link href="/safety" className="text-sm hover:text-brand-400 transition-colors">Safety Tips</Link></li>
              <li><Link href="/listing-rules" className="text-sm hover:text-brand-400 transition-colors">Listing Rules</Link></li>
              <li><Link href="/faq" className="text-sm hover:text-brand-400 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-brand-400 transition-colors">Contact</Link></li>
            </ul>
          </div>



        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-xs">
            © {new Date().getFullYear()} Yaka.lk. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-xs hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="text-xs hover:text-white transition-colors">Privacy</Link>
            <Link href="/cookies" className="text-xs hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
