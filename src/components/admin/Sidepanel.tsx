"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

interface SidepanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Sidepanel({
  isOpen,
  onClose,
  title,
  children,
}: SidepanelProps) {
  // Prevent background page scrolling while panel is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  return (
    <div
      className={`
        fixed
        inset-0
        z-[100]
        overflow-hidden
        ${isOpen ? "pointer-events-auto" : "pointer-events-none"}
      `}
      aria-hidden={!isOpen}
    >
      {/* =========================================================
          BACKDROP
          ========================================================= */}

      <div
        className={`
          absolute
          inset-0
          bg-slate-900/50
          backdrop-blur-sm
          transition-opacity
          duration-300
          ease-in-out
          ${isOpen ? "opacity-100" : "opacity-0"}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* =========================================================
          PANEL CONTAINER
          ========================================================= */}

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div
          className="w-screen max-w-2xl transform transition-transform duration-300 ease-in-out"
          style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sidepanel-title"
        >
          <div className="flex h-full flex-col overflow-hidden bg-white shadow-2xl">
            {/* ===================================================
                HEADER
                =================================================== */}

            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4">
              <h2
                id="sidepanel-title"
                className="font-heading text-lg font-bold text-slate-900"
              >
                {title}
              </h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* ===================================================
                CONTENT
                =================================================== */}

            <div className="relative flex-1 overflow-y-auto px-6 py-6">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
