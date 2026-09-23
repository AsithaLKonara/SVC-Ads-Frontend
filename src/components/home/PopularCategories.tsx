import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Category } from "@/services/categoryService";
import { API_URL } from "@/services/api";
import * as LucideIcons from "lucide-react";

// Helper to render dynamic icon
const DynamicIcon = ({ name, size = 24 }: { name: string | null; size?: number }) => {
  if (!name) return <LucideIcons.Folder size={size} />;
  
  // @ts-ignore
  const IconComponent = LucideIcons[name];
  if (!IconComponent) return <LucideIcons.Folder size={size} />;
  
  return <IconComponent size={size} />;
};

export default async function PopularCategories() {
  let categories: Category[] = [];
  
  try {
    const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 60 } });
    if (res.ok) {
      categories = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch popular categories", error);
  }

  // Use up to 6 categories for the grid
  const displayCategories = categories.slice(0, 6);

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pexels-naveen-annam-734127-2002431.jpg"
          alt="Popular Categories Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-green-950/50 backdrop-blur-[2px]" />
      </div>
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              Popular Categories
            </h2>
            <p className="max-w-2xl text-lg text-white/80">
              Browse through our most active markets and find exactly what you're looking for.
            </p>
          </div>
          <Link
            href="/categories"
            className="group inline-flex items-center gap-1 font-medium text-brand-400 hover:text-brand-300 transition-colors"
          >
            View all categories
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {displayCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group flex min-h-[140px] flex-col items-center justify-center rounded-2xl bg-card p-6 shadow-sm border border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium hover:border-brand-200"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <DynamicIcon name={cat.icon} size={24} />
              </div>
              <h3 className="mb-1 text-center font-heading text-sm font-semibold text-foreground group-hover:text-brand-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-center text-xs text-foreground/50">
                {cat._count?.children || 0} subcategories
              </p>
            </Link>
          ))}
          
          {displayCategories.length === 0 && (
             <div className="col-span-full py-8 text-center text-white/70">
                No categories found. Please add categories from the admin dashboard.
             </div>
          )}
        </div>
      </div>
    </section>
  );
}
