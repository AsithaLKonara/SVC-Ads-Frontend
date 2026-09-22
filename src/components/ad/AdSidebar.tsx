import React from "react";

export interface AdSidebarData {
  title: string;
  price: string;
  location: string;
  postedDate: string;
  categoryName: string;
  views: number;
  phone: string;
}

export default function AdSidebar({ data }: { data: AdSidebarData }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Mobile-hidden Desktop Header (Title, Price, Stats) */}
      <div className="hidden lg:block rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground/60">
            {data.postedDate} in <span className="text-brand-600 font-semibold">{data.categoryName}</span>
          </span>
          <span className="flex items-center gap-1 text-sm text-foreground/60">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            {data.views} views
          </span>
        </div>
        <h1 className="mb-4 font-heading text-2xl font-bold text-foreground">
          {data.title}
        </h1>
        <div className="flex flex-col gap-2 border-t border-border/50 pt-4">
          <span className="text-3xl font-extrabold text-brand-600">Rs {data.price}</span>
          <div className="flex items-center gap-1 text-foreground/70">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            {data.location}
          </div>
        </div>
      </div>

      {/* Contact Actions */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-foreground/50">
          Contact Admin
        </h3>
        <div className="flex flex-col gap-3">
          <a href={`tel:${data.phone.replace(/[^0-9+]/g, '')}`} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call {data.phone}
          </a>
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
        <button className="flex flex-col items-center gap-1 text-xs font-medium text-foreground/70 hover:text-brand-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
          Save Ad
        </button>
        <button className="flex flex-col items-center gap-1 text-xs font-medium text-foreground/70 hover:text-brand-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
          Share
        </button>
        <button className="flex flex-col items-center gap-1 text-xs font-medium text-foreground/70 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          Report
        </button>
      </div>
    </div>
  );
}
