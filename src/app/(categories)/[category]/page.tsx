import React from "react";
import { notFound, redirect } from "next/navigation";
import BrowseLayout from "@/components/browse/BrowseLayout";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Category } from "@/services/categoryService";
import { adService, Ad } from "@/services/adService";
import { API_URL } from "@/services/api";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  let categories: Category[] = [];
  let ads: Ad[] = [];
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
      ads = await adService.getAds({ category, status: 'ACTIVE' });
    } catch (error) {
      console.error("Failed to fetch ads for category:", error);
    }
  }

  return (
    <>
      <Navbar />
      <BrowseLayout 
        category={category} 
        categories={categories} 
        initialAds={ads}
      />
      <Footer />
    </>
  );
}
