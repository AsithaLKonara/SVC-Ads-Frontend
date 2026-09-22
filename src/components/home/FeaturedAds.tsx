import Link from "next/link";
import React from "react";
import AdCard from "../ui/AdCard";
import { adService, Ad } from "@/services/adService";

export default async function FeaturedAds() {
  let ads: Ad[] = [];
  try {
    ads = await adService.getAds({ isFeatured: 'true', limit: '4', status: 'ACTIVE' });
  } catch (error) {
    console.error("Failed to fetch featured ads:", error);
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
      image: ad.images && ad.images.length > 0 ? ad.images[0] : 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
      postedTime,
      condition: ad.condition || 'Used',
      isFeatured: ad.isFeatured
    };
  });

  if (mappedAds.length === 0) return null;

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
          {mappedAds.map((ad) => (
            <AdCard key={ad.id} {...ad} />
          ))}
        </div>
      </div>
    </section>
  );
}
