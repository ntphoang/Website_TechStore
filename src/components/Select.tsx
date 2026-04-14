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
        <label className="block mb-1 font-medium text-gray-700">{label}</label>
        <select
          ref={ref}
          className={`w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          {...props}
        >
          {children}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
