"use client";
import React, { useState } from "react";
import { X, Upload, ImageIcon, Loader2 } from "lucide-react";

interface TiptapImageModalProps {
  open: boolean;
  onClose: () => void;
  onInsert: (data: { url: string; alt: string; title: string }) => void;
}

export default function TiptapImageModal({
  open,
  onClose,
  onInsert,
}: TiptapImageModalProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    if (!title) {
      setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
    }
    setError(null);
  };

  const handleInsert = async () => {
    setError(null);
    let finalUrl = url.trim();

    if (activeTab === "upload") {
      if (!file) {
        setError("Please choose an image file to upload.");
        return;
      }
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.success && data.url) {
          finalUrl = data.url;
        } else {
          throw new Error(data.message || "Failed to upload image");
        }
      } catch (err: any) {
        setError(err.message || "Upload error");
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    } else {
      if (!finalUrl) {
        setError("Please enter a valid image URL.");
        return;
      }
    }

    onInsert({
      url: finalUrl,
      alt: alt.trim(),
      title: title.trim(),
    });

    // Reset and close
    setFile(null);
    setPreview("");
    setUrl("");
    setAlt("");
    setTitle("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
          <div>
            <h3 className="text-base font-semibold text-zinc-900">Insert Content Image</h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Add an image with separate title and alternative (alt) text
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-100 px-6 pt-3 gap-4">
          <button
            type="button"
            onClick={() => { setActiveTab("upload"); setError(null); }}
            className={`pb-2.5 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors ${
              activeTab === "upload"
                ? "border-zinc-900 text-zinc-900"
                : "border-transparent text-zinc-400 hover:text-zinc-600"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab("url"); setError(null); }}
            className={`pb-2.5 text-xs font-semibold tracking-wider uppercase border-b-2 transition-colors ${
              activeTab === "url"
                ? "border-zinc-900 text-zinc-900"
                : "border-transparent text-zinc-400 hover:text-zinc-600"
            }`}
          >
            Image URL
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs px-3 py-2 rounded-lg font-medium">
              {error}
            </div>
          )}

          {activeTab === "upload" ? (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                Choose Image
              </label>
              <div className="flex items-center gap-3">
                <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-zinc-200 hover:border-zinc-400 rounded-xl cursor-pointer bg-zinc-50/50 hover:bg-zinc-50 transition-colors">
                  <Upload size={16} className="text-zinc-500" />
                  <span className="text-xs font-medium text-zinc-700">
                    {file ? file.name : "Select an image file"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {preview && (
                  <div className="w-12 h-12 rounded-lg border border-zinc-200 overflow-hidden flex-shrink-0 bg-zinc-100">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                Image Web URL
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
              />
            </div>
          )}

          {/* Separate Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
              Image Title <span className="normal-case tracking-normal font-normal text-zinc-400">(Tooltip / Caption)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Translucent Stretch Ceiling with Backlighting"
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
            />
          </div>

          {/* Separate Alt */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
              Alternative Text (Alt) <span className="normal-case tracking-normal font-normal text-zinc-400">(For screen readers &amp; SEO)</span>
            </label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="e.g. Detailed view of installed white stretch ceiling membrane in luxury showroom"
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 transition-colors"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-zinc-100 bg-zinc-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleInsert}
            disabled={isUploading}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-zinc-900 hover:bg-black rounded-lg transition-colors disabled:opacity-50"
          >
            {isUploading && <Loader2 size={13} className="animate-spin" />}
            Insert Image
          </button>
        </div>
      </div>
    </div>
  );
}
