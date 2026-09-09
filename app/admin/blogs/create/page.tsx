"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bold, Italic, List, ListOrdered, Heading2, Table as TableIcon, Images, X, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import slugify from "slugify";
import GalleryPickerModal from "@/components/admin/GalleryPickerModal";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  // Cover image — two sources: uploaded file OR gallery pick
  const [imageSource, setImageSource] = useState<"upload" | "gallery">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [blackAndWhite, setBlackAndWhite] = useState(false);
  const [galleryUrl, setGalleryUrl] = useState<string>("");
  const [galleryOpen, setGalleryOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Auto-derive slug from title unless manually edited
  useEffect(() => {
    if (!slugManuallyEdited) {
      setSlug(slugify(title, { lower: true, strict: true }));
    }
  }, [title, slugManuallyEdited]);

  // Local preview for uploaded file
  useEffect(() => {
    if (!file) { setFilePreview(null); return; }
    const url = URL.createObjectURL(file);
    setFilePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] px-4 py-4 text-zinc-900',
      },
    },
  });

  useEffect(() => {
    return () => { if (editor) editor.destroy(); };
  }, [editor]);

  const handleImageUpload = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("blackAndWhite", String(blackAndWhite));
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.success) {
      let url = data.url;
      if (blackAndWhite) url = url.replace("/upload/", "/upload/e_grayscale/");
      return url;
    }
    throw new Error(data.message || "Failed to upload image");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const textContent = content.replace(/<[^>]*>/g, "").trim();
    if (!textContent) {
      setError("Please add some content before publishing.");
      return;
    }

    setLoading(true);
    try {
      let coverImage = "";
      if (imageSource === "upload" && file) {
        coverImage = await handleImageUpload();
      } else if (imageSource === "gallery" && galleryUrl) {
        coverImage = galleryUrl;
      }

      const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
      const payload = { title, slug: slug || undefined, category, content, excerpt, metaTitle, metaDescription, tags: tagsArray, isPublished, coverImage };

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/admin/blogs");
      } else {
        setError(data.message || `Server error (${res.status})`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // The active cover preview URL for display
  const coverPreview = imageSource === "gallery" ? galleryUrl : filePreview;

  return (
    <div className="min-h-screen bg-[#F4F4F5] pt-32 px-5 md:px-16 pb-20 text-zinc-900">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-brand-vibrancy transition-colors mb-8 font-label-caps"
        >
          <ArrowLeft size={16} /> Back to Blogs
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 md:p-10">
          <h1 className="font-headline-lg text-3xl text-zinc-900 mb-8">
            Create New Blog Post
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* Title */}
            <div>
              <label className="block font-label-caps text-zinc-700 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-brand-vibrancy text-lg text-zinc-900 placeholder:text-zinc-400"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block font-label-caps text-zinc-700 mb-2">URL Slug</label>
              <div className="flex items-center border border-zinc-300 rounded-lg overflow-hidden focus-within:border-brand-vibrancy">
                <span className="px-3 py-3 text-sm text-zinc-600 bg-zinc-100 border-r border-zinc-300 whitespace-nowrap">/blog-details/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true); }}
                  className="flex-1 px-3 py-3 bg-white focus:outline-none text-sm text-zinc-900 placeholder:text-zinc-400"
                  placeholder="auto-generated-from-title"
                />
              </div>
              {slug && (
                <p className="text-xs text-zinc-500 mt-1">Preview: <span className="text-brand-vibrancy">/blog-details/{slug}</span></p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block font-label-caps text-zinc-700 mb-2">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Stretch Ceilings, LED Lighting, Design Tips"
                className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-brand-vibrancy text-zinc-900 placeholder:text-zinc-400"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block font-label-caps text-zinc-700 mb-2">Excerpt (Short description)</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-brand-vibrancy text-zinc-900 placeholder:text-zinc-400"
              />
            </div>

            {/* ── Cover Image ── */}
            <div className="space-y-3">
              <label className="block font-label-caps text-zinc-700">Cover Image</label>

              {/* Source toggle */}
              <div className="inline-flex rounded-lg border border-zinc-300 overflow-hidden text-sm font-medium">
                <button
                  type="button"
                  onClick={() => setImageSource("upload")}
                  className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                    imageSource === "upload"
                      ? "bg-brand-vibrancy text-white"
                      : "bg-white text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  <UploadCloud size={15} />
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setImageSource("gallery")}
                  className={`flex items-center gap-2 px-4 py-2 transition-colors border-l border-zinc-300 ${
                    imageSource === "gallery"
                      ? "bg-brand-vibrancy text-white"
                      : "bg-white text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  <Images size={15} />
                  Pick from Gallery
                </button>
              </div>

              {/* Upload panel */}
              {imageSource === "upload" && (
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="flex-1 px-4 py-3 bg-white border border-zinc-300 rounded-lg text-zinc-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-vibrancy/10 file:text-brand-vibrancy hover:file:bg-brand-vibrancy/20 transition-colors cursor-pointer"
                  />
                  <label className="flex items-center gap-2 cursor-pointer select-none whitespace-nowrap">
                    <div
                      onClick={() => setBlackAndWhite((v) => !v)}
                      className={`relative w-9 h-5 rounded-full transition-colors ${blackAndWhite ? "bg-brand-vibrancy" : "bg-zinc-200"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${blackAndWhite ? "translate-x-4" : "translate-x-0"}`} />
                    </div>
                    <span className="text-sm font-medium text-zinc-700">B&W</span>
                  </label>
                </div>
              )}

              {/* Gallery panel */}
              {imageSource === "gallery" && (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGalleryOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-lg hover:border-brand-vibrancy hover:text-brand-vibrancy transition-colors"
                  >
                    <Images size={16} />
                    {galleryUrl ? "Change Image" : "Browse Gallery"}
                  </button>
                  {galleryUrl && (
                    <button
                      type="button"
                      onClick={() => setGalleryUrl("")}
                      className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors"
                      aria-label="Remove gallery selection"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              )}

              {/* Cover preview (shared) */}
              {coverPreview && (
                <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-zinc-200 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (imageSource === "upload") { setFile(null); }
                        else { setGalleryUrl(""); }
                      }}
                      className="bg-white/90 hover:bg-white p-1 rounded-full shadow text-zinc-600 hover:text-red-500 transition-colors"
                      aria-label="Remove cover image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="px-3 py-1.5 bg-zinc-50 border-t border-zinc-200">
                    <p className="text-xs text-zinc-500">Cover preview</p>
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block font-label-caps text-zinc-700 mb-2">Content</label>
              <div className="bg-white rounded-lg border border-zinc-300 overflow-hidden">
                {editor && (
                  <div className="flex items-center gap-2 border-b border-zinc-200 p-2 bg-zinc-50 text-zinc-700">
                    <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded ${editor.isActive('bold') ? 'bg-zinc-200 text-zinc-900' : 'hover:bg-zinc-100 text-zinc-600'}`}><Bold size={16} /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded ${editor.isActive('italic') ? 'bg-zinc-200 text-zinc-900' : 'hover:bg-zinc-100 text-zinc-600'}`}><Italic size={16} /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-zinc-200 text-zinc-900' : 'hover:bg-zinc-100 text-zinc-600'}`}><Heading2 size={16} /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-zinc-200 text-zinc-900' : 'hover:bg-zinc-100 text-zinc-600'}`}><List size={16} /></button>
                    <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-zinc-200 text-zinc-900' : 'hover:bg-zinc-100 text-zinc-600'}`}><ListOrdered size={16} /></button>
                    <button type="button" onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className={`p-2 rounded ${editor.isActive('table') ? 'bg-zinc-200 text-zinc-900' : 'hover:bg-zinc-100 text-zinc-600'}`}><TableIcon size={16} /></button>
                  </div>
                )}
                <EditorContent editor={editor} className="min-h-[250px]" />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block font-label-caps text-zinc-700 mb-2">Tags (Comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. stretch ceilings, lighting, design"
                className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-brand-vibrancy text-zinc-900 placeholder:text-zinc-400"
              />
            </div>

            {/* Meta Title */}
            <div>
              <label className="block font-label-caps text-zinc-700 mb-1">
                Meta Title <span className={`text-xs font-normal ${metaTitle.length > 60 ? 'text-red-500' : 'text-zinc-500'}`}>({metaTitle.length}/60)</span>
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="SEO title shown in Google results (≤60 chars)"
                className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-brand-vibrancy text-zinc-900 placeholder:text-zinc-400"
              />
            </div>

            {/* Meta Description */}
            <div>
              <label className="block font-label-caps text-zinc-700 mb-1">
                Meta Description <span className={`text-xs font-normal ${metaDescription.length > 160 ? 'text-red-500' : 'text-zinc-500'}`}>({metaDescription.length}/160)</span>
              </label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                placeholder="SEO description shown in Google results (≤160 chars)"
                className="w-full px-4 py-3 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:border-brand-vibrancy text-zinc-900 placeholder:text-zinc-400 resize-none"
              />
            </div>

            {/* Publish */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPublished"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-5 h-5 accent-brand-vibrancy cursor-pointer"
              />
              <label htmlFor="isPublished" className="font-label-caps text-zinc-800 cursor-pointer select-none">
                Publish Immediately
              </label>
            </div>

            <div className="pt-6 border-t border-zinc-200 mt-2 flex flex-col gap-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm font-label-caps">
                  ⚠ {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="bg-brand-vibrancy text-white font-label-caps px-8 py-3 rounded-lg hover:bg-brand-vibrancy/90 transition-colors disabled:opacity-50 w-fit"
              >
                {loading ? "Creating..." : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Gallery Picker Modal */}
      <GalleryPickerModal
        open={galleryOpen}
        currentUrl={galleryUrl}
        onSelect={(url) => setGalleryUrl(url)}
        onClose={() => setGalleryOpen(false)}
      />
    </div>
  );
}
