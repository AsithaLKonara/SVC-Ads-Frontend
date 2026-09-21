import React from "react";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        
        {/* Logo Header */}
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <Link href="/" className="mb-6 flex items-center gap-2 transition-transform hover:scale-105">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-2xl font-bold text-white shadow-lg shadow-brand-500/30">
              Y
            </div>
            <span className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Yaka.lk
            </span>
          </Link>
          
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-foreground/60">
              {subtitle}
            </p>
          )}
        </div>

        {/* Auth Card */}
        <div className="overflow-hidden rounded-3xl border border-border/50 bg-card p-6 shadow-xl shadow-black/5 sm:p-10">
          {children}
        </div>
        
      </div>
    </div>
  );
}
