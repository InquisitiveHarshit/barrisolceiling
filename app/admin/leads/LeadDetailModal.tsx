"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  Calendar,
  Clock,
  Building,
  MapPin,
  Tag,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  MessageSquare,
  Loader2,
  User,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

export interface ContactLeadType {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  company_name?: string;
  country?: string;
  city?: string;
  product_service?: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
}

interface LeadDetailModalProps {
  lead: ContactLeadType | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => Promise<void> | void;
  isDeleting?: boolean;
}

export default function LeadDetailModal({
  lead,
  isOpen,
  onClose,
  onDelete,
  isDeleting = false,
}: LeadDetailModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => {
      setCopiedField((curr) => (curr === fieldName ? null : curr));
    }, 2000);
  };

  if (!isOpen || !lead) return null;

  const leadDate = new Date(lead.createdAt);
  const isValidDate = !isNaN(leadDate.getTime());

  // Initials for avatar
  const initials = lead.name
    ? lead.name
        .split(" ")
        .map((n) => n[0])
        .filter(Boolean)
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "L";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, scale: 0.95, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 14 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white border border-zinc-200 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden z-10"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-100 flex items-start justify-between gap-4 bg-zinc-50/70">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-900 text-white font-semibold flex items-center justify-center text-base shadow-sm ring-2 ring-white">
                {initials}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-zinc-900 tracking-tight">
                    {lead.name}
                  </h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Lead
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {isValidDate
                      ? format(leadDate, "MMMM d, yyyy 'at' h:mm a")
                      : "Date unknown"}
                  </span>
                  {isValidDate && (
                    <span className="text-zinc-400">
                      ({formatDistanceToNow(leadDate, { addSuffix: true })})
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded-full transition-colors"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {/* Contact Details Grid */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                Contact Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email */}
                <div className="p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-white rounded-lg border border-zinc-200 text-zinc-600 flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-zinc-500">Email Address</p>
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-xs sm:text-sm font-semibold text-zinc-900 hover:text-blue-600 truncate block transition-colors"
                        title={lead.email}
                      >
                        {lead.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(lead.email, "email")}
                    className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/50 rounded-md transition-colors flex-shrink-0"
                    title="Copy Email"
                  >
                    {copiedField === "email" ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-white rounded-lg border border-zinc-200 text-zinc-600 flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-zinc-500">Phone Number</p>
                      {lead.phone ? (
                        <a
                          href={`tel:${lead.phone}`}
                          className="text-xs sm:text-sm font-semibold text-zinc-900 hover:text-blue-600 truncate block transition-colors"
                          title={lead.phone}
                        >
                          {lead.phone}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-sm text-zinc-400 italic">Not provided</p>
                      )}
                    </div>
                  </div>
                  {lead.phone && (
                    <button
                      onClick={() => copyToClipboard(lead.phone || "", "phone")}
                      className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/50 rounded-md transition-colors flex-shrink-0"
                      title="Copy Phone"
                    >
                      {copiedField === "phone" ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Fields (if any exist: company, location, service) */}
            {(lead.company_name || lead.city || lead.country || lead.product_service) && (
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                  Inquiry Specifics
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {lead.company_name && (
                    <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-xl flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg border border-zinc-200 text-zinc-600">
                        <Building className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-zinc-500">Company</p>
                        <p className="text-xs sm:text-sm font-semibold text-zinc-900">
                          {lead.company_name}
                        </p>
                      </div>
                    </div>
                  )}

                  {(lead.city || lead.country) && (
                    <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-xl flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg border border-zinc-200 text-zinc-600">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-zinc-500">Location</p>
                        <p className="text-xs sm:text-sm font-semibold text-zinc-900">
                          {[lead.city, lead.country].filter(Boolean).join(", ")}
                        </p>
                      </div>
                    </div>
                  )}

                  {lead.product_service && (
                    <div className="p-3 bg-zinc-50 border border-zinc-200/80 rounded-xl flex items-center gap-3 col-span-1 sm:col-span-2">
                      <div className="p-2 bg-white rounded-lg border border-zinc-200 text-zinc-600">
                        <Tag className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-medium text-zinc-500">
                          Product / Service of Interest
                        </p>
                        <p className="text-xs sm:text-sm font-semibold text-zinc-900">
                          {lead.product_service}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Lead Message Requirement */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Message / Requirement
                  </p>
                </div>
                {lead.message && (
                  <button
                    onClick={() => copyToClipboard(lead.message || "", "message")}
                    className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-800 transition-colors"
                  >
                    {copiedField === "message" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="p-4 sm:p-5 bg-zinc-50 border border-zinc-200/90 rounded-xl relative">
                {lead.message && lead.message.trim() ? (
                  <p className="text-sm text-zinc-800 leading-relaxed whitespace-pre-wrap select-text font-normal">
                    {lead.message}
                  </p>
                ) : (
                  <p className="text-sm text-zinc-400 italic">
                    No message or description provided with this inquiry.
                  </p>
                )}
              </div>
            </div>

            {/* Metadata Footer bar */}
            <div className="pt-2 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <span>ID:</span>
                <span className="text-zinc-600 select-all">{lead._id}</span>
                <button
                  onClick={() => copyToClipboard(lead._id, "lead_id")}
                  className="hover:text-zinc-700 ml-1"
                  title="Copy ID"
                >
                  {copiedField === "lead_id" ? (
                    <Check className="w-3 h-3 text-emerald-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              </div>

              {lead.updatedAt && (
                <div className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" />
                  <span>
                    Updated {format(new Date(lead.updatedAt), "MMM d, yyyy")}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => onDelete(lead._id)}
              disabled={isDeleting}
              className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 px-3.5 py-2 rounded-xl border border-red-200 text-xs font-medium transition-colors disabled:opacity-50"
            >
              {isDeleting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Trash2 className="w-3.5 h-3.5" />
              )}
              Delete Lead
            </button>

            <div className="flex items-center gap-2 ml-auto">
              {lead.phone && (
                <a
                  href={`tel:${lead.phone}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-medium transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call
                </a>
              )}

              <a
                href={`mailto:${lead.email}?subject=Regarding your Inquiry - Barrisol Stretch Ceiling`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium shadow-sm transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Reply via Email
              </a>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
