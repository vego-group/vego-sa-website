"use client";

import Image from "next/image";
import { SaudiRiyal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, type ReactElement } from "react";

import { SkeletonCard } from "@/components/skeleton/card";
import { useProduct } from "@/hooks";
import type { DepositProductSummaryProps } from "@/interfaces/landing/deposit";

const getPriceAmount = (price: string): string =>
  price.replace(/\s*(ريال سعودي|ريال|ر\.س|SAR)\s*/gi, "").trim();

const parsePrice = (price: string): number =>
  Number(getPriceAmount(price).replace(/,/g, ""));

const formatPrice = (amount: number): string =>
  Number.isInteger(amount) ? String(amount) : amount.toFixed(2);

function PriceValue({
  value,
  className,
  iconClassName,
}: {
  value: string;
  className: string;
  iconClassName: string;
}): ReactElement {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span>{getPriceAmount(value)}</span>
      <SaudiRiyal aria-hidden="true" className={iconClassName} />
    </span>
  );
}

function DepositProductSummarySkeleton({
  variant,
}: Pick<DepositProductSummaryProps, "variant">): ReactElement {
  const isReview = variant === "review";

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-secondary/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(0,17,45,0.76)_50%,rgba(0,214,111,0.1))] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:p-5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <SkeletonCard
          className={`rounded-2xl bg-white/12 lg:shrink-0 ${
            isReview
              ? "aspect-[1.75/1] h-auto lg:w-64"
              : "aspect-[1.75/1] h-auto lg:w-72"
          }`}
        />

        <div className="flex-1 space-y-3 lg:px-4">
          <SkeletonCard className="ms-auto h-4 w-32 rounded-full bg-white/10" />
          <SkeletonCard className="ms-auto h-10 w-64 max-w-full rounded-full bg-white/10" />
          <SkeletonCard className="ms-auto h-5 w-full max-w-md rounded-full bg-white/10" />
          <SkeletonCard className="ms-auto h-5 w-8/12 rounded-full bg-white/10" />
        </div>

        <div className="grid gap-4 rounded-3xl border border-white/12 bg-white/6 p-5 sm:min-w-80 lg:w-[26rem]">
          <SkeletonCard className="h-8 rounded-full bg-white/10" />
          <SkeletonCard className="h-10 rounded-full bg-white/10" />
          <SkeletonCard className="h-8 rounded-full bg-white/10" />
        </div>
      </div>
    </section>
  );
}

function DepositProductSummary({
  productSlug,
  variant = "compact",
}: DepositProductSummaryProps): ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, isLoading } = useProduct(productSlug);
  const isReview = variant === "review";
  const product = data?.data;

  useEffect(() => {
    if (!isLoading && !product && searchParams.get("payment") !== "failed") {
      router.replace("/landing");
    }
  }, [isLoading, product, router, searchParams]);

  if (isLoading || !product) {
    return <DepositProductSummarySkeleton variant={variant} />;
  }

  const features = product.features ?? [];
  const remainingAmount = Math.max(
    parsePrice(product.total_price) - parsePrice(product.deposit),
    0,
  );

  return (
    <section className="w-full overflow-hidden rounded-3xl border border-secondary/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(0,17,45,0.76)_50%,rgba(0,214,111,0.1))] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:p-5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <figure
          className={`relative overflow-hidden rounded-2xl bg-white lg:shrink-0 ${
            isReview ? "aspect-[1.75/1] lg:w-64" : "aspect-[1.75/1] lg:w-72"
          }`}
        >
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes={isReview ? "256px" : "(min-width: 1024px) 288px, 90vw"}
          />
        </figure>

        <div className="flex-1 space-y-3 lg:px-4">
          <p className="text-sm font-bold text-white/62">الدراجة المختارة</p>
          <h2 className="ms-auto max-w-sm text-2xl font-bold leading-tight text-white sm:text-4xl">
            {product.name}
          </h2>

          {features.length > 0 ? (
            <dl className="grid gap-2 pt-2 sm:grid-cols-2">
              {features.map((feature) => (
                <div
                  key={`${feature.label}-${feature.value}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3"
                >
                  <dt className="text-xs font-bold text-white/45">
                    {feature.label}
                  </dt>
                  <dd className="mt-1 text-sm font-black text-white/82">
                    {feature.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        <div className="grid gap-4 rounded-3xl border border-white/12 bg-white/6 p-5 sm:min-w-80 lg:w-[26rem]">
          <div className="flex flex-row items-center justify-between gap-6">
            <span className="text-end text-sm leading-6 text-white/52">
              السعر الإجمالي:
            </span>
            <PriceValue
              value={product.total_price}
              className="text-start text-lg font-black text-white"
              iconClassName="size-4"
            />
          </div>

          <div className="flex flex-row items-center justify-between gap-6">
            <span className="text-end text-sm leading-6 text-white/52">
              العربون ({product.deposit_percentage}%):
            </span>
            <PriceValue
              value={product.deposit}
              className="text-start text-3xl font-black leading-none text-secondary"
              iconClassName="size-7"
            />
          </div>
          <div className="flex flex-row items-center justify-between gap-6 border-t border-white/10 pt-4">
            <span className="text-end text-sm leading-6 text-white/52">
              المبلغ المتبقي عند الاستلام:
            </span>
            <PriceValue
              value={formatPrice(remainingAmount)}
              className="text-start text-base font-black text-white"
              iconClassName="size-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DepositProductSummary;
