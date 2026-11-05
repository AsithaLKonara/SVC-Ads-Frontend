import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import BrowseLayout from "@/components/browse/BrowseLayout";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Category, getCachedCategories } from "@/services/categoryService";
import { adService, PaginatedAds } from "@/services/adService";
import { generateSeoMetadata } from "@/lib/seo/metadata";
import { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string; subcategory: string }> 
}): Promise<Metadata> {
  const { category, subcategory } = await params;
  
  const formattedCategory = category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const formattedSub = subcategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return generateSeoMetadata({
    title: `${formattedSub} in ${formattedCategory} | LAKLAND REALITY`,
    description: `Find prime ${formattedSub} for sale and investment in Sri Lanka on LAKLAND REALITY.`,
    url: `/${category}/${subcategory}`,
  });
}

export default async function SubCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category, subcategory } = await params;
  const sParams = await searchParams;
  let categories: Category[] = [];
  let adsData: PaginatedAds = { data: [], total: 0, page: 1, totalPages: 1, limit: 12 };
  let isValid = true;

  try {
    categories = await getCachedCategories();
      
    const parentCategory = categories.find((c) => c.slug.toLowerCase() === category.toLowerCase());
      
    isValid = !!(parentCategory && parentCategory.children?.some(
      (sub) => sub.slug.toLowerCase() === subcategory.toLowerCase()
    ));
  } catch (error) {
    console.error("Failed to fetch subcategories for validation", error);
  }

  if (!isValid && categories.length > 0) {
    notFound();
  }

  try {
    const filterParams: Record<string, string | string[]> = { category: subcategory, status: 'ACTIVE' };
    if (sParams.location && !sParams.district) {
      filterParams.district = sParams.location as string;
    }
    const validKeys = ['district', 'city', 'minPrice', 'maxPrice', 'condition', 'q', 'sort', 'page', 'limit'];
    for (const key of validKeys) {
      if (sParams[key] !== undefined) {
        filterParams[key] = sParams[key] as string | string[];
      }
    }
    adsData = await adService.getAds(filterParams, { cache: 'no-store' });
  } catch (error) {
    console.error("Failed to fetch ads for subcategory:", error);
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
          subcategory={subcategory} 
          categories={categories}
          initialData={adsData}
          locations={locations}
          searchQuery={typeof sParams.q === 'string' ? sParams.q : undefined}
        />
      </Suspense>
      <Footer />
    </>
  );
}
