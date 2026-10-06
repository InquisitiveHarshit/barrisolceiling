"use client";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqEditorProps {
  faqs: FaqItem[];
  onChange: (faqs: FaqItem[]) => void;
}

export default function FaqEditor({ faqs, onChange }: FaqEditorProps) {
  const addFaq = () => {
    onChange([...faqs, { question: "", answer: "" }]);
  };

  const removeFaq = (index: number) => {
    onChange(faqs.filter((_, i) => i !== index));
  };

  const updateFaq = (index: number, field: keyof FaqItem, value: string) => {
    const updated = faqs.map((faq, i) =>
      i === index ? { ...faq, [field]: value } : faq
    );
    onChange(updated);
  };

  const moveFaq = (index: number, direction: "up" | "down") => {
    const newFaqs = [...faqs];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newFaqs.length) return;
    [newFaqs[index], newFaqs[targetIndex]] = [
      newFaqs[targetIndex],
      newFaqs[index],
    ];
    onChange(newFaqs);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            FAQ Items
          </p>
          <p className="text-xs text-zinc-400 mt-0.5">
            FAQPage schema is auto-generated — Google can show these as rich results.
          </p>
        </div>
        <button
          type="button"
          onClick={addFaq}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-brand-vibrancy text-white rounded-lg hover:bg-brand-vibrancy/90 transition-colors"
        >
          <Plus size={13} />
          Add FAQ
        </button>
      </div>

      {faqs.length === 0 && (
        <div className="border border-dashed border-zinc-200 rounded-xl px-6 py-8 text-center">
          <p className="text-sm text-zinc-400">
            No FAQs yet. Click &ldquo;Add FAQ&rdquo; to create the first one.
          </p>
          <p className="text-xs text-zinc-300 mt-1">
            Adding FAQs enables the FAQPage rich result in Google Search.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-zinc-200 rounded-xl bg-white overflow-hidden"
          >
            {/* Header row */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-50 border-b border-zinc-200">
              <span className="text-xs font-mono font-semibold text-zinc-400 w-6 shrink-0">
                #{i + 1}
              </span>
              <div className="flex items-center gap-1 ml-auto">
                <button
                  type="button"
                  onClick={() => moveFaq(i, "up")}
                  disabled={i === 0}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="Move up"
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => moveFaq(i, "down")}
                  disabled={i === faqs.length - 1}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-700 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="Move down"
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
                  className="p-1 rounded text-zinc-400 hover:text-red-500 transition-colors ml-1"
                  title="Remove FAQ"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Fields */}
            <div className="p-4 flex flex-col gap-3">
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Question
                </label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(i, "question", e.target.value)}
                  placeholder="e.g. How long does installation take?"
                  className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900 text-sm text-zinc-900 transition-colors placeholder:text-zinc-300"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Answer
                </label>
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(i, "answer", e.target.value)}
                  placeholder="e.g. Typically 1–2 days depending on the room size..."
                  rows={3}
                  className="w-full px-3 py-2.5 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:border-zinc-900 text-sm text-zinc-900 resize-none transition-colors placeholder:text-zinc-300"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live schema preview — always visible when FAQs have content */}
      {faqs.some((f) => f.question && f.answer) && (
        <div className="rounded-xl border border-green-900/30 bg-zinc-950 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-green-900/20 bg-zinc-900">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-green-400">
                Auto-generated FAQPage JSON-LD Schema
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">
              schema.org/FAQPage · {faqs.filter((f) => f.question && f.answer).length} Q&amp;A
            </span>
          </div>
          {/* JSON body */}
          <pre className="p-4 text-[11px] text-green-300 font-mono leading-relaxed overflow-auto max-h-56 scrollbar-thin scrollbar-thumb-zinc-700">
            {JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs
                  .filter((f) => f.question && f.answer)
                  .map((f) => ({
                    "@type": "Question",
                    name: f.question,
                    acceptedAnswer: { "@type": "Answer", text: f.answer },
                  })),
              },
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
