import Link from "next/link";
import React from "react";
import AdCard from "../ui/AdCard";

// Mock Data
const latestAds = [
  {
    id: "v-4567",
    title: "Nissan Leaf G Grade 2014",
    price: "4,200,000",
    location: "Malabe, Colombo",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
    postedTime: "10 mins ago",
    condition: "Used",
    isFeatured: false,
  },
  {
    id: "f-8901",
    title: "Teak Dining Table with 6 Chairs",
    price: "125,000",
    location: "Moratuwa, Colombo",
    image: "https://images.unsplash.com/photo-1617806118233-18e1c0945594?auto=format&fit=crop&w=800&q=80",
    postedTime: "25 mins ago",
    condition: "Like New",
    isFeatured: false,
  },
  {
    id: "e-2345",
    title: "Dell XPS 13 Laptop (Core i7, 16GB)",
    price: "195,000",
    location: "Maharagama, Colombo",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
    postedTime: "1 hour ago",
    condition: "Used",
    isFeatured: false,
  },
  {
    id: "s-6789",
    title: "Professional Plumbing Services",
    price: "2,500",
    location: "Dehiwala, Colombo",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    postedTime: "2 hours ago",
    condition: "Service",
    isFeatured: false,
  },
  {
    id: "p-0123",
    title: "10 Perch Land for Sale in Gampaha",
    price: "850,000",
    location: "Gampaha City, Gampaha",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    postedTime: "3 hours ago",
    condition: "Bare Land",
    isFeatured: false,
  },
  {
    id: "v-4321",
    title: "Suzuki Alto 2018 Mint Condition",
    price: "3,100,000",
    location: "Kurunegala City, Kurunegala",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    postedTime: "4 hours ago",
    condition: "Used",
    isFeatured: false,
  },
  {
    id: "e-8765",
    title: "Sony PlayStation 5 Console",
    price: "165,000",
    location: "Mount Lavinia, Colombo",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
    postedTime: "5 hours ago",
    condition: "New",
    isFeatured: false,
  },
  {
    id: "m-1098",
    title: "Yamaha FZ v3 2020",
    price: "720,000",
    location: "Panadura, Kalutara",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    postedTime: "6 hours ago",
    condition: "Used",
    isFeatured: false,
  },
];

export default function LatestAds() {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Fresh Recommendations
            </h2>
            <p className="text-foreground/60 max-w-2xl text-lg">
              The latest listings added to our marketplace today.
            </p>
          </div>
          <Link
            href="/ads"
            className="group inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            View all ads
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latestAds.map((ad) => (
            <AdCard key={ad.id} {...ad} />
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Link
            href="/ads"
            className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-border bg-white px-8 font-medium text-foreground hover:border-brand-500 hover:text-brand-600 transition-colors"
          >
            Load More Listings
          </Link>
        </div>
      </div>
    </section>
  );
}
