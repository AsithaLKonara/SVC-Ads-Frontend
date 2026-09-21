import React from "react";
import BrowseLayout from "@/components/browse/BrowseLayout";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : undefined;
  
  // You could also extract category, location, etc. here if needed
  // const category = typeof params.category === 'string' ? params.category : undefined;

  return <BrowseLayout searchQuery={q} />;
}
