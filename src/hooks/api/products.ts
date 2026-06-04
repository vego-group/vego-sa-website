import { productsAPI, singleProductAPI } from "@/services/queries";
import { useCustomQuery } from "../useCustomQuery";

export function useProducts() {
  return useCustomQuery(["products"], async () => productsAPI());
}

export function useProduct(productSlug: string) {
  return useCustomQuery(
    ["products", productSlug],
    async () => singleProductAPI(productSlug),
    { enabled: !!productSlug },
  );
}
