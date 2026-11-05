import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, FileText, CheckCircle2, AlertTriangle, Scale, Lock, RefreshCw, XCircle } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Lakland Realty Pvt Ltd",
  description: "Terms and conditions for using Lakland Realty Pvt Ltd online real estate platform in Sri Lanka.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl bg-white p-8 sm:p-12 md:p-16 rounded-2xl shadow-sm border border-slate-200">
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
          
          <div>
            <div className="border-b border-slate-200 pb-8 mb-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-700 border border-gold-200 mb-4">
                <FileText className="h-3.5 w-3.5" />
                Legal Agreement
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight mb-4">
                Terms and Conditions
              </h1>
              <p className="text-lg font-medium text-slate-600">Lakland Realty Pvt Ltd</p>
              <p className="text-sm text-slate-400 mt-2">Effective Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <div className="space-y-10 text-slate-700 leading-relaxed">
              
              {/* Introduction */}
              <section className="rounded-xl bg-slate-50 border border-slate-200/80 p-6">
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-brand-600" />
                  Introduction
                </h2>
                <p className="text-slate-600 text-base">
                  Lakland Realty Pvt Ltd (“website”) is an online real estate platform in Sri Lanka, dedicated to connecting property owners, buyers, and investors with commercially valuable lands. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. If you do not agree, you should not use this site.
                </p>
              </section>

              {/* Definitions */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-gold-600" />
                  Definitions
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 p-4 bg-white shadow-xs">
                    <span className="block font-semibold text-slate-900 text-sm mb-1">Lakland Realty Pvt Ltd</span>
                    <span className="text-sm text-slate-600">Refers to the owner and operator of this website.</span>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 bg-white shadow-xs">
                    <span className="block font-semibold text-slate-900 text-sm mb-1">User</span>
                    <span className="text-sm text-slate-600">Any individual or entity accessing or using the website.</span>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 bg-white shadow-xs">
                    <span className="block font-semibold text-slate-900 text-sm mb-1">Property Owner</span>
                    <span className="text-sm text-slate-600">An individual or entity listing a property for sale on the website.</span>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 bg-white shadow-xs">
                    <span className="block font-semibold text-slate-900 text-sm mb-1">Buyer / Investor</span>
                    <span className="text-sm text-slate-600">An individual or entity interested in purchasing property listed on the website.</span>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 bg-white shadow-xs sm:col-span-2">
                    <span className="block font-semibold text-slate-900 text-sm mb-1">Authorized Agent</span>
                    <span className="text-sm text-slate-600">An individual or entity formally appointed by a property owner to list and manage their property on the website.</span>
                  </div>
                </div>
              </section>

              {/* Listing Properties */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-600" />
                  Listing Properties
                </h2>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Eligibility:</strong> Only property owners or authorized agents may list properties. All listings are subject to approval by Lakland Realty Pvt Ltd.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Accuracy of Information:</strong> Property owners must provide accurate and complete details. False or misleading information may result in removal.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Listing Fee:</strong> Lakland Realty Pvt Ltd may charge a fee for property listings. The fee structure will be communicated at the time of listing.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Content Ownership:</strong> By listing a property, the owner grants Lakland Realty Pvt Ltd a non‑exclusive, royalty‑free license to use and display the content provided.
                    </div>
                  </li>
                </ul>
              </section>

              {/* Property Purchase */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Property Purchase
                </h2>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">No Warranty:</strong> Lakland Realty Pvt Ltd does not guarantee the accuracy or reliability of property listings. Buyers must conduct their own due diligence.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Transaction Responsibility:</strong> All transactions are conducted directly between property owners and buyers. Lakland Realty Pvt Ltd is not responsible for disputes.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Payment:</strong> Payment terms must be agreed upon separately between property owners and buyers. Lakland Realty Pvt Ltd is not involved in payment processing.
                    </div>
                  </li>
                </ul>
              </section>

              {/* User Obligations */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                  User Obligations
                </h2>
                <div className="space-y-3 pl-2">
                  <p>
                    <strong className="text-slate-900 font-semibold">Compliance:</strong> Users must comply with all applicable laws and regulations.
                  </p>
                  <p>
                    <strong className="text-slate-900 font-semibold">Prohibited Activities:</strong> Users must not engage in harmful activities such as hacking, spamming, or posting defamatory content.
                  </p>
                </div>
              </section>

              {/* Privacy */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-brand-600" />
                  Privacy
                </h2>
                <div className="space-y-3 pl-2">
                  <p>
                    <strong className="text-slate-900 font-semibold">Data Collection:</strong> Lakland Realty Pvt Ltd collects and uses personal data in accordance with its{" "}
                    <Link href="/privacy" className="text-brand-600 underline font-medium hover:text-brand-700">
                      Privacy Policy
                    </Link>.
                  </p>
                  <p>
                    <strong className="text-slate-900 font-semibold">Data Sharing:</strong> Personal data may be shared with third parties as necessary to provide services or as required by law.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section className="rounded-xl border border-slate-200 p-6 bg-slate-50/50">
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4">
                  Limitation of Liability
                </h2>
                <div className="space-y-3">
                  <p>
                    <strong className="text-slate-900 font-semibold">No Liability:</strong> Lakland Realty Pvt Ltd is not liable for any damages arising from the use of the website or transactions conducted through it.
                  </p>
                  <p>
                    <strong className="text-slate-900 font-semibold">Indemnification:</strong> Users agree to indemnify and hold Lakland Realty Pvt Ltd harmless from any claims or expenses arising from their use of the website.
                  </p>
                </div>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Termination
                </h2>
                <div className="space-y-3 pl-2">
                  <p>
                    <strong className="text-slate-900 font-semibold">Right to Terminate:</strong> Lakland Realty Pvt Ltd reserves the right to suspend or terminate access for users who violate these terms.
                  </p>
                  <p>
                    <strong className="text-slate-900 font-semibold">Effect of Termination:</strong> Upon termination, the user’s right to use the website ceases immediately, and any outstanding obligations remain enforceable.
                  </p>
                </div>
              </section>

              {/* Changes to Terms */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-gold-600" />
                  Changes to Terms
                </h2>
                <p className="pl-2">
                  Lakland Realty Pvt Ltd may modify these terms at any time. Users are encouraged to review them regularly. Continued use of the website after changes are posted constitutes acceptance of the revised terms.
                </p>
              </section>

              {/* Governing Law */}
              <section className="rounded-xl bg-brand-50/50 border border-brand-200/60 p-6">
                <h2 className="text-xl font-heading font-bold text-brand-950 mb-3 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-brand-700" />
                  Governing Law
                </h2>
                <p className="text-brand-900">
                  These terms are governed by and construed in accordance with the laws of Sri Lanka. Any disputes shall be subject to the exclusive jurisdiction of the courts of Sri Lanka.
                </p>
              </section>

              {/* Contact Information */}
              <section className="border-t border-slate-200 pt-8 mt-12">
                <h3 className="text-lg font-heading font-semibold text-slate-900 mb-2">Need Further Clarification?</h3>
                <p className="text-sm text-slate-600">
                  If you have questions regarding these terms, please contact Lakland Realty Pvt Ltd at:
                  <br />
                  <span className="font-semibold text-slate-800">Email:</span>{" "}
                  <a href="mailto:laklandreality@gmail.com" className="text-brand-600 hover:underline">laklandreality@gmail.com</a>
                  <br />
                  <span className="font-semibold text-slate-800">Address:</span> Panadura, Sri Lanka, 12500
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
