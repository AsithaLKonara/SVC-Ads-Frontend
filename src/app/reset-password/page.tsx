import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";

export default function ResetPasswordPage() {
  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Please enter your new password."
    >
      <form className="flex flex-col gap-4">
        
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-foreground">
            New Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirm-password" className="text-sm font-medium text-foreground">
            Confirm New Password
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            required
          />
        </div>

        <button 
          type="submit"
          className="mt-4 w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-lg active:scale-[0.98]"
        >
          Reset Password
        </button>
      </form>
    </AuthLayout>
  );
}
