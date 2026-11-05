"use client";

import React, { useState } from "react";
import Image from "next/image";
import { isVideoUrl } from "@/utils/media";
import { Play } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/3] w-full rounded-2xl bg-muted flex items-center justify-center">
        <span className="text-muted-foreground">No media available</span>
      </div>
    );
  }

  const currentMedia = images[activeIndex] || images[0];
  const isCurrentVideo = isVideoUrl(currentMedia);

  return (
    <div className="flex flex-col gap-3">
      {/* Main Display (Image or Video) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black flex items-center justify-center">
        {isCurrentVideo ? (
          <video
            key={currentMedia}
            src={currentMedia}
            controls
            playsInline
            preload="metadata"
            className="h-full w-full object-contain"
          />
        ) : (
          <Image
            src={currentMedia}
            alt={`${title} - Media ${activeIndex + 1}`}
            fill
            className="object-contain"
            priority
          />
        )}

        {/* Navigation Arrows (if multiple items) */}
        {images.length > 1 && (
          <>
            <button
              aria-label="Previous media"
              onClick={() => setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40 transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button
              aria-label="Next media"
              onClick={() => setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/40 transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((item, idx) => {
            const isItemVideo = isVideoUrl(item);

            return (
              <button
                key={idx}
                aria-label={`View media ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
                className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:outline-none bg-slate-900 ${
                  activeIndex === idx ? "ring-2 ring-brand-500 ring-offset-2 ring-offset-background" : "opacity-60 hover:opacity-100"
                }`}
              >
                {isItemVideo ? (
                  <div className="relative h-full w-full flex items-center justify-center bg-slate-800">
                    <video src={item} className="h-full w-full object-cover pointer-events-none" muted preload="metadata" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-slate-900">
                        <Play size={12} className="ml-0.5 fill-current" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Image src={item} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
