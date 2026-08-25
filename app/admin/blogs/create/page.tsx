"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bold, Italic, List, ListOrdered, Heading2, Table as TableIcon } from "lucide-react";
import Link from "next/link";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [blackAndWhite, setBlackAndWhite] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // Ensure editor is destroyed when unmounted to prevent memory leaks
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      let url = data.url;
      if (blackAndWhite) {
        url = url.replace("/upload/", "/upload/e_grayscale/");
      }
      return url;
    } else {
      throw new Error(data.message || "Failed to upload image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Guard: check that TipTap content isn't empty (it emits "<p></p>" when blank)
    const textContent = content.replace(/<[^>]*>/g, "").trim();
    if (!textContent) {
      setError("Please add some content before publishing.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        throw new Error("You must be logged in to create a post.");
      }

      let coverImage = "";
      if (file) {
        coverImage = await handleImageUpload();
      }

      const tagsArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);

      const payload = { title, content, excerpt, tags: tagsArray, isPublished, coverImage };
      console.log("[CreateBlog] Submitting payload:", payload);

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("[CreateBlog] Server response:", res.status, data);

      if (data.success) {
        router.push("/admin/blogs");
      } else {
        setError(data.message || `Server error (${res.status})`);
      }
    } catch (err: any) {
      console.error("[CreateBlog] Caught error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-surface-bright pt-32 px-5 md:px-16 pb-20">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-brand-vibrancy transition-colors mb-8 font-label-caps"
        >
          <ArrowLeft size={16} /> Back to Blogs
        </Link>

        <div className="bg-luminary-white rounded-2xl shadow-sm border border-outline/10 p-8 md:p-10">
          <h1 className="font-headline-lg text-3xl text-[#202124] mb-8">
            Create New Blog Post
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label className="block font-label-caps text-on-surface-variant mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-outline/20 rounded-lg focus:outline-none focus:border-brand-vibrancy text-lg"
                required
              />
            </div>

            <div>
              <label className="block font-label-caps text-on-surface-variant mb-2">
                Excerpt (Short description)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 border border-outline/20 rounded-lg focus:outline-none focus:border-brand-vibrancy"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-label-caps text-on-surface-variant mb-2">
                Cover Image
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="flex-1 px-4 py-3 border border-outline/20 rounded-lg"
                />
                <label className="flex items-center gap-2 cursor-pointer select-none whitespace-nowrap">
                  <div
                    onClick={() => setBlackAndWhite((v) => !v)}
                    className={`relative w-9 h-5 rounded-full transition-colors ${blackAndWhite ? "bg-brand-vibrancy" : "bg-outline/20"}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${blackAndWhite ? "translate-x-4" : "translate-x-0"}`}
                    />
                  </div>
                  <span className="text-sm font-medium text-on-surface-variant">B&W</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-label-caps text-on-surface-variant mb-2">
                Content
              </label>
              <div className="bg-white rounded-lg border border-outline/20 overflow-hidden">
                {/* TipTap Toolbar */}
                {editor && (
                  <div className="flex items-center gap-2 border-b border-outline/20 p-2 bg-surface-container-lowest">
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      className={`p-2 rounded ${editor.isActive('bold') ? 'bg-outline/20' : 'hover:bg-outline/10'}`}
                    >
                      <Bold size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleItalic().run()}
                      className={`p-2 rounded ${editor.isActive('italic') ? 'bg-outline/20' : 'hover:bg-outline/10'}`}
                    >
                      <Italic size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-outline/20' : 'hover:bg-outline/10'}`}
                    >
                      <Heading2 size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleBulletList().run()}
                      className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-outline/20' : 'hover:bg-outline/10'}`}
                    >
                      <List size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleOrderedList().run()}
                      className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-outline/20' : 'hover:bg-outline/10'}`}
                    >
                      <ListOrdered size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                      className={`p-2 rounded ${editor.isActive('table') ? 'bg-outline/20' : 'hover:bg-outline/10'}`}
                    >
                      <TableIcon size={16} />
                    </button>
                  </div>
                )}
                {/* TipTap Editor */}
                <EditorContent editor={editor} className="min-h-[250px]" />
              </div>
            </div>

            <div>
              <label className="block font-label-caps text-on-surface-variant mb-2">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. stretch ceilings, lighting, design"
                className="w-full px-4 py-3 border border-outline/20 rounded-lg focus:outline-none focus:border-brand-vibrancy"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPublished"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-5 h-5 accent-brand-vibrancy"
              />
              <label
                htmlFor="isPublished"
                className="font-label-caps text-on-surface-variant"
              >
                Publish Immediately
              </label>
            </div>

            <div className="pt-6 border-t border-outline/10 mt-2 flex flex-col gap-4">
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
    </div>
  );
}
