import React, { useState } from "react";
import Sidepanel from "./Sidepanel";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface CategorySidepanelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "add" | "edit";
  category?: any; // Placeholder for category data
}

export default function CategorySidepanel({ isOpen, onClose, mode, category }: CategorySidepanelProps) {
  const [activeTab, setActiveTab] = useState<"details" | "attributes">("details");

  const title = mode === "add" ? "Add New Category" : mode === "edit" ? "Edit Category" : "Category Details";

  return (
    <Sidepanel isOpen={isOpen} onClose={onClose} title={title}>
      {/* Tabs */}
      <div className="mb-6 flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("details")}
          className={`pb-3 text-sm font-medium ${
            activeTab === "details"
              ? "border-b-2 border-brand-500 text-brand-600"
              : "text-slate-500 hover:text-slate-700"
          } px-4`}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab("attributes")}
          className={`pb-3 text-sm font-medium ${
            activeTab === "attributes"
              ? "border-b-2 border-brand-500 text-brand-600"
              : "text-slate-500 hover:text-slate-700"
          } px-4`}
        >
          Dynamic Attributes
        </button>
      </div>

      {/* Details Tab */}
      {activeTab === "details" && (
        <div className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Category Name</label>
            <input
              type="text"
              disabled={mode === "view"}
              placeholder="e.g. Vehicles"
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Slug</label>
            <input
              type="text"
              disabled={mode === "view"}
              placeholder="e.g. vehicles"
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
            <p className="mt-1 text-xs text-slate-500">The URL-friendly version of the name.</p>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Parent Category</label>
            <select
              disabled={mode === "view"}
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
            >
              <option value="">None (Top-Level Category)</option>
              <option value="1">Vehicles</option>
              <option value="2">Electronics</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Icon (SVG or Icon Class)</label>
            <input
              type="text"
              disabled={mode === "view"}
              placeholder="e.g. car-icon"
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
            />
          </div>
        </div>
      )}

      {/* Attributes Tab */}
      {activeTab === "attributes" && (
        <div className="space-y-4">
          <p className="text-sm text-slate-500 mb-4">
            Define custom fields required when posting ads in this category (e.g. Mileage, Model, RAM).
          </p>

          {/* Existing Attributes List */}
          <div className="space-y-2">
            {[
              { name: "Make", type: "Dropdown" },
              { name: "Model", type: "Text" },
              { name: "Mileage", type: "Number" }
            ].map((attr, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 p-3">
                <GripVertical size={16} className="text-slate-400 cursor-grab" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{attr.name}</p>
                  <p className="text-xs text-slate-500">Type: {attr.type}</p>
                </div>
                {mode !== "view" && (
                  <button className="text-slate-400 hover:text-rose-600">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {mode !== "view" && (
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-slate-300 bg-white py-2 text-sm font-medium text-slate-600 hover:border-slate-400 hover:bg-slate-50 mt-4">
              <Plus size={16} />
              Add New Attribute
            </button>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {mode !== "view" && (
        <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-200 pt-6">
          <button
            onClick={onClose}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
            {mode === "add" ? "Create Category" : "Save Changes"}
          </button>
        </div>
      )}
    </Sidepanel>
  );
}
