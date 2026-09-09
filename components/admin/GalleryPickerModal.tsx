"use client";
import { useEffect, useState, useCallback } from "react";
import { X, Search, CheckCircle2, ImageOff, Loader2 } from "lucide-react";

interface GalleryImage {
  _id: string;
  url: string;
  title?: string;
  location?: string;
}

interface GalleryPickerModalProps {
  open: boolean;
  currentUrl?: string;
  onSelect: (url: string) => void;
  onClose: () => void;
}

export default function GalleryPickerModal({
  open,
  currentUrl,
  onSelect,
  onClose,
}: GalleryPickerModalProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filtered, setFiltered] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string>(currentUrl || "");

  // Fetch gallery images once when modal opens
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(null);
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => {
        if (d.success) {
          setImages(d.images);
          setFiltered(d.images);
        } else {
          setError(d.message || "Failed to load gallery");
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [open]);

  // Sync selected with parent's currentUrl whenever modal re-opens
  useEffect(() => {
    if (open) setSelected(currentUrl || "");
  }, [open, currentUrl]);

  // Filter by title/location
  useEffect(() => {
    if (!query.trim()) {
      setFiltered(images);
      return;
    }
    const q = query.toLowerCase();
    setFiltered(
      images.filter(
        (img) =>
          img.title?.toLowerCase().includes(q) ||
          img.location?.toLowerCase().includes(q)
      )
    );
  }, [query, images]);

  // Close on Escape
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );
  useEffect(() => {
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, handleKey]);

  if (!open) return null;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Pick from Gallery</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Select an image to use as cover photo</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            aria-label="Close gallery picker"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-zinc-100 flex-shrink-0">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by title or location…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-brand-vibrancy text-zinc-900 placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-zinc-400 gap-2">
              <Loader2 size={20} className="animate-spin" />
              <span className="text-sm">Loading gallery…</span>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-400 gap-2">
              <ImageOff size={32} />
              <p className="text-sm">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-400 gap-2">
              <ImageOff size={32} />
              <p className="text-sm">No images found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filtered.map((img) => {
                const isSelected = selected === img.url;
                return (
                  <button
                    key={img._id}
                    type="button"
                    onClick={() => setSelected(img.url)}
                    className={`relative group rounded-xl overflow-hidden border-2 transition-all duration-200 aspect-[4/3] bg-zinc-100 focus:outline-none
                      ${isSelected
                        ? "border-brand-vibrancy shadow-lg shadow-brand-vibrancy/20 scale-[1.02]"
                        : "border-transparent hover:border-zinc-300"
                      }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.title || "Gallery image"}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    {/* Title tooltip */}
                    {(img.title || img.location) && (
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        {img.title && (
                          <p className="text-white text-[10px] font-medium leading-tight truncate">{img.title}</p>
                        )}
                        {img.location && (
                          <p className="text-white/70 text-[9px] truncate">{img.location}</p>
                        )}
                      </div>
                    )}
                    {/* Selected checkmark */}
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-white rounded-full">
                        <CheckCircle2 size={20} className="text-brand-vibrancy" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer — selected preview + actions */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-zinc-200 bg-zinc-50 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            {selected ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected}
                  alt="Selected cover"
                  className="w-12 h-9 object-cover rounded-lg border border-zinc-200 flex-shrink-0"
                />
                <p className="text-xs text-zinc-600 truncate">Image selected</p>
              </>
            ) : (
              <p className="text-xs text-zinc-400">No image selected</p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selected}
              onClick={() => {
                onSelect(selected);
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-brand-vibrancy rounded-lg hover:bg-brand-vibrancy/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Use This Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
