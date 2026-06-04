"use client";

import type { ReactElement } from "react";
import { PackageSearch, RefreshCw } from "lucide-react";

import { SkeletonCard } from "@/components/skeleton/card";
import { useProducts } from "@/hooks";
import type { CollectionProduct, ProductApiItem } from "@/types/landing/home";
import CollectionProductCard from "./CollectionProductCard";

type CollectionGridProps = {
  products: CollectionProduct[];
};

const formatProductPrice = (price: string): string => price;

const createProductId = (product: ProductApiItem): string =>
  product.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || product.name;

const mapApiProductToCollectionProduct = (
  product: ProductApiItem,
  fallbackProduct?: CollectionProduct,
): CollectionProduct => ({
  id: createProductId(product),
  name: product.name,
  description: product.description,
  badge: product.badge,
  image: {
    src: product.image_url,
    alt: product.name,
  },
  fullPriceLabel: fallbackProduct?.fullPriceLabel ?? "Full price:",
  fullPrice: formatProductPrice(product.total_price),
  depositLabel:
    fallbackProduct?.depositLabel ??
    `Deposit (${product.deposit_percentage}%):`,
  depositPrice: formatProductPrice(product.deposit),
  cta: {
    label: fallbackProduct?.cta.label ?? "Reserve now",
    target: fallbackProduct?.cta.target ?? "contact",
  },
});

function CollectionProductCardSkeleton(): ReactElement {
  return (
    <article className="overflow-hidden rounded-[1.6rem] border border-white/12 bg-[linear-gradient(135deg,rgba(0,214,111,0.11)_0%,rgba(0,17,45,0.64)_42%,rgba(3,5,33,0.88)_100%)] p-2.5 shadow-[0_30px_80px_rgba(0,0,0,0.18)]">
      <SkeletonCard className="aspect-[1.72/1] h-auto rounded-[1.25rem] bg-white/10" />

      <div className="flex flex-col gap-7 ps-4 pe-4 pb-4 pt-7 sm:ps-5 sm:pe-5 sm:pb-5">
        <div className="space-y-3">
          <SkeletonCard className="ms-auto h-9 w-44 rounded-full bg-white/10" />
          <SkeletonCard className="ms-auto h-4 w-9/12 rounded-full bg-white/10" />
        </div>

        <div className="grid gap-5 border-t border-white/6 pt-7 sm:grid-cols-2">
          <div className="space-y-3">
            <SkeletonCard className="h-4 w-24 rounded-full bg-white/10" />
            <SkeletonCard className="h-4 w-28 rounded-full bg-white/10" />
          </div>
          <div className="space-y-3 sm:flex sm:flex-col sm:items-end">
            <SkeletonCard className="h-4 w-28 rounded-full bg-white/10" />
            <SkeletonCard className="h-8 w-36 rounded-full bg-white/10" />
          </div>
        </div>

        <SkeletonCard className="h-14 rounded-full bg-white/10" />
      </div>
    </article>
  );
}

type CollectionProductsEmptyStateProps = {
  onRetry: () => void;
};

function CollectionProductsEmptyState({
  onRetry,
}: CollectionProductsEmptyStateProps): ReactElement {
  return (
    <div className="col-span-full overflow-hidden rounded-[1.6rem] border border-white/12 bg-[linear-gradient(135deg,rgba(0,214,111,0.12)_0%,rgba(0,17,45,0.72)_48%,rgba(3,5,33,0.9)_100%)] px-6 py-12 text-center shadow-[0_30px_80px_rgba(0,0,0,0.18)] sm:px-10 sm:py-16">
      <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-secondary/24 bg-secondary/12 text-secondary">
        <PackageSearch className="size-8" aria-hidden="true" />
      </div>

      <div className="mx-auto mt-6 max-w-xl space-y-3">
        <h3 className="text-2xl font-black text-white sm:text-3xl">
          لا توجد منتجات متاحة حاليا
        </h3>
        <p className="text-base leading-8 text-white/58">
          سنعرض الدراجات الكهربائية هنا فور توفرها للحجز.
        </p>
      </div>

      <button
        type="button"
        onClick={onRetry}
        className="mx-auto mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-secondary/28 bg-secondary px-6 text-sm font-black text-primary transition hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
      >
        <RefreshCw className="size-4" aria-hidden="true" />
        تحديث
      </button>
    </div>
  );
}

function CollectionGrid({ products }: CollectionGridProps): ReactElement {
  const { data, isLoading, refetch } = useProducts();
  const apiProducts = data?.data ?? [];
  const displayedProducts =
    apiProducts.length > 0
      ? apiProducts.map((product, index) =>
          mapApiProductToCollectionProduct(product, products[index]),
        )
      : [];

  if (isLoading) {
    return (
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-7">
        {Array.from({ length: 4 }, (_, index) => (
          <CollectionProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-7">
      {displayedProducts.length > 0 ? (
        displayedProducts.map((product) => (
          <CollectionProductCard key={product.id} product={product} />
        ))
      ) : (
        <CollectionProductsEmptyState onRetry={() => void refetch()} />
      )}
    </div>
  );
}

export default CollectionGrid;
