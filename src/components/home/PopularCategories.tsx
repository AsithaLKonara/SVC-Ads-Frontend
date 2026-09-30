import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Category, getCachedCategories } from "@/services/categoryService";
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
    categories = await getCachedCategories();
  } catch (error) {
    console.error("Failed to fetch popular categories", error);
  }

  // Show up to 12 categories, allowing the grid to auto-adjust
  const displayCategories = categories.slice(0, 12);

  const getCategoryDescription = (slug: string) => {
    if (slug.includes('house')) return "Homes for sale and rent";
    if (slug.includes('land')) return "Residential and commercial land";
    if (slug.includes('apartment')) return "Flats and apartments";
    if (slug.includes('commercial')) return "Shops, offices and buildings";
    return "Explore listings in this category";
  };

  const getGridClasses = (index: number, total: number) => {
    // Un-uniform bento pattern of column spans for a 4-column grid
    const pattern = [2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 4];
    let span = pattern[index % pattern.length];
    
    // If this is the last item, stretch it to fill the remaining space in the row
    if (index === total - 1) {
      let sum = 0;
      for (let i = 0; i < total - 1; i++) {
        sum += pattern[i % pattern.length];
      }
      const remainder = sum % 4;
      span = remainder === 0 ? 4 : 4 - remainder;
    }
    
    // Convert numeric span to tailwind class
    const spanClass = {
      1: "md:col-span-1",
      2: "md:col-span-2",
      3: "md:col-span-3",
      4: "md:col-span-4",
    }[span] || "md:col-span-1";

    // For the very first item, make it slightly taller for a featured look if it spans 2
    const heightClass = (index === 0 && span === 2) ? "h-[350px] md:h-[400px]" : "h-[250px] md:h-[300px]";

    return `${spanClass} ${heightClass}`;
  };

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      <div className="page-container relative z-10">
        <div className="mb-10 flex flex-col items-center justify-center gap-4 text-center">
          <div>
            <h2 className="mb-2 font-heading text-3xl font-bold text-foreground sm:text-[36px]">
              Explore Property Types
            </h2>
          </div>
          <Link
            href="/categories"
            className="group inline-flex items-center gap-1 font-medium text-gold-500 hover:text-gold-400 transition-colors"
          >
            View all categories
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="m9 18 6-6-6-6"/></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {displayCategories.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl bg-brand-900 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-hover ${getGridClasses(idx, displayCategories.length)}`}
            >
              <img 
                src={cat.image || "/images/pexels-the-ghazi-2152398165-33747708.jpg"}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="relative z-10 p-6 md:p-8">
                <div className="mb-2 h-10 w-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-gold-400">
                  <DynamicIcon name={cat.icon} size={20} />
                </div>
                <h3 className={`font-heading font-bold text-ivory-50 group-hover:text-gold-300 transition-colors ${idx === 0 ? 'text-3xl mb-2' : 'text-xl mb-1'}`}>
                  {cat.name}
                </h3>
                <p className={`text-ivory-50/80 ${idx === 0 ? 'text-base' : 'text-sm'}`}>
                  {getCategoryDescription(cat.slug)}
                </p>
              </div>
            </Link>
          ))}
          
          {displayCategories.length === 0 && (
             <div className="col-span-full py-8 text-center text-foreground/70">
                No categories found. Please add categories from the admin dashboard.
             </div>
          )}
        </div>
      </div>
    </section>
  );
}
