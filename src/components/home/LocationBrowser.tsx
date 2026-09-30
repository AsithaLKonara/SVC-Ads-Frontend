import Link from "next/link";
import React from "react";
import { adService } from "@/services/adService";

export default async function LocationBrowser() {
  let locationStats: { district: string; count: number }[] = [];
  try {
    // Show up to 12 locations
    locationStats = await adService.getLocationStats();
    locationStats = locationStats.slice(0, 12);
  } catch (error) {
    console.error("Failed to fetch location stats:", error);
    // Fallback gracefully
  }

  if (locationStats.length === 0) return null;

  const getGridClasses = (index: number, total: number) => {
    // Un-uniform pattern for a 4-column location grid
    const pattern = [2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 4];
    let span = pattern[index % pattern.length];
    
    // If this is the last item, stretch it to fill the remaining space in the row
    if (index === total - 1) {
      let sum = 0;
      for (let i = 0; i < total - 1; i++) {
        sum += pattern[i % pattern.length];
      }
      const remainder = sum % 4;
      span = remainder === 0 ? 4 : 4 - remainder;
    }
    
    // Convert numeric span to tailwind class
    const spanClass = {
      1: "md:col-span-1",
      2: "md:col-span-2",
      3: "md:col-span-3",
      4: "md:col-span-4",
    }[span] || "md:col-span-1";

    const heightClass = "min-h-[150px] md:min-h-[200px]";

    return `${spanClass} ${heightClass}`;
  };

  return (
    <section className="py-20 bg-[var(--background-alt)]">
      <div className="page-container">
        <div className="mb-12 flex flex-col items-center justify-center gap-4 text-center">
          <div>
            <h2 className="mb-2 font-heading text-3xl font-bold text-foreground sm:text-[36px]">
              Browse by Location
            </h2>
            <p className="text-foreground/60 max-w-2xl text-lg">
              Find exactly what you need in your neighborhood or across the country.
            </p>
          </div>
          <Link
            href="/locations"
            className="group inline-flex items-center gap-1 font-medium text-gold-500 hover:text-gold-400 transition-colors"
          >
            View all locations
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {locationStats.map((loc, index) => (
            <Link
              key={loc.district}
              href={`/ads?location=${loc.district.toLowerCase()}`}
              className={`group flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gold-300 hover:shadow-md ${getGridClasses(index, locationStats.length)}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              
              <div className="text-center">
                <h3 className={`font-heading font-bold text-foreground group-hover:text-gold-600 transition-colors ${index === 0 ? "text-2xl" : "text-lg"}`}>
                  {loc.district}
                </h3>
                <p className="mt-1 text-sm font-medium text-foreground/60">
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
