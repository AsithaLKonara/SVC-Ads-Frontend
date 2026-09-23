'use client';

import React, { useState, useEffect } from "react";
import { FileDown, Download, BarChart2, Calendar, FileText, CheckCircle2, Eye, CircleDollarSign } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ReportData {
  totalSiteViews: number;
  totalAdViews: number;
  uniqueVisitors: number;
  totalListedValue: number;
  activeAdsCount: number;
  topPerformingAds: { id: string; title: string; views: number; price: number }[];
}

export default function ReportsPage() {
  const [timeframe, setTimeframe] = useState('30d');
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReportData(timeframe);
  }, [timeframe]);

  const fetchReportData = async (tf: string) => {
    setLoading(true);
    try {
      const [analyticsRes, activeAdsRes] = await Promise.all([
        fetch(`http://localhost:5000/api/analytics/stats?timeframe=${tf}&limit=50`),
        fetch('http://localhost:5000/api/ads?status=ACTIVE&limit=1') // Get active ads count
      ]);

      const analyticsData = await analyticsRes.json();
      const activeAdsData = await activeAdsRes.json();

      setData({
        totalSiteViews: analyticsData.totalSiteViews || 0,
        totalAdViews: analyticsData.totalAdViews || 0,
        uniqueVisitors: analyticsData.uniqueVisitors || 0,
        totalListedValue: analyticsData.totalListedValue || 0,
        activeAdsCount: activeAdsData.total || 0,
        topPerformingAds: analyticsData.topPerformingAds || []
      });
    } catch (error) {
      console.error("Failed to fetch report data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeframeLabel = () => {
    switch (timeframe) {
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case '90d': return 'Last 90 Days';
      case 'all': return 'All Time';
      default: return '';
    }
  };

  const exportToCSV = () => {
    if (!data) return;

    const headers = ["Rank", "Ad ID", "Title", "Views", "Price (Rs.)"];
    const rows = data.topPerformingAds.map((ad, index) => [
      index + 1,
      `#${ad.id.substring(0, 8)}`,
      `"${ad.title.replace(/"/g, '""')}"`, // escape quotes
      ad.views ?? 0,
      ad.price ?? 0
    ]);

    // Add summary section
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "REPORT SUMMARY\n";
    csvContent += `Timeframe,${getTimeframeLabel()}\n`;
    csvContent += `Total Site Views,${data.totalSiteViews}\n`;
    csvContent += `Total Ad Views,${data.totalAdViews}\n`;
    csvContent += `Unique Visitors,${data.uniqueVisitors}\n`;
    csvContent += `Active Listings,${data.activeAdsCount}\n`;
    csvContent += `Total Listed Value (Rs.),${data.totalListedValue}\n\n`;

    csvContent += "TOP PERFORMING ADS\n";
    csvContent += headers.join(",") + "\n";
    rows.forEach(rowArray => {
      csvContent += rowArray.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `platform_report_${timeframe}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    if (!data) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Title
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text("Platform Analytics Report", pageWidth / 2, 20, { align: "center" });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`Timeframe: ${getTimeframeLabel()} | Generated: ${new Date().toLocaleDateString()}`, pageWidth / 2, 28, { align: "center" });

    // Summary Section
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text("Executive Summary", 14, 45);

    autoTable(doc, {
      startY: 50,
      theme: 'grid',
      headStyles: { fillColor: [248, 250, 252], textColor: [71, 85, 105], fontStyle: 'bold' },
      body: [
        ['Total Site Views', data.totalSiteViews.toLocaleString()],
        ['Total Ad Views', data.totalAdViews.toLocaleString()],
        ['Unique Visitors', data.uniqueVisitors.toLocaleString()],
        ['Active Listings', data.activeAdsCount.toLocaleString()],
        ['Total Listed Value', `Rs. ${(data.totalListedValue ?? 0).toLocaleString()}`],
      ],
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 80 },
        1: { halign: 'right' }
      },
      margin: { left: 14, right: 14 }
    });

    // Top Ads Table
    const finalY = (doc as any).lastAutoTable.finalY || 100;
    doc.setFontSize(14);
    doc.text("Top Performing Ads", 14, finalY + 15);

    const tableData = data.topPerformingAds.map((ad, index) => [
      index + 1,
      `#${ad.id.substring(0, 8)}`,
      ad.title,
      (ad.views ?? 0).toLocaleString(),
      `Rs. ${(ad.price ?? 0).toLocaleString()}`
    ]);

    autoTable(doc, {
      startY: finalY + 20,
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229] }, // indigo-600
      head: [['Rank', 'Ad ID', 'Title', 'Views', 'Price']],
      body: tableData,
      columnStyles: {
        0: { halign: 'center', cellWidth: 15 },
        1: { cellWidth: 30 },
        3: { halign: 'right', cellWidth: 25 },
        4: { halign: 'right', cellWidth: 35 }
      }
    });

    doc.save(`platform_report_${timeframe}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
            Report Generation
          </h1>
          <p className="text-sm text-slate-500">
            Export comprehensive analytics, traffic, and sales (listed value) data.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1">
              {[
                { value: '7d', label: '7 Days' },
                { value: '30d', label: '30 Days' },
                { value: '90d', label: '90 Days' },
                { value: 'all', label: 'All Time' }
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setTimeframe(opt.value)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    timeframe === opt.value
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {loading && (
              <div className="flex items-center text-sm text-slate-500">
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-brand-500 border-t-transparent"></div>
                Updating...
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={exportToCSV}
              disabled={loading || !data}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50 transition-colors"
            >
              <FileDown size={16} className="text-slate-500" />
              Export CSV
            </button>
            <button
              onClick={exportToPDF}
              disabled={loading || !data}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 disabled:opacity-50 transition-colors"
            >
              <Download size={16} />
              Export PDF
            </button>
          </div>
        </div>

        {/* Report Preview */}
        {!loading && data && (
          <div className="mt-8 border-t border-slate-200 pt-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <BarChart2 size={20} className="text-brand-600" />
                Report Preview
              </h3>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                <Calendar size={12} className="mr-1" />
                {getTimeframeLabel()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
              <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
                <div className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mb-1">
                  <Eye size={14} /> Site Views
                </div>
                <div className="text-2xl font-bold text-slate-900">{data.totalSiteViews.toLocaleString()}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
                <div className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mb-1">
                  <FileText size={14} /> Ad Views
                </div>
                <div className="text-2xl font-bold text-slate-900">{data.totalAdViews.toLocaleString()}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
                <div className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mb-1">
                  <BarChart2 size={14} /> Unique Vis.
                </div>
                <div className="text-2xl font-bold text-slate-900">{data.uniqueVisitors.toLocaleString()}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-4 border border-slate-100">
                <div className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mb-1">
                  <CheckCircle2 size={14} /> Active Ads
                </div>
                <div className="text-2xl font-bold text-slate-900">{data.activeAdsCount.toLocaleString()}</div>
              </div>
              <div className="rounded-lg bg-emerald-50/50 p-4 border border-emerald-100">
                <div className="text-sm font-medium text-emerald-700 flex items-center gap-1.5 mb-1">
                  <CircleDollarSign size={14} /> Listed Value
                </div>
                <div className="text-xl font-bold text-slate-900">Rs. {data.totalListedValue.toLocaleString()}</div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-medium text-slate-900 mb-4">Top 50 Most Viewed Ads</h4>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                    <tr>
                      <th scope="col" className="px-6 py-3 font-medium">Rank</th>
                      <th scope="col" className="px-6 py-3 font-medium">Ad ID</th>
                      <th scope="col" className="px-6 py-3 font-medium">Title</th>
                      <th scope="col" className="px-6 py-3 font-medium text-right">Views</th>
                      <th scope="col" className="px-6 py-3 font-medium text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {data.topPerformingAds.length > 0 ? (
                      data.topPerformingAds.map((ad, index) => (
                        <tr key={ad.id} className="hover:bg-slate-50">
                          <td className="px-6 py-3 font-medium text-slate-900">{index + 1}</td>
                          <td className="px-6 py-3 text-slate-500">#{ad.id.substring(0, 8)}</td>
                          <td className="px-6 py-3 font-medium text-slate-900">{ad.title}</td>
                          <td className="px-6 py-3 text-right font-medium text-emerald-600">{(ad.views ?? 0).toLocaleString()}</td>
                          <td className="px-6 py-3 text-right">Rs. {(ad.price ?? 0).toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No data available for this timeframe</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
