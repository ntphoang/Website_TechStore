import { z } from 'zod';

export const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Vui lòng nhập đầy đủ họ và tên'),
  phone: z
    .string()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ (VD: 0901234567)'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  address: z.string().min(5, 'Vui lòng nhập địa chỉ giao hàng cụ thể'),
  note: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
