import React, { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import BrowseLayout from "@/components/browse/BrowseLayout";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Category, getCachedCategories } from "@/services/categoryService";
import { adService, Ad, PaginatedAds } from "@/services/adService";
import { API_URL } from "@/services/api";
import { generateSeoMetadata } from "@/lib/seo/metadata";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  
  // Format category slug nicely for title (e.g., 'commercial-lands' -> 'Commercial Lands')
  const formattedName = category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  return generateSeoMetadata({
    title: `${formattedName} Properties`,
    description: `Browse the best ${formattedName} in Sri Lanka. Find your ideal property today on LAKLAND REALITY.`,
    url: `/${category}`,
  });
}

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
    categories = await getCachedCategories();
    // Validate that the route matches a valid top-level category slug
      isValid = categories.some((c) => c.slug.toLowerCase() === category.toLowerCase());
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
      <Suspense fallback={<div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div></div>}>
        <BrowseLayout 
          category={category} 
          categories={categories} 
          initialData={adsData}
          locations={locations}
        />
      </Suspense>
      <Footer />
    </>
  );
}
