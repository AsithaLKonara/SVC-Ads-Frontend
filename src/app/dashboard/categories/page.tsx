import React from "react";
import { MoreHorizontal, Plus, Search, ChevronRight } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
            Categories
          </h1>
          <p className="text-sm text-slate-500">
            Manage the category hierarchy for all platform advertisements.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 transition-colors">
          <Plus size={16} />
          New Category
        </button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Search categories..." 
            className="block w-full sm:w-64 rounded-md border border-slate-300 bg-white py-1.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">Category Name</th>
                <th scope="col" className="px-6 py-3 font-medium">Slug</th>
                <th scope="col" className="px-6 py-3 font-medium">Subcategories</th>
                <th scope="col" className="px-6 py-3 font-medium">Total Ads</th>
                <th scope="col" className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 font-medium text-slate-900">
                    <div className="h-8 w-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">V</div>
                    Vehicles
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-500">/vehicles</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    12 Subcategories
                    <ChevronRight size={12} className="text-slate-400" />
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-900">4,231</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-900">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 font-medium text-slate-900">
                    <div className="h-8 w-8 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center font-bold">P</div>
                    Property
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-500">/property</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    8 Subcategories
                    <ChevronRight size={12} className="text-slate-400" />
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-900">2,198</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-slate-900">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 font-medium text-slate-900">
                    <div className="h-8 w-8 rounded-md bg-sky-50 text-sky-600 flex items-center justify-center font-bold">E</div>
                    Electronics
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs text-slate-500">/electronics</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    15 Subcategories
                    <ChevronRight size={12} className="text-slate-400" />
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-900">3,450</td>
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
