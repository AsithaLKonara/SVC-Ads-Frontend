'use client';

import React, { useState, useEffect } from "react";
import { FileText, CheckCircle2, Eye, BarChart3, TrendingUp, MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface DashboardData {
  totalAds: number;
  activeAds: number;
  totalSiteViews: number;
  totalAdViews: number;
  topPerformingAds: { id: string; title: string; views: number }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adsRes, activeAdsRes, analyticsRes] = await Promise.all([
          fetch('http://localhost:5000/api/ads?limit=1'),
          fetch('http://localhost:5000/api/ads?status=ACTIVE&limit=1'),
          fetch('http://localhost:5000/api/analytics/stats?timeframe=all')
        ]);

        const adsData = await adsRes.json();
        const activeAdsData = await activeAdsRes.json();
        const analyticsData = await analyticsRes.json();

        setData({
          totalAds: adsData.total || 0,
          activeAds: activeAdsData.total || 0,
          totalSiteViews: analyticsData.totalSiteViews || 0,
          totalAdViews: analyticsData.totalAdViews || 0,
          topPerformingAds: analyticsData.topPerformingAds || []
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
        </div>
      ) : data ? (
        <>
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
                <span className="text-3xl font-bold text-slate-900">{data.totalAds.toLocaleString()}</span>
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
                <span className="text-3xl font-bold text-slate-900">{data.activeAds.toLocaleString()}</span>
                {data.totalAds > 0 && (
                  <div className="mt-1 flex items-center text-sm text-slate-500">
                    <span className="font-medium text-slate-900">{Math.round((data.activeAds / data.totalAds) * 100)}%</span>
                    <span className="ml-1">of total ads</span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-500">Total Site Views</h3>
                <div className="rounded-md bg-indigo-50 p-2 text-indigo-600">
                  <Eye size={18} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-slate-900">{data.totalSiteViews.toLocaleString()}</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-slate-500">Total Ad Views</h3>
                <div className="rounded-md bg-brand-50 p-2 text-brand-600">
                  <BarChart3 size={18} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-slate-900">{data.totalAdViews.toLocaleString()}</span>
              </div>
            </div>

          </div>

          {/* Most Viewed Ads Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-heading text-lg font-bold text-slate-900">Most Viewed Ads</h2>
                <p className="text-sm text-slate-500">The most popular listings on the platform across all time.</p>
              </div>
              <Link href="/dashboard/analytics" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                View Full Analytics
              </Link>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">Ad ID</th>
                    <th scope="col" className="px-6 py-3 font-medium">Ad Title</th>
                    <th scope="col" className="px-6 py-3 font-medium text-right">Views</th>
                    <th scope="col" className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.topPerformingAds.length > 0 ? (
                    data.topPerformingAds.map((ad) => (
                      <tr key={ad.id} className="hover:bg-slate-50 transition-colors">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-slate-900">#{ad.id.substring(0, 8)}</td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-slate-900">{ad.title}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                            <TrendingUp size={12} className="mr-1" />
                            {ad.views.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/ad/${ad.id}`} className="text-slate-400 hover:text-brand-600 transition-colors">
                            <MoreHorizontal size={18} className="ml-auto" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                        No ad views recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
