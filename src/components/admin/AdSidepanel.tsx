"use client";

import React, { useEffect, useState, useMemo } from "react";
import Sidepanel from "./Sidepanel";
import { Loader2, Play, Image as ImageIcon, Video as VideoIcon } from "lucide-react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@/services/categoryService";
import { adService, Ad } from "@/services/adService";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { isVideoUrl } from "@/utils/media";

import { getDistricts, getCitiesByDistrictName } from "sri-lanka-postal-locations";

const districtOptions = getDistricts()
  .map(d => ({ value: d.name_en, label: d.name_en }))
  .sort((a, b) => a.label.localeCompare(b.label));

const adSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().refine((val) => {
    if (!val) return false;
    const stripped = val.replace(/<[^>]*>/g, '').trim();
    return stripped.length >= 10 || val.includes('<iframe') || val.includes('<img');
  }, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be positive"),
  condition: z.string().optional(),
  images: z.array(z.string()).max(10, "Maximum 10 media files allowed").optional(),
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

  const title = mode === "add" ? "Post New Property" : mode === "edit" ? "Edit Property" : "Property Details";

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
      images: [],
    }
  });

  useEffect(() => {
    setValue("images", imagePreviews);
  }, [imagePreviews, setValue]);

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
        let categoryOption = null;
        if (ad.categoryId) {
          const allCategories = categories.flatMap(c => c.children && c.children.length > 0 ? c.children : [c]);
          const found = allCategories.find(c => c.id === ad.categoryId);
          if (found) {
            categoryOption = { value: found.id, label: found.name, original: found };
          } else if (ad.category) {
            categoryOption = { value: ad.categoryId, label: ad.category.name, original: ad.category };
          }
        }

        reset({
          title: ad.title,
          description: ad.description,
          price: ad.price,
          condition: ad.condition || "",
          images: ad.images || [],
          category: categoryOption,
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

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    if (imagePreviews.length + files.length > 10) {
      alert("Maximum 10 media files (images/videos) allowed.");
      return;
    }

    Array.from(files).forEach(file => {
      // Validate file size: 30MB limit
      if (file.size > 30 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds 30MB size limit. Please choose a smaller video or embed via YouTube/Vimeo in the description.`);
        return;
      }

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

  const removeMedia = (index: number) => {
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
                placeholder="e.g. 15 Perches Commercial Land facing Galle Road, Panadura"
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
                  placeholder="e.g. 25000000"
                  {...register("price", { valueAsNumber: true })}
                  className={`block w-full rounded-md border ${errors.price ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-500'} px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500`}
                />
                {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Property / Land Status</label>
                <select
                  disabled={mode === "view" || isSubmitting}
                  {...register("condition")}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
                >
                  <option value="">Select status...</option>
                  <option value="Bare Land">Bare Land</option>
                  <option value="Ready to Build">Ready to Build</option>
                  <option value="Commercial Plot">Commercial Plot</option>
                  <option value="Agricultural / Estate">Agricultural / Estate</option>
                  <option value="Brand New">Brand New</option>
                  <option value="Renovated / Existing">Renovated / Existing</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Under Construction">Under Construction</option>
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
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value || ""}
                    onChange={field.onChange}
                    disabled={mode === "view" || isSubmitting}
                    placeholder="Describe the property or land in detail (e.g., extent, deed status, access roads, amenities)..."
                  />
                )}
              />
              {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
              <p className="mt-1 text-xs text-slate-500">
                Use the toolbar to structure your listing (headings, bullet points) or embed YouTube/Vimeo walk-through videos using the video button.
              </p>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">
                  Photos & Videos ({imagePreviews.length}/10)
                </label>
                <span className="text-xs text-slate-400">Images & MP4/WebM supported</span>
              </div>
              
              <div className="grid grid-cols-5 gap-2 mb-2">
                {imagePreviews.map((preview, index) => {
                  const isVideo = isVideoUrl(preview);
                  return (
                    <div key={index} className="relative aspect-square rounded-md overflow-hidden bg-slate-900 border border-slate-200 group">
                      {isVideo ? (
                        <div className="relative h-full w-full flex items-center justify-center bg-slate-900">
                          <video src={preview} className="h-full w-full object-cover" muted playsInline preload="metadata" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow">
                              <Play size={10} className="ml-0.5 fill-current" />
                            </div>
                          </div>
                          <span className="absolute bottom-1 left-1 bg-black/70 text-[8px] font-bold text-white px-1 py-0.5 rounded tracking-wide">
                            VIDEO
                          </span>
                        </div>
                      ) : (
                        <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                      )}
                      
                      {mode !== "view" && (
                        <button 
                          type="button"
                          onClick={() => removeMedia(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          title="Remove media"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                        </button>
                      )}
                    </div>
                  );
                })}
                
                {imagePreviews.length < 10 && mode !== "view" && (
                  <label className="aspect-square rounded-md border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-50 hover:border-brand-400 hover:text-brand-500 transition-colors">
                    <div className="flex items-center gap-1 mb-1">
                      <ImageIcon size={14} />
                      <VideoIcon size={14} />
                    </div>
                    <span className="text-[10px] font-medium text-center px-1">Upload</span>
                    <input 
                      type="file" 
                      accept="image/*,video/mp4,video/webm,video/quicktime,video/ogg" 
                      multiple
                      className="hidden" 
                      onChange={handleMediaUpload}
                      disabled={isSubmitting}
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-slate-500">
                You can upload property images and short videos (up to 30MB each).
              </p>
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
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : mode === "add" ? "Post Property" : "Save Changes"}
            </button>
          </div>
        )}
      </form>
    </Sidepanel>
  );
}
