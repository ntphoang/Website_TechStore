import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../schemas/auth.schema.ts';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function Login() {
  // Lấy login (hàm) và isLoading (trạng thái) từ hook của Hoàng
  const { login: loginFn, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Vì loginFn đã là mutateAsync/hàm thực thi nên gọi trực tiếp với await
      await loginFn(data);
      toast.success('Đăng nhập thành công!');
    } catch (error) {
      toast.error('Sai email hoặc mật khẩu!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>

        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />

        <Input
          label="Mật khẩu"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />

        {/* Dùng isLoading lấy từ useAuth() thay vì loginMutation.isPending */}
        <Button type="submit" isLoading={isLoading}>
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}
