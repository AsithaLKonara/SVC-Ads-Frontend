"use client";

import React, { useEffect, useRef } from "react";
import { X, Calendar, User, Mail, FileText } from "lucide-react";
import { format } from "date-fns";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
};

type Props = {
  message: Message | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function MessageSidepanel({ message, isOpen, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Lock body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !message) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity" />
      <div 
        ref={panelRef}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:w-[480px] overflow-y-auto"
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-900">Message Details</h2>
          <button 
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500 mb-1">Sender</p>
                <p className="text-slate-900 font-medium">{message.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500 mb-1">Email</p>
                <a href={`mailto:${message.email}`} className="text-brand-600 hover:underline">
                  {message.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500 mb-1">Received</p>
                <p className="text-slate-900">
                  {format(new Date(message.createdAt), "MMMM d, yyyy 'at' h:mm a")}
                </p>
              </div>
            </div>
          </div>

          <hr className="border-slate-200" />

          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-semibold uppercase text-slate-500 mb-2">Subject</h3>
              <p className="text-slate-900 font-semibold text-lg">
                {message.subject || <span className="italic text-slate-400">No subject provided</span>}
              </p>
            </div>
            
            <div>
              <h3 className="text-xs font-semibold uppercase text-slate-500 mb-2">Message</h3>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {message.message}
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-6">
            <a 
              href={`mailto:${message.email}?subject=Re: ${message.subject || 'Your inquiry'}`}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-brand-600 transition-all"
            >
              <Mail className="h-4 w-4" />
              Reply via Email
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
