import React from "react";
import { notFound } from "next/navigation";
import BrowseLayout from "@/components/browse/BrowseLayout";
import { Category } from "@/services/categoryService";
import { API_URL } from "@/services/api";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  try {
    // Fetch active categories from the public endpoint
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error();
    const categories: Category[] = await res.json();
    
    // Validate that the route matches a valid top-level category slug
    const isValid = categories.some((c) => c.slug.toLowerCase() === category.toLowerCase());
    
    if (!isValid) {
      notFound();
    }
  } catch (error) {
    // If the API fails, we could fallback to notFound or just render BrowseLayout
    // which will show an empty state or error in its own right
    console.error("Failed to validate category route", error);
  }

  return <BrowseLayout category={category} />;
}
