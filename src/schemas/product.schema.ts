import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm không được để trống'),
  price: z.number({ error: 'Vui lòng nhập giá hợp lệ' }).min(1, 'Giá sản phẩm phải lớn hơn 0'),
  description: z.string().min(1, 'Mô tả không được để trống'),
  imageUrl: z.string().url('Đường dẫn ảnh không hợp lệ (phải là một URL)'),
  categoryId: z.number({ error: 'Vui lòng chọn danh mục' }).min(1, 'Vui lòng chọn danh mục'),
  stock: z
    .number({ error: 'Số lượng không hợp lệ' })
    .min(0, 'Số lượng trong kho không được là số âm'),
});

export type ProductFormValues = z.infer<typeof productSchema>;
