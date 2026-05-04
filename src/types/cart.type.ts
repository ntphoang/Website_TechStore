export interface CartItem {
  productId: number | string;
  quantity: number;
}

export interface CartItemExtended extends CartItem {
  id: number | string;
  name: string;
  price: number;
  imageUrl: string;
}

export interface Cart {
  id: number | string;
  userId: number | string;
  items: CartItem[];
}
