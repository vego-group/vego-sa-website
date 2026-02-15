"use client";

import { useState, useEffect } from "react";
import { LeadDetailsPopup } from "./lead-details-popup";

type TabType = "all" | "new" | "read" | "replied";

type LeadsTableProps = {
  activeTab?: TabType;
  searchQuery?: string;
};

type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  status: "New" | "Read" | "Replied";
};

function LeadsTable({ activeTab = "all", searchQuery = "" }: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: "1",
      name: "John Smith",
      company: "ABC Corporation",
      email: "john.smith@abccorp.com",
      phone: "+1 (555) 123-4567",
      message: "We are interested in implementing an ERP solution for our manufacturing business. Could you provide information about your ERP system, pricing, and implementation timeline? We have 200+ employees and need a scalable solution.",
      date: "Feb 9, 2025",
      status: "New"
    },
    {
      id: "2",
      name: "Emma Wilson",
      company: "TechStart Inc",
      email: "emma.wilson@techstart.com",
      phone: "+1 (555) 987-6543",
      message: "Looking for a cloud-based ERP solution for our growing startup. What modules do you offer for small businesses? We're particularly interested in finance and HR modules.",
      date: "Feb 8, 2025",
      status: "Read"
    },
    {
      id: "3",
      name: "Ahmed Hassan",
      company: "GlobalTech",
      email: "ahmed.hassan@globaltech.ae",
      phone: "+971 50 123 4567",
      message: "We need ERP implementation support for our Dubai office. Do you provide training and ongoing support? We're specifically looking for Arabic language support.",
      date: "Feb 7, 2025",
      status: "Replied"
    }
  ]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter leads by status and search query
  const filteredLeads = leads.filter(lead => {
    // Filter by status
    if (activeTab !== "all" && lead.status.toLowerCase() !== activeTab.toLowerCase()) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(query) ||
        lead.company.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.message.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const handleViewDetails = (id: string) => {
    const lead = leads.find(lead => lead.id === id);
    if (lead) {
      setSelectedLead(lead);
      setIsDetailsOpen(true);
      
      // Mark as read if it was new
      if (lead.status === "New") {
        setLeads(leads.map(l => 
          l.id === id 
            ? { ...l, status: "Read" as const }
            : l
        ));
      }
    }
  };

  const handleMarkAsReplied = (id: string) => {
    setLeads(leads.map(lead => 
      lead.id === id 
        ? { ...lead, status: "Replied" as const }
        : lead
    ));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "New":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
      case "Read":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
      case "Replied":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      default:
        return "bg-white/10 text-white/60";
    }
  };

  if (filteredLeads.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-white/40 text-lg">No leads found</p>
        <p className="text-white/20 text-sm mt-2">Try changing the filter or search query</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-white/70">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-xs font-medium text-white/50 uppercase tracking-wider">
          <div className="col-span-3">Name & Company</div>
          <div className="col-span-3">Contact Info</div>
          <div className="col-span-3">Message Preview</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-white/10">
          {filteredLeads.map((lead) => (
            <div 
              key={lead.id} 
              className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => handleViewDetails(lead.id)}
            >
              {/* Name & Company */}
              <div className="col-span-3">
                <h3 className="text-sm font-medium text-white mb-1">
                  {lead.name}
                </h3>
                <p className="text-xs text-white/50">
                  {lead.company}
                </p>
              </div>

              {/* Contact Info */}
              <div className="col-span-3">
                <p className="text-sm text-white/80 mb-1">
                  {lead.email}
                </p>
                <p className="text-xs text-white/50">
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

              {/* Status */}
              <div className="col-span-1">
                <span className={`inline-flex px-3 py-1.5 text-xs rounded-full font-medium ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex items-start justify-end gap-1">
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
                {lead.status !== "Replied" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsReplied(lead.id);
                    }}
                    className="p-2 hover:bg-emerald-500/10 rounded-lg transition-colors text-white/60 hover:text-emerald-400"
                    title="Mark as replied"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" 
                      />
                    </svg>
                  </button>
                )}
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
        onMarkAsReplied={handleMarkAsReplied}
      />
    </>
  );
}

export { LeadsTable };