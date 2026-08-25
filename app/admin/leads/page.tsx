"use client";

import { useState, useEffect } from "react";
import { Loader2, Mail, Phone, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto w-full">
      <header className="mb-8">
        <h2 className="text-2xl font-medium tracking-tight text-zinc-900">
          Contact Leads
        </h2>
        <p className="text-sm text-zinc-500 mt-1">
          Inquiries and messages from the contact form.
        </p>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-300" />
        </div>
      ) : leads.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed border-zinc-300 rounded-2xl">
          <Mail className="w-10 h-10 mx-auto text-zinc-300 mb-4" />
          <p className="text-zinc-500 font-medium text-sm">No leads yet</p>
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-medium">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4 hidden md:table-cell">Message</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-900 align-top">
                      {lead.name}
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col gap-1 text-zinc-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5" />
                          <a href={`mailto:${lead.email}`} className="hover:text-zinc-900 hover:underline">
                            {lead.email}
                          </a>
                        </div>
                        {lead.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5" />
                            <a href={`tel:${lead.phone}`} className="hover:text-zinc-900 hover:underline">
                              {lead.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell align-top text-zinc-600 max-w-md truncate">
                      {lead.message || <span className="text-zinc-400 italic">No message provided</span>}
                    </td>
                    <td className="px-6 py-4 align-top text-zinc-500 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(lead.createdAt), "MMM d, yyyy")}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
