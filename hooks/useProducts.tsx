import { getProducts } from "@/app/products/fetcher";
import useSWR from "swr";

const fetcher = async () => {
  const { payload, error } = await getProducts({});
  if (error) {
    throw new Error(error);
  }
  return payload;
};

export default function useProducts() {
  const { data: payload, error } = useSWR("/api/products", fetcher, {
    suspense: true,
    refreshInterval: 4 * 60 * 1000,
    fallbackData: {
      products: [],
    },
  });

  return { payload, error };
}
