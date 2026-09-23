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
