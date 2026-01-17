import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, fetchProducts } from "../api/products";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useProducts() {
  return useQuery({
    queryFn: fetchProducts,
    queryKey: ["products"],
  });
}
