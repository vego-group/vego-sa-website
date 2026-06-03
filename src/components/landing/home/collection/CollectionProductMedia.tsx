import Image from "next/image";
import type { ReactElement } from "react";

import type { CollectionProduct } from "@/types/landing/home";

type CollectionProductMediaProps = {
  product: CollectionProduct;
};

function CollectionProductMedia({
  product,
}: CollectionProductMediaProps): ReactElement {
  return (
    <figure className="relative aspect-[1.72/1] overflow-hidden rounded-[1.25rem] bg-primary shadow-[inset_0_0_40px_rgba(0,0,0,0.35)]">
      <Image
        src={product.image.src}
        alt={product.image.alt}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 560px, 92vw"
      />
    </figure>
  );
}

export default CollectionProductMedia;
