"use client";

import { useState } from "react";
import { SkeletonCard } from "@/components/skeleton/card";
import { PAGE_SIZE } from "@/constants";
import { useContacts } from "@/hooks/api/contact";
import { BlogsPagination } from "../blogs/blogs-pagination";
import { LeadDetailsPopup } from "./lead-details-popup";

type LeadsTableProps = {
  searchQuery?: string;
};

type ApiLead = {
  id: number | string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  subject?: string | null;
  status?: string | null;
  locale?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  date?: string;
  category?: string;
};

function formatLeadDate(value?: string | null) {
  if (!value) return "N/A";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getText(value?: string | null, fallback = "N/A") {
  const normalized = value?.trim();
  return normalized ? normalized : fallback;
}

function getCategoryColor(category?: string | null) {
  switch ((category ?? "").toLowerCase()) {
    case "general":
    case "general inquiry":
      return "bg-purple-500/20 text-purple-400 border border-purple-500/30";
    case "products":
      return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
    case "partnership":
      return "bg-green-500/20 text-green-400 border border-green-500/30";
    case "support":
      return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
    case "jobs":
      return "bg-pink-500/20 text-pink-400 border border-pink-500/30";
    default:
      return "bg-white/10 text-white/60 border border-white/10";
  }
}

function getStatusColor(status?: string | null) {
  switch ((status ?? "").toLowerCase()) {
    case "new":
      return "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
    case "contacted":
      return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
    case "in progress":
      return "bg-amber-500/20 text-amber-300 border border-amber-500/30";
    case "resolved":
    case "closed":
      return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30";
    default:
      return "bg-white/10 text-white/60 border border-white/10";
  }
}

function LeadsTableContent({ searchQuery }: Required<LeadsTableProps>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState<ApiLead | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { data, isLoading, isFetching } = useContacts(currentPage);

  const payload = data as
    | {
        data?: ApiLead[] | { data?: ApiLead[]; meta?: Record<string, unknown> };
        meta?: Record<string, unknown>;
      }
    | undefined;

  const dataNode = payload?.data;
  const leads = Array.isArray(dataNode)
    ? dataNode
    : Array.isArray(dataNode?.data)
      ? dataNode.data
      : [];

  const meta =
    dataNode && !Array.isArray(dataNode) && dataNode.meta
      ? dataNode.meta
      : payload?.meta;

  const filteredLeads = leads.filter((lead) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();

    return Boolean(
      [lead.name, lead.email, lead.message, lead.subject, lead.phone].find(
        (text) => (text ?? "").toLowerCase().includes(query),
      ),
    );
  });

  const hasServerPagination = Boolean(
    meta && (meta as { last_page?: number | string }).last_page,
  );
  const totalPages = hasServerPagination
    ? Number((meta as { last_page?: number | string }).last_page ?? 1)
    : Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));
  const activePage = hasServerPagination
    ? Number((meta as { current_page?: number | string }).current_page ?? 1)
    : currentPage;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const visibleLeads = hasServerPagination
    ? filteredLeads
    : filteredLeads.slice(
        (currentPage - 1) * PAGE_SIZE,
        (currentPage - 1) * PAGE_SIZE + PAGE_SIZE,
      );

  const handleViewDetails = (id: ApiLead["id"]) => {
    const lead = leads.find((item) => item.id === id);
    if (!lead) return;

    setSelectedLead({
      ...lead,
      subject: lead.subject ?? "Not specified",
      created_at: lead.created_at ?? null,
      // Keep popup compatibility without normalizing the table rows.
      date: formatLeadDate(lead.created_at),
      category: getText(lead.subject, "Not specified"),
    } as ApiLead);
    setIsDetailsOpen(true);
  };

  if (isLoading) {
    return <SkeletonCard className="sm:h-100" />;
  }

  if (filteredLeads.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16 px-4">
        <p className="text-white/40 text-base sm:text-lg">No leads found</p>
        <p className="text-white/20 text-xs sm:text-sm mt-2">
          Try changing the search query
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="block sm:hidden divide-y divide-white/10">
        {visibleLeads.map((lead) => (
          <div
            key={lead.id}
            className="p-4 hover:bg-white/5 transition-colors cursor-pointer"
            onClick={() => handleViewDetails(lead.id)}
          >
            <div className="flex justify-between items-start mb-3 gap-3">
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-white truncate">
                  {getText(lead.name)}
                </h3>
                <span
                  className={`inline-flex mt-1 px-2 py-1 text-xs rounded-full font-medium ${getCategoryColor(lead.subject)}`}
                >
                  {getText(lead.subject, "Not specified")}
                </span>
              </div>
              <span className="text-xs text-white/50 whitespace-nowrap">
                {formatLeadDate(lead.created_at)}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              <p className="text-xs text-white/80 break-all">
                {getText(lead.email)}
              </p>
              <p className="text-xs text-white/60">{getText(lead.phone)}</p>
              <p className="text-sm text-white/80 line-clamp-2">
                {getText(lead.message, "No message")}
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
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto text-white/70 sm:block">
        <div className="min-w-220">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/10 text-xs font-medium text-white/50 uppercase tracking-wider">
            <div className="col-span-2">Name</div>
            <div className="col-span-2">Contact Info</div>
            <div className="col-span-3">Message Preview</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-2">Category</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          <div className="divide-y divide-white/10">
            {visibleLeads.map((lead) => (
              <div
                key={lead.id}
                className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => handleViewDetails(lead.id)}
              >
              <div className="col-span-2">
                <h3
                  className="text-sm font-medium text-white mb-1 truncate"
                  title={getText(lead.name)}
                >
                  {getText(lead.name)}
                </h3>
              </div>

              <div className="col-span-2">
                <p
                  className="text-sm text-white/80 mb-1 truncate"
                  title={getText(lead.email)}
                >
                  {getText(lead.email)}
                </p>
                <p
                  className="text-xs text-white/50 truncate"
                  title={getText(lead.phone)}
                >
                  {getText(lead.phone)}
                </p>
              </div>

              <div className="col-span-3">
                <p className="text-sm text-white/80 truncate">
                  {getText(lead.message, "No message")}
                </p>
              </div>

              <div className="col-span-1">
                <span className="text-sm text-white/60">
                  {formatLeadDate(lead.created_at)}
                </span>
              </div>

              <div className="col-span-2">
                <span
                  className={`inline-flex px-3 py-1.5 text-xs rounded-full font-medium ${getCategoryColor(lead.subject)}`}
                >
                  {getText(lead.subject, "Not specified")}
                </span>
              </div>

              <div className="col-span-1">
                <span
                  className={`inline-flex px-3 py-1.5 text-xs rounded-full font-medium ${getStatusColor(lead.status)}`}
                >
                  {getText(lead.status, "No status")}
                </span>
              </div>

              <div className="col-span-1 flex items-start justify-end gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(lead.id);
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                  title="View details"
                >
                  <svg
                    className="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BlogsPagination
        pageNumbers={pageNumbers}
        activePage={activePage}
        totalPages={totalPages}
        isFetching={isFetching}
        onPageChange={setCurrentPage}
        onPrev={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
        onNext={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
      />

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

function LeadsTable({ searchQuery = "" }: LeadsTableProps) {
  return <LeadsTableContent key={searchQuery} searchQuery={searchQuery} />;
}

export { LeadsTable };
