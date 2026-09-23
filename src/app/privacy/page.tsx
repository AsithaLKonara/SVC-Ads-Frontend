import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export const metadata = {
  title: "Privacy Policy | LAKLAND REALITY",
  description: "Privacy policy for LAKLAND REALITY.",
};

export default function PrivacyPage() {
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
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight mb-6">Privacy Policy</h1>
            <p className="text-sm text-slate-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-8 text-slate-600">
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
                <p>
                  At LAKLAND REALITY, we respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">2. The Data We Collect About You</h2>
                <p>
                  We may collect, use, store, and transfer different kinds of personal data about you, which we have grouped together as follows:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                  <li><strong>Contact Data:</strong> includes billing address, email address, and telephone numbers.</li>
                  <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                  <li><strong>Usage Data:</strong> includes information about how you use our website, products, and services.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">3. How We Use Your Personal Data</h2>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                  <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
                  <li>Where we need to comply with a legal or regulatory obligation.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Data Security</h2>
                <p>
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorised way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
                  <br />
                  <strong>Email:</strong> laklandreality@gmail.com
                  <br />
                  <strong>Address:</strong> Panadura, Sri Lanka, 12500
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
