"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDemoLogin = () => {
    setEmail("admin@laklandreality.com");
    setPassword("admin123");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Zod validation
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      setError(result.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      // We are using JWT. Store the token in localStorage for client-side access
      // and in a cookie so middleware can read it.
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 1 day
      document.cookie = `token=${data.token}; path=/; max-age=${maxAge}; SameSite=Strict`;
      
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="flex min-h-[calc(100vh-64px)] flex-col lg:flex-row">
        {/* Left Side: Image / Branding */}
        <div className="relative hidden w-full bg-brand-900 lg:block lg:w-1/2">
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

            {/* Demo Credentials Alert */}
            <div 
              onClick={handleDemoLogin}
              className="mt-4 cursor-pointer rounded-xl border border-brand-200 bg-brand-50 p-4 transition-colors hover:bg-brand-100"
            >
              <div className="flex items-center gap-3 text-brand-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                <div className="text-sm">
                  <span className="block font-semibold">Demo Admin Credentials</span>
                  <span className="block opacity-90">Click this box to fill in the form instantly.</span>
                  <span className="mt-1 block font-mono text-xs opacity-80">admin@laklandreality.com / admin123</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="laklandreality@gmail.com"
                    className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="block w-full rounded-xl border border-border bg-background py-3 pl-4 pr-12 text-sm text-foreground outline-none transition-all focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-foreground">
                    Stay logged in
                  </label>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-xl bg-brand-600 px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isLoading ? "Signing in..." : "Sign in to Dashboard"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
