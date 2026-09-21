import React from "react";
import { notFound } from "next/navigation";
import BrowseLayout from "@/components/browse/BrowseLayout";

// The allowed top-level categories based on the platform hierarchy
const VALID_CATEGORIES = [
  "vehicles",
  "properties",
  "electronics",
  "furniture",
  "services",
  "jobs",
  "fashion",
];

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = await params;

  // Validate the top-level category exists
  if (!VALID_CATEGORIES.includes(category.toLowerCase())) {
    notFound();
  }

  // We pass both to the BrowseLayout which will filter and update UI
  return <BrowseLayout category={category} subcategory={subcategory} />;
}
