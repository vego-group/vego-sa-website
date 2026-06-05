"use client";

import { useState } from "react";
import { preOrdersAPI } from "@/services/queries/pre-orders";
import type { PreOrdersApiListResponse } from "@/types/dashboard/pre-orders";
import { SaudiRiyal } from "lucide-react";

function escapeCsv(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function PreOrdersHeader() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCSV = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      const firstPage = (await preOrdersAPI(1)) as PreOrdersApiListResponse;
      const totalPages = firstPage?.meta?.last_page ?? 1;
      const allRows = [...(firstPage?.data ?? [])];

      for (let page = 2; page <= totalPages; page++) {
        const pageData = (await preOrdersAPI(page)) as PreOrdersApiListResponse;
        allRows.push(...(pageData?.data ?? []));
      }

      const headers = [
        "ID",
        "Customer Name",
        "Phone",
        "Email",
        "City",
        "Product",
        "Deposit Amount",
        "Payment Reference",
        "Payment Status",
        "Order Status",
        "Created At",
      ];

      const csvRows = [
        headers.join(","),
        ...allRows.map((row) =>
          [
            escapeCsv(row.id),
            escapeCsv(row.customer_name),
            escapeCsv(row.phone),
            escapeCsv(row.email),
            escapeCsv(row.city),
            escapeCsv(row.product_name),
            escapeCsv(row.deposit_amount),
            escapeCsv(row.payment_reference),
            escapeCsv(row.payment_status.label),
            escapeCsv(row.status.label),
            escapeCsv(row.created_at),
          ].join(","),
        ),
      ];

      const blob = new Blob([csvRows.join("\n")], {
        type: "text/csv;charset=utf-8;",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `pre_orders_${new Date().toISOString().split("T")[0]}.csv`,
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to export pre-orders CSV", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
          Pre Orders
        </h1>
        <p className="text-sm sm:text-base text-white/70">
          Track and manage customer pre-orders
        </p>
      </div>
      <button
        onClick={handleExportCSV}
        disabled={isExporting}
        className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/80 hover:text-white transition-colors w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
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

export { PreOrdersHeader };
