import Input from '../components/Input';
import Button from '../components/Button';

export default function RegisterForm() {
  return (
    <form className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Tạo tài khoản</h2>
        <p className="text-slate-500 font-medium text-sm">Tham gia cùng TechStore ngay hôm nay</p>
      </div>

      <div className="space-y-1">
        <Input label="Tên hiển thị" placeholder="VD: Nguyễn Văn A" />
        <Input label="Email của bạn" placeholder="VD: techstore@email.com" type="email" />
        <Input label="Mật khẩu" type="password" placeholder="••••••••" />
      </div>

      <div className="mt-8">
        <Button type="button" className="py-3 text-base shadow-lg shadow-pastel-teal/20">
          Đăng ký ngay
        </Button>
      </div>
    </form>
  );
}
