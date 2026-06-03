import type { ReactElement } from "react";

import type { CollectionProduct } from "@/types/landing/home";
import CollectionProductCard from "./CollectionProductCard";

type CollectionGridProps = {
  products: CollectionProduct[];
};

function CollectionGrid({ products }: CollectionGridProps): ReactElement {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:gap-7">
      {products.map((product) => (
        <CollectionProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default CollectionGrid;
