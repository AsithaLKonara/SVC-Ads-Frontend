import React, { useState } from "react";
import Sidepanel from "./Sidepanel";
import { ChevronDown, UploadCloud, MapPin, Tag, Star, Zap } from "lucide-react";

interface AdSidepanelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "add" | "edit";
  ad?: any;
}

export default function AdSidepanel({ isOpen, onClose, mode, ad }: AdSidepanelProps) {
  const [activeSection, setActiveSection] = useState<string>("basic");
  const title = mode === "add" ? "Post New Ad" : mode === "edit" ? "Edit Advertisement" : "Ad Details";

  return (
    <Sidepanel isOpen={isOpen} onClose={onClose} title={title}>
      
      {/* Admin Controls (Always visible at the top if editing/viewing) */}
      {mode !== "add" && (
        <div className="mb-6 rounded-lg border border-indigo-200 bg-indigo-50 p-4">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-900">
            Admin Marketing Controls
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-indigo-900">
                <Star size={16} className="text-amber-500 fill-amber-500" />
                <span className="font-medium">Pin Ad to Top (Featured)</span>
              </div>
              <button
                disabled={mode === "view"}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
                  mode === "view" ? "bg-amber-200 cursor-not-allowed" : "bg-amber-500"
                }`}
              >
                <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-indigo-900">
                <Zap size={16} className="text-rose-500 fill-rose-500" />
                <span className="font-medium">Boost Ad (High Visibility)</span>
              </div>
              <button
                disabled={mode === "view"}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
                  mode === "view" ? "bg-slate-300 cursor-not-allowed" : "bg-slate-300"
                }`}
              >
                <span className="translate-x-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2 flex items-center gap-2">
            <Tag size={16} /> Basic Information
          </h3>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Ad Title</label>
            <input
              type="text"
              disabled={mode === "view"}
              placeholder="What are you selling?"
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Category</label>
              <select
                disabled={mode === "view"}
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500 bg-white"
              >
                <option value="">Select...</option>
                <option value="1">Vehicles</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Subcategory</label>
              <select
                disabled={mode === "view"}
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500 bg-white"
              >
                <option value="">Select...</option>
                <option value="1">Cars</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Price (Rs)</label>
            <input
              type="number"
              disabled={mode === "view"}
              placeholder="0.00"
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              disabled={mode === "view"}
              rows={4}
              placeholder="Describe the item..."
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
        </div>

        {/* Dynamic Attributes (Appears based on category) */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2 flex items-center gap-2">
            Attributes (Vehicles)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Condition</label>
              <select
                disabled={mode === "view"}
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 disabled:bg-slate-50 disabled:text-slate-500 bg-white"
              >
                <option>Used</option>
                <option>New</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Mileage (km)</label>
              <input
                type="number"
                disabled={mode === "view"}
                placeholder="e.g. 50000"
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2 flex items-center gap-2">
            <MapPin size={16} /> Location
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">District</label>
              <select
                disabled={mode === "view"}
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 disabled:bg-slate-50 disabled:text-slate-500 bg-white"
              >
                <option>Colombo</option>
                <option>Kandy</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">City</label>
              <select
                disabled={mode === "view"}
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 disabled:bg-slate-50 disabled:text-slate-500 bg-white"
              >
                <option>Nugegoda</option>
                <option>Dehiwala</option>
              </select>
            </div>
          </div>
        </div>

        {/* Media Upload */}
        <div className="space-y-4 pb-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2 flex items-center gap-2">
            <UploadCloud size={16} /> Photos
          </h3>
          
          <div className="flex justify-center rounded-lg border border-dashed border-slate-300 px-6 py-8">
            <div className="text-center">
              <UploadCloud className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-brand-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-600 focus-within:ring-offset-2 hover:text-brand-500">
                  <span>Upload a file</span>
                  <input type="file" className="sr-only" disabled={mode === "view"} multiple />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-slate-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      {mode !== "view" && (
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white p-4 shadow-sm flex items-center justify-end gap-3 z-10">
          <button
            onClick={onClose}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
            {mode === "add" ? "Publish Ad" : "Save Changes"}
          </button>
        </div>
      )}
    </Sidepanel>
  );
}
