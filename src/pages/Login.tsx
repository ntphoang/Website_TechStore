import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../schemas/auth.schema.ts';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth'; // của Hoàng
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        toast.success('Đăng nhập thành công!');
      },
      onError: () => {
        toast.error('Sai email hoặc mật khẩu!');
      },
    });
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

        <Button type="submit" isLoading={isLoading}>
          Đăng nhập
        </Button>
      </form>
    </div>
  );
}
