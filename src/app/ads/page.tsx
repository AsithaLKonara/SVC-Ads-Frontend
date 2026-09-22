import React from "react";
import BrowseLayout from "@/components/browse/BrowseLayout";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { API_URL } from "@/services/api";
import { Category } from "@/services/categoryService";
import { adService, Ad } from "@/services/adService";

export default async function AdsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  
  let categories: Category[] = [];
  let ads: Ad[] = [];
  
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
    const filterParams: Record<string, string> = { status: 'ACTIVE' };
    if (typeof params.category === 'string') filterParams.category = params.category;
    if (typeof params.district === 'string') filterParams.district = params.district;
    if (typeof params.city === 'string') filterParams.city = params.city;
    if (params.sort === 'featured') filterParams.isFeatured = 'true';
    
    ads = await adService.getAds(filterParams);
  } catch (error) {
    console.error("Failed to fetch ads:", error);
  }

  return (
    <>
      <Navbar />
      <BrowseLayout 
        categories={categories} 
        initialAds={ads} 
        category={typeof params.category === 'string' ? params.category : undefined}
        subcategory={typeof params.subcategory === 'string' ? params.subcategory : undefined}
        searchQuery={typeof params.q === 'string' ? params.q : undefined}
      />
      <Footer />
    </>
  );
}
