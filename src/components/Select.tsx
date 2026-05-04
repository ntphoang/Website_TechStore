import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  children: React.ReactNode; // Nhận các thẻ <option> vào đây
};

// Dùng React.forwardRef để tương thích hoàn hảo với react-hook-form
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="block mb-1.5 text-sm font-semibold text-slate-700">{label}</label>
        <select
          ref={ref}
          className={`w-full border px-4 py-2.5 rounded-xl bg-slate-50 text-slate-800 focus:outline-none focus:ring-4 transition-all duration-300 cursor-pointer appearance-none ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50/30'
              : 'border-slate-200 focus:border-pastel-teal focus:ring-pastel-ice focus:bg-white'
          }`}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="text-red-500 text-sm mt-1.5 font-medium animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
