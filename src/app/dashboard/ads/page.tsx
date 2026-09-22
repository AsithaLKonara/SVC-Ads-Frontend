"use client";

import React, { useEffect, useState } from "react";
import { MoreHorizontal, Plus, Search, Loader2, Edit, Trash2 } from "lucide-react";
import { adService, Ad } from "@/services/adService";
import { categoryService, Category } from "@/services/categoryService";
import AdSidepanel from "@/components/admin/AdSidepanel";

export default function AdsPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sidepanel state
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<"view" | "add" | "edit">("add");
  const [selectedAd, setSelectedAd] = useState<Ad | undefined>(undefined);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [adsData, catsData] = await Promise.all([
        adService.getAds(),
        categoryService.getAdminCategories()
      ]);
      setAds(adsData);
      setCategories(catsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;
    
    try {
      await adService.deleteAd(id);
      fetchData();
    } catch (error: any) {
      alert(error.message || "Failed to delete ad");
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      await adService.toggleAdStatus(id, newStatus);
      fetchData();
    } catch (error: any) {
      alert(error.message || "Failed to toggle status");
    }
  };

  const openAddPanel = () => {
    setSelectedAd(undefined);
    setPanelMode("add");
    setIsPanelOpen(true);
  };

  const openEditPanel = (ad: Ad) => {
    setSelectedAd(ad);
    setPanelMode("edit");
    setIsPanelOpen(true);
  };

  const filteredAds = ads.filter((ad) => 
    ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ad.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
            Advertisements
          </h1>
          <p className="text-sm text-slate-500">
            Manage all user and staff posted advertisements on the platform.
          </p>
        </div>
        <button 
          onClick={openAddPanel}
          className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 transition-colors"
        >
          <Plus size={16} />
          Post New Ad
        </button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Search ads..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                <th scope="col" className="px-6 py-3 font-medium">Ad Title & Location</th>
                <th scope="col" className="px-6 py-3 font-medium">Category</th>
                <th scope="col" className="px-6 py-3 font-medium">Price</th>
                <th scope="col" className="px-6 py-3 font-medium">Status</th>
                <th scope="col" className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-brand-500" />
                    <p className="mt-2">Loading advertisements...</p>
                  </td>
                </tr>
              ) : filteredAds.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No advertisements found.
                  </td>
                </tr>
              ) : (
                filteredAds.map((ad) => (
                  <tr key={ad.id} className={`hover:bg-slate-50 transition-colors ${ad.status === 'INACTIVE' ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">{ad.title}</span>
                        <span className="text-xs text-slate-500">{ad.city}, {ad.district}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {ad.category?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      Rs {ad.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => toggleStatus(ad.id, ad.status)}
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          ad.status === 'ACTIVE' 
                            ? 'bg-brand-50 text-brand-700 hover:bg-brand-100' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        } transition-colors cursor-pointer`}
                      >
                        {ad.status === 'ACTIVE' ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEditPanel(ad)}
                          className="text-slate-400 hover:text-brand-600 p-1 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(ad.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdSidepanel 
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        mode={panelMode}
        ad={selectedAd}
        categories={categories}
        onSuccess={() => {
          setIsPanelOpen(false);
          fetchData();
        }}
      />
    </div>
  );
}
