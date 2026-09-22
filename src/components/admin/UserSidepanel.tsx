import React from "react";
import Sidepanel from "./Sidepanel";
import { User, Shield, Mail, Key } from "lucide-react";

interface UserSidepanelProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "add" | "edit";
  user?: any;
}

export default function UserSidepanel({ isOpen, onClose, mode, user }: UserSidepanelProps) {
  const title = mode === "add" ? "Add New User" : mode === "edit" ? "Edit User" : "User Details";

  return (
    <Sidepanel isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6">
        
        {/* Basic Info Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
            Account Information
          </h3>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <User size={16} />
              </div>
              <input
                type="text"
                disabled={mode === "view"}
                placeholder="e.g. John Doe"
                className="block w-full rounded-md border border-slate-300 py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email Address</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail size={16} />
              </div>
              <input
                type="email"
                disabled={mode === "view"}
                placeholder="e.g. john@gmail.com"
                className="block w-full rounded-md border border-slate-300 py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
          </div>

          {(mode === "add" || mode === "edit") && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Key size={16} />
                </div>
                <input
                  type="password"
                  placeholder={mode === "edit" ? "Leave blank to keep current password" : "Enter temporary password"}
                  className="block w-full rounded-md border border-slate-300 py-2 pl-10 pr-3 text-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Roles & Permissions Section */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
            Roles & Permissions
          </h3>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Role</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Shield size={16} />
              </div>
              <select
                disabled={mode === "view"}
                className="block w-full rounded-md border border-slate-300 py-2 pl-10 pr-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500 appearance-none bg-white"
              >
                <option value="moderator">Moderator (Can approve/reject ads)</option>
                <option value="admin">Super Admin (Full access)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
            Account Status
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">Active Account</p>
              <p className="text-xs text-slate-500">Allow this user to login to the admin panel.</p>
            </div>
            {/* Toggle switch placeholder */}
            <button
              disabled={mode === "view"}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${
                mode === "view" ? "bg-emerald-300 cursor-not-allowed" : "bg-emerald-500"
              }`}
            >
              <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
            </button>
          </div>
        </div>
        
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
              {mode === "add" ? "Create User" : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </Sidepanel>
  );
}
