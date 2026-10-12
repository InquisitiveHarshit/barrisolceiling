"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Loader2,
  Mail,
  Phone,
  Calendar,
  Trash2,
  Eye,
  Search,
  RefreshCw,
  X,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";
import LeadDetailModal, { ContactLeadType } from "./LeadDetailModal";

export default function LeadsPage() {
  const [leads, setLeads] = useState<ContactLeadType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<ContactLeadType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchLeads();
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead? This cannot be undone."))
      return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
        if (selectedLead?._id === id) {
          setSelectedLead(null);
        }
      } else {
        alert(data.message || "Failed to delete lead.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting lead.");
    } finally {
      setDeletingId(null);
    }
  };

  // Filter leads based on query
  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) return leads;
    const q = searchQuery.toLowerCase().trim();
    return leads.filter((lead) => {
      const name = lead.name?.toLowerCase() || "";
      const email = lead.email?.toLowerCase() || "";
      const phone = lead.phone?.toLowerCase() || "";
      const message = lead.message?.toLowerCase() || "";
      const company = lead.company_name?.toLowerCase() || "";
      const city = lead.city?.toLowerCase() || "";
      const country = lead.country?.toLowerCase() || "";
      const product = lead.product_service?.toLowerCase() || "";
      return (
        name.includes(q) ||
        email.includes(q) ||
        phone.includes(q) ||
        message.includes(q) ||
        company.includes(q) ||
        city.includes(q) ||
        country.includes(q) ||
        product.includes(q)
      );
    });
  }, [leads, searchQuery]);

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-medium tracking-tight text-zinc-900">
              Contact Leads
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 text-zinc-700 border border-zinc-200">
              {leads.length} total
            </span>
          </div>
          <p className="text-sm text-zinc-500 mt-1">
            Inquiries and messages from the contact form. Click any lead to view full dossier.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2.5">
          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads..."
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all placeholder:text-zinc-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Refresh button */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing || loading}
            className="p-2 border border-zinc-200 bg-white hover:bg-zinc-50 rounded-xl text-zinc-600 hover:text-zinc-900 transition-colors disabled:opacity-50 flex-shrink-0"
            title="Refresh leads"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin text-zinc-900" : ""}`}
            />
          </button>
        </div>
      </header>

      {/* Main Content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed border-zinc-300 rounded-2xl">
          <Mail className="w-10 h-10 mx-auto text-zinc-300 mb-4" />
          <p className="text-zinc-500 font-medium text-sm">No leads yet</p>
          <p className="text-zinc-400 text-xs mt-1">
            Submitted inquiries from website visitors will appear here.
          </p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="text-center py-16 bg-white border border-zinc-200 rounded-2xl">
          <Search className="w-8 h-8 mx-auto text-zinc-300 mb-3" />
          <p className="text-zinc-700 font-medium text-sm">
            No leads match "{searchQuery}"
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs font-semibold text-zinc-900 hover:underline"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-sm text-left min-w-[700px]">
              <thead className="bg-zinc-50/80 border-b border-zinc-200 text-zinc-500 font-medium text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Lead Name</th>
                  <th className="px-6 py-4 whitespace-nowrap">Contact Info</th>
                  <th className="px-6 py-4 hidden md:table-cell whitespace-nowrap">
                    Message Preview
                  </th>
                  <th className="px-6 py-4 whitespace-nowrap">Date Received</th>
                  <th className="px-6 py-4 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/80">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead._id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-zinc-50/90 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4 font-medium text-zinc-900 align-top whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 group-hover:bg-zinc-200/80 text-zinc-700 font-semibold text-xs flex items-center justify-center flex-shrink-0 transition-colors">
                          {lead.name ? lead.name.charAt(0).toUpperCase() : "L"}
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                            {lead.name}
                          </p>
                          {lead.company_name && (
                            <p className="text-xs text-zinc-400">{lead.company_name}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col gap-1 text-zinc-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 flex-shrink-0 text-zinc-400" />
                          <a
                            href={`mailto:${lead.email}`}
                            onClick={(e) => e.stopPropagation()}
                            className="hover:text-zinc-900 hover:underline break-all"
                          >
                            {lead.email}
                          </a>
                        </div>
                        {lead.phone ? (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 flex-shrink-0 text-zinc-400" />
                            <a
                              href={`tel:${lead.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="hover:text-zinc-900 hover:underline"
                            >
                              {lead.phone}
                            </a>
                          </div>
                        ) : (
                          <span className="text-xs text-zinc-400 italic">No phone</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 hidden md:table-cell align-top text-zinc-600 max-w-xs lg:max-w-md">
                      <p className="line-clamp-2 text-xs leading-relaxed">
                        {lead.message ? (
                          lead.message
                        ) : (
                          <span className="text-zinc-400 italic">
                            No message provided
                          </span>
                        )}
                      </p>
                    </td>

                    <td className="px-6 py-4 align-top text-zinc-500 whitespace-nowrap text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        {lead.createdAt
                          ? format(new Date(lead.createdAt), "MMM d, yyyy")
                          : "—"}
                      </div>
                    </td>

                    <td className="px-6 py-4 align-top text-right">
                      <div className="inline-flex items-center gap-2">
                        {/* View Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          className="inline-flex items-center gap-1 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 px-2.5 py-1.5 rounded-lg transition-colors text-xs font-medium"
                          title="View lead details"
                        >
                          <Eye className="w-3.5 h-3.5 text-zinc-500" />
                          <span>View</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteLead(lead._id);
                          }}
                          disabled={deletingId === lead._id}
                          className="inline-flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors text-xs font-medium disabled:opacity-50 disabled:pointer-events-none"
                          title="Delete lead"
                        >
                          {deletingId === lead._id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer info */}
          <div className="px-6 py-3 bg-zinc-50/50 border-t border-zinc-200 text-xs text-zinc-500 flex items-center justify-between">
            <span>
              Showing {filteredLeads.length} of {leads.length} lead
              {leads.length === 1 ? "" : "s"}
            </span>
            <span className="text-zinc-400">
              Click any row to open the complete dossier
            </span>
          </div>
        </div>
      )}

      {/* Complete Lead Detail Modal */}
      <LeadDetailModal
        lead={selectedLead}
        isOpen={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        onDelete={deleteLead}
        isDeleting={deletingId === selectedLead?._id}
      />
    </div>
  );
}
