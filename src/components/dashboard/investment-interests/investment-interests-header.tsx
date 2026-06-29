"use client";

import { useState } from "react";

import type { InvestmentInterestsResponse } from "@/types/dashboard/investment-interests";
import { investmentInterestsAPI } from "@/services/queries/investment-interests";
import { formatInvestmentTicketType } from "./investment-ticket-type";

function InvestmentInterestsHeader() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCSV = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      const allRows = await fetchAllRows();
      const csvRows = [
        ["ID", "Full Name", "Phone", "Email", "Ticket Type", "Created At"].join(","),
        ...allRows.map((row) =>
          [
            escapeCsv(row.id),
            escapeCsv(row.full_name),
            escapeCsv(row.phone_number),
            escapeCsv(row.email),
            escapeCsv(formatInvestmentTicketType(row.ticket_type)),
            escapeCsv(row.created_at),
          ].join(","),
        ),
      ];

      downloadCsv(csvRows.join("\n"));
    } catch (error) {
      console.error("Failed to export investment interests CSV", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Investment Interests
        </h1>
        <p className="text-sm text-white/70 sm:text-base">
          View and manage submitted investment requests
        </p>
      </div>
      <button
        onClick={handleExportCSV}
        disabled={isExporting}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <span className="text-sm font-medium">
          {isExporting ? "Exporting..." : "Export CSV"}
        </span>
      </button>
    </div>
  );
}

async function fetchAllRows() {
  const firstPage = (await investmentInterestsAPI(1)) as InvestmentInterestsResponse;
  const rows = [...(firstPage.data ?? [])];
  const totalPages = Number(firstPage.meta?.last_page ?? 1);

  for (let page = 2; page <= totalPages; page += 1) {
    const response = (await investmentInterestsAPI(page)) as InvestmentInterestsResponse;
    rows.push(...(response.data ?? []));
  }

  return rows;
}

function escapeCsv(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function downloadCsv(csvString: string) {
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.download = `investment_interests_${new Date().toISOString().split("T")[0]}.csv`;
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export { InvestmentInterestsHeader };
