'use client';

import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, Eye } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface AnalyticsData {
  totalSiteViews: number;
  totalAdViews: number;
  uniqueVisitors: number;
  trafficOverTime: { date: string; views: number }[];
  topPerformingAds: { id: string; title: string; views: number }[];
}

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('30d');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/analytics/stats?timeframe=${timeframe}`);
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [timeframe]);

  const TimeframeButton = ({ value, label }: { value: string, label: string }) => (
    <button 
      onClick={() => setTimeframe(value)}
      className={`px-3 py-1 text-sm font-medium rounded ${
        timeframe === value 
          ? 'bg-slate-100 text-slate-900 shadow-sm' 
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {label}
    </button>
  );

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
          <TimeframeButton value="7d" label="7 Days" />
          <TimeframeButton value="30d" label="30 Days" />
          <TimeframeButton value="90d" label="90 Days" />
          <TimeframeButton value="all" label="All Time" />
        </div>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
        </div>
      ) : data ? (
        <>
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
                <span className="text-3xl font-bold text-slate-900">{data.totalSiteViews.toLocaleString()}</span>
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
                <span className="text-3xl font-bold text-slate-900">{data.totalAdViews.toLocaleString()}</span>
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
                <span className="text-3xl font-bold text-slate-900">{data.uniqueVisitors.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Traffic Chart */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col h-96">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading font-bold text-slate-900">Traffic Over Time</h3>
              </div>
              <div className="flex-1 w-full h-full min-h-[250px]">
                {data.trafficOverTime.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.trafficOverTime}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="date" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        dy={10}
                        tickFormatter={(val: any) => {
                          if (!val) return '';
                          const d = new Date(val as string);
                          return `${d.getDate()}/${d.getMonth()+1}`;
                        }}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        dx={-10}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        labelFormatter={(val: any) => val ? new Date(val as string).toLocaleDateString() : ''}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#0ea5e9" 
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2 }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center border border-dashed border-slate-200 rounded-lg bg-slate-50">
                    <p className="text-sm text-slate-400">No traffic data for this period</p>
                  </div>
                )}
              </div>
            </div>

            {/* Top Performing Ads Table */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm flex flex-col h-96">
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
                    {data.topPerformingAds.length > 0 ? (
                      data.topPerformingAds.map((ad, idx) => (
                        <tr key={ad.id} className="hover:bg-slate-50">
                          <td className="px-6 py-3">
                            <div className="font-medium text-slate-900 truncate max-w-[200px] sm:max-w-[300px]">
                              {ad.title}
                            </div>
                            <div className="text-xs text-slate-500">ID: #{ad.id.substring(0, 8)}</div>
                          </td>
                          <td className="px-6 py-3 text-right font-medium text-slate-900">
                            {ad.views.toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-6 py-8 text-center text-slate-500">
                          No ads have received views yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
