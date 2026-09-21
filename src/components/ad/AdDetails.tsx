import React from "react";

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
  return (
    <div className="flex flex-col gap-8">
      {/* Header Info */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground/60">{data.postedDate}</span>
          <span className="flex items-center gap-1 text-sm text-foreground/60">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            {data.views} views
          </span>
        </div>
        <h1 className="mb-4 font-heading text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
          {data.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 border-b border-border/50 pb-6">
          <span className="text-3xl font-extrabold text-brand-600">Rs {data.price}</span>
          <div className="flex items-center gap-1 text-foreground/70">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            {data.location}
          </div>
        </div>
      </div>

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
        <div className="prose prose-sm max-w-none text-foreground/80 dark:prose-invert">
          {data.description.split('\\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
