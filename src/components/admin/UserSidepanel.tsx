import React, { useState, useEffect } from "react";
import Sidepanel from "./Sidepanel";
import { User as UserIcon, Mail, Key, Shield, Eye, EyeOff } from "lucide-react";
import { User, userService } from "@/services/userService";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long.").optional(),
  role: z.enum(["ADMIN", "STAFF"]),
});

interface UserSidepanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode: "view" | "add" | "edit";
  user?: User | null;
}

export default function UserSidepanel({ isOpen, onClose, onSuccess, mode, user }: UserSidepanelProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"ADMIN" | "STAFF">("STAFF");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const title = mode === "add" ? "Add New User" : mode === "edit" ? "Edit User Role" : "User Details";

  useEffect(() => {
    if (isOpen) {
      if (user && mode !== "add") {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
        setPassword("");
      } else {
        setName("");
        setEmail("");
        setPassword("");
        setRole("STAFF");
      }
      setError("");
      setShowPassword(false);
    }
  }, [isOpen, user, mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Zod validation
    const payload = mode === "add" 
      ? { name, email, password, role }
      : { name, email, role }; // Password not required for edit role
      
    const result = userSchema.safeParse(payload);
    if (!result.success) {
      setError(result.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      if (mode === "edit" && user) {
        await userService.updateUserRole(user.id, role);
      } else if (mode === "add") {
        await userService.createUser({ name, email, password, role });
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sidepanel isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}
        
        {/* Basic Info Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-200 pb-2">
            Account Information
          </h3>
          
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <UserIcon size={16} />
              </div>
              <input
                type="text"
                disabled={mode !== "add"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="block w-full rounded-md border border-slate-300 py-2 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
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
                disabled={mode !== "add"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john@gmail.com"
                className="block w-full rounded-md border border-slate-300 py-2 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500"
              />
            </div>
          </div>

          {mode === "add" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Key size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter temporary password"
                  className="block w-full rounded-md border border-slate-300 py-2 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
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
                value={role}
                onChange={(e) => setRole(e.target.value as "ADMIN" | "STAFF")}
                className="block w-full rounded-md border border-slate-300 py-2 pl-10 pr-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:bg-slate-50 disabled:text-slate-500 appearance-none bg-white"
              >
                <option value="STAFF">STAFF (Can approve/reject ads)</option>
                <option value="ADMIN">ADMIN (Full access)</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        {mode !== "view" && (
          <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-70"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-70"
            >
              {loading ? "Saving..." : mode === "add" ? "Create User" : "Save Changes"}
            </button>
          </div>
        )}
      </form>
    </Sidepanel>
  );
}
