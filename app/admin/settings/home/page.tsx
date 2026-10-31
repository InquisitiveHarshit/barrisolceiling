"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Save, Code2, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from "lucide-react";

const DEFAULT_SCHEMA = JSON.stringify(
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.berrisol.in/#business",
        name: "Berrisol & Illusion Decors",
        description:
          "Leading stretch ceiling manufacturer and installer in India. European PVC membranes, acoustic, backlit, starlight ceilings for residential and commercial spaces.",
        url: "https://www.berrisol.in",
        telephone: "+91-9540593079",
        address: {
          "@type": "PostalAddress",
          streetAddress: "C-46 2nd Floor, DDA Sheds, Okhla Phase 1",
          addressLocality: "New Delhi",
          postalCode: "110020",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 28.5355,
          longitude: 77.2505,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          opens: "09:00",
          closes: "19:00",
        },
        sameAs: [
          "https://www.instagram.com/berrisol",
          "https://www.facebook.com/berrisol",
        ],
        priceRange: "₹₹₹",
        areaServed: "India",
      },
    ],
  },
  null,
  2
);

function validateJson(str: string): string | null {
  if (!str.trim()) return null;
  try {
    JSON.parse(str);
    return null; // valid
  } catch (e: any) {
    return e.message;
  }
}

export default function HomeSettings() {
  const [metaTitle, setMetaTitle]           = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [faqs, setFaqs]                     = useState<{ question: string; answer: string }[]>([]);
  const [schemaMarkup, setSchemaMarkup]     = useState("");
  const [schemaError, setSchemaError]       = useState<string | null>(null);
  const [schemaOpen, setSchemaOpen]         = useState(false);
  const [loading, setLoading]               = useState(true);
  const [saving, setSaving]                 = useState(false);
  const [message, setMessage]               = useState("");

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      const res  = await fetch("/api/settings/home");
      const data = await res.json();
      if (data.success && data.settings) {
        setMetaTitle(data.settings.metaTitle || "");
        setMetaDescription(data.settings.metaDescription || "");
        setFaqs(data.settings.faqs || []);
        setSchemaMarkup(data.settings.schemaMarkup || "");
      }
    } catch (err) {
      console.error("Failed to fetch settings", err);
    } finally {
      setLoading(false);
    }
  };

  /* ── FAQ helpers ─────────────────────────── */
  const addFaq    = () => setFaqs([...faqs, { question: "", answer: "" }]);
  const removeFaq = (i: number) => { const f = [...faqs]; f.splice(i, 1); setFaqs(f); };
  const updateFaq = (i: number, field: "question" | "answer", val: string) => {
    const f = [...faqs]; f[i][field] = val; setFaqs(f);
  };

  /* ── Schema helpers ──────────────────────── */
  const handleSchemaChange = (val: string) => {
    setSchemaMarkup(val);
    setSchemaError(validateJson(val));
  };
  const prettifySchema = () => {
    try { setSchemaMarkup(JSON.stringify(JSON.parse(schemaMarkup), null, 2)); setSchemaError(null); }
    catch { /* already invalid — leave as-is */ }
  };
  const loadDefaultSchema = () => { setSchemaMarkup(DEFAULT_SCHEMA); setSchemaError(null); };

  /* ── Save ────────────────────────────────── */
  const handleSave = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (schemaMarkup && validateJson(schemaMarkup)) {
      setMessage("Fix the JSON-LD schema errors before saving.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      const res  = await fetch("/api/settings/home", {
        method:  "PUT",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ metaTitle, metaDescription, faqs, schemaMarkup }),
      });
      const data = await res.json();
      if (res.status === 401) {
        setMessage("Session expired. Redirecting…");
        setTimeout(() => { window.location.href = "/admin/login"; }, 1500);
        return;
      }
      setMessage(data.success ? "Settings saved! Cache refreshed." : (data.message || data.error || "Save failed."));
    } catch {
      setMessage("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  }, [metaTitle, metaDescription, faqs, schemaMarkup]);

  if (loading) return <div className="p-6 text-gray-500">Loading…</div>;

  const isSuccess = message.toLowerCase().includes("saved");

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800 font-serif">Home Page Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Save size={18} />
          {saving ? "Saving…" : "Save Settings"}
        </button>
      </div>

      {/* Toast */}
      {message && (
        <div className={`flex items-center gap-2 p-4 mb-6 rounded-md text-sm ${
          isSuccess ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          {isSuccess ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">

        {/* ── SEO Meta ──────────────────────────────── */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">SEO Meta Data</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. Berrisol & Illusion Decors | Premium Stretch Ceilings"
              />
              <p className="mt-1 text-xs text-gray-400">{metaTitle.length} / 60 chars recommended</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter page description (150–160 chars ideal)"
              />
              <p className="mt-1 text-xs text-gray-400">{metaDescription.length} / 160 chars recommended</p>
            </div>
          </div>
        </section>

        {/* ── JSON-LD Schema Markup ─────────────────── */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setSchemaOpen(!schemaOpen)}
            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Code2 size={18} className="text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-700">Structured Data / JSON-LD Schema</h2>
              {schemaMarkup && !schemaError && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Active</span>
              )}
              {schemaError && (
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">Invalid JSON</span>
              )}
            </div>
            {schemaOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
          </button>

          {schemaOpen && (
            <div className="px-6 pb-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 mt-4 mb-3">
                Paste valid JSON-LD here. It will be injected as a{" "}
                <code className="bg-gray-100 px-1 rounded text-xs">&lt;script type="application/ld+json"&gt;</code> tag
                directly on the homepage. Supports <strong>LocalBusiness</strong>, <strong>FAQPage</strong>,{" "}
                <strong>WebSite</strong>, etc.
              </p>

              {/* Action buttons */}
              <div className="flex gap-2 mb-3 flex-wrap">
                <button
                  type="button"
                  onClick={prettifySchema}
                  disabled={!schemaMarkup}
                  className="text-xs px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  Prettify JSON
                </button>
                <button
                  type="button"
                  onClick={loadDefaultSchema}
                  className="text-xs px-3 py-1.5 border border-indigo-300 text-indigo-600 rounded hover:bg-indigo-50 transition-colors"
                >
                  Load Default LocalBusiness Schema
                </button>
                {schemaMarkup && (
                  <button
                    type="button"
                    onClick={() => { setSchemaMarkup(""); setSchemaError(null); }}
                    className="text-xs px-3 py-1.5 border border-red-200 text-red-500 rounded hover:bg-red-50 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Textarea */}
              <textarea
                value={schemaMarkup}
                onChange={(e) => handleSchemaChange(e.target.value)}
                rows={18}
                spellCheck={false}
                className={`w-full p-3 font-mono text-xs border rounded-md focus:ring-2 focus:border-transparent transition-colors ${
                  schemaError
                    ? "border-red-400 focus:ring-red-400 bg-red-50"
                    : "border-gray-300 focus:ring-indigo-500 bg-gray-50"
                }`}
                placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "LocalBusiness",\n  ...\n}`}
              />

              {/* Validation feedback */}
              {schemaError && (
                <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle size={13} /> {schemaError}
                </p>
              )}
              {!schemaError && schemaMarkup && (
                <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle2 size={13} /> Valid JSON-LD — will be injected on save.
                </p>
              )}

              {/* Quick reference */}
              <details className="mt-4">
                <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
                  Quick schema type reference
                </summary>
                <div className="mt-2 text-xs text-gray-500 space-y-1 bg-gray-50 p-3 rounded border border-gray-100">
                  <p><code className="bg-white px-1 border rounded">LocalBusiness</code> — business details, address, phone, geo, hours</p>
                  <p><code className="bg-white px-1 border rounded">FAQPage</code> — FAQ rich results (auto-generated from your FAQs above)</p>
                  <p><code className="bg-white px-1 border rounded">WebSite</code> — sitelinks search box, site name</p>
                  <p><code className="bg-white px-1 border rounded">BreadcrumbList</code> — breadcrumb navigation</p>
                </div>
              </details>
            </div>
          )}
        </section>

        {/* ── FAQs ──────────────────────────────────── */}
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4 border-b pb-2">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Frequently Asked Questions</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                These appear in the FAQ section on the homepage and are also auto-injected as a FAQPage schema.
              </p>
            </div>
            <button
              type="button"
              onClick={addFaq}
              className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md transition-colors shrink-0"
            >
              <Plus size={16} /> Add FAQ
            </button>
          </div>

          <div className="space-y-4">
            {faqs.length === 0 ? (
              <p className="text-gray-400 italic text-sm">
                No FAQs yet. Click "Add FAQ" to create one — it will show on the homepage and generate a FAQPage schema automatically.
              </p>
            ) : (
              faqs.map((faq, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-md bg-gray-50 relative group">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded">
                      #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFaq(index)}
                      className="ml-auto flex items-center gap-1 text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Question</label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(index, "question", e.target.value)}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. What is a stretch ceiling?"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Answer</label>
                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(index, "answer", e.target.value)}
                        rows={3}
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter the answer…"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Sticky save bar */}
        <div className="sticky bottom-0 bg-white/90 backdrop-blur border-t border-gray-200 -mx-6 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-gray-400">Changes are applied to the homepage immediately after saving (ISR revalidation).</p>
          <button
            type="submit"
            disabled={saving || !!schemaError}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Save size={16} />
            {saving ? "Saving…" : "Save All Settings"}
          </button>
        </div>

      </form>
    </div>
  );
}
