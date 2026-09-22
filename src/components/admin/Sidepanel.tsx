import React from "react";
import { X } from "lucide-react";

interface SidepanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Sidepanel({ isOpen, onClose, title, children }: SidepanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform transition-transform duration-300 ease-in-out">
          <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2 className="font-heading text-lg font-bold text-slate-900">{title}</h2>
              <button
                onClick={onClose}
                className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="relative flex-1 px-6 py-6 sm:px-6">
              {children}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
