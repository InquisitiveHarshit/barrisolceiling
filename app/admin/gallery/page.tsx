"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
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

  /**
   * Applies Cloudinary's e_grayscale transformation to a Cloudinary URL.
   * e.g. .../upload/v123/... → .../upload/e_grayscale/v123/...
   */
  const applyGrayscale = (url: string) => {
    return url.replace("/upload/", "/upload/e_grayscale/");
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", file.name);
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
        // If B&W was selected, transform the stored URL to use grayscale
        const image = data.image;
        if (blackAndWhite) {
          image.url = applyGrayscale(image.url);
        }
        setImages((prev) => [image, ...prev]);
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-zinc-900">Gallery</h2>
          <p className="text-sm text-zinc-500 mt-1">Manage your image gallery assets.</p>
        </div>

        {/* Upload controls */}
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
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            {isUploading ? "Uploading..." : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={isUploading}
            />
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
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-white text-xs truncate font-medium">{img.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
