"use client";

import React, { useEffect, useState, useMemo } from "react";
import Sidepanel from "./Sidepanel";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/services/categoryService";
import { adService, Ad } from "@/services/adService";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

import { getDistricts, getCitiesByDistrictName } from "sri-lanka-postal-locations";

const districtOptions = getDistricts()
  .map(d => ({ value: d.name_en, label: d.name_en }))
  .sort((a, b) => a.label.localeCompare(b.label));

const adSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be positive"),
  condition: z.string().optional(),
  images: z.array(z.string()).max(5, "Maximum 5 images allowed").optional(),
  category: z.object({ value: z.string(), label: z.string(), original: z.any().optional() }).nullable(),
  district: z.object({ value: z.string(), label: z.string() }).nullable(),
  city: z.object({ value: z.string(), label: z.string() }).nullable(),
  isFeatured: z.boolean(),
  contactPhone: z.string().optional(),
  attributes: z.record(z.string(), z.any()).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
}).refine(data => data.category !== null, {
  message: "Category is required",
  path: ["category"]
}).refine(data => data.district !== null, {
  message: "District is required",
  path: ["district"]
}).refine(data => data.city !== null, {
  message: "City is required",
  path: ["city"]
});

type AdFormData = z.infer<typeof adSchema>;

interface AdSidepanelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "add" | "edit";
  ad?: Ad;
  categories?: Category[]; // Passed from parent
  onSuccess?: () => void;
}

export default function AdSidepanel({ 
  isOpen, 
  onClose, 
  mode, 
  ad, 
  categories = [],
  onSuccess 
}: AdSidepanelProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const title = mode === "add" ? "Post New Ad" : mode === "edit" ? "Edit Ad" : "Ad Details";

  const { control, register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<AdFormData>({
    resolver: zodResolver(adSchema),
    defaultValues: {
      status: "ACTIVE",
      category: null,
      district: null,
      city: null,
      isFeatured: false,
      contactPhone: "",
      attributes: {},
    }
  });

  const selectedDistrict = watch("district");

  const cityOptions = useMemo(() => {
    if (!selectedDistrict) return [];
    const cities = getCitiesByDistrictName(selectedDistrict.value) || [];
    return cities
      .map((c: any) => ({ value: c.name_en, label: c.name_en }))
      .sort((a: any, b: any) => a.label.localeCompare(b.label));
  }, [selectedDistrict]);

  // Removed useEffect for city clearing. Handled explicitly in District onChange.

  const categoryOptions = useMemo(() => {
    return categories.map(cat => ({
      label: cat.name,
      options: cat.children && cat.children.length > 0 
        ? cat.children.map(child => ({ value: child.id, label: child.name, original: child }))
        : [{ value: cat.id, label: cat.name, original: cat }]
    }));
  }, [categories]);

  const selectedCategory = watch("category") as any;
  const dynamicAttributes = useMemo(() => {
    if (!selectedCategory || !selectedCategory.original) return [];
    
    // The original category is stored in the option by our custom mapping above
    const cat = selectedCategory.original;
    let attrs = [];
    try {
      if (cat.attributes) {
        attrs = typeof cat.attributes === 'string' ? JSON.parse(cat.attributes) : cat.attributes;
      } else if (cat.parentId) {
        // If child has no attributes, try to inherit from parent
        const parent = categories.find(p => p.id === cat.parentId);
        if (parent && parent.attributes) {
          attrs = typeof parent.attributes === 'string' ? JSON.parse(parent.attributes) : parent.attributes;
        }
      }
    } catch(e) {}
    
    return Array.isArray(attrs) ? attrs : [];
  }, [selectedCategory, categories]);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && ad) {
        reset({
          title: ad.title,
          description: ad.description,
          price: ad.price,
          condition: ad.condition || "",
          images: ad.images || [],
          category: ad.category ? { value: ad.categoryId, label: ad.category.name, original: ad.category } : null,
          district: { value: ad.district, label: ad.district },
          city: { value: ad.city, label: ad.city },
          isFeatured: ad.isFeatured,
          contactPhone: ad.contactPhone || "",
          attributes: ad.attributes || {},
          status: ad.status,
        });
        setImagePreviews(ad.images || []);
      } else if (mode === "add") {
        reset({
          title: "",
          description: "",
          price: 0,
          condition: "",
          images: [],
          category: null,
          district: null,
          city: null,
          isFeatured: false,
          contactPhone: "",
          attributes: {},
          status: "ACTIVE",
        });
        setImagePreviews([]);
      }
      setApiError(null);
    }
  }, [isOpen, mode, ad, reset]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    if (imagePreviews.length + files.length > 5) {
      alert("Maximum 5 images allowed.");
      return;
    }

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImagePreviews(prev => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    // Clear input
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: AdFormData) => {
    if (mode === "view") return;
    
    setIsSubmitting(true);
    setApiError(null);
    
    try {
      const payload = {
        title: data.title,
        description: data.description,
        price: data.price,
        condition: data.condition || undefined,
        images: imagePreviews,
        categoryId: data.category!.value,
        district: data.district!.value,
        city: data.city!.value,
        isFeatured: data.isFeatured,
        contactPhone: data.contactPhone || undefined,
        attributes: data.attributes || undefined,
        status: data.status,
      };

      if (mode === "add") {
        await adService.createAd(payload);
      } else if (mode === "edit" && ad) {
        await adService.updateAd(ad.id, payload);
      }
      
      if (onSuccess) onSuccess();
    } catch (error: any) {
      setApiError(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const customSelectStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderColor: state.isFocused ? '#2563eb' : '#cbd5e1',
      boxShadow: state.isFocused ? '0 0 0 1px #2563eb' : 'none',
      '&:hover': { borderColor: '#94a3b8' },
      borderRadius: '0.375rem',
      padding: '2px',
    }),
    singleValue: (base: any) => ({
      ...base,
      color: '#0f172a',
    }),
    input: (base: any) => ({
      ...base,
      color: '#0f172a',
    }),
    option: (base: any, state: any) => ({
      ...base,
      color: '#0f172a',
      backgroundColor: state.isFocused ? '#e2e8f0' : 'transparent',
      '&:active': {
        backgroundColor: '#cbd5e1'
      }
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 50,
      backgroundColor: '#ffffff'
    })
  };

  return (
    <Sidepanel isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
        <div className="flex-1 pb-4 overflow-y-auto">
          {apiError && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {apiError}
            </div>
          )}

          <div className="space-y-5 px-1">
            
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Title *</label>
              <input
                type="text"
                disabled={mode === "view" || isSubmitting}
                {...register("title")}
                className={`block w-full rounded-md border ${errors.title ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-500'} px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500`}
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Category *</label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={categoryOptions}
                    isClearable
                    isDisabled={mode === "view" || isSubmitting}
                    placeholder="Select category..."
                    styles={customSelectStyles}
                  />
                )}
              />
              {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Price (LKR) *</label>
                <input
                  type="number"
                  disabled={mode === "view" || isSubmitting}
                  {...register("price", { valueAsNumber: true })}
                  className={`block w-full rounded-md border ${errors.price ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-500'} px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500`}
                />
                {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Condition</label>
                <select
                  disabled={mode === "view" || isSubmitting}
                  {...register("condition")}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
                >
                  <option value="">N/A</option>
                  <option value="New">New</option>
                  <option value="Like New">Like New</option>
                  <option value="Used">Used</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">District *</label>
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onChange={(val) => {
                        field.onChange(val);
                        setValue("city", null);
                      }}
                      options={districtOptions}
                      isClearable
                      isDisabled={mode === "view" || isSubmitting}
                      placeholder="Select district..."
                      styles={customSelectStyles}
                    />
                  )}
                />
                {errors.district && <p className="mt-1 text-xs text-red-500">{errors.district.message}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">City *</label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                  <CreatableSelect
                    {...field}
                    options={cityOptions}
                    isClearable
                    isDisabled={!selectedDistrict || mode === "view" || isSubmitting}
                    placeholder="Select or type city..."
                    styles={customSelectStyles}
                    formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
                  />
                  )}
                />
                {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Description *</label>
              <textarea
                disabled={mode === "view" || isSubmitting}
                rows={4}
                {...register("description")}
                className={`block w-full rounded-md border ${errors.description ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-500'} px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500`}
              />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Images (Max 5)</label>
              
              <div className="grid grid-cols-5 gap-2 mb-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-slate-100 border border-slate-200 group">
                    <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    </button>
                  </div>
                ))}
                
                {imagePreviews.length < 5 && (
                  <label className="aspect-square rounded-md border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-50 hover:border-brand-400 hover:text-brand-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                    <span className="text-[10px] font-medium text-center px-1">Upload</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple
                      className="hidden" 
                      onChange={handleImageUpload}
                      disabled={mode === "view" || isSubmitting}
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-slate-500">Currently converting to Base64 (Local DB Storage). Images size will affect payload.</p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
              <select
                disabled={mode === "view" || isSubmitting}
                {...register("status")}
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
              >
                <option value="ACTIVE">Active (Visible)</option>
                <option value="INACTIVE">Inactive (Hidden)</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Contact Phone</label>
              <input
                type="tel"
                disabled={mode === "view" || isSubmitting}
                {...register("contactPhone")}
                placeholder="e.g. 077 123 4567"
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>

            {dynamicAttributes.length > 0 && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-4">
                <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2">Category Specific Details</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {dynamicAttributes.map((attr: any, index: number) => {
                    const fieldName = `attributes.${attr.name}` as const;
                    
                    return (
                      <div key={index}>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                          {attr.name} {attr.required && "*"}
                        </label>
                        
                        {attr.type === "select" ? (
                          <select
                            disabled={mode === "view" || isSubmitting}
                            {...register(fieldName)}
                            required={attr.required}
                            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
                          >
                            <option value="">Select...</option>
                            {attr.options?.split(',').map((opt: string) => (
                              <option key={opt.trim()} value={opt.trim()}>{opt.trim()}</option>
                            ))}
                          </select>
                        ) : attr.type === "boolean" ? (
                          <div className="flex items-center gap-2 pt-2">
                            <input
                              type="checkbox"
                              disabled={mode === "view" || isSubmitting}
                              {...register(fieldName)}
                              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 disabled:opacity-50"
                            />
                            <span className="text-sm text-slate-600">Yes</span>
                          </div>
                        ) : (
                          <input
                            type={attr.type === "number" ? "number" : "text"}
                            disabled={mode === "view" || isSubmitting}
                            {...register(fieldName)}
                            required={attr.required}
                            className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isFeatured"
                disabled={mode === "view" || isSubmitting}
                {...register("isFeatured")}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 disabled:opacity-50"
              />
              <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700">
                Mark as Featured Ad
              </label>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        {mode !== "view" && (
          <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-50 min-w-[120px]"
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : mode === "add" ? "Post Ad" : "Save Changes"}
            </button>
          </div>
        )}
      </form>
    </Sidepanel>
  );
}
