import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../schemas/auth.schema.ts';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => toast.success('Đăng nhập thành công!'),
      onError: () => toast.error('Sai email hoặc mật khẩu!'),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>

      <Input label="Email" {...register('email')} error={errors.email?.message} />
      <Input
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />

      <div className="text-right text-sm mb-3 text-gray-500 cursor-pointer">Forgot Password</div>

      <Button type="submit" isLoading={isLoading}>
        Login
      </Button>
    </form>
  );
}
