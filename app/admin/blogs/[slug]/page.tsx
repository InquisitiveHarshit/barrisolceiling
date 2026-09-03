"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bold, Italic, List, ListOrdered, Heading2, Table as TableIcon } from "lucide-react";
import Link from "next/link";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import slugify from "slugify";

export default function EditBlog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [title, setTitle] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [blackAndWhite, setBlackAndWhite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] px-4 py-4',
      },
    },
  });

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${slug}`);
        const data = await res.json();
        if (data.success) {
          setTitle(data.data.title);
          setEditSlug(data.data.slug || "");
          setCategory(data.data.category || "");
          setContent(data.data.content);
          setExcerpt(data.data.excerpt || "");
          setMetaTitle(data.data.metaTitle || "");
          setMetaDescription(data.data.metaDescription || "");
          setTags(data.data.tags?.join(", ") || "");
          setIsPublished(data.data.isPublished);
          if (editor && editor.getHTML() !== data.data.content) {
            editor.commands.setContent(data.data.content);
          }
        } else {
          setError(data.message || "Failed to load blog");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setPageLoading(false);
      }
    };
    if (editor) {
      fetchBlog();
    }
  }, [slug, editor]);

  const handleImageUpload = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("blackAndWhite", String(blackAndWhite));
    const res = await fetch("/api/upload", {
      method: "POST",
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

    const textContent = content.replace(/<[^>]*>/g, "").trim();
    if (!textContent) {
      setError("Please add some content before saving.");
      return;
    }

    setLoading(true);

    try {
      let coverImage = undefined;
      if (file) {
        coverImage = await handleImageUpload();
      }

      const tagsArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);
      const payload: any = { title, slug: editSlug || undefined, category, content, excerpt, metaTitle, metaDescription, tags: tagsArray, isPublished };
      if (coverImage) payload.coverImage = coverImage;

      const res = await fetch(`/api/blogs/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
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

  if (pageLoading) {
    return <div className="min-h-screen bg-surface-bright pt-32 px-5 text-center text-on-surface-variant font-label-caps">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 px-5 md:px-16 pb-24 font-body-md">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/blogs"
          className="group inline-flex items-center gap-2 text-on-surface-variant hover:text-[#202124] transition-colors mb-12 text-sm font-medium tracking-wide"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Blogs
        </Link>

        <h1 className="font-headline-lg text-4xl text-[#202124] mb-10 tracking-tight">
          Edit Post
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-brand-vibrancy focus:ring-1 focus:ring-brand-vibrancy transition-shadow text-lg text-[#202124]"
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              URL Slug
            </label>
            <div className="flex items-center bg-white border border-black/10 rounded-xl overflow-hidden focus-within:border-brand-vibrancy focus-within:ring-1 focus-within:ring-brand-vibrancy transition-shadow">
              <span className="px-3 py-3 text-sm text-on-surface-variant bg-[#FAFAFA] border-r border-black/10 whitespace-nowrap">/blog-details/</span>
              <input
                type="text"
                value={editSlug}
                onChange={(e) => setEditSlug(e.target.value)}
                className="flex-1 px-3 py-3 focus:outline-none text-sm text-[#202124]"
                placeholder="my-blog-post-slug"
              />
            </div>
            {editSlug && (
              <p className="text-xs text-on-surface-variant">Preview: <span className="text-brand-vibrancy">/blog-details/{editSlug}</span></p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Stretch Ceilings, LED Lighting"
              className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-brand-vibrancy focus:ring-1 focus:ring-brand-vibrancy transition-shadow text-[#202124]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Excerpt <span className="normal-case tracking-normal font-normal opacity-70">(Short description)</span>
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-brand-vibrancy focus:ring-1 focus:ring-brand-vibrancy transition-shadow text-[#202124] resize-none"
            />
          </div>

          <div className="space-y-2 flex flex-col justify-end">
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Cover Image <span className="normal-case tracking-normal font-normal opacity-70">(Leave empty to keep current)</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="flex-1 px-4 py-3 bg-white border border-black/10 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-vibrancy/10 file:text-brand-vibrancy hover:file:bg-brand-vibrancy/20 transition-colors cursor-pointer"
              />
              <label className="flex items-center gap-2 cursor-pointer select-none whitespace-nowrap">
                <div
                  onClick={() => setBlackAndWhite((v) => !v)}
                  className={`relative w-8 h-4 rounded-full transition-colors ${blackAndWhite ? "bg-[#202124]" : "bg-black/10"}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow transition-transform ${blackAndWhite ? "translate-x-4" : "translate-x-0"}`}
                  />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">B&W</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Content
            </label>
            <div className="bg-white rounded-xl border border-black/10 overflow-hidden focus-within:border-brand-vibrancy focus-within:ring-1 focus-within:ring-brand-vibrancy transition-shadow">
              {/* TipTap Toolbar */}
              {editor && (
                <div className="flex items-center gap-1 border-b border-black/5 p-2 bg-[#FAFAFA] text-zinc-800">
                  {[
                    { icon: Bold, action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive('bold') },
                    { icon: Italic, action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive('italic') },
                    { icon: Heading2, action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive('heading', { level: 2 }) },
                    { icon: List, action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive('bulletList') },
                    { icon: ListOrdered, action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive('orderedList') },
                    { icon: TableIcon, action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(), active: editor.isActive('table') },
                  ].map((btn, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={btn.action}
                      className={`p-2 rounded-lg transition-colors ${btn.active ? 'bg-black/5 text-[#202124]' : 'text-on-surface-variant hover:bg-black/5 hover:text-[#202124]'}`}
                    >
                      <btn.icon size={16} />
                    </button>
                  ))}
                </div>
              )}
              {/* TipTap Editor */}
              <EditorContent editor={editor} className="min-h-[300px] p-2" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Tags <span className="normal-case tracking-normal font-normal opacity-70">(Comma separated)</span>
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. stretch ceilings, lighting, design"
              className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-brand-vibrancy focus:ring-1 focus:ring-brand-vibrancy transition-shadow text-[#202124]"
            />
          </div>

          {/* Meta Title */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Meta Title <span className={`normal-case tracking-normal font-normal ${metaTitle.length > 60 ? 'text-red-500' : 'opacity-70'}`}>({metaTitle.length}/60 chars)</span>
            </label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="SEO title shown in Google results (≤60 chars)"
              className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-brand-vibrancy focus:ring-1 focus:ring-brand-vibrancy transition-shadow text-[#202124]"
            />
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
              Meta Description <span className={`normal-case tracking-normal font-normal ${metaDescription.length > 160 ? 'text-red-500' : 'opacity-70'}`}>({metaDescription.length}/160 chars)</span>
            </label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={3}
              placeholder="SEO description shown in Google results (≤160 chars)"
              className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:border-brand-vibrancy focus:ring-1 focus:ring-brand-vibrancy transition-shadow text-[#202124] resize-none"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="w-5 h-5 accent-brand-vibrancy rounded border-black/20 focus:ring-brand-vibrancy"
            />
            <label
              htmlFor="isPublished"
              className="text-sm font-medium text-[#202124] select-none cursor-pointer"
            >
              Publish Immediately
            </label>
          </div>

          <div className="pt-8 border-t border-black/10 mt-4 flex flex-col gap-4">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl px-4 py-3 text-sm font-medium">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#202124] text-white text-sm font-semibold tracking-wide px-8 py-3.5 rounded-full hover:bg-black transition-all active:scale-[0.98] active:translate-y-[1px] disabled:opacity-50 disabled:pointer-events-none w-fit"
            >
              {loading ? "Saving changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
