import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

// Sử dụng forwardRef để truyền ref từ react-hook-form xuống input thật
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  return (
    <div className="mb-4">
      <label className="block mb-1.5 text-sm font-semibold text-slate-700">{label}</label>
      <input
        ref={ref} // Gắn ref vào đây
        className={`w-full border px-4 py-2.5 rounded-xl bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 transition-all duration-300 ${
          error 
            ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/30' 
            : 'border-slate-200 focus:border-pastel-teal focus:ring-pastel-ice focus:bg-white'
        }`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1.5 font-medium animate-in fade-in slide-in-from-top-1">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;