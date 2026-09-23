import Link from "next/link";
import React from "react";
import Image from "next/image";
import AdCard from "../ui/AdCard";
import { adService, Ad } from "@/services/adService";

export default async function LatestAds() {
  let ads: Ad[] = [];
  try {
    const res = await adService.getAds({ limit: '8', status: 'ACTIVE' });
    // Defensive check to handle both old API (returns array) and new API (returns PaginatedAds) during build transitions
    ads = Array.isArray(res) ? res : (res.data || []);
  } catch (error) {
    console.error("Failed to fetch latest ads:", error);
  }

  const mappedAds = ads.map(ad => {
    const d = new Date(ad.createdAt);
    const postedTime = `${d.getUTCDate().toString().padStart(2, '0')}/${(d.getUTCMonth() + 1).toString().padStart(2, '0')}/${d.getUTCFullYear()}`;
    
    return {
      id: ad.id,
      slug: ad.slug,
      title: ad.title,
      price: ad.price.toLocaleString('en-US'),
      location: `${ad.city}, ${ad.district}`,
      image: ad.images && ad.images.length > 0 ? ad.images[0] : 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
      postedTime,
      condition: ad.condition || 'Used',
      isFeatured: ad.isFeatured
    };
  });

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pexels-nikitapishchugin-29282319.jpg"
          alt="Latest Ads Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-green-950/50 backdrop-blur-[2px]" />
      </div>
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              Fresh Recommendations
            </h2>
            <p className="max-w-2xl text-lg text-white/80">
              The latest listings added to our marketplace today.
            </p>
          </div>
          <Link
            href="/ads"
            className="group inline-flex items-center gap-1 font-medium text-brand-400 hover:text-brand-300 transition-colors"
          >
            View all ads
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </div>

        {mappedAds.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {mappedAds.map((ad) => (
              <AdCard key={ad.id} {...ad} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-white/70">
            No recent ads available at the moment.
          </div>
        )}
        
        {mappedAds.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/ads"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-500 px-8 font-medium text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg"
            >
              Load More Listings
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
