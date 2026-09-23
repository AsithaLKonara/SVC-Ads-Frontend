import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export const metadata = {
  title: "Safety Tips | LAKLAND REALITY",
  description: "Stay safe while buying and selling on LAKLAND REALITY.",
};

export default function SafetyTipsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight mb-6">Safety Tips</h1>
            
            <div className="space-y-8 text-slate-600 mt-8">
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">General Safety</h2>
                <p>
                  We are committed to providing a secure marketplace for property transactions. Always exercise caution and common sense.
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                  <li>Keep communications on the platform as much as possible.</li>
                  <li>Do not share highly sensitive personal information unnecessarily.</li>
                  <li>Report any suspicious users or advertisements to our support team immediately.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Financial Safety</h2>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                  <li>Never send money upfront before verifying the property and the seller's credentials.</li>
                  <li>Use verifiable payment methods and insist on proper documentation (receipts, contracts).</li>
                  <li>If an offer sounds too good to be true, it probably is. Investigate thoroughly.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Meeting Safely</h2>
                <ul className="list-disc pl-5 space-y-2 mt-4">
                  <li>Always arrange property viewings during daylight hours.</li>
                  <li>Bring a friend or family member along when meeting a buyer or seller.</li>
                  <li>Ensure the property visit takes place in a safe environment.</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
