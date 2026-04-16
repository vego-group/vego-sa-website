"use client";

import { useState } from "react";

import { testDriveRegistrationsAPI } from "@/services/queries";

type TestDriveRegistration = {
  id?: number | string;
  name?: string | null;
  email?: string | null;
  phone_number?: string | null;
  age?: number | null;
  gender?: string | null;
  product?: string | null;
  time_and_day?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

type TestDriveResponse = {
  data?:
    | TestDriveRegistration[]
    | {
        data?: TestDriveRegistration[];
        meta?: Record<string, unknown>;
      };
  meta?: Record<string, unknown>;
};

function escapeCsv(value: unknown) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function parseTestDriveResponse(payload: TestDriveResponse | undefined) {
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

function TestDriveHeader() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCSV = async () => {
    if (isExporting) return;

    setIsExporting(true);

    try {
      const firstPage = (await testDriveRegistrationsAPI(1)) as TestDriveResponse;
      const { rows: firstRows, meta } = parseTestDriveResponse(firstPage);
      const totalPages = Number(
        (meta as { last_page?: number | string } | undefined)?.last_page ?? 1,
      );

      const allRows: TestDriveRegistration[] = [...firstRows];

      if (totalPages > 1) {
        for (let page = 2; page <= totalPages; page += 1) {
          const pageResponse = (await testDriveRegistrationsAPI(
            page,
          )) as TestDriveResponse;
          const { rows } = parseTestDriveResponse(pageResponse);
          allRows.push(...rows);
        }
      }

      const headers = [
        "ID",
        "Name",
        "Email",
        "Phone Number",
        "Age",
        "Gender",
        "Product",
        "Time And Day",
        "Created At",
        "Updated At",
      ];

      const csvRows = [headers.join(",")];

      for (const registration of allRows) {
        csvRows.push(
          [
            escapeCsv(registration.id),
            escapeCsv(registration.name),
            escapeCsv(registration.email),
            escapeCsv(registration.phone_number),
            escapeCsv(registration.age),
            escapeCsv(registration.gender),
            escapeCsv(registration.product),
            escapeCsv(registration.time_and_day),
            escapeCsv(registration.created_at),
            escapeCsv(registration.updated_at),
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
        `test_drive_export_${new Date().toISOString().split("T")[0]}.csv`,
      );
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export test drive CSV", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Test Drive Registrations
        </h1>
        <p className="text-sm text-white/70 sm:text-base">
          View and manage submitted test drive requests
        </p>
      </div>

      <button
        onClick={handleExportCSV}
        disabled={isExporting}
        className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:justify-start"
      >
        <svg
          className="h-4 w-4 shrink-0"
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
        <span className="whitespace-nowrap text-sm font-medium">
          {isExporting ? "Exporting..." : "Export Excel"}
        </span>
      </button>
    </div>
  );
}

export { TestDriveHeader };
