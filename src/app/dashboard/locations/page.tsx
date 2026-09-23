"use client";

import React, { useEffect, useState } from "react";
import { Search, MapPin, Loader2, BarChart2 } from "lucide-react";
import { locationService, LocationGroup } from "@/services/locationService";

export default function LocationsPage() {
  const [locations, setLocations] = useState<LocationGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        const data = await locationService.getLocations();
        setLocations(data);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const filteredLocations = locations.filter((loc) => 
    loc.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
            Active Locations
          </h1>
          <p className="text-sm text-slate-500">
            Locations are automatically derived from active advertisements.
          </p>
        </div>
        {/* Notice how the 'Add Location' button is removed as per requirements */}
        <div className="inline-flex items-center gap-2 rounded-md bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700">
          <BarChart2 size={16} />
          {locations.length} Total Regions Active
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Search locations..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full sm:w-80 rounded-md border border-slate-300 bg-white py-1.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">City</th>
                <th scope="col" className="px-6 py-3 font-medium">District</th>
                <th scope="col" className="px-6 py-3 font-medium">Active Ads</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-brand-500" />
                    <p className="mt-2">Loading locations...</p>
                  </td>
                </tr>
              ) : filteredLocations.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                    No active locations found.
                  </td>
                </tr>
              ) : (
                filteredLocations.map((loc, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                          <MapPin size={16} />
                        </div>
                        <span className="font-medium text-slate-900">{loc.city}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                        {loc.district}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {loc._count.id}
                    </td>
                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
