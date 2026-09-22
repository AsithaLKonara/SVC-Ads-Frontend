import Link from "next/link";
import React from "react";

export default function TrustSafety() {
  const policies = [
    {
      title: "Safety Tips",
      description: "Learn how to safely transact on Yaka.lk and avoid common scams.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      link: "/safety"
    },
    {
      title: "Report Suspicious Ads",
      description: "Help us keep the community clean. Report any ad that looks suspicious or violates our rules.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>,
      link: "/contact"
    },
    {
      title: "Listing Rules",
      description: "Familiarize yourself with our posting guidelines to ensure your ads get approved quickly.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
      link: "/listing-rules"
    }
  ];

  return (
    <section className="py-20 bg-background border-t border-border/50">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="mb-2 font-heading text-2xl font-bold text-foreground">
            Trust & Safety
          </h2>
          <p className="text-foreground/60 text-lg">
            We are committed to making your experience secure.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {policies.map((policy) => (
            <Link 
              key={policy.title} 
              href={policy.link}
              className="group relative flex flex-col items-center overflow-hidden rounded-3xl bg-gray-900/80 border border-gray-800 p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)] hover:border-gray-700"
            >
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-brand-400 to-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/5 text-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10 group-hover:shadow-md">
                {policy.icon}
              </div>
              <h3 className="mb-3 font-heading text-xl font-bold text-white transition-colors group-hover:text-brand-400">
                {policy.title}
              </h3>
              <p className="text-base leading-relaxed text-gray-400">
                {policy.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
