import { baseAPI } from "..";
import type {
  ProductApiResponse,
  ProductsApiResponse,
} from "@/types/landing/home";

export const productsAPI = async (): Promise<ProductsApiResponse> =>
  await baseAPI("GET", `/v1/products`);

export const singleProductAPI = async (
  productSlug: string,
): Promise<ProductApiResponse> =>
  await baseAPI("GET", `/v1/products/${productSlug}`);
