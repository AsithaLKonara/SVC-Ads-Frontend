import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import BrowseLayout from "@/components/browse/BrowseLayout";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Category, getCachedCategories } from "@/services/categoryService";
import { API_URL } from "@/services/api";

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = await params;
  let categories: Category[] = [];
  let isValid = true;

  try {
    // Fetch active categories from the public endpoint
    categories = await getCachedCategories();
      
    // Find the parent category
      const parentCategory = categories.find((c) => c.slug.toLowerCase() === category.toLowerCase());
      
      // Validate both parent and subcategory exist in the active list
      isValid = !!(parentCategory && parentCategory.children?.some(
        (sub) => sub.slug.toLowerCase() === subcategory.toLowerCase()
      ));
  } catch (error) {
    console.error("Failed to fetch subcategories for validation", error);
  }

  if (!isValid) {
    notFound();
  }

  // We pass both to the BrowseLayout which will filter and update UI
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div></div>}>
        <BrowseLayout category={category} subcategory={subcategory} categories={categories} />
      </Suspense>
      <Footer />
    </>
  );
}
