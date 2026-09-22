import React from "react";
import { MoreHorizontal, AlertCircle, FileText, CheckCircle2, Clock } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Overview of platform statistics and recent activities.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">Total Ads</h3>
            <div className="rounded-md bg-blue-50 p-2 text-blue-600">
              <FileText size={18} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-slate-900">12,450</span>
            <div className="mt-1 flex items-center text-sm text-emerald-600">
              <span className="font-medium">+12%</span>
              <span className="ml-2 text-slate-500">from last month</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">Active Ads</h3>
            <div className="rounded-md bg-emerald-50 p-2 text-emerald-600">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-slate-900">11,230</span>
            <div className="mt-1 flex items-center text-sm text-slate-500">
              <span className="font-medium text-slate-900">90%</span>
              <span className="ml-1">of total ads</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">Pending Approvals</h3>
            <div className="rounded-md bg-amber-50 p-2 text-amber-600">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-slate-900">142</span>
            <div className="mt-1 flex items-center text-sm text-slate-500">
              Needs review
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-slate-500">Recent Reports</h3>
            <div className="rounded-md bg-rose-50 p-2 text-rose-600">
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-bold text-slate-900">28</span>
            <div className="mt-1 flex items-center text-sm text-rose-600">
              <span className="font-medium">+4</span>
              <span className="ml-2 text-slate-500">since yesterday</span>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Reports Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="font-heading text-lg font-bold text-slate-900">Recent Reports</h2>
          <p className="text-sm text-slate-500">Ads that have been flagged by users and need moderation.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Ad ID</th>
                <th scope="col" className="px-6 py-3 font-medium">Ad Title</th>
                <th scope="col" className="px-6 py-3 font-medium">Reason</th>
                <th scope="col" className="px-6 py-3 font-medium">Reporter</th>
                <th scope="col" className="px-6 py-3 font-medium">Date</th>
                <th scope="col" className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">#AD-4921</td>
                <td className="px-6 py-4">Toyota Aqua 2014 for Sale</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700">
                    Spam / Scam
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">user_1294</td>
                <td className="whitespace-nowrap px-6 py-4">2 mins ago</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-900">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">#AD-4890</td>
                <td className="px-6 py-4">Luxury Apartment in Colombo 07</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                    Inappropriate Content
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">user_9921</td>
                <td className="whitespace-nowrap px-6 py-4">1 hour ago</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-900">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">#AD-4882</td>
                <td className="px-6 py-4">IPhone 13 Pro Max - Used</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700">
                    Fake Item
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">user_0411</td>
                <td className="whitespace-nowrap px-6 py-4">3 hours ago</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-900">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">#AD-4815</td>
                <td className="px-6 py-4">Graphic Design Services</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                    Wrong Category
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">user_5521</td>
                <td className="whitespace-nowrap px-6 py-4">Yesterday</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-900">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
