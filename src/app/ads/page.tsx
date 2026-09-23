import React from "react";
import BrowseLayout from "@/components/browse/BrowseLayout";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { API_URL } from "@/services/api";
import { Category } from "@/services/categoryService";
import { adService, Ad, PaginatedAds } from "@/services/adService";

export default async function AdsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  
  let categories: Category[] = [];
  let adsData: PaginatedAds = { data: [], total: 0, page: 1, totalPages: 1, limit: 12 };
  
  try {
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
    if (res.ok) {
      categories = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  try {
    // Build filter parameters from URL search params
    const filterParams: Record<string, string | string[]> = { status: 'ACTIVE' };
    
    // Copy all valid params
    const validKeys = ['category', 'district', 'city', 'minPrice', 'maxPrice', 'condition', 'q', 'sort', 'page', 'limit'];
    for (const key of validKeys) {
      if (params[key] !== undefined) {
        filterParams[key] = params[key] as string | string[];
      }
    }
    
    adsData = await adService.getAds(filterParams, { cache: 'no-store' });
  } catch (error) {
    console.error("Failed to fetch ads:", error);
  }

  let locations: string[] = [];
  try {
    const stats = await adService.getLocationStats();
    locations = stats.map(s => s.district);
  } catch (error) {
    console.error("Failed to fetch location stats:", error);
  }

  return (
    <>
      <Navbar />
      <BrowseLayout 
        categories={categories} 
        initialData={adsData} 
        locations={locations}
        category={typeof params.category === 'string' ? params.category : undefined}
        subcategory={typeof params.subcategory === 'string' ? params.subcategory : undefined}
        searchQuery={typeof params.q === 'string' ? params.q : undefined}

      />
      <Footer />
    </>
  );
}
