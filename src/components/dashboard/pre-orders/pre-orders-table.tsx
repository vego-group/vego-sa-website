"use client";

import { useState } from "react";
import { SkeletonCard } from "@/components/skeleton/card";
import { usePreOrders } from "@/hooks/api/pre-orders";
import { Trash2 } from "lucide-react";
import { BlogsPagination } from "../blogs/blogs-pagination";
import { DeletePreOrderConfirmationPopup } from "./delete-pre-order-confirmation-popup";
import { PreOrderDetailsPopup } from "./pre-order-details-popup";
import type {
  PreOrder,
  PreOrdersApiListResponse,
  PreOrdersFilters,
} from "@/types/dashboard/pre-orders";

type PreOrdersTableProps = {
  filters: PreOrdersFilters;
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getOrderStatusColor(value: string) {
  const map: Record<string, string> = {
    pending: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    confirmed: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    cancelled: "bg-red-500/20 text-red-400 border border-red-500/30",
  };
  return map[value] ?? "bg-white/10 text-white/60 border border-white/10";
}

function getPaymentStatusColor(value: string) {
  const map: Record<string, string> = {
    pending: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    paid: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    failed: "bg-red-500/20 text-red-400 border border-red-500/30",
    refunded: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
  };
  return map[value] ?? "bg-white/10 text-white/60 border border-white/10";
}

const thClass =
  "px-4 py-3.5 text-left text-[11px] font-medium text-white/40 uppercase tracking-wider whitespace-nowrap";

const tdClass = "px-4 py-4 align-top";

function PreOrdersTableContent({ filters }: PreOrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPreOrder, setSelectedPreOrder] = useState<PreOrder | null>(null);
  const [preOrderToDelete, setPreOrderToDelete] = useState<PreOrder | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading, isFetching } = usePreOrders(currentPage, filters);
  const response = data as PreOrdersApiListResponse | undefined;
  const preOrders = response?.data ?? [];
  const meta = response?.meta;
  const totalPages = meta?.last_page ?? 1;
  const activePage = meta?.current_page ?? currentPage;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleView = (preOrder: PreOrder) => {
    setSelectedPreOrder(preOrder);
    setIsDetailsOpen(true);
  };

  const handleDeleteClick = (preOrder: PreOrder) => {
    setPreOrderToDelete(preOrder);
    setIsDeleteOpen(true);
  };

  if (isLoading) {
    return <SkeletonCard className="h-80" />;
  }

  if (preOrders.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <p className="text-white/40 text-base">No pre-orders found</p>
        <p className="text-white/20 text-sm mt-1">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-160">
          <thead>
            <tr className="border-b border-white/10">
              <th className={thClass}>Customer</th>
              <th className={`${thClass} hidden sm:table-cell`}>Contact</th>
              <th className={`${thClass} hidden md:table-cell`}>Product</th>
              <th className={thClass}>Deposit</th>
              <th className={thClass}>Payment</th>
              <th className={thClass}>Status</th>
              <th className={`${thClass} hidden lg:table-cell`}>Date</th>
              <th className={`${thClass} text-right`}>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {preOrders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => handleView(order)}
              >
                {/* Customer */}
                <td className={tdClass}>
                  <p className="text-sm font-medium text-white whitespace-nowrap">
                    {order.customer_name}
                  </p>
                  <p className="text-xs text-white/40 mt-0.5">{order.city}</p>
                </td>

                {/* Contact — hidden on mobile */}
                <td className={`${tdClass} hidden sm:table-cell`}>
                  <p className="text-sm text-white/80 max-w-40 truncate" title={order.email}>
                    {order.email}
                  </p>
                  <p className="text-xs text-white/50 mt-0.5 whitespace-nowrap">
                    +{order.phone}
                  </p>
                </td>

                {/* Product — hidden on small screens */}
                <td className={`${tdClass} hidden md:table-cell`}>
                  <p className="text-sm text-white/80 max-w-35 truncate" title={order.product_name}>
                    {order.product_name}
                  </p>
                </td>

                {/* Deposit */}
                <td className={tdClass}>
                  <p className="text-sm font-semibold text-white whitespace-nowrap">
                    {order.deposit_amount}
                  </p>
                  <p className="text-xs text-white/40">SAR</p>
                </td>

                {/* Payment Status */}
                <td className={tdClass}>
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs rounded-full font-medium whitespace-nowrap ${getPaymentStatusColor(order.payment_status.value)}`}
                  >
                    {order.payment_status.label}
                  </span>
                </td>

                {/* Order Status */}
                <td className={tdClass}>
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs rounded-full font-medium whitespace-nowrap ${getOrderStatusColor(order.status.value)}`}
                  >
                    {order.status.label}
                  </span>
                </td>

                {/* Date — hidden on small screens */}
                <td className={`${tdClass} hidden lg:table-cell`}>
                  <span className="text-sm text-white/50 whitespace-nowrap">
                    {formatDate(order.created_at)}
                  </span>
                </td>

                {/* Actions */}
                <td className={`${tdClass} text-right`}>
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(order);
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/50 hover:text-white"
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
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(order);
                      }}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/50 hover:text-red-400"
                      title="Delete pre-order"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BlogsPagination
        pageNumbers={pageNumbers}
        activePage={activePage}
        totalPages={totalPages}
        isFetching={isFetching}
        onPageChange={(page) => setCurrentPage(page)}
        onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
        onNext={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
      />

      <PreOrderDetailsPopup
        isOpen={isDetailsOpen}
        onClose={() => { setIsDetailsOpen(false); setSelectedPreOrder(null); }}
        preOrder={selectedPreOrder}
      />

      <DeletePreOrderConfirmationPopup
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setPreOrderToDelete(null);
        }}
        id={preOrderToDelete?.id}
        customerName={preOrderToDelete?.customer_name}
        paymentStatus={preOrderToDelete?.payment_status.value}
      />
    </>
  );
}

function PreOrdersTable({ filters }: PreOrdersTableProps) {
  return <PreOrdersTableContent key={JSON.stringify(filters)} filters={filters} />;
}

export { PreOrdersTable };
