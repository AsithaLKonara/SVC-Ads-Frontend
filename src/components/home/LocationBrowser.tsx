import Link from "next/link";
import React from "react";
import { adService } from "@/services/adService";

export default async function LocationBrowser() {
  let locationStats: { district: string; count: number }[] = [];
  try {
    // Only take top 6 locations for the browser grid
    locationStats = await adService.getLocationStats();
    locationStats = locationStats.slice(0, 6);
  } catch (error) {
    console.error("Failed to fetch location stats:", error);
    // Fallback gracefully
  }

  if (locationStats.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
              Browse by Location
            </h2>
            <p className="text-slate-600 max-w-2xl text-lg">
              Find exactly what you need in your neighborhood or across the country.
            </p>
          </div>
          <Link
            href="/locations"
            className="group inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            View all locations
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {locationStats.map((loc) => (
            <Link
              key={loc.district}
              href={`/ads?location=${loc.district.toLowerCase()}`}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              
              <div className="text-center">
                <h3 className="font-heading text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                  {loc.district}
                </h3>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  {loc.count.toLocaleString()} Ads
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
