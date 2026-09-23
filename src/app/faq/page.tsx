import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export const metadata = {
  title: "FAQ | LAKLAND REALITY",
  description: "Frequently Asked Questions about LAKLAND REALITY.",
};

export default function FAQPage() {
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
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight mb-6">Frequently Asked Questions</h1>
            
            <div className="space-y-8 text-slate-600 mt-8">
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">How much does it cost to post an ad?</h2>
                <p>
                  Posting standard ads on LAKLAND REALITY is completely free. We do offer premium featuring options for a small fee if you wish to boost your ad's visibility.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">How long will my ad stay active?</h2>
                <p>
                  Your ad will remain active for 30 days. After that, you can choose to renew it or let it expire.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">How do I edit or delete my ad?</h2>
                <p>
                  Log in to your account, go to your Dashboard, and navigate to "My Ads". From there, you can edit the details, change the status, or delete your ad entirely.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-2">What should I do if I suspect a fraudulent listing?</h2>
                <p>
                  Please report the listing immediately by contacting our support team via the Contact page. Provide the link to the ad and your reason for suspicion.
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
