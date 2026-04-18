export interface Order {
  id: string;
  customerName: string;
  date: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  paymentMethod: string;
}