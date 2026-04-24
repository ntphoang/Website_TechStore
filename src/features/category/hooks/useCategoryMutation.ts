import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryApi from "../api/categoryAPI";

export const useCategoryMutation = () => {
  const queryClient = useQueryClient();

  const createCategory = useMutation({
    mutationFn: categoryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: any) =>
      categoryApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });

  const deleteCategory = useMutation({
    mutationFn: categoryApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });

  return {
    createCategory,
    updateCategory,
    deleteCategory
  };
};