import Image from "next/image";
import type { ReactElement } from "react";

import { shouldBypassNextImageOptimization } from "@/lib/utils/image";
import type { CollectionProduct } from "@/types/landing/home";

type CollectionProductMediaProps = {
  product: CollectionProduct;
};

function CollectionProductMedia({
  product,
}: CollectionProductMediaProps): ReactElement {
  const bypassImageOptimization = shouldBypassNextImageOptimization(
    product.image.src,
  );

  return (
    <figure className="relative aspect-[1.72/1] overflow-hidden rounded-[1.25rem] bg-primary shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]">
      {product.badge ? (
        <span className="absolute end-4 top-4 z-10 rounded-full border border-secondary/25 bg-primary/80 px-4 py-2 text-xs font-black uppercase tracking-wide text-secondary backdrop-blur">
          {product.badge}
        </span>
      ) : null}
      <Image
        src={product.image.src}
        alt={product.image.alt}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 560px, 92vw"
        unoptimized={bypassImageOptimization}
      />
    </figure>
  );
}

export default CollectionProductMedia;
