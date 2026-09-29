import React from "react";
import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Find something",
      description: "Search for what you need using our advanced filters and categories to find exactly what you're looking for.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
    },
    {
      id: "02",
      title: "Contact seller",
      description: "Found what you want? Connect instantly with the seller via phone, WhatsApp, or our secure messaging system.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    },
    {
      id: "03",
      title: "Make the deal",
      description: "Meet up safely, inspect the item, and finalize the transaction with confidence.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pexels-perqued-13203188.jpg"
          alt="How It Works Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-green-950/50 backdrop-blur-[2px]" />
      </div>
      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="mb-4 font-heading text-3xl font-bold text-white sm:text-4xl">
          How it works
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-lg text-white/80">
          Buying and selling on LAKLAND REALITY is simpler and safer than ever before. Just follow these three easy steps.
        </p>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 relative">
          {/* Connector Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-200 z-0" />
          
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl shadow-brand-500/10 border border-border/50 text-brand-500">
                {step.icon}
              </div>
              <div className="mb-2 text-sm font-bold text-brand-400">STEP {step.id}</div>
              <h3 className="mb-3 font-heading text-xl font-bold text-white">
                {step.title}
              </h3>
              <p className="text-center max-w-xs text-white/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
