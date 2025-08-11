'use client';

import { twMerge } from 'tailwind-merge';

interface TagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
}

export default function Tag({ label, onRemove, className }: TagProps) {
  return (
    <div
      className={twMerge(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        className
      )}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
        >
          <span className="sr-only">Remove tag</span>
          <svg
            className="w-2 h-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
} 