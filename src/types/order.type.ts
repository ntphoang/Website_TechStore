import type { CartItemExtended } from './cart.type';

export interface Order {
  id: string;
  customerName: string;
  phone: string;              
  email?: string;             
  shippingAddress: string;    
  note?: string;             
  date: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  paymentMethod: string;
  items?: CartItemExtended[]; // Danh sách món hàng
  userId?: string | number | null;
}