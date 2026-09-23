import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export const metadata = {
  title: "How It Works | LAKLAND REALITY",
  description: "Learn how to use LAKLAND REALITY to buy and sell properties.",
};

export default function HowItWorksPage() {
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
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight mb-6">How It Works</h1>
            
            <div className="space-y-8 text-slate-600 mt-8">
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">For Buyers</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Search:</strong> Use our advanced search filters to find the perfect property by location, category, or price.</li>
                  <li><strong>Contact:</strong> Get in touch with the seller directly using the contact information provided on the ad page.</li>
                  <li><strong>Deal:</strong> Negotiate and finalize the deal safely with the seller.</li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">For Sellers</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Register:</strong> Create an account to start posting your properties.</li>
                  <li><strong>Post an Ad:</strong> Provide detailed information, high-quality images, and accurate pricing for your property.</li>
                  <li><strong>Get Contacted:</strong> Interested buyers will contact you directly through the platform or phone.</li>
                  <li><strong>Sell:</strong> Close the deal and mark your ad as inactive.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Need Help?</h2>
                <p>
                  If you need any assistance, our support team is available 24/7. Reach out to us via the <Link href="/contact" className="text-brand-600 hover:underline">Contact page</Link>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
