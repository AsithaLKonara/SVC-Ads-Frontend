import React from "react";
import { LineChart, BarChart3, TrendingUp, Users, Eye } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
            Analytics & Views
          </h1>
          <p className="text-sm text-slate-500">
            Monitor site traffic, ad performance, and user engagement metrics.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-md p-1 shadow-sm">
          <button className="px-3 py-1 text-sm font-medium rounded text-slate-600 hover:bg-slate-100">7 Days</button>
          <button className="px-3 py-1 text-sm font-medium rounded bg-slate-100 text-slate-900 shadow-sm">30 Days</button>
          <button className="px-3 py-1 text-sm font-medium rounded text-slate-600 hover:bg-slate-100">All Time</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-md bg-blue-50 p-2 text-blue-600">
              <Eye size={18} />
            </div>
            <h3 className="text-sm font-medium text-slate-500">Total Site Views</h3>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-slate-900">245.8K</span>
            <div className="mt-1 flex items-center text-sm text-emerald-600">
              <TrendingUp size={14} className="mr-1" />
              <span className="font-medium">18.2%</span>
              <span className="ml-2 text-slate-500">vs previous 30 days</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-md bg-brand-50 p-2 text-brand-600">
              <BarChart3 size={18} />
            </div>
            <h3 className="text-sm font-medium text-slate-500">Total Ad Views</h3>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-slate-900">182.4K</span>
            <div className="mt-1 flex items-center text-sm text-emerald-600">
              <TrendingUp size={14} className="mr-1" />
              <span className="font-medium">12.5%</span>
              <span className="ml-2 text-slate-500">vs previous 30 days</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-md bg-indigo-50 p-2 text-indigo-600">
              <Users size={18} />
            </div>
            <h3 className="text-sm font-medium text-slate-500">Unique Visitors</h3>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold text-slate-900">42.1K</span>
            <div className="mt-1 flex items-center text-sm text-emerald-600">
              <TrendingUp size={14} className="mr-1" />
              <span className="font-medium">8.4%</span>
              <span className="ml-2 text-slate-500">vs previous 30 days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Placeholder for Traffic Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col h-80">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-bold text-slate-900">Traffic Over Time</h3>
            <LineChart size={20} className="text-slate-400" />
          </div>
          <div className="flex-1 border border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50">
            <p className="text-sm text-slate-400">Chart Visualization (e.g. Recharts or Chart.js)</p>
          </div>
        </div>

        {/* Top Performing Ads Table */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col h-80">
          <div className="px-6 py-5 border-b border-slate-200">
            <h3 className="font-heading font-bold text-slate-900">Top Performing Ads</h3>
          </div>
          <div className="overflow-y-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200 sticky top-0">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">Ad Title</th>
                  <th scope="col" className="px-6 py-3 font-medium text-right">Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3">
                    <div className="font-medium text-slate-900 truncate max-w-[200px] sm:max-w-[300px]">Honda Civic Type R 2018</div>
                    <div className="text-xs text-slate-500">ID: #AD-5021</div>
                  </td>
                  <td className="px-6 py-3 text-right font-medium text-slate-900">12,450</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3">
                    <div className="font-medium text-slate-900 truncate max-w-[200px] sm:max-w-[300px]">Land in Kandy</div>
                    <div className="text-xs text-slate-500">ID: #AD-4998</div>
                  </td>
                  <td className="px-6 py-3 text-right font-medium text-slate-900">9,820</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3">
                    <div className="font-medium text-slate-900 truncate max-w-[200px] sm:max-w-[300px]">MacBook Pro M2 2022</div>
                    <div className="text-xs text-slate-500">ID: #AD-5019</div>
                  </td>
                  <td className="px-6 py-3 text-right font-medium text-slate-900">7,142</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-6 py-3">
                    <div className="font-medium text-slate-900 truncate max-w-[200px] sm:max-w-[300px]">Modern Sofa Set</div>
                    <div className="text-xs text-slate-500">ID: #AD-5011</div>
                  </td>
                  <td className="px-6 py-3 text-right font-medium text-slate-900">4,390</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
