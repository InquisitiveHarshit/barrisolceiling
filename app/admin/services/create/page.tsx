"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bold, Italic, List, ListOrdered, Heading2, Table as TableIcon } from "lucide-react";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import slugify from "slugify";

export default function CreateService() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [category, setCategory] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [blackAndWhite, setBlackAndWhite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Auto-derive slug from title unless manually edited
  useEffect(() => {
    if (!slugManuallyEdited) {
      setSlug(slugify(title, { lower: true, strict: true }));
    }
  }, [title, slugManuallyEdited]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg mx-auto focus:outline-none min-h-[200px] px-4 py-4",
      },
    },
  });

  useEffect(() => {
    return () => {
      if (editor) editor.destroy();
    };
  }, [editor]);

  const handleImageUpload = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("blackAndWhite", String(blackAndWhite));
    const token = localStorage.getItem("admin_token");
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    if (data.success) {
      let url = data.url;
      if (blackAndWhite) {
        url = url.replace("/upload/", "/upload/e_grayscale/");
      }
      return url;
    }
    throw new Error(data.message || "Failed to upload image");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("admin_token");
      if (!token) throw new Error("You must be logged in.");

      let coverImage = "";
      if (file) coverImage = await handleImageUpload();

      const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
      const payload = { title, slug: slug || undefined, category, shortDescription, content, metaTitle, metaDescription, tags: tagsArray, isPublished, coverImage };

      const res = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin/services");
      } else {
        setError(data.message || `Server error (${res.status})`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto w-full pb-20">
      <Link
        href="/admin/services"
        className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors mb-8 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to Services
      </Link>

      <div className="bg-white rounded-2xl border border-zinc-200 p-8">
        <h1 className="text-2xl font-medium tracking-tight text-zinc-900 mb-8">
          Create New Service
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 text-lg text-zinc-900 transition-colors"
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              URL Slug
            </label>
            <div className="flex items-center bg-white border border-zinc-200 rounded-xl overflow-hidden focus-within:border-zinc-900 transition-colors">
              <span className="px-3 py-3 text-sm text-zinc-500 bg-zinc-50 border-r border-zinc-200 whitespace-nowrap">/service-detail/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true); }}
                className="flex-1 px-3 py-3 focus:outline-none text-sm text-zinc-900"
                placeholder="auto-generated-from-title"
              />
            </div>
            {slug && (
              <p className="text-xs text-zinc-500">Preview: <span className="text-brand-vibrancy">/service-detail/{slug}</span></p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Stretch Ceilings, Lighting"
                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 text-zinc-900 transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Cover Image
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="flex-1 px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-zinc-100 file:text-zinc-700 hover:file:bg-zinc-200 cursor-pointer transition-colors"
                />
                <label className="flex items-center gap-2 cursor-pointer select-none whitespace-nowrap">
                  <div
                    onClick={() => setBlackAndWhite((v) => !v)}
                    className={`relative w-8 h-4 rounded-full transition-colors ${blackAndWhite ? "bg-zinc-900" : "bg-zinc-200"}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${blackAndWhite ? "translate-x-4" : "translate-x-0"}`}
                    />
                  </div>
                  <span className="text-xs font-medium text-zinc-700">B&W</span>
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Short Description
            </label>
            <textarea
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              rows={2}
              placeholder="A brief one or two sentence summary displayed on the services listing page"
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 text-zinc-900 resize-none transition-colors"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Content
            </label>
            <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden focus-within:border-zinc-900 transition-colors">
              {editor && (
                <div className="flex items-center gap-1 border-b border-zinc-100 p-2 bg-zinc-50">
                  {[
                    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
                    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
                    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
                    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
                    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
                    { icon: TableIcon, action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(), active: editor.isActive("table") },
                  ].map((btn, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={btn.action}
                      className={`p-2 rounded-lg transition-colors ${btn.active ? "bg-zinc-200 text-zinc-900" : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"}`}
                    >
                      <btn.icon size={16} />
                    </button>
                  ))}
                </div>
              )}
              <EditorContent editor={editor} className="min-h-[250px]" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Tags <span className="normal-case tracking-normal font-normal opacity-70">(Comma separated)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. stretch ceilings, commercial, design"
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 text-zinc-900 transition-colors"
            />
          </div>

          {/* Meta Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Meta Title <span className={`normal-case tracking-normal font-normal ${metaTitle.length > 60 ? 'text-red-500' : 'opacity-70'}`}>({metaTitle.length}/60 chars)</span>
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="SEO title shown in Google results (≤60 chars)"
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 text-zinc-900 transition-colors"
            />
          </div>

          {/* Meta Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Meta Description <span className={`normal-case tracking-normal font-normal ${metaDescription.length > 160 ? 'text-red-500' : 'opacity-70'}`}>({metaDescription.length}/160 chars)</span>
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              placeholder="SEO description shown in Google results (≤160 chars)"
              className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-xl focus:outline-none focus:border-zinc-900 text-zinc-900 resize-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-5 h-5 rounded border-zinc-300 accent-zinc-900"
            />
            <label htmlFor="isPublished" className="text-sm font-medium text-zinc-900 cursor-pointer select-none">
              Publish Immediately
            </label>
          </div>

          <div className="pt-6 border-t border-zinc-100 flex flex-col gap-4">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm font-medium">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-zinc-900 text-white text-sm font-semibold px-8 py-3 rounded-full hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none w-fit"
            >
              {loading ? "Creating..." : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
