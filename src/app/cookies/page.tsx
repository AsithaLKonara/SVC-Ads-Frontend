import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

export const metadata = {
  title: "Cookie Policy | LAKLAND REALITY",
  description: "Cookie policy for LAKLAND REALITY.",
};

export default function CookiesPage() {
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
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight mb-6">Cookie Policy</h1>
            <p className="text-sm text-slate-500 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <div className="space-y-8 text-slate-600">
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">1. What Are Cookies</h2>
                <p>
                  As is common practice with almost all professional websites, this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">2. How We Use Cookies</h2>
                <p>
                  We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Disabling Cookies</h2>
                <p>
                  You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">4. The Cookies We Set</h2>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    <strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration.
                  </li>
                  <li>
                    <strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page.
                  </li>
                  <li>
                    <strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Third Party Cookies</h2>
                <p>
                  In some special cases, we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">6. More Information</h2>
                <p>
                  Hopefully, that has clarified things for you. If you have any questions, please contact us at:
                  <br />
                  <strong>Email:</strong> laklandreality@gmail.com
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
