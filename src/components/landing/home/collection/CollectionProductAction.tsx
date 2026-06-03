"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ReactElement } from "react";

import type { CollectionProduct } from "@/types/landing/home";

type CollectionProductActionProps = {
  product: CollectionProduct;
};

function CollectionProductAction({
  product,
}: CollectionProductActionProps): ReactElement {
  return (
    <Link
      href={`/deposit?product=${encodeURIComponent(product.id)}`}
      className="inline-flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-secondary ps-7 pe-7 text-sm font-black text-primary shadow-[0_0_34px_rgba(0,214,111,0.34)] transition hover:bg-secondary/90"
    >
      {product.cta.label}
      <ArrowLeft aria-hidden="true" className="size-5" />
    </Link>
  );
}

export default CollectionProductAction;
