import Link from "next/link";
import React from "react";
import AdCard from "../ui/AdCard";
import { adService, Ad } from "@/services/adService";

export default async function FeaturedAds() {
  let ads: Ad[] = [];
  try {
    const res = await adService.getAds({ isFeatured: 'true', limit: '3', status: 'ACTIVE' });
    ads = Array.isArray(res) ? res : (res.data || []);
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
      image: ad.images && ad.images.length > 0 ? ad.images[0] : '/images/placeholder.jpg',
      postedTime,
      condition: ad.condition || 'Used',
      isFeatured: ad.isFeatured
    };
  });

  if (mappedAds.length === 0) return null;

  return (
    <section className="py-24 bg-background-alt">
      <div className="page-container">
        <div className="mb-12 flex flex-col items-center justify-center gap-4 text-center">
          <div>
            <h2 className="mb-2 font-heading text-3xl font-bold text-foreground sm:text-[36px]">
              Featured Properties
            </h2>
            <p className="text-foreground/60 max-w-2xl text-lg">
              Premium listings from verified sellers across the platform.
            </p>
          </div>
          <Link
            href="/ads?sort=featured"
            className="group inline-flex items-center gap-1 font-medium text-gold-500 hover:text-gold-400 transition-colors"
          >
            View all featured
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mappedAds.map((ad) => (
            <AdCard key={ad.id} {...ad} />
          ))}
        </div>
      </div>
    </section>
  );
}
