import type { DepositProduct } from "@/types/landing/deposit";

const numberFormatter = new Intl.NumberFormat("ar-SA");

export function extractPriceAmount(price: string): number {
  return Number(price.replace(/[^\d]/g, ""));
}

export function formatSaudiRiyal(amount: number): string {
  return `${numberFormatter.format(amount)} ريال`;
}

export function getRemainingAmount(product: DepositProduct): string {
  const fullPrice = extractPriceAmount(product.fullPrice);
  const depositPrice = extractPriceAmount(product.depositPrice);

  return formatSaudiRiyal(Math.max(fullPrice - depositPrice, 0));
}
