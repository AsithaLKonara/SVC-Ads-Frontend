import React from "react";
import { notFound } from "next/navigation";
import BrowseLayout from "@/components/browse/BrowseLayout";
import { Category } from "@/services/categoryService";
import { API_URL } from "@/services/api";

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = await params;

  try {
    // Fetch active categories from the public endpoint
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error();
    const categories: Category[] = await res.json();
    
    // Find the parent category
    const parentCategory = categories.find((c) => c.slug.toLowerCase() === category.toLowerCase());
    
    // Validate both parent and subcategory exist in the active list
    const isValid = parentCategory && parentCategory.children?.some(
      (sub) => sub.slug.toLowerCase() === subcategory.toLowerCase()
    );
    
    if (!isValid) {
      notFound();
    }
  } catch (error) {
    console.error("Failed to validate subcategory route", error);
  }

  // We pass both to the BrowseLayout which will filter and update UI
  return <BrowseLayout category={category} subcategory={subcategory} />;
}
