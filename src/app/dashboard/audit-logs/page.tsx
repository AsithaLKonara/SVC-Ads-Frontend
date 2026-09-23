'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ShieldAlert, Search, ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  entityName: string | null;
  actorId: string | null;
  actorName: string | null;
  actorRole: string | null;
  metadata: Record<string, any> | null;
  ipAddress: string | null;
  createdAt: string;
}

interface ApiResponse {
  data: AuditLog[];
  total: number;
  page: number;
  totalPages: number;
}

const ACTION_COLORS: Record<string, string> = {
  AD_CREATED: 'bg-emerald-50 text-emerald-700',
  AD_UPDATED: 'bg-blue-50 text-blue-700',
  AD_DELETED: 'bg-rose-50 text-rose-700',
  AD_STATUS_CHANGED: 'bg-amber-50 text-amber-700',
  AUTH_LOGIN: 'bg-indigo-50 text-indigo-700',
  USER_CREATED: 'bg-emerald-50 text-emerald-700',
  USER_UPDATED: 'bg-blue-50 text-blue-700',
  USER_DELETED: 'bg-rose-50 text-rose-700',
  CATEGORY_CREATED: 'bg-purple-50 text-purple-700',
  CATEGORY_UPDATED: 'bg-purple-50 text-purple-700',
  CATEGORY_DELETED: 'bg-rose-50 text-rose-700',
};

const ENTITY_FILTERS = ['All', 'Ad', 'User', 'Category'];

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [entity, setEntity] = useState('All');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: String(page),
        limit: '25',
        ...(entity !== 'All' && { entity }),
        ...(search && { search }),
      });

      const res = await fetch(`http://localhost:5000/api/audit-logs?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to fetch');
      const data: ApiResponse = await res.json();

      setLogs(data.data);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Error fetching audit logs:', err);
    } finally {
      setLoading(false);
    }
  }, [page, entity, search]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const handleEntityFilter = (f: string) => {
    setEntity(f);
    setPage(1);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <ShieldAlert size={24} className="text-indigo-600" />
            Audit Logs
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Immutable record of all admin actions. Records are retained for 90 days and cannot be deleted.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-2 text-sm text-indigo-700">
          <Info size={16} className="shrink-0" />
          <span><strong>{total.toLocaleString()}</strong> records in the last 90 days</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Entity filter pills */}
        <div className="flex items-center gap-2 rounded-lg bg-slate-100 p-1">
          {ENTITY_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => handleEntityFilter(f)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                entity === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search by action, entity or actor..."
              className="block w-full sm:w-72 rounded-md border border-slate-300 bg-white py-1.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Search
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Timestamp</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                  <th className="px-6 py-3 font-medium">Entity</th>
                  <th className="px-6 py-3 font-medium">Record</th>
                  <th className="px-6 py-3 font-medium">Actor</th>
                  <th className="px-6 py-3 font-medium">IP Address</th>
                  <th className="px-6 py-3 font-medium text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                      No audit records found.
                    </td>
                  </tr>
                ) : (
                  logs.map(log => (
                    <React.Fragment key={log.id}>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="whitespace-nowrap px-6 py-3 text-slate-500 text-xs">
                          {formatDate(log.createdAt)}
                        </td>
                        <td className="px-6 py-3">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ACTION_COLORS[log.action] ?? 'bg-slate-100 text-slate-700'}`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-3 font-medium text-slate-700">{log.entity}</td>
                        <td className="px-6 py-3">
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-900 line-clamp-1">{log.entityName ?? '—'}</span>
                            {log.entityId && (
                              <span className="text-xs text-slate-400">#{log.entityId.substring(0, 8)}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-900">{log.actorName ?? 'System'}</span>
                            {log.actorRole && (
                              <span className="text-xs text-slate-400">{log.actorRole}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-3 text-slate-500 text-xs font-mono">{log.ipAddress ?? '—'}</td>
                        <td className="px-6 py-3 text-right">
                          {log.metadata && Object.keys(log.metadata).length > 0 && (
                            <button
                              onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                              className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                            >
                              {expandedId === log.id ? 'Hide' : 'View'}
                            </button>
                          )}
                        </td>
                      </tr>
                      {expandedId === log.id && log.metadata && (
                        <tr className="bg-indigo-50/50">
                          <td colSpan={7} className="px-6 py-3">
                            <div className="rounded-md bg-slate-900 p-3 text-xs text-slate-100 font-mono overflow-x-auto">
                              <pre>{JSON.stringify(log.metadata, null, 2)}</pre>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-3">
            <span className="text-sm text-slate-500">
              Page {page} of {totalPages} &mdash; {total.toLocaleString()} total records
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-md border border-slate-300 p-1.5 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-md border border-slate-300 p-1.5 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
