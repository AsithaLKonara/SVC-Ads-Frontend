import React from "react";
import { MoreHorizontal, Search, Filter, AlertOctagon, CheckCircle2 } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
            Reported Content
          </h1>
          <p className="text-sm text-slate-500">
            Review and moderate ads flagged by users for violations.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <Filter size={16} className="text-slate-400" />
            Status: Pending Review
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            Reason
          </button>
        </div>
        
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Search by Ad ID or Reporter..." 
            className="block w-full sm:w-80 rounded-md border border-slate-300 bg-white py-1.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Report Info</th>
                <th scope="col" className="px-6 py-3 font-medium">Target Ad</th>
                <th scope="col" className="px-6 py-3 font-medium">Reason</th>
                <th scope="col" className="px-6 py-3 font-medium">Status</th>
                <th scope="col" className="px-6 py-3 font-medium">Date</th>
                <th scope="col" className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              
              <tr className="hover:bg-slate-50 transition-colors bg-rose-50/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                      <AlertOctagon size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">#REP-1042</span>
                      <span className="text-xs text-slate-500">By user_1294</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <a href="#" className="font-medium text-brand-600 hover:underline">Toyota Aqua 2014 for Sale</a>
                    <span className="text-xs text-slate-500">ID: #AD-4921</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700">
                    Spam / Scam
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 font-medium text-amber-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                    Pending Review
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-slate-500">2 mins ago</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-brand-600 hover:text-brand-700 font-medium text-xs mr-3">Review Ad</button>
                  <button className="text-slate-400 hover:text-slate-900">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                      <CheckCircle2 size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-900">#REP-1039</span>
                      <span className="text-xs text-slate-500">By user_5521</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <a href="#" className="font-medium text-brand-600 hover:underline">Graphic Design Services</a>
                    <span className="text-xs text-slate-500">ID: #AD-4815</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                    Wrong Category
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 font-medium text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Resolved
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-slate-500">Yesterday</td>
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
