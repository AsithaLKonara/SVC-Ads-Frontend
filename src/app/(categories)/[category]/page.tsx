import React from "react";
import { notFound, redirect } from "next/navigation";
import BrowseLayout from "@/components/browse/BrowseLayout";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Category } from "@/services/categoryService";
import { adService, Ad, PaginatedAds } from "@/services/adService";
import { API_URL } from "@/services/api";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category } = await params;
  const sParams = await searchParams;
  let categories: Category[] = [];
  let adsData: PaginatedAds = { data: [], total: 0, page: 1, totalPages: 1, limit: 12 };
  let isValid = false;

  try {
    // Fetch active categories from the public endpoint
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
    if (res.ok) {
      categories = await res.json();
      // Validate that the route matches a valid top-level category slug
      isValid = categories.some((c) => c.slug.toLowerCase() === category.toLowerCase());
    }
  } catch (error) {
    console.error("Failed to fetch categories for validation", error);
  }

  // Next.js Turbopack currently has issues with notFound() in some async paths,
  // we gracefully handle invalid categories by returning empty ads or redirecting.
  if (!isValid && categories.length > 0) {
    // We fetched categories but this slug isn't one of them
    redirect("/ads");
  }

  if (isValid) {
    try {
      const filterParams: Record<string, string | string[]> = { category, status: 'ACTIVE' };
      const validKeys = ['district', 'city', 'minPrice', 'maxPrice', 'condition', 'q', 'sort', 'page', 'limit'];
      for (const key of validKeys) {
        if (sParams[key] !== undefined) {
          filterParams[key] = sParams[key] as string | string[];
        }
      }
      adsData = await adService.getAds(filterParams, { cache: 'no-store' });
    } catch (error) {
      console.error("Failed to fetch ads for category:", error);
    }
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
        category={category} 
        categories={categories} 
        initialData={adsData}
        locations={locations}
      />
      <Footer />
    </>
  );
}
