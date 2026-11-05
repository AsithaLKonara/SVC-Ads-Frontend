import React, { useMemo } from "react";
import { transformDescriptionToHtml } from "@/utils/richText";

export interface AdData {
  id: string;
  title: string;
  price: string;
  location: string;
  postedDate: string;
  views: number;
  description: string;
  attributes: Record<string, string>;
}

export default function AdDetails({ data }: { data: AdData }) {
  const formattedDescription = useMemo(
    () => transformDescriptionToHtml(data.description),
    [data.description]
  );

  return (
    <div className="flex flex-col gap-8">
      {/* Key Attributes */}
      {Object.keys(data.attributes).length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Key Details</h2>
          <div className="grid grid-cols-2 gap-y-4 sm:grid-cols-3">
            {Object.entries(data.attributes).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wider text-foreground/50">{key}</span>
                <span className="text-sm font-semibold text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div>
        <h2 className="mb-4 font-heading text-lg font-bold text-foreground">Description</h2>
        <div 
          className="prose prose-sm sm:prose-base max-w-none text-foreground/90 dark:prose-invert prose-headings:font-heading prose-headings:text-foreground prose-a:text-brand-600 hover:prose-a:underline prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-brand-500 prose-blockquote:bg-muted/40 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
          dangerouslySetInnerHTML={{ __html: formattedDescription }}
        />
      </div>
    </div>
  );
}
