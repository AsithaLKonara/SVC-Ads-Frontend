import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AdCardProps {
  id: string;
  slug?: string;
  title: string;
  price: string;
  location: string;
  image: string;
  postedTime: string;
  condition?: string;
  isFeatured?: boolean;
  viewMode?: "grid" | "list";
}

export default function AdCard({
  id,
  slug,
  title,
  price,
  location,
  image,
  postedTime,
  condition,
  isFeatured,
  viewMode = "grid",
}: AdCardProps) {
  const isList = viewMode === "list";
  
  const linkHref = slug ? `/ad/${slug}` : `/ad/${id}`;
  
  return (
    <Link href={linkHref} className={`group block ${isList ? "w-full" : "h-full"}`}>
      <div className={`relative flex overflow-hidden rounded-2xl bg-card shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-premium-hover border border-border/50 ${isList ? "flex-col sm:flex-row h-auto sm:h-48" : "flex-col h-full"}`}>
        {/* Image Container */}
        <div className={`relative overflow-hidden bg-gray-100 shrink-0 ${isList ? "w-full aspect-[4/3] sm:w-64 sm:aspect-auto sm:h-full" : "w-full aspect-[4/3]"}`}>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {isFeatured && (
            <div className="absolute left-3 top-3 rounded-full bg-brand-500 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
              Featured
            </div>
          )}
          {/* Save Button */}
          <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-600 backdrop-blur-md transition-colors hover:bg-white hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <span className="sr-only">Save Ad</span>
          </button>
        </div>

        {/* Content Container */}
        <div className={`flex flex-1 flex-col ${isList ? "p-4 sm:p-5" : "p-4"}`}>
          <div className="mb-1 flex items-center gap-2">
            {condition && (
              <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                {condition}
              </span>
            )}
            <span className="text-xs text-gray-500">{postedTime}</span>
          </div>
          
          <h3 className={`mb-2 font-heading font-semibold text-card-foreground group-hover:text-brand-600 transition-colors ${isList ? "text-lg line-clamp-1" : "text-base line-clamp-2"}`}>
            {title}
          </h3>
          
          <div className={`mt-auto ${isList ? "flex items-end justify-between" : ""}`}>
            <div>
              <div className="mb-1 text-lg font-bold text-brand-600">
                Rs {price}
              </div>
              
              <div className="flex items-center text-xs text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="truncate">{location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
