import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <AuthLayout 
      title="Forgot Password?" 
      subtitle="Enter your email or phone number to receive a reset link."
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

        <button 
          type="submit"
          className="mt-2 w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg active:scale-[0.98]"
        >
          Send Reset Link
        </button>

        <p className="mt-4 text-center text-sm text-foreground/70">
          <Link href="/login" className="font-semibold text-brand-600 hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
