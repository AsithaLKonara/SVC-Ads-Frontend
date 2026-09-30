import Link from "next/link";
import React from "react";
import Image from "next/image";
import AdCard from "../ui/AdCard";
import { adService, Ad } from "@/services/adService";

export default async function LatestAds() {
  let ads: Ad[] = [];
  try {
    const res = await adService.getAds({ limit: '6', status: 'ACTIVE' });
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
      image: ad.images && ad.images.length > 0 ? ad.images[0] : '/images/placeholder.jpg',
      postedTime,
      condition: ad.condition || 'Used',
      isFeatured: ad.isFeatured
    };
  });

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="page-container relative z-10">
        <div className="mb-12 flex flex-col items-center justify-center gap-4 text-center">
          <div>
            <h2 className="mb-2 font-heading text-3xl font-bold text-foreground sm:text-[36px]">
              Recently Added Properties
            </h2>
            <p className="max-w-2xl text-lg text-foreground/80">
              The latest listings added to our marketplace today.
            </p>
          </div>
          <Link
            href="/ads"
            className="group inline-flex items-center gap-1 font-medium text-gold-500 hover:text-gold-400 transition-colors"
          >
            View all ads
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </div>

        {mappedAds.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mappedAds.map((ad) => (
              <AdCard key={ad.id} {...ad} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-foreground/70">
            No recent ads available at the moment.
          </div>
        )}
        
        {mappedAds.length > 0 && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/ads"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-gold-500 px-8 font-medium text-brand-950 shadow-md transition-all hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-lg"
            >
              Load More Listings
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
