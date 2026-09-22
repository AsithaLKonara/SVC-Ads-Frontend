import React from "react";
import { MoreHorizontal, Filter, Search, Plus } from "lucide-react";

export default function AdsManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
            Advertisement Management
          </h1>
          <p className="text-sm text-slate-500">
            View, approve, and manage all advertisements across the platform.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 transition-colors">
          <Plus size={16} />
          Post New Ad
        </button>
      </div>

      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          <a href="/dashboard/ads" className="whitespace-nowrap border-b-2 border-brand-500 px-1 py-4 text-sm font-medium text-brand-600">
            All Ads
          </a>
          <a href="/dashboard/ads/featured" className="whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700">
            Featured Ads
          </a>
        </nav>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            <Filter size={16} className="text-slate-400" />
            All Statuses
          </button>
          <button className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            Category
          </button>
        </div>
        
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Search ads..." 
            className="block w-full sm:w-64 rounded-md border border-slate-300 bg-white py-1.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Ads Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Ad Details</th>
                <th scope="col" className="px-6 py-3 font-medium">Category</th>
                <th scope="col" className="px-6 py-3 font-medium">Price</th>
                <th scope="col" className="px-6 py-3 font-medium">Status</th>
                <th scope="col" className="px-6 py-3 font-medium">Posted</th>
                <th scope="col" className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">Honda Civic Type R 2018</span>
                    <span className="text-xs text-slate-500">ID: #AD-5021</span>
                  </div>
                </td>
                <td className="px-6 py-4">Vehicles / Cars</td>
                <td className="px-6 py-4 font-medium text-slate-900">Rs 14,500,000</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 border border-amber-200">
                    Pending
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">10 mins ago</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-brand-600 font-medium text-xs mr-3">Approve</button>
                  <button className="text-slate-400 hover:text-slate-900">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">MacBook Pro M2 2022</span>
                    <span className="text-xs text-slate-500">ID: #AD-5019</span>
                  </div>
                </td>
                <td className="px-6 py-4">Electronics / Laptops</td>
                <td className="px-6 py-4 font-medium text-slate-900">Rs 450,000</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">2 hours ago</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-900">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">Modern Sofa Set</span>
                    <span className="text-xs text-slate-500">ID: #AD-5011</span>
                  </div>
                </td>
                <td className="px-6 py-4">Home / Furniture</td>
                <td className="px-6 py-4 font-medium text-slate-900">Rs 85,000</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700 border border-rose-200">
                    Rejected
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">Yesterday</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-900">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900 flex items-center gap-1">
                      Land in Kandy
                      <span className="text-[10px] uppercase bg-brand-50 text-brand-700 px-1.5 py-0.5 rounded font-bold">Featured</span>
                    </span>
                    <span className="text-xs text-slate-500">ID: #AD-4998</span>
                  </div>
                </td>
                <td className="px-6 py-4">Property / Lands</td>
                <td className="px-6 py-4 font-medium text-slate-900">Rs 2,500,000 /per perch</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">2 days ago</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-900">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        
        <div className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-3">
          <p className="text-xs text-slate-500">Showing 1 to 10 of 12,450 entries</p>
          <div className="flex items-center gap-2">
            <button className="rounded border border-slate-300 px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-50 disabled:opacity-50">Previous</button>
            <button className="rounded border border-slate-300 px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
