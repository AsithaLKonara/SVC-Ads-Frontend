import React from "react";
import BrowseLayout from "@/components/browse/BrowseLayout";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { API_URL } from "@/services/api";
import { Category } from "@/services/categoryService";

export default async function AdsPage() {
  let categories: Category[] = [];
  
  try {
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
    if (res.ok) {
      categories = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }

  return (
    <>
      <Navbar />
      <BrowseLayout categories={categories} />
      <Footer />
    </>
  );
}
