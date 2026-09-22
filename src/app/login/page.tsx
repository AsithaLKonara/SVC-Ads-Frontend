import React from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-64px)] flex-col lg:flex-row">
        {/* Left Side: Image / Branding */}
        <div className="relative hidden w-full bg-brand-900 lg:block lg:w-1/2">
          {/* Add a nice abstract background or image here */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/60 to-transparent"></div>
          
          <div className="relative z-10 flex h-full flex-col items-center justify-center p-12 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-500 text-4xl font-bold text-white shadow-2xl">
              Y
            </div>
            <h1 className="mb-4 font-heading text-4xl font-bold text-white">
              Admin Portal
            </h1>
            <p className="max-w-md text-lg text-brand-100">
              Securely manage advertisements, categories, and platform settings for LAKLAND REALITY.
            </p>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="flex w-full items-center justify-center bg-background px-4 py-12 sm:px-6 lg:w-1/2 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-foreground/70">
                Please sign in to your admin account.
              </p>
            </div>

            <form className="mt-8 space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="laklandreality@gmail.com"
                    className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium text-foreground">
                      Password
                    </label>
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="flex w-full justify-center rounded-xl bg-brand-600 px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg active:scale-[0.98]"
              >
                Sign in to Dashboard
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
