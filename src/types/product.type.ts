export interface Product {
  id: string | number;
  name: string;
  price: number;
  categoryId: number | string;
  category?: string;
  imageUrl: string;
  discount?: number;
  description: string;
  stock: number;
}