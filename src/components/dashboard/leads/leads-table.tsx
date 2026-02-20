"use client";

import { useState } from "react";
import { LeadDetailsPopup } from "./lead-details-popup";

type LeadsTableProps = {
  searchQuery?: string;
};

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  category: string;
};

function LeadsTable({ searchQuery = "" }: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@abccorp.com",
      phone: "+1 (555) 123-4567",
      message: "We are interested in implementing an ERP solution for our manufacturing business. Could you provide information about your ERP system, pricing, and implementation timeline? We have 200+ employees and need a scalable solution.",
      date: "Feb 9, 2025",
      category: "Products"
    },
    {
      id: "2",
      name: "Emma Wilson",
      email: "emma.wilson@techstart.com",
      phone: "+1 (555) 987-6543",
      message: "Looking for a cloud-based ERP solution for our growing startup. What modules do you offer for small businesses? We're particularly interested in finance and HR modules.",
      date: "Feb 8, 2025",
      category: "General Inquiry"
    },
    {
      id: "3",
      name: "Ahmed Hassan",
      email: "ahmed.hassan@globaltech.ae",
      phone: "+971 50 123 4567",
      message: "We need ERP implementation support for our Dubai office. Do you provide training and ongoing support? We're specifically looking for Arabic language support.",
      date: "Feb 7, 2025",
      category: "Support"
    }
  ]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredLeads = leads.filter(lead => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.message.toLowerCase().includes(query) ||
        lead.category?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const handleViewDetails = (id: string) => {
    const lead = leads.find(lead => lead.id === id);
    if (lead) {
      setSelectedLead(lead);
      setIsDetailsOpen(true);
    }
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
      case "General Inquiry":
        return "bg-purple-500/20 text-purple-400 border border-purple-500/30";
      case "Products":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "Partnership":
        return "bg-green-500/20 text-green-400 border border-green-500/30";
      case "Support":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
      case "Jobs":
        return "bg-pink-500/20 text-pink-400 border border-pink-500/30";
      default:
        return "bg-white/10 text-white/60 border border-white/10";
    }
  };

  if (filteredLeads.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 px-4">
        <p className="text-white/40 text-base sm:text-lg">No leads found</p>
        <p className="text-white/20 text-xs sm:text-sm mt-2">Try changing the search query</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile View (Cards) */}
      <div className="block sm:hidden divide-y divide-white/10">
        {filteredLeads.map((lead) => (
          <div 
            key={lead.id} 
            className="p-4 hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => handleViewDetails(lead.id)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-sm font-medium text-white">{lead.name}</h3>
                <span className={`inline-flex mt-1 px-2 py-1 text-xs rounded-full font-medium ${getCategoryColor(lead.category)}`}>
                  {lead.category || "Not specified"}
                </span>
              </div>
              <span className="text-xs text-white/50">{lead.date}</span>
            </div>
            
            <div className="space-y-2 mb-3">
              <p className="text-xs text-white/80 break-all">{lead.email}</p>
              <p className="text-xs text-white/60">{lead.phone}</p>
              <p className="text-sm text-white/80 line-clamp-2">
                {lead.message}
              </p>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(lead.id);
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                title="View details"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View (Table) */}
      <div className="hidden sm:block text-white/70">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-xs font-medium text-white/50 uppercase tracking-wider">
          <div className="col-span-2">Name</div>
          <div className="col-span-2">Contact Info</div>
          <div className="col-span-3">Message Preview</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/10">
          {filteredLeads.map((lead) => (
            <div 
              key={lead.id} 
              className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => handleViewDetails(lead.id)}
            >
              {/* Name */}
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-white mb-1 truncate" title={lead.name}>
                  {lead.name}
                </h3>
              </div>

              {/* Contact Info */}
              <div className="col-span-2">
                <p className="text-sm text-white/80 mb-1 truncate" title={lead.email}>
                  {lead.email}
                </p>
                <p className="text-xs text-white/50 truncate" title={lead.phone}>
                  {lead.phone}
                </p>
              </div>

              {/* Message Preview */}
              <div className="col-span-3">
                <p className="text-sm text-white/80 line-clamp-2">
                  {lead.message}
                </p>
              </div>

              {/* Date */}
              <div className="col-span-1">
                <span className="text-sm text-white/60">
                  {lead.date}
                </span>
              </div>

              {/* Category */}
              <div className="col-span-2">
                <span className={`inline-flex px-3 py-1.5 text-xs rounded-full font-medium ${getCategoryColor(lead.category)}`}>
                  {lead.category || "Not specified"}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-start justify-end gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(lead.id);
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                  title="View details"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LeadDetailsPopup
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedLead(null);
        }}
        lead={selectedLead}
      />
    </>
  );
}

export { LeadsTable };