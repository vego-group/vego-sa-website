import type { FaqApiItem } from "./types";

function isFaqPublished(faq: FaqApiItem) {
  const rawIsActive = String(faq.is_active ?? "").toLowerCase();
  const rawStatus = String(faq.status ?? "").toLowerCase();
  return (
    rawIsActive === "1" ||
    rawIsActive === "true" ||
    rawStatus === "publish" ||
    rawStatus === "published" ||
    rawStatus === "active" ||
    rawStatus === "1" ||
    Boolean(faq.published_at)
  );
}

function getFaqOrder(faq: FaqApiItem) {
  return Number(faq.display_order ?? faq.order ?? faq.sort_order ?? 0) || "-";
}

function getDashboardFaqItems(data: unknown): FaqApiItem[] {
  const payload = (data as { data?: unknown } | undefined)?.data;
  const payloadData = Array.isArray(payload)
    ? undefined
    : (payload as { data?: unknown } | undefined)?.data;

  if (Array.isArray(payload)) return payload as FaqApiItem[];
  if (Array.isArray(payloadData)) return payloadData as FaqApiItem[];

  const nested = (payloadData as { data?: unknown } | undefined)?.data;
  if (Array.isArray(nested)) return nested as FaqApiItem[];

  return [];
}

function getDashboardFaqMeta(data: unknown) {
  const payload = (data as { data?: unknown } | undefined)?.data;
  const payloadObj = Array.isArray(payload)
    ? undefined
    : (payload as { meta?: unknown; data?: unknown } | undefined);
  const payloadData = payloadObj?.data;
  const payloadDataObj = Array.isArray(payloadData)
    ? undefined
    : (payloadData as { meta?: unknown } | undefined);

  return payloadObj?.meta ?? payloadDataObj?.meta;
}

export { getDashboardFaqItems, getDashboardFaqMeta, getFaqOrder, isFaqPublished };
