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

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Validate that the route is actually a category.
  // If a user types a random string like /skibidi, throw a 404.
  if (!VALID_CATEGORIES.includes(category.toLowerCase())) {
    notFound();
  }

  return <BrowseLayout category={category} />;
}
