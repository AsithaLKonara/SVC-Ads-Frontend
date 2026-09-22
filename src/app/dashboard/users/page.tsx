"use client";

import React, { useState, useEffect } from "react";
import { MoreHorizontal, Search, UserPlus, Trash2, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { User, userService } from "@/services/userService";
import UserSidepanel from "@/components/admin/UserSidepanel";

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Sidepanel state
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<"view" | "add" | "edit">("add");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Action menu state
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // RBAC Check
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    const parsed = JSON.parse(userData);
    if (parsed.role !== "ADMIN") {
      router.push("/dashboard");
      return;
    }

    fetchUsers();
  }, [router]);

  const handleAddUser = () => {
    setSelectedUser(null);
    setPanelMode("add");
    setIsPanelOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setPanelMode("edit");
    setIsPanelOpen(true);
    setOpenMenuId(null);
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await userService.deleteUser(id);
      fetchUsers(); // Refresh list
    } catch (err: any) {
      alert(err.message || "Failed to delete user");
    }
    setOpenMenuId(null);
  };

  const filteredUsers = users.filter((u) => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900">
            User Management
          </h1>
          <p className="text-sm text-slate-500">
            Manage admin users and internal staff accounts.
          </p>
        </div>
        <button 
          onClick={handleAddUser}
          className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-700 transition-colors"
        >
          <UserPlus size={16} />
          Add User
        </button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full sm:w-80 rounded-md border border-slate-300 bg-white py-1.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-500 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">User</th>
                <th scope="col" className="px-6 py-3 font-medium">Role</th>
                <th scope="col" className="px-6 py-3 font-medium">Created At</th>
                <th scope="col" className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs uppercase">
                          {user.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">{user.name}</span>
                          <span className="text-xs text-slate-500">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.role === 'ADMIN' ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                        className="text-slate-400 hover:text-slate-900 p-1 rounded-md hover:bg-slate-100"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                      
                      {openMenuId === user.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setOpenMenuId(null)}
                          />
                          <div className="absolute right-6 top-10 z-20 w-40 rounded-md border border-slate-200 bg-white shadow-lg outline-none overflow-hidden">
                            <div className="py-1">
                              <button
                                onClick={() => handleEditUser(user)}
                                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                              >
                                <Edit size={14} />
                                Edit Role
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <Trash2 size={14} />
                                Delete User
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <UserSidepanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        onSuccess={fetchUsers}
        mode={panelMode}
        user={selectedUser}
      />
    </div>
  );
}
