import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, CheckCircle2, UserCheck, Database, Server, RefreshCw } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Lakland Realty Pvt Ltd",
  description: "Privacy policy for Lakland Realty Pvt Ltd in compliance with the Sri Lanka Personal Data Protection Act, No. 9 of 2022 (PDPA).",
};

export default function PrivacyPage() {
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700 border border-brand-200 mb-4">
                <ShieldCheck className="h-3.5 w-3.5" />
                PDPA Compliant (Sri Lanka Act No. 9 of 2022)
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-slate-900 tracking-tight mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg font-medium text-slate-600">Lakland Realty Pvt Ltd</p>
              <p className="text-sm text-slate-400 mt-2">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            
            <div className="space-y-10 text-slate-700 leading-relaxed">
              
              {/* Introduction */}
              <section className="rounded-xl bg-slate-50 border border-slate-200/80 p-6">
                <p className="text-slate-700 text-base leading-relaxed mb-3">
                  Lakland Realty Pvt Ltd (“we,” “us,” “our”) is committed to safeguarding the privacy and personal data of all individuals who interact with us. This Privacy Policy (“Policy”) explains how we collect, use, disclose, and protect your personal data in compliance with the <strong>Sri Lanka Personal Data Protection Act, No. 9 of 2022 (PDPA)</strong>.
                </p>
                <p className="text-slate-600 text-sm">
                  By using our website, digital portals, or engaging with our services, you agree to the practices described in this Policy.
                </p>
              </section>

              {/* 1. Scope of Application */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-brand-600" />
                  1. Scope of Application
                </h2>
                <p className="mb-4 text-slate-600">
                  This Policy applies to the following categories of individuals:
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 p-4 bg-white shadow-xs">
                    <strong className="block font-semibold text-slate-900 text-sm mb-1">Clients and Investors</strong>
                    <span className="text-sm text-slate-600">Buyers, sellers, and prospective investors in commercially valuable lands.</span>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 bg-white shadow-xs">
                    <strong className="block font-semibold text-slate-900 text-sm mb-1">Business Partners &amp; Vendors</strong>
                    <span className="text-sm text-slate-600">Contractors, suppliers, and service providers.</span>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 bg-white shadow-xs">
                    <strong className="block font-semibold text-slate-900 text-sm mb-1">Workforce &amp; Applicants</strong>
                    <span className="text-sm text-slate-600">Employees, staff, and job applicants.</span>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 bg-white shadow-xs">
                    <strong className="block font-semibold text-slate-900 text-sm mb-1">Associated Third Parties</strong>
                    <span className="text-sm text-slate-600">Family members, referees, guarantors, or dependents whose data is shared with us.</span>
                  </div>
                </div>
              </section>

              {/* 2. Data We Collect */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Database className="h-5 w-5 text-gold-600" />
                  2. Data We Collect
                </h2>
                <p className="mb-4 text-slate-600">
                  We may collect and process the following types of personal data:
                </p>
                <div className="space-y-3 pl-2">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Identity Data:</strong> Name, NIC/passport details, date of birth.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Contact Data:</strong> Address, email, phone numbers.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Financial Data:</strong> Source of funds, bank details, payment records.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Transaction Data:</strong> Property purchase history, reservations, deeds.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Technical &amp; Usage Data:</strong> IP address, device details, browsing activity on our website.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Communication Data:</strong> Queries, documents, and chatbot interactions.
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">CCTV Data:</strong> Video surveillance at our office or project sites.
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. How We Use Your Data */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-brand-600" />
                  3. How We Use Your Data
                </h2>
                <p className="mb-4 text-slate-600">
                  We process personal data only under valid legal grounds:
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 p-4 bg-white">
                    <strong className="text-slate-900 font-semibold block mb-1">Consent</strong>
                    <span className="text-sm text-slate-600">For marketing communications and optional services.</span>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 bg-white">
                    <strong className="text-slate-900 font-semibold block mb-1">Contractual Necessity</strong>
                    <span className="text-sm text-slate-600">To execute property transactions and agreements.</span>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 bg-white">
                    <strong className="text-slate-900 font-semibold block mb-1">Legal Obligations</strong>
                    <span className="text-sm text-slate-600">Compliance with tax, anti‑money laundering, and regulatory requirements.</span>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-4 bg-white">
                    <strong className="text-slate-900 font-semibold block mb-1">Legitimate Interests</strong>
                    <span className="text-sm text-slate-600">Security monitoring, customer support, and service improvements.</span>
                  </div>
                </div>
              </section>

              {/* 4. Marketing & Communications */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                  4. Marketing &amp; Communications
                </h2>
                <p className="pl-2">
                  We may send you updates on land opportunities, newsletters, or promotional offers only with your consent. You can opt out at any time by clicking “unsubscribe” in our communications or contacting us directly.
                </p>
              </section>

              {/* 5. Disclosure of Data */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Server className="h-5 w-5 text-brand-600" />
                  5. Disclosure of Data
                </h2>
                <p className="mb-3 text-slate-600">
                  We may share your personal data with:
                </p>
                <ul className="space-y-2.5 pl-2 mb-4">
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Regulatory Authorities:</strong> Inland Revenue Department, FIU, CRIB (where legally required).
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Subsidiaries &amp; Partners:</strong> Internal affiliates for unified customer management.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Professional Advisors:</strong> Lawyers, auditors, and notaries for property transactions.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                    <div>
                      <strong className="text-slate-900 font-semibold">Cloud &amp; IT Providers:</strong> Secure hosting and software services.
                    </div>
                  </li>
                </ul>
                <div className="rounded-lg bg-slate-50 border border-slate-200 p-3.5 text-sm font-medium text-slate-800">
                  🛡️ We do not sell or trade your personal data.
                </div>
              </section>

              {/* 6. International Transfers */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                  6. International Transfers
                </h2>
                <p className="pl-2">
                  If data is transferred outside Sri Lanka (e.g., cloud hosting), we ensure equivalent protection through contractual safeguards in line with the PDPA.
                </p>
              </section>

              {/* 7. Data Retention */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                  7. Data Retention
                </h2>
                <div className="space-y-3 pl-2">
                  <p>
                    <strong className="text-slate-900 font-semibold">Account &amp; Transaction Records:</strong> Retained as long as legally required for property and tax compliance.
                  </p>
                  <p>
                    <strong className="text-slate-900 font-semibold">Communications &amp; Support Data:</strong> Up to 24 months.
                  </p>
                  <p>
                    <strong className="text-slate-900 font-semibold">Job Applications:</strong> Up to 12 months unless extended with consent.
                  </p>
                </div>
              </section>

              {/* 8. Your Rights */}
              <section className="rounded-xl border border-brand-200 bg-brand-50/40 p-6">
                <h2 className="text-xl font-heading font-bold text-brand-950 mb-3 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-brand-700" />
                  8. Your Rights Under the PDPA
                </h2>
                <p className="mb-4 text-sm text-brand-900">
                  Under the Sri Lanka Personal Data Protection Act, you have the right to:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-brand-100">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
                    <span>Access your personal data.</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-brand-100">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
                    <span>Request corrections or updates.</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-brand-100">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
                    <span>Request deletion of your data (subject to legal obligations).</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-brand-100">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
                    <span>Withdraw consent for marketing.</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white rounded-lg p-3 border border-brand-100 sm:col-span-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0" />
                    <span>Object to certain processing activities.</span>
                  </div>
                </div>
              </section>

              {/* 9. Security */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-brand-600" />
                  9. Security
                </h2>
                <p className="pl-2">
                  We implement industry‑standard security measures including encryption, firewalls, and restricted access. However, you are responsible for securing your own devices when accessing our services.
                </p>
              </section>

              {/* 10. Children’s Privacy */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                  10. Children’s Privacy
                </h2>
                <p className="pl-2">
                  Our services are not directed to individuals under 16. We do not knowingly collect data from minors.
                </p>
              </section>

              {/* 11. Updates to This Policy */}
              <section>
                <h2 className="text-xl font-heading font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-gold-600" />
                  11. Updates to This Policy
                </h2>
                <p className="pl-2">
                  We may update this Policy from time to time. Changes will be posted on our website with the “Last Updated” date.
                </p>
              </section>

              {/* Contact Us */}
              <section className="border-t border-slate-200 pt-8 mt-12">
                <h3 className="text-lg font-heading font-semibold text-slate-900 mb-2">Privacy Questions &amp; Data Requests</h3>
                <p className="text-sm text-slate-600">
                  To exercise your rights under the PDPA or if you have questions regarding this policy, contact our Data Protection Officer:
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
