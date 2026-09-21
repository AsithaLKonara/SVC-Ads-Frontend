import Image from "next/image";
import React from "react";

export default function Hero() {
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
        <div className="w-full max-w-4xl rounded-3xl bg-white p-2 shadow-2xl md:p-3">
          <form className="flex flex-col gap-2 md:flex-row md:items-center">
            
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full rounded-2xl border-none bg-gray-50 py-3.5 pl-12 pr-4 text-gray-900 outline-none focus:bg-gray-100 focus:ring-0 transition-colors"
              />
            </div>
            
            <div className="h-px w-full bg-gray-200 md:h-10 md:w-px" />
            
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
              </div>
              <select className="w-full appearance-none rounded-2xl border-none bg-transparent py-3.5 pl-12 pr-10 text-gray-900 outline-none hover:bg-gray-50 focus:bg-gray-100 transition-colors cursor-pointer">
                <option value="">All Categories</option>
                <option value="vehicles">Vehicles</option>
                <option value="properties">Properties</option>
                <option value="electronics">Electronics</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <div className="h-px w-full bg-gray-200 md:h-10 md:w-px" />

            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <select className="w-full appearance-none rounded-2xl border-none bg-transparent py-3.5 pl-12 pr-10 text-gray-900 outline-none hover:bg-gray-50 focus:bg-gray-100 transition-colors cursor-pointer">
                <option value="">All Locations</option>
                <option value="colombo">Colombo</option>
                <option value="kandy">Kandy</option>
                <option value="galle">Galle</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center rounded-2xl bg-brand-500 py-3.5 px-8 font-medium text-white shadow-lg hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-all hover:scale-[1.02]"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
