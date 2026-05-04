import { z } from 'zod';

// 1. Schema cho Đăng nhập
export const loginSchema = z.object({
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// 2. Schema cho Đăng ký
export const registerSchema = z
  .object({
    name: z.string().min(2, 'Họ và tên quá ngắn'),
    email: z.string().email('Email không hợp lệ'),
    phone: z.string().regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'], // Hiển thị lỗi ở ô nhập lại mật khẩu
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
