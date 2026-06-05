export type PreOrderStatusValue = "pending" | "confirmed" | "cancelled";
export type PreOrderPaymentStatusValue =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export type PreOrderStatusField = {
  value: PreOrderStatusValue;
  label: string;
};

export type PreOrderPaymentStatusField = {
  value: PreOrderPaymentStatusValue;
  label: string;
};

export type PreOrder = {
  id: number;
  customer_name: string;
  phone: string;
  email: string;
  city: string;
  product_name: string;
  deposit_amount: string;
  payment_reference: string | null;
  payment_status: PreOrderPaymentStatusField;
  status: PreOrderStatusField;
  created_at: string;
};

export type PreOrdersStatistics = {
  total_preorders: number;
  pending_preorders: number;
  approved_preorders: number;
  cancelled_preorders: number;
  total_deposit_amount: string;
};

export type PreOrdersMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{ url: string | null; label: string; active: boolean }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type PreOrdersLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type PreOrdersFilters = {
  status?: PreOrderStatusValue;
  payment_status?: PreOrderPaymentStatusValue;
  from_date?: string;
  to_date?: string;
  sort?: "asc" | "desc";
};

export type PreOrdersApiListResponse = {
  data: PreOrder[];
  links: PreOrdersLinks;
  meta: PreOrdersMeta;
  analytics?: PreOrdersStatistics;
  statistics?: PreOrdersStatistics;
};
