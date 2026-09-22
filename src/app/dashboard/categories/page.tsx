"use client";

import React, { useEffect, useState } from "react";
import { MoreHorizontal, Plus, Search, ChevronRight, Loader2, Edit, Trash2 } from "lucide-react";
import { categoryService, Category } from "@/services/categoryService";
import CategorySidepanel from "@/components/admin/CategorySidepanel";
import * as LucideIcons from "lucide-react";

// Helper to render dynamic icon
const DynamicIcon = ({ name, size = 18 }: { name: string | null; size?: number }) => {
  if (!name) return <LucideIcons.Folder size={size} />;
  
  // @ts-ignore
  const IconComponent = LucideIcons[name];
  if (!IconComponent) return <LucideIcons.Folder size={size} />;
  
  return <IconComponent size={size} />;
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sidepanel state
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<"view" | "add" | "edit">("add");
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(undefined);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const data = await categoryService.getAdminCategories();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    
    try {
      await categoryService.deleteCategory(id);
      fetchCategories();
    } catch (error: any) {
      alert(error.message || "Failed to delete category");
    }
  };

  const openAddPanel = () => {
    setSelectedCategory(undefined);
    setPanelMode("add");
    setIsPanelOpen(true);
  };

  const openEditPanel = (category: Category) => {
    setSelectedCategory(category);
    setPanelMode("edit");
    setIsPanelOpen(true);
  };

  const filteredCategories = categories.filter((cat) => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <button 
          onClick={openAddPanel}
          className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 transition-colors"
        >
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
                <th scope="col" className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin text-brand-500" />
                    <p className="mt-2">Loading categories...</p>
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No categories found.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className={`hover:bg-slate-50 transition-colors ${!category.isActive ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 font-medium text-slate-900">
                        <div className="h-8 w-8 shrink-0 rounded-md bg-brand-50 text-brand-600 flex items-center justify-center">
                          <DynamicIcon name={category.icon} size={16} />
                        </div>
                        {category.name}
                        {!category.isActive && (
                          <span className="ml-2 inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                            Inactive
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">/{category.slug}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                        {category._count?.children || 0} Subcategories
                        <ChevronRight size={12} className="text-slate-400" />
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEditPanel(category)}
                          className="text-slate-400 hover:text-brand-600 p-1 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)}
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

      <CategorySidepanel 
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        mode={panelMode}
        category={selectedCategory}
        onSuccess={() => {
          setIsPanelOpen(false);
          fetchCategories();
        }}
        topLevelCategories={categories.filter(c => c.parentId === null)}
      />
    </div>
  );
}
