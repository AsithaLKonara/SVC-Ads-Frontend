"use client";

import React, { useEffect, useState, useMemo } from "react";
import Sidepanel from "./Sidepanel";
import { Plus, Trash2, Loader2, GripVertical, Settings } from "lucide-react";
import { z } from "zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryService, Category } from "@/services/categoryService";
import CreatableSelect from "react-select/creatable";

const attributeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["text", "number", "select", "boolean"]),
  options: z.string().optional(), // Comma separated for select
  required: z.boolean().optional(),
});

const categorySchema = z.object({
  parentCategory: z.object({ 
    value: z.string(), 
    label: z.string(), 
    __isNew__: z.boolean().optional() 
  }).nullable(),
  subCategory: z.object({ 
    value: z.string(), 
    label: z.string(), 
    __isNew__: z.boolean().optional() 
  }).nullable(),
  icon: z.string().optional(),
  slug: z.string().min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens"),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
  attributes: z.array(attributeSchema).optional(),
}).refine(data => {
  return data.parentCategory !== null;
}, {
  message: "Parent category is required",
  path: ["parentCategory"]
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategorySidepanelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "add" | "edit";
  category?: Category;
  topLevelCategories?: Category[];
  onSuccess?: () => void;
}

export default function CategorySidepanel({ 
  isOpen, 
  onClose, 
  mode, 
  category, 
  topLevelCategories = [],
  onSuccess 
}: CategorySidepanelProps) {
  const [activeTab, setActiveTab] = useState<"details" | "attributes">("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const title = mode === "add" ? "Add Taxonomy Node" : mode === "edit" ? "Edit Node" : "Category Details";

  const { control, register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      isActive: true,
      parentCategory: null,
      subCategory: null,
      attributes: [],
    }
  });

  const { fields: attrFields, append: attrAppend, remove: attrRemove } = useFieldArray({
    control,
    name: "attributes"
  });

  const parentValue = watch("parentCategory");
  const subValue = watch("subCategory");
  
  // Auto-generate slug based on parent and subcategory names in ADD mode
  useEffect(() => {
    if (mode === "add") {
      let parts = [];
      if (parentValue?.label) parts.push(parentValue.label);
      if (subValue?.label) parts.push(subValue.label);
      
      if (parts.length > 0) {
        const generatedSlug = parts.join("-")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
        setValue("slug", generatedSlug, { shouldValidate: !!generatedSlug });
      } else {
        setValue("slug", "");
      }
    }
  }, [parentValue?.label, subValue?.label, mode, setValue]);

  // Options for react-select
  const parentOptions = useMemo(() => {
    return topLevelCategories.map(cat => ({
      value: cat.id,
      label: cat.name
    }));
  }, [topLevelCategories]);

  const subOptions = useMemo(() => {
    if (!parentValue || parentValue.__isNew__) return [];
    const parentCat = topLevelCategories.find(c => c.id === parentValue.value);
    if (!parentCat || !parentCat.children) return [];
    
    return parentCat.children.map(child => ({
      value: child.id,
      label: child.name
    }));
  }, [parentValue, topLevelCategories]);

  useEffect(() => {
    if (isOpen) {
      if (mode === "edit" && category) {
        let parentOpt = null;
        let subOpt = null;

        if (category.parentId) {
          // It's a subcategory
          const parent = topLevelCategories.find(c => c.id === category.parentId);
          if (parent) {
            parentOpt = { value: parent.id, label: parent.name };
          }
          subOpt = { value: category.id, label: category.name };
        } else {
          // It's a top-level category
          parentOpt = { value: category.id, label: category.name };
        }

        let parsedAttrs = [];
        try {
          if (category.attributes) {
            parsedAttrs = typeof category.attributes === 'string' ? JSON.parse(category.attributes) : category.attributes;
          }
        } catch(e) {}

        reset({
          parentCategory: parentOpt,
          subCategory: subOpt,
          slug: category.slug,
          description: category.description || "",
          icon: category.icon || "",
          isActive: category.isActive,
          attributes: Array.isArray(parsedAttrs) ? parsedAttrs : [],
        });
      } else if (mode === "add") {
        reset({
          parentCategory: null,
          subCategory: null,
          slug: "",
          description: "",
          icon: "",
          isActive: true,
          attributes: [],
        });
      }
      setApiError(null);
      setActiveTab("details");
    }
  }, [isOpen, mode, category, reset, topLevelCategories]);

  const onSubmit = async (data: CategoryFormData) => {
    if (mode === "view") return;
    
    setIsSubmitting(true);
    setApiError(null);
    
    try {
      if (mode === "add") {
        let parentId = data.parentCategory?.value;

        // 1. Create parent if it is new
        if (data.parentCategory?.__isNew__) {
          const newParent = await categoryService.createCategory({
            name: data.parentCategory.label,
            slug: data.parentCategory.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
            isActive: true, // Auto-active for new intermediate parents
          });
          parentId = newParent.id;
        }

        // 2. Create subcategory if provided
        if (data.subCategory) {
          if (data.subCategory.__isNew__) {
            await categoryService.createCategory({
              name: data.subCategory.label,
              slug: data.slug,
              description: data.description || null,
              icon: data.icon || null,
              parentId: parentId,
              isActive: data.isActive ?? true,
              attributes: data.attributes?.length ? data.attributes : null,
            });
          } else {
            // They selected an existing subcategory but are in Add mode.
            // This is an edge case. We'll treat it as updating the existing subcategory.
            await categoryService.updateCategory(data.subCategory.value, {
              slug: data.slug,
              description: data.description || null,
              icon: data.icon || null,
              isActive: data.isActive ?? true,
              attributes: data.attributes?.length ? data.attributes : null,
            });
          }
        } else {
          // 3. No subcategory. We are applying details to the Parent category.
          // If we just created the parent, we update it with the extra details.
          // If we selected an existing parent, we update it.
          if (parentId) {
             await categoryService.updateCategory(parentId, {
                slug: data.slug,
                description: data.description || null,
                icon: data.icon || null,
                isActive: data.isActive ?? true,
                attributes: data.attributes?.length ? data.attributes : null,
             });
          }
        }
      } else if (mode === "edit" && category) {
        // In edit mode, we just update the specific category we opened
        await categoryService.updateCategory(category.id, {
          name: category.parentId ? data.subCategory?.label : data.parentCategory?.label,
          slug: data.slug,
          description: data.description || null,
          icon: data.icon || null,
          isActive: data.isActive ?? true,
          attributes: data.attributes?.length ? data.attributes : null,
        });
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
      <div className="mb-6 flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("details")}
          type="button"
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
          type="button"
          className={`pb-3 text-sm font-medium ${
            activeTab === "attributes"
              ? "border-b-2 border-brand-500 text-brand-600"
              : "text-slate-500 hover:text-slate-700"
          } px-4`}
        >
          Dynamic Attributes
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
        <div className="flex-1 pb-4">
          {apiError && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
              {apiError}
            </div>
          )}

          {activeTab === "details" && (
            <div className="space-y-5">
              
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-4">
                <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2">Hierarchy Mapping</h3>
                
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Top-Level Category *</label>
                  <Controller
                    name="parentCategory"
                    control={control}
                    render={({ field }) => (
                      <CreatableSelect
                        {...field}
                        options={parentOptions}
                        isClearable
                        isDisabled={mode === "view" || (mode === "edit" && !!category?.parentId) || isSubmitting}
                        placeholder="Select or type to create new..."
                        styles={customSelectStyles}
                        formatCreateLabel={(val) => `+ Create "${val}"`}
                      />
                    )}
                  />
                  {errors.parentCategory && <p className="mt-1 text-xs text-red-500">{errors.parentCategory.message}</p>}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Subcategory (Optional)</label>
                  <Controller
                    name="subCategory"
                    control={control}
                    render={({ field }) => (
                      <CreatableSelect
                        {...field}
                        options={subOptions}
                        isClearable
                        isDisabled={!parentValue || mode === "view" || (mode === "edit" && !category?.parentId) || isSubmitting}
                        placeholder="Select or type to create new..."
                        styles={customSelectStyles}
                        formatCreateLabel={(val) => `+ Create "${val}"`}
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Slug *</label>
                <input
                  type="text"
                  disabled={mode === "view" || isSubmitting}
                  placeholder="e.g. vehicles-cars"
                  {...register("slug")}
                  className={`block w-full rounded-md border ${errors.slug ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-500'} px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 disabled:bg-slate-50 disabled:text-slate-500`}
                />
                <p className="mt-1 text-xs text-slate-500">Auto-generated from taxonomy, but can be manually overridden.</p>
                {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Icon</label>
                <select
                  disabled={mode === "view" || isSubmitting}
                  {...register("icon")}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
                >
                  <option value="">None</option>
                  <option value="Car">Car / Vehicles</option>
                  <option value="Home">Home / Real Estate</option>
                  <option value="Building">Building / Commercial</option>
                  <option value="Building2">Building / Apartment</option>
                  <option value="Warehouse">Warehouse / Storage</option>
                  <option value="Store">Store / Retail Space</option>
                  <option value="Factory">Factory / Industrial</option>
                  <option value="Map">Map / Land</option>
                  <option value="MapPin">Map Pin / Location</option>
                  <option value="LandPlot">Land Plot / Bare Land</option>
                  <option value="Trees">Trees / Agriculture</option>
                  <option value="TreePine">Pine Tree / Estate</option>
                  <option value="Key">Key / Rental</option>
                  <option value="Smartphone">Smartphone / Mobile</option>
                  <option value="Laptop">Laptop / Computers</option>
                  <option value="Wrench">Wrench / Services</option>
                  <option value="Briefcase">Briefcase / Jobs</option>
                  <option value="Sofa">Sofa / Furniture</option>
                  <option value="Shirt">Shirt / Fashion</option>
                  <option value="Bike">Bike / Motorcycles</option>
                  <option value="Tv">TV / Electronics</option>
                  <option value="Watch">Watch / Accessories</option>
                  <option value="ShoppingBag">Shopping Bag / Retail</option>
                  <option value="Music">Music / Instruments</option>
                  <option value="Book">Book / Education</option>
                  <option value="Camera">Camera / Photography</option>
                  <option value="Heart">Heart / Health & Beauty</option>
                  <option value="Monitor">Monitor / Tech</option>
                  <option value="Truck">Truck / Commercial</option>
                  <option value="Tent">Tent / Outdoors</option>
                  <option value="Dumbbell">Dumbbell / Sports</option>
                  <option value="Cat">Cat / Pets</option>
                  <option value="Dog">Dog / Pets</option>
                  <option value="Package">Package / General</option>
                  <option value="Folder">Folder / Misc</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  disabled={mode === "view" || isSubmitting}
                  placeholder="Optional description"
                  rows={3}
                  {...register("description")}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  disabled={mode === "view" || isSubmitting}
                  {...register("isActive")}
                  className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500 disabled:opacity-50"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-slate-700">
                  Active (Visible on Storefront)
                </label>
              </div>
            </div>
          )}

          {activeTab === "attributes" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <p className="text-sm text-slate-500">
                   Define custom fields required when posting ads in this specific node.
                 </p>
                 <button 
                   type="button" 
                   onClick={() => attrAppend({ name: "", type: "text", required: false })}
                   className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-2 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-100"
                 >
                   <Plus size={14} /> Add Field
                 </button>
              </div>

              {attrFields.length === 0 ? (
                <div className="rounded-md border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                  No dynamic attributes defined.
                </div>
              ) : (
                <div className="space-y-3">
                  {attrFields.map((field, index) => (
                    <div key={field.id} className="relative rounded-md border border-slate-200 bg-white p-3 shadow-sm group">
                      <div className="grid grid-cols-12 gap-3 items-start">
                        <div className="col-span-1 pt-2 cursor-move text-slate-300 hover:text-slate-500">
                           <GripVertical size={16} />
                        </div>
                        <div className="col-span-4">
                           <input 
                             placeholder="Field Name (e.g. Mileage)" 
                             {...register(`attributes.${index}.name` as const)}
                             className="block w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm text-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                           />
                        </div>
                        <div className="col-span-3">
                           <select 
                             {...register(`attributes.${index}.type` as const)}
                             className="block w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm text-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                           >
                             <option value="text">Text</option>
                             <option value="number">Number</option>
                             <option value="select">Dropdown</option>
                             <option value="boolean">Checkbox</option>
                           </select>
                        </div>
                        <div className="col-span-3 flex items-center gap-2 pt-1.5">
                           <input type="checkbox" {...register(`attributes.${index}.required` as const)} id={`req-${index}`} />
                           <label htmlFor={`req-${index}`} className="text-xs text-slate-600">Required</label>
                        </div>
                        <div className="col-span-1 text-right pt-1">
                           <button type="button" onClick={() => attrRemove(index)} className="text-slate-400 hover:text-red-500">
                             <Trash2 size={16} />
                           </button>
                        </div>
                      </div>
                      
                      {/* Conditional options input if 'select' type */}
                      {watch(`attributes.${index}.type`) === "select" && (
                         <div className="mt-3 pl-11 pr-8">
                            <Controller
                              control={control}
                              name={`attributes.${index}.options` as const}
                              render={({ field: { onChange, value } }) => {
                                const selectValues = value 
                                  ? value.split(',').filter(Boolean).map(v => ({ label: v.trim(), value: v.trim() })) 
                                  : [];
                                
                                return (
                                  <CreatableSelect
                                    isMulti
                                    isClearable
                                    placeholder="Type an option and press Enter..."
                                    value={selectValues}
                                    onChange={(newVals) => {
                                      onChange(newVals ? newVals.map(v => v.value).join(',') : '');
                                    }}
                                    styles={{
                                      control: (base: any, state: any) => ({
                                        ...base,
                                        borderColor: state.isFocused ? '#2563eb' : '#cbd5e1',
                                        boxShadow: state.isFocused ? '0 0 0 1px #2563eb' : 'none',
                                        '&:hover': { borderColor: '#94a3b8' },
                                        borderRadius: '0.375rem',
                                        padding: '0px',
                                        minHeight: '32px',
                                        backgroundColor: '#f8fafc',
                                        fontSize: '12px'
                                      }),
                                      multiValue: (base: any) => ({
                                        ...base,
                                        backgroundColor: '#e0e7ff',
                                        borderRadius: '4px',
                                      }),
                                      multiValueLabel: (base: any) => ({
                                        ...base,
                                        color: '#3730a3',
                                        fontSize: '12px'
                                      }),
                                      multiValueRemove: (base: any) => ({
                                        ...base,
                                        color: '#3730a3',
                                        ':hover': {
                                          backgroundColor: '#c7d2fe',
                                          color: '#312e81',
                                        },
                                      }),
                                      menu: (base: any) => ({
                                        ...base,
                                        zIndex: 50,
                                        fontSize: '12px'
                                      }),
                                      option: (base: any, state: any) => ({
                                        ...base,
                                        color: '#0f172a',
                                        backgroundColor: state.isFocused ? '#e2e8f0' : 'transparent',
                                      }),
                                    }}
                                    formatCreateLabel={(val) => `Add "${val}"`}
                                  />
                                );
                              }}
                            />
                         </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
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
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : mode === "add" ? "Save Taxonomy Node" : "Save Changes"}
            </button>
          </div>
        )}
      </form>
    </Sidepanel>
  );
}
