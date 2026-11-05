"use client";

import React, { useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

import { toEmbedUrl } from "@/utils/richText";

// Helper to normalize video URLs to embed format for YouTube & Vimeo
export function formatVideoEmbedUrl(url: string): string {
  if (!url) return url;
  const embed = toEmbedUrl(url);
  return embed || url.trim();
}


interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill-new");
    return function QuillComponent({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  {
    ssr: false,
    loading: () => (
      <div className="h-44 w-full animate-pulse rounded-md border border-slate-200 bg-slate-50 p-4 text-xs text-slate-400">
        Loading editor...
      </div>
    ),
  }
);

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write description here...",
  disabled = false,
  className = "",
}: RichTextEditorProps) {
  // Modules configuration with custom video handler
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote"],
          ["link", "video"],
          ["clean"],
        ],
        handlers: {
          video: function (this: any) {
            const quill = this.quill;
            const inputUrl = prompt(
              "Enter YouTube, Vimeo, or video embed URL:\n(e.g., https://www.youtube.com/watch?v=...)"
            );
            if (inputUrl) {
              const embedUrl = formatVideoEmbedUrl(inputUrl);
              const range = quill.getSelection(true);
              quill.insertEmbed(range.index, "video", embedUrl);
              quill.setSelection(range.index + 1);
            }
          },
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "blockquote",
    "link",
    "video",
  ];

  const quillRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && quillRef.current) {
      const editor = quillRef.current.getEditor ? quillRef.current.getEditor() : quillRef.current;
      (window as any).__quillEditor = editor;
    }
  });

  const handleChange = (content: string) => {
    if (content === "<p><br></p>" || content === "<p></p>") {
      onChange("");
    } else {
      onChange(content);
    }
  };

  return (
    <div
      className={`rich-text-editor-wrapper rounded-md border border-slate-300 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 bg-white transition-colors ${
        disabled ? "opacity-60 pointer-events-none bg-slate-50" : ""
      } ${className}`}
    >
      <ReactQuill
        forwardedRef={quillRef}
        theme="snow"
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={disabled}
        modules={modules}
        formats={formats}
      />
      <style jsx global>{`
        .rich-text-editor-wrapper .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid #e2e8f0;
          background-color: #f8fafc;
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          padding: 8px;
        }
        .rich-text-editor-wrapper .ql-container.ql-snow {
          border: none;
          min-height: 140px;
          max-height: 320px;
          overflow-y: auto;
          font-family: inherit;
          font-size: 0.875rem;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
        }
        .rich-text-editor-wrapper .ql-editor {
          min-height: 140px;
          color: #0f172a;
          line-height: 1.6;
        }
        .rich-text-editor-wrapper .ql-editor.ql-blank::before {
          color: #94a3b8;
          font-style: normal;
        }
        .rich-text-editor-wrapper .ql-snow .ql-stroke {
          stroke: #475569;
        }
        .rich-text-editor-wrapper .ql-snow .ql-fill {
          fill: #475569;
        }
        .rich-text-editor-wrapper .ql-snow .ql-picker {
          color: #475569;
        }
        .rich-text-editor-wrapper .ql-editor iframe.ql-video {
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: 0.5rem;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
