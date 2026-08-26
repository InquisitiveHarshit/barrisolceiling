"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Upload, Loader2, Image as ImageIcon, Trash2, Pencil, Check, X } from "lucide-react";
import Image from "next/image";

interface GalleryImg {
  _id: string;
  url: string;
  title?: string;
  location?: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImg[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState({ title: "", location: "" });
  const [savingId, setSavingId] = useState<string | null>(null);
  const [blackAndWhite, setBlackAndWhite] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) setImages(data.images);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyGrayscale = (url: string) =>
    url.replace("/upload/", "/upload/e_grayscale/");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", file.name.replace(/\.[^/.]+$/, ""));
    formData.append("blackAndWhite", String(blackAndWhite));

    setIsUploading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        const image = data.image;
        if (blackAndWhite) image.url = applyGrayscale(image.url);
        setImages((prev) => [image, ...prev]);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (img: GalleryImg) => {
    setEditingId(img._id);
    setEditDraft({ title: img.title || "", location: img.location || "" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDraft({ title: "", location: "" });
  };

  const saveEdit = async (id: string) => {
    setSavingId(id);
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch("/api/gallery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, title: editDraft.title, location: editDraft.location }),
      });
      const data = await res.json();
      if (data.success) {
        setImages((prev) =>
          prev.map((img) =>
            img._id === id ? { ...img, title: editDraft.title, location: editDraft.location } : img
          )
        );
        setEditingId(null);
      }
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-zinc-900">Gallery</h2>
          <p className="text-sm text-zinc-500 mt-1">Manage your image gallery assets. Hover an image to edit its label.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* B&W Toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <div
              onClick={() => setBlackAndWhite((v) => !v)}
              className={`relative w-9 h-5 rounded-full transition-colors ${blackAndWhite ? "bg-zinc-900" : "bg-zinc-200"}`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${blackAndWhite ? "translate-x-4" : "translate-x-0"}`}
              />
            </div>
            <span className="text-sm font-medium text-zinc-700">
              {blackAndWhite ? "B&W" : "Colour"}
            </span>
          </label>

          <label className="relative flex items-center justify-center gap-2 px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors">
            {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {isUploading ? "Uploading..." : "Upload Image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={isUploading} />
          </label>
        </div>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed border-zinc-300 rounded-2xl">
          <ImageIcon className="w-10 h-10 mx-auto text-zinc-300 mb-4" />
          <p className="text-zinc-500 font-medium text-sm">No images yet</p>
          <p className="text-zinc-400 text-xs mt-1">Upload your first image to the gallery</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img._id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
              className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100 group border border-zinc-200"
            >
              <Image
                src={img.url}
                alt={img.title || "Gallery image"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                {/* Top: action buttons */}
                <div className="flex justify-end gap-1.5">
                  <button
                    onClick={() => startEdit(img)}
                    className="bg-white/20 hover:bg-white/40 text-white p-1.5 rounded-lg transition-colors backdrop-blur-sm"
                    title="Edit label"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(img._id)}
                    disabled={deletingId === img._id}
                    className="bg-red-500/80 hover:bg-red-600 text-white p-1.5 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete image"
                  >
                    {deletingId === img._id
                      ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Bottom: title + location */}
                <div>
                  <p className="text-white text-xs font-semibold truncate">{img.title || "Untitled"}</p>
                  {img.location && (
                    <p className="text-white/70 text-[10px] truncate">{img.location}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
          >
            <h3 className="text-base font-semibold text-zinc-900 mb-4">Edit Image Label</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">Title</label>
                <input
                  type="text"
                  value={editDraft.title}
                  onChange={(e) => setEditDraft((d) => ({ ...d, title: e.target.value }))}
                  placeholder="e.g. Grid Translucent Stretch Ceiling"
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">Location</label>
                <input
                  type="text"
                  value={editDraft.location}
                  onChange={(e) => setEditDraft((d) => ({ ...d, location: e.target.value }))}
                  placeholder="e.g. Gurugram, India"
                  className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={cancelEdit}
                className="flex-1 flex items-center justify-center gap-1.5 border border-zinc-200 text-zinc-600 text-sm font-medium py-2 rounded-lg hover:bg-zinc-50 transition-colors"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
              <button
                onClick={() => saveEdit(editingId)}
                disabled={!!savingId}
                className="flex-1 flex items-center justify-center gap-1.5 bg-zinc-900 text-white text-sm font-medium py-2 rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-60"
              >
                {savingId ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
