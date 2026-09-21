import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your details to access your account."
    >
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email or Phone Number
          </label>
          <input
            id="email"
            type="text"
            placeholder="e.g. 0771234567 or email@domain.com"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <Link 
              href="/forgot-password" 
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            required
          />
        </div>

        <button 
          type="submit"
          className="mt-2 w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg active:scale-[0.98]"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-foreground/70">
          Don't have an account?{" "}
          <Link href="/register" className="font-semibold text-brand-600 hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
