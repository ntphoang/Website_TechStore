import { useQuery } from "@tanstack/react-query";
import productApi from "../api/productAPI";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productApi.getAll
  });
};