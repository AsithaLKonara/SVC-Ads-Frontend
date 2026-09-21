import Image from "next/image";
import Link from "next/link";
import React from "react";

const locations = [
  {
    name: "Colombo",
    adsCount: "25,430 Ads",
    image: "https://images.unsplash.com/photo-1589136777351-fdc9c9cb15f4?auto=format&fit=crop&w=800&q=80",
    colSpan: "col-span-1 sm:col-span-2 lg:col-span-2",
  },
  {
    name: "Kandy",
    adsCount: "8,210 Ads",
    image: "https://images.unsplash.com/photo-1586523992293-8472481358b5?auto=format&fit=crop&w=800&q=80",
    colSpan: "col-span-1 lg:col-span-1",
  },
  {
    name: "Galle",
    adsCount: "5,340 Ads",
    image: "https://images.unsplash.com/photo-1590454794696-224c3e80062b?auto=format&fit=crop&w=800&q=80",
    colSpan: "col-span-1 lg:col-span-1",
  },
  {
    name: "Kurunegala",
    adsCount: "4,120 Ads",
    image: "https://images.unsplash.com/photo-1625721111613-2d2f7035ce4a?auto=format&fit=crop&w=800&q=80",
    colSpan: "col-span-1 sm:col-span-2 lg:col-span-2",
  },
];

export default function LocationBrowser() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Browse by Location
            </h2>
            <p className="text-foreground/60 max-w-2xl text-lg">
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((loc) => (
            <Link
              key={loc.name}
              href={`/ads?location=${loc.name.toLowerCase()}`}
              className={`group relative flex h-64 flex-col justify-end overflow-hidden rounded-2xl ${loc.colSpan}`}
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={loc.image}
                  alt={loc.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>
              
              <div className="relative z-10 p-6">
                <h3 className="mb-1 font-heading text-2xl font-bold text-white">
                  {loc.name}
                </h3>
                <p className="text-sm font-medium text-white/80">
                  {loc.adsCount}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
