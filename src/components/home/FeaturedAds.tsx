import Link from "next/link";
import React from "react";
import AdCard from "../ui/AdCard";

// Mock Data
const featuredAds = [
  {
    id: "v-1234",
    title: "Toyota Aqua S Grade 2014",
    price: "7,800,000",
    location: "Colombo 6, Colombo",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80",
    postedTime: "2 hours ago",
    condition: "Used",
    isFeatured: true,
  },
  {
    id: "p-5678",
    title: "Luxury 2BR Apartment in Havelock City",
    price: "45,000,000",
    location: "Havelock Town, Colombo",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    postedTime: "5 hours ago",
    condition: "New",
    isFeatured: true,
  },
  {
    id: "e-9012",
    title: "Apple iPhone 14 Pro Max 256GB",
    price: "320,000",
    location: "Kandy City, Kandy",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=800&q=80",
    postedTime: "Just now",
    condition: "Like New",
    isFeatured: true,
  },
  {
    id: "v-3456",
    title: "Honda Vezel Z Sensing 2016",
    price: "9,500,000",
    location: "Nugegoda, Colombo",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=800&q=80",
    postedTime: "1 day ago",
    condition: "Used",
    isFeatured: true,
  },
];

export default function FeaturedAds() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Featured Ads
            </h2>
            <p className="text-foreground/60 max-w-2xl text-lg">
              Premium listings from verified sellers across the platform.
            </p>
          </div>
          <Link
            href="/ads?sort=featured"
            className="group inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            View all featured
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredAds.map((ad) => (
            <AdCard key={ad.id} {...ad} />
          ))}
        </div>
      </div>
    </section>
  );
}
