import Link from "next/link";
import React from "react";

export default function SellerBanner() {
  return (
    <section className="py-24 bg-brand-950 text-ivory-50">
      <div className="page-container">
        <div className="rounded-3xl bg-brand-900 border border-brand-800 p-8 sm:p-16 text-center shadow-premium relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/pexels-perqued-13203188.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay" />
          
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span className="mb-4 inline-flex tracking-widest uppercase text-gold-500 font-semibold text-xs sm:text-sm">
              FOR PROPERTY OWNERS
            </span>
            <h2 className="mb-6 font-heading text-3xl font-extrabold sm:text-5xl">
              Have a property to sell or rent?
            </h2>
            <p className="mb-10 text-lg text-ivory-50/80 sm:text-xl">
              Reach thousands of people searching for their next property on LAKLAND REALITY every day.
            </p>
            
            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-xl bg-gold-500 px-8 font-bold text-brand-950 shadow-md transition-all hover:-translate-y-1 hover:bg-gold-400 hover:shadow-lg"
            >
              Post Your Property
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
