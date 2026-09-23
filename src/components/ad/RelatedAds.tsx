import React from "react";
import AdCard from "@/components/ui/AdCard";
import Link from "next/link";
import { adService } from "@/services/adService";
import { getRelativeTime } from "@/utils/format";

export default async function RelatedAds({ 
  categorySlug, 
  categoryName, 
  currentAdId 
}: { 
  categorySlug?: string, 
  categoryName?: string, 
  currentAdId?: string 
}) {
  let ads = [];
  try {
    const filterParams: any = { limit: '5', status: 'ACTIVE' };
    if (categorySlug) {
      filterParams.category = categorySlug;
    }
    const res = await adService.getAds(filterParams);
    const fetchedAds = Array.isArray(res) ? res : (res.data || []);
    // Filter out the current ad and take up to 4
    ads = fetchedAds.filter(ad => ad.id !== currentAdId).slice(0, 4);
  } catch (error) {
    console.error("Failed to fetch related ads:", error);
  }

  if (ads.length === 0) return null;

  const mappedAds = ads.map(ad => {
    const postedTime = getRelativeTime(ad.createdAt);
    
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

  return (
    <div className="mt-16 border-t border-border/50 pt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-foreground">Similar Listings</h2>
        {categorySlug && (
          <Link href={`/${categorySlug}`} className="text-sm font-semibold text-brand-600 hover:underline">
            View more in {categoryName || "this category"}
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mappedAds.map((ad) => (
          <AdCard key={ad.id} {...ad} />
        ))}
      </div>
    </div>
  );
}
