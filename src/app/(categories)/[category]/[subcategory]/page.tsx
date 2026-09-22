import React from "react";
import { notFound } from "next/navigation";
import BrowseLayout from "@/components/browse/BrowseLayout";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Category } from "@/services/categoryService";
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
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
    if (res.ok) {
      categories = await res.json();
      
      // Find the parent category
      const parentCategory = categories.find((c) => c.slug.toLowerCase() === category.toLowerCase());
      
      // Validate both parent and subcategory exist in the active list
      isValid = !!(parentCategory && parentCategory.children?.some(
        (sub) => sub.slug.toLowerCase() === subcategory.toLowerCase()
      ));
    }
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
      <BrowseLayout category={category} subcategory={subcategory} categories={categories} />
      <Footer />
    </>
  );
}
