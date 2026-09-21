import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";

export default function VerifyPage() {
  return (
    <AuthLayout 
      title="Verify Account" 
      subtitle="We've sent a 6-digit code to your email/phone."
    >
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="otp" className="text-sm font-medium text-foreground">
            Verification Code
          </label>
          <input
            id="otp"
            type="text"
            maxLength={6}
            placeholder="0 0 0 0 0 0"
            className="rounded-xl border border-border bg-background px-4 py-3 text-center text-2xl font-bold tracking-[1em] text-foreground outline-none transition-all focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            required
          />
        </div>

        <button 
          type="submit"
          className="mt-2 w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg active:scale-[0.98]"
        >
          Verify Account
        </button>

        <p className="mt-4 text-center text-sm text-foreground/70">
          Didn't receive the code?{" "}
          <button type="button" className="font-semibold text-brand-600 hover:underline">
            Resend Code
          </button>
        </p>
      </form>
    </AuthLayout>
  );
}
