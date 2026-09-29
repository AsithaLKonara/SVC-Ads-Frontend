import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export const metadata = {
  title: "Terms of Service | LAKLAND REALITY",
  description: "Terms and conditions for using LAKLAND REALITY services.",
};

export default function TermsPage() {
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
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight mb-6">Terms of Service</h1>
            <p className="text-sm text-slate-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-8 text-slate-600">
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
                <p>
                  Welcome to LAKLAND REALITY. These Terms of Service ("Terms") govern your use of our website, services, and applications (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Use of Services</h2>
                <p>
                  You agree to use our Services only for lawful purposes and in accordance with these Terms. You are prohibited from violating or attempting to violate the security of the Services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Property Listings</h2>
                <p>
                  All property listings, information, and availability are subject to change without notice. While we strive for accuracy, LAKLAND REALITY does not warrant the completeness or accuracy of the information provided in the listings.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Intellectual Property</h2>
                <p>
                  The Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by LAKLAND REALITY and are protected by copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Disclaimer of Warranties</h2>
                <p>
                  The Services are provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
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
