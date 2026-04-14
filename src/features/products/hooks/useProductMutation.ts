import { useMutation, useQueryClient } from "@tanstack/react-query";
import productApi from "../api/productAPI";

export const useProductMutation = () => {
  const queryClient = useQueryClient();

  // CREATE
  const createProduct = useMutation({
    mutationFn: productApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });

  // UPDATE
  const updateProduct = useMutation({
    mutationFn: ({ id, data }: any) =>
      productApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });

  // DELETE
  const deleteProduct = useMutation({
    mutationFn: productApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });

  return {
    createProduct,
    updateProduct,
    deleteProduct
  };
};