import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import cartApi from "../api/cartAPI";
import productApi from "../../products/api/productAPI";
export const useCart = () => {
  const queryClient = useQueryClient();

  // Lấy cart
  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await cartApi.getCart();
      return response.data;
    }
  });
const { data: products = [] } = useQuery({
  queryKey: ["products"],
  queryFn: async () => {
    const res = await productApi.getAll();
    return res.data;
  }
});
  // Thêm sản phẩm
  const addToCart = useMutation({
    mutationFn: cartApi.addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  });

  // Update số lượng
  const updateCart = useMutation({
    mutationFn: ({ id, data }: any) =>
      cartApi.updateCart(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  });

  // Xóa
  const removeFromCart = useMutation({
    mutationFn: cartApi.removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    }
  });

  // 💰 Tính tổng tiền
  const calculateTotal = () => {
  if (!cart.length || !products.length) return 0;

  const cartItems = cart[0]?.cartItems || [];

  return cartItems.reduce((total: number, item: any) => {
    const product = products.find((p: any) => p.id === item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);
};

  return {
    cart,
    addToCart,
    updateCart,
    removeFromCart,
    calculateTotal
  };
};