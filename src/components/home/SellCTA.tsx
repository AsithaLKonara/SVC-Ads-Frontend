import Link from "next/link";
import React from "react";

export default function SellCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl rounded-3xl bg-brand-600 px-6 py-16 text-center shadow-2xl relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-500/50 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand-700/50 blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="mb-4 font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Have something to sell?
          </h2>
          <p className="mb-10 max-w-2xl text-lg text-brand-50">
            Join thousands of Sri Lankans making money by selling their unused items. Post your ad for free in under 2 minutes.
          </p>
          <Link
            href="/post-ad"
            className="group flex h-14 items-center justify-center rounded-2xl bg-white px-8 font-heading text-lg font-bold text-brand-600 shadow-xl hover:bg-brand-50 hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            Post an Ad Now
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform group-hover:translate-x-1"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
