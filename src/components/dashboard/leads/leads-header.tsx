"use client";

import { useState } from "react";
import { contactsAPI } from "@/services/queries/contacts";

type ContactLead = {
  id?: number | string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  subject?: string | null;
  status?: string | null;
  locale?: string | null;
  message?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

type ContactsResponse = {
  data?: ContactLead[] | { data?: ContactLead[]; meta?: Record<string, unknown> };
  meta?: Record<string, unknown>;
};

function escapeCsv(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function parseContactsResponse(payload: ContactsResponse | undefined) {
  const dataNode = payload?.data;
  const nestedDataNode =
    dataNode && !Array.isArray(dataNode) ? dataNode : undefined;

  const rows = Array.isArray(dataNode)
    ? dataNode
    : Array.isArray(nestedDataNode?.data)
      ? nestedDataNode.data
      : [];

  const meta = nestedDataNode?.meta ?? payload?.meta;

  return { rows, meta };
}

function LeadsHeader() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCSV = async () => {
    if (isExporting) return;

    setIsExporting(true);

    try {
      const firstPage = (await contactsAPI(1)) as ContactsResponse;
      const { rows: firstRows, meta } = parseContactsResponse(firstPage);
      const totalPages = Number(
        (meta as { last_page?: number | string } | undefined)?.last_page ?? 1,
      );

      const allRows: ContactLead[] = [...firstRows];

      if (totalPages > 1) {
        for (let page = 2; page <= totalPages; page += 1) {
          const pageResponse = (await contactsAPI(page)) as ContactsResponse;
          const { rows } = parseContactsResponse(pageResponse);
          allRows.push(...rows);
        }
      }

      const headers = [
        "ID",
        "Name",
        "Email",
        "Phone",
        "Subject",
        "Status",
        "Locale",
        "Message",
        "Created At",
        "Updated At",
      ];

      const csvRows = [headers.join(",")];

      for (const lead of allRows) {
        csvRows.push(
          [
            escapeCsv(lead.id),
            escapeCsv(lead.name),
            escapeCsv(lead.email),
            escapeCsv(lead.phone),
            escapeCsv(lead.subject),
            escapeCsv(lead.status),
            escapeCsv(lead.locale),
            escapeCsv(lead.message),
            escapeCsv(lead.created_at),
            escapeCsv(lead.updated_at),
          ].join(","),
        );
      }

      const csvString = csvRows.join("\n");
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `leads_export_${new Date().toISOString().split("T")[0]}.csv`,
      );
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export contacts CSV", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
          Contact Leads
        </h1>
        <p className="text-sm sm:text-base text-white/70">
          View and manage customer inquiries
        </p>
      </div>

      <button
        onClick={handleExportCSV}
        disabled={isExporting}
        className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/80 hover:text-white transition-colors group w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
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
            d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2M5 10V7a2 2 0 012-2h10a2 2 0 012 2v3"
          />
        </svg>
        <span className="text-sm font-medium whitespace-nowrap">
          {isExporting ? "Exporting..." : "Export CSV"}
        </span>
      </button>
    </div>
  );
}

export { LeadsHeader };
