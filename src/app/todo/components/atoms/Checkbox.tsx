'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          ref={ref}
          className={twMerge(
            'w-4 h-4 rounded border-gray-300 dark:border-gray-600',
            'text-blue-600 focus:ring-blue-500',
            'bg-white dark:bg-gray-800',
            className
          )}
          {...props}
        />
        {label && (
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox; 