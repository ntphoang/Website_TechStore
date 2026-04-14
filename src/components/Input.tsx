import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

// Sử dụng forwardRef để truyền ref từ react-hook-form xuống input thật
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-slate-700">{label}</label>
      <input
        ref={ref} // Gắn ref vào đây
        className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
          error ? 'border-red-500 ring-red-100' : 'border-slate-200'
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
