import React from "react";
import { notFound } from "next/navigation";
import BrowseLayout from "@/components/browse/BrowseLayout";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Category } from "@/services/categoryService";
import { API_URL } from "@/services/api";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  let categories: Category[] = [];
  let isValid = true;

  try {
    // Fetch active categories from the public endpoint
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
    if (res.ok) {
      categories = await res.json();
      // Validate that the route matches a valid top-level category slug
      isValid = categories.some((c) => c.slug.toLowerCase() === category.toLowerCase());
    }
  } catch (error) {
    // If the API fails, we could fallback to notFound or just render BrowseLayout
    // which will show an empty state or error in its own right
    console.error("Failed to fetch categories for validation", error);
  }

  if (!isValid) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <BrowseLayout category={category} categories={categories} />
      <Footer />
    </>
  );
}
